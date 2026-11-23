import { articles, domains } from './knowledge.js';
import { articleDiagrams } from './article-diagrams.js';
import { shipmentCases, shipmentExceptions } from './shipment-learning.js';

// 本文件只记录站内入口与覆盖边界，不修改原有知识域，也不生成完成度评分。
// 覆盖依据：knowledge.js / article-diagrams.js、scenarios.js 及对应 Astro 页面。
// 交互类型区分图解、步骤导览、字段探索与可作答练习；普通列表筛选不单独计入。
// “异常案例”要求有具体异常情景及处置/交接内容，不能仅凭 pitfalls 判定。
const link = (label, path) => ({ label, path });
const covered = (note, ...links) => ({ note, links });
const interactiveLink = (kind, entry) => ({ ...entry, kind });
const pending = (note) => ({ note, links: [] });
const scenario = (id, label, anchor = '') => link(label, `scenarios/${id}/${anchor}`);
const article = (id, label, anchor = '') => link(label, `knowledge/${id}/${anchor}`);
const diagram = (id, label) => article(id, label, '#visual-explainer');

export const coverageDimensions = [
  { id: 'foundation', title: '基础介绍', symbol: '01', explanation: '已有概念、对象或适用边界说明。概览也计入，但不等于专题已完整。' },
  { id: 'process', title: '业务流程', symbol: '02', explanation: '能顺着步骤或责任交接阅读。只覆盖入口写明的场景，不外推到整个知识域。' },
  { id: 'interactive', title: '交互演示', symbol: '03', explanation: '节点图解、字段探索、步骤导览与可作答练习分别标注，不把浏览操作算作答题。' },
  { id: 'exceptions', title: '异常案例', symbol: '04', explanation: '有具体变化、处理方向或恢复交接。普通误区清单不计为案例。' },
];

export const interactionNames = {
  diagram: '节点图解',
  'field-exploration': '字段探索',
  walkthrough: '步骤导览',
  comparison: '交互比较',
  simulation: '操作模拟',
  calculator: '参数测算',
  exercise: '可作答练习',
};

export const coverageGroups = [
  { id: 'port-network', title: '港口与网络', hint: '认清港口在运输链中的位置', domains: ['k01', 'k02'] },
  { id: 'space-assets', title: '空间与资产', hint: '从自然条件看到长期建设', domains: ['k03', 'k05'] },
  { id: 'people-governance', title: '治理与参与者', hint: '分清谁经营、谁委托、谁执行', domains: ['k04', 'k06', 'k07'] },
  { id: 'vessel-production', title: '船岸与生产', hint: '看船期如何变成现场任务', domains: ['k08', 'k09'] },
  { id: 'cargo-business', title: '货类与专业业务', hint: '箱、散、件、液、滚，各循其路', domains: ['k10', 'k11', 'k12', 'k13', 'k14'] },
  { id: 'storage-transport', title: '堆存与内陆接续', hint: '从场内库存走到下一程运输', domains: ['k15', 'k16'] },
  { id: 'records-regulation', title: '交接与监管', hint: '把实物、记录和授权对起来', domains: ['k17', 'k18', 'k19'] },
  { id: 'equipment-systems', title: '设备与数字底座', hint: '理解作业能力与信息连接', domains: ['k20', 'k21'] },
  { id: 'risk-business', title: '风险、环境与经营', hint: '理解预防、影响和服务结算', domains: ['k22', 'k23', 'k24'] },
];

