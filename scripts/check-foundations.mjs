import assert from 'node:assert/strict';
import {foundationTopics,foundationSources} from '../src/data/port-foundations.js';
assert.equal(foundationTopics.length,5);
assert.equal(new Set(foundationTopics.map(p=>p.id)).size,5);
for(const p of foundationTopics){assert.ok(p.scenario.fictional&&p.scenario.story&&p.scenario.goal);assert.ok(p.steps.length>=4);assert.equal(new Set(p.steps.map(s=>s.id)).size,p.steps.length);for(const s of p.steps)for(const key of ['id','title','actor','input','action','check','output','downstream'])assert.ok(s[key],p.id+' missing '+key);assert.ok(p.handoffs.length>=3&&p.economics.length>=2);assert.ok(p.exception.fictional&&p.exception.records.length>=3&&p.exception.recovery.length>=3);for(const key of ['title','story','trigger','containment','decision','closure'])assert.ok(p.exception[key]);assert.equal(p.questions.length,3);for(const q of p.questions)assert.ok(q.options.length>=3&&q.answer>=0&&q.answer<q.options.length&&q.explanation);for(const id of p.sourceIds)assert.ok(foundationSources.some(s=>s.id===id));}
console.log('Foundations OK: 5 complete teaching cases, workflows, handoffs, economics, exceptions and 15 questions.');
