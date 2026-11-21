import test from 'node:test';
import assert from 'node:assert/strict';
import { importJourney, journeyExceptions } from '../src/data/container-journey.js';
import { articles, sources } from '../src/data/knowledge.js';
import { equipmentVisuals } from '../src/data/equipment-visuals.js';
import { scenarios } from '../src/data/scenarios.js';
import {
  createJourneyState,
  transitionJourney,
  getCurrentStep,
  getCurrentException,
  canAdvance,
} from '../src/lib/journey-model.mjs';

const initial = {
  stepIndex: 0,
  exceptionId: null,
  resolved: false,
  feedback: '',
  choiceId: null,
  completed: false,
};
const lastIndex = importJourney.steps.length - 1;
const stepIndexFor = exception => importJourney.steps.findIndex(step => step.id === exception.stepId);
const progress = ({ feedback, ...state }) => state;
const atStep = index => transitionJourney(createJourneyState(), { type: 'select-step', index });
const inExercise = exception => transitionJourney(atStep(stepIndexFor(exception)), {
  type: 'set-exception', id: exception.id,
});
const answer = (state, choice) => transitionJourney(state, { type: 'answer', choiceId: choice.id });
const finish = () => transitionJourney(atStep(lastIndex), { type: 'next' });

function deepFreeze(value) {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.values(value).forEach(deepFreeze);
    Object.freeze(value);
  }
  return value;
}

// These are UI integration contracts: broken anchors, missing teaching fields or
// inconsistent exercise identities would prevent the reader following the lesson.
test('seven teaching stops expose the requested fields, map zones and existing article/equipment references', () => {
  assert.deepEqual(Object.keys(importJourney).sort(), [
    'id', 'title', 'summary', 'scope', 'note', 'sourceUrls', 'steps',
  ].sort());
  assert.deepEqual(importJourney.steps.map(({ id, zone }) => [id, zone]), [
    ['arrival', 'berth'], ['unload', 'quay'], ['yard', 'yard'], ['pickup', 'yard'],
    ['gate', 'gate'], ['delivery', 'inland'], ['return', 'empty'],
  ]);
  const fields = [
    'id', 'zone', 'title', 'location', 'actor', 'systemId', 'systemLabel', 'equipmentId',
    'articleId', 'summary', 'action', 'input', 'checks', 'output', 'cargoState',
    'documentState', 'systemEvent', 'costNote',
  ];
  const systems = new Set([
    'container-tos', 'gate', 'equipment-control', 'customs', 'single-window',
    'carrier', 'transport', 'finance', 'maintenance',
  ]);
  for (const step of importJourney.steps) {
    assert.deepEqual(Object.keys(step).sort(), [...fields].sort(), step.id);
    for (const field of fields.filter(name => !['equipmentId', 'checks'].includes(name))) {
      assert.equal(typeof step[field], 'string', `${step.id}.${field}`);
      assert.ok(step[field].trim(), `${step.id}.${field}`);
    }
    assert.ok(step.checks.length > 0);
    assert.ok(step.checks.every(check => typeof check === 'string' && check.trim()));
    assert.ok(systems.has(step.systemId), step.id);
    assert.ok(articles.some(article => article.id === step.articleId), step.id);
    assert.ok(step.equipmentId === null || equipmentVisuals.some(item => item.id === step.equipmentId), step.id);
  }
  assert.equal(importJourney.steps.find(step => step.id === 'delivery').systemId, 'transport');
  assert.equal(importJourney.steps.find(step => step.id === 'return').systemId, 'carrier');
});

test('teaching sources are inherited from the existing scenario or knowledge library', () => {
  const scenario = scenarios.find(item => item.id === 'import-full-container');
  const allowedUrls = new Set([...scenario.sourceUrls, ...sources.map(source => source.url)]);
  assert.equal(importJourney.id, scenario.id);
  assert.ok(importJourney.sourceUrls.length > 0);
  for (const url of importJourney.sourceUrls) assert.ok(allowedUrls.has(url), url);
  for (const url of scenario.sourceUrls) assert.ok(importJourney.sourceUrls.includes(url), url);
  assert.ok(importJourney.scope.trim());
  assert.ok(importJourney.note.trim());
});

