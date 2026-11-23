import { expect, test } from '@playwright/test';

const base = '/port-knowledge/';
const article = base + 'knowledge/k01-overview/';

for (const width of [1440, 390]) {
  test('primary navigation exposes knowledge map and vessel atlas at ' + width + 'px', async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base);
    const toggle = page.getByRole('button', { name: '展开导航' });
    if (width <= 1180) {
      await expect(toggle).toBeVisible();
      await toggle.click();
      await expect(page.getByRole('button', { name: '收起导航' })).toHaveAttribute('aria-expanded', 'true');
    }
    const nav = page.getByRole('navigation', { name: '主要导航' });
    const mapLink = nav.getByRole('link', { name: '知识地图' });
    await expect(mapLink).toHaveAttribute('href', base + 'knowledge-map/');
    await expect(nav.getByRole('link', { name: '船型图鉴' })).toHaveAttribute('href', base + 'vessels/');
    await mapLink.click();
    await expect(page).toHaveURL(base + 'knowledge-map/');
    if (width <= 1180) await page.getByRole('button', { name: '展开导航' }).click();
    const vesselLink = page.getByRole('navigation', { name: '主要导航' }).getByRole('link', { name: '船型图鉴' });
    await vesselLink.click();
    await expect(page).toHaveURL(base + 'vessels/');
    if (width <= 1180) await page.getByRole('button', { name: '展开导航' }).click();
    await expect(page.getByRole('navigation', { name: '主要导航' }).getByRole('link', { name: '船型图鉴' })).toHaveAttribute('aria-current', 'page');
  });
}

test('mobile article provides a collapsed in-page navigation after its summary', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(article);
  const toc = page.locator('.article-mobile-toc');
  await expect(toc).toBeVisible();
  await expect(toc).not.toHaveAttribute('open', '');
  const order = await page.evaluate(() => {
    const summary = document.querySelector('#article-summary');
    const toc = document.querySelector('.article-mobile-toc');
    const visual = document.querySelector('#visual-explainer');
    return !!summary && !!toc && !!visual && summary.compareDocumentPosition(toc) & Node.DOCUMENT_POSITION_FOLLOWING && toc.compareDocumentPosition(visual) & Node.DOCUMENT_POSITION_FOLLOWING;
  });
  expect(order).toBeTruthy();
  await toc.locator('summary').click();
  await expect(toc).toHaveAttribute('open', '');
  const firstSection = page.locator('#section-0');
  await expect(toc.getByRole('link', { name: await firstSection.locator('h2').textContent() })).toHaveAttribute('href', '#section-0');
  await toc.getByRole('link', { name: '先看一张图' }).click();
  await expect(page).toHaveURL(/#visual-explainer$/);
  await expect(page.locator('#visual-explainer')).toBeInViewport();
});

test('desktop article retains its sticky sidebar and does not show the mobile disclosure', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(article);
  await expect(page.locator('.article-mobile-toc')).toBeHidden();
  await expect(page.locator('.article-aside')).toBeVisible();
  await expect(page.locator('.article-aside .aside-box').first()).toContainText('本篇导航');
});

test('return-to-top moves keyboard focus to the article title', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(article);
  await page.evaluate(() => window.scrollTo(0, 1200));
  const back = page.getByRole('button', { name: '返回页首' });
  await expect(back).toBeVisible();
  await back.click();
  await expect(page.locator('#article-title')).toBeFocused();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(10);

  await page.goto(base + 'scenarios/import-full-container/');
  await page.evaluate(() => window.scrollTo(0, 1000));
  const scenarioTop = page.getByRole('button', { name: '返回页首' });
  await expect(scenarioTop).toBeVisible();
  await scenarioTop.click();
  await expect(page.locator('.article-body h1')).toBeFocused();
});

test('gate failures keep focus while successful transitions focus the next action', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base + 'gate/');
  const authorize = page.locator('[data-event="authorize"]');
  const firstCheck = page.locator('[data-check]').first();
  await firstCheck.uncheck();
  await authorize.focus();
  await authorize.click();
  await expect(authorize).toBeFocused();
  await expect(page.locator('#gate-result')).toContainText('暂不能授权');

  await firstCheck.check();
  await authorize.click();
  const open = page.locator('[data-event="open"]');
  await expect(open).toBeFocused();
  await page.locator('#device-ready').uncheck();
  await open.click();
  await expect(open).toBeFocused();
  await expect(page.locator('#gate-result')).toContainText('设备／通道未就绪');

  await page.locator('#device-ready').check();
  await open.click();
  const pass = page.locator('[data-event="pass"]');
  await expect(pass).toBeFocused();
  await pass.click();
  const record = page.locator('[data-event="record"]');
  await expect(record).toBeFocused();
  await record.click();
  await expect(page.locator('#reset-gate')).toBeFocused();
  await expect(page.locator('#gate-state')).toHaveText('记录已确认');
  await expect(page.locator('[data-state="recorded"]')).toHaveAttribute('aria-current', 'step');
});

test('gate key steps and state feedback remain readable on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto(base + 'gate/');
  const size = await page.evaluate(() => ({
    progress: parseFloat(getComputedStyle(document.querySelector('.gate-progress li')).fontSize),
    button: parseFloat(getComputedStyle(document.querySelector('[data-event="authorize"]')).fontSize),
    result: parseFloat(getComputedStyle(document.querySelector('#gate-result')).fontSize),
    columns: getComputedStyle(document.querySelector('.gate-progress')).gridTemplateColumns,
    pageWidth: document.documentElement.scrollWidth,
  }));
  expect(size.progress).toBeGreaterThanOrEqual(12);
  expect(size.button).toBeGreaterThanOrEqual(13);
  expect(size.result).toBeGreaterThanOrEqual(14);
  expect(size.columns.split(' ').length).toBe(2);
  expect(size.pageWidth).toBeLessThanOrEqual(321);
});
