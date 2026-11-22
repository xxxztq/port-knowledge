import assert from 'node:assert/strict';
import {domains} from '../src/data/knowledge.js';
import {cargoProfiles} from '../src/data/cargo-business.js';
import {coverageDimensions,coverageGroups,knowledgeCoverage,learningPaths,rolePaths} from '../src/data/knowledge-coverage.js';
import {shipmentCases,shipmentLanes,shipmentExceptions,shipmentSources} from '../src/data/shipment-learning.js';
import {learningSearchEntries} from '../src/data/learning-search.js';
const unique = (items,label) => assert.equal(new Set(items).size,items.length,'Duplicate '+label);
const links = (items) => {for(const item of items){assert.ok(item.label&&item.path);assert.ok(!item.path.startsWith('/'),'Paths must respect the site base');}};
unique(knowledgeCoverage.map(d=>d.id),'coverage IDs');
assert.deepEqual(knowledgeCoverage.map(d=>d.id).sort(),domains.map(d=>d.id).sort());
assert.deepEqual(coverageGroups.flatMap(g=>g.domains).sort(),domains.map(d=>d.id).sort(),'Each domain belongs to exactly one group');
for(const domain of knowledgeCoverage){
 assert.ok(coverageGroups.some(g=>g.id===domain.groupId&&g.domains.includes(domain.id)));
 const gaps=[];
 for(const dimension of coverageDimensions){const cell=domain.coverage[dimension.id];assert.ok(cell.note);links(cell.links);if(!cell.links.length)gaps.push(dimension.title);}
 assert.deepEqual(domain.gaps,gaps);links(domain.topics);assert.ok(domain.next&&domain.searchText);
}
for(const route of [...learningPaths,...rolePaths]){assert.ok(route.title);for(const step of route.steps){assert.ok(step.title&&step.purpose&&step.path);}}
unique(shipmentCases.map(c=>c.id),'shipment cases');unique(shipmentExceptions.map(e=>e.id),'shipment exceptions');
assert.equal(shipmentLanes.length,5);
for(const lesson of shipmentCases){assert.ok(cargoProfiles.some(p=>p.id===lesson.profile));assert.equal(lesson.stages.length,7);unique(lesson.stages.map(s=>s.id),lesson.id+' stages');for(const stage of lesson.stages){assert.equal(stage.lines.length,shipmentLanes.length);assert.ok(stage.title&&stage.location&&stage.summary);for(const line of stage.lines){assert.ok(line.from&&line.to&&line.note);}}}
for(const exception of shipmentExceptions){const lesson=shipmentCases.find(c=>c.id===exception.caseId);assert.ok(lesson?.stages.some(s=>s.id===exception.stepId));assert.ok(exception.tasks.length&&exception.evidence.length&&exception.recovery);assert.ok(exception.affected.every(id=>shipmentLanes.some(l=>l.id===id)));}
unique(shipmentSources.map(s=>s.id),'shipment sources');for(const source of shipmentSources){assert.equal(new URL(source.url).protocol,'https:');assert.ok(source.title&&source.org&&source.scope&&source.checked);}
assert.equal(learningSearchEntries.length,4);unique(learningSearchEntries.map(s=>s.id),'learning search IDs');for(const entry of learningSearchEntries){assert.ok(entry.searchText&&domains.some(d=>d.id===entry.domain));}
console.log('Learning OK: '+knowledgeCoverage.length+' domains / '+coverageGroups.length+' groups, '+learningPaths.length+' routes / '+rolePaths.length+' roles; '+shipmentCases.length+' shipment cases / '+shipmentExceptions.length+' exceptions.');
