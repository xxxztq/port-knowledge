import {matchEntry,searchURL} from '../lib/search-model.mjs';
import {readItems} from '../data/learning-state.js';
const base=document.body.dataset.base||'/port-knowledge/';
const input=document.querySelector<HTMLInputElement>('#knowledge-search')!;
const grid=document.querySelector<HTMLElement>('#knowledge-results')!;
const status=document.querySelector<HTMLElement>('#search-status')!;
const retry=document.querySelector<HTMLButtonElement>('#retry-search-index')!;
let entries=JSON.parse(document.querySelector('#knowledge-search-index')!.textContent||'[]');
let kind='全部',domain='all',full=false,indexFailed=false,typing=false,timer:ReturnType<typeof setTimeout>;
const kinds=[...document.querySelectorAll<HTMLElement>('[data-kind-filter]')].map(b=>b.dataset.kindFilter);
const domains=[...document.querySelectorAll<HTMLElement>('[data-domain-filter]')].map(b=>b.dataset.domainFilter);
function state(){return {q:input.value,kind,domain};}
function writeURL(replace=false){const url=searchURL(location.href,state());if(url!==location.pathname+location.search+location.hash)history[replace?'replaceState':'pushState'](null,'',url);}
function readURL(){clearTimeout(timer);typing=false;const p=new URLSearchParams(location.search);input.value=p.get('q')||'';kind=kinds.includes(p.get('kind')!)?p.get('kind')!:'全部';domain=domains.includes(p.get('domain')!)?p.get('domain')!:'all';writeURL(true);refresh();}
function node(tag:string,content:string,className=''){const el=document.createElement(tag);el.textContent=content;el.className=className;return el;}
function excerpt(text:string){const p=document.createElement('p');p.className='search-excerpt';const words=input.value.trim().split(/\s+/).filter(Boolean).sort((a,b)=>b.length-a.length);if(!words.length){p.textContent=text;return p;}const escaped=words.map(w=>w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));const pattern=new RegExp('('+escaped.join('|')+')','gi');let start=0;for(const match of text.matchAll(pattern)){p.append(document.createTextNode(text.slice(start,match.index)));p.append(node('mark',match[0]));start=match.index!+match[0].length;}p.append(document.createTextNode(text.slice(start)));return p;}
function refresh(){let saved:string[]=[];let failed=false;try{saved=readItems(localStorage,'bookmarks');}catch{failed=true;}const results=entries.map((e:any)=>matchEntry(e,state(),saved)).filter(Boolean).sort((a:any,b:any)=>b.score-a.score);const fragment=document.createDocumentFragment();
 for(const result of results){const e=result.entry;const card=document.createElement('a');card.className='article-card search-result';card.href=base+result.href;card.dataset.searchCard='';card.dataset.id=e.id;card.dataset.kind=e.kind;card.dataset.domain=e.domain;
 if(e.image){const image=document.createElement('img');image.src=base+e.image.replace(/^\//,'');image.alt=e.title+'结构示意';image.width=800;image.height=480;image.loading='lazy';image.className='search-illustration';card.append(image);}
 card.append(node('span',e.kind,'tag'),node('h3',e.title),excerpt(result.excerpt));if(input.value.trim()&&result.section)card.append(node('small','正文位置：'+result.section,'search-section'));card.append(node('span','打开阅读 →','search-open'));fragment.append(card);
 }grid.replaceChildren(fragment);document.querySelector('#search-count')!.textContent='找到 '+results.length+' 个知识卡与专题';(document.querySelector('#empty-results') as HTMLElement).hidden=results.length!==0;
 document.querySelectorAll('[data-kind-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.getAttribute('data-kind-filter')===kind)));document.querySelectorAll('[data-domain-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.getAttribute('data-domain-filter')===domain)));
 if(failed&&kind==='我的收藏')status.textContent='无法读取收藏记录，请检查浏览器是否允许本地存储。';else status.textContent=full?'已检索全站正文 · 点击结果可到相关章节。':indexFailed?'完整正文索引暂未加载，当前仅显示摘要匹配；可重试。':'当前使用摘要索引；完整正文索引加载后会自动更新结果。';
}
input.addEventListener('input',()=>{writeURL(typing);typing=true;clearTimeout(timer);timer=setTimeout(()=>typing=false,600);refresh();});
document.querySelectorAll<HTMLButtonElement>('[data-kind-filter]').forEach(b=>b.addEventListener('click',()=>{typing=false;kind=b.dataset.kindFilter!;writeURL();refresh();}));
document.querySelectorAll<HTMLButtonElement>('[data-domain-filter]').forEach(b=>b.addEventListener('click',()=>{typing=false;domain=b.dataset.domainFilter!;writeURL();refresh();}));
document.querySelector('#reset-search')?.addEventListener('click',()=>{typing=false;input.value='';kind='全部';domain='all';writeURL();refresh();input.focus();});
window.addEventListener('popstate',readURL);window.addEventListener('pageshow',readURL);window.addEventListener('storage',refresh);window.addEventListener('learningchange',refresh);
async function loadIndex(){retry.hidden=true;indexFailed=false;refresh();try{const response=await fetch(base+'search-index.json',{signal:AbortSignal.timeout(12000)});if(!response.ok)throw new Error('index unavailable');const data=await response.json();if(data.version!==1||!Array.isArray(data.entries)||!data.entries.length)throw new Error('invalid index');entries=data.entries;full=true;refresh();document.body.dataset.searchReady='true';}catch{indexFailed=true;refresh();retry.hidden=false;document.body.dataset.searchReady='fallback';}}
retry.addEventListener('click',loadIndex);readURL();loadIndex();
