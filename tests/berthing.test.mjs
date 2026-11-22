import test from 'node:test';
import assert from 'node:assert/strict';
import { readinessChecks, readinessCases } from '../src/data/berthing-exercises.js';
import { evaluateBerthingReadiness } from '../src/lib/berthing-model.mjs';

const arrivalIds = ['traffic', 'vessel', 'berth', 'services'];
const workIds = ['mooring', 'interface', 'cargo'];
const allIds = [...arrivalIds, ...workIds];

const emptyResult = {
  arrivalMissing: arrivalIds,
  workMissing: workIds,
  arrivalComplete: false,
  workComplete: false,
};

test('complete teaching evidence returns only condition summaries without authorization fields', () => {
  const checked = Object.freeze([...allIds]);
  const result = evaluateBerthingReadiness(checked);
  assert.deepEqual(result, {
    arrivalMissing: [],
    workMissing: [],
    arrivalComplete: true,
    workComplete: true,
  });
  assert.deepEqual(Object.keys(result).sort(), ['arrivalComplete', 'arrivalMissing', 'workComplete', 'workMissing']);
  assert.deepEqual(checked, allIds);
});

test('arrival evidence alone does not complete work and work evidence cannot replace arrival evidence', () => {
  assert.deepEqual(evaluateBerthingReadiness(arrivalIds), {
    arrivalMissing: [],
    workMissing: workIds,
    arrivalComplete: true,
    workComplete: false,
  });
  assert.deepEqual(evaluateBerthingReadiness(workIds), {
    arrivalMissing: arrivalIds,
    workMissing: [],
    arrivalComplete: false,
    workComplete: false,
  });
});

test('withdrawing updated traffic evidence or any other arrival condition invalidates work completion', () => {
  for (const id of arrivalIds) {
    const checked = [...allIds];
    const previous = evaluateBerthingReadiness(checked);
    assert.equal(previous.workComplete, true);
    checked.splice(checked.indexOf(id), 1);
    assert.deepEqual(evaluateBerthingReadiness(checked), {
      arrivalMissing: [id],
      workMissing: [],
      arrivalComplete: false,
      workComplete: false,
    }, id);
    assert.equal(previous.workComplete, true);
    checked.push(id);
    assert.equal(evaluateBerthingReadiness(checked).workComplete, true, id);
  }
});

test('being secured cannot substitute for interface or cargo conditions and every work condition is required', () => {
  assert.deepEqual(evaluateBerthingReadiness([...arrivalIds, 'mooring']), {
    arrivalMissing: [],
    workMissing: ['interface', 'cargo'],
    arrivalComplete: true,
    workComplete: false,
  });
  for (const id of workIds) {
    assert.deepEqual(evaluateBerthingReadiness(allIds.filter(checked => checked !== id)), {
      arrivalMissing: [],
      workMissing: [id],
      arrivalComplete: true,
      workComplete: false,
    }, id);
  }
});

test('unknown and duplicate inputs have no effect, input stays unchanged, and non-arrays fall back safely', () => {
  const checked = Object.freeze(['cargo', 'traffic', 'traffic', 'unknown', '', null, 7, {}, 'cargo', 'TRAFFIC', ' berth ']);
  const before = [...checked];
  assert.deepEqual(evaluateBerthingReadiness(checked), {
    arrivalMissing: ['vessel', 'berth', 'services'],
    workMissing: ['mooring', 'interface'],
    arrivalComplete: false,
    workComplete: false,
  });
  assert.deepEqual(checked, before);
  assert.deepEqual(evaluateBerthingReadiness([...allIds].reverse().concat(allIds, 'unknown')), evaluateBerthingReadiness(allIds));
  for (const input of [undefined, null, false, true, 0, 1, 'traffic', allIds.join(','), {}, { 0: 'traffic', length: 1 }, { checked: allIds }, new Set(allIds)]) {
    assert.deepEqual(evaluateBerthingReadiness(input), emptyResult);
  }
  assert.deepEqual(evaluateBerthingReadiness(), emptyResult);
  assert.deepEqual(evaluateBerthingReadiness([]), emptyResult);
});

test('seven checks and four teaching cases preserve the public contract and expected missing conditions', () => {
  assert.deepEqual(readinessChecks.map(check => check.id), allIds);
  for (const check of readinessChecks) {
    assert.deepEqual(Object.keys(check).sort(), ['detail', 'id', 'label', 'phase']);
    assert.equal(check.phase, arrivalIds.includes(check.id) ? 'arrival' : 'work');
    for (const key of ['label', 'detail']) {
      assert.equal(typeof check[key], 'string');
      assert.ok(check[key].trim().length > 0);
    }
  }

  const expected = {
    direct: { arrivalMissing: [], workMissing: workIds, arrivalComplete: true, workComplete: false },
    weather: { arrivalMissing: ['traffic'], workMissing: workIds, arrivalComplete: false, workComplete: false },
    occupied: { arrivalMissing: ['berth'], workMissing: workIds, arrivalComplete: false, workComplete: false },
    secured: { arrivalMissing: [], workMissing: ['interface', 'cargo'], arrivalComplete: true, workComplete: false },
  };
  assert.deepEqual(readinessCases.map(lesson => lesson.id), Object.keys(expected));
  for (const lesson of readinessCases) {
    assert.deepEqual(Object.keys(lesson).sort(), ['checked', 'id', 'lesson', 'story', 'title']);
    for (const key of ['title', 'story', 'lesson']) {
      assert.equal(typeof lesson[key], 'string');
      assert.ok(lesson[key].trim().length > 0);
    }
    assert.ok(Array.isArray(lesson.checked));
    assert.equal(new Set(lesson.checked).size, lesson.checked.length);
    assert.ok(lesson.checked.every(id => allIds.includes(id)));
    assert.deepEqual(evaluateBerthingReadiness(lesson.checked), expected[lesson.id], lesson.id);
  }
});
