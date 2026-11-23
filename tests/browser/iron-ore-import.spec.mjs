import { expect, test } from '@playwright/test';

const base = '/port-knowledge/';
const scenario = base + 'scenarios/iron-ore-import/';

test('iron-ore import scenario exposes the system handoff and detailed steps on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(scenario);
  await expect(page.getByRole('heading', { level: 1, name: /进口铁矿石：从卸船料流到货批交付/ })).toBeVisible();
  await expect(page.locator('.route-stop')).toHaveCount(7);
  await expect(page.locator('.route-preview').first()).toContainText('关联系统与记录');
  await expect(page.locator('.route-preview').first()).toContainText('客户／货票主档');

  await page.locator('.route-stop').nth(3).click();
  await expect(page.locator('.route-preview').nth(3)).toBeVisible();
  await expect(page.locator('.route-preview').nth(3)).toContainText('质量档案');
  await expect(page.locator('#step-3')).toContainText('如果卡住');
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});

test('iron-ore and bulk-carrier reference pages link to the same import case', async ({ page }) => {
  await page.goto(base + 'cargo/iron-ore/');
  await page.getByRole('link', { name: /铁矿石进口完整业务案例/ }).click();
  await expect(page).toHaveURL(scenario);

  await page.goto(base + 'vessels/bulk-carrier/');
  await page.getByRole('link', { name: /进口铁矿石从卸船到交付/ }).click();
  await expect(page).toHaveURL(scenario);
});
