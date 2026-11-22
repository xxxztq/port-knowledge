import { shipmentCases, shipmentExceptions } from '../data/shipment-learning.js';
import {
  createShipmentState, transitionShipment, getShipmentCase, getCurrentShipmentStep,
  getBlockingException, canVisitShipmentStep, canAdvanceShipment,
} from '../lib/shipment-model.mjs';

type ExerciseRecord = { checked: string[]; choiceId: string | null; reviewed: boolean };
type LessonState = { caseId: string; positions: Record<string, number>; exercises: Record<string, ExerciseRecord>; feedback: string };
const app = document.querySelector<HTMLElement>('[data-shipment-app]');

if (app) {
  let state: LessonState = createShipmentState();
  const caseElements = [...app.querySelectorAll<HTMLElement>('[data-shipment-case]')];
  const live = app.querySelector<HTMLElement>('[data-shipment-live]')!;
  const tell = (action: Record<string, unknown>) => { state = transitionShipment(state, action); render(); };
  const activeCaseElement = () => caseElements.find(element => element.dataset.shipmentCase === state.caseId)!;

  function render() {
    const lesson = getShipmentCase(state)!;
    const index = state.positions[state.caseId];
    const step = getCurrentShipmentStep(state)!;
    const blocking = getBlockingException(state);
    app!.querySelectorAll<HTMLAnchorElement>('[data-case-select]').forEach(link => {
      if (link.dataset.caseSelect === state.caseId) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    caseElements.forEach(element => {
      const selected = element.dataset.shipmentCase === state.caseId;
      element.hidden = !selected;
      if (!selected) return;
      element.querySelectorAll<HTMLElement>('[data-map-point]').forEach(point => point.classList.toggle('is-current', Number(point.dataset.mapPoint) === index));
      element.querySelectorAll<HTMLAnchorElement>('[data-step-select]').forEach(link => {
        const target = Number(link.dataset.stepSelect);
        const permitted = canVisitShipmentStep(state, target);
        const current = index === target;
        if (current) link.setAttribute('aria-current', 'step'); else link.removeAttribute('aria-current');
        link.setAttribute('aria-disabled', String(!permitted));
        link.setAttribute('aria-label', '第 ' + (target + 1) + ' 站，' + lesson.stages[target].title + (current ? '，当前阅读节点' : !permitted ? '，异常理解核对未完成，暂不可前往' : '，查看节点'));
        link.querySelector<HTMLElement>('[data-station-status]')!.textContent = current ? '当前所在' : !permitted ? '待理解核对' : '查看节点';
      });
      element.querySelector<HTMLElement>('[data-position]')!.textContent = '第 ' + (index + 1) + ' 站 / 共 ' + lesson.stages.length + ' 站';
      const progress = element.querySelector<HTMLProgressElement>('[data-shipment-progress]')!;
      progress.value = index + 1;
      progress.setAttribute('value', String(index + 1));
      progress.textContent = (index + 1) + ' / ' + lesson.stages.length;
      progress.setAttribute('aria-valuetext', '当前阅读第 ' + (index + 1) + ' 站：' + step.title + '，共 7 站；不是完成比例');
      const previous = element.querySelector<HTMLButtonElement>('[data-shipment-action="previous"]')!;
      previous.disabled = index === 0;
      const next = element.querySelector<HTMLButtonElement>('[data-shipment-action="next"]')!;
      next.disabled = index === lesson.stages.length - 1;
      next.setAttribute('aria-disabled', String(!canAdvanceShipment(state)));
      next.textContent = index === lesson.stages.length - 1 ? '已到末节点' : blocking && !canAdvanceShipment(state) ? '先核对异常理解 →' : '下一节点 →';
      const records = shipmentExceptions.filter(e => e.caseId === state.caseId && state.exercises[e.id]);
      const pending = element.querySelector<HTMLElement>('[data-pending]')!;
      pending.hidden = records.length === 0;
      if (records.length) {
        const target = blocking ?? records[records.length - 1];
        element.querySelector<HTMLElement>('[data-pending-text]')!.textContent = blocking
          ? '“' + blocking.title + '”理解核对未完成，后续阅读暂锁定。业务异常仍待责任方确认，返回前站或切换案例均不会清除。'
          : '本例已开启的 ' + records.length + ' 项异常已完成理解核对；业务异常仍待责任方确认。后续内容是假设必要条件已具备的示例，不表示异常已解除。';
        element.querySelector<HTMLButtonElement>('[data-return-exception]')!.dataset.returnException = target.id;
      }
      element.querySelectorAll<HTMLElement>('[data-shipment-step]').forEach(panel => {
        const panelIndex = Number(panel.dataset.shipmentStep);
        panel.hidden = panelIndex !== index;
        const panelException = shipmentExceptions.find(e => e.caseId === state.caseId && e.stepId === lesson.stages[panelIndex].id);
        const record = panelException ? state.exercises[panelException.id] : undefined;
        panel.querySelectorAll<HTMLElement>('[data-lane]').forEach(lane => {
          const affected = Boolean(record && panelException?.affected.includes(lane.dataset.lane!));
          lane.classList.toggle('is-affected', affected);
          lane.querySelector<HTMLElement>('[data-lane-impact]')!.hidden = !affected;
        });
        if (!panelException) return;
        const detail = panel.querySelector<HTMLElement>('[data-exception-detail]')!;
        detail.hidden = !record;
        const launch = panel.querySelector<HTMLButtonElement>('[data-start-exception]')!;
        launch.setAttribute('aria-expanded', String(Boolean(record)));
        launch.textContent = record ? '查看演练记录 ↓' : '模拟此异常';
        panel.querySelectorAll<HTMLInputElement>('[data-evidence]').forEach(input => input.checked = Boolean(record?.checked.includes(input.dataset.evidence!)));
        panel.querySelectorAll<HTMLInputElement>('[data-response]').forEach(input => input.checked = record?.choiceId === input.dataset.response);
        panel.querySelector<HTMLElement>('[data-review-status]')!.textContent = record?.reviewed
          ? '理解已核对；可阅读后续条件性示例。业务异常仍待责任方确认。'
          : '尚未完成理解核对；后续节点暂锁定。';
        panel.querySelector<HTMLElement>('[data-exercise-feedback]')!.textContent = panelIndex === index && record ? state.feedback : '';
        panel.querySelector<HTMLButtonElement>('[data-shipment-action="review"]')!.textContent = record?.reviewed ? '再次核对理解' : '核对理解';
      });
    });
    live.textContent = lesson.shortTitle + '，第 ' + (index + 1) + ' / 7 站，' + step.title + '。' + state.feedback;
  }

  const unmodifiedClick = (event: MouseEvent) => event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey;
  app.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    const caseLink = event.target.closest<HTMLAnchorElement>('[data-case-select]');
    if (caseLink && unmodifiedClick(event)) {
      event.preventDefault();
      tell({ type: 'select-case', id: caseLink.dataset.caseSelect });
      return;
    }
    const stepLink = event.target.closest<HTMLAnchorElement>('[data-step-select]');
    if (stepLink && unmodifiedClick(event)) {
      event.preventDefault();
      tell({ type: 'select-step', index: Number(stepLink.dataset.stepSelect) });
      return;
    }
    const launch = event.target.closest<HTMLButtonElement>('[data-start-exception]');
    if (launch) {
      tell({ type: 'start-exception', id: launch.dataset.startException });
      const detail = launch.closest('[data-exception]')?.querySelector<HTMLElement>('[data-exception-detail]');
      detail?.querySelector<HTMLInputElement>('input')?.focus({ preventScroll: true });
      return;
    }
    const returnButton = event.target.closest<HTMLButtonElement>('[data-return-exception]');
    if (returnButton) {
      const exception = shipmentExceptions.find(e => e.id === returnButton.dataset.returnException);
      if (!exception) return;
      tell({ type: 'select-step', index: getShipmentCase(state)!.stages.findIndex(s => s.id === exception.stepId) });
      activeCaseElement().querySelector<HTMLButtonElement>('[data-shipment-step="' + state.positions[state.caseId] + '"] [data-start-exception]')?.focus();
      return;
    }
    const action = event.target.closest<HTMLButtonElement>('[data-shipment-action]');
    if (action) {
      const type = action.dataset.shipmentAction;
      tell({ type });
      // Reset hides its containing case's detail; keep a predictable reading focus.
      if (type === 'reset-case') activeCaseElement().querySelector<HTMLAnchorElement>('[data-step-select="0"]')?.focus();
    }
  });
  app.addEventListener('change', event => {
    if (!(event.target instanceof HTMLInputElement)) return;
    const input = event.target;
    if (input.dataset.evidence) tell({ type: 'check-evidence', id: input.dataset.evidence, checked: input.checked });
    if (input.dataset.response) tell({ type: 'choose-response', id: input.dataset.response });
  });
  app.addEventListener('keydown', event => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>('[data-step-select]');
    if (!link || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', ' '].includes(event.key)) return;
    event.preventDefault();
    const index = Number(link.dataset.stepSelect);
    const last = getShipmentCase(state)!.stages.length - 1;
    const target = event.key === 'Home' ? 0 : event.key === 'End' ? last : event.key === ' ' ? index : Math.max(0, Math.min(last, index + (['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1)));
    const allowed = canVisitShipmentStep(state, target);
    tell({ type: 'select-step', index: target });
    if (allowed) activeCaseElement().querySelector<HTMLAnchorElement>('[data-step-select="' + target + '"]')?.focus();
  });

  // Honor deep links without clearing an already active exercise or its constraints.
  const fromHash = () => {
    let id: string;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    for (const lesson of shipmentCases) {
      const index = lesson.stages.findIndex(step => lesson.id + '-' + step.id === id);
      if (id !== 'case-' + lesson.id && index < 0) continue;
      state = transitionShipment(state, { type: 'select-case', id: lesson.id });
      if (index >= 0) state = transitionShipment(state, { type: 'select-step', index });
      render();
      return;
    }
  };
  app.classList.add('shipment-enhanced');
  app.querySelectorAll<HTMLElement>('[data-shipment-interactive]').forEach(element => element.hidden = false);
  render();
  fromHash();
  window.addEventListener('hashchange', fromHash);
}
