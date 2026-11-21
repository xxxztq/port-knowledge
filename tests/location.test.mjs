import test from 'node:test';
import assert from 'node:assert/strict';
import {shipLocation,createYard,yardAction} from '../src/lib/location-model.mjs';
test('teaching ship coordinates distinguish one slot from a paired long slot',()=>{
 assert.deepEqual(shipLocation({length:20,bay:'01',row:'00',tier:'82'}),{code:'0010082',columns:['01'],side:'中线',level:'甲板上'});
 assert.deepEqual(shipLocation({length:40,bay:'06',row:'02',tier:'04'}).columns,['05','07']);
 assert.equal(shipLocation({length:40,bay:'02',row:'01',tier:'02'}).level,'舱内');
 assert.throws(()=>shipLocation({length:40,bay:'03',row:'00',tier:'82'}));
 assert.throws(()=>shipLocation({length:20,bay:'01',row:'99',tier:'82'}));
});
test('yard requires top-down relocation, records extra moves and preserves input',()=>{
 const start=createYard();let s=yardAction(start,{type:'collect'});assert.equal(s.collected,false);assert.equal(s.moves,0);
 s=yardAction(s,{type:'relocate',destination:1});assert.deepEqual(s.stacks[1],['箱丙','箱乙']);assert.equal(start.stacks[0].length,3);
 s=yardAction(s,{type:'relocate',destination:2});s=yardAction(s,{type:'collect'});assert.equal(s.collected,true);assert.equal(s.moves,2);assert.equal(s.stacks[0].length,0);
 const again=yardAction(s,{type:'relocate',destination:1});assert.deepEqual(again.stacks,s.stacks);assert.equal(again.moves,2);
});
test('full and invalid destinations do not move containers or increase counts',()=>{
 const s=createYard();s.stacks[1]=['一','二','三'];
 for(const destination of [1,0,9]){const n=yardAction(s,{type:'relocate',destination});assert.deepEqual(n.stacks,s.stacks);assert.equal(n.moves,0);}
});
test('grouped teaching layout allows collection with no extra relocation',()=>{
 const s=createYard(true);assert.equal(yardAction(s,{type:'relocate',destination:2}).moves,0);
 const n=yardAction(s,{type:'collect'});assert.equal(n.collected,true);assert.equal(n.moves,0);
});
