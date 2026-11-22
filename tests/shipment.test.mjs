import test from 'node:test';
import assert from 'node:assert/strict';
import { shipmentCases, shipmentExceptions } from '../src/data/shipment-learning.js';
import { createShipmentState, transitionShipment, getCurrentShipmentStep, getBlockingException, canVisitShipmentStep, canAdvanceShipment } from '../src/lib/shipment-model.mjs';

const act = (state, type, props = {}) => transitionShipment(state, { type, ...props });
function enter(exception, state = createShipmentState(exception.caseId)) {
  state = act(state, 'select-case', { id: exception.caseId });
  state = act(state, 'select-step', { index: shipmentCases.find(c => c.id === exception.caseId).stages.findIndex(s => s.id === exception.stepId) });
  return act(state, 'start-exception', { id: exception.id });
}
function understand(state, exception) {
  for (const item of exception.evidence) state = act(state, 'check-evidence', { id: item.id, checked: true });
  state = act(state, 'choose-response', { id: 'safe' });
  return act(state, 'review');
}

test('both lessons navigate bounded nodes and preserve independent reading positions', () => {
  let state = createShipmentState();
  state = act(state, 'previous');
  assert.equal(state.positions.soybeans, 0);
  state = act(state, 'next');
  assert.equal(getCurrentShipmentStep(state).id, 'unloading');
  state = act(state, 'select-case', { id: 'lng' });
  state = act(state, 'select-step', { index: 6 });
  assert.equal(getCurrentShipmentStep(state).id, 'handover');
  assert.equal(canAdvanceShipment(state), false);
  assert.equal(act(state, 'next').positions.lng, 6);
  state = act(state, 'select-case', { id: 'soybeans' });
  assert.equal(state.positions.soybeans, 1);
  assert.equal(act(state, 'select-step', { index: 7 }).positions.soybeans, 1);
});

test('an open exception blocks next, direct jumps and backtracking bypasses in both lessons', () => {
  for (const exception of shipmentExceptions) {
    let state = enter(exception);
    const index = state.positions[state.caseId];
    assert.equal(getBlockingException(state).id, exception.id);
    assert.equal(canAdvanceShipment(state), false);
    assert.equal(act(state, 'next').positions[state.caseId], index);
    assert.equal(act(state, 'select-step', { index: 6 }).positions[state.caseId], index);
    state = act(state, 'previous');
    assert.equal(state.positions[state.caseId], index - 1);
    assert.equal(canVisitShipmentStep(state, index + 1), false);
    state = act(state, 'select-step', { index });
    assert.equal(state.exercises[exception.id].reviewed, false);
    assert.equal(act(state, 'select-step', { index: 6 }).positions[state.caseId], index);
  }
});

test('switching cases does not remove an unresolved regulatory exercise', () => {
  let state = enter(shipmentExceptions[0]);
  state = act(state, 'select-case', { id: 'lng' });
  state = act(state, 'next');
  assert.equal(state.positions.lng, 1);
  state = act(state, 'select-case', { id: 'soybeans' });
  assert.equal(state.positions.soybeans, 3);
  assert.equal(getBlockingException(state).id, 'soy-regulatory');
  assert.equal(canVisitShipmentStep(state, 6), false);
});

test('a click or a correct choice alone cannot finish understanding; all evidence is required', () => {
  for (const exception of shipmentExceptions) {
    let state = enter(exception);
    state = act(state, 'review');
    assert.equal(state.exercises[exception.id].reviewed, false);
    state = act(state, 'choose-response', { id: 'safe' });
    state = act(state, 'review');
    assert.equal(state.exercises[exception.id].reviewed, false);
    for (const item of exception.evidence) state = act(state, 'check-evidence', { id: item.id, checked: true });
    state = act(state, 'choose-response', { id: 'unsafe' });
    state = act(state, 'review');
    assert.equal(state.exercises[exception.id].reviewed, false);
    assert.equal(canAdvanceShipment(state), false);
  }
});

test('understanding permits conditional reading but keeps the exception record and has no operational clearance field', () => {
  for (const exception of shipmentExceptions) {
    let state = understand(enter(exception), exception);
    assert.equal(state.exercises[exception.id].reviewed, true);
    assert.equal(canAdvanceShipment(state), true);
    assert.match(state.feedback, /业务异常仍待责任方确认/);
    assert.deepEqual(Object.keys(state.exercises[exception.id]).sort(), ['checked', 'choiceId', 'reviewed']);
    state = act(state, 'next');
    assert.ok(state.exercises[exception.id]);
    state = act(state, 'previous');
    state = act(state, 'check-evidence', { id: exception.evidence[0].id, checked: false });
    assert.equal(state.exercises[exception.id].reviewed, false);
    assert.equal(canAdvanceShipment(state), false);
  }
});

test('case reset explicitly restarts teaching assumptions and preserves the other case', () => {
  let state = enter(shipmentExceptions[0]);
  state = enter(shipmentExceptions[2], state);
  state = act(state, 'reset-case');
  assert.equal(state.positions.lng, 0);
  assert.equal(state.exercises['lng-acceptance'], undefined);
  assert.ok(state.exercises['soy-regulatory']);
  assert.match(state.feedback, /不是业务恢复/);
  state = act(state, 'select-case', { id: 'soybeans' });
  assert.equal(canAdvanceShipment(state), false);
});

test('exceptions cannot be injected at another node or answered outside their checkpoint', () => {
  let state = createShipmentState();
  state = act(state, 'start-exception', { id: 'lng-acceptance' });
  assert.deepEqual(state.exercises, {});
  state = enter(shipmentExceptions[0], state);
  state = act(state, 'previous');
  const before = structuredClone(state.exercises);
  state = act(state, 'check-evidence', { id: 'authority', checked: true });
  state = act(state, 'choose-response', { id: 'safe' });
  state = act(state, 'review');
  assert.deepEqual(state.exercises, before);
});

test('transitions preserve input state and reject forged understanding completion', () => {
  const exception = shipmentExceptions[0];
  const state = enter(exception);
  const before = structuredClone(state);
  Object.freeze(state.exercises[exception.id].checked);
  Object.freeze(state.exercises[exception.id]);
  Object.freeze(state.exercises);
  Object.freeze(state.positions);
  Object.freeze(state);
  const result = act(state, 'check-evidence', { id: 'scope', checked: true });
  assert.deepEqual(state, before);
  assert.notDeepEqual(result.exercises, state.exercises);
  const forged = { ...state, exercises: { [exception.id]: { checked: [], choiceId: 'safe', reviewed: true } } };
  assert.equal(canAdvanceShipment(forged), false);
  assert.throws(() => act(forged, 'next'), TypeError);
});
