import {foundationSearchEntries} from './port-foundations.js';
import { articles } from './knowledge.js';
import { cargoSearchEntries } from './cargo-search.js';
import { riskSearchEntries } from './risk-learning.js';
import { infrastructureSearchEntries } from './infrastructure.js';
import { vesselSearchEntries } from './vessel-learning.js';
import { learningSearchEntries } from './learning-search.js';
import { equipmentVisuals } from './equipment-visuals.js';
import { learningKey } from './learning-state.js';
// Include question destinations in the inline index so navigation also works when the full index is unavailable.
const questionEntries = [
 {id:'page:brands/',path:'brands/',title:'集装箱品牌与港航公司',summary:'从箱体涂装辨认主体，分清承运人、箱体资产、制造商与港口。',kind:'专题',domain:'k02',searchText:'品牌 马士基 中远海运 ONE 洋红色 熊猫 箱主 制造商'},
 {id:'page:gate/',path:'gate/',title:'闸口模拟：杆为什么抬，也为什么不抬？',summary:'核对本次任务的授权、作业条件、道闸和实际通行记录。',kind:'专题',domain:'k19',searchText:'闸口 道闸 抬杆 海关 放行 提箱'},
 {id:'page:economics/',path:'economics/',title:'港口靠什么赚钱：服务、收入与成本',summary:'通过教学测算认识港口经营，并区分服务收入、成本与利润。',kind:'专题',domain:'k24',searchText:'港口 赚钱 收入 成本 利润 经营'},
 {id:'page:journey/',path:'journey/',title:'跟着进口箱走一程',summary:'沿七个节点理解实物移动、岗位交接与系统记录。',kind:'专题',domain:'k10',searchText:'进口 箱子 卸船 堆场 提货'},
 {id:'page:scenarios/booking-change-and-return/',path:'scenarios/booking-change-and-return/',title:'改船、落装与退运：先确定实际位置再改计划',summary:'从未装事实和变更请求出发，核对商业确认、资料、执行与结算影响。',kind:'专题',domain:'k09',searchText:'改船 落装 退运 未装 变更'},
 {id:'page:scenarios/quay-crane-failure-recovery/',path:'scenarios/quay-crane-failure-recovery/',title:'岸桥故障：从现场报告到恢复交接',summary:'连接现场发现、计划调整、工程处理和生产恢复。',kind:'专题',domain:'k09',searchText:'岸桥 故障 设备 维修 工程 恢复'},
];
export const searchCatalog = [
 ...questionEntries,
 ...articles.map(a=>({id:a.id,path:'knowledge/'+a.id+'/',title:a.title,summary:a.summary,kind:a.kind,domain:a.domain,searchText:[a.title,a.subtitle,a.summary,...a.tags,...a.sections.map(s=>s.title+' '+s.body)].join(' '),image:equipmentVisuals.find(v=>v.id===a.id)?.image})),
 ...foundationSearchEntries,...learningSearchEntries,...vesselSearchEntries,...cargoSearchEntries,...infrastructureSearchEntries,...riskSearchEntries
].map(e=>({...e,key:learningKey(e.path),sections:[],searchText:e.searchText.toLowerCase()}));
