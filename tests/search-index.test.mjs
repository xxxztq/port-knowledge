import {test} from 'node:test';
import assert from 'node:assert/strict';
import {validateSearchIndex} from '../src/data/search-index.js';

const entry = {id:'page:systems/', key:'page:systems/', path:'systems/', title:'系统', summary:'简介', kind:'专题', domain:'k21', searchText:'完整正文', sections:[{title:'说明', text:'一段文字', anchor:'system-gate'}]};

test('a supported full-text index includes validated entries and sections', () => {
  const entries = [entry];
  assert.equal(validateSearchIndex({version:1, entries}), entries);
});

test('the candidate full-text index is rejected in full if any field is malformed', () => {
  for (const invalid of [null, {version:2, entries:[entry]}, {version:1, entries:[]}]) {
    assert.throws(() => validateSearchIndex(invalid), /invalid search index/);
  }
  for (const invalid of [null, {...entry, summary:1}, {...entry, sections:[null]}, {...entry, sections:[{title:'x', text:'y', anchor:1}]}, {...entry, image:{}}]) {
    assert.throws(() => validateSearchIndex({version:1, entries:[entry, invalid]}), /invalid search index entry/);
  }
});
