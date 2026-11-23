import { test, expect } from '@playwright/test';

const base = '/port-knowledge/';

test('one fictional import container links documents, systems, customs transit, gate, and settlement', async ({ page }) => {
  await page.goto(base + 'import-container/');
  await expect(page.getByRole('heading', { level: 1, name: '跟一只进口箱：从单证到交付对账' })).toBeVisible();
  await expect(page.locator('.box-scope')).toContainText('备选路径，不是连续动作');

  for (const id of ['paperwork', 'yard', 'systems', 'choose-path', 'gate-check', 'settlement']) {
    await expect(page.locator('#' + id)).toBeVisible();
  }
  await expect(page.locator('#choose-path')).toContainText('本港提货');
  await expect(page.locator('#choose-path')).toContainText('进口转关');
  await expect(page.locator('#transit-pickup')).toContainText('这个出闸是监管运输发运，不是交付给最终提货人');
  await expect(page.locator('#transit-pickup a')).toHaveAttribute('href', base + 'scenarios/customs-transit/');
  await expect(page.locator('#systems a[href^="' + base + 'systems/"]')).toHaveAttribute('href', base + 'systems/#system-message-chain');
  await expect(page.locator('#gate-check')).toContainText('实际通行');
  await expect(page.locator('#settlement')).toContainText('单票服务收入不是利润');
});

test('import container lesson stays within the mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base + 'import-container/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('.box-toc a')).toHaveCount(6);
});

test('knowledge map exposes the linked A-01 lesson and separates related case coverage', async ({ page }) => {
  await page.goto(base + 'knowledge-map/');
  await expect(page.locator('[data-km-summary="dedicated-case"] .km-summary-number')).toHaveText('19');
  await expect(page.locator('[data-km-summary="related-case"] .km-summary-number')).toHaveText('05');
  await page.locator('input[name="view"][value="related-case"]').check();
  await expect(page.locator('[data-km-domain]:visible')).toHaveCount(5);
  await expect(page.locator('[data-km-domain]:visible .km-case-status[data-case-kind="related"]')).toHaveCount(5);
  await page.locator('input[name="view"][value="all"]').check();
  const route = page.locator('#route-one-shipment');
  await route.locator('.km-route-details > summary').click();
  await expect(route.locator('.km-featured-case')).toContainText('进口箱 A-01');
  await route.locator('.km-featured-case a').click();
  await expect(page).toHaveURL(/\/import-container\/$/);
  await expect(page.locator('#paperwork')).toBeVisible();
});

test('knowledge map summary uses a compact responsive desktop and mobile grid', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(base + 'knowledge-map/');
  const columns = () => page.locator('.km-summary-grid').evaluate(element => getComputedStyle(element).gridTemplateColumns.split(' ').length);
  expect(await columns()).toBe(5);
  await page.setViewportSize({ width: 1100, height: 900 });
  expect(await columns()).toBe(3);
  await page.setViewportSize({ width: 950, height: 900 });
  expect(await columns()).toBe(2);
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await columns()).toBe(2);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
