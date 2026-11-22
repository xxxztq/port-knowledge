import { shipmentCases, shipmentExceptions } from '../data/shipment-learning.js';

const cases = new Map(shipmentCases.map(item => [item.id, item]));
const exceptions = new Map(shipmentExceptions.map(item => [item.id, item]));

// State records reading position and understanding only. It has no release,
// authorization, equipment-command, actual-quantity or operational-status fields.
export function createShipmentState(caseId = shipmentCases[0].id) {
  if (!cases.has(caseId)) throw new TypeError('Unknown shipment lesson.');
  return { caseId, positions: Object.fromEntries(shipmentCases.map(item => [item.id, 0])), exercises: {}, feedback: '' };
}

function valid(state) {
  if (!state || !cases.has(state.caseId) || !state.positions || !state.exercises
    || Array.isArray(state.exercises) || typeof state.feedback !== 'string') return false;
  if (!shipmentCases.every(item => Number.isInteger(state.positions[item.id])
    && state.positions[item.id] >= 0 && state.positions[item.id] < item.stages.length)) return false;
  return Object.entries(state.exercises).every(([id, record]) => {
    const exception = exceptions.get(id);
    return exception && record && Array.isArray(record.checked)
      && new Set(record.checked).size === record.checked.length
      && record.checked.every(key => exception.evidence.some(item => item.id === key))
      && [null, 'safe', 'unsafe'].includes(record.choiceId) && typeof record.reviewed === 'boolean'
      && (!record.reviewed || (record.choiceId === 'safe' && record.checked.length === exception.evidence.length));
  });
}

export function getShipmentCase(state) { return valid(state) ? cases.get(state.caseId) : null; }
export function getCurrentShipmentStep(state) { return getShipmentCase(state)?.stages[state.positions[state.caseId]] ?? null; }
export function getCurrentShipmentException(state) {
  const step = getCurrentShipmentStep(state);
  return step ? shipmentExceptions.find(item => item.caseId === state.caseId && item.stepId === step.id) ?? null : null;
}
export function getBlockingException(state) {
  const lesson = getShipmentCase(state);
  if (!lesson) return null;
  return shipmentExceptions.filter(item => item.caseId === state.caseId && state.exercises[item.id] && !state.exercises[item.id].reviewed)
    .sort((a, b) => lesson.stages.findIndex(s => s.id === a.stepId) - lesson.stages.findIndex(s => s.id === b.stepId))[0] ?? null;
}
export function canVisitShipmentStep(state, index) {
  const lesson = getShipmentCase(state);
  if (!lesson || !Number.isInteger(index) || index < 0 || index >= lesson.stages.length) return false;
  const blocking = getBlockingException(state);
  return !blocking || index <= lesson.stages.findIndex(item => item.id === blocking.stepId);
}
export function canAdvanceShipment(state) {
  return valid(state) && canVisitShipmentStep(state, state.positions[state.caseId] + 1);
}

export function transitionShipment(state, action) {
  if (!valid(state)) throw new TypeError('Initialize with createShipmentState().');
  const notice = feedback => ({ ...state, feedback });
  if (!action || typeof action !== 'object') return notice('无效学习操作，保留当前位置与演练记录。');
  const lesson = cases.get(state.caseId);
  const index = state.positions[state.caseId];
  const exception = getCurrentShipmentException(state);
  const record = exception && state.exercises[exception.id];
  const updateExercise = (next, feedback) => ({ ...state, exercises: { ...state.exercises, [exception.id]: next }, feedback });
  switch (action.type) {
    case 'select-case':
      return cases.has(action.id)
        ? { ...state, caseId: action.id, feedback: '已切换案例，各案例的阅读位置与异常演练独立保留。' }
        : notice('未知案例，保持当前内容。');
    case 'next':
    case 'previous':
    case 'select-step': {
      const target = action.type === 'next' ? index + 1 : action.type === 'previous' ? index - 1 : action.index;
      if (!Number.isInteger(target) || target < 0 || target >= lesson.stages.length) return notice('已到案例边界，当前位置保持不变。');
      if (!canVisitShipmentStep(state, target)) return notice('后续阅读暂锁定：先返回异常节点，阅读恢复条件并完成理解核对。返回前站或切换案例不会清除异常。');
      return { ...state, positions: { ...state.positions, [state.caseId]: target }, feedback: '正在阅读第 ' + (target + 1) + ' / ' + lesson.stages.length + ' 站：' + lesson.stages[target].title + '。仅改变阅读位置。' };
    }
    case 'start-exception':
      if (!exception || exception.id !== action.id) return notice('只能在对应节点开启该异常演练。');
      if (record) return notice('已打开本节点的演练记录；业务异常仍等待责任方确认。');
      return updateExercise({ checked: [], choiceId: null, reviewed: false }, '已进入“' + exception.title + '”演练。查看五条线的影响、待办与恢复条件。');
    case 'check-evidence': {
      if (!record || !exception.evidence.some(item => item.id === action.id) || typeof action.checked !== 'boolean') return notice('无效理解条目，保持演练记录。');
      const checked = action.checked ? [...new Set([...record.checked, action.id])] : record.checked.filter(id => id !== action.id);
      return updateExercise({ ...record, checked, reviewed: false }, '已记录阅读理解 ' + checked.length + ' / ' + exception.evidence.length + ' 项。这不是上传凭据或确认业务条件。');
    }
    case 'choose-response':
      if (!record || !['safe', 'unsafe'].includes(action.id)) return notice('请先在对应节点开启异常演练。');
      return updateExercise({ ...record, choiceId: action.id, reviewed: false }, action.id === 'unsafe' ? exception.rejection : '处理方向正确。还需读懂全部依据与恢复条件，再核对理解。');
    case 'review':
      if (!record) return notice('当前尚未开启异常演练。');
      if (record.choiceId !== 'safe' || record.checked.length !== exception.evidence.length) return notice('理解核对尚未完成：请阅读并勾选全部依据，再选择保留记录、交责任方核实的处理方式。');
      return updateExercise({ ...record, reviewed: true }, '已完成理解核对，可阅读“必要条件具备时”的后续示例。业务异常仍待责任方确认，未执行审核、放行或作业。');
    case 'reset-case': {
      const exercises = Object.fromEntries(Object.entries(state.exercises).filter(([id]) => exceptions.get(id).caseId !== state.caseId));
      return { ...state, positions: { ...state.positions, [state.caseId]: 0 }, exercises, feedback: '已重开本案例的教学假设并清除本例阅读记录；不是业务恢复或撤销异常，其他案例记录仍保留。' };
    }
    default: return notice('无效学习操作，保持当前位置与演练记录。');
  }
}
