import assert from 'node:assert/strict';
import { brandsAndPortsReviewedOn, brandPortSources, portComparisons } from '../src/data/brands-and-ports.js';

const unique = (items, label) => assert.equal(new Set(items.map((item) => item.id)).size, items.length, `${label} IDs must be unique`);
const sourceIds = new Set(brandPortSources.map((item) => item.id));
unique(brandPortSources, 'source');
unique(portComparisons, 'port');
assert.match(brandsAndPortsReviewedOn, /^2026-\d{2}-\d{2}$/);

for (const source of brandPortSources) {
  for (const key of ['title', 'organization', 'scope']) assert.ok(source[key]?.trim(), `${source.id} missing ${key}`);
  assert.equal(new URL(source.url).protocol, 'https:');
}

for (const port of portComparisons) {
  for (const key of ['name', 'subtitle', 'terminal', 'operator', 'label', 'cargo', 'equipment', 'systems', 'lesson']) assert.ok(port[key], `${port.id} missing ${key}`);
  assert.ok(port.operations.length >= 3, `${port.id} needs an observable operation chain`);
  assert.ok(port.sources.length);
  for (const id of port.sources) assert.ok(sourceIds.has(id), `${port.id} references missing source ${id}`);
}

assert.equal(portComparisons.find((port) => port.id === 'shanghai')?.operator, '上海沪东集装箱码头有限公司（SECT）');
assert.ok(portComparisons.find((port) => port.id === 'ningbo-zhoushan')?.cargo.includes('铁矿石'));
assert.ok(brandPortSources.some((source) => source.id === 'shanghai-east-terminal'));
assert.ok(brandPortSources.some((source) => source.id === 'ningbo-shulanghu'));

console.log(`Port cases OK: ${portComparisons.length} port profiles, ${portComparisons.reduce((sum, port) => sum + port.operations.length, 0)} operation checkpoints, ${brandPortSources.length} scoped sources.`);
