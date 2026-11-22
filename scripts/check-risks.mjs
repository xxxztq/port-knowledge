import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {portRisks,riskSources} from '../src/data/port-risks.js';
import {cargoRiskMap,riskSearchEntries,riskCases} from '../src/data/risk-learning.js';
import {cargoProfiles} from '../src/data/cargo-business.js';
const text=(x,label)=>assert.ok(typeof x==='string'&&x.trim(),label+' needs text');
const unique=(rows,label)=>assert.equal(new Set(rows.map(r=>r.id)).size,rows.length,label+' unique IDs');
unique(portRisks,'risks');unique(riskSources,'sources');unique(riskSearchEntries,'search');unique(riskCases,'cases');
assert.equal(portRisks.length,12);
const ids=new Set(portRisks.map(r=>r.id));const sourceIds=new Set(riskSources.map(s=>s.id));
for(const s of riskSources){for(const k of ['id','title','org','scope','checked'])text(s[k],s.id+' '+k);assert.match(s.checked,/^\d{4}-\d{2}-\d{2}$/);assert.equal(new URL(s.url).protocol,'https:');}
for(const r of portRisks){
 assert.match(r.id,/^[a-z-]+$/);for(const k of ['title','category','summary','owner','recovery'])text(r[k],r.id+' '+k);
 assert.ok(['人员与作业','货物与环境','授权与经营'].includes(r.category));
 for(const k of ['where','signals','prevention','response','partners','records']){assert.ok(Array.isArray(r[k])&&r[k].length,r.id+' '+k);r[k].forEach(x=>text(x,r.id+' '+k));}
 for(const k of ['cargo','trigger','decision'])text(r.example[k],r.id+' example '+k);
 assert.ok(r.sources.length);r.sources.forEach(id=>assert.ok(sourceIds.has(id),r.id+' source '+id));
 assert.ok(r.related.length);r.related.forEach(l=>{text(l.label,r.id+' link');assert.match(l.path,/^[a-z][a-z0-9/\-#]*$/);});
}
for(const p of cargoProfiles){const refs=p.riskIds??cargoRiskMap[p.id];assert.ok(refs?.length,p.id+' risk coverage');refs.forEach(id=>assert.ok(ids.has(id),p.id+' risk '+id));}
assert.equal(riskSearchEntries.length,portRisks.length);riskSearchEntries.forEach(e=>{text(e.searchText,e.id);assert.equal(e.kind,'风险');assert.match(e.domain,/^k\d{2}$/);});
for(const c of riskCases){assert.ok(cargoProfiles.some(p=>c.cargoPath==='cargo/'+p.id+'/'));c.riskIds.forEach(id=>assert.ok(ids.has(id)));assert.equal(c.quiz.options.filter(o=>o.correct).length,1);c.quiz.options.forEach(o=>{text(o.text,c.id);text(o.feedback,c.id)});assert.ok(c.trace.length>=3);}
const svg=await fs.readFile('public/illustrations/risk-overview.svg','utf8');assert.ok(svg.includes('viewBox="0 0 720 360"'));assert.doesNotMatch(svg,/<script|onload=|javascript:/i);
console.log(`Risks OK: ${portRisks.length} risk files, ${riskSources.length} sources, ${riskCases.length} learning scenarios; every cargo linked to risk prevention.`);
