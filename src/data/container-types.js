// 集装箱类型教学数据；核对日期：2026-11-21。原创归纳，非操作规程或工程规格。
// 稳定契约：三个具名导出均为数组；code 为带解释的展示字符串；sources 存 containerSources.id。
// visual 为 public 根路径；links.path 为已核对的站内根相对路径，部署子路径由使用方统一处理。
// operations 为结合来源与原站场景的教学归纳，不是来源机构对本站流程的认证。
// 尺寸与载荷始终核对实箱；SVG 为独立原创教学线稿，不用于测量或吊装设计。

export const containerSources = [
  {
    "id": "bic-identification",
    "title": "Container Identification Number",
    "org": "BIC（国际集装箱局）",
    "url": "https://www.bic-code.org/identification-number/",
    "checked": "2026-11-21",
    "scope": "箱号的拥有者或主要运营人前缀、设备类别、序列号与校验位；不证明货权或箱况。"
  },
  {
    "id": "bic-csc",
    "title": "CSC Combined Data Plate",
    "org": "BIC（国际集装箱局）",
    "url": "https://www.bic-code.org/csc-combined-data-plate/",
    "checked": "2026-11-21",
    "scope": "CSC 安全批准牌、定期检验与 ACEP 连续检验制度；有铭牌不代表当前箱况必然安全。"
  },
  {
    "id": "imo-vgm",
    "title": "Verification of the gross mass of a packed container",
    "org": "IMO（国际海事组织）",
    "url": "https://www.imo.org/en/ourwork/safety/pages/verification-of-the-gross-mass.aspx",
    "checked": "2026-11-21",
    "scope": "适用 SOLAS 的装货集装箱 VGM、托运人责任与装船前提供信息；VGM 是必要条件之一，不自动取得装船权利。"
  },
  {
    "id": "imo-ctu",
    "title": "IMO/ILO/UNECE Code of Practice for Packing of Cargo Transport Units",
    "org": "IMO / ILO / UNECE",
    "url": "https://www.imo.org/en/ourwork/safety/pages/ctu-code.aspx",
    "checked": "2026-11-21",
    "scope": "2014 CTU Code 的官方说明；适箱、检查、装载与系固等全程运输教学依据。该指南本身为非强制性文件，不能替代当地规章与作业方案。"
  },
  {
    "id": "hl-spec",
    "title": "Container Specification",
    "org": "Hapag-Lloyd（赫伯罗特）",
    "url": "https://www.hapag-lloyd.com/content/dam/website/downloads/press_and_media/publications/15211_Container_Specification_engl_Gesamt_web.pdf",
    "checked": "2026-11-21",
    "scope": "官方设备图鉴：印刷页 5 对照外廓、最小内尺寸和门洞；8–15 干货/高箱，24–39 开顶/框架/平台，40–45 冷藏，51 类型编码。该图鉴的 platform 示例含折叠框架箱，不能据此混同全部独立平台箱；均为船队示例，不是普适载重。"
  },
  {
    "id": "cma-equipment",
    "title": "Containers for all your cargo shipments — Technical specifications",
    "org": "CMA CGM（达飞）",
    "url": "https://www.cma-cgm.com/products-services/containers",
    "checked": "2026-11-21",
    "scope": "干货、开顶、框架、罐式及冷藏设备的结构和用途；官网明确尺寸、重量为非合同性船队示例，须核对实箱及运营商确认。"
  },
  {
    "id": "bic-size-type",
    "title": "Size & Type Code",
    "org": "BIC（国际集装箱局）",
    "url": "https://www.bic-code.org/size-type-code/",
    "checked": "2026-11-21",
    "scope": "ISO 尺寸类型码组成与尺寸识别；商业简称不等于完整四位代码，45G1 等必须逐位解释。"
  },
  {
    "id": "bic-type-designation",
    "title": "ISO 6346:2022 Type Code Designation",
    "org": "BIC（国际集装箱局）",
    "url": "https://www.bic-code.org/type-code-designation/",
    "checked": "2026-11-21",
    "scope": "结构类型区分：普通箱小透气孔、专用自然/机械通风、侧面全开/局部开口、平台/框架、罐式与散货等。类型组代码与完整尺寸类型码应分开阅读。"
  },
  {
    "id": "imo-ctu-full",
    "title": "MSC.1/Circ.1497 — IMO/ILO/UNECE CTU Code（2014 官方全文）",
    "org": "IMO / ILO / UNECE（IMO 官方存档）",
    "url": "https://wwwcdn.imo.org/localresources/en/OurWork/Safety/Documents/1497.pdf",
    "checked": "2026-11-21",
    "scope": "6.2 的箱体结构、7–8 的适用性与检查、附录 2 搬运、3 结露、4 铭牌和重量、5 接收与封志、7 装载系固。6.2.9 的 open side 侧帘型与本站所绘刚性侧门型不同，后者另参 BIC G2/G3；教学不把这些配置混同。"
  },
  {
    "id": "imo-imdg",
    "title": "The International Maritime Dangerous Goods (IMDG) Code",
    "org": "IMO（国际海事组织）",
    "url": "https://www.imo.org/en/ourwork/safety/pages/dangerousgoods-default.aspx",
    "checked": "2026-11-21",
    "scope": "海运包装危险货分类与运输框架；危险货属性与箱体结构分开判断，具体货物、罐型、标志、积载和隔离须按适用规则确认。"
  },
  {
    "id": "maersk-glossary",
    "title": "Shipping terms — FEU / TEU",
    "org": "Maersk（马士基）",
    "url": "https://www.maersk.com/support/glossaries/shipping-terms",
    "checked": "2026-11-21",
    "scope": "TEU 与四十英尺当量的基础解释；不把容量当货重，也不据此自行规定所有非常规箱的统计折算。"
  },
  {
    "id": "sse-abbreviations",
    "title": "运价备案箱型、货类、尺码代码表",
    "org": "上海航运交易所",
    "url": "https://www1.sse.net.cn/doc/xx.pdf",
    "checked": "2026-11-21",
    "scope": "运价备案语境的 DV、HQ、RF、RH、OT、FR 等简称示例；与 BIC/ISO 类型组表不是同一编码口径，不能把此表当作完整 ISO 尺寸类型码。"
  },
  {
    "id": "cma-reefer",
    "title": "Reefer Container Shipping Solutions",
    "org": "CMA CGM（达飞）",
    "url": "https://www.cma-cgm.com/products-services/reefer",
    "checked": "2026-11-21",
    "scope": "冷藏机组、底板风道、温度/通风/湿度等货物适配及 20RF/40RH 商业写法；不把运营商的性能或内部尺寸示例推广到所有冷藏箱。"
  }
];

