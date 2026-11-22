import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {berthingSteps,berthingRoles,berthingGlossary,berthingAftercare,berthingMisconceptions,berthingSources} from '../src/data/berthing-learning.js';
import {readinessCases,readinessChecks} from '../src/data/berthing-exercises.js';
import {learningSearchEntries} from '../src/data/learning-search.js';
import {knowledgeCoverage} from '../src/data/knowledge-coverage.js';
const unique=(values,label)=>assert.equal(new Set(values).size,values.length,'Duplicate '+label);
const text=(value,label)=>assert.ok(typeof value==='string'&&value.trim(),label+' must contain text');
unique(berthingSteps.map(s=>s.id),'step IDs');unique(berthingSources.map(s=>s.id),'source IDs');unique(berthingRoles.map(r=>r.id),'role IDs');
assert.deepEqual(berthingSteps.map(s=>s.id),['prearrival','anchorage','readiness','pilotage','channel','turning','alongside','mooring','handover']);
const map=await readFile(new URL('../src/components/BerthingMap.astro',import.meta.url),'utf8');
for(const step of berthingSteps){
 for(const key of ['title','place','summary','ship','shore','records','conditions','handoff','exception'])text(step[key],step.id+'.'+key);
 assert.ok(step.terms.length&&step.sourceIds.length);
 for(const id of step.sourceIds)assert.ok(berthingSources.some(source=>source.id===id),'Missing source '+id);
 assert.ok(map.includes('data-berth-point="'+step.id+'"'),'Missing map marker '+step.id);
}
for(const role of berthingRoles)for(const key of ['name','does','boundary','receives','handsOff'])text(role[key],role.id+'.'+key);
for(const item of berthingGlossary)for(const key of ['term','meaning','distinction'])text(item[key],key);
for(const item of berthingAftercare){text(item.title,'aftercare title');text(item.text,'aftercare explanation');assert.ok(item.checks.length);}
for(const item of berthingMisconceptions){text(item.claim,'misconception');text(item.correction,'correction');}
for(const source of berthingSources){assert.equal(new URL(source.url).protocol,'https:');for(const key of ['title','org','checked','scope'])text(source[key],source.id+'.'+key);}
for(const item of readinessCases)assert.ok(item.checked.every(id=>readinessChecks.some(c=>c.id===id)));
assert.ok(learningSearchEntries.some(e=>e.path==='berthing/'&&e.domain==='k08'));
assert.ok(knowledgeCoverage.find(d=>d.id==='k08').coverage.interactive.links.some(l=>l.path==='berthing/#readiness-lab'));
console.log('Berthing OK: '+berthingSteps.length+' stages, '+berthingRoles.length+' roles, '+berthingGlossary.length+' glossary entries, '+readinessCases.length+' teaching scenarios.');