const evidence = {
  k01: {
    process: covered('以进口集装箱为例串起七个站点，并非所有港口的统一流程。', link('进口箱七站旅程', 'journey/')),
    exceptions: covered('包含发现、控制影响、责任方决定、证据、恢复和关闭的完整教学案例。', link('港口空间层级异常闭环', 'foundations/spatial-levels/#exception')),
    next: '补充不同港口类型的对照案例。', tags: '入门 港区 码头 泊位 航道',
    interactive: covered('三道理解题可选择答案并查看解释，范围限于本专题。', link('港口空间层级理解练习', 'foundations/spatial-levels/#checks')),
    interactionKind: 'exercise',
    topics: [link('港口空间层级专题', 'foundations/spatial-levels/')],
  },
  k02: {
    process: covered('虚构教学案例，逐步核对主体、输入、条件、输出和接续；不替代本港具体程序。', link('航线与腹地选择流程', 'foundations/network-choice/#process')),
    exceptions: covered('包含发现、控制影响、责任方决定、证据、恢复和关闭的完整教学案例。', link('航线与腹地选择异常闭环', 'foundations/network-choice/#exception')),
    next: '在既有航线与腹地案例上，增加直达和经枢纽中转两套方案的时窗、转接点与延误责任对照。', tags: '航线 贸易 腹地 枢纽 支线 中转',
    interactive: covered('三道理解题可选择答案并查看解释，范围限于本专题。', link('航线与腹地选择理解练习', 'foundations/network-choice/#checks')),
    interactionKind: 'exercise',
    topics: [link('航线与腹地选择专题', 'foundations/network-choice/'), link('集装箱品牌与航运公司', 'brands/'), link('上海港与宁波舟山港码头案例', 'brands-and-ports/')],
  },
  k03: {
    process: covered('靠泊协作包含通航条件、泊位与岸侧资源确认，未覆盖水工勘测设计。', scenario('vessel-berthing-coordination', '靠泊条件与准备')),
    exceptions: covered('天气风险页有变化信号、响应、恢复和具体情景。', link('天气变化与恢复', 'risks/weather/#recovery')),
    next: '深化水深、潮汐与场地约束的联合比较。', tags: '水深 潮汐 天气 风 自然条件',
  },
  k04: {
    process: covered('虚构教学案例，逐步核对主体、输入、条件、输出和接续；不替代本港具体程序。', link('治理与权限交接流程', 'foundations/governance/#process')),
    exceptions: covered('包含发现、控制影响、责任方决定、证据、恢复和关闭的完整教学案例。', link('治理与权限交接异常闭环', 'foundations/governance/#exception')),
    next: '补充不同治理安排的适用条件与实例。', tags: '制度 监管 经营 管理 资产 所有权',
    interactive: covered('三道理解题可选择答案并查看解释，范围限于本专题。', link('治理与权限交接理解练习', 'foundations/governance/#checks')),
    interactionKind: 'exercise',
    topics: [link('治理与权限交接专题', 'foundations/governance/')],
  },
  k05: {
    process: covered('虚构教学案例，逐步核对主体、输入、条件、输出和接续；不替代本港具体程序。', link('建设与运行交接流程', 'foundations/lifecycle/#process')),
    exceptions: covered('包含发现、控制影响、责任方决定、证据、恢复和关闭的完整教学案例。', link('建设与运行交接异常闭环', 'foundations/lifecycle/#exception')),
    next: '在既有建设与运行交接案例上，增加分期投用时未完成事项、临时限制及复验责任的交接清单。', tags: '规划 投资 建设 资产 生命周期 退役',
    interactive: covered('三道理解题可选择答案并查看解释，范围限于本专题。', link('建设与运行交接理解练习', 'foundations/lifecycle/#checks')),
    interactionKind: 'exercise',
    topics: [link('建设与运行交接专题', 'foundations/lifecycle/')],
  },
  k06: {
    process: covered('进口整箱场景串起船公司、代理、车队及码头的交付责任。', scenario('import-full-container', '进口货物委托交接')),
    exceptions: covered('货损货差场景说明证据、相关方复核和后续交接，不能直接判定责任。', scenario('cargo-damage-and-delivery-dispute', '交付争议与责任核对')),
    next: '深化不同委托合同下的责任链。', tags: '货主 船公司 船代 货代 车队 受托',
  },
  k07: {
    process: covered('正常船舶计划的协作泳道明确各岗位收到、判断和交出的内容。', link('船舶计划岗位接力', 'roles/#collaboration-normal-vessel-plan')),
    exceptions: covered('岗位页的岸桥故障协作案例区分现场、中控、工程与恢复交接。', link('岸桥故障协作案例', 'roles/#collaboration-quay-crane-failure')),
    next: '继续补充班组交接和跨班次协作。', tags: '岗位 部门 人员 劳动组织 班组',
    topics: [link('八类岗位入口', 'roles/')],
  },
  k08: {
    process: covered('九站专题从到港预报，经可选候泊、引航、航道、回旋、靠泊系缆，接到装卸准备。', link('进港靠泊九站旅程', 'berthing/#arrival-journey'), scenario('vessel-berthing-coordination', '船舶靠泊协作')),
    interactive: covered('切换水域节点，也可通过四个等待情景观察条件变化如何影响接续。',
      interactiveLink('walkthrough', link('进港靠泊九站导览', 'berthing/#arrival-journey')),
      interactiveLink('simulation', link('等待条件演示', 'berthing/#readiness-lab'))),
    exceptions: covered('天气改变、前船占泊和靠妥后未满足接口条件的情景，说明重新核对与协调方向。', link('天气、占泊与未开工情景', 'berthing/#readiness-lab')),
    next: '在进离港概念与协作基础上，深化不同港口及船型的差异案例。', tags: '船舶 引航 拖轮 系缆 靠泊 船型 锚地 候泊 航道 登轮 港池 回旋 水深 吃水 潮汐 ETA ETB ATB VTS AIS 移泊 离港',
    topics: [link('进港与靠泊', 'berthing/'), link('十四种船型', 'vessels/'), link('港口辅助船艇', 'vessels/#support')],
  },
  k09: {
    process: covered('船舶计划协作展示计划转成执行任务的责任链。', link('计划转为作业任务', 'roles/#collaboration-normal-vessel-plan')),
    interactive: covered('步骤导览：按阶段查看岸桥故障后的处理、重排与恢复。', scenario('quay-crane-failure-recovery', '故障恢复步骤导览')),
    interactionKind: 'walkthrough',
    exceptions: covered('故障恢复场景把技术恢复与生产恢复分开。', scenario('quay-crane-failure-recovery', '故障后的生产重排')),
    next: '深化多船、多设备同时受限的排程场景。', tags: '计划 中控 调度 现场 重排 生产',
  },
  k10: {
    process: covered('已有进口、出口以及空箱、中转等场景；这里给出两条主线。', scenario('import-full-container', '进口重箱'), scenario('export-full-container', '出口重箱')),
    interactive: covered('七站旅程可切换节点和图层，也可选择异常情景并查看作答反馈。',
      interactiveLink('walkthrough', link('七站互动旅程', 'journey/#journey-map')),
      interactiveLink('exercise', link('进口箱异常挑战', 'journey/#journey-detail'))),
    exceptions: covered('还空被拒场景含箱况与接收地点变化后的处理。', scenario('empty-return-rejected', '还空被拒')),
    next: '在既有专题上深化不同箱属、合同与航线的差异。', tags: '集装箱 箱型 进口 出口 空箱 冷藏 危险品 VGM',
    topics: [link('箱型与箱门信息', 'containers/'), link('贝位与箱位', 'infrastructure/bay/')],
  },
  k11: {
    process: covered('散粮案例与矿产概览各有其范围；新增铁矿石进口独立案例，串起卸船、堆存、数量与品质核对、授权交付及费用边界，不外推为全部矿种。', scenario('iron-ore-import', '铁矿石进口：从卸船到交付'), scenario('bulk-grain-to-silo', '散粮入仓与出库'), link('矿产作业链总览', 'cargo/minerals/#bulk-chain')),
    interactive: covered('交互比较：切换四种疏港方式，查看各自的交接记录与判断要点，不要求作答。', link('疏港方式交互比较', 'cargo/minerals/#outbound')),
    interactionKind: 'comparison',
    exceptions: covered('散粮案例与铁矿石案例分别呈现各自的输送、批次、计量及交付异常，不据此覆盖全部散货风险。', scenario('iron-ore-import', '铁矿石计量、批次与交付异常', '#step-4'), scenario('bulk-grain-to-silo', '入仓异常与货批隔离', '#step-2')),
    next: '继续深化不同矿种、粮种及港口设施的差异，不能把铁矿石案例视为所有散货的通用流程。', tags: '干散货 粮食 农产品 大豆 玉米 小麦 矿石 煤炭 铁矿石 铝土矿 铜精矿 镍矿 磷矿石 砂石 石灰石',
    topics: [link('铁矿石进口独立案例', 'scenarios/iron-ore-import/'), link('矿产与干散货', 'cargo/minerals/'), link('粮食与农产品', 'cargo/grains/'), link('大豆', 'cargo/grain-soybeans/'), link('玉米', 'cargo/grain-maize/'), link('小麦', 'cargo/grain-wheat/')],
  },
  k12: {
    process: covered('木材、卷钢与项目货物档案已有按货物身份组织的业务链。', link('木材业务链', 'cargo/timber/#business-chain'), link('风电叶片业务链', 'cargo/wind-blade/#business-chain')),
    interactive: covered('节点图解：件杂货概览可点选身份、设施、运输与交接的关系。', diagram('k12-overview', '件杂货关系图解')),
    exceptions: covered('货物档案有具体阻断和处理方向，风险页另有吊装情景。', link('卷钢异常', 'cargo/steel-coil/#cargo-risks'), link('吊装风险情景', 'risks/lifting/#recovery')),
    next: '深化项目货跨区运输与多方验收的衔接。', tags: '件杂货 重大件 项目物流 木材 卷钢 风电 叶片 储能柜',
    topics: [link('重大件', 'cargo/project-cargo/'), link('卷钢', 'cargo/steel-coil/'), link('储能柜', 'cargo/energy-storage/')],
  },
  k13: {
    process: covered('液体船罐场景已有匹配储罐、船岸确认、输送、计量与出罐交付步骤；不外推为全部气体工艺。', scenario('liquid-cargo-ship-to-tank', '液体船罐交接')),
    interactive: covered('船罐导览可逐步查看输入和输出；LNG 案例可在船岸接收节点主动模拟异常、选择处理方向并核对理解。',
      interactiveLink('walkthrough', scenario('liquid-cargo-ship-to-tank', '船罐流程交互导览')),
      interactiveLink('exercise', link('LNG 船岸接收异常练习', 'shipment/#lng-acceptance'))),
    exceptions: covered('液体场景包含接收条件不齐、通信失效及船岸计量争议。', scenario('liquid-cargo-ship-to-tank', '输送异常与交接', '#step-2')),
    next: '对照已有油品、化学品与 LNG 专题，比较交付节点所留记录与计量口径；不套用同一接收程序。', tags: '液体散货 气体 石油 石化 化学品 液化天然气 液化石油气 LNG LPG 油品 泵 管线 储罐',
    topics: [link('液体散货与气体', 'cargo/liquids/'), link('石油与油品', 'cargo/liquid-petroleum/'), link('液体化学品', 'cargo/liquid-chemicals/'), link('LNG', 'cargo/liquid-lng/'), link('LPG', 'cargo/liquid-lpg/')],
  },
  k14: {
    process: covered('对照商品车滚装、国内客运登离船与国际邮轮母港换客，区分车辆、旅客及行李的交接。', scenario('ro-ro-finished-vehicles', '商品车滚装'), scenario('passenger-terminal-boarding', '旅客登离船'), scenario('cruise-port-passenger-turnaround', '邮轮母港换客')),
    exceptions: covered('滚装案例看车况和擦碰；邮轮案例看行李标签、实物和领取状态不一致时由谁接手。', scenario('ro-ro-finished-vehicles', '滚装擦碰与故障', '#step-3'), scenario('cruise-port-passenger-turnaround', '邮轮行李异常', '#step-2')),
    next: '补充客滚船上步行旅客与随车旅客如何分流，并对照普通客运和邮轮换客。', tags: '滚装 客滚 邮轮 母港 换客 行李 商品车 汽车 新能源汽车 旅客 客运',
    topics: [link('新能源汽车业务', 'cargo/ev/'), link('船型比较', 'vessels/#compare')],
  },
  k15: {
    process: covered('冷藏重箱场景把接电、监控及交付条件串在一起，堆场专题补充组织方式。', scenario('reefer-temperature-chain', '冷藏箱保管与交接')),
    interactive: covered('操作 / 判断：堆场专题提供可操作翻箱练习。', link('堆场翻箱练习', 'infrastructure/yard/#explore')),
    interactionKind: 'exercise',
    exceptions: covered('堆存风险页有受潮、失稳等具体情景及恢复交接。', link('堆存风险情景', 'risks/stack/#recovery')),
    next: '深化仓库、特殊货物与库存授权的组合场景。', tags: '堆存 仓储 仓库 库位 库存 冷链 温控 翻箱 堆场',
  },
  k16: {
    process: covered('海铁联运场景包括班列匹配、港站交接与内陆到站。', scenario('sea-rail-intermodal', '海铁联运完整场景')),
    interactive: covered('交互比较：切换疏港方式可查看运输与记录变化，不要求作答。', link('汽车、铁路、皮带与水水中转', 'cargo/minerals/#outbound')),
    interactionKind: 'comparison',
    exceptions: covered('跨码头转运场景提供接船失败及后续协调内容。', scenario('inter-terminal-transfer-missed-connection', '转运接续失败')),
    next: '深化不同运输方式的时间窗口与交付责任比较。', tags: '铁路 海铁联运 多式联运 汽车 水水中转 疏港 班列 驳船',
  },
  k17: {
    process: covered('进口整箱场景包含实物与记录交接；货损货差场景补充差异核对链。', scenario('cargo-damage-and-delivery-dispute', '货差登记与复核')),
    interactive: covered('字段探索：逐栏查看信息来源、校验点和适用边界；本页样张不提供答题判分。', link('交接单证逐栏解释', 'documents/')),
    interactionKind: 'field-exploration',
    exceptions: covered('场景围绕货损货差保留证据、复核相关方和后续交付。', scenario('cargo-damage-and-delivery-dispute', '货损货差案例')),
    next: '深化不同货类的计量差异与品质交接。', tags: '理货 计量 重量 品质 检验 交接 封志 货差 货损',
  },
  k18: {
    process: covered('闸口消息文章说明任务、识别、业务核对和执行反馈的关系。', article('gate-messages', '消息到业务状态')),
    interactive: covered('字段探索：切换三类教学样张，查看字段来源、状态含义和交接边界；不是答题练习。', link('三类单证教学样张', 'documents/')),
    interactionKind: 'field-exploration',
    exceptions: covered('系统专题列出报文与状态异常，并给出职责分流。', link('消息与状态异常', 'systems/#system-message-exceptions')),
    next: '深化合同、单证版本与更正记录的关系。', tags: '单证 合同 舱单 提单 EIR 数据 状态 报文 记录',
  },
  k19: {
    process: covered('查验移箱场景覆盖要求、资源与实物交接；转关运输另有转出、在途、运抵与核销链。', scenario('customs-inspection-movement', '查验移箱与恢复'), scenario('customs-transit', '转关运输：从转出到核销')),
    interactive: covered('操作模拟：闸口模拟器分别反馈授权、设备、实际通行与记录状态。', link('闸口校验模拟', 'gate/#sim-title')),
    interactionKind: 'simulation',
    exceptions: covered('查验案例追踪旧新封志；转关案例说明实到但无明确反馈或发现封志差异时如何核对和交接。', scenario('inspection-opening-and-resealing', '查验拆封与重新施封'), scenario('customs-transit', '转关：在途异常与监管交接', '#step-3')),
    next: '在已有查验与转关案例上，对照查验、转关发运、核销和进口放行分别能证明什么。', tags: '通关 海关 监管 查验 电子口岸 单一窗口 闸口 放行',
  },
  k20: {
    process: covered('岸桥故障流程展示报告、技术处理、重排与生产恢复。', scenario('quay-crane-failure-recovery', '设备故障恢复流程')),
    interactive: covered('节点图解：岸桥结构图支持观察设备部位及其用途。', diagram('eq-sts', '岸桥结构观察点')),
    exceptions: covered('岸桥故障案例明确技术可用与生产复工需要分别确认。', article('incident-recovery', '岸桥故障恢复案例')),
    next: '深化设备全生命周期维护与不同设备组合。', tags: '设备 设施 工程 维修 岸桥 场桥 卸船机 AGV 皮带',
    topics: [link('十二类设备', 'equipment/'), article('eq-pump-tank', '泵、管线和储罐')],
  },
  k21: {
    process: covered('系统消息链说明各参与方之间交换什么、状态如何衔接。', link('系统消息与状态链', 'systems/#system-message-chain')),
    interactive: covered('节点图解：机房专题支持观察硬件及其承担的业务连接。', link('机房硬件交互图鉴', 'infrastructure/it-room/#explore')),
    exceptions: covered('连续性风险页包含通信、系统与供电中断后的恢复情景。', link('系统中断与恢复', 'risks/continuity/#recovery')),
    next: '深化接口版本、权限和恢复后的业务一致性。', tags: '系统 TOS ECS PLC IT 机房 硬件 网络 自动化 数据安全',
    topics: [link('港口系统全景', 'systems/'), link('机房与硬件', 'infrastructure/it-room/')],
  },
  k22: {
    process: covered('风险专题的恢复责任链说明现场、工程、生产及记录如何接续。', link('异常恢复责任链', 'risks/#risk-handoff')),
    interactive: covered('操作 / 判断：风险专题有三票货的选择题及解释。', link('三票货风险判断', 'risks/#risk-cases')),
    interactionKind: 'exercise',
    exceptions: covered('吊装与临水风险页给出信号、预防、响应、恢复和具体情景。', link('吊装异常情景', 'risks/lifting/#recovery'), link('临水与系泊情景', 'risks/waterside/#recovery')),
    next: '深化保安、职业健康及跨部门应急的专门案例。', tags: '安全 保安 职业健康 应急 风险 人员 消防 受限空间',
  },
  k23: {
    process: covered('虚构教学案例，逐步核对主体、输入、条件、输出和接续；不替代本港具体程序。', link('环境与港城协同流程', 'foundations/environment-city/#process')),
    exceptions: covered('包含发现、控制影响、责任方决定、证据、恢复和关闭的完整教学案例。', link('环境与港城协同异常闭环', 'foundations/environment-city/#exception')),
    next: '深化能源改造、气候适应与港城交通的具体案例。', tags: '环保 环境 能源 气候 港城 污染 粉尘 污水 岸电',
    interactive: covered('三道理解题可选择答案并查看解释，范围限于本专题。', link('环境与港城协同理解练习', 'foundations/environment-city/#checks')),
    interactionKind: 'exercise',
    topics: [link('环境与港城协同专题', 'foundations/environment-city/')],
  },
  k24: {
    process: covered('完工结算协作案例把生产实绩、服务确认、计费和复核连接起来。', link('完工结算岗位交接', 'roles/#collaboration-completion-settlement')),
    interactive: covered('参数测算：调整虚构参数，观察收入、成本和结果，不设标准答案。', link('经营参数测算', 'economics/#profit-title')),
    interactionKind: 'calculator',
    exceptions: covered('商业风险页有拥堵、计费与索赔情景，争议文章解释证据链。', link('合同计费与争议情景', 'risks/commercial/#recovery'), article('dispute-evidence', '争议证据核对')),
    next: '深化合同计费单位、绩效口径与经营主体的差异。', tags: '商务 财务 经营 费用 利润 成本 结算 绩效 索赔 争议',
  },
};