test('each exception belongs to its specified stop and describes an assumed completed review', () => {
  assert.equal(new Set(journeyExceptions.map(item => item.id)).size, 3);
  assert.deepEqual(journeyExceptions.map(item => item.stepId), ['unload', 'yard', 'gate']);
  for (const exception of journeyExceptions) {
    assert.deepEqual(Object.keys(exception).sort(), [
      'id', 'stepId', 'title', 'description', 'choices', 'resolution',
    ].sort());
    assert.ok(exception.choices.length >= 2);
    assert.equal(new Set(exception.choices.map(choice => choice.id)).size, exception.choices.length);
    assert.equal(exception.choices.filter(choice => choice.correct).length, 1);
    assert.ok(exception.choices.some(choice => !choice.correct));
    for (const choice of exception.choices) {
      assert.deepEqual(Object.keys(choice).sort(), ['id', 'label', 'feedback', 'correct'].sort());
      assert.equal(typeof choice.correct, 'boolean');
      assert.ok(choice.id && choice.label && choice.feedback);
    }
  }
  assert.match(journeyExceptions[0].resolution, /本教学分支假设已完成复核/);
  assert.match(journeyExceptions[1].resolution, /本教学分支假设已取得更新授权/);
  assert.match(journeyExceptions[2].resolution, /本教学分支假设已恢复并确认现场条件/);
  assert.equal(journeyExceptions[2].choices.find(choice => choice.id === 'manual-open').correct, false);
});

test('initial state is exact and independently created', () => {
  const first = createJourneyState();
  const second = createJourneyState();
  assert.deepEqual(first, initial);
  assert.deepEqual(second, initial);
  assert.notEqual(first, second);
  assert.equal(getCurrentStep(first).id, 'arrival');
  assert.equal(getCurrentException(first), null);
  assert.equal(canAdvance(first), true);
});

test('normal learning visits all seven stops and completes only on the final explicit next', () => {
  let state = createJourneyState();
  const seen = [];
  for (let index = 0; index <= lastIndex; index += 1) {
    seen.push(getCurrentStep(state).id);
    assert.equal(state.stepIndex, index);
    assert.equal(state.completed, false);
    assert.equal(state.exceptionId, null, 'exceptions never start automatically');
    assert.equal(canAdvance(state), true);
    state = transitionJourney(state, { type: 'next' });
  }
  assert.deepEqual(seen, ['arrival', 'unload', 'yard', 'pickup', 'gate', 'delivery', 'return']);
  assert.equal(state.stepIndex, lastIndex);
  assert.equal(state.completed, true);
  assert.equal(canAdvance(state), false);
  assert.match(state.feedback, /只记录学习进度/);
  assert.deepEqual(Object.keys(state).sort(), Object.keys(initial).sort(), 'no real logistics state is added');
});

