// 教学状态模型，不能连接或控制真实闸机。
const check=(id,label,detail)=>({id,label,detail});
export function gateChecks(task,stage){
 if(!['export','import','empty-pickup','empty-return','dual'].includes(task)||!['arrival','departure'].includes(stage)) throw new Error('未知业务或方向');
 const common=[check('identity','车、人、车次一致','核对登记车辆、司机及本次访问，识别结果需要与任务关联。'),check('task','任务有效且适用于本闸口','校验预约／接收安排、地点、时段、任务状态与适用通行要求。'),check('physical','实际载箱与任务阶段一致','识别箱号、空重及箱型等；空车也要核对没有多载或遗留箱。'),check('restrictions','适用安全与特殊限制已核对','危险品、冷藏、超限等另有条件；未知或异常状态需处理。')];
 if(stage==='arrival'){
  const defs={export:[check('receiving','出口箱接收计划有效','核对船名航次、截收安排和箱况；这里不统一要求出口已获海关放行。')],import:[check('pickup','有效提箱委托及作业安排','确认提箱任务可安排；最终交付前仍需复核当前授权。')],'empty-pickup':[check('emptyAuth','空箱放箱授权有效','核对箱属、箱型、数量和用途。具体箱号允许按当地流程稍后分配。')],'empty-return':[check('returnAuth','指定还箱地点与接收安排匹配','核对箱号、箱属和接收条件；到闸尚不等于还妥。')],dual:[check('returnAuth','还空任务可接收','先核对还空任务的指定接收地点和安排。'),check('pickup','提重任务有独立授权','第二项任务单独关联；一项有效不代表整趟车全部有效。')]};
  return [...common,...defs[task]];
 }
 const work=check('work','本阶段场内作业已实际完成','按实绩确认卸箱或装车，不能使用计划状态代替。');
 const delivery=[check('customs','本示例的监管交付条件已满足','进口重箱示例：按适用海关状态及其他限制核对；不确定时应等待有效反馈。'),check('commercial','承运人／货权交付授权有效','船公司或代理的商业放货，与海关状态独立。'),check('settlement','约定的结算条件已满足','可为账期、信用或其他合同安排，不等于必须现场缴清全部费用。')];
 const defs={export:[work,check('emptyTruck','车辆已卸箱并空载','本例只有出口送箱任务，重箱留在场内；车辆出闸不等于货物出口离港。')],import:[work,...delivery,check('actualBox','实提重箱与授权箱号相符','核对最终载箱、箱况封志和交接记录。')],'empty-pickup':[work,check('emptyAuth','当前放箱授权仍有效','确认箱型数量与用箱要求。'),check('actualBox','已分配并核对实际交付空箱','最终交付必须有实际箱号、箱况和交接记录。')],'empty-return':[work,check('accepted','接收方已确认还箱','完成验收、卸箱和有效交接；拒收仍带原箱退出须另办异常任务。'),check('emptyTruck','车辆已卸箱并空载','本模拟走正常接收分支，拒收不能勾选为已完成。')],dual:[work,...delivery,check('returnDone','第一项还空已接收并完成','保留独立还箱任务和接收凭证。'),check('pickupDone','第二项提重已装车并完成','独立核对提箱任务与实际重箱，不能复用还空凭证。')]};
 return [...common,...defs[task]];
}
export function evaluateGate(task,stage,values){const rules=gateChecks(task,stage);const missing=rules.filter(r=>values[r.id]!==true);return {ok:missing.length===0,missing};}
export function gateTransition(state,event,context){
 const {task,stage,checks={},deviceReady=false,receiptReady=false}=context;
 if(event==='reset') return {state:'idle',message:'已开始新的教学演示，尚未授权。'};
 if(event==='authorize'){
  if(state!=='idle') return {state,message:'当前阶段无需重复授权。'};
  const result=evaluateGate(task,stage,checks);
  return result.ok?{state:'authorized',message:'业务条件已通过。下一步单独确认设备与通道状态。'}:{state:'idle',message:'暂不能授权。以下校验项未通过或尚未确认：'+result.missing.map(x=>'「'+x.label+'」').join('；')};
 }
 if(event==='open'){
  if(state!=='authorized') return {state,message:'须先完成业务授权。'};
  if(!evaluateGate(task,stage,checks).ok) return {state:'idle',message:'业务条件变化，授权已失效，请重新校验。'};
  return deviceReady?{state:'opened',message:'已模拟收到抬杆反馈。尚未发生实际通过。'}:{state,message:'设备／通道未就绪：保留异常并处理设备问题，业务放行不能代替道闸反馈。'};
 }
 if(event==='pass'){
  if(state!=='opened') return {state,message:'必须先收到抬杆反馈，才能记录实际通过。'};
  if(!evaluateGate(task,stage,checks).ok) return {state,message:'条件已变化，停止本次通行确认并转异常处理。'};
  if(!deviceReady) return {state,message:'通道出现异常，不能确认车辆已经通过。'};
  return {state:'passed',message:'已记录实际通过，道闸回落。接下来等待本次事件回执。'};
 }
 if(event==='record'){
  if(state!=='passed') return {state,message:'尚无待确认的实际通过事件。'};
  return receiptReady?{state:'recorded',message:'本次通行记录已确认。模拟结束；该结果不是货物全部业务完结。'}:{state,message:'模拟回执超时：保留实际通过事件，核对接收记录后重试，不能再抬杆重复放车。'};
 }
 return {state,message:'无效操作。'};
}
