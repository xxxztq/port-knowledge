import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {parse} from 'parse5';
import {searchCatalog} from '../src/data/search-catalog.js';
import {learningKey} from '../src/data/learning-state.js';
const dist=new URL('../dist/',import.meta.url);
const attrs=n=>Object.fromEntries((n.attrs||[]).map(a=>[a.name,a.value]));
const clean=s=>s.replace(/\s+/g,' ').trim();
const excluded=n=>['script','style','nav','svg','noscript'].includes(n.tagName)||Object.hasOwn(attrs(n),'data-search-exclude');
const text=n=>excluded(n)?'':n.nodeName==='#text'?n.value:(n.childNodes||[]).map(text).join(' ');
function find(n,p){if(p(n))return n;for(const c of n.childNodes||[]){const r=find(c,p);if(r)return r;}}
async function walk(dir){const out=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())out.push(...await walk(p));else if(e.name.endsWith('.html'))out.push(p);}return out;}
function anchor(n){let nearest='';for(let p=n;p;p=p.parentNode){const a=attrs(p);if(a.id&&a.id!=='main'){if(['data-choice-panel','data-berth-panel'].some(k=>Object.hasOwn(a,k)))return a.id;if(!nearest)nearest=a.id;}}return nearest;}
function sections(root){const out=[];let heading='正文';function visit(n){if(excluded(n))return;if(/^h[1-6]$/.test(n.tagName||''))heading=clean(text(n));if(['p','li','dd','dt','label','h1','h2','h3','h4','td','th','summary'].includes(n.tagName)&&!(n.childNodes||[]).some(c=>['p','li','ul','ol','table','div'].includes(c.tagName))){const value=clean(text(n));if(value)out.push({title:heading,anchor:anchor(n),text:value});return;}for(const c of n.childNodes||[])visit(c);}visit(root);return out;}
const map=new Map();const files=await walk(fileURLToPath(dist));
for(const file of files){const relative=path.relative(fileURLToPath(dist),file).split(path.sep).join('/');const route=relative==='index.html'?'':relative.replace(/index\.html$/,'');if(['','library/','about/','404.html'].includes(route))continue;const doc=parse(await fs.readFile(file,'utf8'));const main=find(doc,n=>n.tagName==='main');if(!main)continue;map.set(route,{doc,main,title:clean(text(find(main,n=>n.tagName==='h1')||main)).slice(0,120),summary:attrs(find(doc,n=>n.tagName==='meta'&&attrs(n).name==='description')||{}).content||''});}
const entries=[];
for(const item of searchCatalog){const [route,fragment]=item.path.split('#');const page=map.get(route);if(!page)throw new Error('Search target missing: '+item.path);const scope=fragment?find(page.main,n=>attrs(n).id===fragment):page.main;if(!scope)throw new Error('Search anchor missing: '+item.path);entries.push({...item,sections:sections(scope),searchText:clean(item.searchText+' '+text(scope)).toLowerCase()});}
const domains={berthing:'k08',journey:'k10',shipment:'k18',roles:'k07',equipment:'k20',systems:'k21',gate:'k19',economics:'k24',documents:'k18',containers:'k10',brands:'k02','brands-and-ports':'k02',infrastructure:'k21',risks:'k22',vessels:'k08',cargo:'k12',flows:'k09',scenarios:'k09',foundations:'k01'};
const foundationDomains={'network-choice':'k02',governance:'k04',lifecycle:'k05','environment-city':'k23','spatial-levels':'k01'};
for(const [route,page] of map){if(entries.some(e=>e.path===route))continue;const family=route.split('/')[0];const domain=family==='foundations'?(foundationDomains[route.split('/')[1]]||'k01'):(domains[family]||'k01');entries.push({id:'page:'+route,path:route,key:learningKey(route),title:page.title,summary:page.summary,kind:family==='foundations'?'基础':'专题',domain,sections:sections(page.main),searchText:clean(page.title+' '+text(page.main)).toLowerCase()});}
await fs.writeFile(new URL('search-index.json',dist),JSON.stringify({version:1,entries}));
console.log('Full-text search: '+entries.length+' entries / '+map.size+' pages, including rendered hidden teaching panels.');