for (const exception of journeyExceptions) {
  test(`${exception.stepId}: every wrong choice blocks next, forward jumps and same-step bypass`, () => {
    for (const choice of exception.choices.filter(item => !item.correct)) {
      const exercise = inExercise(exception);
      assert.equal(getCurrentException(exercise).id, exception.id);
      assert.equal(exercise.choiceId, null);
      assert.equal(canAdvance(exercise), false);
      const wrong = answer(exercise, choice);
      assert.equal(wrong.resolved, false);
      assert.equal(wrong.choiceId, choice.id);
      assert.equal(wrong.feedback, choice.feedback);
      assert.equal(canAdvance(wrong), false);
      for (const action of [
        { type: 'next' },
        { type: 'select-step', index: wrong.stepIndex + 1 },
        { type: 'select-step', index: lastIndex },
        { type: 'select-step', index: wrong.stepIndex },
      ]) {
        const blocked = transitionJourney(wrong, action);
        assert.deepEqual(progress(blocked), progress(wrong), JSON.stringify(action));
        assert.equal(canAdvance(blocked), false);
      }
    }
  });

  test(`${exception.stepId}: correct answer resolves the exercise but waits for explicit continue`, () => {
    const exercise = inExercise(exception);
    const correct = exception.choices.find(choice => choice.correct);
    const solved = answer(exercise, correct);
    assert.equal(solved.stepIndex, exercise.stepIndex);
    assert.equal(solved.exceptionId, exception.id);
    assert.equal(solved.choiceId, correct.id);
    assert.equal(solved.resolved, true);
    assert.equal(solved.completed, false);
    assert.equal(canAdvance(solved), true);
    assert.ok(solved.feedback.includes(exception.resolution));
    const advanced = transitionJourney(solved, { type: 'next' });
    assert.equal(advanced.stepIndex, exercise.stepIndex + 1);
    assert.equal(advanced.exceptionId, null);
    assert.equal(advanced.choiceId, null);
    assert.equal(advanced.resolved, false);
    assert.equal(getCurrentException(advanced), null);
  });

  test(`${exception.stepId}: a wrong answer can be corrected without automatic advancement`, () => {
    const wrong = answer(inExercise(exception), exception.choices.find(choice => !choice.correct));
    const solved = answer(wrong, exception.choices.find(choice => choice.correct));
    assert.equal(solved.stepIndex, wrong.stepIndex);
    assert.equal(solved.resolved, true);
    assert.equal(canAdvance(solved), true);
    const changedToWrong = answer(solved, exception.choices.find(choice => !choice.correct));
    assert.equal(changedToWrong.resolved, false);
    assert.equal(canAdvance(changedToWrong), false, 'changing an answer cannot keep stale resolved status');
  });

  test(`${exception.stepId}: unanswered and answered exercises can be explicitly exited`, () => {
    const exercise = inExercise(exception);
    for (const state of [exercise, ...exception.choices.map(choice => answer(exercise, choice))]) {
      const exited = transitionJourney(state, { type: 'set-exception', id: null });
      assert.equal(exited.stepIndex, state.stepIndex);
      assert.equal(exited.exceptionId, null);
      assert.equal(exited.choiceId, null);
      assert.equal(exited.resolved, false);
      assert.equal(canAdvance(exited), true);
      assert.match(exited.feedback, /已退出异常演练/);
      assert.match(exited.feedback, /退出不表示真实异常已解决/);
      assert.equal(transitionJourney(exited, { type: 'next' }).stepIndex, state.stepIndex + 1);
    }
  });

  test(`${exception.stepId}: previous or selecting an earlier stop clears the exercise with explanation`, () => {
    const exercise = inExercise(exception);
    for (const state of [exercise, ...exception.choices.map(choice => answer(exercise, choice))]) {
      for (const action of [{ type: 'previous' }, { type: 'select-step', index: 0 }]) {
        const previous = transitionJourney(state, action);
        assert.equal(previous.stepIndex, action.type === 'previous' ? state.stepIndex - 1 : 0);
        assert.equal(previous.exceptionId, null);
        assert.equal(previous.choiceId, null);
        assert.equal(previous.resolved, false);
        assert.equal(previous.completed, false);
        assert.match(previous.feedback, /清除上一站的异常演练与答案/);
        const revisited = transitionJourney(previous, { type: 'select-step', index: state.stepIndex });
        assert.equal(revisited.exceptionId, null);
        assert.equal(canAdvance(revisited), true);
      }
    }
  });
}

test('exception selection is restricted to the current stop without replacing an active exercise', () => {
  for (let index = 0; index <= lastIndex; index += 1) {
    const base = atStep(index);
    const local = journeyExceptions.find(exception => exception.stepId === getCurrentStep(base).id);
    const state = local ? inExercise(local) : base;
    for (const exception of journeyExceptions.filter(item => item !== local)) {
      const rejected = transitionJourney(state, { type: 'set-exception', id: exception.id });
      assert.deepEqual(progress(rejected), progress(state));
    }
  }
});

