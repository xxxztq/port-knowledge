import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {vesselProfiles,vesselSources,vesselGroups,supportVessels} from '../src/data/vessel-types.js';
import {vesselSearchEntries,vesselQuiz} from '../src/data/vessel-learning.js';
import {mineralUses,mineralRoutes,mineralQuiz} from '../src/data/mineral-learning.js';
import {cargoProfiles} from '../src/data/cargo-business.js';
import {portRisks} from '../src/data/port-risks.js';
const text=(v,label)=>assert.ok(typeof v==='string'&&v.trim(),label+' needs text');
const unique=(items,label)=>assert.equal(new Set(items.map(x=>x.id)).size,items.length,label+' duplicate IDs');
for(const [label,items] of Object.entries({vesselProfiles,vesselSources,vesselGroups,supportVessels,vesselSearchEntries,mineralUses,mineralRoutes}))unique(items,label);
const riskIds=new Set(portRisks.map(x=>x.id)),sourceIds=new Set(vesselSources.map(x=>x.id)),groups=new Set(vesselGroups.map(x=>x.id));
for(const s of vesselSources){for(const k of ['title','org','scope','checked'])text(s[k],s.id+' '+k);assert.equal(new URL(s.url).protocol,'https:');assert.match(s.checked,/^\d{4}-\d{2}-\d{2}$/);}
for(const p of vesselProfiles){assert.match(p.id,/^[a-z-]+$/);for(const k of ['name','english','summary','method','portFit','identity','limits'])text(p[k],p.id+' '+k);assert.ok(groups.has(p.group),p.id+' group');for(const k of ['cargo','checks']){assert.ok(p[k].length,p.id+' '+k);p[k].forEach(x=>text(x,p.id+' '+k));}assert.ok(p.distinctions.length>=3,p.id+' distinctions');p.distinctions.forEach(d=>{text(d.title,p.id);text(d.text,p.id)});assert.ok(p.stages.length>=5,p.id+' stages');p.stages.forEach(s=>['title','actor','action','record'].forEach(k=>text(s[k],p.id+' stage '+k)));assert.ok(p.sources.length);p.sources.forEach(id=>assert.ok(sourceIds.has(id),p.id+' source '+id));assert.ok(p.riskIds.length);p.riskIds.forEach(id=>assert.ok(riskIds.has(id),p.id+' risk '+id));for(const link of [...p.links,...p.systemLinks]){text(link.label,p.id+' link');assert.match(link.path,/^\/?[a-z][a-z0-9/#-]*$/);assert.ok(!link.path.includes('..'));}p.systemLinks.forEach(l=>text(l.text,p.id+' system'));assert.equal(p.visual,'/illustrations/vessels/'+p.id+'.svg');const svg=await fs.readFile('public'+p.visual,'utf8');assert.ok(svg.includes('viewBox="0 0 720 360"'),p.id+' visual size');assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.doesNotMatch(svg,/<script|onload=|javascript:/i);}
for(const s of supportVessels)['name','text','distinction'].forEach(k=>text(s[k],s.id+' '+k));
assert.equal(vesselSearchEntries.length,vesselProfiles.length);vesselSearchEntries.forEach(e=>{text(e.searchText,e.id);assert.equal(e.kind,'船型');assert.match(e.domain,/^k\d{2}$/)});
for(const m of mineralUses){assert.ok(cargoProfiles.some(p=>p.id===m.id),m.id+' cargo profile');text(m.use,m.id);text(m.question,m.id);}
for(const r of mineralRoutes)['name','record','limit'].forEach(k=>text(r[k],r.id+' '+k));
for(const q of [vesselQuiz,mineralQuiz]){assert.equal(q.options.filter(o=>o.correct).length,1);q.options.forEach(o=>{text(o.text,q.id);text(o.feedback,q.id)})}
console.log('Vessels OK: '+vesselProfiles.length+' vessel files, '+vesselSources.length+' sources, '+supportVessels.length+' support vessel entries; '+mineralUses.length+' raw-material guides and '+mineralRoutes.length+' outbound routes.');
