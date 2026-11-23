import {foundationSearchEntries} from './port-foundations.js';
import { articles } from './knowledge.js';
import { cargoSearchEntries } from './cargo-search.js';
import { riskSearchEntries } from './risk-learning.js';
import { infrastructureSearchEntries } from './infrastructure.js';
import { vesselSearchEntries } from './vessel-learning.js';
import { learningSearchEntries } from './learning-search.js';
import { equipmentVisuals } from './equipment-visuals.js';
import { learningKey } from './learning-state.js';
export const searchCatalog = [
 ...articles.map(a=>({id:a.id,path:'knowledge/'+a.id+'/',title:a.title,summary:a.summary,kind:a.kind,domain:a.domain,searchText:[a.title,a.subtitle,a.summary,...a.tags,...a.sections.map(s=>s.title+' '+s.body)].join(' '),image:equipmentVisuals.find(v=>v.id===a.id)?.image})),
 ...foundationSearchEntries,...learningSearchEntries,...vesselSearchEntries,...cargoSearchEntries,...infrastructureSearchEntries,...riskSearchEntries
].map(e=>({...e,key:learningKey(e.path),sections:[],searchText:e.searchText.toLowerCase()}));