test('unanswered exception cannot be skipped and reselecting it starts a fresh exercise', () => {
  const exception = journeyExceptions[0];
  const exercise = inExercise(exception);
  for (const action of [{ type: 'next' }, { type: 'select-step', index: lastIndex }]) {
    assert.deepEqual(progress(transitionJourney(exercise, action)), progress(exercise));
  }
  const solved = answer(exercise, exception.choices.find(choice => choice.correct));
  const restarted = transitionJourney(solved, { type: 'set-exception', id: exception.id });
  assert.equal(restarted.stepIndex, solved.stepIndex);
  assert.equal(restarted.choiceId, null);
  assert.equal(restarted.resolved, false);
  assert.equal(canAdvance(restarted), false);
});

test('a resolved exercise may navigate forward while a same-stop selection preserves its answer', () => {
  const exception = journeyExceptions[1];
  const solved = answer(inExercise(exception), exception.choices.find(choice => choice.correct));
  const same = transitionJourney(solved, { type: 'select-step', index: solved.stepIndex });
  assert.deepEqual(progress(same), progress(solved));
  assert.equal(canAdvance(same), true);
  const jumped = transitionJourney(same, { type: 'select-step', index: lastIndex });
  assert.equal(jumped.stepIndex, lastIndex);
  assert.equal(jumped.exceptionId, null);
  assert.equal(jumped.completed, false);
});

test('repeated next at completion cannot exceed the final step or replay completion', () => {
  const completed = finish();
  let state = completed;
  for (let attempt = 0; attempt < 100; attempt += 1) {
    state = transitionJourney(state, { type: 'next' });
    assert.deepEqual(state, completed);
    assert.equal(getCurrentStep(state).id, 'return');
    assert.equal(canAdvance(state), false);
  }
});

test('previous handles first and final boundaries and clears lesson completion', () => {
  const first = transitionJourney(createJourneyState(), { type: 'previous' });
  assert.deepEqual(progress(first), progress(initial));
  assert.match(first.feedback, /第一站/);
  const previous = transitionJourney(finish(), { type: 'previous' });
  assert.equal(previous.stepIndex, lastIndex - 1);
  assert.equal(previous.completed, false);
  assert.equal(canAdvance(previous), true);
});

test('valid step selection clears completion including reselecting the last stop', () => {
  for (let index = 0; index <= lastIndex; index += 1) {
    const selected = transitionJourney(finish(), { type: 'select-step', index });
    assert.equal(selected.stepIndex, index);
    assert.equal(selected.completed, false);
    assert.equal(canAdvance(selected), true);
  }
});

test('reset restores the exact initial state from every exercise outcome and completion', () => {
  const states = [createJourneyState(), atStep(lastIndex), finish()];
  for (const exception of journeyExceptions) {
    const exercise = inExercise(exception);
    states.push(exercise, ...exception.choices.map(choice => answer(exercise, choice)));
  }
  for (const state of states) {
    const reset = transitionJourney(state, { type: 'reset' });
    assert.deepEqual(reset, initial);
    assert.notEqual(reset, state);
    assert.equal(getCurrentException(reset), null);
    assert.equal(canAdvance(reset), true);
  }
});

test('malformed actions and unknown choices preserve progress and cannot bypass an exception', () => {
  const exception = journeyExceptions[0];
  const exercise = inExercise(exception);
  const solved = answer(exercise, exception.choices.find(choice => choice.correct));
  const invalid = [
    undefined, null, false, 1, 'next', [], {}, { type: 'unknown' }, { type: ['next'] },
    { type: 'select-step' },
    ...[-1, 7, 999, 0.5, NaN, Infinity, -Infinity, '2', null, true, {}, []]
      .map(index => ({ type: 'select-step', index })),
    { type: 'set-exception' },
    ...['missing', '', 0, false, {}, []].map(id => ({ type: 'set-exception', id })),
    { type: 'answer' },
    ...['missing', '', 0, null, false, {}, [], journeyExceptions[1].choices[0].id]
      .map(choiceId => ({ type: 'answer', choiceId })),
  ];
  for (const state of [createJourneyState(), exercise, solved, finish()]) {
    for (const action of invalid) {
      const result = transitionJourney(state, action);
      assert.deepEqual(progress(result), progress(state));
      assert.equal(canAdvance(result), canAdvance(state));
      assert.ok(result.feedback);
    }
  }
});

