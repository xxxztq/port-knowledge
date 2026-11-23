import { learningKey, readItems, toggleItem, routeProgress } from '../data/learning-state.js';
const base = document.body.dataset.base || '/port-knowledge/';
const groups = [...document.querySelectorAll<HTMLElement>('[data-learning-tools]')];
const routes = [...document.querySelectorAll<HTMLOListElement>('.km-steps')];
for (const list of routes) {
 const status = document.createElement('div'); status.className = 'route-progress'; status.setAttribute('aria-live','polite'); list.before(status);
}
function refresh() {
 let saved: string[] = [], read: string[] = []; let failed = false;
 try { saved = readItems(localStorage,'bookmarks'); read = readItems(localStorage,'read'); } catch { failed = true; }
 for (const group of groups) {
  const key = group.dataset.learningKey!;
  group.querySelectorAll<HTMLButtonElement>('[data-learning-toggle]').forEach(button=>{
   const type = button.dataset.learningToggle!; const active = (type==='read'?read:saved).includes(key);
   button.setAttribute('aria-pressed',String(active)); button.textContent = type==='read'?(active?'已读':'标记已读'):(active?'已收藏':'收藏这篇');
  });
  if(failed){const message=group.querySelector<HTMLElement>('.learning-feedback')!;message.textContent='无法读取本地学习记录；浏览器设置或记录格式可能不兼容。';message.dataset.error='true';}
 }
 for(const list of routes){
  const links=[...list.querySelectorAll<HTMLAnchorElement>('li a[href]')];
  const paths=links.map(a=>a.getAttribute('href')!);const progress=routeProgress(paths,read,base);
  links.forEach(a=>{const completed=read.includes(learningKey(a.getAttribute('href')!,base));a.closest('li')!.classList.toggle('is-read',completed);a.dataset.completed=String(completed);});
  const status=list.previousElementSibling!;status.replaceChildren();
  const text=document.createElement('span');text.textContent=failed?'学习记录暂不可用':('已完成 '+progress.done+' / '+progress.total+' 步');status.append(text);
  if(progress.next){const next=document.createElement('a');next.href=progress.next;next.textContent='继续学习 →';status.append(next);}else if(progress.total){text.textContent+=' · 可以回顾这条路线';}
 }
}
for(const group of groups) group.querySelectorAll<HTMLButtonElement>('[data-learning-toggle]').forEach(button=>button.addEventListener('click',()=>{
 const feedback=group.querySelector<HTMLElement>('.learning-feedback')!;
 try{toggleItem(localStorage,button.dataset.learningToggle!,group.dataset.learningKey!);feedback.textContent='已保存在当前浏览器。';delete feedback.dataset.error;window.dispatchEvent(new Event('learningchange'));}
 catch{feedback.textContent='保存失败：浏览器未允许本地存储或记录格式异常，本次更改未保存。';feedback.dataset.error='true';}
}));
window.addEventListener('storage',refresh);window.addEventListener('pageshow',refresh);window.addEventListener('learningchange',refresh);refresh();
