// Fictional teaching conditions, not regulatory standards or operational authorizations.
export const readinessChecks = [
  {
    id: 'traffic', label: '海事通航管理与通航条件', phase: 'arrival',
    detail: '教学假设：已核对海事通航管理信息，以及天气等变化对本次通航条件的影响。资料变化时需重新核对；本项勾选不表示取得通行许可。',
  },
  {
    id: 'vessel', label: '船方状态', phase: 'arrival',
    detail: '教学假设：船方已核对本船状态和靠泊准备，相关资料与当前情况相符。船方状态与海事通航管理、泊位状态分别判断。',
  },
  {
    id: 'berth', label: '泊位条件', phase: 'arrival',
    detail: '教学假设：前一船已离泊，拟用泊位的占用、适配与接船安排已核对。计划靠泊时间或泊位看似空闲，均不能代替泊位条件核对。',
  },
  {
    id: 'services', label: '所需服务（适用时）', phase: 'arrival',
    detail: '教学假设：已核对本次靠泊适用的引航、拖轮等服务需求，所需服务已衔接；不适用的服务已明确。此项不意味着每次靠泊都必须使用同一组服务。',
  },
  {
    id: 'mooring', label: '系缆靠妥', phase: 'work',
    detail: '教学假设：船方与码头已核对系缆靠妥状态。靠妥只说明这一项条件，仍需分别核对船岸接口及相应作业的货物与计划条件。',
  },
  {
    id: 'interface', label: '船岸接口与作业准备', phase: 'work',
    detail: '教学假设：与本次作业相关的船岸接口、设备衔接、沟通与安全准备已核对。船已靠妥不能代替接口和作业准备。',
  },
  {
    id: 'cargo', label: '相应作业的货物与计划条件', phase: 'work',
    detail: '教学假设：已核对本次装卸对应的货批、作业计划、接收或储存衔接，以及适用的监管与检验检疫安排。本项不等于必须全部海关放行才可卸船，卸船条件与后续提货、交付条件应分别理解。',
  },
];

export const readinessCases = [
  {
    id: 'direct', title: '条件具备，示例可直靠',
    story: '本教学情景已核对海事通航管理信息与通航条件、船方状态、泊位条件及适用的所需服务，设定船舶可直接靠泊，无须先锚泊。船尚未靠妥，后续装卸准备仍待核对。',
    checked: ['traffic', 'vessel', 'berth', 'services'],
    lesson: '锚泊不是每次到港的必经环节。四项靠泊前条件齐备，不代表系缆、接口与货物条件已齐；页面只展示教学假设，不生成通行或开工授权。',
  },
  {
    id: 'weather', title: '通航条件变化，重新核对',
    story: '天气等通航条件发生变化，原有通航资料不再足以支持当前教学假设，因此撤下通航条件勾选。船方、泊位和适用服务条件在本例仍保留。',
    checked: ['vessel', 'berth', 'services'],
    lesson: '需重新核对海事通航管理信息与变化后的通航条件。船方、泊位和服务条件不能代替该项核对，之前的完整状态也不能沿用为当前结论；本例不作通行决定。',
  },
  {
    id: 'occupied', title: '前一船未离泊，泊位条件未齐',
    story: '本例的通航、船方及适用服务条件已核对，但前一船尚未离泊，拟用泊位仍被占用，泊位条件尚未齐备。',
    checked: ['traffic', 'vessel', 'services'],
    lesson: '预计离泊时间不能代替实际泊位状态。泊位占用与海事通航管理分别核对；等待方式由相关责任方结合实际安排，本例不规定必须锚泊，也不提供操船指令。',
  },
  {
    id: 'secured', title: '系缆靠妥，装卸条件仍待核对',
    story: '本例保留四项靠泊前条件，并设定船舶已系缆靠妥；船岸接口与作业准备、相应作业的货物与计划条件尚未齐备。',
    checked: ['traffic', 'vessel', 'berth', 'services', 'mooring'],
    lesson: '靠妥不能替代接口与货物条件。货物项针对相应作业，不把全部海关放行设为卸船的统一前提；勾选齐全也只表示教学条件完整，不生成开工授权。',
  },
];
