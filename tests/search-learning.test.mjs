import {test} from 'node:test';
import assert from 'node:assert/strict';
import {learningKey,readItems,toggleItem,routeProgress} from '../src/data/learning-state.js';
import {matchEntry,searchSuggestion,searchURL} from '../src/lib/search-model.mjs';
import {searchCatalog} from '../src/data/search-catalog.js';
import {searchGuides} from '../src/data/search-guides.js';
const storage=()=>{const map=new Map();return {getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v)}};
test('old article bookmarks keep original IDs; topics and container variants have stable keys',()=>{assert.equal(learningKey('knowledge/eq-sts/#visual-explainer'),'eq-sts');assert.equal(learningKey('/port-knowledge/berthing/#arrival-journey'),'page:berthing/');assert.equal(learningKey('containers/#reefer'),'page:containers/#reefer');assert.equal(learningKey('containers/'),'page:containers/');});
test('latest storage is reread before toggling so other tabs are not overwritten',()=>{const s=storage();toggleItem(s,'bookmarks','first');s.setItem('port-bookmarks','["first","other-tab"]');assert.deepEqual(toggleItem(s,'bookmarks','first'),['other-tab']);});
test('malformed or denied storage never silently reports a successful save',()=>{const s=storage();s.setItem('port-read','{}');assert.throws(()=>toggleItem(s,'read','a'));assert.equal(s.getItem('port-read'),'{}');assert.throws(()=>toggleItem({getItem:()=>null,setItem:()=>{throw Error('denied')}},'read','a'));});
test('read data is deduplicated and separate from bookmarks',()=>{const s=storage();s.setItem('port-read','["a","a"]');assert.deepEqual(readItems(s,'read'),['a']);assert.deepEqual(readItems(s,'bookmarks'),[]);});
test('route progress shares page identity across anchors and finds next unread step',()=>{assert.deepEqual(routeProgress(['knowledge/eq-sts/#visual','berthing/#arrival-journey','gate/'],['eq-sts','page:berthing/']),{done:2,total:3,next:'gate/'});assert.equal(routeProgress(['gate/'],['page:gate/']).next,undefined);});
const entry={id:'b',key:'page:berthing/',path:'berthing/',title:'进港与靠泊',summary:'船岸准备',kind:'专题',domain:'k08',searchText:'登离船通道与船岸检查',sections:[{title:'装卸准备',anchor:'arrival-start',text:'本次作业需要核对登离船通道与相关接口。'}]};
test('full body phrase finds anchored excerpt even absent from title and summary',()=>{const r=matchEntry(entry,{q:'登离船通道',kind:'全部',domain:'all'});assert.equal(r.href,'berthing/#arrival-start');assert.match(r.excerpt,/登离船通道/);});
test('query words, domain, kind and bookmark constraints apply together',()=>{assert.equal(matchEntry(entry,{q:'登离船通道 不存在',kind:'全部',domain:'all'}),null);assert.equal(matchEntry(entry,{q:'',kind:'全部',domain:'k10'}),null);assert.equal(matchEntry(entry,{q:'',kind:'我的收藏',domain:'all'},[]),null);assert.ok(matchEntry(entry,{q:'通道',kind:'我的收藏',domain:'k08'},['page:berthing/']));});
test('search URL retains base and unrelated parameters and clears defaults',()=>{const s=searchURL('https://example.com/port-knowledge/library/?ref=test&q=old',{q:'岸桥',kind:'设备',domain:'k20'});const u=new URL(s,'https://example.com');assert.equal(u.searchParams.get('q'),'岸桥');assert.equal(u.searchParams.get('kind'),'设备');assert.equal(searchURL(u.href,{q:'',kind:'全部',domain:'all'}),'/port-knowledge/library/?ref=test');});

const all={q:'',kind:'全部',domain:'all'};
test('every editorial search question points to an existing catalog destination',()=>{for(const guide of searchGuides)for(const target of guide.targets)assert.ok(searchCatalog.some(entry=>entry.path===target.path.split('#')[0]),guide.id+': '+target.path);});
test('natural language questions navigate to the relevant existing business guide',()=>{const cases=[['粉红色的集装箱','brands/#pink-container'],['熊猫箱','brands/#panda-container'],['道闸为什么不抬杆','gate/#sim-title'],['海关放行后为什么还不能提箱','knowledge/gate-authority/'],['海关已经放行但还是不能提箱','knowledge/gate-authority/'],['ONE粉色箱子是什么','brands/#pink-container'],['为什么道闸不抬杆','gate/#sim-title'],['甩柜怎么办','scenarios/booking-change-and-return/'],['设备坏了谁来协调','scenarios/quay-crane-failure-recovery/'],['港口靠什么赚钱','economics/'],['箱子晚还几天费用算谁的','knowledge/fees-storage/'],['箱子从船上卸下来后去哪了','journey/']];for(const [q,href] of cases){const hits=searchCatalog.map(entry=>matchEntry(entry,{...all,q})).filter(Boolean).sort((a,b)=>b.score-a.score);assert.equal(hits[0]?.href,href,q);}});
test('question navigation still respects type, domain and saved-item filters',()=>{const gate=searchCatalog.find(entry=>entry.path==='gate/');assert.equal(matchEntry(gate,{q:'道闸为什么不抬杆',kind:'设备',domain:'all'}),null);assert.equal(matchEntry(gate,{q:'道闸为什么不抬杆',kind:'全部',domain:'k02'}),null);assert.ok(matchEntry(gate,{q:'道闸为什么不抬杆',kind:'我的收藏',domain:'k19'},[gate.key]));});
test('common typo offers a one-click correction without changing unrelated queries',()=>{assert.deepEqual(searchSuggestion('抬杠'),{query:'抬杆',text:'你可能想找道闸“抬杆”的业务。'});assert.equal(searchSuggestion('岸桥'),null);});

const cases = [
  ['甩柜 无关词', 'scenarios/booking-change-and-return/'],
  ['免箱期 岸桥', 'knowledge/fees-storage/'],
];
test('question shortcuts do not swallow additional search keywords', () => {
  for (const [q, path] of cases) {
    const item = searchCatalog.find(entry => entry.path === path);
    assert.equal(matchEntry(item, {...all, q}), null, q);
  }
  const item = searchCatalog.find(entry => entry.path === 'scenarios/booking-change-and-return/');
  assert.equal(matchEntry(item, {...all, q:'甩柜 退运'})?.href, item.path);
  const brands = searchCatalog.find(entry => entry.path === 'brands/');
  assert.equal(matchEntry(brands, {...all, q:'ONE 粉色箱子是什么'})?.href, 'brands/#pink-container');
});
