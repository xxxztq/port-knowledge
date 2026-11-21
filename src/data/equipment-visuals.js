// 原创设备教学示意，非工程图。正文依据 knowledge.js 的 12 篇设备文章。
// 坐标以完整 800 × 480 viewBox 为基准：left = x%，top = y%。
// 图片应保持 5:3 比例并完整显示；裁切图片会导致覆盖点位失准。
// 所有 SVG 的编号圆心与下列 points 坐标一一对应。
export const equipmentVisuals = [
  {
    "id": "eq-sts",
    "shortName": "岸桥",
    "english": "Ship-to-shore crane",
    "category": "船岸装卸",
    "image": "illustrations/equipment/sts.svg",
    "summary": "以吊具连接船舶与岸侧交接位置，岸桥的一吊需要运输与堆场同步。",
    "points": [
      {
        "n": 1,
        "x": 15,
        "y": 20,
        "title": "臂架与小车",
        "description": "臂架伸向船舶，小车沿梁移动，将吊具送到相应作业位置。"
      },
      {
        "n": 2,
        "x": 21,
        "y": 50,
        "title": "吊具与箱体",
        "description": "吊具连接适用集装箱；图中只示意一个箱子的船岸转移。"
      },
      {
        "n": 3,
        "x": 81,
        "y": 80,
        "title": "岸侧交接",
        "description": "岸桥与集卡、自动运输车辆或配套缓冲设施衔接，具体方式依码头配置。"
      }
    ],
    "facts": [
      {
        "label": "在哪里",
        "value": "码头前沿，船舶与岸侧之间。"
      },
      {
        "label": "接什么任务",
        "value": "依据船舶作业安排，在船上位置与岸侧位置之间转移集装箱。"
      },
      {
        "label": "交给谁",
        "value": "岸侧运输设备或船舶目标箱位，并反馈实际作业结果。"
      }
    ],
    "comparison": "岸桥跨接船岸，场桥主要在堆场箱位与交接车辆之间搬运。"
  },
  {
    "id": "eq-rtg",
    "shortName": "轮胎式场桥",
    "english": "Rubber-tyred gantry crane",
    "category": "堆场作业",
    "image": "illustrations/equipment/rtg.svg",
    "summary": "轮胎支承的门架跨在箱区上方，在堆位与交接车辆之间堆取箱。",
    "points": [
      {
        "n": 1,
        "x": 13,
        "y": 30,
        "title": "跨箱区门架",
        "description": "门架跨越箱区，小车与吊具在梁下完成适用箱位的搬运。"
      },
      {
        "n": 2,
        "x": 15,
        "y": 80,
        "title": "轮胎行走机构",
        "description": "轮胎支承与行走使设备在满足道路、地面和供能条件时具备转场可能。"
      },
      {
        "n": 3,
        "x": 83,
        "y": 50,
        "title": "堆位与车辆交接",
        "description": "吊具在目标箱位与车辆交接位置之间搬箱，实际完成后需更新箱位记录。"
      }
    ],
    "facts": [
      {
        "label": "在哪里",
        "value": "集装箱堆场箱区及其车辆交接位置。"
      },
      {
        "label": "接什么任务",
        "value": "接收堆场堆取箱指令，核对目标箱位与车辆。"
      },
      {
        "label": "交给谁",
        "value": "堆位或运输车辆，并将实际箱位回写作业记录。"
      }
    ],
    "comparison": "RTG依靠轮胎行走；RMG沿轨道运行，两者的供能和自动化程度都需另看配置。"
  },
  {
    "id": "eq-rmg",
    "shortName": "轨道式场桥",
    "english": "Rail-mounted gantry crane",
    "category": "堆场作业",
    "image": "illustrations/equipment/rmg.svg",
    "summary": "轨道限定设备的服务区域，场桥在箱区与指定交接位置之间搬箱。",
    "points": [
      {
        "n": 1,
        "x": 14.5,
        "y": 45,
        "title": "固定服务门架",
        "description": "门架服务范围受跨度、轨道及结构布局共同约束。"
      },
      {
        "n": 2,
        "x": 15.5,
        "y": 80,
        "title": "轨道与行走机构",
        "description": "轮组沿轨道运行，图中刻意保留轨道线以区别轮胎式场桥。"
      },
      {
        "n": 3,
        "x": 86,
        "y": 40,
        "title": "侧面交接示意",
        "description": "此图采用侧面交接构图；实际项目也可能在箱区端部或铁路位置交接。"
      }
    ],
    "facts": [
      {
        "label": "在哪里",
        "value": "有轨道的堆场箱区，也可见于铁路等交接场景。"
      },
      {
        "label": "接什么任务",
        "value": "沿规定服务范围接收堆取箱与车辆或铁路交接任务。"
      },
      {
        "label": "交给谁",
        "value": "指定箱位、车辆或铁路交接位置，并同步完成记录。"
      }
    ],
    "comparison": "RMG的行走范围受轨道约束；轨道式名称本身不代表已实现自动化。"
  },
  {
    "id": "eq-reachstacker",
    "shortName": "正面吊",
    "english": "Reach stacker",
    "category": "堆场作业",
    "image": "illustrations/equipment/reachstacker.svg",
    "summary": "伸缩臂调整吊具位置，车辆底盘让集装箱搬运接近不同作业面。",
    "points": [
      {
        "n": 1,
        "x": 39,
        "y": 20,
        "title": "伸缩臂",
        "description": "通过臂架伸缩与角度变化调整吊具位置；允许工况需查对应设备资料。"
      },
      {
        "n": 2,
        "x": 85,
        "y": 40,
        "title": "顶部吊具",
        "description": "图示吊具连接箱体顶部，实际箱型与附件适用范围按设备配置确认。"
      },
      {
        "n": 3,
        "x": 14,
        "y": 80,
        "title": "车辆底盘",
        "description": "轮胎把荷载传到地面，行驶、转向与作业需要合适的场地和交通组织。"
      }
    ],
    "facts": [
      {
        "label": "在哪里",
        "value": "集装箱堆场、联运场站等可供车辆作业的区域。"
      },
      {
        "label": "接什么任务",
        "value": "按任务从作业面接近集装箱，将其转移到适用位置。"
      },
      {
        "label": "交给谁",
        "value": "目标堆位或交接车辆，并记录箱号、箱况与实际位置。"
      }
    ],
    "comparison": "正面吊用伸缩臂接近箱体；门架式空箱堆高机依靠立式门架与适用取箱装置。"
  },
  {
    "id": "eq-empty-handler",
    "shortName": "空箱堆高机",
    "english": "Empty container handler",
    "category": "堆场作业",
    "image": "illustrations/equipment/empty-handler.svg",
    "summary": "面向适用空箱的专用搬运设备，把堆放位置与空箱周转连接起来。",
    "points": [
      {
        "n": 1,
        "x": 41,
        "y": 20,
        "title": "立式门架",
        "description": "图示一种常见门架式外形，取箱装置沿门架升降。"
      },
      {
        "n": 2,
        "x": 85,
        "y": 50,
        "title": "空箱取箱装置",
        "description": "图示侧向取箱形式，仅帮助辨认；具体抓取方式和多箱能力取决于型号。"
      },
      {
        "n": 3,
        "x": 14.5,
        "y": 40,
        "title": "空箱堆位",
        "description": "空箱堆放后仍需关联箱号、箱型与箱况，物理为空不等于已获放箱授权。"
      }
    ],
    "facts": [
      {
        "label": "在哪里",
        "value": "空箱堆场及适用的空箱交接区域。"
      },
      {
        "label": "接什么任务",
        "value": "接收适用空箱的搬运与堆叠任务，核对箱号与箱况。"
      },
      {
        "label": "交给谁",
        "value": "空箱堆位或交接车辆，箱况异常再衔接箱管或业务人员。"
      }
    ],
    "comparison": "空箱堆高机有明确的适用载荷边界，不能凭外观相似就代替搬运重箱的设备。"
  },
  {
    "id": "eq-truck",
    "shortName": "集装箱集卡",
    "english": "Container tractor & trailer",
    "category": "水平运输",
    "image": "illustrations/equipment/truck.svg",
    "summary": "牵引车与挂车承担箱子的水平接送，两端交接需要与装卸任务同步。",
    "points": [
      {
        "n": 1,
        "x": 17,
        "y": 40,
        "title": "牵引车",
        "description": "牵引车提供移动能力，场内车辆与港外车队的任务身份、区域和准入条件可能不同。"
      },
      {
        "n": 2,
        "x": 58,
        "y": 20,
        "title": "箱体与挂车",
        "description": "挂车承接集装箱；箱体固定、车辆适配与装卸结果须按适用要求核对。"
      },
      {
        "n": 3,
        "x": 85,
        "y": 80,
        "title": "水平接续",
        "description": "车辆把箱送到目标交接点，驶离作业点本身不代表作业记录已经完整。"
      }
    ],
    "facts": [
      {
        "label": "在哪里",
        "value": "岸边、堆场交接位置及获准通行的港区或港外道路。"
      },
      {
        "label": "接什么任务",
        "value": "按运输任务接送指定集装箱，与两端起重设备和箱位同步。"
      },
      {
        "label": "交给谁",
        "value": "岸桥、堆场设备或陆侧交接点，并反馈实际装卸结果。"
      }
    ],
    "comparison": "集卡通常以牵引车和挂车配合运输；AGV由任务、定位与控制系统组织自动运行。"
  },
  {
    "id": "eq-agv",
    "shortName": "自动导引运输车",
    "english": "Automated guided vehicle",
    "category": "水平运输",
    "image": "illustrations/equipment/agv.svg",
    "summary": "低矮承载平台接收系统运输任务，在适用区域衔接岸桥与堆场。",
    "points": [
      {
        "n": 1,
        "x": 14,
        "y": 60,
        "title": "承载平台",
        "description": "图示无驾驶室的平台式运输外形；是否具备自行升降能力需看具体车型。"
      },
      {
        "n": 2,
        "x": 85,
        "y": 50,
        "title": "定位与感知示意",
        "description": "感知、定位与控制配合组织车辆运行，图中部件位置不代表某一项目配置。"
      },
      {
        "n": 3,
        "x": 48,
        "y": 80,
        "title": "任务与运行区域",
        "description": "车辆依系统任务前往交接位置，并受路线、隔离、供能与设备协同条件约束。"
      }
    ],
    "facts": [
      {
        "label": "在哪里",
        "value": "具备配套调度、定位及现场管理条件的自动化作业区域。"
      },
      {
        "label": "接什么任务",
        "value": "接收指定箱号、起点与终点的水平运输任务。"
      },
      {
        "label": "交给谁",
        "value": "岸桥、堆场起重设备或配套交接设施，并回传实际任务状态。"
      }
    ],
    "comparison": "AGV承担系统组织的水平运输；自动行驶并不意味着车辆可自行完成全部装卸。"
  },
  {
    "id": "eq-unloader",
    "shortName": "卸船机",
    "english": "Ship unloader",
    "category": "船岸装卸",
    "image": "illustrations/equipment/ship-unloader.svg",
    "summary": "从船舱取出散料，再通过岸侧接收设施送入后续输送系统。",
    "points": [
      {
        "n": 1,
        "x": 18,
        "y": 50,
        "title": "抓斗取料",
        "description": "本图选择抓斗式工艺：抓斗循环取料、提升和卸料；连续卸船机采用不同取料机构。"
      },
      {
        "n": 2,
        "x": 86,
        "y": 50,
        "title": "岸侧接料斗",
        "description": "接料斗接住船舱取出的物料，再与后续输送设施衔接。"
      },
      {
        "n": 3,
        "x": 85,
        "y": 80,
        "title": "后续输送线",
        "description": "输送线与堆场或筒仓需要具备接收条件，上下游受阻会影响卸船安排。"
      }
    ],
    "facts": [
      {
        "label": "在哪里",
        "value": "散货船舶与码头岸侧接收系统之间。"
      },
      {
        "label": "接什么任务",
        "value": "按船舱与货物条件接收散料卸船任务，衔接接料和输送环节。"
      },
      {
        "label": "交给谁",
        "value": "岸侧输送线及后续堆场、仓库或筒仓。"
      }
    ],
    "comparison": "本图为抓斗式卸船机；岸桥用适用吊具搬箱，连续卸船机则采用另一类取料工艺。"
  },
  {
    "id": "eq-stacker",
    "shortName": "堆取料机",
    "english": "Stacker / reclaimer",
    "category": "散液货",
    "image": "illustrations/equipment/stacker-reclaimer.svg",
    "summary": "把输送线与散货堆位相连，堆料与取料分别承接进入和发出的任务。",
    "points": [
      {
        "n": 1,
        "x": 79,
        "y": 30,
        "title": "斗轮取料端",
        "description": "图示斗轮式设备的一种外形，轮端与料堆接触取料，实际取料方式因设备而异。"
      },
      {
        "n": 2,
        "x": 55,
        "y": 20,
        "title": "臂架与输送带",
        "description": "臂架连接作业端与主体，输送带衔接物料；是否兼具堆取料功能需看设计。"
      },
      {
        "n": 3,
        "x": 17,
        "y": 70,
        "title": "堆场输送接口",
        "description": "进出堆场的输送线路与批次、堆位记录一同组织，避免只看料堆而忽略流向。"
      }
    ],
    "facts": [
      {
        "label": "在哪里",
        "value": "散货堆场，连接料堆与进出场输送线路。"
      },
      {
        "label": "接什么任务",
        "value": "按堆位与批次安排接收堆料或取料任务。"
      },
      {
        "label": "交给谁",
        "value": "指定料堆或后续输送线，并关联批次与堆位记录。"
      }
    ],
    "comparison": "堆料把物料送入料堆，取料把物料送出；兼具两种功能不代表可同时执行。"
  },
  {
    "id": "eq-pump-tank",
    "shortName": "泵管罐系统",
    "english": "Pumps, pipelines & tanks",
    "category": "散液货",
    "image": "illustrations/equipment/pump-tank.svg",
    "summary": "泵提供输送作用，管线连接路径，阀门与储罐共同衔接液货接收和发运。",
    "points": [
      {
        "n": 1,
        "x": 33,
        "y": 50,
        "title": "泵与驱动",
        "description": "泵承担适用介质的输送作用，图中仅表示功能连接，不提供启停或压力参数。"
      },
      {
        "n": 2,
        "x": 56,
        "y": 45,
        "title": "管线、阀门与计量",
        "description": "通路控制与计量记录共同关联来源、货物批次和接收地点；图示不表示实际切换顺序。"
      },
      {
        "n": 3,
        "x": 85,
        "y": 25,
        "title": "接收储罐",
        "description": "储罐用于接收、储存与发运缓冲，能否接收还取决于介质兼容及专业条件。"
      }
    ],
    "facts": [
      {
        "label": "在哪里",
        "value": "液货码头船岸接口与岸侧储运设施之间。"
      },
      {
        "label": "接什么任务",
        "value": "把货物批次、适用输送路径与接收地点关联后组织输送。"
      },
      {
        "label": "交给谁",
        "value": "适用储罐、船舶或后续储运设施，并完成数量与批次交接。"
      }
    ],
    "comparison": "液货依靠适用泵管系统连续输送；常温储罐外形不能直接套用到全部液化气或化学品。"
  },
  {
    "id": "eq-gate",
    "shortName": "闸口系统",
    "english": "Terminal gate system",
    "category": "闸口交接",
    "image": "illustrations/equipment/gate-system.svg",
    "summary": "识别设备提供观察结果，业务系统匹配任务与条件，道闸执行通行动作。",
    "points": [
      {
        "n": 1,
        "x": 14.5,
        "y": 40,
        "title": "识别与现场采集",
        "description": "门架摄像机示意车牌和箱号识别；车道中的称重等设施按项目配置选用。"
      },
      {
        "n": 2,
        "x": 88,
        "y": 60,
        "title": "信息与交互终端",
        "description": "显示、对讲等设备辅助现场沟通，识别数据还需与任务、授权及适用条件匹配。"
      },
      {
        "n": 3,
        "x": 15.5,
        "y": 80,
        "title": "道闸与通过记录",
        "description": "道闸执行通行动作；发出指令、抬杆、车辆通过与记录完成是不同事件。"
      }
    ],
    "facts": [
      {
        "label": "在哪里",
        "value": "港区或场站陆侧车辆进出通道。"
      },
      {
        "label": "接什么任务",
        "value": "采集车辆与箱体信息，配合系统核对本次任务及节点条件。"
      },
      {
        "label": "交给谁",
        "value": "获准进入的后续作业区域或出场交接环节，并留下实际通行记录。"
      }
    ],
    "comparison": "摄像机识别成功只提供现场数据，不能单独代表业务授权或完整交接已经完成。"
  },
  {
    "id": "eq-conveyor",
    "shortName": "皮带输送机",
    "english": "Belt conveyor",
    "category": "散液货",
    "image": "illustrations/equipment/belt-conveyor.svg",
    "summary": "连续带面连接散货接收与发运，转接点和下游接收能力影响整条线路。",
    "points": [
      {
        "n": 1,
        "x": 18,
        "y": 20,
        "title": "上游进料",
        "description": "物料从料斗等上游设施进入带面，来源、批次与目标去向应和任务对应。"
      },
      {
        "n": 2,
        "x": 48,
        "y": 30,
        "title": "带面与支承",
        "description": "运行带面承载适用散料，滚动部件、驱动和保护设施共同支持输送。"
      },
      {
        "n": 3,
        "x": 87,
        "y": 50,
        "title": "转接与接收",
        "description": "图示溜槽向下一段皮带交料；前后接收能力和残留物管理都会影响作业衔接。"
      }
    ],
    "facts": [
      {
        "label": "在哪里",
        "value": "散货卸船、堆存、仓储与发运设备之间的输送线路。"
      },
      {
        "label": "接什么任务",
        "value": "接收适用散料的连续输送任务，匹配来源、路线与目的地。"
      },
      {
        "label": "交给谁",
        "value": "下一段输送机、料堆、仓库或发运设备，并衔接批次记录。"
      }
    ],
    "comparison": "皮带输送机负责沿线路运料，堆取料机负责连接输送线路与具体料堆。"
  }
];
