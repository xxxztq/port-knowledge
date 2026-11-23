import {test} from 'node:test';
import assert from 'node:assert/strict';
import {validateSearchIndex} from '../src/data/search-index.js';
import {matchEntry} from '../src/lib/search-model.mjs';

const entry = {id:'page:systems/',key:'page:systems/',path:'systems/',title:'港口系统',summary:'系统简介',kind:'专题',domain:'k21',keywords:'TOS 单一窗口',sections:[{title:'系统交互',text:'港口作业系统把海关回执、闸口授权和实际通行记录串联起来。',anchor:'system-gate'}]};

test('v2 full-text index validates a single authoritative body copy in sections', () => {
  const entries = [entry];
  assert.equal(validateSearchIndex({version:2,entries}),entries);
  assert.equal('searchText' in entries[0],false);
  assert.equal('fullText' in entries[0],false);
});

test('full-text search matches Chinese section text and returns its deep link', () => {
  const result=matchEntry(entry,{q:'实际通行记录',kind:'全部',domain:'all'});
  assert.ok(result);
  assert.equal(result.href,'systems/#system-gate');
  assert.equal(result.section,'系统交互');
});

test('summary index retains editorial question navigation without the full index', () => {
  const summary={...entry,id:'page:brands/',key:'page:brands/',path:'brands/',title:'品牌专题',sections:[],searchText:'粉红洋红 ONE'};
  const result=matchEntry(summary,{q:'粉红色集装箱',kind:'全部',domain:'all'});
  assert.ok(result);
  assert.equal(result.href,'brands/#pink-container');
  assert.equal(result.reason,'相关问题导航');
});

test('unsupported versions and malformed full-text entries are rejected atomically', () => {
  for (const invalid of [null,{version:1,entries:[entry]},{version:2,entries:[]},{version:2,entries:[null]}]) {
    assert.throws(()=>validateSearchIndex(invalid),/invalid search index/);
  }
  for (const invalid of [
    {...entry,summary:1},
    {...entry,keywords:undefined},
    {...entry,sections:[null]},
    {...entry,sections:[{title:'x',text:'y',anchor:1}]},
    {...entry,image:{}},
    {...entry,searchText:'重复全文'},
    {...entry,fullText:'重复全文'},
  ]) assert.throws(()=>validateSearchIndex({version:2,entries:[entry,invalid]}),/invalid search index entry/);
});
