import {containerTypes} from './container-types.js';
import {cargoProfiles} from './cargo-business.js';
const domains={timber:'k12','steel-coil':'k12',ev:'k14','energy-storage':'k12','wind-blade':'k12','project-cargo':'k12','cold-chain':'k15','packaged-dangerous':'k15'};
const aliases={timber:'木头 木材 原木 锯材 板材 木方 木质包装 检疫 立方米 材积','steel-coil':'卷钢 钢卷 钢材 卷号 炉批 热轧 冷轧 防滚动 锈蚀 水迹',ev:'新能源 电动汽车 商品车 滚装 VIN 汽车出口','energy-storage':'储能柜 储能集装箱 电池 电池舱 储能系统 BESS','wind-blade':'风叶 风电 风机 风电叶片 叶片 项目货','project-cargo':'机械设备 重大件 超重 超限','cold-chain':'冷藏 冷冻 生鲜 温控 冷链','packaged-dangerous':'危货 危险品 危险货物'};
export const cargoSearchEntries=[
 ...containerTypes.map(t=>({id:'box-'+t.id,title:t.name,summary:t.summary,kind:'箱型',domain:'k10',path:'containers/#'+t.id,searchText:[t.name,t.code,t.group,t.summary,t.sizeNote,...t.uses,...t.features.map(f=>f.label+' '+f.text),...t.checks].join(' ').toLowerCase()})),
 ...cargoProfiles.map(p=>({id:'cargo-'+p.id,title:p.name,summary:p.summary,kind:'货类',domain:domains[p.id],path:'cargo/'+p.id+'/',searchText:[p.name,p.subtitle,p.summary,aliases[p.id],...p.distinctions.map(d=>d.title+' '+d.text),...p.stages.map(s=>s.title+' '+s.actor+' '+s.system+' '+s.action),...p.gateChecks.map(g=>g.label+' '+g.text)].join(' ').toLowerCase()}))
];
