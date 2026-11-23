// 船型知识档案：按货物、装卸方式及专用能力交叉分组，不是互斥的法定分类。
// sources 对应下列一手资料；scope 限定所支持的事实，不将企业单船配置推广为全船型能力。
// stages、岗位名称与 record 为教学归纳，并非来源逐字规定的全国统一流程或法定单证名。
// 同一航次可多次挂靠；监管申报/回执、承运审核、码头生产任务和实际交接分别记录。
// 港航主管机关依法监管，船长负责船舶安全，码头经营人组织岸侧作业，船代协调申报与服务。
// 海关监管状态、商业交付授权与作业就绪状态不能互相替代；具体职责及系统以当地为准。
// 船型名称不能证明适装；不提供现场吊装、系固、危货或压载操作参数。
// 内部链接不含站点 base；visual 按资源契约使用绝对站内路径。

// 核验说明：本轮 web.run 返回空响应，以下事实依据实际直读的一手网页正文；未解析正文的PDF未纳入来源。

export const vesselGroups = [
  {
    "id": "container",
    "name": "集装箱运输",
    "description": "从标准箱及船上箱位理解运输。它描述货物组织方式，可与冷藏、危险货物或特殊箱运输需求交叉；具体船舶仍须核验适装条件。"
  },
  {
    "id": "bulk",
    "name": "干散货运输",
    "description": "以不经逐件包装、直接进入货舱的固体货物为主。矿石、煤炭、谷物的性质和规则不同，不能因同属干货便任意换装。"
  },
  {
    "id": "unitized",
    "name": "件杂货与滚装运输",
    "description": "按件、卷、托盘、车辆或轮式载具组织交接。RoRo描述装卸方式，PCTC与RoPax侧重不同用途；多用途船也可能具有重吊或滚装能力。"
  },
  {
    "id": "liquid",
    "name": "液体与液化气运输",
    "description": "按货物性质、货舱及输送系统区分油船、化学品船、LNG和LPG船。某船可能兼具经认可的运输用途，外观与船型名称不能代替适装审核。"
  },
  {
    "id": "special",
    "name": "项目与温控专用运输",
    "description": "观察重大件如何登船、运输中怎样支承，以及温控货物怎样保持交接连续。重吊、半潜、甲板运输和冷藏属于不同技术维度，这里仅作学习分组，并非互斥的法定分类。"
  }
];

export const vesselSources = [
  {
    "id": "imo-ship-identity",
    "title": "IMO Identification Number Scheme",
    "org": "国际海事组织（IMO）",
    "url": "https://www.imo.org/en/OurWork/IIIS/Pages/IMO-Identification-Number-Schemes.aspx",
    "checked": "2026-11-22",
    "scope": "已核对官方正文：适用船舶的IMO编号用于持久识别，不因船名、船旗等变化而改变。适用范围须另核；航次、挂靠编号及货票关联为本站教学数据模型，不是IMO统一业务编码。"
  },
  {
    "id": "imo-vessel-window",
    "title": "Maritime Single Window",
    "org": "国际海事组织（IMO）",
    "url": "https://www.imo.org/en/ourwork/facilitation/pages/maritimesinglewindow-default.aspx",
    "checked": "2026-11-22",
    "scope": "已核对船舶抵港、在港和离港向公共主管部门交换信息的官方概述。用于区分监管信息交换与码头生产安排，不证明各口岸平台、回执名称、批准事项或接口相同。"
  },
  {
    "id": "imo-vessel-css",
    "title": "Code of Safe Practice for Cargo Stowage and Securing (CSS Code)",
    "org": "国际海事组织（IMO）",
    "url": "https://www.imo.org/en/ourwork/safety/pages/css-code.aspx",
    "checked": "2026-11-22",
    "scope": "已核对官方概述中的适用船舶、专业人员、计划监督和船长职责原则；未以此代替现行完整规则及船舶货物系固手册，不引用吊装或系固参数。"
  },
  {
    "id": "imo-vessel-vgm",
    "title": "Verification of the gross mass of a packed container",
    "org": "国际海事组织（IMO）",
    "url": "https://www.imo.org/en/ourwork/safety/pages/verification-of-the-gross-mass.aspx",
    "checked": "2026-11-22",
    "scope": "已核对装货集装箱核实总重的责任与装船条件。仅用于适用SOLAS的装货集装箱；具备VGM并不等于保证装船，不推广为所有件杂货称重规则。"
  },
  {
    "id": "mol-product-ships",
    "title": "A Vessel for Every Need — Product Transport",
    "org": "商船三井（MOL）",
    "url": "https://www.mol.co.jp/en/various-vessels/product_trasnportation/",
    "checked": "2026-11-22",
    "scope": "已核对船公司科普中的集装箱船、箱格导轨、岸侧装卸和汽车船多层甲板等描述。仅归纳结构及设备类型，不引用示例尺寸、装车间距、市场规模、航速或减排宣传。"
  },
  {
    "id": "imo-vessel-imsbc",
    "title": "International Maritime Solid Bulk Cargoes (IMSBC) Code",
    "org": "国际海事组织（IMO）",
    "url": "https://www.imo.org/en/ourwork/safety/pages/cargoesinbulk-default.aspx",
    "checked": "2026-11-22",
    "scope": "已核对官方概述：固体散货涉及货物分布、稳性及化学反应等风险，散装谷物另有规则。未逐项核验货物明细表，不提供矿种分类结论、含水率限值或现场判定方法。"
  },
  {
    "id": "imo-vessel-blu",
    "title": "BLU Code and BLU Manual",
    "org": "国际海事组织（IMO）",
    "url": "https://www.imo.org/en/ourwork/safety/pages/blu-code-and-blu-manual.aspx",
    "checked": "2026-11-22",
    "scope": "已核对船长、散货码头代表和相关方在安全装卸中的协作框架。本站阶段是教学归纳，不复制完整检查表，不给出舱序、速率、配载或压载操作要求。"
  },
  {
    "id": "mol-dry-bulk-ships",
    "title": "A Vessel for Every Need — Dry Bulkship Transport",
    "org": "商船三井（MOL）",
    "url": "https://www.mol.co.jp/en/various-vessels/drybulk/",
    "checked": "2026-11-22",
    "scope": "已核对干散货实例、有吊和无吊船、矿石船与木片船等结构差异。该页部分船级大小及运河描述为企业科普口径，本库不采用其尺寸、吨位界线或运河通行结论。"
  },
  {
    "id": "spliethoff-multipurpose",
    "title": "Spliethoff — Worldwide ocean transport",
    "org": "Spliethoff航运公司",
    "url": "https://www.spliethoff.com/",
    "checked": "2026-11-22",
    "scope": "已核对该公司多用途船、可移动二层甲板、船吊以及多个货种服务入口。用于举例说明多用途设计，不将该公司全船队配置推广至所有多用途船。"
  },
  {
    "id": "spliethoff-forest-ships",
    "title": "Forest products",
    "org": "Spliethoff航运公司",
    "url": "https://www.spliethoff.com/markets/forest-products/",
    "checked": "2026-11-22",
    "scope": "已核对S型等企业案例中的侧装系统、箱形货舱、可移动二层甲板及林纸产品服务。侧装能力和舱内环境设备是特定船舶配置，不构成木材通用装载方法。"
  },
  {
    "id": "spliethoff-metal-ships",
    "title": "Metals",
    "org": "Spliethoff航运公司",
    "url": "https://www.spliethoff.com/markets/metals/",
    "checked": "2026-11-22",
    "scope": "已核对该公司钢材运输、货舱与除湿设备介绍；只支持按货种检查舱况和防潮条件的主题，不采用无损承诺，不提供卷钢积载或系固参数。"
  },
  {
    "id": "ww-roro-cargo",
    "title": "Ocean transportation",
    "org": "Wallenius Wilhelmsen航运公司",
    "url": "https://www.walleniuswilhelmsen.com/what-we-do/ocean-transportation",
    "checked": "2026-11-22",
    "scope": "已核对自驱车辆滚装，以及非自驱件杂货通过轮式载具滚装的描述。仅作该公司业务案例，不使用页面尺寸、单件重量上限或全天候安全宣传。"
  },
  {
    "id": "stena-roro-ropax",
    "title": "Our Fleet",
    "org": "Stena RoRo航运公司",
    "url": "https://stenaroro.com/our-fleet/",
    "checked": "2026-11-22",
    "scope": "已核对RoRo货船与RoPax客滚船的用途区别：后者兼有滚装载货与旅客设施。船队数量及特定航线不作通用结论。"
  },
  {
    "id": "gothenburg-ropax",
    "title": "Stena Line — RoPax terminals",
    "org": "哥德堡港（Port of Gothenburg）",
    "url": "https://www.portofgothenburg.com/maritime/terminals/stena-line/?epslanguage=en",
    "checked": "2026-11-22",
    "scope": "已核对官方港口页面对RoPax及客货渡轮码头的说明。用于旅客与滚装业务并存的实例，不套用其航线、班次或吞吐量。"
  },
  {
    "id": "biglift-heavy-ships",
    "title": "Company Profile",
    "org": "BigLift Shipping航运公司",
    "url": "https://www.bigliftshipping.com/en/company/profile",
    "checked": "2026-11-22",
    "scope": "已核对公司将重吊船与重型运输船分别列示，以及重吊船自带吊机、部分兼具滚装能力。未采用船队数量、世界排名、起重吨位或单件装运上限。"
  },
  {
    "id": "biglift-engineering",
    "title": "The foundation of our operations — Engineering",
    "org": "BigLift Shipping航运公司",
    "url": "https://www.bigliftshipping.com/en/company/engineering",
    "checked": "2026-11-22",
    "scope": "已核对项目工程、结构、船舶运动、稳性、支承和系固等专业评估类别。用于解释部门协作及方案版本交接；不提供工程计算、现场工序或通用批准权限。"
  },
  {
    "id": "biglift-deck-carrier",
    "title": "BigLift MC-Class",
    "org": "BigLift Shipping航运公司",
    "url": "https://www.bigliftshipping.com/en/fleet/mc-class",
    "checked": "2026-11-22",
    "scope": "已核对MC型模块运输船的平整大甲板、滚装用途及岸桥、导管架等项目入口。作为甲板运输业务案例，不将其压载能力、尺度或项目条件推广至其他甲板船。"
  },
  {
    "id": "boskalis-semi-ships",
    "title": "Semi-submersible heavy transport vessels",
    "org": "Boskalis海运与海工承包公司",
    "url": "https://boskalis.com/about-us/fleet-and-equipment/offshore-vessels/semi-submersible-heavy-transport-vessels",
    "checked": "2026-11-22",
    "scope": "已核对半潜重型运输船用于海工结构、浮式设施及风电基础的介绍。只支持用途与技术类别，不引用最大、最先进等排名描述，也不将运输能力等同海上安装能力。"
  },
  {
    "id": "boskalis-float-case",
    "title": "Transport and installation Moho Nord FPU",
    "org": "Boskalis海运与海工承包公司",
    "url": "https://boskalis.com/about-us/projects/transport-and-installation-moho-nord-fpu?p=2",
    "checked": "2026-11-22",
    "scope": "已核对2016年具体项目中的浮装、排压载后支承、浮卸、拖轮配合与后续拖带。用来解释浮装原理及运输和安装的交界；不引用项目水深、载荷、持续时间或天气限值。"
  },
  {
    "id": "mol-tanker-ships",
    "title": "A Vessel for Every Need — Energy Transport (Tankers)",
    "org": "商船三井（MOL）",
    "url": "https://www.mol.co.jp/en/various-vessels/tanker/",
    "checked": "2026-11-22",
    "scope": "已核对原油船、成品油船、化学品船及LPG船的货物实例、管路运输和舱材差异。仅取原理；不采用尺寸、吨位等级界线、低温或压力数值及减排宣传。"
  },
  {
    "id": "imo-vessel-oil",
    "title": "MARPOL Annex I — Prevention of Pollution by Oil",
    "org": "国际海事组织（IMO）",
    "url": "https://www.imo.org/en/ourwork/environment/pages/oilpollution-default.aspx",
    "checked": "2026-11-22",
    "scope": "已核对油污染预防的官方框架说明。用于油船防污染主题，不引用排放数值，不构成排放许可、清舱指令或全部现行条款清单。"
  },
  {
    "id": "imo-vessel-ibc",
    "title": "IBC Code",
    "org": "国际海事组织（IMO）",
    "url": "https://www.imo.org/en/ourwork/safety/pages/ibc-code.aspx",
    "checked": "2026-11-22",
    "scope": "已核对散装危险化学品和有毒液体物质、船型与产品危险性关联，以及早期船舶BCH适用提示。未核验逐种产品表，不把化学品船名称或型别当作任意产品适装证明。"
  },
  {
    "id": "imo-vessel-igc",
    "title": "IGC Code",
    "org": "国际海事组织（IMO）",
    "url": "https://www.imo.org/en/ourwork/safety/pages/igc-code.aspx",
    "checked": "2026-11-22",
    "scope": "已核对散装液化气运输与低温、压力风险的设计装备框架及GC/EGC历史适用说明。只引用框架，不把网页所述历史修订当作截至核查日的完整修正清单，不提供产品适装或操作参数。"
  },
  {
    "id": "mol-lng-ships",
    "title": "A Vessel for Every Need — Energy Transport (LNG Carriers)",
    "org": "商船三井（MOL）",
    "url": "https://www.mol.co.jp/en/various-vessels/lng_carrier/",
    "checked": "2026-11-22",
    "scope": "已核对以甲烷为主的天然气液化运输、保温货舱、蒸发气、船岸管路和紧急切断的原理说明。未采用温度、容积、排名、环保或泄漏安全性宣传。"
  },
  {
    "id": "solvang-lpg-segments",
    "title": "Business areas",
    "org": "Solvang航运公司",
    "url": "https://solvangship.no/about-us/business-areas/",
    "checked": "2026-11-22",
    "scope": "已核对公司实际经营中的半冷式／乙烯能力船与全冷式LPG船分段。作为不同货物系统能力的实例，与MOL压力式介绍合用；不推广各段吨位、容积或未来交付计划。"
  },
  {
    "id": "seatrade-reefer-fleet",
    "title": "Fleet list — Special reefer vessels",
    "org": "Seatrade冷藏航运公司",
    "url": "https://www.seatrade.com/fleet/",
    "checked": "2026-11-22",
    "scope": "已核对多艘专用冷藏船分别列示托盘、甲板冷藏箱位和货物装卸设备。只引用混合承载方式的存在，不汇总船队或引用单船容量与尺寸。"
  },
  {
    "id": "seatrade-cold-handoff",
    "title": "Cargo",
    "org": "Seatrade冷藏航运公司",
    "url": "https://www.seatrade.com/services/cargo-transport-logistics/cargo/",
    "checked": "2026-11-22",
    "scope": "已核对其货物监控、码头冷库、多式联运、装卸及单证衔接服务。用作冷链交接教学依据，不保证具体航线、货物或口岸服务可用。"
  },
  {
    "id": "cool-carriers-reefer",
    "title": "Cool Carriers — Specialised Reefer Operator",
    "org": "Cool Carriers冷藏航运公司",
    "url": "https://cool-carriers.com/en",
    "checked": "2026-11-22",
    "scope": "已核对专用冷藏船的鲜果和易腐货物、舱内货物与甲板冷藏箱并存及监控介绍。仅引用已列服务类型，不采用最大船队、温控范围、时效或减排数值。"
  },
  {
    "id": "mol-support-vessels",
    "title": "A Vessel for Every Need — Vessels Serving in Specialized Fields",
    "org": "商船三井（MOL）",
    "url": "https://www.mol.co.jp/en/various-vessels/special_vessel/",
    "checked": "2026-11-22",
    "scope": "已核对拖轮推拉协助、海工服务船SOV、人员转运船CTV及电缆船的用途。支持supportVessels中的拖轮与海工服务船，不引用人员容量、动力、尺寸或作业方法。"
  },
  {
    "id": "damen-barges",
    "title": "Pontoons & Barges",
    "org": "达门造船集团（Damen）",
    "url": "https://www.damen.com/vessels/pontoons-and-barges",
    "checked": "2026-11-22",
    "scope": "已核对浮箱、起重驳、液货驳、转运驳及运输／工程用途，支持supportVessels中的驳船。只描述用途差异，不据此判断某艘驳船推进方式、适航区域或承载能力。"
  },
  {
    "id": "boskalis-dredging",
    "title": "Construction and maintenance of ports",
    "org": "Boskalis海运与海工承包公司",
    "url": "https://boskalis.com/activities/dredging/construction-and-maintenance-of-ports",
    "checked": "2026-11-22",
    "scope": "已核对进港航道、港池、泊位疏浚及耙吸、绞吸等设备用途，支持supportVessels中的疏浚船。用于解释港口维护业务，不提供疏浚设计、弃土许可或施工参数。"
  }
];

