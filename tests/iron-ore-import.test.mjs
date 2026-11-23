import test from 'node:test';
import assert from 'node:assert/strict';
import { scenarios } from '../src/data/scenarios.js';
import { ironOreImportScenario } from '../src/data/scenarios/iron-ore-import.js';
import { knowledgeCoverage } from '../src/data/knowledge-coverage.js';
import { cargoProfiles } from '../src/data/cargo-business.js';
import { vesselProfiles } from '../src/data/vessel-types.js';

test('iron-ore import is registered as a dedicated dry-bulk scenario', () => {
  assert.equal(scenarios.find((item) => item.id === ironOreImportScenario.id), ironOreImportScenario);
  assert.equal(ironOreImportScenario.id, 'iron-ore-import');
  assert.equal(ironOreImportScenario.category, '散货');
  assert.equal(ironOreImportScenario.steps.length, 7);
  assert.match(ironOreImportScenario.scope, /教学简化/);
  assert.match(ironOreImportScenario.note, /不构成|不表示|不代表/);
});

test('iron-ore process follows unloading, stock, measurement and quality, delivery, and service settlement', () => {
  const titles = ironOreImportScenario.steps.map((step) => step.title).join(' ');
  for (const phrase of ['卸船', '堆存', '数量', '品质', '交付', '费用边界']) assert.match(titles + ironOreImportScenario.summary, new RegExp(phrase));
  for (const step of ironOreImportScenario.steps) {
    for (const field of ['title', 'actor', 'action', 'input', 'check', 'output', 'system', 'exception']) {
      assert.ok(typeof step[field] === 'string' && step[field].trim().length > 0, `${step.title} missing ${field}`);
    }
  }
  assert.match(ironOreImportScenario.steps[5].check, /汽车闸口.*铁路/);
  assert.match(ironOreImportScenario.steps[6].check, /不默认归码头收入/);
  assert.ok(ironOreImportScenario.sourceUrls.length >= 4);
  for (const url of ironOreImportScenario.sourceUrls) assert.equal(new URL(url).protocol, 'https:');
});

test('dry-bulk coverage links identify the independent iron-ore case without implying all minerals are covered', () => {
  const dryBulk = knowledgeCoverage.find((item) => item.id === 'k11');
  assert.ok(dryBulk);
  assert.ok(dryBulk.coverage.process.links.some((link) => link.path === 'scenarios/iron-ore-import/'));
  assert.ok(dryBulk.coverage.exceptions.links.some((link) => link.path === 'scenarios/iron-ore-import/#step-4'));
  assert.match(dryBulk.coverage.process.note, /不外推为全部矿种/);
  assert.match(dryBulk.next, /不能把铁矿石案例视为所有散货/);
});

test('iron-ore cargo and bulk-carrier pages both link to the dedicated import scenario', () => {
  const ore = cargoProfiles.find((item) => item.id === 'iron-ore');
  const vessel = vesselProfiles.find((item) => item.id === 'bulk-carrier');
  assert.ok(ore?.links.some((link) => link.path === 'scenarios/iron-ore-import/'));
  assert.ok(vessel?.links.some((link) => link.path === 'scenarios/iron-ore-import/'));
});
