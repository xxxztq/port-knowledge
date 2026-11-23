
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
  const normalize = (value: string) => value.normalize('NFKC').toLocaleLowerCase().trim();
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
  }
  form.hidden = false;
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('input', update);
  form.addEventListener('change', update);
  form.addEventListener('reset', event => {
    event.preventDefault();
    search.value = '';
    group.value = 'all';
    form.querySelector<HTMLInputElement>('input[name="view"][value="all"]')!.checked = true;
    update();
  });
  root.querySelector('[data-km-clear]')?.addEventListener('click', () => { form.reset(); search.focus(); });
  const picker = root.querySelector<HTMLElement>('[data-km-role-picker]');
  const role = root.querySelector<HTMLSelectElement>('#km-role');
  const guides = Array.from(root.querySelectorAll<HTMLDetailsElement>('[data-km-role]'));
  function updateRole() { guides.forEach(guide => { guide.hidden = guide.dataset.kmRole !== role?.value; guide.open = !guide.hidden; }); }
  if (picker && role) { picker.hidden = false; role.addEventListener('change', updateRole); updateRole(); }
  update();
}
