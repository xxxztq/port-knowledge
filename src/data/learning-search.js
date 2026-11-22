// Cross-topic learning entrances; profile details are indexed separately.
export const learningSearchEntries = [
 {id:'learning-berthing',title:'船舶进港与靠泊：从预报、候泊到系缆开工',summary:'用九站路线认识锚地、引航登轮区、航道、回旋水域与泊位，区分船长、VTS、引航、拖轮和码头职责，尝试四个等待条件情景。',kind:'专题',domain:'k08',path:'berthing/',terms:'船 靠岸 停靠 进港 靠泊 候泊 锚地 引航 登轮 拖轮 系缆 护舷 系船柱 回旋 航道 吃水 水深 富余水深 潮汐 ETA ETB ATB ETD VTS AIS 移泊 离港 等待 天气'},
 {id:'learning-shipment',title:'一票货全程：大豆与 LNG 的五条业务线',summary:'把实物、岗位、单证系统、监管与交付条件、服务费用放在同一节点，观察异常怎样影响接续。',kind:'专题',domain:'k18',path:'shipment/',terms:'进口 大豆 LNG 天然气 交互 五条线 筒仓 管网 计量 异常 一票货'},
 {id:'learning-grains',title:'粮食与农产品业务全景',summary:'从大豆、玉米、小麦认识船舱、货批、筒仓、检验检疫、数量品质与出库。',kind:'专题',domain:'k11',path:'cargo/grains/',terms:'粮食 农产品 大豆 玉米 小麦 粮仓 筒仓 农业 进口粮'},
 {id:'learning-liquids',title:'液体货类：船、管线、储罐与交付',summary:'分清原油成品油、液体化工品、LNG 与 LPG，跟随各自的船岸和储运业务。',kind:'专题',domain:'k13',path:'cargo/liquids/',terms:'液货 液体散货 石油 原油 成品油 化学品 LNG LPG 接收站 管网 储罐'},
 {id:'learning-coverage',title:'全站知识地图与三条学习路线',summary:'按主题查找基础介绍、业务流程、交互演示与异常案例，选择适合自己的学习顺序。',kind:'专题',domain:'k01',path:'knowledge-map/',terms:'学习 新手 入门 覆盖 地图 岗位 路线 框架 全景'}
].map(({terms,...entry})=>({...entry,searchText:[entry.title,entry.summary,terms].join(' ').toLowerCase()}));
