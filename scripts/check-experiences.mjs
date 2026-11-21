import assert from 'node:assert/strict';
import {importJourney,journeyExceptions} from '../src/data/container-journey.js';
import {portSystems,systemSources} from '../src/data/port-systems.js';
import {articles} from '../src/data/knowledge.js';
import {equipmentVisuals} from '../src/data/equipment-visuals.js';
const systemIds=new Set(portSystems.map(s=>s.id));
const sourceIds=new Set(systemSources.map(s=>s.id));
assert.equal(systemIds.size,portSystems.length,'Duplicate system IDs');
assert.equal(sourceIds.size,systemSources.length,'Duplicate system source IDs');
assert.equal(importJourney.steps.length,7);assert.equal(journeyExceptions.length,3);
for(const s of importJourney.steps){assert.ok(systemIds.has(s.systemId),s.id+' missing system '+s.systemId);assert.ok(articles.some(a=>a.id===s.articleId),s.id+' missing article');if(s.equipmentId)assert.ok(equipmentVisuals.some(v=>v.id===s.equipmentId),s.id+' missing equipment');for(const k of ['title','location','actor','summary','action','input','output','cargoState','documentState','systemEvent','costNote'])assert.ok(typeof s[k]==='string'&&s[k].length,s.id+' missing '+k);assert.ok(s.checks.length);}
for(const e of journeyExceptions){assert.ok(importJourney.steps.some(s=>s.id===e.stepId));assert.equal(e.choices.filter(c=>c.correct).length,1);assert.ok(e.resolution);}
for(const s of portSystems){for(const k of ['name','group','summary','responsibility','boundary','exception'])assert.ok(s[k],s.id+' missing '+k);for(const k of ['inputs','outputs','partners'])assert.ok(Array.isArray(s[k])&&s[k].length,s.id+' missing '+k);for(const p of s.partners)assert.ok(systemIds.has(p),s.id+' unknown partner '+p);assert.ok(s.sources?.length,s.id+' needs references');for(const id of s.sources)assert.ok(sourceIds.has(id),s.id+' unknown source '+id);}
for(const s of systemSources){assert.equal(new URL(s.url).protocol,'https:');assert.ok(s.title&&s.org&&s.checked&&s.scope);}
for(const id of ['container-tos','general-cargo','gate','equipment-control','customs','single-window','carrier','transport','finance','maintenance','data-exchange'])assert.ok(systemIds.has(id),'Required system '+id);
console.log('Experiences OK: 7 journey steps, 3 exceptions, '+portSystems.length+' systems, '+systemSources.length+' primary references.');