export const containerTypes = [
  {
    "id": "dry-20",
    "name": "20 英尺普通干货箱",
    "code": "20GP / 20DC / 20DV（General Purpose / Dry Container / Dry Van）；行业常用简称，并非唯一 ISO 尺寸类型码，以实箱标识和运营商映射为准",
    "group": "通用干货",
    "summary": "有固定顶板、侧壁和端门的通用箱。先看货物能否通过门洞，再核对地板受力、重量和系固条件。",
    "visual": "/illustrations/containers/dry-20.svg",
    "sizeNote": "常见外廓长×宽×高：20′级 × 8′ × 8′6″，约 6.058 × 2.438 × 2.591 m。20′是名义规格，外长并非直接把 20 ft 换算为 6.096 m。这是外廓，不是内部净尺寸或门洞尺寸；以箱铭牌、实测和运营商数据为准，不据此推定承重。",
    "uses": [
      "纸箱、袋装与托盘化普通干货",
      "在地板受力和重量条件允许时运输较密实货物"
    ],
    "features": [
      {
        "label": "封闭结构",
        "text": "固定顶板、波纹侧壁和双扇端门提供基本防风雨保护，不是恒温或气密包装。"
      },
      {
        "label": "短箱识别",
        "text": "与 40 英尺箱相比长度明显更短；门端仍需读取箱号、尺寸类型码和重量标识。"
      },
      {
        "label": "承载边界",
        "text": "地板集中载荷、系固点、道路和设备限制都可能先于箱体最大总重成为约束。"
      }
    ],
    "checks": [
      "闸口核对箱号、20 英尺箱型、空重状态及适用封志记录。",
      "检查角件、门锁杆、密封条、地板和可见破损；按适用制度核对 CSC 与检验状态。",
      "装货时确认货物连同垫料、系固材料与箱体的总质量及适用 VGM 信息。"
    ],
    "operations": [
      {
        "title": "闸口识别",
        "text": "在出口送重场景，把箱型、箱号、封志与预约逐项匹配；重量记录不能由箱型简称推算。"
      },
      {
        "title": "堆存与设备",
        "text": "安排适配 20 英尺的箱位、吊具与承载条件；双箱吊等组合工况另需设备与计划确认。"
      },
      {
        "title": "装船影响",
        "text": "船舶计划同时看长度、实际总重和箱位限制，20 英尺箱并不必然比 40 英尺箱轻。"
      },
      {
        "title": "关联业务",
        "text": "在进口拆箱与还空场景，货物交付和空箱回场分别留痕，箱号持续追踪同一箱体。"
      }
    ],
    "misconception": "“20 英尺”描述名义长度，不代表统一净容积、可装重量或内长。",
    "links": [
      {
        "label": "看进口整箱与还空",
        "path": "/scenarios/import-full-container/"
      },
      {
        "label": "看出口装箱与装船",
        "path": "/scenarios/export-full-container/"
      },
      {
        "label": "理解 VGM",
        "path": "/knowledge/container-vgm/"
      }
    ],
    "sources": [
      "hl-spec",
      "cma-equipment",
      "bic-identification",
      "bic-csc",
      "imo-vgm",
      "imo-ctu",
      "bic-size-type",
      "imo-ctu-full",
      "sse-abbreviations"
    ]
  },
  {
    "id": "dry-40",
    "name": "40 英尺普通干货箱",
    "code": "40GP / 40DC / 40DV（General Purpose / Dry Container / Dry Van）；行业常用简称，并非唯一 ISO 尺寸类型码，以实箱标识和运营商映射为准",
    "group": "通用干货",
    "summary": "比 20 英尺箱更长，适合需要更多装载空间的普通干货；外廓高度与常见 20 英尺普通箱相同。",
    "visual": "/illustrations/containers/dry-40.svg",
    "sizeNote": "常见外廓长×宽×高：40′ × 8′ × 8′6″，约 12.192 × 2.438 × 2.591 m。这是外廓，不是内部净尺寸或门洞尺寸；以箱铭牌、实测和运营商数据为准，不据此推定承重。",
    "uses": [
      "家具、纸箱及托盘化普通货物",
      "单件长度与门洞、内长相容的长件货物"
    ],
    "features": [
      {
        "label": "更长的箱体",
        "text": "端门装卸路径更长，内部货物分布与系固需要覆盖全箱。"
      },
      {
        "label": "普通高度",
        "text": "8′6″是常见外廓高度；与同长高箱相比，可用高度和门洞条件不同。"
      },
      {
        "label": "容量与重量分开",
        "text": "空间增加不等于允许载荷按比例增加，装载仍受实际箱体和全程运输条件限制。"
      }
    ],
    "checks": [
      "闸口核对 40 英尺普通高度，避免与 40HC 混录。",
      "检查角件、结构、门封及适用 CSC/检验状态。",
      "核对货物分布、地板受力、实箱重量标识和适用 VGM。"
    ],
    "operations": [
      {
        "title": "闸口识别",
        "text": "订舱、预约和实箱均应为对应 40 英尺箱型；OCR 箱号正确不代表箱型也识别正确。"
      },
      {
        "title": "堆存与设备",
        "text": "使用适配 40 英尺角件位置的吊具和箱位；装卸机具能力按实际工况核对。"
      },
      {
        "title": "装船影响",
        "text": "40 英尺箱参与舱位、重量与系固安排，不能仅用“两个 20 英尺”替代具体箱位校核。"
      },
      {
        "title": "关联业务",
        "text": "海铁联运还要将同一箱号与铁路装载、车板和站场接续条件匹配。"
      }
    ],
    "misconception": "40 英尺箱并不保证能装两倍于 20 英尺箱的货物重量。",
    "links": [
      {
        "label": "看海铁联运",
        "path": "/scenarios/sea-rail-intermodal/"
      },
      {
        "label": "看出口整箱",
        "path": "/scenarios/export-full-container/"
      },
      {
        "label": "看场桥与箱位",
        "path": "/knowledge/eq-rtg/"
      }
    ],
    "sources": [
      "hl-spec",
      "cma-equipment",
      "imo-ctu",
      "imo-vgm",
      "bic-size-type",
      "imo-ctu-full",
      "sse-abbreviations"
    ]
  },
  {
    "id": "high-cube-40",
    "name": "40 英尺高箱",
    "code": "40HC / 40HQ（High Cube）；行业常用简称，并非唯一 ISO 尺寸类型码，以实箱标识和运营商映射为准",
    "group": "通用干货",
    "summary": "保持常见 40 英尺箱的长度和宽度，提高箱体高度，给轻泡货或较高货物更多空间。",
    "visual": "/illustrations/containers/high-cube-40.svg",
    "sizeNote": "常见外廓长×宽×高：40′ × 8′ × 9′6″，约 12.192 × 2.438 × 2.896 m；比 8′6″普通箱高约 0.305 m，长度不增加。这是外廓，不是内部净尺寸或门洞尺寸；以箱铭牌、实测和运营商数据为准，不据此推定承重。",
    "uses": [
      "体积较大、密度较低的家具与轻泡货",
      "可通过实际门洞且满足固定条件的较高货物"
    ],
    "features": [
      {
        "label": "增加的是高度",
        "text": "图中虚线是同长普通箱的顶线，用于对照约一英尺的外廓高度差。"
      },
      {
        "label": "识别高箱标志",
        "text": "读取尺寸类型码并核对高箱警示；不要仅凭远处外观或颜色判断。"
      },
      {
        "label": "通行净空",
        "text": "全程车辆、铁路和设施净空需要按箱体与承运设备组合确认。"
      }
    ],
    "checks": [
      "闸口核对高箱标识，避免把 HC 记成普通 GP。",
      "确认货物能过门洞，装载不损伤顶板，并核对箱况、CSC/检验状态。",
      "核对运输总高度、堆存与船舶可用高度及实际重量条件。"
    ],
    "operations": [
      {
        "title": "闸口识别",
        "text": "预约与实际高箱匹配，同时确认车辆组合高度；箱号正确不能消除高度差异。"
      },
      {
        "title": "堆存与设备",
        "text": "箱位与起升净空考虑高箱高度，吊具按长度与角件匹配，并遵守设备工况限制。"
      },
      {
        "title": "装船影响",
        "text": "高箱会影响舱内净高、层高和绑扎安排，由船舶计划核定适用箱位。"
      },
      {
        "title": "关联业务",
        "text": "海铁联运需将高箱信息传递到铁路接续；空箱复用也要与出口订舱箱型一致。"
      }
    ],
    "misconception": "高箱是更高，不是更长；40HC 也不自动拥有更大的允许载荷。",
    "links": [
      {
        "label": "看铁路接续条件",
        "path": "/scenarios/sea-rail-intermodal/"
      },
      {
        "label": "看空箱直接复用",
        "path": "/scenarios/street-turn-container-reuse/"
      },
      {
        "label": "看特殊条件识别",
        "path": "/knowledge/container-special/"
      }
    ],
    "sources": [
      "hl-spec",
      "cma-equipment",
      "imo-ctu",
      "bic-size-type",
      "imo-ctu-full",
      "sse-abbreviations"
    ]
  },
  {
    "id": "high-cube-45",
    "name": "45 英尺高箱",
    "code": "45HC / 45HQ（High Cube）；行业常用简称，并非唯一 ISO 尺寸类型码，以实箱标识和运营商映射为准",
    "group": "通用干货",
    "summary": "比 40 英尺高箱更长，适合特定航线和陆运网络中的大体积货物，使用前需确认箱源及全程适配。",
    "visual": "/illustrations/containers/high-cube-45.svg",
    "sizeNote": "常见标准宽外廓长×宽×高：45′ × 8′ × 9′6″，约 13.716 × 2.438 × 2.896 m；不涵盖所有托盘宽箱。这是外廓，不是内部净尺寸或门洞尺寸；以箱铭牌、实测和运营商数据为准，不据此推定承重。",
    "uses": [
      "航线与设备接受的高体积普通干货",
      "在实际内尺寸允许时优化托盘或包装布置"
    ],
    "features": [
      {
        "label": "长度与高度双重识别",
        "text": "长度大于 40 英尺，高度与常见 40HC 相同，图中同时保留普通高度虚线。"
      },
      {
        "label": "适配条件",
        "text": "不能从 45HC 名称推定吊点、底盘或船舶箱位一定适配；核对实箱与运营商方案。"
      },
      {
        "label": "标准宽与托盘宽",
        "text": "本条介绍常见 8 英尺标准宽箱，托盘宽等变体需要单独确认。"
      }
    ],
    "checks": [
      "闸口核对 45 英尺与高箱信息，以及实箱尺寸类型码。",
      "核对底盘、转弯空间、运输净空及码头是否接受该具体设备。",
      "核对箱体、角件、CSC/检验状态及订舱认可的装载条件。"
    ],
    "operations": [
      {
        "title": "闸口识别",
        "text": "提前把 45 英尺箱型传到预约与设备计划，实到不符时交业务核实，不能直接按 40 英尺录入。"
      },
      {
        "title": "堆存与设备",
        "text": "由设备岗位确认吊具连接、箱位边界和转运车辆，长箱不得占用未经确认的相邻空间。"
      },
      {
        "title": "装船影响",
        "text": "核对船舶是否接受该箱型、可用舱位及装载限制，长度增加会改变箱位适配。"
      },
      {
        "title": "关联业务",
        "text": "改船或落装后，重新确认后程船与陆运是否仍接受 45 英尺箱，而不只修改航次字段。"
      }
    ],
    "misconception": "ISO 示例码 45G1 表示 40 英尺高干货箱，不是“45 英尺箱”；45 英尺箱另有相应长度代码。",
    "links": [
      {
        "label": "看改船与落装",
        "path": "/scenarios/booking-change-and-return/"
      },
      {
        "label": "看空箱调运",
        "path": "/scenarios/empty-container-repositioning/"
      },
      {
        "label": "看设备可用能力",
        "path": "/knowledge/k20-overview/"
      }
    ],
    "sources": [
      "hl-spec",
      "cma-equipment",
      "imo-ctu",
      "bic-size-type",
      "imo-ctu-full",
      "sse-abbreviations"
    ]
  },
  {
    "id": "reefer",
    "name": "冷藏集装箱",
    "code": "RF / REEFER（冷藏）；RH（冷藏高箱，按运营商语境）；行业常用简称，并非唯一 ISO 尺寸类型码，以实箱标识和运营商映射为准",
    "group": "温控与通风",
    "summary": "保温箱体配合制冷机组、空气循环与控制系统，运输需要约定温控条件的货物。",
    "visual": "/illustrations/containers/reefer.svg",
    "sizeNote": "常见有 20 英尺和 40 英尺高箱等规格；保温层、冷机和风道占用空间，不能套用同外廓干货箱的内部尺寸。以实箱铭牌、实测、装载线和运营商数据为准。",
    "uses": [
      "约定温度条件下的水果、蔬菜、肉类和冷冻食品",
      "经承运人确认设备能力与方案的温敏产品"
    ],
    "features": [
      {
        "label": "冷机端",
        "text": "图中端面百叶、风扇与控制面板帮助识别制冷机组，不是普通端门。"
      },
      {
        "label": "循环风路",
        "text": "地板风道与装载线用于维持设计气流，货物与包装不应堵塞风路。"
      },
      {
        "label": "设定值与实际值",
        "text": "温度设定、送风或回风测量、报警及货物温度是不同信息；通风等参数按货物指令设置。"
      },
      {
        "label": "商业简称有语境",
        "text": "例如运营商将 40RH 写作冷藏高箱；BIC 类型组表中的 RH 另指加热型。相同字母不能跨编码表直接互换，应读取完整尺寸类型码和设备资料。"
      }
    ],
    "checks": [
      "闸口核对箱号、冷藏箱型、温控指令、适用预检记录和当前机组状态。",
      "检查电缆、插头、机组、门封与箱况；确认 CSC/检验状态。",
      "交接时记录断接电时间和异常信息，温度偏差交授权岗位处理。"
    ],
    "operations": [
      {
        "title": "闸口识别",
        "text": "将温控指令与本箱匹配，确认送入冷藏区的任务已衔接；不把温度设定值当成货物温度。"
      },
      {
        "title": "堆存与设备",
        "text": "安排适配电源的冷藏箱位，由授权人员接电并持续监测；移箱需衔接断电、转运和复电。"
      },
      {
        "title": "装船影响",
        "text": "船舶需有可用冷藏插座、供电和监测安排，装卸次序需衔接温控连续性。"
      },
      {
        "title": "关联业务",
        "text": "在冷藏温控异常场景保留报警和处置记录；空冷藏箱转作非制冷用途需单独确认授权。"
      }
    ],
    "misconception": "冷藏箱不是把任何热货快速冻透的保证；预处理、包装、装载与温控指令仍需货方和承运人确认。",
    "links": [
      {
        "label": "看接电与温控异常",
        "path": "/scenarios/reefer-temperature-chain/"
      },
      {
        "label": "看冷藏预检与特殊空箱",
        "path": "/scenarios/special-empty-container-conditions/"
      },
      {
        "label": "看特殊箱交接",
        "path": "/knowledge/container-special/"
      }
    ],
    "sources": [
      "hl-spec",
      "cma-equipment",
      "imo-ctu",
      "bic-csc",
      "bic-size-type",
      "imo-ctu-full",
      "sse-abbreviations",
      "cma-reefer",
      "bic-type-designation"
    ]
  },
  {
    "id": "open-top",
    "name": "开顶集装箱",
    "code": "OT（Open Top）；行业常用简称，并非唯一 ISO 尺寸类型码，以实箱标识和运营商映射为准",
    "group": "超限与项目货",
    "summary": "保留侧壁和端门，顶部可开启，以便吊入难以通过端门的货物；是否超高要看装载后的实际外廓。",
    "visual": "/illustrations/containers/open-top.svg",
    "sizeNote": "常见有 20、40 英尺及高箱变体。顶开口、门框净空、顶梁下高度与内部尺寸不同；以实箱结构、实测和运营商数据为准，货物突出部分另报。",
    "uses": [
      "需要从顶部吊装的机械、模具和长大件",
      "在承运人接受条件下的超高货物"
    ],
    "features": [
      {
        "label": "可开启顶部",
        "text": "典型软开顶使用可拆顶弓和篷布；硬顶可拆箱是另一种配置，不能一概视为同款。"
      },
      {
        "label": "侧壁仍在",
        "text": "侧壁与角柱保留，与无侧壁的框架箱不同，装载宽度受结构限制。"
      },
      {
        "label": "超限看实货",
        "text": "顶开口方便装卸，不意味着每票开顶货都超限；反之，突出部分必须申报。"
      }
    ],
    "checks": [
      "闸口核对开顶箱型、顶弓和篷布状态、货物突出尺寸及适用封志。",
      "检查角件、框架、系固点、箱况和 CSC/检验状态。",
      "核对吊装路径、重心、系固与防雨方案，确认是否妨碍吊具连接。"
    ],
    "operations": [
      {
        "title": "闸口识别",
        "text": "按装载后外廓匹配超限资料；仅记录 OT 不足以描述超高或超宽。"
      },
      {
        "title": "堆存与设备",
        "text": "箱位和吊装设备按突出尺寸、顶框可接近性及实际载荷安排，不能把货物当成上层箱支承面。"
      },
      {
        "title": "装船影响",
        "text": "超高货物可能限制上方箱位与舱盖净空，需船舶计划确认；不超限时也要按具体箱型校核。"
      },
      {
        "title": "关联业务",
        "text": "查验或吊装拆下篷布、顶弓后，记录恢复、系固与适用重新施封，确认后再恢复流转。"
      }
    ],
    "misconception": "开顶不等于一定超限，也不等于去掉顶板后可以不经核对照常堆叠。",
    "links": [
      {
        "label": "看超限尺寸与吊装约束",
        "path": "/scenarios/out-of-gauge-container/"
      },
      {
        "label": "看拆封与重新施封",
        "path": "/scenarios/inspection-opening-and-resealing/"
      },
      {
        "label": "看重大件交接",
        "path": "/knowledge/k12-overview/"
      }
    ],
    "sources": [
      "hl-spec",
      "cma-equipment",
      "imo-ctu",
      "bic-size-type",
      "imo-ctu-full",
      "sse-abbreviations"
    ]
  },
  {
    "id": "flat-rack",
    "name": "框架集装箱",
    "code": "FR（Flat Rack）；行业常用简称，并非唯一 ISO 尺寸类型码，以实箱标识和运营商映射为准",
    "group": "超限与项目货",
    "summary": "以底架和两端框架为主要结构，没有固定侧壁和顶板，便于从侧面或顶部装载项目货。",
    "visual": "/illustrations/containers/flat-rack.svg",
    "sizeNote": "常见有 20、40 英尺，端框可固定或折叠。可用底板长度、端柱之间宽度和系固空间不等于名义外廓；以实箱、实测和运营商数据为准。",
    "uses": [
      "机械设备、工程车辆和卷筒等项目货",
      "经确认的超宽、超高或形状不规则货物"
    ],
    "features": [
      {
        "label": "两端框架",
        "text": "图中端框立起，侧面敞开；折叠式设备还需区分立起锁定与折叠状态。"
      },
      {
        "label": "底架与系固点",
        "text": "主要依靠底架承载并用适配系固方案固定货物，集中受力必须专门校核。"
      },
      {
        "label": "真实占位",
        "text": "装载突出尺寸及吊装净空可能占用相邻位置，箱体本身的名义尺寸不足以计划。"
      }
    ],
    "checks": [
      "闸口核对 FR、端框状态、超限方向与尺寸，不以裸箱外廓代替货物外廓。",
      "检查角件、端框锁定、底架和系固点，核对 CSC/检验与实际载荷限制。",
      "确认重心、支承、绑扎和吊具连接区域，异常由计划与技术岗位评估。"
    ],
    "operations": [
      {
        "title": "闸口识别",
        "text": "将货物尺寸、重量和重心资料与实到箱匹配，超限信息缺失时先补齐可执行条件。"
      },
      {
        "title": "堆存与设备",
        "text": "按实际外廓留出空间，确认吊具或专用吊梁方案与设备工况；不能凭 FR 名称认定能用普通顶吊。"
      },
      {
        "title": "装船影响",
        "text": "船舶计划核对相邻箱位损失、支承点与绑扎，适用位置受货物外廓和船舶条件约束。"
      },
      {
        "title": "关联业务",
        "text": "空框架箱调运时核对端框折叠和捆组方案；载货框架箱走超限项目货审批与交接链。"
      }
    ],
    "misconception": "框架箱不是无重量上限的托盘；折叠端框也不会让它自动变成另一种获准承载结构。",
    "links": [
      {
        "label": "看超限框架箱完整场景",
        "path": "/scenarios/out-of-gauge-container/"
      },
      {
        "label": "看空箱调运",
        "path": "/scenarios/empty-container-repositioning/"
      },
      {
        "label": "看正面吊工况",
        "path": "/knowledge/eq-reachstacker/"
      }
    ],
    "sources": [
      "hl-spec",
      "cma-equipment",
      "imo-ctu",
      "bic-size-type",
      "imo-ctu-full",
      "sse-abbreviations"
    ]
  },
  {
    "id": "platform",
    "name": "平台集装箱",
    "code": "PL / PLATFORM（Platform）；行业常用简称，并非唯一 ISO 尺寸类型码，以实箱标识和运营商映射为准",
    "group": "超限与项目货",
    "summary": "只有承载平台，没有立起的端框、侧壁或顶板，适用于经过专门确认的项目货装载与支承。",
    "visual": "/illustrations/containers/platform.svg",
    "sizeNote": "常见有 20、40 英尺平台；平台厚度、支承位置、角件配置和可用装载面依具体设备而异，不能套用普通箱内部高度。以铭牌、实测和运营商方案为准。",
    "uses": [
      "超长或不规则项目货的专门运输方案",
      "经船方和工程方案认可的支承用途"
    ],
    "features": [
      {
        "label": "无立起端框",
        "text": "图中只有平底架，直接展示与框架箱的结构差别。"
      },
      {
        "label": "低位连接点",
        "text": "吊装连接位置与载货后的可接近性需单独确认，不能假设存在普通箱顶部角件。"
      },
      {
        "label": "工程支承",
        "text": "平台、货物和垫梁的受力需整体评估，多平台组合不能未经设计自行拼接。"
      }
    ],
    "checks": [
      "闸口核对真正的平台设备与折叠状态框架箱，读取实箱类型标识。",
      "核对底架、角件、CSC/检验状态、重量、重心和集中载荷条件。",
      "确认支承、系固、吊装连接和货物实际外廓均已纳入批准方案。"
    ],
    "operations": [
      {
        "title": "闸口识别",
        "text": "记录平台类型和货物全部突出尺寸，防止按空平台轮廓安排通道。"
      },
      {
        "title": "堆存与设备",
        "text": "按支承与吊装方案安排堆位及专用属具，避免地面支承和转运时的局部超载。"
      },
      {
        "title": "装船影响",
        "text": "核对平台支承、船上承载、吊装路径和系固方案，可能需要专门占位安排。"
      },
      {
        "title": "关联业务",
        "text": "与重大件交接和超限场景连接；岸桥或其他设备变更后，重新确认方案能否执行。"
      }
    ],
    "misconception": "平台箱不等于把普通箱切去四壁；没有端框也不代表可以任意堆叠载货平台。",
    "links": [
      {
        "label": "看超限作业条件",
        "path": "/scenarios/out-of-gauge-container/"
      },
      {
        "label": "看设备变更后的恢复确认",
        "path": "/scenarios/quay-crane-failure-recovery/"
      },
      {
        "label": "看重大件交接",
        "path": "/knowledge/k12-overview/"
      }
    ],
    "sources": [
      "hl-spec",
      "imo-ctu",
      "bic-size-type",
      "imo-ctu-full",
      "bic-type-designation"
    ]
  },
  {
    "id": "tank",
    "name": "罐式集装箱",
    "code": "TK / TANK（Tank Container）；行业常用简称，并非唯一 ISO 尺寸类型码，以实箱标识和运营商映射为准",
    "group": "特种装载",
    "summary": "在框架内固定罐体，通过专用阀口装卸适配的液体或其他介质；具体罐型决定可接受的货物与条件。",
    "visual": "/illustrations/containers/tank.svg",
    "sizeNote": "常见为 20 英尺框架，也有其他规格和专用设计。外框尺寸、罐内容积与可装液位是不同概念；依铭牌、罐型批准、介质和运营商资料确认，不给统一容积或载荷。",
    "uses": [
      "符合卫生与材料相容要求的食品级液体",
      "经相容性及适用运输条件确认的化工介质；气体等须使用相应专门罐型"
    ],
    "features": [
      {
        "label": "罐体与框架",
        "text": "圆筒罐体承装介质，外框角件用于适配的搬运与固定；不得把罐体或管阀当吊点。"
      },
      {
        "label": "阀口与附件",
        "text": "装卸阀、护罩及可能的保温或加热附件均按具体设备识别，不能仅看外形判断用途。"
      },
      {
        "label": "前装货与残留",
        "text": "相容性、清洁证明和残留状态影响接收；空罐不必然是无害且可直接装新货。"
      }
    ],
    "checks": [
      "闸口核对箱号、罐型、介质资料及适用危险货标志和单证。",
      "检查可见泄漏、阀口保护、框架与角件，核对 CSC 及适用罐体检验/批准资料。",
      "确认前装货、清洁或残留状态与接收条件，不擅自开阀或进入罐体。"
    ],
    "operations": [
      {
        "title": "闸口识别",
        "text": "以货物性质和适用规则判断是否危险货，不凭圆罐外形判定；残留空罐也需核对状态。"
      },
      {
        "title": "堆存与设备",
        "text": "按实箱、介质和场地条件安排箱位，危险货另核对隔离与应急条件；适配吊具通过框架角件作业。"
      },
      {
        "title": "装船影响",
        "text": "按实际重量、介质运输要求及适用危险货积载隔离条件配载，罐箱类型不能替代货物申报。"
      },
      {
        "title": "关联业务",
        "text": "特殊空箱场景关注残留和接收条件；罐箱交接不同于液体船通过码头管线直接入岸罐的流程。"
      }
    ],
    "misconception": "罐箱不自动等于危险货；标为空箱也不自动表示已清洗、无残留或可以放宽控制。",
    "links": [
      {
        "label": "看残留罐箱",
        "path": "/scenarios/special-empty-container-conditions/"
      },
      {
        "label": "看危险货条件联动",
        "path": "/scenarios/dangerous-goods-container/"
      },
      {
        "label": "看特殊箱识别",
        "path": "/knowledge/container-special/"
      }
    ],
    "sources": [
      "cma-equipment",
      "imo-ctu",
      "bic-csc",
      "bic-size-type",
      "imo-ctu-full",
      "bic-type-designation",
      "imo-imdg",
      "sse-abbreviations"
    ]
  },
  {
    "id": "ventilated",
    "name": "通风集装箱",
    "code": "VENT / VH（Ventilated）；行业常用简称，并非唯一 ISO 尺寸类型码，以实箱标识和运营商映射为准",
    "group": "温控与通风",
    "summary": "以专门通风结构促进空气交换，适用于经过评估需要通风的干货；本图展示自然通风形式。",
    "visual": "/illustrations/containers/ventilated.svg",
    "sizeNote": "可见 20 英尺等规格，通风道和结构会改变可用空间；自然通风与机械通风配置不同。以实箱铭牌、通风设计、实测和运营商数据为准。",
    "uses": [
      "按货物和航线条件评估的袋装咖啡、可可等货物",
      "需要空气交换且不要求主动制冷的适配干货"
    ],
    "features": [
      {
        "label": "上下通风区域",
        "text": "图中用上下成组百叶及箭头表达空气交换，具体通风面积和通道依设备而异。"
      },
      {
        "label": "与小透气孔区分",
        "text": "普通干货箱也可能有小通风口，不能仅凭一个开孔认定为专用通风箱。"
      },
      {
        "label": "不保证恒温恒湿",
        "text": "自然通风依赖外界条件，机械通风另有设备要求；通风不能自动消除结露风险。"
      }
    ],
    "checks": [
      "闸口核对专用通风箱型和通风方式，不与普通箱或冷藏箱混淆。",
      "检查百叶、防雨结构和通风通道是否堵塞或损伤，核对箱况与检验状态。",
      "确认货物包装、含水状态和装载方式与通风方案相容。"
    ],
    "operations": [
      {
        "title": "闸口识别",
        "text": "把通风要求与实箱类型关联；没有制冷机组不能据此断言不需要任何辅助设备，仍看配置。"
      },
      {
        "title": "堆存与设备",
        "text": "自然通风型按适配箱位和吊具搬运，并按运营商要求保护通风开口；机械型另核对供电。"
      },
      {
        "title": "装船影响",
        "text": "通风箱不自动提供船上主动温控，船方与货方须确认预期通风环境及接受条件。"
      },
      {
        "title": "关联业务",
        "text": "进口提离或空箱复用时保留潮湿、异味和堵塞记录，先确认适货性再给下一票货使用。"
      }
    ],
    "misconception": "通风箱不是没有冷机的冷藏箱，也不是任何带小透气孔的普通干货箱。",
    "links": [
      {
        "label": "看进口交接",
        "path": "/scenarios/import-full-container/"
      },
      {
        "label": "看空箱适货性与复用",
        "path": "/scenarios/street-turn-container-reuse/"
      },
      {
        "label": "看交接核对",
        "path": "/knowledge/k17-overview/"
      }
    ],
    "sources": [
      "imo-ctu",
      "bic-size-type",
      "imo-ctu-full",
      "bic-type-designation"
    ]
  },
  {
    "id": "bulk",
    "name": "干散货集装箱",
    "code": "BU / BULK（Dry Bulk）；行业常用简称，并非唯一 ISO 尺寸类型码，以实箱标识和运营商映射为准",
    "group": "特种装载",
    "summary": "为适配的干燥散粒货物设置装卸开口；本图展示顶部装料口与下部卸料口的一种配置。",
    "visual": "/illustrations/containers/bulk.svg",
    "sizeNote": "可见 20 英尺等规格；进料口、卸料口、内衬及内部几何依具体设备而异。以铭牌、实测、运营商和装卸系统参数为准，不把外廓容积当可装散货量。",
    "uses": [
      "满足卫生、防潮和装卸条件的散粒粮食等干散货",
      "与箱体和专用装卸系统相容的非危险干燥颗粒料"
    ],
    "features": [
      {
        "label": "专用开口",
        "text": "顶部装料口与受控卸料口区别于普通端门箱；口盖、密封和防护需逐一确认。"
      },
      {
        "label": "介质适配",
        "text": "卫生、含水、流动性、粉尘和污染控制影响能否装运，不是所有粉体都可通用。"
      },
      {
        "label": "卸料方案",
        "text": "重力、倾卸或气力等方式依设备而定，不能默认所有箱体允许倾翻或加压。"
      }
    ],
    "checks": [
      "闸口核对散货箱型、装卸口盖与封志、货物性质及适用申报。",
      "检查内衬与清洁记录、箱体结构、角件、CSC/检验和密封状态。",
      "确认收发两端装卸设备相容，并核对重量与适用 VGM。"
    ],
    "operations": [
      {
        "title": "闸口识别",
        "text": "顶口、卸料口等接触货物的位置均按适用要求核对关闭与封识，不能只查看端门。"
      },
      {
        "title": "堆存与设备",
        "text": "堆存和起吊按角件及设备工况办理；装卸地点另需适配接口、除尘和防污染措施。"
      },
      {
        "title": "装船影响",
        "text": "计划仍按实际箱型、重量和箱况安排箱位；箱内是散货不代表按散货船舱装卸流程处理。"
      },
      {
        "title": "关联业务",
        "text": "与散粮入筒仓场景对照：集装箱可作为后续运输单元，但装箱、称重和交接另形成记录。"
      }
    ],
    "misconception": "普通干货箱加内衬装散货，不会自动变成带专用装卸口的散货箱；散粮也不是直接向任意箱内倾倒。",
    "links": [
      {
        "label": "对照散粮与筒仓流程",
        "path": "/scenarios/bulk-grain-to-silo/"
      },
      {
        "label": "看装箱后的出口链",
        "path": "/scenarios/export-full-container/"
      },
      {
        "label": "看整箱质量核实",
        "path": "/knowledge/container-vgm/"
      }
    ],
    "sources": [
      "hl-spec",
      "imo-ctu",
      "imo-vgm",
      "bic-size-type",
      "imo-ctu-full",
      "bic-type-designation"
    ]
  },
  {
    "id": "open-side",
    "name": "侧开门集装箱",
    "code": "OS / SIDE OPEN（Open Side）；行业常用简称，并非唯一 ISO 尺寸类型码，以实箱标识和运营商映射为准",
    "group": "特种装载",
    "summary": "在侧面设置可开启门扇，便利较宽货件或侧向装卸；可开启的范围与门框结构随设备变化。",
    "visual": "/illustrations/containers/open-side.svg",
    "sizeNote": "可见 20、40 英尺等配置，全侧开与局部侧开不同；侧门净开口、门扇回转区与内部宽度需实测。以铭牌、实箱获准结构及运营商数据为准。",
    "uses": [
      "适合从侧面装入的长件或宽件包装货",
      "需要侧向叉装或侧面分段取货的适配场景"
    ],
    "features": [
      {
        "label": "侧面门扇",
        "text": "图中侧门向外展开，箱体仍有顶板和端部结构；侧开门不等于侧壁永久缺失。"
      },
      {
        "label": "侧向净空",
        "text": "装卸需要门扇回转、车辆和人员作业空间，侧门开口也不等于整幅外廓尺寸。"
      },
      {
        "label": "配置差异",
        "text": "本条图示刚性侧门型；侧帘式 open side 是另一配置，侧面约束能力不能混同。箱源、获准结构与船公司接受条件需提前确认。"
      }
    ],
    "checks": [
      "闸口核对侧开配置、各门扇锁闭状态与适用封志，不只检查端门。",
      "检查侧门铰链、锁杆、密封与门框，核对 CSC/检验及实箱批准条件。",
      "确认侧向装卸方式、地板受力和关闭后的运输外廓。"
    ],
    "operations": [
      {
        "title": "闸口识别",
        "text": "将侧门配置与实际箱号关联，记录多处适用封志和箱况异常。"
      },
      {
        "title": "堆存与设备",
        "text": "常规运输状态先确认所有门扇闭锁；需要开侧门时转至有足够侧向空间和适配设备的作业区。"
      },
      {
        "title": "装船影响",
        "text": "在承运人接受且闭锁恢复后，按具体箱型与重量配载；不以侧门便利性推定船上可随时开门取货。"
      },
      {
        "title": "关联业务",
        "text": "查验开启侧门后，关联开门记录、检查结果与新旧封志，确认恢复运输条件再回场。"
      }
    ],
    "misconception": "侧开门箱不是开顶箱，也不是可拆侧壁框架箱；能从侧面装货不等于可以开着侧门运输。",
    "links": [
      {
        "label": "看查验与重新施封",
        "path": "/scenarios/inspection-opening-and-resealing/"
      },
      {
        "label": "看货运站装拆箱",
        "path": "/scenarios/less-than-container-load/"
      },
      {
        "label": "看查验后恢复流转",
        "path": "/knowledge/container-inspection/"
      }
    ],
    "sources": [
      "imo-ctu",
      "bic-csc",
      "bic-size-type",
      "imo-ctu-full",
      "bic-type-designation"
    ]
  }
];

