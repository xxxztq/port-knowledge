import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {parse} from 'parse5';
const root=fileURLToPath(new URL('../',import.meta.url));
const attrs=n=>Object.fromEntries((n.attrs||[]).map(a=>[a.name,a.value]));
function find(n,p){if(p(n))return n;for(const c of n.childNodes||[]){const r=find(c,p);if(r)return r;}}
async function walk(dir){const out=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())out.push(...await walk(p));else if(e.name.endsWith('.html'))out.push(p);}return out;}
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
export function classify(first,second){if([404,410].includes(first)&&[404,410].includes(second))return 'broken';if(second>=200&&second<300)return 'reachable';return 'manual-review';}
export function isGenericHomeRedirect(requested,final){try{const source=new URL(requested),destination=new URL(final);return source.origin===destination.origin&&source.pathname!=='/'&&destination.pathname==='/';}catch{return false;}}
async function request(url,method){try{const r=await fetch(url,{method,redirect:'follow',signal:AbortSignal.timeout(9000),headers:{'user-agent':'PortKnowledge-LinkCheck/1.0 (+https://github.com/xxxztq/port-knowledge)'}});await r.body?.cancel();return {status:r.status,finalURL:r.url};}catch(error){return {status:0,error:error.cause?.code||error.name};}}
async function check(url) {
 const attempts = [];
 const get = async () => {
  const response = await request(url, 'GET');
  attempts.push({method:'GET', ...response});
  return response;
 };
 const first = await get();
 const missing = [404, 410].includes(first.status);
 let result = first;
 if (missing || first.status === 0 || first.status === 429 || first.status >= 500) {
  await sleep(missing ? 500 : first.status === 429 ? 1500 : 600);
  result = await get();
 }
 const state = isGenericHomeRedirect(url, result.finalURL) ? 'manual-review' : classify(missing ? first.status : 0, result.status);
 return {url, state, attempts};
}
async function main(){const args=process.argv.slice(2);const limitIndex=args.indexOf('--limit');const limit=limitIndex>=0?Math.max(1,Number(args[limitIndex+1])||1):Infinity;const sources=new Map();for(const file of await walk(path.join(root,'dist'))){const doc=parse(await fs.readFile(file,'utf8'));const main=find(doc,n=>n.tagName==='main');if(!main)continue;function visit(n){if(n.tagName==='a'){const raw=attrs(n).href;if(raw&&/^https?:\/\//.test(raw)){const u=new URL(raw);u.hash='';if(!['github.com','xxxztq.github.io'].includes(u.hostname)){const key=u.href;const pages=sources.get(key)||new Set();pages.add(path.relative(path.join(root,'dist'),file).split(path.sep).join('/'));sources.set(key,pages);}}}for(const c of n.childNodes||[])visit(c);}visit(main);}
 const urls=[...sources.keys()].sort().slice(0,limit);let cursor=0;const results=[];await Promise.all(Array.from({length:Math.min(5,urls.length)},async()=>{while(cursor<urls.length){const i=cursor++;const result=await check(urls[i]);result.pages=[...sources.get(urls[i])];results.push(result);console.log('['+results.length+'/'+urls.length+'] '+result.state+' '+result.url);}}));results.sort((a,b)=>a.url.localeCompare(b.url));const summary={reachable:0,'manual-review':0,broken:0};for(const r of results)summary[r.state]++;const report={checkedAt:new Date().toISOString(),scope:'External links in built main content, excluding repository and site navigation. GET reachability only; a redirect to the generic site home is sent for manual review; not legal validity or editorial verification.',uniqueSources:sources.size,checked:results.length,summary,results};await fs.mkdir(path.join(root,'artifacts'),{recursive:true});await fs.writeFile(path.join(root,'artifacts/source-check.json'),JSON.stringify(report,null,2));const lines=['# 外部来源可达性检查','','检查时间：'+report.checkedAt,'','可达 '+summary.reachable+'；需人工核查 '+summary['manual-review']+'；重复 GET 确认 404/410 '+summary.broken+'。','', '可达仅表示本次 HTTP 响应成功，不代表正文、法规效力、版本或引用范围已经核实。跳转到同站通用首页，以及最终收到 403、429、网络失败和服务异常，均列为人工核查。','',...results.map(r=>'- **'+r.state+'** '+r.url+' — '+r.attempts.map(a=>a.method+' '+(a.status||a.error)).join(' → ')+'；引用页面 '+r.pages.length)];await fs.writeFile(path.join(root,'artifacts/source-check.md'),lines.join('\n')+'\n');console.log(JSON.stringify(summary));if(args.includes('--strict')&&summary.broken)process.exitCode=1;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)await main();
