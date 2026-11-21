export const shipOptions={20:['01','03','05','07'],40:['02','06']};
export function shipLocation({length,bay,row,tier}){
 if(!shipOptions[length]?.includes(bay)||!['02','00','01'].includes(row)||!['02','04','82','84'].includes(tier))throw new Error('Unsupported teaching coordinate');
 const columns=length===40?(bay==='02'?['01','03']:['05','07']):[bay];
 return {code:bay.padStart(3,'0')+row+tier,columns,side:row==='00'?'中线':row==='02'?'左舷':'右舷',level:Number(tier)>=80?'甲板上':'舱内'};
}
export function createYard(grouped=false){return {stacks:grouped?[['目标箱'],['箱甲','箱乙'],['箱丙']]:[['目标箱','箱甲','箱乙'],['箱丙'],[]],moves:0,collected:false,message:'目标箱在 A 排。先观察它上面是否还有箱。'};}
export function yardAction(state,action){
 const next={...state,stacks:state.stacks.map(s=>[...s])};
 if(state.collected)return {...next,message:'目标箱已提取，可重置或换一种初始组织方式。'};
 const stack=next.stacks[0];
 if(action.type==='collect'){
  if(stack.length!==1)return {...next,message:'目标箱上方仍有 '+(stack.length-1)+' 只箱，应先安排移箱；不能穿过上层箱提取。'};
  stack.pop();return {...next,collected:true,message:'目标箱已提取。本例额外移箱 '+next.moves+' 次；提取目标箱本身不计入翻箱次数。'};
 }
 if(action.type!=='relocate'||![1,2].includes(action.destination))return {...next,message:'请选择本例允许的移箱目的排。'};
 if(stack.length<=1)return {...next,message:'目标箱已经露出，可直接提取，不需继续移箱。'};
 if(next.stacks[action.destination].length>=3)return {...next,message:'目的排已达到本例三层容量，不能继续叠放，请选择另一排。'};
 const moved=stack.pop();next.stacks[action.destination].push(moved);next.moves++;
 next.message=moved+' 已从 A 排顶部移到 '+['A','B','C'][action.destination]+' 排；箱位实绩随之更新。';return next;
}