// 逐域记录代表案例，不能根据有流程或异常入口自动推定。
// “独立”指本领域的一个问题作为案例主线；不要求覆盖该域的全部业务。
const dedicated = (entry, note) => ({ kind: 'dedicated', ...entry, note });
const related = (entry, note) => ({ kind: 'related', ...entry, note });
export const caseKindLabels = { dedicated: '有独立案例', related: '有相关案例可借读' };

const caseEvidence = {
  k01: dedicated(link('港口空间层级教学案例', 'foundations/spatial-levels/#process'), '跟随一项任务认识港区、码头和泊位，范围限于空间层级。'),
  k02: dedicated(link('航线与腹地选择案例', 'foundations/network-choice/#process'), '以航线与腹地方案选择为主线，不代表所有网络安排。'),
  k03: related(scenario('vessel-berthing-coordination', '借读：船舶靠泊协作'), '能看到潮汐、通航与泊位条件怎样影响靠泊；尚未单独演示自然条件如何影响港址或设施选择。'),
  k04: dedicated(link('治理与权限交接案例', 'foundations/governance/#process'), '用一个交接任务说明决策和执行权限，不外推到其他治理模式。'),
  k05: dedicated(link('建设与运行交接案例', 'foundations/lifecycle/#process'), '重点是投用交接，并非建设全周期手册。'),
  k06: related(link('借读：A-01 进口箱的单证核对与系统反馈', 'import-container/#paperwork'), '可辨认船公司、货代、甲方与现场执行者；尚未单独对照不同合同下的委托关系。'),
  k07: dedicated(link('岸桥故障跨岗位协作案例', 'roles/#collaboration-quay-crane-failure'), '按现场、中控与工程的责任接力读一轮故障恢复。'),
  k08: dedicated(scenario('vessel-berthing-coordination', '船舶靠泊协作案例'), '以本船次通航条件、靠泊和装卸准备为主线。'),
  k09: dedicated(link('船舶计划转成作业任务', 'roles/#collaboration-normal-vessel-plan'), '以一个船次说明船期、资源与生产计划怎样交接。'),
  k10: dedicated(link('进口箱 A-01 从单证到对账', 'import-container/'), '以虚构进口普箱串起单证、堆场、系统、闸口与费用，并比较两种提离路径。'),
  k11: dedicated(scenario('iron-ore-import', '进口铁矿石交付案例'), '以铁矿石卸船、堆存、计量与交付为主线，不代表所有矿种。'),
  k12: related(scenario('out-of-gauge-container', '借读：超限框架箱'), '可借读超限尺寸、吊具、堆位与运输约束；木材、卷钢及风电叶片现有各自档案，未用框架箱案例代替件杂货独立案例。'),
  k13: dedicated(scenario('liquid-cargo-ship-to-tank', '液体船舱到储罐案例'), '跟随一票液体货从船舱交接到储罐，不外推到所有液体或气体。'),
  k14: dedicated(scenario('cruise-port-passenger-turnaround', '邮轮母港换客案例'), '重点看换客、行李和旅客交接；滚装货物需另读商品车案例。'),
  k15: dedicated(scenario('reefer-temperature-chain', '冷藏箱堆存与监控案例'), '以在场期间接电、监控和交付条件为主线。'),
  k16: dedicated(scenario('sea-rail-intermodal', '海铁联运交接案例'), '看港、站与内陆接续，不代表其他疏港方式。'),
  k17: dedicated(scenario('cargo-damage-and-delivery-dispute', '货损货差与交付争议案例'), '以实物与交接证据不一致为主线，不替代检验或责任认定。'),
  k18: related(link('借读：A-01 的系统与状态交接', 'import-container/#systems'), '可用同一箱理解单证来源和状态；尚未单独演示资料更正、版本转换和更正回执链。'),
  k19: dedicated(scenario('customs-transit', '进口转关与监管交接案例'), '专门区分转关放行、运抵、核销和进口放行。'),
  k20: dedicated(scenario('quay-crane-failure-recovery', '岸桥故障与恢复案例'), '聚焦设备故障后技术可用与恢复生产的交接。'),
  k21: related(link('借读：A-01 的系统与状态交接', 'import-container/#systems'), '能跟同一箱辨认消息和权威状态；尚未独立演示系统接口从接入到对账的完整案例。'),
  k22: dedicated(scenario('weather-and-system-interruption', '中断与恢复案例'), '看暂停、恢复与记录核对，不代表现有全部安全专题。'),
  k23: dedicated(link('环境与港城协同案例', 'foundations/environment-city/#process'), '用一个环境协同任务展示责任与交接。'),
  k24: dedicated(link('实绩到计费的结算案例', 'roles/#collaboration-completion-settlement'), '以作业完工与计费复核为主线，不把单票收入当经营利润。'),
};

