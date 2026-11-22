import { articles, domains } from './knowledge.js';
import { articleDiagrams } from './article-diagrams.js';

// 本文件只记录站内入口与覆盖边界，不修改原有知识域，也不生成完成度评分。
// 覆盖依据：knowledge.js / article-diagrams.js、scenarios.js 及对应 Astro 页面。
// “交互”包含节点图解、步骤导览、操作或判断练习；普通列表筛选不单独计入。
// “异常案例”要求有具体异常情景及处置/交接内容，不能仅凭 pitfalls 判定。
const link = (label, path) => ({ label, path });
const covered = (note, ...links) => ({ note, links });
const pending = (note) => ({ note, links: [] });
const scenario = (id, label, anchor = '') => link(label, `scenarios/${id}/${anchor}`);
const article = (id, label, anchor = '') => link(label, `knowledge/${id}/${anchor}`);
const diagram = (id, label) => article(id, label, '#visual-explainer');

export const coverageDimensions = [
  { id: 'foundation', title: '基础介绍', symbol: '01', explanation: '已有概念、对象或适用边界说明。概览也计入，但不等于专题已完整。' },
  { id: 'process', title: '业务流程', symbol: '02', explanation: '能顺着步骤或责任交接阅读。只覆盖入口写明的场景，不外推到整个知识域。' },
  { id: 'interactive', title: '交互演示', symbol: '03', explanation: '可点节点、切换业务步骤，或操作与作答；具体类型在链接旁注明。' },
  { id: 'exceptions', title: '异常案例', symbol: '04', explanation: '有具体变化、处理方向或恢复交接。普通误区清单不计为案例。' },
];

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
    exceptions: pending('待深化：港口功能或空间层级误判的完整案例；现有概览的误区不算异常案例。'),
    next: '补充不同港口类型的对照案例。', tags: '入门 港区 码头 泊位 航道',
  },
  k02: {
    process: pending('待深化：航线网络、腹地与挂靠选择的专门业务流程；已有网络概览不等于选线实务。'),
    exceptions: covered('跨码头接船失败场景说明错失接续后的交接，范围限于这一场景。', scenario('inter-terminal-transfer-missed-connection', '跨码头接船失败')),
    next: '把枢纽、支线和腹地关系延伸为运输方案比较。', tags: '航线 贸易 腹地 枢纽 支线 中转',
  },
  k03: {
    process: covered('靠泊协作包含通航条件、泊位与岸侧资源确认，未覆盖水工勘测设计。', scenario('vessel-berthing-coordination', '靠泊条件与准备')),
    exceptions: covered('天气风险页有变化信号、响应、恢复和具体情景。', link('天气变化与恢复', 'risks/weather/#recovery')),
    next: '深化水深、潮汐与场地约束的联合比较。', tags: '水深 潮汐 天气 风 自然条件',
  },
  k04: {
    process: pending('待深化：港口治理、许可与监管协同的专门流程；概览已解释角色边界。'),
    exceptions: pending('待深化：制度边界或多主体权限冲突的完整案例。'),
    next: '补充不同治理安排的适用条件与实例。', tags: '制度 监管 经营 管理 资产 所有权',
  },
  k05: {
    process: pending('待深化：从需求论证到投产、改造和退出的项目流程；现有生命周期图仅为概念框架。'),
    exceptions: pending('待深化：建设延期、资产改造或退出的具体案例。'),
    next: '增加规划建设阶段的交付物与责任交接。', tags: '规划 投资 建设 资产 生命周期 退役',
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
    interactive: covered('操作 / 判断：切换九站水域图与四个等待情景，核对通航、船方、泊位、服务和装卸条件。', link('等待条件演示', 'berthing/#readiness-lab')),
    interactionKind: 'exercise',
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
    interactive: covered('操作 / 判断：七站旅程可切换货物、设备和系统图层，并含异常练习。', link('七站互动旅程', 'journey/#journey-map')),
    interactionKind: 'exercise',
    exceptions: covered('还空被拒场景含箱况与接收地点变化后的处理。', scenario('empty-return-rejected', '还空被拒')),
    next: '在既有专题上深化不同箱属、合同与航线的差异。', tags: '集装箱 箱型 进口 出口 空箱 冷藏 危险品 VGM',
    topics: [link('箱型与箱门信息', 'containers/'), link('贝位与箱位', 'infrastructure/bay/')],
  },
  k11: {
    process: covered('散粮已有卸船入仓到装车交付的流程；矿产总览另有料流与记录链。', scenario('bulk-grain-to-silo', '散粮入仓与出库'), link('矿产作业链', 'cargo/minerals/#bulk-chain')),
    interactive: covered('操作 / 判断：矿产总览可比较四种疏港方式及其交接关注点。', link('疏港方式交互比较', 'cargo/minerals/#outbound')),
    interactionKind: 'exercise',
    exceptions: covered('散粮流程明确误入仓、输送堵塞、受潮和数量差异等异常。', scenario('bulk-grain-to-silo', '入仓异常与货批隔离', '#step-2')),
    next: '深化粮种差异与不同矿产品的品质、计量交接。', tags: '干散货 粮食 农产品 大豆 玉米 小麦 矿石 煤炭 铁矿石 铝土矿 铜精矿 镍矿 磷矿石 砂石 石灰石',
    topics: [link('矿产与干散货', 'cargo/minerals/'), link('粮食与农产品', 'cargo/grains/'), link('大豆', 'cargo/grain-soybeans/'), link('玉米', 'cargo/grain-maize/'), link('小麦', 'cargo/grain-wheat/')],
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
    interactive: covered('步骤导览：可逐步查看液体船罐任务的输入、校验、输出和异常。', scenario('liquid-cargo-ship-to-tank', '船罐流程交互导览')),
    interactionKind: 'walkthrough',
    exceptions: covered('液体场景包含接收条件不齐、通信失效及船岸计量争议。', scenario('liquid-cargo-ship-to-tank', '输送异常与交接', '#step-2')),
    next: '沿具体介质专题继续看接收条件与计量口径；通用流程不替代专业方案。', tags: '液体散货 气体 石油 石化 化学品 液化天然气 液化石油气 LNG LPG 油品 泵 管线 储罐',
    topics: [link('液体散货与气体', 'cargo/liquids/'), link('石油与油品', 'cargo/liquid-petroleum/'), link('液体化学品', 'cargo/liquid-chemicals/'), link('LNG', 'cargo/liquid-lng/'), link('LPG', 'cargo/liquid-lpg/')],
  },
  k14: {
    process: covered('已有商品车滚装和客运登离船流程；邮轮仍以概览和船型介绍为主。', scenario('ro-ro-finished-vehicles', '商品车滚装'), scenario('passenger-terminal-boarding', '旅客登离船')),
    exceptions: covered('滚装场景明确车况异常、跳板条件变化和擦碰后的交接。', scenario('ro-ro-finished-vehicles', '滚装擦碰与故障', '#step-3')),
    next: '深化邮轮靠港服务、人车分流与特殊旅客协作。', tags: '滚装 客滚 邮轮 商品车 汽车 新能源汽车 旅客 客运',
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
    interactive: covered('操作 / 判断：四种疏港方式的比较会同步说明运输与记录变化。', link('汽车、铁路、皮带与水水中转', 'cargo/minerals/#outbound')),
    interactionKind: 'exercise',
    exceptions: covered('跨码头转运场景提供接船失败及后续协调内容。', scenario('inter-terminal-transfer-missed-connection', '转运接续失败')),
    next: '深化不同运输方式的时间窗口与交付责任比较。', tags: '铁路 海铁联运 多式联运 汽车 水水中转 疏港 班列 驳船',
  },
  k17: {
    process: covered('进口整箱场景包含实物与记录交接；货损货差场景补充差异核对链。', scenario('cargo-damage-and-delivery-dispute', '货差登记与复核')),
    interactive: covered('操作 / 判断：单证样张可逐栏查看信息来源、校验点和边界。', link('交接单证逐栏解释', 'documents/')),
    interactionKind: 'exercise',
    exceptions: covered('场景围绕货损货差保留证据、复核相关方和后续交付。', scenario('cargo-damage-and-delivery-dispute', '货损货差案例')),
    next: '深化不同货类的计量差异与品质交接。', tags: '理货 计量 重量 品质 检验 交接 封志 货差 货损',
  },
  k18: {
    process: covered('闸口消息文章说明任务、识别、业务核对和执行反馈的关系。', article('gate-messages', '消息到业务状态')),
    interactive: covered('操作 / 判断：单证页有三类教学样张及字段切换。', link('三类单证教学样张', 'documents/')),
    interactionKind: 'exercise',
    exceptions: covered('系统专题列出报文与状态异常，并给出职责分流。', link('消息与状态异常', 'systems/#system-message-exceptions')),
    next: '深化合同、单证版本与更正记录的关系。', tags: '单证 合同 舱单 提单 EIR 数据 状态 报文 记录',
  },
  k19: {
    process: covered('查验移箱场景覆盖有效要求、资源安排、实物交接及恢复流转。', scenario('customs-inspection-movement', '查验移箱与恢复')),
    interactive: covered('操作 / 判断：闸口模拟器分别校验授权、设备反馈、实际通行与记录。', link('闸口校验模拟', 'gate/#sim-title')),
    interactionKind: 'exercise',
    exceptions: covered('拆封与重新施封场景追踪旧新封志以及未满足的恢复条件。', scenario('inspection-opening-and-resealing', '查验拆封与重新施封')),
    next: '深化不同监管业务范围与码头协作边界。', tags: '通关 海关 监管 查验 电子口岸 单一窗口 闸口 放行',
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
    process: pending('待深化：环保、能源与港城协同的专题业务流程；污染响应是局部异常链，不能替代整个领域。'),
    exceptions: covered('环境风险页有泄漏污染、检疫异常及具体货物情景；不代表能源与气候案例齐备。', link('污染与检疫异常情景', 'risks/environment/#recovery')),
    next: '深化能源改造、气候适应与港城交通的具体案例。', tags: '环保 环境 能源 气候 港城 污染 粉尘 污水 岸电',
  },
  k24: {
    process: covered('完工结算协作案例把生产实绩、服务确认、计费和复核连接起来。', link('完工结算岗位交接', 'roles/#collaboration-completion-settlement')),
    interactive: covered('操作 / 判断：经营测算可调整虚构参数，观察收入、成本和结果。', link('经营参数测算', 'economics/#profit-title')),
    interactionKind: 'exercise',
    exceptions: covered('商业风险页有拥堵、计费与索赔情景，争议文章解释证据链。', link('合同计费与争议情景', 'risks/commercial/#recovery'), article('dispute-evidence', '争议证据核对')),
    next: '深化合同计费单位、绩效口径与经营主体的差异。', tags: '商务 财务 经营 费用 利润 成本 结算 绩效 索赔 争议',
  },
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
      : pending('待深化：本领域的交互演示。')),
    exceptions: detail.exceptions,
  };
  const gaps = coverageDimensions.filter((dimension) => !coverage[dimension.id].links.length).map((dimension) => dimension.title);
  return {
    ...domain, groupId: group.id, coverage, gaps,
    interactionKind: detail.interactionKind ?? 'diagram',
    next: detail.next, topics: detail.topics ?? [],
    searchText: [domain.id, domain.title, domain.summary, group.title, detail.tags, ...(detail.topics ?? []).map((item) => item.label)].join(' '),
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
  { id: 'first-port', number: '01', title: '第一次认识港口', purpose: '先认空间、船货与参与者，再把它们连成一程。', outcome: '能说清货经过哪里、谁接手，以及哪些条件仍需确认。', steps: [step('认清港口、码头和泊位', '先建立空间层级。', 'knowledge/k01-overview/'), step('认识船与承运对象', '把船型和货物联系起来。', 'vessels/'), step('看船怎样进港靠岸', '认识水域与船岸协作。', 'berthing/'), step('从货类选择业务入口', '了解不同货物为何需要不同安排。', 'cargo/'), step('辨认港口内外的参与者', '知道谁委托、谁计划、谁执行。', 'roles/'), step('走一遍进口箱旅程', '把空间、岗位、设备和系统串起来。', 'journey/')] },
  { id: 'one-shipment', number: '02', title: '跟一票货', purpose: '从具体货批出发，追踪实物、记录、交付条件与服务。', outcome: '能沿一票货解释交接、阻断与费用记录；案例是教学示意。', steps: [step('先认清这一批货', '以大豆档案识别货批与运输对象。', 'cargo/grain-soybeans/'), step('跟着一票货走', '在大豆或 LNG 教学场景中观察多条线如何接力。', 'shipment/'), step('打开交接单证', '核对每个字段能证明什么。', 'documents/'), step('检查陆侧交付条件', '用闸口例子区分授权、抬杆、通行和记录；不套用为 LNG 管网流程。', 'gate/#sim-title'), step('追踪服务与结算', '把实际服务接到费用与复核记录。', 'roles/#collaboration-completion-settlement')] },
  { id: 'by-role', number: '03', title: '按岗位', purpose: '选择一个岗位，按“职责 → 交接 → 场景 → 异常”阅读。', outcome: '能说明本岗位收到什么、交出什么，以及异常应交给谁。', steps: [] },
];
