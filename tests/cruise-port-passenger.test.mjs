import test from 'node:test';
import assert from 'node:assert/strict';
import { cruisePortPassenger } from '../src/data/scenarios/cruise-port-passenger.js';
import { scenarios } from '../src/data/scenarios.js';

test('cruise home-port turnaround is registered as a dedicated passenger scenario', () => {
  assert.equal(cruisePortPassenger.id, 'cruise-port-passenger-turnaround');
  assert.equal(scenarios.find((scenario) => scenario.id === cruisePortPassenger.id), cruisePortPassenger);
  assert.equal(cruisePortPassenger.category, '客运');
  assert.ok(cruisePortPassenger.title.includes('邮轮母港换客'));
  assert.ok(cruisePortPassenger.steps.length >= 7);
});

test('cruise scenario teaches the handoffs instead of treating a turnaround as one status', () => {
  const text = JSON.stringify(cruisePortPassenger);
  for (const keyword of ['旅客', '行李', '口岸', '系统', '异常', '费用']) assert.match(text, new RegExp(keyword));
  assert.match(cruisePortPassenger.scope, /教学简化/);
  assert.match(cruisePortPassenger.note, /收入/);
  assert.ok(cruisePortPassenger.sourceUrls.length >= 3);
  for (const url of cruisePortPassenger.sourceUrls) assert.equal(new URL(url).protocol, 'https:');
  for (const step of cruisePortPassenger.steps) {
    for (const field of ['title', 'actor', 'action', 'input', 'check', 'output', 'exception']) {
      assert.ok(step[field], `${step.title} missing ${field}`);
    }
  }
});
