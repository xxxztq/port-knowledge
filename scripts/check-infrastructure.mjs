import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {infrastructureTopics as topics,infrastructureSources as sources,hardware,yardModes,infrastructureSearchEntries as entries} from '../src/data/infrastructure.js';
import {domains} from '../src/data/knowledge.js';
const text=(v,label)=>assert.ok(typeof v==='string'&&v.trim(),label+' requires text');
const unique=(list,label)=>{assert.equal(new Set(list.map(x=>x.id)).size,list.length,label+' unique IDs');list.forEach(x=>assert.match(x.id,/^[a-z0-9-]+$/));};
for(const [name,list] of Object.entries({topics,sources,hardware,yardModes,entries}))unique(list,name);
for(const s of sources){['title','org','scope'].forEach(k=>text(s[k],s.id+' '+k));assert.equal(new URL(s.url).protocol,'https:');assert.match(s.checked,/^\d{4}-\d{2}-\d{2}$/);}
for(const t of topics){['title','eyebrow','summary','scope'].forEach(k=>text(t[k],t.id+' '+k));assert.ok(domains.some(d=>d.id===t.domain));assert.ok(t.aliases.length);assert.ok(t.chapters.length>=5);unique(t.chapters,t.id+' chapters');for(const c of t.chapters){text(c.title,c.id);text(c.summary,c.id);assert.ok(c.points.length>=3);c.points.forEach(p=>{text(p.title,c.id);text(p.text,c.id);});}
for(const field of ['intro','misconceptions']){assert.ok(t[field].length>=3);t[field].forEach(v=>{text(v.title,t.id);text(v.text,t.id)});}
assert.ok(t.handoffs.length>=4);t.handoffs.forEach(h=>['from','to','record','check'].forEach(k=>text(h[k],t.id+' handoff '+k)));
assert.ok(t.sources.length>=4);t.sources.forEach(id=>assert.ok(sources.some(s=>s.id===id),id));t.links.forEach(l=>{text(l.label,t.id);assert.match(l.path,/^\/?[a-z]/);assert.ok(!l.path.includes('..')&&!l.path.startsWith('http'));});
assert.match(t.visual,/^\/illustrations\/infrastructure\/[a-z-]+\.svg$/);const svg=await fs.readFile('public'+t.visual,'utf8');assert.ok(svg.includes('viewBox="0 0 720 360"'));assert.doesNotMatch(svg,/<script|onload=|javascript:/i);
}
assert.ok(hardware.length>=12);hardware.forEach(h=>['name','category','analogy','role','portExample','failure','boundary'].forEach(k=>text(h[k],h.id+' '+k)));
assert.ok(yardModes.length>=4);yardModes.forEach(m=>['name','equipment','layout','advantages','tradeoffs','system','transition'].forEach(k=>text(m[k],m.id+' '+k)));
assert.equal(entries.length,topics.length);entries.forEach(e=>{text(e.searchText,e.id);assert.ok(topics.some(t=>e.path==='infrastructure/'+t.id+'/'));});
console.log('Infrastructure OK: '+topics.length+' topics / '+topics.reduce((n,t)=>n+t.chapters.length,0)+' chapters, '+yardModes.length+' yard modes, '+hardware.length+' hardware entries, '+sources.length+' references.');
