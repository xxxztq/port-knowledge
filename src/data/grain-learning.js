// sources 为空表示本站教学管理归纳；非全国统一办理流程。
export const grainLearning = {
  "checked": "2026-11-22",
  "stageSources": {
    "grain-soybeans": {
      "identify": [
        "grain-cn-rules-283",
        "grain-usda-quality"
      ],
      "eligibility": [
        "grain-cn-rules-283",
        "grain-cn-enterprises-146"
      ],
      "plan": [
        "grain-imo-code",
        "grain-imo-2026",
        "grain-cn-rules-283",
        "grain-port-equipment"
      ],
      "unload": [
        "grain-port-equipment",
        "grain-port-container",
        "grain-cn-rules-283",
        "grain-niosh-controls"
      ],
      "quality": [
        "grain-cn-rules-283",
        "grain-usda-quality"
      ],
      "store": [
        "grain-cn-enterprises-146",
        "grain-fao-storage",
        "grain-niosh-controls"
      ],
      "deliver": [
        "grain-cn-enterprises-146",
        "grain-port-container"
      ],
      "settle": []
    },
    "grain-maize": {
      "identify": [
        "grain-cn-rules-283",
        "grain-usda-quality"
      ],
      "eligibility": [
        "grain-cn-rules-283",
        "grain-cn-enterprises-146"
      ],
      "plan": [
        "grain-imo-code",
        "grain-imo-2026",
        "grain-cn-rules-283",
        "grain-port-equipment"
      ],
      "unload": [
        "grain-port-equipment",
        "grain-port-container",
        "grain-cn-rules-283",
        "grain-niosh-controls"
      ],
      "quality": [
        "grain-cn-rules-283",
        "grain-usda-quality",
        "grain-who-mycotoxins"
      ],
      "store": [
        "grain-cn-enterprises-146",
        "grain-fao-storage",
        "grain-niosh-controls",
        "grain-who-mycotoxins"
      ],
      "deliver": [
        "grain-cn-enterprises-146",
        "grain-port-container"
      ],
      "settle": []
    },
    "grain-wheat": {
      "identify": [
        "grain-cn-rules-283",
        "grain-usda-quality"
      ],
      "eligibility": [
        "grain-cn-rules-283",
        "grain-cn-enterprises-146"
      ],
      "plan": [
        "grain-imo-code",
        "grain-imo-2026",
        "grain-cn-rules-283",
        "grain-port-equipment"
      ],
      "unload": [
        "grain-port-equipment",
        "grain-port-container",
        "grain-cn-rules-283",
        "grain-niosh-controls"
      ],
      "quality": [
        "grain-cn-rules-283",
        "grain-usda-quality",
        "grain-who-mycotoxins"
      ],
      "store": [
        "grain-cn-enterprises-146",
        "grain-fao-storage",
        "grain-niosh-controls",
        "grain-who-mycotoxins"
      ],
      "deliver": [
        "grain-cn-enterprises-146",
        "grain-port-container"
      ],
      "settle": []
    }
  },
  "comparison": [
    {
      "id": "grain-soybeans",
      "name": "大豆",
      "quality": "蛋白、油含量、水分、杂质及损伤状况",
      "destination": "指定油脂加工企业或符合本票条件的食品加工企业",
      "inventory": "把不同货主、产地、用途与待检状态分开记录；对仓内温湿相关记录、异味或发热迹象及时反馈，保留与原货批的关系。"
    },
    {
      "id": "grain-maize",
      "name": "玉米",
      "quality": "水分、杂质、破碎及损伤状况、约定淀粉等品质项目",
      "destination": "本票指定的饲料、食品或其他加工企业",
      "inventory": "按用途、货主及品质状态分仓管理，记录水湿、温度变化和虫害线索；对待检或受限批次限制交付。"
    },
    {
      "id": "grain-wheat",
      "name": "小麦",
      "quality": "水分、杂质、损伤状况、约定蛋白及湿面筋等项目",
      "destination": "本票指定的面粉或其他加工企业",
      "inventory": "按货主、来源、合同品质和受限状态管理仓位，任何合批或移仓均保留组成与授权记录。"
    }
  ],
  "documents": [
    {
      "name": "提运单与贸易资料",
      "role": "定位货票、运输关系和交易约定。",
      "boundary": "是否足以支持交付，还要按有效商业授权、合同及具体单证判断；货批号不是所有权证书。",
      "sources": []
    },
    {
      "name": "检疫许可与适用证书",
      "role": "核对来源、用途、拟运往指定企业及该货批适用的检疫条件。",
      "boundary": "进境粮食检疫许可按规定应在签订贸易合同前办理；取得许可不等于完成到港检验检疫。",
      "sources": [
        "grain-cn-rules-283",
        "grain-cn-enterprises-146"
      ]
    },
    {
      "name": "样品交接与品质报告",
      "role": "说明对哪个范围的货取样、检测了什么、采用何种方法与结果基准。",
      "boundary": "美国农业部手册只支持品质项目的理解；商业报告不自动替代中国海关结论。",
      "sources": [
        "grain-usda-quality",
        "grain-cn-rules-283"
      ]
    },
    {
      "name": "生产任务与库存账",
      "role": "把船舱、输送线路、仓位、原货批和出库子批连起来。",
      "boundary": "字段与接口由实际港口部署决定。平台有记录，不等于主管主体已经批准相关操作。",
      "sources": [
        "grain-port-equipment",
        "grain-cn-enterprises-146"
      ]
    },
    {
      "name": "有效提货指令与接收回执",
      "role": "说明由谁授权、交给谁、交了多少，以及实际到达的指定企业。",
      "boundary": "商业交付授权与监管允许的去向分别核对；临时换厂不能只改运输备注。",
      "sources": [
        "grain-cn-enterprises-146"
      ]
    }
  ],
  "equipment": [
    {
      "id": "unloader",
      "name": "卸船设备",
      "person": "卸船岗位＋计划岗位",
      "text": "把船上的粮接入岸线。类型与可用条件需结合船、货和码头确认。",
      "record": "这一舱的粮，对应哪一项接卸任务？",
      "sources": [
        "grain-port-equipment"
      ]
    },
    {
      "id": "conveyor",
      "name": "输送线路",
      "person": "中控＋现场岗位",
      "text": "连接接卸点与接收仓。线路切换时，实物去向和批次记录需要同步。",
      "record": "从哪一舱，经哪条线，进哪一仓？",
      "sources": [
        "grain-port-container",
        "grain-port-equipment"
      ]
    },
    {
      "id": "weigh",
      "name": "计量与样品记录",
      "person": "计量＋检验岗位",
      "text": "计量记录数量，样品连接品质。两类记录都要注明范围、时间和依据。",
      "record": "这一个数、这份报告，代表哪批粮？",
      "sources": [
        "grain-cn-rules-283",
        "grain-usda-quality"
      ]
    },
    {
      "id": "silo",
      "name": "粮仓与粮情记录",
      "person": "仓储＋质量岗位",
      "text": "记录实物位置、状态与变化。存入仓里后，质量与可交付条件仍需跟踪。",
      "record": "在库量、受限量和可交付量有何区别？",
      "sources": [
        "grain-fao-storage",
        "grain-cn-enterprises-146"
      ]
    },
    {
      "id": "outbound",
      "name": "装运与交接设施",
      "person": "交付＋承运＋接收企业",
      "text": "可能接汽车、船或装箱后接铁路；交接载体变化仍要保留货批与指定去向。",
      "record": "这次出库的粮，最后交到了哪里？",
      "sources": [
        "grain-port-container",
        "grain-cn-enterprises-146"
      ]
    }
  ],
  "approvals": [
    {
      "title": "商业交付授权",
      "who": "有权交付方及相关合同主体",
      "question": "这批货可以交给这个收货人吗？",
      "text": "核对有效指令、货主、数量和接收人。有付款凭证或车牌识别结果，也不能自动解决货权与交付争议。",
      "sources": []
    },
    {
      "title": "适用的监管状态",
      "who": "海关等相应监管主体",
      "question": "本票粮的进境、检验检疫和去向条件满足了吗？",
      "text": "许可、证单、查验与后续调运各有作用。指定企业需要按公告完成相关审核，收到申报不等于放行。",
      "sources": [
        "grain-cn-rules-283",
        "grain-cn-enterprises-146"
      ]
    },
    {
      "title": "本次作业条件",
      "who": "船方、码头计划与现场责任岗位",
      "question": "本次船岸和装运任务具备实施条件吗？",
      "text": "确认船舶文件、设备、仓位与现场条件。商业授权和海关结果均不能替代安全条件或本单位所需的作业许可。",
      "sources": [
        "grain-imo-code",
        "grain-imo-2026",
        "grain-niosh-controls"
      ]
    }
  ]
};