export const knowledgeCoverage = domains.map((domain) => {
  const detail = evidence[domain.id];
  const overview = articles.find((item) => item.id === `${domain.id}-overview`);
  const group = coverageGroups.find((item) => item.domains.includes(domain.id));
  if (!detail || !overview || !group) throw new Error(`知识覆盖地图缺少已核实的知识域映射：${domain.id}`);
  const hasDiagram = articleDiagrams.some((item) => item.id === overview.id);
  const coverage = {
    foundation: covered('既有概览已说明本领域的入门概念与适用边界；不据此认定专业知识完备。', article(overview.id, '阅读领域概览')),
    process: detail.process,
    interactive: detail.interactive ?? (hasDiagram
      ? covered('节点图解：既有概览的关系图可点击节点查看说明；它不是可执行的业务模拟器。', diagram(overview.id, '概览关系图解'))
      : pending('缺入口：本领域的交互演示尚无已核实链接。')),
    exceptions: detail.exceptions,
  };
  coverage.interactive.links = coverage.interactive.links.map((entry) =>
    interactiveLink(entry.kind ?? detail.interactionKind ?? 'diagram', entry));
  const gaps = coverageDimensions.filter((dimension) => !coverage[dimension.id].links.length).map((dimension) => dimension.title);
  const next = detail.next?.trim() ?? '';
  const caseStudy = caseEvidence[domain.id];
  if (!caseStudy) throw new Error(`知识覆盖地图缺少案例核对：${domain.id}`);
  return {
    ...domain, groupId: group.id, coverage, gaps, caseStudy,
    development: { missingEntry: gaps.length > 0, canDeepen: Boolean(next) },
    next, topics: detail.topics ?? [],
    searchText: [domain.id, domain.title, domain.summary, group.title, detail.tags, caseStudy.label, ...(detail.topics ?? []).map((item) => item.label)].filter(Boolean).join(' '),
  };
});