export const vesselProfiles = [
  {
    "id": "container-ship",
    "name": "集装箱船",
    "english": "Container ship",
    "group": "container",
    "summary": "把货物装入集装箱，再按船上箱位组织运输。码头围绕箱号和作业任务运转，船方同时关注整船积载与航行安全。",
    "visual": "/illustrations/vessels/container-ship.svg",
    "cargo": [
      "普通干货箱内货物",
      "经承运审核的冷藏箱、特种箱及危险货物箱"
    ],
    "method": "以岸桥配合集装箱吊具在船与岸之间吊装，再由水平运输设备连接堆场；有些船或港口使用船吊，须核验实际配置。冷藏箱还涉及供电与状态交接。",
    "portFit": "船舶计划核对泊位与岸桥服务范围，操作部／中控把装卸顺序接到堆场与车辆任务；工程部保障岸桥、供电和通信可用，船方核对积载及船上系固安排。",
    "identity": "以适用船舶的IMO编号识别船体，以船公司航次及本港挂靠编号识别本次访问；装卸清单再关联箱号、装卸港和船上箱位，船名相同或箱号相同都不足以识别一次作业。",
    "distinctions": [
      {
        "title": "船型与箱型是两层分类",
        "text": "集装箱船不是一种箱型；冷藏、开顶或框架等箱的条件仍要单独审核。"
      },
      {
        "title": "船上箱位不是堆场箱位",
        "text": "船上位置按本船箱位图解释，岸上另有堆场位置体系；位置记录必须说明属于哪艘船或哪个堆场，不能直接互换。"
      },
      {
        "title": "VGM不是装船保证",
        "text": "适用的装货集装箱须及时提供核实总重；有VGM仍需满足承运、船舶积载及其他装船条件。"
      },
      {
        "title": "系统状态不等于实物移动",
        "text": "配载计划、海关监管状态、作业指令和已装船实绩是不同记录，不能把其中一个直接替代另一个。"
      }
    ],
    "stages": [
      {
        "title": "船期与预配载",
        "actor": "船公司／船代、船舶计划、船方",
        "action": "关联本港挂靠与装卸清单，核对船舶和码头资源，接收配载资料。",
        "record": "船期版本、挂靠编号、预配载清单"
      },
      {
        "title": "到港与岸侧准备",
        "actor": "船代、相关主管机关、操作部／中控、工程部",
        "action": "按当地要求办理到港事项；码头准备岸桥、堆场任务和冷藏箱供电条件。",
        "record": "监管回执、泊位计划、设备就绪记录分别留存"
      },
      {
        "title": "船岸确认",
        "actor": "船方、船舶计划、理货",
        "action": "对齐当前积载版本、箱号、箱属性、VGM及适用限制，差异先澄清。",
        "record": "船岸确认记录、清单差异及处理结果"
      },
      {
        "title": "装卸与实绩",
        "actor": "岸桥班组、水平运输班组、理货、中控",
        "action": "按已确认任务交接箱，记录实际船位／场位；箱损或错箱反馈计划岗位。",
        "record": "装卸实绩、位置变更、异常及冷藏交接记录"
      },
      {
        "title": "完工与离港",
        "actor": "船方、船代、码头业务与计划岗位",
        "action": "对清实装实卸及未完成箱，向船方交接最终资料并办理适用离港事项。",
        "record": "最终箱清单、未装未卸原因、离泊时间及计费依据"
      }
    ],
    "checks": [
      "船舶身份、航次、挂靠与清单版本是否对应",
      "箱号、封志记录及箱属性有无不一致",
      "适用的VGM、危险货物或冷藏要求是否已交接",
      "监管状态、商业授权与船岸作业条件是否分别确认",
      "船上位置、堆场位置与实际装卸记录能否追溯"
    ],
    "systemLinks": [
      {
        "label": "集装箱TOS",
        "path": "systems/#system-container-tos",
        "text": "把箱号、库存位置和装卸实绩连接起来。"
      },
      {
        "label": "船舶与泊位计划",
        "path": "systems/#system-vessel-planning",
        "text": "协调靠泊窗口、配载版本及作业资源。"
      },
      {
        "label": "监管状态对接",
        "path": "systems/#system-customs",
        "text": "查询适用的监管状态，不能用计划任务替代放行依据。"
      }
    ],
    "riskIds": [
      "lifting",
      "identity",
      "equipment",
      "continuity"
    ],
    "links": [
      {
        "label": "箱型与箱业务",
        "path": "containers/"
      },
      {
        "label": "冷链货物",
        "path": "cargo/cold-chain/"
      },
      {
        "label": "包装危险货物",
        "path": "cargo/packaged-dangerous/"
      },
      {
        "label": "身份核验风险",
        "path": "risks/identity/"
      }
    ],
    "sources": [
      "mol-product-ships",
      "imo-vessel-vgm",
      "imo-ship-identity",
      "imo-vessel-window",
      "imo-vessel-css"
    ],
    "limits": "适用于理解集装箱船岸交接；箱位编码和系统字段以实际船图与接口为准。船公司示例不代表所有船都有同一设备，本文不提供配载、系固或危险货物隔离参数。"
  },
  {
    "id": "bulk-carrier",
    "name": "干散货船",
    "english": "Dry bulk carrier",
    "group": "bulk",
    "summary": "把不逐件包装的固体货物直接装入货舱，按货种、批次与重量交接。铁矿石、煤炭和谷物都可能用散货船运输，但适装条件和风险并不相同。",
    "visual": "/illustrations/vessels/bulk-carrier.svg",
    "cargo": [
      "按实际品名和条件审核的铁矿石、煤炭等固体散货",
      "适用谷物规则并经审核的散装谷物",
      "与具体船舶匹配的木片等货物"
    ],
    "method": "按货物和码头配置使用装船机、输送带、抓斗或专用卸船设备。部分散货船自带吊机，部分依赖岸侧设备；船岸共同确认装卸计划及变更。",
    "portFit": "泊位需要匹配船舶、装卸设备和堆场／筒仓通道。操作部协调输送链，库场区分货种与批次，工程部维护输送和除尘设施，船方关注装卸过程中船体受力与稳性。",
    "identity": "船舶IMO编号与本次航次、挂靠关联，再把货物批次、舱号及计量记录接入同一次作业；同一船上多舱货物不能只用船名合并。",
    "distinctions": [
      {
        "title": "干货不等于干散货",
        "text": "钢卷、袋装货或集装箱同样是干货，却有不同的装卸与积载需求；“散货船”三个字不能证明可承运任何干货。"
      },
      {
        "title": "矿种名还不够",
        "text": "同为铁矿相关货物，其形态和性质也可能不同；应按准确货物资料及适用货物明细审核，不凭商品俗称判断安全类别。"
      },
      {
        "title": "谷物另有规则",
        "text": "IMO固体散货规则框架与国际谷物规则分开；不能把谷物当作已由IMSBC覆盖的一般矿石货。"
      },
      {
        "title": "专业化配置不相同",
        "text": "矿石船、木片船及有吊／无吊船体现货物密度、空间和装卸配合的差异，不在本库给出统一吨位界线。"
      }
    ],
    "stages": [
      {
        "title": "货物与船舶预审",
        "actor": "货主／托运人、承运人、船方、码头业务",
        "action": "提交准确货物资料并审核船舶、码头及库存通道是否适配。",
        "record": "货物资料版本、适装审核及批次关联"
      },
      {
        "title": "到港与库场衔接",
        "actor": "船代、船舶计划、库场、中控",
        "action": "协调到港事项和泊位，安排接卸去向或待装批次，区分不同货流。",
        "record": "到港回执、泊位计划、批次及库场分配"
      },
      {
        "title": "船岸装卸约定",
        "actor": "船长／船方代表、码头代表、理货计量",
        "action": "确认装卸计划、通信、计量口径与异常联络，变化重新沟通。",
        "record": "双方确认的计划、检查与变更记录"
      },
      {
        "title": "连续作业与监测",
        "actor": "作业班组、船方、中控、工程及安全环保岗位",
        "action": "衔接舱口、设备和库场，关注设备、扬尘、货物异常及船岸状态反馈。",
        "record": "分舱分批实绩、计量及异常处理记录"
      },
      {
        "title": "数量结清与离港",
        "actor": "船方、理货计量、货主代理、船代",
        "action": "按约定核对数量差异和剩余货物，确认完工与适用离港事项。",
        "record": "最终数量记录、差异说明、完工及离泊记录"
      }
    ],
    "checks": [
      "实际货物品名、形态、批次及适用规则是否明确",
      "所需货物资料与检测文件是否有效且对应本批次",
      "货舱条件与上批货物影响是否完成审核",
      "船岸确认的计划及变更是否一致",
      "计量方法、库场去向和环境控制设施是否匹配"
    ],
    "systemLinks": [
      {
        "label": "船舶与泊位计划",
        "path": "systems/#system-vessel-planning",
        "text": "对齐装卸窗口与船岸资源。"
      },
      {
        "label": "多货类生产台账",
        "path": "systems/#system-general-cargo",
        "text": "理解货票、批次、重量与库存关系；连续散料系统可能另设专用模块。"
      },
      {
        "label": "设备维护",
        "path": "systems/#system-maintenance",
        "text": "追踪输送、装卸及环境设施的可用状态。"
      }
    ],
    "riskIds": [
      "atmosphere",
      "environment",
      "stack",
      "weather",
      "equipment"
    ],
    "links": [
      {
        "label": "铁矿石业务",
        "path": "cargo/iron-ore/"
      },
      {
        "label": "进口铁矿石从卸船到交付",
        "path": "scenarios/iron-ore-import/"
      },
      {
        "label": "铝土矿业务",
        "path": "cargo/bauxite/"
      },
      {
        "label": "铜精矿业务",
        "path": "cargo/copper-concentrate/"
      },
      {
        "label": "镍矿业务",
        "path": "cargo/nickel-ore/"
      },
      {
        "label": "煤炭业务",
        "path": "cargo/coal/"
      },
      {
        "label": "磷矿石业务",
        "path": "cargo/phosphate-rock/"
      },
      {
        "label": "砂石骨料业务",
        "path": "cargo/aggregates/"
      },
      {
        "label": "矿产散货总览",
        "path": "cargo/minerals/"
      },
      {
        "label": "设备图鉴",
        "path": "equipment/"
      },
      {
        "label": "环境风险",
        "path": "risks/environment/"
      }
    ],
    "sources": [
      "imo-vessel-imsbc",
      "imo-vessel-blu",
      "mol-dry-bulk-ships",
      "imo-ship-identity",
      "imo-vessel-window"
    ],
    "limits": "不根据矿种名称直接判断IMSBC组别或适装性，不给出含水率限值、装卸顺序、速率及压载方法；实际船货港匹配须由责任主体核验。"
  },
  {
    "id": "multipurpose",
    "name": "多用途船",
    "english": "Multipurpose vessel (MPP)",
    "group": "unitized",
    "summary": "以灵活的货舱和装卸配置承接多种件杂货，也可能参与项目货运输。它的价值在于组合不同货票，而非保证什么货都能装。",
    "visual": "/illustrations/vessels/multipurpose.svg",
    "cargo": [
      "经审核的木材与林纸产品",
      "钢卷、钢材及包装设备",
      "与船舶配置匹配的项目货或集装箱"
    ],
    "method": "常见以船吊或岸吊吊装，货物按件、捆、卷或托盘交接；部分船有可调整二层甲板或侧装设备，均须查实际船舶资料。",
    "portFit": "操作部协调多类吊具、理货与库场，工程部核验岸侧设备可用性，业务部门管理不同货票的时序；船方安排货舱、甲板及货物相容性审核。",
    "identity": "船舶身份和挂靠编号之下关联货票、件号／卷号、批次及舱位；同船多票、同票分批到货要分别保留交接记录。",
    "distinctions": [
      {
        "title": "多用途不等于无限用途",
        "text": "能组合货种并不等于能装任意重件、危险品或冷藏货，必须核查货舱、设备及适用文件。"
      },
      {
        "title": "与重吊船可以重叠",
        "text": "部分多用途船具备重吊能力；多用途描述经营与布置灵活性，重吊描述专用装卸能力。"
      },
      {
        "title": "同舱不代表同要求",
        "text": "木材、纸浆、钢材对舱况、污染和水湿的关注不同；船方与货方须确认组合是否合适。"
      },
      {
        "title": "配置只对具体船有效",
        "text": "可移动二层甲板、除湿或侧装系统来自具体船队实例，不能据此推定所有多用途船都有这些设备。"
      }
    ],
    "stages": [
      {
        "title": "收集货票与件型",
        "actor": "货主／货代、船公司、码头业务",
        "action": "对齐每票货的包装、标识及货物特性，提出混装与装卸需求。",
        "record": "货票清单、件型资料、初步承运意见"
      },
      {
        "title": "到港与舱位策划",
        "actor": "船代、船方、船舶计划、库场",
        "action": "协调到港事项，按各票到货和目的港安排船岸资源。",
        "record": "挂靠计划、舱位方案版本、库场准备记录"
      },
      {
        "title": "舱况与交接确认",
        "actor": "船方、理货、操作部、货方代表",
        "action": "核对货舱条件、件号、外观和作业方案，明确已有货损。",
        "record": "舱况检查、收货理货及外观记录"
      },
      {
        "title": "分票装卸",
        "actor": "班组、理货、中控、船方",
        "action": "将每件实绩关联货票与舱位，处理混批、短少和方案变更。",
        "record": "件数／重量实绩、舱位变化、异常记录"
      },
      {
        "title": "分票结清与离港",
        "actor": "船方、码头业务、货代、船代",
        "action": "分别结清每票货的完成量与遗留问题，交接最终资料。",
        "record": "分票完工记录、差异说明、离港相关回执"
      }
    ],
    "checks": [
      "每票货的件号、包装和重量资料能否追溯",
      "船吊、岸吊及舱口条件是否与任务相符",
      "舱况、前载残留和货物之间的影响是否审核",
      "可调甲板或侧装设备是否确属本船配置",
      "同票分批、混装及外观异常是否分开记录"
    ],
    "systemLinks": [
      {
        "label": "件杂货生产系统",
        "path": "systems/#system-general-cargo",
        "text": "按货票、件号、重量和库场管理多票交接。"
      },
      {
        "label": "船舶与泊位计划",
        "path": "systems/#system-vessel-planning",
        "text": "把各票到货与船方舱位安排接起来。"
      },
      {
        "label": "费用与结算",
        "path": "systems/#system-finance",
        "text": "分开记录不同货票及附加作业的计费依据。"
      }
    ],
    "riskIds": [
      "lifting",
      "stack",
      "identity",
      "commercial"
    ],
    "links": [
      {
        "label": "木材业务",
        "path": "cargo/timber/"
      },
      {
        "label": "卷钢业务",
        "path": "cargo/steel-coil/"
      },
      {
        "label": "项目货业务",
        "path": "cargo/project-cargo/"
      }
    ],
    "sources": [
      "spliethoff-multipurpose",
      "spliethoff-forest-ships",
      "spliethoff-metal-ships",
      "imo-vessel-css",
      "imo-ship-identity",
      "imo-vessel-window"
    ],
    "limits": "企业配置仅作多用途能力的例子；不提供混装、吊装、支承或系固参数，不以多用途名称代替逐票适装审核。"
  },
  {
    "id": "roro",
    "name": "滚装货船",
    "english": "Roll-on/roll-off cargo ship (RoRo)",
    "group": "unitized",
    "summary": "货物通过跳板滚进、滚出船舶，不要求货物本身一定会行驶。车辆之外，设备和件杂货也可在经审核的轮式载具上完成滚装。",
    "visual": "/illustrations/vessels/roro.svg",
    "cargo": [
      "自行驶车辆与工程机械",
      "挂车及滚装载具承载的件杂货",
      "经专项审核的非自驱设备"
    ],
    "method": "车辆自行驶或由码头牵引车牵引挂车、滚装平台通过船岸跳板。非自驱货物须先与合适载具匹配，再按船岸确认的方案交接，不能把“能推上去”当作适装结论。",
    "portFit": "重点是船岸跳板接口、候装车道、转弯与会车空间及人员隔离。中控组织车流，操作部管理驾驶／牵引班组，工程部确认岸侧设施，船方控制船上通道与接收条件。",
    "identity": "关联IMO编号、船公司航次与挂靠，再分别记录车架号／设备编号、载具号和货票；载具只是承载工具，载具号不能替代货物身份。",
    "distinctions": [
      {
        "title": "滚装不只运汽车",
        "text": "RoRo说的是装卸方式；工程机械、挂车以及用轮式载具承载的件杂货也属于可讨论的业务。"
      },
      {
        "title": "自驱与非自驱分开",
        "text": "能自行驶的车辆和需要牵引的载具涉及不同班组、交接点与异常处置，任务单应明确。"
      },
      {
        "title": "滚装方式可以重叠",
        "text": "PCTC及RoPax也采用滚装，某些项目运输船还兼具滚装能力；此档案聚焦货运滚装逻辑。"
      },
      {
        "title": "上下船不等于完成运输准备",
        "text": "通过跳板后仍需船方确认积载与系固等条件；陆侧装载许可也不能证明已适合海运。"
      }
    ],
    "stages": [
      {
        "title": "货物与载具匹配",
        "actor": "货主／货代、承运人、码头业务",
        "action": "识别自驱或非自驱需求，提交货物资料并审核载具和船舶条件。",
        "record": "货票、货物与载具对应表、审核意见"
      },
      {
        "title": "到港与候装组织",
        "actor": "船代、船舶计划、中控、闸口",
        "action": "协调到港事项并按航次组织车流，核对预约、货物及载具身份。",
        "record": "挂靠计划、进场交接、候装车道任务"
      },
      {
        "title": "船岸通道确认",
        "actor": "船方、操作部、安全与工程岗位",
        "action": "共同确认本次接口、通信、交通组织及人员隔离条件。",
        "record": "船岸确认、设施状态及作业版本"
      },
      {
        "title": "滚装与逐件交接",
        "actor": "驾驶／牵引班组、船方、理货",
        "action": "按任务交接车辆或载具，记录上船／下船位置及外观异常。",
        "record": "货物和载具移动实绩、外观及异常记录"
      },
      {
        "title": "数量对清与离港",
        "actor": "船方、理货、码头业务、船代",
        "action": "对清货物与载具数量及未完成任务，交接完工资料并衔接离港。",
        "record": "最终清单、载具交接、遗留事项及离泊记录"
      }
    ],
    "checks": [
      "货物身份与载具身份是否分别核验",
      "自驱状态、牵引需求和货物资料是否一致",
      "实际跳板、甲板和通道条件是否经审核匹配",
      "人车隔离、候装车道与通信安排是否明确",
      "未上船、错航次及货损记录是否能回溯至具体货物"
    ],
    "systemLinks": [
      {
        "label": "件杂货生产系统",
        "path": "systems/#system-general-cargo",
        "text": "记录车辆、设备、货票与载具的关联。"
      },
      {
        "label": "闸口系统",
        "path": "systems/#system-gate",
        "text": "核对进场车辆、司机、货物及预约任务。"
      },
      {
        "label": "船舶与泊位计划",
        "path": "systems/#system-vessel-planning",
        "text": "协调跳板泊位与候装、牵引资源。"
      }
    ],
    "riskIds": [
      "traffic",
      "identity",
      "fire",
      "waterside"
    ],
    "links": [
      {
        "label": "新能源汽车业务",
        "path": "cargo/ev/"
      },
      {
        "label": "项目货业务",
        "path": "cargo/project-cargo/"
      },
      {
        "label": "闸口交接",
        "path": "gate/"
      }
    ],
    "sources": [
      "ww-roro-cargo",
      "stena-roro-ropax",
      "imo-vessel-css",
      "imo-ship-identity",
      "imo-vessel-window"
    ],
    "limits": "滚装不是任意货物的通用许可；具体货物、载具、船岸接口和承运条件逐项审核，不提供跳板、牵引、系固或危险货物作业参数。"
  },
  {
    "id": "pctc",
    "name": "汽车与卡车运输船",
    "english": "Pure Car and Truck Carrier (PCTC)",
    "group": "unitized",
    "summary": "以整车和可自行驶车辆运输为重点的专用滚装船，常见多层车辆甲板。港口把每辆车作为可追踪的交接对象，同时组织批量运输。",
    "visual": "/illustrations/vessels/pctc.svg",
    "cargo": [
      "乘用车与商用车",
      "与实际甲板条件匹配的卡车、客车和工程车辆",
      "经承运审核的新能源汽车"
    ],
    "method": "由经安排的驾驶人员通过船岸跳板将车辆驶入或驶出，再在指定区域交接。部分船具有可调整高度的甲板，实际可用布置由本船资料与方案确认。",
    "portFit": "需要车辆集结场、交接检查区和分区车流组织。操作部协调驾驶队，理货核对车辆身份和外观，工程部维护岸侧设施；新能源汽车异常由承运、码头及安全岗位按要求协同审核。",
    "identity": "船舶IMO编号、航次与本港挂靠关联车辆装运批次，并以VIN／车架号追踪单车；车型、颜色或停车位置不能代替唯一车辆标识。",
    "distinctions": [
      {
        "title": "PCTC与PCC的叫法",
        "text": "PCTC强调汽车及卡车等车辆运输，PCC为汽车运输船常见称谓；不能仅凭缩写判断某层甲板能装什么车。"
      },
      {
        "title": "PCTC不是客滚船",
        "text": "车辆作为货物交接，与RoPax兼有旅客运输设施和流程不同；一辆客车作为货物运输不等于经营客运。"
      },
      {
        "title": "可调甲板并非任意调整",
        "text": "部分船以可调甲板适应不同车辆，配置与使用条件属于具体船舶资料，不是所有车辆都可直接混装。"
      },
      {
        "title": "新能源身份要单独说明",
        "text": "动力类型、车辆状态及承运申报影响业务审核；车辆能行驶或外观完好不能替代相应安全审核。"
      }
    ],
    "stages": [
      {
        "title": "车辆批次与承运审核",
        "actor": "制造商／货主、货代、船公司",
        "action": "提交车辆清单、动力类型及必要状态资料，确认本批次承运条件。",
        "record": "VIN清单、车辆资料、承运审核记录"
      },
      {
        "title": "到港与车辆集结",
        "actor": "船代、船舶计划、闸口、车辆库场",
        "action": "协调船期，将车辆按航次、批次和作业任务接入候装区域。",
        "record": "挂靠计划、进场记录、停车位置台账"
      },
      {
        "title": "装卸前单车交接",
        "actor": "理货、驾驶队、船方、货方代表",
        "action": "核对单车身份、状态和既有外观损伤，异常车转交责任岗位复核。",
        "record": "单车交接、损伤记录、异常审核结果"
      },
      {
        "title": "分区滚装与船上接收",
        "actor": "操作部／中控、驾驶队、船方",
        "action": "按已确认任务组织车流，逐车记录上下船并由船方接收。",
        "record": "VIN装卸实绩、船上分区记录、任务变更"
      },
      {
        "title": "车辆清单结清与离港",
        "actor": "船方、船公司代理、理货、码头业务",
        "action": "核对实装实卸与未完成车辆，交接差异和最终运输资料。",
        "record": "最终VIN清单、未装原因、货损交接及离泊记录"
      }
    ],
    "checks": [
      "VIN与订舱、车辆批次及本航次是否对应",
      "动力类型及车辆状态资料是否完整一致",
      "损伤、故障或其他异常车辆是否完成独立审核",
      "车道、船岸接口和实际甲板条件是否与车型匹配",
      "单车交接、车流实绩和最终车辆清单是否一致"
    ],
    "systemLinks": [
      {
        "label": "车辆货票与库存",
        "path": "systems/#system-general-cargo",
        "text": "把VIN、货票、停车位置与装卸实绩关联；车辆码头可有专用模块。"
      },
      {
        "label": "闸口系统",
        "path": "systems/#system-gate",
        "text": "记录载运车辆进出场及单车交接。"
      },
      {
        "label": "船公司业务",
        "path": "systems/#system-carrier",
        "text": "承接订舱、车辆清单与承运条件。"
      }
    ],
    "riskIds": [
      "traffic",
      "fire",
      "identity",
      "commercial"
    ],
    "links": [
      {
        "label": "新能源汽车业务",
        "path": "cargo/ev/"
      },
      {
        "label": "交通风险",
        "path": "risks/traffic/"
      },
      {
        "label": "部门协作",
        "path": "roles/"
      }
    ],
    "sources": [
      "mol-product-ships",
      "stena-roro-ropax",
      "imo-vessel-css",
      "imo-ship-identity",
      "imo-vessel-window"
    ],
    "limits": "本档案解释车辆运输组织，不给出新能源汽车危险货物分类结论、车间距、甲板承载、系固或现场应急方法；非自驱货物能否承运另核具体船舶和载具。"
  },
  {
    "id": "ropax",
    "name": "客滚船",
    "english": "Roll-on/roll-off passenger ship (RoPax)",
    "group": "unitized",
    "summary": "同时组织旅客与滚装车辆运输的船舶。码头需要把“人是否已登船”和“车货是否已交接”接到同一次航次，又保持不同流程清晰。",
    "visual": "/illustrations/vessels/ropax.svg",
    "cargo": [
      "随行旅客车辆",
      "航线接受的货车、挂车及其货物",
      "经航线和船舶条件审核的其他滚装单元"
    ],
    "method": "车辆或挂车通过跳板滚装，旅客经相应登离船设施通行。旅客与车辆如何分流、驾驶员何时交接由具体航线及码头组织，不能套用同一方式。",
    "portFit": "除滚装泊位与车辆候检区域，还需旅客服务、安全检查及无障碍等配套。客运岗位管理旅客流程，操作部组织车货，船方接收人车数据；跨境与国内航线的监管接口不同。",
    "identity": "船舶IMO编号及本次航次／挂靠关联客票、旅客名单、车辆预约和货运单据；一车多人、驾驶员与货车以及无人随行挂车须正确对应。",
    "distinctions": [
      {
        "title": "客运增加一条独立流程",
        "text": "车辆装完不意味着人员核对完成；旅客服务、登离船记录与船上接收同样影响本次航次。"
      },
      {
        "title": "不是运客车的PCTC",
        "text": "RoPax服务实际旅客及滚装运输；PCTC中的“客车”通常指作为货物的车辆。"
      },
      {
        "title": "随车与无人随行不同",
        "text": "司机随车运输和挂车无人随行可能采用不同交接安排，需查具体航线服务及规则。"
      },
      {
        "title": "客货系统职责不同",
        "text": "货物生产台账不能替代票务、旅客名单和登船核对；港口经营人也不代行主管机关的查验决定。"
      }
    ],
    "stages": [
      {
        "title": "航次与客货预订",
        "actor": "航运公司、客运业务、货代／运输企业",
        "action": "分别收集旅客、车辆及货物信息，明确随行关系和运输条件。",
        "record": "航次预订、旅客名单版本、车辆／货物预约"
      },
      {
        "title": "到港与客货分流",
        "actor": "船代、客运站、闸口、操作部",
        "action": "衔接到港事项、旅客通道与车货区域，按航线要求组织核验。",
        "record": "挂靠计划、客货核验、候船候装记录"
      },
      {
        "title": "登船与车辆交接",
        "actor": "客运岗位、驾驶／牵引班组、船方",
        "action": "按组织安排登船和滚装，核对旅客、车辆及司机的对应关系。",
        "record": "登船记录、车辆实绩、人数及名单差异"
      },
      {
        "title": "航前共同核对",
        "actor": "船方、客运负责人、操作部、船代",
        "action": "对齐最终人员与车辆记录，处理未登船、退运或信息不符情况。",
        "record": "最终人员及车辆资料、差异处理、离港相关回执"
      },
      {
        "title": "目的港离船与交付",
        "actor": "船方、到达港客运站、操作部、运输企业",
        "action": "分别完成旅客离船与车辆／挂车交接，保留未交付和异常记录。",
        "record": "离船记录、车辆提离交接、异常闭环"
      }
    ],
    "checks": [
      "旅客、司机、车辆与预约航次是否对应",
      "随行关系、无人随行挂车及货物申报是否明确",
      "旅客通道、车行通道与特殊服务准备是否落实",
      "人员数据与车辆货物数据是否分别核对",
      "最终名单差异、未登船或未交付对象是否已处理"
    ],
    "systemLinks": [
      {
        "label": "船舶与泊位计划",
        "path": "systems/#system-vessel-planning",
        "text": "协调航次与客货设施窗口；不代替客票系统。"
      },
      {
        "label": "闸口与车辆交接",
        "path": "systems/#system-gate",
        "text": "核对车辆／挂车任务；旅客登离船另由客运系统记录。"
      },
      {
        "label": "口岸信息交换",
        "path": "systems/#system-single-window",
        "text": "按航线及当地要求提交适用申报，不等于完成客货登船。"
      }
    ],
    "riskIds": [
      "traffic",
      "fire",
      "identity",
      "continuity",
      "waterside"
    ],
    "links": [
      {
        "label": "闸口业务",
        "path": "gate/"
      },
      {
        "label": "岗位与职责",
        "path": "roles/"
      },
      {
        "label": "人员车辆交通风险",
        "path": "risks/traffic/"
      }
    ],
    "sources": [
      "stena-roro-ropax",
      "gothenburg-ropax",
      "imo-ship-identity",
      "imo-vessel-window"
    ],
    "limits": "以客滚用途及官方港口实例解释客货并行，不给出乘客数量界线或法定客船定义；国内、国际及不同航线的证件和检查流程须按适用要求核验。"
  },
  {
    "id": "heavy-lift",
    "name": "重吊运输船",
    "english": "Heavy-lift cargo vessel",
    "group": "special",
    "summary": "以装卸重大件能力为特点的货船，常用自带重型吊机服务项目货。关键不仅是把货物吊上船，还包括船岸共同确认支承、积载与运输方案。",
    "visual": "/illustrations/vessels/heavy-lift.svg",
    "cargo": [
      "经工程审核的风电部件和风叶",
      "大型设备、模块与工程构件",
      "与具体船舶匹配的港机或浮式设备"
    ],
    "method": "依据专门工程方案使用船吊或适用岸侧设备吊装；具备其他装卸能力的船也可能采用滚装。具体吊具、支承、装卸方式及船岸接口由专业人员审核。",
    "portFit": "码头需提供适当作业场地、集货路线与岸侧设施。项目工程师把货物资料转成方案，操作部安排班组与封控，中控协调窗口，工程部核实岸侧设备，船方确认船上条件。",
    "identity": "IMO编号、航次和挂靠之外，必须把项目号、单件设备编号、图纸与方案版本对应；相似外形或同一项目名称不能替代具体货件识别。",
    "distinctions": [
      {
        "title": "重吊描述装卸能力",
        "text": "多用途船也可能是重吊船；不能把两者当作完全互斥的船型。"
      },
      {
        "title": "有吊机不等于能吊本件",
        "text": "适装涉及货物资料、吊装条件、船舶与岸侧接口等整体审核，不能只比较名义起重能力。"
      },
      {
        "title": "与半潜运输不同",
        "text": "重吊通常以起重设备转移货件，半潜运输可通过浮进浮出交接浮体；两者不是同一工艺。"
      },
      {
        "title": "完吊不等于可开航",
        "text": "货件上船后仍涉及船上支承、系固及航行状态确认，项目完工证据应覆盖船岸交接。"
      }
    ],
    "stages": [
      {
        "title": "项目技术询舱",
        "actor": "货主、承运人、项目工程人员",
        "action": "提交货件身份、图纸和运输需求，审核可行的船舶及装卸方式。",
        "record": "项目货件清单、技术资料与可行性意见"
      },
      {
        "title": "到港与岸侧资源核对",
        "actor": "船代、船舶计划、操作部、工程部",
        "action": "协调到港事项和项目窗口，核对作业区、路线及岸侧设施。",
        "record": "挂靠计划、资源确认、场地检查记录"
      },
      {
        "title": "方案版本与作业条件交接",
        "actor": "船方、项目工程人员、码头负责人",
        "action": "对齐货件资料、工程方案、职责及异常联络；变更重新审核。",
        "record": "方案版本、船岸确认及变更记录"
      },
      {
        "title": "装卸与位置接收",
        "actor": "船方、专业班组、理货、项目代表",
        "action": "按已审核方案交接货件，记录实际位置、外观及与计划的差异。",
        "record": "单件交接、位置实绩、检查及异常记录"
      },
      {
        "title": "运输准备与离港",
        "actor": "船方、项目负责人、船代、码头业务",
        "action": "完成约定的检查与文件交接，结清项目作业并衔接适用离港事项。",
        "record": "完工资料、运输准备确认、费用依据及离泊记录"
      }
    ],
    "checks": [
      "货件编号、图纸与现物是否对应",
      "船舶实际设备和岸侧条件是否经过整体审核",
      "工程方案是否为双方确认的有效版本",
      "吊装完成后的支承与运输准备责任是否明确",
      "变更、外观异常和未完成项是否已记录交接"
    ],
    "systemLinks": [
      {
        "label": "件杂货与项目货台账",
        "path": "systems/#system-general-cargo",
        "text": "连接项目号、单件身份和交接实绩。"
      },
      {
        "label": "船舶与泊位计划",
        "path": "systems/#system-vessel-planning",
        "text": "预留项目窗口并协调船岸资源。"
      },
      {
        "label": "工程维护",
        "path": "systems/#system-maintenance",
        "text": "记录岸侧设备可用性；不能替代项目工程审核。"
      }
    ],
    "riskIds": [
      "lifting",
      "equipment",
      "weather",
      "commercial"
    ],
    "links": [
      {
        "label": "风叶业务",
        "path": "cargo/wind-blade/"
      },
      {
        "label": "项目货业务",
        "path": "cargo/project-cargo/"
      },
      {
        "label": "吊装风险",
        "path": "risks/lifting/"
      }
    ],
    "sources": [
      "biglift-heavy-ships",
      "biglift-engineering",
      "imo-vessel-css",
      "imo-ship-identity",
      "imo-vessel-window"
    ],
    "limits": "公司船队仅证明重吊及复合能力的存在，不提供起重、吊点、系固、承载或天气参数；具体项目须由合格人员按实际船货港条件评估。"
  },
  {
    "id": "semi-submersible",
    "name": "半潜式重型运输船",
    "english": "Semi-submersible heavy transport vessel",
    "group": "special",
    "summary": "可使承载甲板下沉到水面以下，让适合的浮式货物浮入或浮出，再以甲板承载状态运输。它把“浮着交接”和“由船承载运输”接成一个工程项目。",
    "visual": "/illustrations/vessels/semi-submersible.svg",
    "cargo": [
      "经项目审核的浮式生产设施和海工结构",
      "可按方案浮装的船舶或大型浮体",
      "与特定船舶能力匹配的重大件"
    ],
    "method": "典型项目采用浮装／浮卸：承载甲板受控下沉，浮式货物交接到指定位置，再转为承载运输状态。拖轮、工程团队及船方协同，本文仅解释原理，不给出操船或压载步骤。",
    "portFit": "可能使用经批准的港池、锚地或专门水域，而非普通靠泊装卸。需要适配的水域条件、拖轮与项目支持，船代协调主管机关要求，港口生产调度配合水陆资源。",
    "identity": "以运输船IMO编号、航次及项目访问记录识别承运船；被运船／浮体另保留自身身份与项目号，不能把运输船和货物浮体混为同一对象。",
    "distinctions": [
      {
        "title": "半潜能力不等于重吊能力",
        "text": "浮装依赖船舶下潜与浮体交接条件，不表示本船自带可吊装该货物的吊机。"
      },
      {
        "title": "运输船不同于半潜平台",
        "text": "“半潜”也可描述钻井或生产平台结构；这里指承担运输的船，不把被运平台当运输船。"
      },
      {
        "title": "水域也是作业接口",
        "text": "项目可能在锚地或专门水域完成，港口需要协调水域与辅助船，并非只分配一个岸边泊位。"
      },
      {
        "title": "并非任意货物都能浮装",
        "text": "货物浮性、结构、支承及船舶匹配须专业审核；不能把普通不具浮性的货件直接理解为可浮入。"
      }
    ],
    "stages": [
      {
        "title": "运输对象与可行性审查",
        "actor": "货主、承运人、项目工程团队",
        "action": "区分承运船与货物浮体，评估装卸方式、运输支承及项目条件。",
        "record": "双对象身份、项目资料、可行性文件"
      },
      {
        "title": "到达与水域协调",
        "actor": "船代、相关主管机关、港口调度、拖轮服务方",
        "action": "按项目协调到达事项、作业水域及支持资源，确认可用窗口。",
        "record": "到达与水域相关文件、资源及窗口记录"
      },
      {
        "title": "浮装准备交接",
        "actor": "船方、工程团队、货物代表、辅助船负责人",
        "action": "确认方案版本、责任分工、通信及货物接收条件。",
        "record": "项目确认、通信与就绪记录"
      },
      {
        "title": "浮装或浮卸交接",
        "actor": "船方、专业团队、辅助船、货物代表",
        "action": "按批准或认可的适用方案执行交接，记录货物位置及状态变化。",
        "record": "浮体交接、位置确认、检查与异常记录"
      },
      {
        "title": "运输状态确认与离场",
        "actor": "船方、项目负责人、船代",
        "action": "完成适用的运输准备和文件交接，协调离场与后续航程。",
        "record": "运输准备资料、交接证明、离场及遗留事项记录"
      }
    ],
    "checks": [
      "承运船与被运浮体身份是否分别登记",
      "项目水域及支持船条件是否完成核验",
      "浮装、承载运输与浮卸是否有相互衔接的方案",
      "货物支承、结构与运输状态是否经专业审核",
      "项目变更、窗口和通信安排是否由相关方共同确认"
    ],
    "systemLinks": [
      {
        "label": "船舶与资源计划",
        "path": "systems/#system-vessel-planning",
        "text": "记录到达窗口及辅助资源，水域作业可能需要专用项目模块。"
      },
      {
        "label": "口岸与船舶信息交换",
        "path": "systems/#system-single-window",
        "text": "处理适用到离港申报；不代表已取得所有水域作业许可。"
      },
      {
        "label": "项目交接台账",
        "path": "systems/#system-general-cargo",
        "text": "追踪运输对象、项目资料和交接记录。"
      }
    ],
    "riskIds": [
      "waterside",
      "weather",
      "environment",
      "equipment"
    ],
    "links": [
      {
        "label": "项目货业务",
        "path": "cargo/project-cargo/"
      },
      {
        "label": "临水作业风险",
        "path": "risks/waterside/"
      },
      {
        "label": "部门协同",
        "path": "roles/"
      }
    ],
    "sources": [
      "boskalis-semi-ships",
      "boskalis-float-case",
      "biglift-engineering",
      "imo-ship-identity",
      "imo-vessel-window"
    ],
    "limits": "浮装原理及项目协作来自运营商案例，不提供下潜、压载、拖带、系固或天气限值；案例中的许可及实施安排不能直接套用于其他水域。"
  },
  {
    "id": "deck-carrier",
    "name": "甲板运输船",
    "english": "Deck cargo carrier / module carrier",
    "group": "special",
    "summary": "以开阔甲板承载大型模块或构件的运输船。货物如何上船、如何在甲板支承以及如何航行，是三个分别需要确认的问题。",
    "visual": "/illustrations/vessels/deck-carrier.svg",
    "cargo": [
      "工程模块、导管架等大型结构",
      "港口起重机等项目设备",
      "经审核适合甲板运输的风电或工业构件"
    ],
    "method": "按船型及项目可采用滚装或吊装交接，特定模块运输船可与岸侧运输设备衔接。甲板开阔本身不说明船上有吊机，也不说明可以半潜浮装。",
    "portFit": "岸侧重点是集货区、运输路线、船岸接口和设施承载条件的工程核验。码头操作部协调项目通道，工程与项目团队核对岸侧条件，船方确认甲板布置及运输准备。",
    "identity": "承运船IMO编号、航次与挂靠关联模块编号、支承布置及方案版本；项目可能由多个模块分批完成，必须逐件追踪。",
    "distinctions": [
      {
        "title": "甲板运输描述承载位置",
        "text": "它强调以甲板承载货物，不等同于一个统一的装卸工艺或证书类别。"
      },
      {
        "title": "不自动具备半潜能力",
        "text": "半潜重型运输船也有承载甲板，但普通甲板运输船不能因此被推定可以浮进浮出。"
      },
      {
        "title": "不自动具备重吊能力",
        "text": "有些甲板运输依赖岸侧装卸设备；与自带重型吊机的重吊船须分别核对。"
      },
      {
        "title": "甲板驳与运输船有交集",
        "text": "甲板驳也能承担某些项目运输，推进方式与适航范围应查实际资料，而非只看平甲板外观。"
      }
    ],
    "stages": [
      {
        "title": "模块与运输方式审核",
        "actor": "货主、承运人、项目工程团队",
        "action": "提交模块和接口资料，确认以何种方式登船及运输。",
        "record": "模块清单、接口资料、可行性意见"
      },
      {
        "title": "到港与岸侧接口准备",
        "actor": "船代、船舶计划、工程部、操作部",
        "action": "协调到港窗口，核对集货路径、作业区和船岸接口条件。",
        "record": "挂靠安排、场地及设施确认"
      },
      {
        "title": "方案与模块接收",
        "actor": "船方、项目负责人、理货",
        "action": "对齐模块编号、支承布置与有效方案，确认外观及交接责任。",
        "record": "货件交接、方案版本、外观记录"
      },
      {
        "title": "装卸与甲板位置确认",
        "actor": "专业班组、船方、工程团队",
        "action": "按实际审核方式完成滚装或吊装并记录甲板位置及异常。",
        "record": "单件实绩、位置与支承检查、变更记录"
      },
      {
        "title": "运输准备与离港",
        "actor": "船方、项目团队、码头业务、船代",
        "action": "交接运输准备资料，对清完工范围并办理适用离港事项。",
        "record": "完工资料、遗留问题、商业结算依据及离泊记录"
      }
    ],
    "checks": [
      "实际装卸方式与船舶能力是否一致",
      "模块编号、方案和支承布置是否对应",
      "岸侧通道与船岸接口是否经工程核验",
      "甲板布置及货物暴露环境是否纳入审核",
      "岸侧完工和船方运输准备是否分别确认"
    ],
    "systemLinks": [
      {
        "label": "项目货生产台账",
        "path": "systems/#system-general-cargo",
        "text": "记录模块、货票、支承资料及交接。"
      },
      {
        "label": "船舶与泊位计划",
        "path": "systems/#system-vessel-planning",
        "text": "协调作业窗口与专用船岸接口。"
      },
      {
        "label": "设备与设施维护",
        "path": "systems/#system-maintenance",
        "text": "确认岸侧设施状态，工程适配仍需项目审核。"
      }
    ],
    "riskIds": [
      "lifting",
      "traffic",
      "weather",
      "waterside",
      "commercial"
    ],
    "links": [
      {
        "label": "项目货业务",
        "path": "cargo/project-cargo/"
      },
      {
        "label": "风叶业务",
        "path": "cargo/wind-blade/"
      },
      {
        "label": "设备图鉴",
        "path": "equipment/"
      }
    ],
    "sources": [
      "biglift-deck-carrier",
      "biglift-engineering",
      "damen-barges",
      "imo-vessel-css",
      "imo-ship-identity",
      "imo-vessel-window"
    ],
    "limits": "MC型等资料只支持特定模块运输实例，不推广其尺寸、承载或压载能力；本文不提供滚装、支承、系固及岸侧承载参数。"
  },
  {
    "id": "oil-tanker",
    "name": "油船",
    "english": "Oil tanker",
    "group": "liquid",
    "summary": "以货舱和管路散装运输原油或成品油的船舶。港口作业重点是船舱、岸罐、输送系统及计量记录之间的一致对应。",
    "visual": "/illustrations/vessels/oil-tanker.svg",
    "cargo": [
      "经适装审核的原油",
      "符合具体船舶与码头条件的成品油"
    ],
    "method": "利用货泵、管路以及适用的船岸输送臂或软管交接液体，方向取决于装船或卸船。按双方确认的方案组织输送，计量与货物品质交接分别记录。",
    "portFit": "需要匹配的液货泊位、岸罐及输送设施。液货操作岗位与船方对齐货路和通信，计量岗位管理数量证据，工程部维护设备，安全环保岗位关注泄漏与防污染条件。",
    "identity": "以IMO编号及本次航次／挂靠识别运输，再关联油品名称、货物批次、船舱、岸罐和交接点；同一船或同一管线不代表同一批油。",
    "distinctions": [
      {
        "title": "原油与成品油业务不同",
        "text": "原油、炼制后的不同油品在品质及污染控制上有不同关注点，不能仅凭“油船”名称安排换货。"
      },
      {
        "title": "液货船不都属于油船",
        "text": "化学品及液化气有不同货物体系与船舶要求；可兼营哪些货物须看本船实际适装资料。"
      },
      {
        "title": "油罐箱不同于油船散装",
        "text": "液体装在罐式集装箱里走集装箱船，与直接进入油船货舱是两种业务组织方式。"
      },
      {
        "title": "数量差异不能直接判责",
        "text": "船岸计量的时点、方法与约定口径应保留，差异需依据原始证据核查。"
      }
    ],
    "stages": [
      {
        "title": "油品与设施预审",
        "actor": "货主、承运人、船方、液货码头业务",
        "action": "核对油品与批次，审核船舱、岸罐和输送条件。",
        "record": "油品资料、船岸适配及接收计划"
      },
      {
        "title": "到港与岸罐准备",
        "actor": "船代、泊位计划、罐区、中控",
        "action": "衔接到港事项，落实泊位、接收／发出罐与库存安排。",
        "record": "挂靠计划、岸罐任务、相关回执"
      },
      {
        "title": "船岸交接前确认",
        "actor": "船方、液货操作、计量、安全环保岗位",
        "action": "对齐货物、交接接口、通信、数量依据和异常联络。",
        "record": "双方确认记录、初始计量与适用货物记录"
      },
      {
        "title": "输送与过程记录",
        "actor": "船方、液货操作、罐区中控、工程部",
        "action": "按确认方案组织输送，记录进度、状态与异常，变更由责任方确认。",
        "record": "输送实绩、计量过程、设备及异常记录"
      },
      {
        "title": "完货与离港",
        "actor": "船方、计量、业务、船代",
        "action": "结清数量与品质文件，确认岸侧交接结束并衔接适用离港事项。",
        "record": "最终计量、差异说明、完货及离泊记录"
      }
    ],
    "checks": [
      "油品、批次、船舱和岸罐是否正确关联",
      "船岸输送接口及设施状态是否完成核验",
      "货物品质与前载影响是否纳入审核",
      "通信、异常报告和防污染职责是否明确",
      "船岸计量口径及最终差异是否留有依据"
    ],
    "systemLinks": [
      {
        "label": "液货泊位与船期",
        "path": "systems/#system-vessel-planning",
        "text": "协调靠泊及输送窗口。"
      },
      {
        "label": "数据交换与集成",
        "path": "systems/#system-data-exchange",
        "text": "关联罐区／液货业务系统和船岸记录；不能把件杂货系统当作液货控制系统。"
      },
      {
        "label": "设备维护",
        "path": "systems/#system-maintenance",
        "text": "追踪货泵、接口和岸侧设施可用性。"
      }
    ],
    "riskIds": [
      "fire",
      "environment",
      "atmosphere",
      "commercial"
    ],
    "links": [
      {
        "label": "环境风险",
        "path": "risks/environment/"
      },
      {
        "label": "火灾风险",
        "path": "risks/fire/"
      },
      {
        "label": "作业与单证",
        "path": "documents/"
      }
    ],
    "sources": [
      "mol-tanker-ships",
      "imo-vessel-oil",
      "imo-ship-identity",
      "imo-vessel-window"
    ],
    "limits": "仅解释散装油品与船岸交接，不提供流速、压力、阀门、清舱或排放操作；油污染框架介绍不构成排放许可或完整法规适用判断。"
  },
  {
    "id": "chemical-tanker",
    "name": "化学品船",
    "english": "Chemical tanker",
    "group": "liquid",
    "summary": "散装运输符合其适装条件的液体化学品。重点是“具体产品能否进入具体货舱及输送系统”，不能把化学品船理解为通用液体容器。",
    "visual": "/illustrations/vessels/chemical-tanker.svg",
    "cargo": [
      "经适装审核的液体化学品",
      "与本船货舱及系统相容的相关液体产品"
    ],
    "method": "通过经匹配的货舱、泵管及船岸接口输送；多票货涉及分舱、管路关联与污染控制。货舱材质、涂层和前载影响须纳入审核，不能只核对舱容。",
    "portFit": "码头需有对应产品的储存与输送条件。业务岗位确认产品资料，船方与液货操作核对舱罐及货路，工程部确认设备状态，安全环保岗位落实适用作业与环境要求。",
    "identity": "IMO编号与本次挂靠下，逐票记录准确产品名、适用识别信息、批次、船舱和岸罐；商业简称相近的产品不能合并为同一货物。",
    "distinctions": [
      {
        "title": "IBC不是集装箱名词",
        "text": "此处IBC Code指散装危险化学品船舶构造与设备规则，不是包装运输中的中型散装容器。"
      },
      {
        "title": "船型等级不等于通装许可",
        "text": "规则对不同产品危险性及船舶提出要求；化学品船型别不能代替该产品在该船的适装核验。"
      },
      {
        "title": "产品相容性影响交接",
        "text": "货物、舱材、涂层、前载残留和输送系统需要共同审核；“都是液体”不足以认定可互换。"
      },
      {
        "title": "与油船可能有认可交集",
        "text": "部分船具有经认可的油品／化学品运输能力，但每票仍按实际货物及适用规则处理。"
      }
    ],
    "stages": [
      {
        "title": "逐产品适装审核",
        "actor": "托运人、承运人、船方、码头业务",
        "action": "提交准确产品资料，核验船舶和岸侧接收范围及适用文件。",
        "record": "产品资料、适装审核、分票接收安排"
      },
      {
        "title": "到港与分舱分罐安排",
        "actor": "船代、船舶计划、罐区、液货操作",
        "action": "协调到港事项，将每票货关联对应船舱、岸罐及输送任务。",
        "record": "挂靠计划、舱罐对应与任务版本"
      },
      {
        "title": "相容与交接条件确认",
        "actor": "船方、液货操作、质量与安全环保岗位",
        "action": "核对货物身份、舱罐条件、前载影响及适用的取样计量安排。",
        "record": "双方确认、舱罐条件与质量交接记录"
      },
      {
        "title": "分票输送与异常管理",
        "actor": "船方、液货操作、中控、工程部",
        "action": "按已确认货路和任务组织交接，对变更或品质异常保留证据并反馈。",
        "record": "分票输送实绩、变更及异常记录"
      },
      {
        "title": "分票结清与离港",
        "actor": "船方、货方代表、计量、船代",
        "action": "分别结清数量、品质和遗留事项，衔接适用离港及后续处理要求。",
        "record": "分票完货资料、差异记录、离港相关回执"
      }
    ],
    "checks": [
      "准确产品名与适用识别资料是否一致",
      "该产品是否在实际船舶及码头可接收范围内",
      "舱材、涂层、前载及岸侧系统相容性是否审核",
      "多票货的船舱、岸罐和任务对应是否清楚",
      "质量证据、数量差异及残留物后续责任是否明确"
    ],
    "systemLinks": [
      {
        "label": "船舶与泊位计划",
        "path": "systems/#system-vessel-planning",
        "text": "按产品与船岸条件协调窗口。"
      },
      {
        "label": "接口与数据追溯",
        "path": "systems/#system-data-exchange",
        "text": "传递逐产品资料和分票实绩，保留版本及来源。"
      },
      {
        "label": "监管信息核验",
        "path": "systems/#system-customs",
        "text": "核对适用监管状态；不代替船舶与码头适装审核。"
      }
    ],
    "riskIds": [
      "fire",
      "atmosphere",
      "environment",
      "identity",
      "commercial"
    ],
    "links": [
      {
        "label": "包装危险货物：另一种运输形式",
        "path": "cargo/packaged-dangerous/"
      },
      {
        "label": "环境风险",
        "path": "risks/environment/"
      },
      {
        "label": "单证与交接",
        "path": "documents/"
      }
    ],
    "sources": [
      "imo-vessel-ibc",
      "mol-tanker-ships",
      "imo-ship-identity",
      "imo-vessel-window"
    ],
    "limits": "仅据IMO概述说明IBC／BCH相关框架，未逐项核验产品表或个船证书；不提供相容性结论、洗舱、隔离、输送或残留物处置参数。"
  },
  {
    "id": "lng-carrier",
    "name": "液化天然气船",
    "english": "Liquefied natural gas carrier (LNG carrier)",
    "group": "liquid",
    "summary": "将以甲烷为主的天然气液化后，以专门的货物围护和保温系统运输。船岸交接同时涉及液体货物、蒸发气管理与安全通信。",
    "visual": "/illustrations/vessels/lng-carrier.svg",
    "cargo": [
      "符合本船及接收设施条件的液化天然气"
    ],
    "method": "通过专门的船岸输送设施交接LNG，协调货物及相关气体处理系统；船岸连接、通信和紧急切断配合须按适用方案确认。本文只描述业务接口。",
    "portFit": "需匹配LNG接收或装运设施及其储存、输送和安全系统。接收站运行岗位、船方与船舶计划共同核对接口，工程部保障岸侧设备，船代协调到离港事项。",
    "identity": "以IMO编号、航次及本次挂靠识别船舶访问，再关联LNG货批、质量资料、船岸交接点与数量记录；不能只按接收站预约号判断是哪一批货。",
    "distinctions": [
      {
        "title": "LNG与LPG不是同一货物",
        "text": "LNG以甲烷为主，LPG常涉及丙烷、丁烷等；船舶货物系统及适装条件必须分别核验。"
      },
      {
        "title": "LNG船不只有球罐外形",
        "text": "运营商介绍有Moss球罐、薄膜及独立棱柱形等围护方案；外观不能直接判断本船全部能力。"
      },
      {
        "title": "蒸发气也影响运输组织",
        "text": "保温不能完全消除热量进入，蒸发气需按本船设计管理；不同船舶处理配置不能互相套用。"
      },
      {
        "title": "燃用LNG不等于运输LNG",
        "text": "一艘船以LNG作燃料，不表示具备承运LNG货物的船舶与系统条件。"
      }
    ],
    "stages": [
      {
        "title": "船站与货批预审",
        "actor": "承运人、船方、接收／装运站、货主",
        "action": "核对本船货物系统与站方接口、货批资料及接收安排。",
        "record": "船站兼容审核、货批资料、窗口申请"
      },
      {
        "title": "到港与站方准备",
        "actor": "船代、船舶计划、站方运行、工程部",
        "action": "衔接到港事项与泊位，确认岸侧储存、输送及设备准备。",
        "record": "挂靠计划、站方就绪记录、相关回执"
      },
      {
        "title": "船岸接口确认",
        "actor": "船方、站方运行、安全与计量岗位",
        "action": "对齐货物身份、通信、适用安全接口及数量质量交接安排。",
        "record": "船岸确认、接口检查、初始计量资料"
      },
      {
        "title": "货物交接与协同监测",
        "actor": "船方、站方运行中控、计量、工程部",
        "action": "按确认方案交接货物并关注液体与相关气体系统状态，变化及时联络。",
        "record": "交接实绩、系统状态、异常及质量记录"
      },
      {
        "title": "结清与离泊",
        "actor": "船方、站方、货方代表、船代",
        "action": "结清数量与质量资料，确认交接结束并衔接适用离港事项。",
        "record": "完货计量、差异说明、交接及离泊记录"
      }
    ],
    "checks": [
      "本船与站方的兼容审核是否针对本次条件",
      "货批与质量资料是否对应本航次",
      "货物围护、气体管理及岸侧系统配置是否明确",
      "通信与适用安全接口是否完成共同确认",
      "数量、质量及合同采用的计量口径是否清楚"
    ],
    "systemLinks": [
      {
        "label": "船舶与泊位计划",
        "path": "systems/#system-vessel-planning",
        "text": "协调船期和接收站作业窗口。"
      },
      {
        "label": "数据交换",
        "path": "systems/#system-data-exchange",
        "text": "衔接站方业务、计量与船舶资料；生产控制系统另行承担控制职责。"
      },
      {
        "label": "设备维护",
        "path": "systems/#system-maintenance",
        "text": "追踪岸侧设施状态和维护记录。"
      }
    ],
    "riskIds": [
      "fire",
      "atmosphere",
      "environment",
      "equipment",
      "continuity"
    ],
    "links": [
      {
        "label": "港口系统分工",
        "path": "systems/"
      },
      {
        "label": "设备设施",
        "path": "infrastructure/"
      },
      {
        "label": "火灾风险",
        "path": "risks/fire/"
      }
    ],
    "sources": [
      "mol-lng-ships",
      "imo-vessel-igc",
      "imo-ship-identity",
      "imo-vessel-window"
    ],
    "limits": "来源支持货物、围护型式和交接原理，不给出温度、压力、紧急切断设定或操作步骤；不将IGC概述页当作完整现行修正清单。"
  },
  {
    "id": "lpg-carrier",
    "name": "液化石油气船",
    "english": "Liquefied petroleum gas carrier (LPG carrier)",
    "group": "liquid",
    "summary": "以适配的货舱与货物系统运输丙烷、丁烷等液化石油气。压力式、半冷式和全冷式体现不同的货物系统配置，不能只看“气体船”名称安排货物。",
    "visual": "/illustrations/vessels/lpg-carrier.svg",
    "cargo": [
      "经适装审核的丙烷、丁烷等LPG产品",
      "仅限具体船舶认可范围内的其他液化气产品"
    ],
    "method": "经相匹配的船岸管路和输送设施交接液化气，船方与岸方协调货物及相关气体系统。实际货物和船舶的压力／制冷配置决定接口审核内容。",
    "portFit": "液化气泊位需匹配储罐、输送及适用气体处理条件。船方与站方运行共同核验货物系统，工程部管理岸侧设施，安全与计量岗位参与交接，中控不替代适装决定。",
    "identity": "IMO编号、航次和挂靠下关联具体产品名、组分／质量资料、货批、船舱及岸罐；不能用“LPG一船”掩盖不同产品或分舱批次。",
    "distinctions": [
      {
        "title": "压力与制冷配置不同",
        "text": "压力式、半冷式和全冷式是理解货物系统的常见维度，不是按船名便可确认的统一规格。"
      },
      {
        "title": "与LNG须分别审核",
        "text": "LPG与以甲烷为主的LNG有不同货物及系统条件，两者不能直接互换。"
      },
      {
        "title": "乙烯能力不是全船型通用",
        "text": "运营商有具乙烯运输能力的半冷式船舶实例；不能推定任一LPG船都能承运乙烯或其他气体。"
      },
      {
        "title": "不同产品需要逐票匹配",
        "text": "同属液化气仍需对具体产品、货舱、岸罐和输送系统进行审核，船型名不是适装证明。"
      }
    ],
    "stages": [
      {
        "title": "产品与船舶能力审核",
        "actor": "货主、承运人、船方、液化气码头",
        "action": "提交产品与质量资料，确认本船和岸侧可接受的货物及接口。",
        "record": "产品资料、适装与船岸匹配记录"
      },
      {
        "title": "到港及舱罐分配",
        "actor": "船代、船舶计划、站方运行",
        "action": "衔接到港事项与泊位，将产品批次关联船舱、岸罐和接收任务。",
        "record": "挂靠计划、舱罐对应、接收准备"
      },
      {
        "title": "系统与交接条件确认",
        "actor": "船方、站方运行、安全及计量岗位",
        "action": "确认实际货物系统、通信及数量质量交接条件，差异交专业人员核查。",
        "record": "船岸确认、系统条件及计量起点记录"
      },
      {
        "title": "分批输送与记录",
        "actor": "船方、岸方中控、计量、工程部",
        "action": "按确认方案组织交接，分清产品与批次，记录状态及变更。",
        "record": "分批实绩、系统状态、异常和变更记录"
      },
      {
        "title": "产品结清与离港",
        "actor": "船方、货方代表、码头业务、船代",
        "action": "按实际产品结清数量与质量文件，确认遗留事项和适用离港程序。",
        "record": "分产品完货资料、差异说明、离泊记录"
      }
    ],
    "checks": [
      "实际产品和质量资料是否明确",
      "本船是否具有该产品所需的认可能力",
      "压力／制冷等货物系统与岸方是否兼容",
      "船舱、岸罐、批次及任务是否正确对应",
      "气体相关接口、通信与异常责任是否共同确认"
    ],
    "systemLinks": [
      {
        "label": "液化气泊位计划",
        "path": "systems/#system-vessel-planning",
        "text": "将船期与岸方储运准备接起来。"
      },
      {
        "label": "数据交换与集成",
        "path": "systems/#system-data-exchange",
        "text": "按产品传递质量、计量和作业状态，保留数据来源。"
      },
      {
        "label": "设备维护",
        "path": "systems/#system-maintenance",
        "text": "记录货物接口及岸侧设施的可用状态。"
      }
    ],
    "riskIds": [
      "fire",
      "atmosphere",
      "environment",
      "identity",
      "equipment"
    ],
    "links": [
      {
        "label": "系统与职责边界",
        "path": "systems/"
      },
      {
        "label": "设备图鉴",
        "path": "equipment/"
      },
      {
        "label": "环境风险",
        "path": "risks/environment/"
      }
    ],
    "sources": [
      "mol-tanker-ships",
      "solvang-lpg-segments",
      "imo-vessel-igc",
      "imo-ship-identity",
      "imo-vessel-window"
    ],
    "limits": "运营商船型分段只作配置实例，不引用容积、压力或温度界线；其他气体能否承运须查个船认可资料，不提供现场输送或气体处理参数。"
  },
  {
    "id": "reefer-ship",
    "name": "专用冷藏船",
    "english": "Specialised refrigerated cargo ship (reefer ship)",
    "group": "special",
    "summary": "以温控货舱运输水果等易腐货物的专用货船，部分船还在甲板承运冷藏集装箱。业务核心是把货物批次、交接时间与温控证据连起来。",
    "visual": "/illustrations/vessels/reefer-ship.svg",
    "cargo": [
      "与船舶温控条件匹配的水果等易腐货物",
      "经审核的冷藏或冷冻食品",
      "本船配置允许的甲板冷藏集装箱"
    ],
    "method": "按本船设备与码头安排，以船吊或岸侧设备交接托盘及包装货物，再接入冷库和后续运输；若同时承运冷藏箱，还须单独安排箱吊装、供电及箱状态交接。",
    "portFit": "码头需衔接冷库、装卸窗口和温控运输。操作部减少交接等待，冷库岗位管理批次和库存，工程部保障岸侧制冷与供电，船方交接温控指令及监控记录。",
    "identity": "以IMO编号、航次及挂靠关联货票、批次、托盘标识与舱区；冷藏箱另以箱号记录。温控记录须明确属于哪个设备、舱区或货批以及哪段时间。",
    "distinctions": [
      {
        "title": "冷藏船不同于冷藏箱",
        "text": "前者有专用温控货舱，后者是独立运输单元；同一冷藏船可以同时出现舱内货和甲板冷藏箱。"
      },
      {
        "title": "温控不是一个统一数字",
        "text": "不同货物、批次及合同有不同条件，不能把一种水果的要求套到所有易腐货物。"
      },
      {
        "title": "设备运行不等于品质证明",
        "text": "温控状态与货物品质是不同证据；偏差发生时间、货物状态及交接责任都应记录。"
      },
      {
        "title": "冷链跨越船岸边界",
        "text": "船舶、码头冷库和后续车辆各承担一段交接，单靠船上系统无法证明全程连续。"
      }
    ],
    "stages": [
      {
        "title": "货批与温控需求确认",
        "actor": "货主、承运人、船方、冷库业务",
        "action": "对齐货物批次、包装及适用温控要求，确认本船与岸侧能否承接。",
        "record": "货批资料、温控指令版本、承运及接收安排"
      },
      {
        "title": "到港与冷链资源准备",
        "actor": "船代、船舶计划、冷库、工程部",
        "action": "衔接到港事项，安排库位、装卸窗口及适用供电设施。",
        "record": "挂靠计划、库位与资源准备记录"
      },
      {
        "title": "货物状态与指令交接",
        "actor": "船方、理货、冷库、货方代表",
        "action": "核对批次、外观与已有监控记录，确认温控指令和异常联络。",
        "record": "批次交接、状态证据、指令确认"
      },
      {
        "title": "装卸与库车衔接",
        "actor": "操作部、理货、冷库、运输企业",
        "action": "记录每批货的交接时间与去向；舱内货、冷藏箱和后续车辆分别留痕。",
        "record": "批次实绩、冷库／车辆交接、箱供电及异常记录"
      },
      {
        "title": "记录结清与离港",
        "actor": "船方、码头业务、货主代理、船代",
        "action": "交接最终数量和温控资料，明确偏差及后续责任并衔接离港。",
        "record": "最终清单、温控记录、偏差说明及离泊记录"
      }
    ],
    "checks": [
      "货批、托盘或箱号是否对应货票及本航次",
      "温控指令与记录的对象、版本和时间是否明确",
      "船舱／冷藏箱与冷库、车辆的接收条件是否匹配",
      "装卸窗口、供电及设备可用状态是否已确认",
      "外观异常、温控偏差及责任交接是否完整记录"
    ],
    "systemLinks": [
      {
        "label": "批次与冷库台账",
        "path": "systems/#system-general-cargo",
        "text": "追踪货票、托盘、库位与交接时间；冷链可设专用模块。"
      },
      {
        "label": "冷藏箱业务",
        "path": "systems/#system-container-tos",
        "text": "仅对实际使用的冷藏箱关联箱号及位置，不代替舱内散件台账。"
      },
      {
        "label": "设备维护",
        "path": "systems/#system-maintenance",
        "text": "连接岸侧制冷、供电与维护记录。"
      }
    ],
    "riskIds": [
      "equipment",
      "continuity",
      "identity",
      "commercial",
      "atmosphere"
    ],
    "links": [
      {
        "label": "冷链货物业务",
        "path": "cargo/cold-chain/"
      },
      {
        "label": "集装箱业务",
        "path": "containers/"
      },
      {
        "label": "业务连续性风险",
        "path": "risks/continuity/"
      }
    ],
    "sources": [
      "seatrade-reefer-fleet",
      "seatrade-cold-handoff",
      "cool-carriers-reefer",
      "imo-ship-identity",
      "imo-vessel-window"
    ],
    "limits": "专用冷藏船配置取自运营商实例，不推定每艘船兼有全部功能；不提供温度、通风或现场货物处置参数，不能以系统在线状态保证货物品质。"
  }
];

