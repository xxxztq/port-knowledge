import {searchGuides} from '../data/search-guides.js';

const normalized = value => String(value || '').normalize('NFKC').toLowerCase();
const phraseKey = value => normalized(value).replace(/[\s？?！!。，,；;：:]/g, '');
const guideByPhrase = new Map(searchGuides.flatMap(guide => guide.phrases.map(phrase => [phraseKey(phrase), guide])));
function guideForQuery(query) {
  const key = phraseKey(query);
  const direct = guideByPhrase.get(key);
  if (direct) return direct;
  if (/(粉色|粉红|洋红).*(箱|one)|(箱|集装箱).*(粉色|粉红|洋红)/i.test(key)) return searchGuides.find(guide => guide.id === 'pink-container');
  if (/熊猫.*箱|箱.*熊猫/.test(key)) return searchGuides.find(guide => guide.id === 'panda-container');
  if (/(?:道闸|闸口).*(?:不抬|抬杆|抬杠)|不抬杆|不抬杠/.test(key)) return searchGuides.find(guide => guide.id === 'gate-blocked');
  if (/海关.*放行.*(?:不能|还不能|无法|提箱|提货)|(?:不能|还不能|无法).*提箱.*海关.*放行/.test(key)) return searchGuides.find(guide => guide.id === 'customs-delivery');
  if (/甩柜|没上船|赶不上船/.test(key)) return searchGuides.find(guide => guide.id === 'booking-change');
  if (/(设备|岸桥).*(坏|故障|维修)|故障.*谁处理/.test(key)) return searchGuides.find(guide => guide.id === 'equipment-failure');
  if (/港口.*(?:赚钱|利润|收入从哪)|(?:赚钱|利润).*港口/.test(key)) return searchGuides.find(guide => guide.id === 'port-income');
  if (/滞箱费|免箱期|还箱.*(?:晚|逾期|费用)|(?:晚|逾期).*还箱/.test(key)) return searchGuides.find(guide => guide.id === 'return-fees');
  if (/箱.*卸船.*(?:哪|去)/.test(key)) return searchGuides.find(guide => guide.id === 'container-after-discharge');
  return null;
}

export function normalizeSearch(state) {
  return {q: typeof state.q === 'string' ? state.q.trim() : '', kind: state.kind || '全部', domain: state.domain || 'all'};
}

export function searchURL(href, state) {
  const url = new URL(href);
  for (const key of ['q', 'kind', 'domain']) url.searchParams.delete(key);
  const s = normalizeSearch(state);
  if (s.q) url.searchParams.set('q', s.q);
  if (s.kind !== '全部') url.searchParams.set('kind', s.kind);
  if (s.domain !== 'all') url.searchParams.set('domain', s.domain);
  return url.pathname + url.search + url.hash;
}

export function searchSuggestion(query) {
  if (/(?:抬杠|道闸抬杠|闸口抬杠|不抬杠)/.test(phraseKey(query))) {
    return {query: '抬杆', text: '你可能想找道闸“抬杆”的业务。'};
  }
  return null;
}

export function matchEntry(entry, state, saved = []) {
  const s = normalizeSearch(state);
  if (s.kind !== '全部' && (s.kind === '我的收藏' ? !saved.includes(entry.key) : entry.kind !== s.kind)) return null;
  if (s.domain !== 'all' && entry.domain !== s.domain) return null;
  const tokens = normalized(s.q).split(/\s+/).filter(Boolean);
  // An exact editorial question may contain spaces. Fuzzy rules must not
  // consume additional search terms in a keyword query.
  const wholeGuide = tokens.length <= 1 ? guideForQuery(s.q) : guideByPhrase.get(phraseKey(s.q));
  const words = wholeGuide ? [normalized(s.q)] : tokens;
  const sectionText = (entry.sections || []).map(section => section.text).join(' ');
  const text = normalized([entry.title, entry.summary, entry.keywords ?? entry.searchText ?? '', sectionText].join(' '));
  let navigation = null;
  let boost = 0;
  for (const word of words) {
    const guide = wholeGuide || guideByPhrase.get(phraseKey(word));
    const targetIndex = guide?.targets.findIndex(target => target.path === entry.path || (!entry.path.includes('#') && target.path.split('#')[0] === entry.path)) ?? -1;
    if (targetIndex >= 0) {
      navigation ||= guide.targets[targetIndex];
      boost += 100 - targetIndex * 10;
    } else if (!text.includes(word)) return null;
  }
  let best = null, bestScore = 0;
  for (const section of entry.sections || []) {
    const score = words.reduce((sum, word) => sum + (normalized(section.text).includes(word) ? 3 : 0) + (normalized(section.title).includes(word) ? 1 : 0), 0);
    if (score > bestScore) { best = section; bestScore = score; }
  }
  const score = words.reduce((sum, word) => sum + (normalized(entry.title).includes(word) ? 20 : 0) + (normalized(entry.summary).includes(word) ? 5 : 0), bestScore + boost);
  if (navigation) return {entry, score, excerpt: navigation.note, href: navigation.path, reason: '相关问题导航'};
  let excerpt = best?.text || entry.summary;
  const first = words.map(word => normalized(excerpt).indexOf(word)).filter(index => index >= 0).sort((a, b) => a - b)[0] || 0;
  const start = Math.max(0, first - 45);
  excerpt = (start ? '…' : '') + excerpt.slice(start, start + 170) + (excerpt.length > start + 170 ? '…' : '');
  return {entry, score, excerpt, section: best?.title, href: best?.anchor ? entry.path.split('#')[0] + '#' + encodeURIComponent(best.anchor) : entry.path};
}
