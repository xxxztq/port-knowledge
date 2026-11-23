import {matchEntry, searchSuggestion, searchURL} from '../lib/search-model.mjs';
import {readItems} from '../data/learning-state.js';
import {validateSearchIndex} from '../data/search-index.js';

const base = document.body.dataset.base || '/port-knowledge/';
const input = document.querySelector<HTMLInputElement>('#knowledge-search')!;
const grid = document.querySelector<HTMLElement>('#knowledge-results')!;
const status = document.querySelector<HTMLElement>('#search-status')!;
const retry = document.querySelector<HTMLButtonElement>('#retry-search-index')!;
const kindSelect = document.querySelector<HTMLSelectElement>('#kind-select')!;
const domainSelect = document.querySelector<HTMLSelectElement>('#domain-select')!;
const more = document.querySelector<HTMLButtonElement>('#load-more-results')!;
const suggestion = document.querySelector<HTMLElement>('#search-suggestion')!;
const clear = document.querySelector<HTMLButtonElement>('#clear-search')!;
const pageSize = 12;
const summaryEntries = JSON.parse(document.querySelector('#knowledge-search-index')!.textContent || '[]');
let entries = summaryEntries;
let kind = '全部', domain = 'all', full = false, indexFailed = false, typing = false, composing = false;
let indexPromise: Promise<void> | null = null;
let visibleCount = pageSize;
let timer: ReturnType<typeof setTimeout>;
const kinds = [...kindSelect.options].map(option => option.value);
const domains = [...domainSelect.options].map(option => option.value);