// 辅助船来源：拖轮与海工服务船见 mol-support-vessels；驳船见 damen-barges；疏浚船见 boskalis-dredging。
export const supportVessels = [
  {
    "id": "tug",
    "name": "拖轮",
    "text": "通过推、拉协助船舶靠离泊或拖带海上设施。船代协调拖轮服务，船方、引航及拖轮按各自职责沟通，码头同步泊位与系解缆准备。",
    "distinction": "提供操纵协助，不等于引航员所在的引航艇，也不代替主管机关决定船舶可否进出港。港作拖轮和远洋拖轮的任务与能力须分别核验。"
  },
  {
    "id": "barge",
    "name": "驳船",
    "text": "用于货物短驳、转运或工程承载；有甲板、液货、起重与转运等不同用途。港口把它的货物交接与拖带、靠泊安排分别记账。",
    "distinction": "驳船并非都无动力，也并非只能内河使用；推进方式、适航范围和承载能力看实际船舶资料。甲板驳可与甲板运输这一能力维度重叠。"
  },
  {
    "id": "dredger",
    "name": "疏浚船",
    "text": "以耙吸、绞吸或反铲等不同设备参与航道、港池和泊位的疏浚维护。工程部门衔接测量、施工及验收，生产调度协调施工与船舶交通。",
    "distinction": "核心任务是工程疏浚，装运疏浚物不等于经营矿石散货运输；施工区域、环境要求与处置去向须按项目另行核验。"
  },
  {
    "id": "offshore-service-vessel",
    "name": "海工服务船",
    "text": "为海上工程提供人员、物资或运维支持；海上风电服务中可见运维母船SOV、人员转运船CTV及电缆作业船等分工，港口承担补给和人员设备交接。",
    "distinction": "这是服务用途的集合，不是统一装货能力。运维、敷缆、重型运输和安装是不同任务，不能看到“海工船”便推定能装风叶或执行安装。"
  }
];