const step = (title, purpose, path) => ({ title, purpose, path });
export const rolePaths = [
  { id: 'planner', title: '计划', steps: [step('认识计划岗位', '辨认资源约束与安排边界。', 'knowledge/job-planner/'), step('看船舶计划交接', '看安排怎样成为可执行任务。', 'roles/#collaboration-normal-vessel-plan'), step('跟随进港靠泊流程', '从预报与候泊核对船岸准备。', 'berthing/'), step('处理故障后的重排', '分清资源调整与生产恢复。', 'scenarios/quay-crane-failure-recovery/')] },
  { id: 'control', title: '中控与调度', steps: [step('认识中控岗位', '理解如何接收现场变化。', 'knowledge/job-control/'), step('看生产计划关系', '把计划、指令与反馈接起来。', 'knowledge/k09-overview/'), step('跟随船舶计划交接', '确认交给执行方的任务。', 'roles/#collaboration-normal-vessel-plan'), step('处理天气或系统中断', '理解暂停与记录恢复。', 'scenarios/weather-and-system-interruption/')] },
  { id: 'operator', title: '现场操作', steps: [step('认识操作岗位', '区分作业指令与真实搬运。', 'knowledge/job-operator/'), step('看实物交接', '核对对象、数量、外观与封志。', 'knowledge/k17-overview/'), step('走一遍进口箱', '观察现场与上下游的交接。', 'journey/'), step('辨认吊装异常', '找出变化信号与报告方向。', 'risks/lifting/#recovery')] },
  { id: 'engineer', title: '工程设备', steps: [step('认识工程岗位', '理解技术可用的责任边界。', 'knowledge/job-engineer/'), step('认清设备结构', '把部位与实际用途对应起来。', 'knowledge/eq-sts/#visual-explainer'), step('跟随设备故障流程', '看报告、处理与交付如何接续。', 'scenarios/quay-crane-failure-recovery/'), step('核对恢复交接', '分清技术恢复与生产恢复。', 'knowledge/incident-recovery/')] },
  { id: 'gate', title: '闸口', steps: [step('认识闸口岗位', '理解本车次的交接责任。', 'knowledge/job-gate/'), step('看五种闸口任务', '分清进场、出场和双交易。', 'knowledge/gate-tasks/'), step('操作闸口模拟', '依次确认授权、通行与记录。', 'gate/#sim-title'), step('处理数据不符', '把实物、来源数据和授权分开核对。', 'roles/#collaboration-gate-data-mismatch')] },
  { id: 'commercial', title: '商务与财务', steps: [step('认识商务财务岗位', '沿服务约定理解对账收款。', 'knowledge/job-commercial-finance/'), step('看完工结算交接', '把实绩与计费依据对应起来。', 'roles/#collaboration-completion-settlement'), step('试算经营参数', '观察收入、成本与折旧的关系。', 'economics/#profit-title'), step('核对争议证据', '保留事实与更正履历。', 'knowledge/dispute-evidence/')] },
  { id: 'customs', title: '货代与监管协作', steps: [step('分清海关与货代', '辨认监管者和受托服务方。', 'knowledge/job-customs-forwarder/'), step('看单证与并行状态', '分清消息收到与业务条件成立。', 'knowledge/k18-overview/'), step('跟随查验移箱', '看有效要求怎样接到现场。', 'scenarios/customs-inspection-movement/'), step('核对拆封与恢复', '保留旧新封志及恢复依据。', 'scenarios/inspection-opening-and-resealing/')] },
  { id: 'it', title: '信息技术', steps: [step('认识信息技术岗位', '辨认系统连接与业务权限边界。', 'knowledge/job-it/'), step('看系统消息链', '理解信息从谁传给谁。', 'systems/#system-message-chain'), step('认识机房与硬件', '把业务记录连回运行设施。', 'infrastructure/it-room/'), step('核对系统中断恢复', '关注恢复后的记录一致性。', 'risks/continuity/#recovery')] },
];