test('answering without an active exception and exiting without one do not create resolution', () => {
  for (const state of [createJourneyState(), finish()]) {
    const answered = answer(state, journeyExceptions[0].choices[0]);
    assert.deepEqual(progress(answered), progress(state));
    const exited = transitionJourney(state, { type: 'set-exception', id: null });
    assert.deepEqual(progress(exited), progress(state));
    assert.equal(exited.resolved, false);
  }
});

test('invalid or contradictory state is rejected and never exposed as advanceable', () => {
  const exercise = inExercise(journeyExceptions[0]);
  const correct = journeyExceptions[0].choices.find(choice => choice.correct);
  const wrong = journeyExceptions[0].choices.find(choice => !choice.correct);
  const invalidStates = [
    undefined, null, false, 'state', [], {},
    ...Object.keys(initial).map(key => {
      const partial = { ...initial };
      delete partial[key];
      return partial;
    }),
    ...[-1, 7, 1.5, NaN, Infinity, '1', null].map(stepIndex => ({ ...initial, stepIndex })),
    { ...initial, completed: true },
    { ...initial, completed: 1 },
    { ...initial, resolved: true },
    { ...initial, resolved: 'false' },
    { ...initial, feedback: null },
    { ...initial, choiceId: correct.id },
    { ...initial, exceptionId: 'missing' },
    { ...initial, exceptionId: journeyExceptions[0].id },
    { ...exercise, resolved: true },
    { ...exercise, choiceId: 'missing' },
    { ...exercise, choiceId: correct.id, resolved: false },
    { ...exercise, choiceId: wrong.id, resolved: true },
    { ...exercise, exceptionId: journeyExceptions[1].id },
  ];
  for (const state of invalidStates) {
    assert.equal(getCurrentStep(state), null);
    assert.equal(getCurrentException(state), null);
    assert.equal(canAdvance(state), false);
    assert.throws(() => transitionJourney(state, { type: 'next' }), TypeError);
    assert.throws(() => transitionJourney(state, { type: 'reset' }), TypeError);
  }
});

test('reducers and queries do not mutate frozen state, actions or shared lesson data', () => {
  const dataBefore = structuredClone({ importJourney, journeyExceptions });
  deepFreeze(importJourney);
  deepFreeze(journeyExceptions);
  const exception = journeyExceptions[0];
  const exercise = inExercise(exception);
  const states = [
    createJourneyState(), exercise,
    ...exception.choices.map(choice => answer(exercise, choice)),
    atStep(lastIndex), finish(),
  ];
  const actions = [
    { type: 'next' }, { type: 'previous' }, { type: 'reset' },
    { type: 'select-step', index: 0 }, { type: 'select-step', index: 1 },
    { type: 'select-step', index: lastIndex }, { type: 'select-step', index: -1 },
    { type: 'set-exception', id: exception.id }, { type: 'set-exception', id: null },
    ...exception.choices.map(choice => ({ type: 'answer', choiceId: choice.id })),
    { type: 'answer', choiceId: 'missing' }, { type: 'unknown' },
  ];
  for (const state of states.map(deepFreeze)) {
    const before = structuredClone(state);
    for (const action of actions.map(deepFreeze)) {
      const actionBefore = structuredClone(action);
      const result = transitionJourney(state, action);
      assert.deepEqual(transitionJourney(state, action), result, 'the same inputs yield the same output');
      assert.deepEqual(state, before);
      assert.deepEqual(action, actionBefore);
      assert.deepEqual(Object.keys(result).sort(), Object.keys(initial).sort());
      assert.ok(getCurrentStep(result));
      getCurrentException(result);
      canAdvance(result);
    }
  }
  assert.deepEqual({ importJourney, journeyExceptions }, dataBefore);
});
