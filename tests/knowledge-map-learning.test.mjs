import assert from 'node:assert/strict';
import { test } from 'node:test';
import { scenarios } from '../src/data/scenarios.js';
import { cargoCoverage } from '../src/data/cargo-learning.js';
import { coverageDimensions, interactionNames, knowledgeCoverage, learningPaths } from '../src/data/knowledge-coverage.js';
import { shipmentCases, shipmentExceptions } from '../src/data/shipment-learning.js';

test('knowledge map distinguishes entry gaps, dedicated case gaps, and actionable deepening', () => {
  assert.equal(knowledgeCoverage.length, 24);
  assert.equal(knowledgeCoverage.filter((domain) => domain.development.missingEntry).length, 0);
  const caseGaps = knowledgeCoverage.filter((domain) => domain.development.missingCase);
  assert.deepEqual(caseGaps.map((domain) => domain.id), ['k14']);
  assert.equal(caseGaps[0].development.missingCase.title, '邮轮母港换客');
  assert.equal(knowledgeCoverage.filter((domain) => domain.development.canDeepen).length, 24);
  for (const domain of knowledgeCoverage) {
    assert.equal(domain.development.missingEntry, domain.gaps.length > 0);
    assert.equal(domain.development.canDeepen, Boolean(domain.next.trim()));
    for (const dimension of coverageDimensions) {
      assert.ok(domain.coverage[dimension.id].note);
      for (const entry of domain.coverage[dimension.id].links) {
        assert.ok(entry.label && entry.path && !entry.path.startsWith('/'));
        if (dimension.id === 'interactive') assert.ok(interactionNames[entry.kind], `${domain.id}: ${entry.kind}`);
      }
    }
  }
});

test('interactive labels distinguish exploration and comparison from answerable practice', () => {
  const byId = Object.fromEntries(knowledgeCoverage.map((domain) => [domain.id, domain]));
  assert.equal(byId.k17.coverage.interactive.links[0].kind, 'field-exploration');
  assert.equal(byId.k18.coverage.interactive.links[0].kind, 'field-exploration');
  assert.equal(byId.k11.coverage.interactive.links[0].kind, 'comparison');
  assert.equal(byId.k16.coverage.interactive.links[0].kind, 'comparison');
  assert.equal(byId.k19.coverage.interactive.links[0].kind, 'simulation');
  assert.equal(byId.k24.coverage.interactive.links[0].kind, 'calculator');
  assert.equal(byId.k17.coverage.interactive.links.some((entry) => entry.kind === 'exercise'), false);
  assert.equal(byId.k18.coverage.interactive.links.some((entry) => entry.kind === 'exercise'), false);
  assert.equal(byId.k10.coverage.interactive.links.some((entry) => entry.kind === 'exercise'), true);
});

test('container cargo map points to the existing complete finished-vehicle ro-ro scenario', () => {
  const entry = cargoCoverage.find((item) => item.name.includes('商品车'));
  assert.equal(entry?.level, '业务场景');
  assert.equal(entry?.path, 'scenarios/ro-ro-finished-vehicles/');
  assert.ok(scenarios.some((scenario) => scenario.id === 'ro-ro-finished-vehicles'));
  assert.match(entry.focus, /逐车验收/);
  assert.match(entry.focus, /不外推/);
});

test('customs transit is linked from both regulatory workflow and an in-transit exception', () => {
  const customs = knowledgeCoverage.find((domain) => domain.id === 'k19');
  assert.ok(customs.coverage.process.links.some((entry) => entry.path === 'scenarios/customs-transit/'));
  assert.ok(customs.coverage.exceptions.links.some((entry) => entry.path === 'scenarios/customs-transit/#step-3'));
  assert.ok(scenarios.some((scenario) => scenario.id === 'customs-transit'));
});

test('one-shipment learning branches follow every real soy and LNG node without false page-level progress', () => {
  const route = learningPaths.find((item) => item.id === 'one-shipment');
  assert.equal(route.branches.length, 2);
  assert.equal(route.steps.length, 0, 'same-page anchors are navigation, not separately tracked read steps');
  assert.deepEqual(route.branches.map((branch) => branch.id), ['soybeans', 'lng']);
  for (const branch of route.branches) {
    const lesson = shipmentCases.find((item) => item.id === branch.id);
    assert.ok(lesson);
    assert.equal(branch.steps.length, lesson.stages.length);
    assert.equal(branch.profile.path, `cargo/${lesson.profile}/`);
    for (const [index, item] of branch.steps.entries()) {
      const stage = lesson.stages[index];
      assert.equal(item.path, `shipment/#${lesson.id}-${stage.id}`);
      assert.equal(item.hasExercise, shipmentExceptions.some((exception) => exception.caseId === lesson.id && exception.stepId === stage.id));
    }
  }
  assert.deepEqual(route.comparisons.map((item) => item.path), ['documents/', 'gate/#sim-title']);
  assert.ok(route.comparisons.every((item) => !route.branches.some((branch) => branch.steps.includes(item))));
  const first = learningPaths.find((item) => item.id === 'first-port');
  assert.equal(first.nextStep.path, 'cargo/');
});
