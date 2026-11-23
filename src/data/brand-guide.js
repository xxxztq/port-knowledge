export const brandCategories = ['全部', '班轮承运人', '箱体资产', '箱体制造', '港口与码头'];

export const portBrands = [
  {
    id: 'maersk', category: '班轮承运人', name: '马士基', english: 'A.P. Moller - Maersk', mark: 'MAERSK', tone: 'maersk',
    summary: '从海运班轮起家，并提供海陆空与供应链物流服务。看到马士基箱，先把它当作品牌线索；具体一票运输的承运主体仍以订舱确认和提单为准。',
    clue: '找 MAERSK 字样和浅蓝底白色七角星；浅蓝是标志的配色，不代表整个箱身一定是蓝色。',
    distinction: '马士基集团的综合物流范围不等于每项服务都由同一个法律主体、同一艘船或同一座码头执行。',
    sources: ['maersk', 'maersk-star']
  },
  {
    id: 'cosco-lines', category: '班轮承运人', name: '中远海运集运', english: 'COSCO SHIPPING Lines', mark: 'COSCO', tone: 'cosco',
    summary: '中远海运集团旗下的集装箱班轮运输主体，业务以国内、国际集装箱运输及相关服务为主。',
    clue: '箱体上常见 COSCO SHIPPING 等字样；“中远海运”也可能泛指集团，不能据此认定是港口码头公司。',
    distinction: '中远海运集运和中远海运港口是不同业务主体：前者侧重班轮运输，后者侧重港口码头投资、运营与服务。',
    sources: ['cosco-lines', 'cosco-ports']
  },
  {
    id: 'oocl', category: '班轮承运人', name: '东方海外', english: 'OOCL', mark: 'OOCL', tone: 'oocl',
    summary: '以 OOCL 品牌提供集装箱运输与物流服务。东方海外与中远海运集运是不同的对外品牌和服务主体。',
    clue: '常见红色字样；涂装只能帮助初步辨认，实际承运安排以本票运输单证为准。',
    distinction: '即使航运品牌属于同一集团，订舱确认、提单和设备记录也不能只凭集团名互认。',
    sources: ['oocl']
  },
  {
    id: 'msc', category: '班轮承运人', name: '地中海航运', english: 'MSC Mediterranean Shipping Company', mark: 'MSC', tone: 'msc',
    summary: '大型集装箱航运与物流公司，官网介绍包括海运、陆运物流和港口码头投资等业务。',
    clue: '箱体常见 MSC 字标；集团业务较广，不能把所有写有 MSC 的业务都当成同一个现场执行部门。',
    distinction: '订舱/运输服务、箱体资产、码头投资和现场装卸是不同的业务关系，具体看本票合同与港区安排。',
    sources: ['msc']
  },
  {
    id: 'one', category: '班轮承运人', name: '海洋网联船务', english: 'Ocean Network Express (ONE)', mark: 'ONE', tone: 'one',
    summary: '总部位于新加坡的集装箱班轮公司。ONE 官方将洋红色列为品牌色，并展示其洋红色船舶和集装箱。',
    clue: '你说的“粉红色/玫红色箱子”，很可能是 ONE 的洋红色品牌箱；该颜色是品牌识别，不是箱型或所有权证明。',
    distinction: 'ONE 官方 Container World 说明了选择洋红色作为企业色的原因。也有其他企业使用粉色或定制涂装，不能只凭颜色下结论。',
    sources: ['one-color', 'one-media']
  },
  {
    id: 'cma-cgm', category: '班轮承运人', name: '达飞海运', english: 'CMA CGM', mark: 'CMA CGM', tone: 'cma',
    summary: '达飞集团旗下的集装箱航运品牌，承接普通箱、冷藏箱和超限货等海运业务。',
    clue: '先认箱身 CMA CGM 字样，再用订舱和提单核对本票服务；集团旗下不同品牌不一定使用同一个名称。',
    distinction: '集团有航运公司和码头公司，不代表挂靠的码头都是集团自营。',
    sources: ['cma-cgm']
  },
  {
    id: 'hapag-lloyd', category: '班轮承运人', name: '赫伯罗特', english: 'Hapag-Lloyd', mark: 'Hapag-Lloyd', tone: 'hapag',
    summary: '经营全球集装箱班轮运输。以它为例，可以用箱号、订舱号或提单号分别追踪设备和运输业务。',
    clue: '先看 Hapag-Lloyd 字样；品牌典型配色不等于每只箱都使用该配色。',
    distinction: '箱号指向设备，订舱号和提单号指向运输记录。仅知道箱号，不等于知道箱内装什么。',
    sources: ['hapag-lloyd', 'hapag-tracking']
  },
  {
    id: 'triton', category: '箱体资产', name: 'Triton', english: 'Triton International', mark: 'TRITON', tone: 'triton',
    summary: '专业集装箱租赁公司，向航运公司等客户出租或出售集装箱及相关设备。箱子可能由租赁公司持有，却涂有承运人的品牌。',
    clue: '箱体融资/租赁是船公司取得运力设备的一种方式；品牌字样不必然等于法律产权人。',
    distinction: '识别“谁在经营这票运输”和“谁拥有箱体资产”是两个问题，需要分别看运输单证与箱体/租赁记录。',
    sources: ['triton']
  },
  {
    id: 'cimc', category: '箱体制造', name: '中集集团', english: 'CIMC', mark: 'CIMC', tone: 'cimc',
    summary: '物流与能源装备制造企业，产品包括干货箱、冷藏箱、特种箱和罐式集装箱等。制造商制造箱体，不因此成为这票货的承运人。',
    clue: '箱体制造企业与租箱公司、班轮公司是不同环节；箱子交付后可能转售、出租或进入承运人的设备池。',
    distinction: '设备出厂铭牌或制造标识回答“谁制造/何时制造”，不能单独回答“本票由谁承运/当前谁有权放箱”。',
    sources: ['cimc']
  },
  {
    id: 'sipg', category: '港口与码头', name: '上海港 · 上港集团', english: 'Port of Shanghai / SIPG', mark: '上海港', tone: 'port',
    summary: '上海港是港口与港区体系的称呼；上港集团是重要的港口企业与码头运营商。不同码头、港区也可能由不同运营主体具体经营。',
    clue: '“上海港”不是一家单一的集装箱船公司；看到船公司的箱进了上海港，不意味着船公司就是码头运营方。',
    distinction: '看具体装卸作业，应继续落到港区、码头公司、泊位与码头系统，而不是停留在“上海港”这个地理名称。',
    sources: ['sipg']
  },
  {
    id: 'nbzh', category: '港口与码头', name: '宁波舟山港', english: 'Ningbo-Zhoushan Port', mark: '宁波舟山', tone: 'port',
    summary: '由多个港区组成的港口体系，兼有集装箱、矿石、原油、液体化工和件杂货等业务。宁波舟山港股份有限公司承担浙江沿海港口运营管理等业务。',
    clue: '“宁波舟山港”是港口整体名称；某票箱的实际装卸地点仍要看具体港区、码头、泊位和船期。',
    distinction: '不能把港口名称、股份公司、港口集团、码头公司或船公司当成同一个主体。',
    sources: ['nbzh']
  },
  {
    id: 'cosco-ports', category: '港口与码头', name: '中远海运港口', english: 'COSCO SHIPPING Ports', mark: 'CSP', tone: 'cosco-port',
    summary: '港口物流服务与码头投资运营主体，和中远海运集运的班轮运输业务分工不同。',
    clue: '同一个集团体系可以同时有船公司、码头投资运营、物流等不同公司；现场要核对具体经营码头的企业。',
    distinction: '“COSCO”字样不足以判断是中远海运集运的运输业务，还是中远海运港口的码头业务。',
    sources: ['cosco-ports']
  }
];