// 概念依据：箱号→bic-identification；编码→bic-size-type/bic-type-designation/sse-abbreviations；CSC→bic-csc；
// 重量/箱况/封志/特殊空箱→imo-ctu-full；VGM→imo-vgm；尺寸→hl-spec；危险货→imo-imdg；TEU→maersk-glossary。
export const containerConcepts = [
  {
    "id": "container-number",
    "title": "箱号：识别这一只箱",
    "text": "ISO 6346 箱号由 3 位拥有者或主要运营人字母代码、1 位设备类别字母、6 位序列号和 1 位校验位组成。U 表示货运集装箱，J 表示可拆卸相关设备，Z 表示挂车或底盘。校验位帮助发现抄录和传输差错，不证明货权、放行或箱况。",
    "example": "文字拆解：三位已登记的拥有者或主要运营人字母前缀 + 设备类别字母 U + 六位序列号 + 按规则计算的一位校验数字。这里不编造完整箱号；真实交接应读取实箱并验证校验位。"
  },
  {
    "id": "size-type-code",
    "title": "尺寸类型码：识别箱体规格",
    "text": "箱号旁的尺寸类型码描述箱体规格，不用于唯一识别某只箱。四位代码的前两位表示长度及高度/宽度组合，后两位表示类型及其细分。GP、HC、FR 等商业简称存在运营商差异，不是唯一 ISO 代码。同一组字母在商业简称与 ISO 类型组中还可能另有含义，不能跨表直接替换。",
    "example": "22G1 可对应 20 英尺普通干货箱，45G1 可对应 40 英尺高干货箱；不能把 45G1 的前两位直接读成 45 英尺。"
  },
  {
    "id": "csc-examination",
    "title": "CSC 与有效检验：有牌仍要看状态",
    "text": "CSC 安全批准牌反映获准结构与相关数据。还需按适用制度核对下次检验日期或有效 ACEP 连续检验安排，并检查当前结构是否安全。铭牌存在、标记可读与实箱适运是不同判断。",
    "example": "发现角柱严重变形，即使 CSC 牌仍在、检验日期未到，也应交有权限的专业岗位评估，不能直接恢复吊运。"
  },
  {
    "id": "mass-and-payload",
    "title": "最大总重、自重与载荷",
    "text": "最大总重是箱与箱内全部内容物合计的允许上限；自重是空箱质量；可用载荷还受具体箱体、地板集中受力、设备、道路和铁路等条件限制。包装、托盘、垫料与系固材料也占重量，不能只计算商品净重。",
    "example": "“最大总重减自重”可用于理解箱体标示的载荷关系，但实际货物重量仍需扣除包装和系固等，并满足全程更严格的约束。"
  },
  {
    "id": "vgm",
    "title": "VGM：本次装好箱后的核实总质量",
    "text": "适用 SOLAS 的装货集装箱，由托运人负责在配载所需时间前向船方和码头提供 VGM。可通过整箱称重，或依装箱地主管机关批准的认证方法，将全部货件、包装、托盘、垫料及系固材料质量与箱体自重相加取得。VGM 不等于最大总重，也不自动取得装船资格。",
    "example": "同一箱体换装另一票货后，原先的 VGM 不能直接沿用；还需关联本次箱号、装载和有效重量资料。"
  },
  {
    "id": "seal",
    "title": "封志：记录封识与交接",
    "text": "封志及封号用于记录封识状态和交接线索，不能证明箱内货物数量、品名或温度正确。检查适用封志位置、封号、完整性与单证；有多个开口的特种箱需按适用方案处理。",
    "example": "查验依法拆封后，记录旧封号、开封事由、查验和重新施封记录、新封号及交接关系，不能只覆盖掉旧号码。"
  },
  {
    "id": "condition",
    "title": "箱况：外观、结构和适货性分开看",
    "text": "箱况包括角件、框架、门锁、密封、底板等结构与功能，还涉及清洁、异味、污染和残留。外观完好不等于适合下一票货，检查与接收标准需按设备、货物和运营商条件确定。",
    "example": "空箱无明显凹陷，但存在异味或上票货残留，仍可能不适合直接装食品；应记录并交相关方处理。"
  },
  {
    "id": "teu",
    "title": "TEU：折算箱量，不是货重",
    "text": "TEU 是二十英尺标准箱当量，用于表达箱量或容量。常见 20 英尺箱计 1 TEU，40 英尺箱计 2 TEU；高箱不因高度增加而变为更多 TEU。45 英尺及其他非常规箱的折算应注明具体统计口径，不能只按英尺长度自行除以二十。",
    "example": "一只 40 英尺空箱和一只 40 英尺重箱通常各计 2 TEU，但货量、重量、设备负荷和收入可能完全不同。"
  },
  {
    "id": "high-cube-height",
    "title": "高箱不是更长",
    "text": "常见 40HC 与 40GP 的外长和外宽相同，外高从约 2.591 m 增至约 2.896 m；45HC 则属于另一种更长规格。箱内净高和门洞高度仍须另查，不能用外高代替。",
    "example": "把 40GP 改为 40HC，新增的是高度空间；若货件超过实际内长，换成同长高箱不能解决。"
  },
  {
    "id": "special-versus-dangerous",
    "title": "特种箱不自动等于危险货",
    "text": "箱型说明设备结构，危险货属性取决于货物及适用分类与运输规定。罐箱可运适配的非危险液体，普通干货箱也可能装合规包装的危险货；残留空罐还需按实际状态判断。",
    "example": "食品级液体罐箱与装危险货的普通干货箱，需要核对不同资料，不能用“圆罐危险、方箱普通”分流。"
  },
  {
    "id": "dimensions",
    "title": "外廓、内尺寸、门洞与货物外廓",
    "text": "外廓用于设备、箱位和通行适配；内尺寸用于装载空间判断；门洞和顶开口决定能否装入；装载后货物突出部分形成新的实际外廓。四者需要分别记录，尺寸均有实箱差异。",
    "example": "货件能放进箱内，不一定能通过端门；开顶吊入以后，也可能因突出箱顶而需要超限占位。"
  },
  {
    "id": "empty-special",
    "title": "空箱状态不等于所有条件解除",
    "text": "空重状态、清洁残留、机组检验、危险货条件和可接收地点分别判断。冷藏空箱可能需要预检，折叠框架箱需要锁定检查，罐箱可能存在残留或清洁证明要求。",
    "example": "“特殊空箱”交接时先核对实际状态与接收依据，不能看到空箱标记就直接进入普通空箱堆区。"
  }
];
