import {topic as bay,sources as baySources} from './bay-knowledge.js';
import {topic as yard,sources as yardSources,yardModes} from './yard-knowledge.js';
import {topic as it,sources as itSources,hardware} from './it-infrastructure.js';
export const infrastructureTopics=[bay,yard,it];
export const infrastructureSources=[...baySources,...yardSources,...itSources];
export {yardModes,hardware};
export const infrastructureSearchEntries=infrastructureTopics.map(t=>({id:'infra-'+t.id,title:t.title,summary:t.summary,kind:'专题',domain:t.domain,path:'infrastructure/'+t.id+'/',searchText:[t.title,t.summary,...t.aliases,...t.chapters.flatMap(c=>[c.title,c.summary,...c.points.map(p=>p.title+' '+p.text)]),...(t.id==='it-room'?hardware.map(h=>h.name+' '+h.role):[]),...(t.id==='yard'?yardModes.map(m=>m.name+' '+m.equipment):[])].join(' ').toLowerCase()}));
