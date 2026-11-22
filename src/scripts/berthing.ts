import {evaluateBerthingReadiness} from '../lib/berthing-model.mjs';
import {readinessChecks,readinessCases} from '../data/berthing-exercises.js';

const stepLinks=[...document.querySelectorAll<HTMLAnchorElement>('[data-berth-step]')];
const panels=[...document.querySelectorAll<HTMLElement>('[data-berth-panel]')];
const prev=document.querySelector<HTMLButtonElement>('[data-berth-prev]')!;
const next=document.querySelector<HTMLButtonElement>('[data-berth-next]')!;
let current=0;
function showStep(index:number,focus=false,updateHash=false){
 current=Math.max(0,Math.min(index,stepLinks.length-1));
 const id=stepLinks[current].dataset.berthStep;
 stepLinks.forEach((link,i)=>{if(i===current)link.setAttribute('aria-current','step');else link.removeAttribute('aria-current');});
 panels.forEach(panel=>panel.hidden=panel.dataset.berthPanel!==id);
 document.querySelectorAll<SVGElement>('[data-berth-point]').forEach(point=>point.classList.toggle('is-current',point.dataset.berthPoint===id));
 document.querySelector('[data-berth-position]')!.textContent='第 '+(current+1)+' 站 / 共 '+stepLinks.length+' 站 · '+stepLinks[current].querySelector('strong')!.textContent;
 prev.disabled=current===0;next.disabled=current===stepLinks.length-1;
 if(updateHash)history.replaceState(null,'',stepLinks[current].hash);
 if(focus)stepLinks[current].focus();
}
stepLinks.forEach((link,i)=>{
 link.addEventListener('click',event=>{event.preventDefault();showStep(i,false,true);});
 link.addEventListener('keydown',event=>{
  let target=i;
  if(event.key==='ArrowRight')target=Math.min(i+1,stepLinks.length-1);
  else if(event.key==='ArrowLeft')target=Math.max(i-1,0);
  else if(event.key==='Home')target=0;
  else if(event.key==='End')target=stepLinks.length-1;
  else return;
  event.preventDefault();showStep(target,true,true);
 });
});
prev.addEventListener('click',()=>showStep(current-1,false,true));next.addEventListener('click',()=>showStep(current+1,false,true));
function showHash(){const index=stepLinks.findIndex(l=>l.hash===location.hash);if(index>=0)showStep(index);}
showStep(0);showHash();window.addEventListener('hashchange',showHash);
document.querySelector<HTMLElement>('[data-berth-controls]')!.hidden=false;

const caseSelect=document.querySelector<HTMLSelectElement>('[data-readiness-case]')!;
const checks=[...document.querySelectorAll<HTMLInputElement>('[data-readiness-check]')];
const result=document.querySelector<HTMLElement>('[data-readiness-result]')!;
function addText(tag:string,text:string){const element=document.createElement(tag);element.textContent=text;result.append(element);return element;}
function explainMissing(title:string,ids:string[]){
 addText('h4',title);
 if(ids.length){const list=document.createElement('ul');ids.forEach(id=>{const item=document.createElement('li');item.textContent=readinessChecks.find(c=>c.id===id)!.label;list.append(item);});result.append(list);}
 else addText('p','本组教学资料已齐；实际安排仍须责任方确认。');
}
function renderReadiness(){
 const state=evaluateBerthingReadiness(checks.filter(c=>c.checked).map(c=>c.value));
 result.replaceChildren();
 addText('h3',!state.arrivalComplete?'进港靠泊资料仍有缺项':!state.workComplete?'靠泊资料齐，装卸条件待接续':'教学资料已齐，等待责任方确认');
 explainMissing('A / 进港靠泊还需核对',state.arrivalMissing);
 explainMissing('B / 装卸准备还需核对',state.workMissing);
 if(!state.arrivalComplete&&state.workMissing.length===0)addText('p','B 组已勾齐也不能绕过 A 组变化，需要重新衔接相关安排。');
}
function loadCase(){
 const lesson=readinessCases.find(c=>c.id===caseSelect.value)!;
 document.querySelector('[data-readiness-story]')!.textContent=lesson.story;
 document.querySelector('[data-readiness-lesson]')!.textContent=lesson.lesson;
 checks.forEach(check=>check.checked=lesson.checked.includes(check.value));renderReadiness();
}
caseSelect.addEventListener('change',loadCase);
checks.forEach(c=>c.addEventListener('change',renderReadiness));
document.querySelector('[data-readiness-reset]')!.addEventListener('click',loadCase);
loadCase();document.querySelector<HTMLElement>('[data-readiness-ui]')!.hidden=false;

const zoom=document.querySelector<HTMLButtonElement>('[data-berth-zoom]')!;
const mapViewport=document.querySelector<HTMLElement>('[data-berth-map-viewport]')!;
zoom.addEventListener('click',()=>{
 const expanded=zoom.getAttribute('aria-expanded')!=='true';
 zoom.setAttribute('aria-expanded',String(expanded));
 zoom.textContent=expanded?'收起大图':'放大空间图';
 zoom.closest('.berth-map')!.classList.toggle('is-zoomed',expanded);
 document.querySelector('[data-berth-zoom-hint]')!.textContent=expanded?'左右滑动看全图，也可用方向键':'可放大查看水域与设施名称';
 if(expanded){mapViewport.setAttribute('tabindex','0');mapViewport.setAttribute('role','region');mapViewport.setAttribute('aria-label','放大的进港空间图，可左右滚动');}
 else{mapViewport.removeAttribute('tabindex');mapViewport.removeAttribute('role');mapViewport.removeAttribute('aria-label');mapViewport.scrollLeft=0;}
});
document.querySelector<HTMLElement>('[data-berth-map-tools]')!.hidden=false;