export const brandSources = [
  { id: 'maersk', title: 'About A.P. Moller - Maersk', org: 'A.P. Moller - Maersk', url: 'https://www.maersk.com/about', date: '网页未标发布日期', scope: '公司对海运、陆运、空运及综合物流愿景的介绍；本专题不采用会变化的规模数字。' },
  { id: 'maersk-star', title: 'A star is born', org: 'A.P. Moller - Maersk', url: 'https://www.maersk.com/news/articles/2022/12/22/a-star-is-born', date: '2022-12-22', scope: '说明浅蓝底白色七角星标志的由来，不代表所有箱体的底色。' },
  { id: 'msc', title: 'About Us', org: 'MSC', url: 'https://www.msc.com/en/about-us', date: '网页含 estimated 2024 数据', scope: '公司业务介绍，用于说明其集装箱航运、物流与港口投资业务范围；不引用规模排名。' },
  { id: 'cosco-lines', title: '2024 Quality Report · About COSCO SHIPPING Lines', org: 'COSCO SHIPPING Lines', url: 'https://lines.coscoshipping.com/lines_resource/pdf/quality2024en.pdf', date: '报告介绍 2024 年，业务数据注释截至 2025-04-30', scope: '说明中远海运集运的企业归属及集装箱运输业务范围。' },
  { id: 'oocl', title: 'OOCL Today', org: 'OOCL', url: 'https://www.oocl.com/eng/aboutoocl/companyprofile/oocltoday/Pages/default.aspx', date: '网页未标发布日期', scope: '说明 OOCL 品牌所对应的集装箱运输与物流服务。' },
  { id: 'one-color', title: 'Shipping containers are amazing!', org: 'ONE Container World', url: 'https://world.one-line.com/en/', date: '网页未标发布日期', scope: '企业官方对洋红色品牌色及箱体识别设计的说明。' },
  { id: 'one-media', title: 'Media Room: Official Logos, Photos & Media Resources', org: 'Ocean Network Express (ONE)', url: 'https://www.one-line.com/en/media-room', date: '网页未标发布日期', scope: '官方媒体资源中展示 ONE 洋红色集装箱及品牌图像。' },
  { id: 'cma-cgm', title: 'CMA CGM About Us | China', org: 'CMA CGM', url: 'https://www.cma-cgm.com/local/china/about-us', date: '网页会更新', scope: '用于了解达飞在中国提供的海运、冷藏和超限货服务及其业务伙伴。' },
  { id: 'hapag-lloyd', title: 'Facts & Figures', org: 'Hapag-Lloyd', url: 'https://www.hapag-lloyd.com/en/company/about-us/facts---figures.html', date: '网页会更新', scope: '用于区分班轮运输与码头基础设施业务，不引用动态规模数字。' },
  { id: 'hapag-tracking', title: 'Tracking', org: 'Hapag-Lloyd', url: 'https://www.hapag-lloyd.com/solutions/tracking/', date: '网页会更新', scope: '实际追踪入口；查询键需要根据要查的是集装箱还是运输业务选择。' },
  { id: 'bic', title: 'Container Identification Number', org: 'Bureau International des Containers (BIC)', url: 'https://www.bic-code.org/identification-number/', date: '网页未标发布日期', scope: '箱号结构及 owner prefix 定义；owner prefix 表示 owner 或 principal operator，不单独证明当前法律产权。' },
  { id: 'bic-cir', title: 'Container Interest Register (CIR)', org: 'Bureau International des Containers (BIC)', url: 'https://www.bic-code.org/container-interest-register-cir/', date: '项目资料会更新', scope: '介绍由 BIC 推进的行业登记项目；其公开页面说明仍在推广和准备生产部署，不应当作公众即时查询所有权的系统。' },
  { id: 'triton', title: 'Triton International', org: 'Triton International', url: 'https://www.tritoninternational.com/', date: '网页未标发布日期', scope: '租箱与售箱业务的企业实例；不将其市场规模数字作为长期事实。' },
  { id: 'cimc', title: 'Basic Information - Company Profile', org: 'China International Marine Containers (Group) Co., Ltd.', url: 'https://www.cimc.com/en/index.php?a=show&c=index&catid=39&id=1511&m=content', date: '网页未标发布日期', scope: '公司业务介绍及集装箱产品类别，用于说明制造商角色。' },
  { id: 'sipg', title: '集团介绍', org: '上海国际港务（集团）股份有限公司', url: 'https://www.sipg.com.cn/home/companyinfo', date: '网页未标发布日期', scope: '上港集团对自身码头运营商和港口物流服务定位的介绍。' },
  { id: 'nbzh', title: '公司简介', org: '宁波舟山港股份有限公司', url: 'https://www.nbport.com.cn/gfww/gsjs/gsjj/', date: '网页未标发布日期', scope: '公司对浙江沿海港口运营管理与业务范围的介绍。' },
  { id: 'cosco-ports', title: 'Corporate Profile · Overview', org: 'COSCO SHIPPING Ports', url: 'https://ports.coscoshipping.com/en/AboutCSP/CorporateProfile/Overview/', date: '网页会更新', scope: '中远海运港口对自身港口物流与码头组合业务的介绍。' },
  { id: 'panda', title: '“中远海运主题日”亮相大阪世博会中国馆', org: '中国远洋海运集团', url: 'https://www.coscoshipping.com/col/col6864/art/2025/art_b2fa183115fd44dda9a3fab1cb08280f.html', date: '2025 年', scope: '确认“熊猫船长”为中远海运官方活动吉祥物。' },
  { id: 'panda-reefer', title: 'How can you recognise our reefer containers?', org: 'COSCO SHIPPING Europe 官方账号', url: 'https://www.linkedin.com/posts/cosco-shipping-lines_transport-ship-truck-activity-7341012172228960257-kAFs', date: '公开帖文', scope: '展示白色箱身和船长熊猫图案的冷藏箱实例，不代表所有熊猫图案箱或所有冷藏箱。' }
];

export const brandHandoffs = [
  { label: '箱体制造商', text: '把箱造出来；看制造铭牌和出厂记录。' },
  { label: '箱体资产方', text: '持有或出租箱子；看设备和租赁记录。' },
  { label: '班轮承运人', text: '按合同组织运输；看订舱确认和提单。' },
  { label: '码头运营方', text: '负责岸桥、堆场和闸口作业；看作业通知和码头任务。' }
];
