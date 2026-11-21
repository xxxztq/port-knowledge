// 渐进增强：无脚本时保留全部正文，链接仍可跳转。
const scopes=[...document.querySelectorAll<HTMLElement>('[data-choice-scope]')];
function select(scope:HTMLElement,id:string){
  const panels=[...scope.querySelectorAll<HTMLElement>('[data-choice-panel]')];
  if(!panels.some(p=>p.id===id))return;
  panels.forEach(p=>{p.hidden=p.id!==id});
  let label='';
  scope.querySelectorAll<HTMLAnchorElement>('[data-choice]').forEach(a=>{
    if(a.dataset.choice===id){a.setAttribute('aria-current','true');label=a.querySelector('strong')?.textContent||a.textContent||'';}
    else a.removeAttribute('aria-current');
  });
  const notice=scope.querySelector<HTMLElement>('[data-choice-status]');
  if(notice)notice.textContent='正在查看：'+label.trim();
  scope.dispatchEvent(new CustomEvent('choicechange',{detail:{id}}));
}
function fromHash(){
  let id='';try{id=decodeURIComponent(location.hash.slice(1))}catch{return}
  scopes.forEach(scope=>{
    const panels=[...scope.querySelectorAll<HTMLElement>('[data-choice-panel]')];
    if(panels.some(p=>p.id===id))select(scope,id);
    else if(!id&&panels[0])select(scope,panels[0].id);
  });
}
scopes.forEach(scope=>{
  const first=scope.querySelector<HTMLElement>('[data-choice-panel]');if(first)select(scope,first.id);
  scope.querySelectorAll<HTMLAnchorElement>('[data-choice]').forEach(a=>a.addEventListener('click',event=>{
    if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    event.preventDefault();const id=a.dataset.choice!;select(scope,id);
    if(location.hash!=='#'+id)history.pushState(null,'','#'+id);
    if(scope.hasAttribute('data-choice-scroll')&&event.isTrusted){
      const panel=document.getElementById(id);
      panel?.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    }
  }));
});
fromHash();window.addEventListener('hashchange',fromHash);window.addEventListener('popstate',fromHash);