export const learningPaths = [
  { id: 'first-port', number: '01', title: '第一次认识港口', purpose: '先认空间、船货与参与者，再把它们连成一程。', outcome: '能说清货经过哪里、谁接手，以及哪些条件仍需确认。', nextStep: step('继续读一条具体货类业务线', '从货类专题挑选集装箱、散货或件杂货继续学习；这是续读建议，不计入本路线进度。', 'cargo/'), steps: [step('认清港口、码头和泊位', '先建立空间层级。', 'knowledge/k01-overview/'), step('认识船与承运对象', '把船型和货物联系起来。', 'vessels/'), step('看船怎样进港靠岸', '认识水域与船岸协作。', 'berthing/'), step('从货类选择业务入口', '了解不同货物为何需要不同安排。', 'cargo/'), step('辨认港口内外的参与者', '知道谁委托、谁计划、谁执行。', 'roles/'), step('走一遍进口箱旅程', '把空间、岗位、设备和系统串起来。', 'journey/')] },
  {
    id: 'one-shipment', number: '02', title: '跟一票货',
    purpose: '选进口集装箱、大豆或 LNG，沿同一票货走到交付，不在中途换货类。',
    outcome: '能沿同一票货说明实物、岗位、记录、交付条件和服务如何接力；案例为虚构教学示意。',
    steps: [],
    featuredCase: step('进口箱 A-01：从单证走到交付对账', '按顺序看卸船、系统、监管、闸口和费用；在同一个进口箱上对照本港提货和进口转关。', 'import-container/'),
    branches: shipmentCases.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      description: lesson.subtitle,
      profile: link(`${lesson.shortTitle}货物档案`, `cargo/${lesson.profile}/`),
      steps: lesson.stages.map((stage) => ({
        ...step(stage.title, stage.summary, `shipment/#${lesson.id}-${stage.id}`),
        hasExercise: shipmentExceptions.some((exception) => exception.caseId === lesson.id && exception.stepId === stage.id),
      })),
    })),
    comparisons: [
      step('交接单证字段探索', '对照字段来源与校验边界，不把通用样张当作这两票货的实际单证。', 'documents/'),
      step('集装箱闸口模拟', '对照授权、抬杆、通行与回执；不是大豆提货的必经步骤，也不适用于 LNG 管网交接。', 'gate/#sim-title'),
    ],
  },
  { id: 'by-role', number: '03', title: '按岗位', purpose: '选择一个岗位，按“职责 → 交接 → 场景 → 异常”阅读。', outcome: '能说明本岗位收到什么、交出什么，以及异常应交给谁。', steps: [] },
];
