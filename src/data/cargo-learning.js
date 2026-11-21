// 教学入口与理解练习；不用于承运、监管或作业决策。
export const cargoCoverage = [
  {name:'新能源汽车',level:'业务专题',path:'cargo/ev/',focus:'VIN、滚装与装箱、车辆交接'},
  {name:'储能柜与储能系统',level:'业务专题',path:'cargo/energy-storage/',focus:'柜号、电池资料、产品外壳与运输箱'},
  {name:'风电叶片',level:'业务专题',path:'cargo/wind-blade/',focus:'件号、外廓、支架与项目协同'},
  {name:'机械设备与重大件',level:'业务专题',path:'cargo/project-cargo/',focus:'件重、重心、吊装设计与运输路线'},
  {name:'温控与冷链货物',level:'业务专题',path:'cargo/cold-chain/',focus:'温控指令、接电、监测与交付'},
  {name:'包装危险货物',level:'业务专题',path:'cargo/packaged-dangerous/',focus:'货物分类、申报、场地与承运条件'},
  {name:'煤炭与矿石',level:'基础入口',path:'knowledge/k11-overview/',focus:'数量、品质、堆存与连续输送'},
  {name:'粮食与其他农产品',level:'基础入口',path:'knowledge/k11-overview/',focus:'检验、保管、损耗与混货风险'},
  {name:'钢材、木材与普通件杂货',level:'基础入口',path:'knowledge/k12-overview/',focus:'包装、件数、理货与货损记录'},
  {name:'油品、化学品与液化气',level:'基础入口',path:'knowledge/k13-overview/',focus:'介质、管线、储罐与计量交接'},
  {name:'传统燃油商品车与滚装货',level:'基础入口',path:'knowledge/k14-overview/',focus:'车辆组织与滚装交接'},
  {name:'拼箱、空箱与中转',level:'场景入口',path:'flows/',focus:'集装箱业务不同组织方式'},
];
export const cargoQuizzes = {
  ev:{id:'ev-identity',question:'一辆出口新能源汽车已扫描 VIN，系统里的车型与实车不一致。下一步应该怎样理解？',options:[{text:'VIN 扫描成功就直接放行',correct:false,feedback:'识别到一个编号，并不代表车型、运输任务和承运资料已经一致。'},{text:'暂缓该交接，核实车辆与任务资料，并由责任方纠正',correct:true,feedback:'身份匹配是起点。资料纠正、适用承运条件与本次交接条件仍需分别确认。'},{text:'换成集装箱运输就不用核对',correct:false,feedback:'运输方式改变，车辆身份和货物资料仍需要可追溯。'}]},
  'energy-storage':{id:'storage-shell',question:'看到一个外形像集装箱的储能设备，可以直接当作普通运输箱进场吗？',options:[{text:'有角件就一定是普通空箱',correct:false,feedback:'外形、角件或外壳尺寸，不能单独证明运输箱资格、空重状态或货物分类。'},{text:'所有储能设备都用同一运输编号',correct:false,feedback:'电池种类、安装方式、用途与适用条目都会影响分类，不能只凭“储能柜”名称判断。'},{text:'先区分产品与运输载体，再核对技术资料及运输安排',correct:true,feedback:'系统要能关联设备序列号、货物资料与运输箱号（如有），由相应责任方核实适用要求。'}]},
  'wind-blade':{id:'blade-route',question:'叶片重量没有超过某台起重机的额定吨位，是否说明这票货可以按原计划进港装船？',options:[{text:'还要核对外廓、支架、路线、场地与经确认的吊装方案',correct:true,feedback:'重量只是条件之一。长件的路径、作业空间、设备工况与交接资料必须一起确认。'},{text:'是，只要吨位够就行',correct:false,feedback:'额定吨位不能代替实际工况、作业半径、吊点资料及路线校核。'},{text:'只补交一份海关放行信息就够了',correct:false,feedback:'监管状态不能替代工程、船岸与场地的可作业条件。'}]},
};
export const containerQuiz={id:'container-vgm',question:'箱门上写着最大总重，能把这个数直接当成本次出口重箱的 VGM 吗？',options:[{text:'可以，箱型相同就用同一个数',correct:false,feedback:'最大总重是能力限制；同一种箱型装不同货，本次整箱总重也可能不同。'},{text:'不可以，应取得本次载货集装箱的核实总重',correct:true,feedback:'VGM 关注本次整箱的核实总重。最大总重、自重、允许载荷与 VGM 是不同概念。'},{text:'只填写货物净重即可',correct:false,feedback:'整箱总重还涉及箱体及包装、垫料、系固材料等，不能只填货物净重。'}]};
