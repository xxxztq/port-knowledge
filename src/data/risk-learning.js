// 教学关联：帮助读者在货类、业务节点与风险之间往返，不作风险分级。
import { portRisks } from './port-risks.js';
export const cargoRiskMap = {
  'wind-blade':['traffic','lifting','stack','weather','commercial'],
  timber:['stack','lifting','fire','environment','identity'],
  'steel-coil':['lifting','stack','weather','identity','commercial'],
  ev:['traffic','fire','identity'],
  'energy-storage':['lifting','fire','identity'],
  'project-cargo':['lifting','traffic','equipment'],
  'cold-chain':['equipment','continuity','commercial'],
  'packaged-dangerous':['fire','environment','identity']
};
export const riskSearchEntries = portRisks.map(r=>({
  id:'risk-'+r.id,title:r.title,summary:r.summary,kind:'风险',
  domain:r.id==='commercial'?'k24':r.id==='identity'?'k18':r.id==='continuity'?'k21':r.id==='environment'?'k23':'k22',
  path:'risks/'+r.id+'/',
  searchText:['港口风险 预防 异常',r.title,r.summary,r.category,...r.where,...r.signals,...r.prevention,...r.response,r.owner,...r.partners,...r.records,r.recovery,r.example.cargo,r.example.trigger,r.example.decision].join(' ').toLowerCase()
}));
export const riskCases = [
  {id:'blade',name:'风叶：计划已经排好',cargoPath:'cargo/wind-blade/',image:'wind-blade',
    scene:'装船前，现场收到天气变化提醒；叶片资料与工装的对应关系也还在复核。计划表上，这支叶片仍显示“待装”。',
    trace:['现场报告变化与待核事项，留下件号、时间和位置。','中控与计划协调受影响任务，工程及项目相关专业方核实技术条件。','按适用程序确认条件，记录处理结果并同步生产计划。'],riskIds:['weather','lifting','identity'],
    quiz:{id:'risk-blade',question:'计划表上的“待装”，能说明这支叶片现在可以作业吗？',options:[
      {text:'可以，计划已经排好就表示所有条件满足',correct:false,feedback:'计划安排不等于现场条件确认。天气、工装和资料发生变化时，需要重新核实受影响任务。'},
      {text:'不能，需将变化交给对应责任方核实并更新任务',correct:true,feedback:'先控制受影响作业，再由相关专业方核实条件、留痕并同步计划；不能靠原有状态推断作业条件仍然成立。'},
      {text:'只要闸口识别到件号就可以',correct:false,feedback:'闸口识别解决的是交接对象问题，无法替代天气、工装及现场作业条件确认。'}]}},
  {id:'timber',name:'木材：包装有标记',cargoPath:'cargo/timber/',image:'timber',
    scene:'一批进口木材到港，司机展示包装上的处理标记，收货清单却还存在树种、数量口径与适用监管状态的待核项。',
    trace:['理货把批次、货物形态、数量口径及异常记录清楚。','货主或代理核实货物资料，适用的检疫监管事项由相应主管机关决定。','交付授权、监管状态和本次出场条件分别核对，结果关联到同一票货。'],riskIds:['identity','environment','stack'],
    quiz:{id:'risk-timber',question:'包装上的一个处理标记，能直接证明这批木材已满足全部进口要求吗？',options:[
      {text:'能，包装与木材都是木头，可以按同一件事处理',correct:false,feedback:'货物木材与木质包装的适用规则需要区分，包装标记不能替代货物本身的监管状态。'},
      {text:'不能，应区分木材货物、包装和该票货适用的监管要求',correct:true,feedback:'先分清对象，再核实该票货的资料与监管状态；平台记录和现场识别也不能替代主管机关的决定。'},
      {text:'只查车辆预约即可',correct:false,feedback:'预约解决到港组织问题，不能替代货物身份、数量、监管与交付授权核对。'}]}},
  {id:'coil',name:'卷钢：外观出现水迹',cargoPath:'cargo/steel-coil/',image:'steel-coil',
    scene:'提货前，同一批卷钢的两卷外包装出现新水迹，清单上卷号与预约信息都能匹配。客户希望照常交付。',
    trace:['现场与理货按卷号保留状态、时间、位置和影像，不擅自认定责任。','业务联络客户及相关责任方核查受影响范围；现场同时确认安全与保管条件。','把处置、交接保留意见和任务变化记录下来，相关方确认后按适用流程继续。'],riskIds:['stack','weather','commercial'],
    quiz:{id:'risk-coil',question:'卷号匹配以后，这些水迹还需要单独记录吗？',options:[
      {text:'不用，身份匹配就表示货物完好',correct:false,feedback:'卷号回答“是哪一卷”，外观记录回答“交接时是什么状态”，两类证据不能互相替代。'},
      {text:'需要，按卷号保留状态证据，并交给责任方核实处理',correct:true,feedback:'身份、货况、授权和安全条件分别核对。记录水迹并不直接等于确认内部锈损或判定索赔责任。'},
      {text:'看到水迹就直接判定港口承担全部损失',correct:false,feedback:'责任判断还需要合同、交接证据、保管记录等；现场的第一步是保留事实并启动相应核查。'}]}}
];
