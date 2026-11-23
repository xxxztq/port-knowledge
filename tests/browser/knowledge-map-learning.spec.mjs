import { test, expect } from '@playwright/test';

const base = '/port-knowledge/';

test('knowledge map filters report the actual independent coverage states', async ({ page }) => {
  await page.goto(base + 'knowledge-map/');
  const cards = page.locator('[data-km-domain]:visible');
  await expect(cards).toHaveCount(24);

  await page.locator('input[name="view"][value="missing-entry"]').check();
  await expect(cards).toHaveCount(0);
  await expect(page.locator('input[name="view"][value="missing-entry"]')).toHaveAttribute('data-km-empty-title', '当前所有知识域的四个维度都有入口');

  await page.locator('input[name="view"][value="missing-case"]').check();
  await expect(cards).toHaveCount(1);
  await expect(page.locator('#k14')).toContainText('缺独立案例：邮轮母港换客');

  await page.locator('input[name="view"][value="deepen"]').check();
  await expect(cards).toHaveCount(24);
  await expect(page.locator('#km-results-status')).toContainText('显示 24 个知识域');
});

test('soy and LNG route nodes navigate within their own live shipment cases without per-anchor read counts', async ({ page }) => {
  await page.goto(base + 'knowledge-map/');
  const route = page.locator('#route-one-shipment');
  await route.locator('.km-route-details > summary').click();

  const soy = route.locator('[data-km-shipment="soybeans"]');
  await soy.locator('summary').click();
  await expect(soy.locator('.km-shipment-steps > li')).toHaveCount(7);
  await expect(route.locator('.route-progress')).toHaveCount(0);
  await expect(soy.getByRole('link', { name: /SOY-A|大豆货物档案/ })).toBeVisible();
  await soy.getByRole('link', { name: /船岸接卸/ }).click();
  await expect(page).toHaveURL(/shipment\/#soybeans-unloading$/);
  await expect(page.locator('#soybeans-unloading')).toBeVisible();

  await page.goto(base + 'knowledge-map/');
  const again = page.locator('#route-one-shipment');
  await again.locator('.km-route-details > summary').click();
  const lng = again.locator('[data-km-shipment="lng"]');
  await lng.locator('summary').click();
  await expect(lng.locator('.km-shipment-steps > li')).toHaveCount(7);
  await expect(lng.getByRole('link', { name: /LNG货物档案/ })).toBeVisible();
  await lng.getByRole('link', { name: /管网交接留痕/ }).click();
  await expect(page).toHaveURL(/shipment\/#lng-handover$/);
  await expect(page.locator('#lng-handover')).toBeVisible();
});

test('one-shipment comparisons are explicitly optional, not steps in either cargo route', async ({ page }) => {
  await page.goto(base + 'knowledge-map/');
  const route = page.locator('#route-one-shipment');
  await route.locator('.km-route-details > summary').click();
  const comparisons = route.locator('[data-km-comparison]');
  await comparisons.locator('summary').click();
  await expect(comparisons).toContainText('选读对照 · 不计入路线');
  await expect(comparisons.getByRole('link')).toHaveCount(2);
  await expect(comparisons).toContainText('不是大豆提货的必经步骤');
});
