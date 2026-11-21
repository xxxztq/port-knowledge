import { importJourney, journeyExceptions } from '../data/container-journey.js';

// Only lesson navigation and exercise answers live here. No API, equipment commands,
// authorization changes, cargo events, or real-world completion flags are produced.
const lastStepIndex = importJourney.steps.length - 1;
const exceptionById = new Map(journeyExceptions.map(exception => [exception.id, exception]));

export function createJourneyState() {
  return {
    stepIndex: 0,
    exceptionId: null,
    resolved: false,
    feedback: '',
    choiceId: null,
    completed: false,
  };
}

// Reject corrupt/forged states instead of normalizing them into a permitted lesson.
// Invalid actions are recoverable below; invalid caller state is a programming error.
function isValidState(state) {
  if (!state || typeof state !== 'object' || Array.isArray(state)
    || !Number.isInteger(state.stepIndex) || state.stepIndex < 0 || state.stepIndex > lastStepIndex
    || typeof state.resolved !== 'boolean' || typeof state.feedback !== 'string'
    || typeof state.completed !== 'boolean'
    || (state.completed && state.stepIndex !== lastStepIndex)) return false;

  if (state.exceptionId === null) return state.resolved === false && state.choiceId === null;

  const exception = exceptionById.get(state.exceptionId);
  if (!exception || exception.stepId !== importJourney.steps[state.stepIndex].id) return false;
  if (state.choiceId === null) return state.resolved === false;
  const choice = exception.choices.find(candidate => candidate.id === state.choiceId);
  return Boolean(choice && state.resolved === choice.correct);
}

/** Invalid states have no current lesson object and cannot advance. */
export function getCurrentStep(state) {
  return isValidState(state) ? importJourney.steps[state.stepIndex] : null;
}

export function getCurrentException(state) {
  return isValidState(state) ? exceptionById.get(state.exceptionId) ?? null : null;
}

export function canAdvance(state) {
  return isValidState(state) && !state.completed
    && (state.exceptionId === null || state.resolved);
}

function visitStep(state, index) {
  const leavingExercise = state.exceptionId !== null;
  return {
    ...createJourneyState(),
    stepIndex: index,
    feedback: leavingExercise
      ? `已切换到“${importJourney.steps[index].title}”，并清除上一站的异常演练与答案。仅切换教学情境，未改变真实物流、授权或设备状态。`
      : `已切换到“${importJourney.steps[index].title}”。这是下一站教学情境，不代表已执行真实作业。`,
  };
}

function blockedFeedback(state) {
  return {
    ...state,
    feedback: '当前异常演练尚未解决，不能继续或跳到后续步骤。请重新选择处理方式，或显式退出异常演练；也可以返回前一站。以上操作均不改变真实业务状态。',
  };
}

/**
 * Pure reducer. It never mutates state, action, or lesson data.
 * Actions: {type:'next'|'previous'|'reset'}, {type:'select-step',index},
 *          {type:'set-exception',id:string|null}, {type:'answer',choiceId:string}.
 * set-exception(null) explicitly exits the exercise; it is not an answer/resolution.
 * Re-selecting the current step preserves its exercise and answer; selecting the
 * same exception explicitly starts that exercise afresh. Completion is lesson-only.
 * Malformed actions preserve progress with feedback; malformed states throw TypeError.
 */
export function transitionJourney(state, action) {
  if (!isValidState(state)) {
    throw new TypeError('Invalid journey state; initialize with createJourneyState().');
  }
  if (!action || typeof action !== 'object' || Array.isArray(action)) {
    return { ...state, feedback: '无效教学操作，当前步骤与异常演练保持不变。' };
  }

  switch (action.type) {
    case 'reset':
      return createJourneyState();

    case 'next':
      if (state.completed) return { ...state };
      if (!canAdvance(state)) return blockedFeedback(state);
      if (state.stepIndex === lastStepIndex) {
        return {
          ...state,
          completed: true,
          feedback: '已完成七站教学。本结果只记录学习进度，不代表真实货物已交付、空箱已获接收或费用已结清。',
        };
      }
      return visitStep(state, state.stepIndex + 1);

    case 'previous':
      if (state.stepIndex === 0) {
        return { ...state, feedback: '当前已是第一站教学，不能再向前返回。' };
      }
      return visitStep(state, state.stepIndex - 1);

    case 'select-step': {
      const { index } = action;
      if (!Number.isInteger(index) || index < 0 || index > lastStepIndex) {
        return { ...state, feedback: '无效步骤：请选择七站范围内的整数索引，当前学习进度保持不变。' };
      }
      if (index > state.stepIndex && !canAdvance(state)) return blockedFeedback(state);
      if (index === state.stepIndex) {
        return {
          ...state,
          completed: false,
          feedback: state.exceptionId !== null
            ? '仍在当前教学站点，异常演练与答案保持不变；未解决的演练仍会阻止继续。'
            : '已选择当前教学站点，可继续学习；未产生真实作业事件。',
        };
      }
      return visitStep(state, index);
    }

    case 'set-exception': {
      if (action.id === null) {
        return {
          ...state,
          exceptionId: null,
          resolved: false,
          choiceId: null,
          feedback: state.exceptionId !== null
            ? '已退出异常演练并清除答案，返回当前站点的正常教学情境。退出不表示真实异常已解决，也不恢复真实授权、设备或物流状态。'
            : '当前没有异常演练，保持当前教学进度；未改变真实业务状态。',
        };
      }
      const exception = exceptionById.get(action.id);
      if (!exception || exception.stepId !== importJourney.steps[state.stepIndex].id) {
        return { ...state, feedback: '只能进入当前步骤对应的异常演练；该选择无效，原有进度与演练保持不变。' };
      }
      return {
        ...state,
        exceptionId: exception.id,
        resolved: false,
        choiceId: null,
        completed: false,
        feedback: `已进入“${exception.title}”教学演练，请显式选择处理方式。未解决前不能继续到后续步骤。`,
      };
    }

    case 'answer': {
      const exception = getCurrentException(state);
      if (!exception) {
        return { ...state, feedback: '当前没有异常演练，不能记录练习答案；教学进度保持不变。' };
      }
      const choice = exception.choices.find(candidate => candidate.id === action.choiceId);
      if (!choice) {
        return { ...state, feedback: '无效答案：请选择当前异常演练提供的选项，已有答案与解决状态保持不变。' };
      }
      return {
        ...state,
        choiceId: choice.id,
        resolved: choice.correct,
        feedback: choice.correct
          ? `${choice.feedback}\n${exception.resolution}`
          : choice.feedback,
      };
    }

    default:
      return { ...state, feedback: '无效教学操作，当前步骤与异常演练保持不变。' };
  }
}
