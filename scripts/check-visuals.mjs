import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { articles } from '../src/data/knowledge.js';
import { equipmentVisuals } from '../src/data/equipment-visuals.js';
import { articleDiagrams } from '../src/data/article-diagrams.js';
import { documentExamples } from '../src/data/document-examples.js';
const equipment = articles.filter(a=>a.kind==='设备');
const other = articles.filter(a=>a.kind!=='设备');
assert.deepEqual(new Set(equipmentVisuals.map(v=>v.id)),new Set(equipment.map(a=>a.id)), 'Every equipment article needs exactly one drawing');
assert.equal(equipmentVisuals.length,equipment.length);
assert.deepEqual(new Set(articleDiagrams.map(v=>v.id)),new Set(other.map(a=>a.id)), 'Every other article needs exactly one diagram');
assert.equal(articleDiagrams.length,other.length);
for(const v of equipmentVisuals){
  assert.equal(v.points.length,3,v.id);
  assert.equal(new Set(v.points.map(p=>p.n)).size,3,v.id);
  for(const p of v.points){assert.ok(p.x>=0&&p.x<=100&&p.y>=0&&p.y<=100,v.id+' point outside image');assert.ok(p.title&&p.description);}
  const svg=await fs.readFile(new URL('../public/'+v.image,import.meta.url),'utf8');
  assert.match(svg,/viewBox="0 0 800 480"/,v.id);assert.match(svg,/<title[\s>]/,v.id);assert.match(svg,/<desc[\s>]/,v.id);
  assert.ok(v.facts.length===3&&v.comparison&&v.summary,v.id);
}
for(const d of articleDiagrams){assert.ok(d.title&&d.caption&&d.note,d.id);assert.ok(d.nodes.length>=3&&d.nodes.length<=5,d.id);assert.ok(['flow','parallel','comparison','cycle'].includes(d.type),d.id);for(const n of d.nodes)assert.ok(n.label&&n.detail,d.id);for(const l of d.links||[])assert.ok(Number.isInteger(l.from)&&Number.isInteger(l.to)&&l.from>=0&&l.to>=0&&l.from<d.nodes.length&&l.to<d.nodes.length&&l.label,d.id+' invalid connection');}
for(const d of documentExamples){assert.equal(d.fields.length,4);for(const f of d.fields)for(const key of ['label','value','title','description','source','check','limit'])assert.ok(f[key],d.id+':'+key);}
for(const p of ['brand/logo.svg','brand/logo.png','brand/apple-touch-icon.png','brand/social-card.png','favicon.svg'])await fs.access(new URL('../public/'+p,import.meta.url));
console.log('Visuals OK: '+equipmentVisuals.length+' equipment drawings, '+articleDiagrams.length+' article diagrams, '+documentExamples.length+' teaching documents.');
