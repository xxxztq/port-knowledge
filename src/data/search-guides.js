// Editorial navigation phrases point to existing explanations, not interchangeable business terms.
export const searchGuides = [
  {
    id: 'pink-container',
    phrases: ['粉色集装箱', '粉红色集装箱', '粉红集装箱', '粉色箱子', '粉红色箱子', '洋红色集装箱', '粉红色的集装箱', '粉红色集装箱是什么公司', '粉色集装箱是什么牌子'],
    targets: [{path: 'brands/#pink-container', note: '从 ONE 的洋红色箱认识涂装，再区分承运人、箱体相关主体与制造商。'}],
  },
  {
    id: 'panda-container',
    phrases: ['熊猫箱', '熊猫箱子', '熊猫集装箱', '熊猫箱子是什么牌子'],
    targets: [{path: 'brands/#panda-container', note: '查看“熊猫箱”的辨认线索；图案、吉祥物与箱主身份需要分别核对。'}],
  },
  {
    id: 'gate-blocked',
    phrases: ['不抬杆', '抬杆', '道闸不抬杆', '道闸为什么不抬杆', '闸口为什么不抬杆', '为什么不抬杆', '为什么不能出闸', '闸口不开', '闸口抬杆'],
    targets: [
      {path: 'gate/#sim-title', note: '进入闸口模拟，逐项查看本次任务的授权、作业条件、道闸与实际通行记录。'},
      {path: 'knowledge/gate-authority/', note: '先分清交付授权与车辆通行，再判断当前阻断应由谁处理。'},
    ],
  },
  {
    id: 'customs-delivery',
    phrases: ['海关已经放行为什么还不能提箱', '海关放行为什么不能提箱', '海关放行了为什么不能提货', '海关放行为什么还不能提箱', '海关放行还不能提箱', '海关放行后能直接提箱吗', '海关放行后为什么还不能提箱', '海关放行以后为什么还不能提箱', '海关放行了为什么还不能提箱'],
    targets: [
      {path: 'knowledge/gate-authority/', note: '海关监管、承运人交付授权、码头作业与通行条件分别核对。'},
      {path: 'gate/#sim-title', note: '在教学模拟中观察：一个条件满足后，其他条件是否仍待确认。'},
    ],
  },
  {
    id: 'booking-change',
    phrases: ['甩柜', '被甩柜', '甩柜怎么办', '箱子没上船', '集装箱没赶上船'],
    targets: [{path: 'scenarios/booking-change-and-return/', note: '相关场景：改船、落装与退运。先确认实际位置与未装原因，再分别核对变更安排；这些说法不直接等同。'}],
  },
  {
    id: 'equipment-failure',
    phrases: ['设备坏了谁负责', '设备坏了谁来协调', '岸桥坏了怎么办', '设备故障谁处理'],
    targets: [
      {path: 'scenarios/quay-crane-failure-recovery/', note: '跟随岸桥故障案例，看现场报告、生产调整、工程处理与恢复交接。'},
      {path: 'knowledge/job-engineer/', note: '认识工程设备岗位的职责，以及技术恢复与生产恢复的区别。'},
    ],
  },
  {
    id: 'port-income',
    phrases: ['港口怎么赚钱', '港口靠什么赚钱', '港口的利润从哪里来', '港口利润从哪来'],
    targets: [{path: 'economics/', note: '把实际提供的服务、收入、成本和利润放在一起看，并区分经营主体。'}],
  },
  {
    id: 'return-fees',
    phrases: ['箱子晚还几天费用算谁的', '还箱晚了怎么算钱', '晚还箱费用', '滞箱费', '免箱期'],
    targets: [{path: 'knowledge/fees-storage/', note: '区分场地堆存与箱体使用相关费用；具体计费起止、承担方和约定需分别核对。'}],
  },
  {
    id: 'container-after-discharge',
    phrases: ['箱子卸船后去哪', '箱子从船上卸下来后去哪了', '卸船后箱子在哪里'],
    targets: [{path: 'journey/', note: '沿进口箱旅程查看实物位置、岗位交接与信息记录。'}],
  },
];

export const searchQuestions = ['粉红色集装箱', '道闸为什么不抬杆', '海关放行为什么还不能提箱', '设备坏了谁来协调'];
