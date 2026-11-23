import test from 'node:test';
import assert from 'node:assert/strict';
import { brandCategories, brandHandoffs, brandSources, portBrands } from '../src/data/brand-guide.js';

test('brand guide covers distinct shipping, asset, manufacturing and port roles', () => {
  assert.deepEqual(brandCategories, ['全部', '班轮承运人', '箱体资产', '箱体制造', '港口与码头']);
  assert.equal(new Set(portBrands.map((brand) => brand.id)).size, portBrands.length);
  for (const brand of portBrands) {
    assert.ok(brand.name && brand.english && brand.mark && brand.summary && brand.clue && brand.distinction, brand.id);
    assert.ok(brand.sources.length, brand.id);
    for (const id of brand.sources) assert.ok(brandSources.some((source) => source.id === id), `${brand.id}: missing source ${id}`);
  }
  assert.deepEqual(portBrands.filter((brand) => brand.category === '班轮承运人').map((brand) => brand.id), ['maersk', 'cosco-lines', 'oocl', 'msc', 'one', 'cma-cgm', 'hapag-lloyd']);
  assert.ok(portBrands.some((brand) => brand.id === 'cimc' && brand.category === '箱体制造'));
  assert.ok(portBrands.some((brand) => brand.id === 'nbzh' && brand.category === '港口与码头'));
});

test('brand sources are unique, secure, and include the panda and identifier evidence', () => {
  assert.equal(new Set(brandSources.map((source) => source.id)).size, brandSources.length);
  assert.equal(new Set(brandSources.map((source) => source.url)).size, brandSources.length);
  for (const source of brandSources) {
    assert.equal(new URL(source.url).protocol, 'https:');
    assert.ok(source.title && source.org && source.date && source.scope, source.id);
  }
  assert.ok(brandSources.some((source) => source.id === 'panda' && source.scope.includes('吉祥物')));
  assert.ok(brandSources.some((source) => source.id === 'bic-cir'));
  assert.equal(brandHandoffs.length, 4);
  assert.equal(new Set(brandHandoffs.map((item) => item.label)).size, brandHandoffs.length);
});
