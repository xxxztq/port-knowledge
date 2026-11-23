import assert from 'node:assert/strict';
import test from 'node:test';
import { customsTransit, transitStages, transitStatuses, transitComparisons, customsTransitQuiz } from '../src/data/scenarios/customs-transit.js';

const copy = value => JSON.stringify(value);
test('customs transit teaching chain covers declaration through distinct closeout states', () => {
  assert.equal(customsTransit.id, 'customs-transit');
  assert.equal(customsTransit.steps.length, 7);
  const text = copy(customsTransit.steps);
  for (const phrase of ['进境地申报转关', '核对交付条件', '封志', '车辆', '在途', '异常', '运抵', '核销', '进口放行']) assert.ok(text.includes(phrase), `missing ${phrase}`);
  assert.match(text, /不得.*开拆|不自行换车/);
  assert.match(customsTransit.steps[5].action, /不代表进口货物已经放行/);
});

test('status model does not collapse customs release, arrival, transit cancellation and delivery', () => {
  assert.equal(transitStatuses.length, 5);
  assert.match(transitStatuses[0].limit, /进口货物已放行/);
  assert.match(transitStatuses[1].limit, /转关已核销/);
  assert.match(transitStatuses[2].limit, /其他监管限制均已解除/);
  assert.equal(transitStatuses[3].label, '进口放行');
  assert.equal(transitStatuses[4].label, '实际交付');
});

test('teaching page distinguishes ordinary sea-rail, bonded warehousing and international transshipment', () => {
  assert.equal(transitComparisons.length, 3);
  const text = copy(transitComparisons);
  for (const phrase of ['海铁联运', '保税仓储', '保税国际中转']) assert.ok(text.includes(phrase));
  assert.match(text, /不自动等于转关/);
  assert.match(text, /不等于已办保税入库/);
  assert.match(text, /限定在海关特殊监管区域或保税物流中心/);
  assert.match(text, /不能泛化成所有港口换船接续/);
});

test('scope avoids fixed technical protocols and the page lists official source URLs', () => {
  assert.match(customsTransit.scope, /教学简化/);
  assert.match(customsTransit.note, /不预设申报时限、报文代码/);
  assert.match(customsTransit.references.find(source => source.id === 'arrival-report').scope, /不作为当前操作依据/);
  assert.match(customsTransit.references.find(source => source.id === 'arrival-report').scope, /未独立确认其现行效力/);
  assert.ok(customsTransit.references.length >= 5);
  for (const source of customsTransit.references) {
    assert.equal(new URL(source.url).protocol, 'https:');
    assert.ok(source.title && source.scope);
  }
  assert.deepEqual(transitStages.flatMap(stage => stage.steps), customsTransit.steps.map((_, i) => i));
  const referenceIds = new Set(customsTransit.references.map(({id}) => id));
  assert.equal(referenceIds.size, customsTransit.references.length);
  for (const step of customsTransit.steps) {
    assert.ok(step.references.length);
    for (const reference of step.references) assert.ok(referenceIds.has(reference));
  }
  for (const comparison of transitComparisons) assert.ok(referenceIds.has(comparison.reference));
});

test('arrival learning check teaches separate verification before delivery', () => {
  assert.equal(customsTransitQuiz.options.filter(option => option.correct).length, 1);
  assert.match(customsTransitQuiz.options.find(option => option.correct).text, /转关核销、进口放行/);
});
