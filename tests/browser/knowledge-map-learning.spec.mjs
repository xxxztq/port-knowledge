import { test, expect } from '@playwright/test';

const base = '/port-knowledge/';

test('knowledge map exposes coverage summary and turns learning tasks into filters', async ({ page }) => {
  await page.goto(base + 'knowledge-map/');

  await expect(page.locator('[data-km-summary="domains"] .km-summary-number')).toHaveText('24');
  await expect(page.locator('[data-km-summary="groups"] .km-summary-number')).toHaveText('09');
  await expect(page.locator('[data-km-summary="practice"] .km-summary-number')).toHaveText('09');
  await expect(page.locator('[data-km-summary="dedicated-case"] .km-summary-number')).toHaveText('19');
  await expect(page.locator('[data-km-summary="related-case"] .km-summary-number')).toHaveText('05');

  const cards = page.locator('[data-km-domain]:visible');
  await page.locator('#km-search').fill('不会匹配的检索词');
  await page.locator('#km-group').selectOption('cargo-business');
  await expect(cards).toHaveCount(0);
  await page.getByRole('link', { name: /先做可作答练习/ }).click();
  await expect(page).toHaveURL(/view=practice/);
  await expect(page.locator('#km-search')).toHaveValue('');
  await expect(page.locator('#km-group')).toHaveValue('all');
  expect(new URL(page.url()).searchParams.has('q')).toBe(false);
  expect(new URL(page.url()).searchParams.has('group')).toBe(false);
  await expect(cards).toHaveCount(9);
  await expect(page.locator('#km-results-status')).toContainText('显示 9 个知识域');
  await expect(page.locator('#km-results-status')).toBeFocused();
  await expect(page.locator('[data-km-quick-view="practice"]')).toHaveAttribute('data-km-active', 'true');

  await page.getByRole('link', { name: /看相关案例可借读的领域/ }).click();
  await expect(page).toHaveURL(/view=related-case/);
  await expect(cards).toHaveCount(5);
  await expect(cards.first().locator('.km-case-status')).toContainText('相关案例可借读');
  await expect(page.locator('[data-km-quick-view="related-case"]')).toHaveAttribute('data-km-active', 'true');
});

test('knowledge map filters report the actual independent coverage states', async ({ page }) => {
  await page.goto(base + 'knowledge-map/');
  const cards = page.locator('[data-km-domain]:visible');
  await expect(cards).toHaveCount(24);

  await page.locator('input[name="view"][value="missing-entry"]').check();
  await expect(cards).toHaveCount(0);
  await expect(page.locator('input[name="view"][value="missing-entry"]')).toHaveAttribute('data-km-empty-title', '当前所有知识域的四个维度都有入口');

  await page.locator('input[name="view"][value="dedicated-case"]').check();
  await expect(cards).toHaveCount(19);
  await page.locator('input[name="view"][value="related-case"]').check();
  await expect(cards).toHaveCount(5);
  await expect(cards.locator('.km-case-status[data-case-kind="related"]')).toHaveCount(5);

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


test('knowledge map restores shareable query filters on first load, refresh, and a copied URL', async ({ page, context }) => {
  const sharedUrl = `${base}knowledge-map/?q=${encodeURIComponent('大豆')}&group=cargo-business&view=practice`;
  await page.goto(sharedUrl);

  await expect(page.locator('#km-search')).toHaveValue('大豆');
  await expect(page.locator('#km-group')).toHaveValue('cargo-business');
  await expect(page.locator('input[name="view"][value="practice"]')).toBeChecked();
  const originalIds = await page.locator('[data-km-domain]:visible').evaluateAll(cards => cards.map(card => card.id));

  await page.reload();
  await expect(page.locator('#km-search')).toHaveValue('大豆');
  await expect(page.locator('#km-group')).toHaveValue('cargo-business');
  await expect(page.locator('input[name="view"][value="practice"]')).toBeChecked();

  const copiedPage = await context.newPage();
  await copiedPage.goto(page.url());
  await expect(copiedPage.locator('#km-search')).toHaveValue('大豆');
  await expect(copiedPage.locator('#km-group')).toHaveValue('cargo-business');
  await expect(copiedPage.locator('input[name="view"][value="practice"]')).toBeChecked();
  await expect(copiedPage.locator('[data-km-domain]:visible')).toHaveCount(originalIds.length);
  await copiedPage.close();
});

test('knowledge map browser back and forward restore each filter state', async ({ page }) => {
  await page.goto(base + 'knowledge-map/');
  await page.locator('#km-search').fill('港口');
  await expect(page).toHaveURL(/q=%E6%B8%AF%E5%8F%A3/);

  await page.locator('#km-group').selectOption('cargo-business');
  await expect(page).toHaveURL(/group=cargo-business/);
  await page.locator('input[name="view"][value="practice"]').check();
  await expect(page).toHaveURL(/view=practice/);

  await page.goBack();
  await expect(page.locator('input[name="view"][value="all"]')).toBeChecked();
  await expect(page.locator('#km-search')).toHaveValue('港口');
  await expect(page.locator('#km-group')).toHaveValue('cargo-business');

  await page.goBack();
  await expect(page.locator('#km-group')).toHaveValue('all');
  await expect(page.locator('#km-search')).toHaveValue('港口');

  await page.goForward();
  await expect(page.locator('#km-group')).toHaveValue('cargo-business');
  await page.goForward();
  await expect(page.locator('input[name="view"][value="practice"]')).toBeChecked();
});

test('knowledge map keeps a shareable no-results state after refresh', async ({ page }) => {
  await page.goto(`${base}knowledge-map/?q=${encodeURIComponent('完全不存在的港口知识词')}&group=cargo-business&view=practice`);

  await expect(page.locator('[data-km-domain]:visible')).toHaveCount(0);
  await expect(page.locator('[data-km-empty]')).toBeVisible();
  await expect(page.locator('.km-empty [data-km-empty-title]')).toHaveText('暂时没有匹配的主题');
  await expect(page.locator('#km-results-status')).toContainText('显示 0 个知识域');

  await page.reload();
  await expect(page.locator('#km-search')).toHaveValue('完全不存在的港口知识词');
  await expect(page.locator('#km-group')).toHaveValue('cargo-business');
  await expect(page.locator('input[name="view"][value="practice"]')).toBeChecked();
  await expect(page.locator('[data-km-domain]:visible')).toHaveCount(0);
  await expect(page.locator('[data-km-empty]')).toBeVisible();
});


test('knowledge map remains readable with JavaScript disabled', async ({ browser }) => {
  const noJsContext = await browser.newContext({ javaScriptEnabled: false });
  const noJsPage = await noJsContext.newPage();
  await noJsPage.goto(base + 'knowledge-map/');

  await expect(noJsPage.locator('[data-km-controls]')).toBeHidden();
  await expect(noJsPage.locator('[data-km-domain]:visible')).toHaveCount(24);
  await expect(noJsPage.getByRole('heading', { name: /把港口知识.*连成自己的路线/ })).toBeVisible();
  await noJsContext.close();
});
