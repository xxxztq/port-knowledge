import {test} from 'node:test';
import assert from 'node:assert/strict';
import {foundationTopics,foundationSources} from '../src/data/port-foundations.js';
import {knowledgeCoverage} from '../src/data/knowledge-coverage.js';
test('foundations have real coverage links to their process and exception pages',()=>{for(const p of foundationTopics){const c=knowledgeCoverage.find(c=>c.id===p.domainId);assert.ok(c.coverage.exceptions.links.some(l=>l.path===`foundations/${p.id}/#exception`));assert.ok(c.coverage.interactive.links.some(l=>l.path===`foundations/${p.id}/#checks`));}});
test('every step and concept citation belongs to a real source',()=>{for(const p of foundationTopics)for(const record of [...p.steps,...p.concepts])for(const id of record.sourceIds||[])assert.ok(foundationSources.some(s=>s.id===id));});
test('the teaching cases distinguish authority, completion and actual performance',()=>{const text=id=>JSON.stringify(foundationTopics.find(p=>p.id===id));assert.match(text('governance'),/技术可用不等于/);assert.match(text('lifecycle'),/预测/);assert.match(text('environment-city'),/最终处置/);assert.match(text('spatial-levels'),/空间名称不是企业/);});
