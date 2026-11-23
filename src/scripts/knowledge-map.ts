
const root = document.querySelector<HTMLElement>('[data-knowledge-map]');
if (root) {
  const form = root.querySelector<HTMLFormElement>('[data-km-controls]')!;
  const search = root.querySelector<HTMLInputElement>('#km-search')!;
  const group = root.querySelector<HTMLSelectElement>('#km-group')!;
  const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-km-domain]'));
  const groups = Array.from(root.querySelectorAll<HTMLElement>('[data-km-group]'));
  const status = root.querySelector<HTMLElement>('#km-results-status')!;
  const empty = root.querySelector<HTMLElement>('[data-km-empty]')!;
  const emptyTitle = empty.querySelector<HTMLElement>('[data-km-empty-title]')!;
  const defaultEmptyTitle = emptyTitle.textContent;
  const quickLinks = Array.from(root.querySelectorAll<HTMLAnchorElement>('[data-km-quick-view]'));
  const viewInputs = Array.from(form.querySelectorAll<HTMLInputElement>('input[name="view"]'));
  const validViews = new Set(viewInputs.map(input => input.value));
  const validGroups = new Set(Array.from(group.options, option => option.value));
  const normalize = (value: string) => value.normalize('NFKC').toLocaleLowerCase().trim();
  let searchHistorySession = false;

  function currentView() {
    return form.querySelector<HTMLInputElement>('input[name="view"]:checked')?.value || 'all';
  }

  function syncUrl(mode: 'push' | 'replace' = 'push') {
    const url = new URL(window.location.href);
    const query = search.value.trim().slice(0, 100);
    if (query) url.searchParams.set('q', query);
    else url.searchParams.delete('q');
    if (group.value !== 'all') url.searchParams.set('group', group.value);
    else url.searchParams.delete('group');
    const view = currentView();
    if (view !== 'all') url.searchParams.set('view', view);
    else url.searchParams.delete('view');

    if (url.href === window.location.href) return false;
    if (mode === 'replace') window.history.replaceState(window.history.state, '', url);
    else window.history.pushState(window.history.state, '', url);
    return true;
  }

  function update() {
    const words = normalize(search.value).split(/\s+/).filter(Boolean);
    const activeFilter = form.querySelector<HTMLInputElement>('input[name="view"]:checked');
    const view = activeFilter?.value || 'all';
    let visible = 0;
    cards.forEach(card => {
      const text = normalize(card.dataset.kmSearch || '');
      const matchesView = view === 'all' || card.dataset.kmViews?.split(' ').includes(view) === true;
      card.hidden = !(words.every(word => text.includes(word)) && (group.value === 'all' || card.dataset.kmGroupId === group.value) && matchesView);
      if (!card.hidden) visible++;
    });
    let groupCount = 0;
    groups.forEach(section => {
      const count = Array.from(section.querySelectorAll<HTMLElement>('[data-km-domain]')).filter(card => !card.hidden).length;
      section.hidden = count === 0;
      const index = root!.querySelector<HTMLElement>('[data-km-index="' + section.dataset.kmGroup + '"]');
      if (index) index.hidden = count === 0;
      const label = section.querySelector<HTMLElement>('[data-km-group-count]');
      if (label) label.textContent = count + ' 个域';
      if (count) groupCount++;
    });
    empty.hidden = visible !== 0;
    if (!empty.hidden) emptyTitle.textContent = activeFilter?.dataset.kmEmptyTitle ?? defaultEmptyTitle;
    status.textContent = '显示 ' + visible + ' 个知识域 / ' + groupCount + ' 大类';
    quickLinks.forEach((link) => {
      if (link.dataset.kmQuickView === view) link.setAttribute('data-km-active', 'true');
      else link.removeAttribute('data-km-active');
    });
  }

  function restoreFromUrl() {
    const params = new URLSearchParams(window.location.search);
    search.value = (params.get('q') || '').slice(0, 100);
    const requestedGroup = params.get('group') || 'all';
    group.value = validGroups.has(requestedGroup) ? requestedGroup : 'all';
    const requestedView = params.get('view') || 'all';
    const restoredView = validViews.has(requestedView) ? requestedView : 'all';
    form.querySelector<HTMLInputElement>(`input[name="view"][value="${restoredView}"]`)!.checked = true;
    update();
    // Normalize invalid/duplicate parameters without changing the no-JS page content.
    syncUrl('replace');
  }

  form.hidden = false;
  form.addEventListener('submit', event => event.preventDefault());
  search.addEventListener('focus', () => { searchHistorySession = false; });
  search.addEventListener('blur', () => { searchHistorySession = false; });
  form.addEventListener('input', event => {
    update();
    const isSearchEdit = event.target === search;
    const mode = isSearchEdit && searchHistorySession ? 'replace' : 'push';
    if (syncUrl(mode) && isSearchEdit) searchHistorySession = true;
    if (!isSearchEdit) searchHistorySession = false;
  });
  form.addEventListener('change', event => {
    update();
    // Some browsers emit both input and change for one control; syncUrl prevents duplicate entries.
    if (event.target !== search) {
      syncUrl('push');
      searchHistorySession = false;
    }
  });
  form.addEventListener('reset', event => {
    event.preventDefault();
    search.value = '';
    group.value = 'all';
    form.querySelector<HTMLInputElement>('input[name="view"][value="all"]')!.checked = true;
    update();
    searchHistorySession = false;
    syncUrl('push');
  });
  root.querySelector('[data-km-clear]')?.addEventListener('click', () => { form.reset(); search.focus(); });
  quickLinks.forEach((link) => link.addEventListener('click', (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const targetView = link.dataset.kmQuickView;
    const radio = targetView ? form.querySelector<HTMLInputElement>(`input[name="view"][value="${targetView}"]`) : null;
    if (!radio) return;
    event.preventDefault();
    search.value = '';
    group.value = 'all';
    radio.checked = true;
    update();
    searchHistorySession = false;
    syncUrl('push');
    status.focus({ preventScroll: true });
    status.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
  }));

  window.addEventListener('popstate', () => {
    searchHistorySession = false;
    restoreFromUrl();
  });

  const picker = root.querySelector<HTMLElement>('[data-km-role-picker]');
  const role = root.querySelector<HTMLSelectElement>('#km-role');
  const guides = Array.from(root.querySelectorAll<HTMLDetailsElement>('[data-km-role]'));
  function updateRole() { guides.forEach(guide => { guide.hidden = guide.dataset.kmRole !== role?.value; guide.open = !guide.hidden; }); }
  if (picker && role) { picker.hidden = false; role.addEventListener('change', updateRole); updateRole(); }
  restoreFromUrl();
}
