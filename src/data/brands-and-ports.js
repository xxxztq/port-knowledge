export const brandsAndPortsReviewedOn = '2026-11-23';

export const brandPortSources = [
  { id: 'sipg-services', title: 'Our Services', organization: 'Shanghai International Port Group', url: 'https://en.portshanghai.com.cn/OurServices/index.jhtml', scope: '上海港经营服务与码头分布的官方动态介绍；用于说明业务类型，不引用未经核对的实时排名。' },
  { id: 'sipg-report', title: '2025 Annual Report', organization: 'Shanghai International Port Group', url: 'https://en.portshanghai.com.cn/wenku/www/202604/07132932iuzv.pdf', scope: '2025 年报用于核对上港集团业务及区位背景；本专题不摘录吞吐量排名。' },
  { id: 'sipg-waigaoqiao', title: 'SECT Terminal Profile', organization: '上海沪东集装箱码头有限公司（SECT）', url: 'https://hudong.portshanghai.com.cn/u/cms/www/202008/10090343olir.pdf', scope: '上港集团官方码头资料说明 SECT 经营外高桥四期。该资料为企业介绍，不是当日泊位或预约指引。' },
  { id: 'shanghai-east-terminal', title: 'Our Terminal · SECT', organization: 'APM Terminals', url: 'https://akamai.apmterminals.com/en/shanghai/about/our-terminal', scope: 'APM Terminals 当前介绍 SECT 与上港集团的合资关系及码头设备、智能闸口和 EDI/RFID；动态设施数据会变动。' },
  { id: 'shanghai-hudong-company', title: '关于我们', organization: '上海沪东集装箱码头有限公司', url: 'https://www.sect.com.cn/aboutus', scope: '码头公司使用的中文全称及其集装箱装卸、中转、仓储等业务范围。' },
  { id: 'maersk-apm', title: 'Annual Report 2024', organization: 'A.P. Moller - Maersk', url: 'https://www.maersk.com/~/media_sc9/maersk/news/press-releases/files/2025/02/maersk-annual-report-2024.pdf', scope: '2024 年报以 APM Terminals 说明集团的港口与码头业务；作为企业结构案例，不替代最新公司登记或单票合同。' },
  { id: 'ningbo-overview', title: 'Port Overview', organization: 'Ningbo Zhoushan Port Company', url: 'https://www.nbport.com.cn/gfww/gsjs/gkgk2/', scope: '港区组成、区位与港口业务的官方动态介绍；页面统计数字不作为本专题的横向排名。' },
  { id: 'ningbo-terminals', title: 'Terminal Business', organization: 'Ningbo Zhoushan Port Company', url: 'https://www.nbport.com.cn/gfww/gsyw/mtbk/', scope: '专业码头与货类业务的官方动态介绍；具体泊位能力须回到对应码头资料核对。' },
  { id: 'ningbo-shulanghu', title: '公司简介', organization: '舟山鼠浪湖码头有限公司', url: 'https://www.nbport.com.cn/slh/gywm/jtjj/', scope: '码头企业自述其投资关系与矿石装卸、中转及混配业务，展示宁波舟山港网络中的专业干散货码头。' },
  { id: 'shanghai-port-authority', title: '上海港口经营管理实施办法', organization: '上海市人民政府', url: 'https://www.shanghai.gov.cn/gwk/search/content/d5f91e208e684d65bd8e8c9955053946', scope: '用于区分行政管理职责与港口企业经营；不作为其他地区的统一规则。' },
];
export const portComparisons = [
  { id: 'shanghai', name: '上海港', subtitle: '长江口多港区综合港口网络', accent: 'teal', terminal: '外高桥四期集装箱码头', operator: '上海沪东集装箱码头有限公司（SECT）', label: '集装箱码头', cargo: '集装箱', equipment: '岸桥（STS）、场桥（RTG）、集卡与道口识别设备', systems: '码头运营方介绍使用箱号识别、RFID 扫描与 EDI 支撑智能闸口；这是该企业的公开案例，不是所有港口的统一配置。', operations: ['船舶靠泊，岸桥装卸船箱', '场桥与集卡按计划在堆场倒运、定位', '道口识别箱号并交换进出场作业信息'], lesson: '外高桥四期由 SECT 经营；APM Terminals（马士基旗下独立码头业务）公开称持有 49%，上港集团是另一合资方。班轮运输与码头投资运营是不同业务；并非所有马士基箱都由 SECT 装卸。外高桥其他期和洋山也各有主体。', sources: ['sipg-services', 'sipg-report', 'sipg-waigaoqiao', 'shanghai-east-terminal', 'shanghai-hudong-company', 'maersk-apm', 'shanghai-port-authority'] },
  { id: 'ningbo-zhoushan', name: '宁波舟山港', subtitle: '同一港口网络包含不同专业码头', accent: 'green', terminal: '鼠浪湖矿石中转码头', operator: '舟山鼠浪湖码头有限公司', label: '铁矿石专业码头', cargo: '铁矿石等干散货', equipment: '卸船机、堆取料机、输送系统与装船机', systems: '作业关注船舶计划、货物批次、库存位置、计量与品质记录；页面仅讲业务数据类别，不假定所有码头使用相同系统或接口。', operations: ['按货种和卸船计划接卸铁矿石', '分批堆存，并按订单组织混配、筛分等服务', '按提货与装船计划复核数量和货物去向'], lesson: '鼠浪湖不是普通集装箱码头。它的货批、堆场、装卸和疏运围绕散货组织；要按货种找专业港区、码头和运输方式。', sources: ['ningbo-overview', 'ningbo-terminals', 'ningbo-shulanghu'] },
];