function state() { return {q: input.value, kind, domain}; }
function writeURL(replace = false) {
  const url = searchURL(location.href, state());
  if (url !== location.pathname + location.search + location.hash) {
    history[replace ? 'replaceState' : 'pushState']({...history.state, libraryVisible: pageSize}, '', url);
  }
}
function readURL() {
  clearTimeout(timer);
  typing = false;
  const params = new URLSearchParams(location.search);
  input.value = params.get('q') || '';
  kind = kinds.includes(params.get('kind')!) ? params.get('kind')! : '全部';
  domain = domains.includes(params.get('domain')!) ? params.get('domain')! : 'all';
  const remembered = history.state?.libraryVisible;
  visibleCount = Number.isSafeInteger(remembered) && remembered >= pageSize ? Math.min(remembered, 10000) : pageSize;
  writeURL(true);
  document.body.dataset.searchIndexState = full ? 'full' : indexFailed ? 'fallback' : (indexPromise || input.value.trim()) ? 'loading' : 'summary';
  document.body.dataset.searchReady = full || (!indexFailed && !indexPromise && !input.value.trim()) ? 'true' : indexFailed ? 'fallback' : 'loading';
  refresh();
  if (input.value.trim() && !full && !indexFailed) void loadIndex();
}
function node(tag: string, content: string, className = '') {
  const element = document.createElement(tag);
  element.textContent = content;
  element.className = className;
  return element;
}
function excerpt(text: string) {
  const paragraph = document.createElement('p');
  paragraph.className = 'search-excerpt';
  const words = input.value.trim().split(/\s+/).filter(Boolean).sort((a, b) => b.length - a.length);
  if (!words.length) { paragraph.textContent = text; return paragraph; }
  const escaped = words.map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp('(' + escaped.join('|') + ')', 'gi');
  let start = 0;
  for (const match of text.matchAll(pattern)) {
    paragraph.append(document.createTextNode(text.slice(start, match.index)), node('mark', match[0]));
    start = match.index! + match[0].length;
  }
  paragraph.append(document.createTextNode(text.slice(start)));
  return paragraph;
}
function refresh(reset = false, append = false) {
  if (reset) visibleCount = pageSize;
  let saved: string[] = [], failed = false;
  try { saved = readItems(localStorage, 'bookmarks'); } catch { failed = true; }
  const results = entries.map((entry: any) => matchEntry(entry, state(), saved)).filter(Boolean).sort((a: any, b: any) => b.score - a.score);
  const fragment = document.createDocumentFragment();
  const start = append ? grid.children.length : 0;
  for (const result of results.slice(start, visibleCount)) {
    const entry = result.entry;
    const card = document.createElement('a');
    card.className = 'article-card search-result';
    card.href = base + result.href;
    card.dataset.searchCard = '';
    card.dataset.id = entry.id;
    card.dataset.kind = entry.kind;
    card.dataset.domain = entry.domain;
    if (entry.image) {
      const image = document.createElement('img');
      image.src = base + entry.image.replace(/^\//, '');
      image.alt = entry.title + '结构示意';
      image.width = 800;
      image.height = 480;
      image.loading = 'lazy';
      image.className = 'search-illustration';
      card.append(image);
    }
    card.append(node('span', entry.kind, 'tag'), node('h3', entry.title), excerpt(result.excerpt));
    if (result.reason) card.append(node('small', result.reason, 'search-reason'));
    if (input.value.trim() && result.section) card.append(node('small', '正文位置：' + result.section, 'search-section'));
    card.append(node('span', '打开阅读 →', 'search-open'));
    fragment.append(card);
  }
  if (append) grid.append(fragment); else grid.replaceChildren(fragment);
  document.querySelector('#search-count')!.textContent = '找到 ' + results.length + ' 个知识卡与专题';
  (document.querySelector('#empty-results') as HTMLElement).hidden = results.length !== 0;
  const shown = Math.min(visibleCount, results.length);
  document.querySelector('#visible-range')!.textContent = '已显示 ' + shown + ' / ' + results.length + ' 条结果';
  (document.querySelector('#search-pagination') as HTMLElement).hidden = !results.length;
  more.hidden = shown >= results.length;
  more.textContent = '再看 ' + Math.min(pageSize, results.length - shown) + ' 条结果 ↓';
  clear.hidden = !input.value.trim() && kind === '全部' && domain === 'all';
  kindSelect.value = kind;
  domainSelect.value = domain;
  document.querySelectorAll('[data-kind-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.getAttribute('data-kind-filter') === kind)));
  document.querySelectorAll('[data-domain-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.getAttribute('data-domain-filter') === domain)));
  const correction = searchSuggestion(input.value);
  suggestion.hidden = !correction;
  if (correction) {
    suggestion.querySelector('p')!.textContent = correction.text + ' 当前筛选条件会保留。';
    suggestion.querySelector('button')!.textContent = '搜索“' + correction.query + '”';
    suggestion.querySelector('button')!.dataset.query = correction.query;
  }
  if (failed && kind === '我的收藏') status.textContent = '无法读取收藏记录，请检查浏览器是否允许本地存储。';
  else status.textContent = full ? '已检索全站正文 · 点击结果可到相关章节。' : indexFailed ? '完整正文索引暂未加载，当前仅显示摘要匹配与问题导航；可重试。' : document.body.dataset.searchIndexState === 'loading' ? '正在载入全站正文；当前先显示摘要匹配与问题导航。' : '当前仅显示摘要匹配与问题导航；输入关键词后会加载全站正文。';
}
function changeFilters() { typing = false; writeURL(); refresh(true); }
function searchQuestion(query: string) {
  input.value = query;
  changeFilters();
  if (input.value.trim() && !full && !indexFailed) void loadIndex();
  input.focus();
}
function onInput() {
  if (composing) return;
  writeURL(typing);
  typing = true;
  clearTimeout(timer);
  timer = setTimeout(() => typing = false, 600);
  refresh(true);
  if (input.value.trim() && !full && !indexFailed) void loadIndex();
}
input.addEventListener('compositionstart', () => composing = true);
input.addEventListener('compositionend', () => { composing = false; onInput(); });
input.addEventListener('input', onInput);
document.querySelectorAll<HTMLButtonElement>('[data-kind-filter]').forEach(button => button.addEventListener('click', () => { kind = button.dataset.kindFilter!; changeFilters(); }));
document.querySelectorAll<HTMLButtonElement>('[data-domain-filter]').forEach(button => button.addEventListener('click', () => { domain = button.dataset.domainFilter!; changeFilters(); }));
kindSelect.addEventListener('change', () => { kind = kindSelect.value; changeFilters(); });
domainSelect.addEventListener('change', () => { domain = domainSelect.value; changeFilters(); });
document.querySelectorAll<HTMLAnchorElement>('[data-search-question]').forEach(link => link.addEventListener('click', event => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
  event.preventDefault();
  searchQuestion(link.dataset.searchQuestion!);
}));
suggestion.querySelector('button')!.addEventListener('click', () => searchQuestion(suggestion.querySelector('button')!.dataset.query!));
function resetSearch() { input.value = ''; kind = '全部'; domain = 'all'; changeFilters(); input.focus(); }
clear.addEventListener('click', resetSearch);
document.querySelector('#reset-search')!.addEventListener('click', resetSearch);
more.addEventListener('click', () => {
  const previousCount = grid.children.length;
  visibleCount += pageSize;
  history.replaceState({...history.state, libraryVisible: visibleCount}, '', location.href);
  refresh(false, true);
  (grid.children[previousCount] as HTMLAnchorElement | undefined)?.focus({preventScroll: true});
});
window.addEventListener('popstate', readURL);
window.addEventListener('pageshow', readURL);
window.addEventListener('storage', () => refresh());
window.addEventListener('learningchange', () => refresh());
async function loadIndex() {
  if (full) return;
  if (indexPromise) return indexPromise;
  retry.hidden = true;
  indexFailed = false;
  document.body.dataset.searchIndexState = 'loading';
  document.body.dataset.searchReady = 'loading';
  refresh();
  indexPromise = (async () => {
    try {
      const response = await fetch(base + 'search-index.json?v=2', {cache: 'no-cache', signal: AbortSignal.timeout(12000)});
      if (!response.ok) throw new Error('index unavailable');
      entries = validateSearchIndex(await response.json());
      full = true;
      document.body.dataset.searchIndexState = 'full';
      document.body.dataset.searchReady = 'true';
      refresh();
    } catch {
      entries = summaryEntries;
      full = false;
      indexFailed = true;
      document.body.dataset.searchIndexState = 'fallback';
      document.body.dataset.searchReady = 'fallback';
      refresh();
      retry.hidden = false;
    }
  })();
  try { await indexPromise; } finally { indexPromise = null; }
}
retry.addEventListener('click', () => { void loadIndex(); });
document.querySelector('.knowledge-library')!.classList.add('search-enhanced');
document.body.dataset.searchIndexState = 'summary';
readURL();
