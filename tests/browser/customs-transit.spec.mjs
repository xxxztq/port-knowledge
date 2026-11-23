import { expect, test } from '@playwright/test';
const base = '/port-knowledge/';
const scenario = base + 'scenarios/customs-transit/';
const arrivalSource = 'https://www.mofcom.gov.cn/zcfb/zgdwjjmywg/art/2019/art_5265f4821e434b3a9d7fa86a568e7c85.html';

test('transit is listed in Flows and the mobile case can be read and answered', async ({page}) => {
  await page.setViewportSize({width: 320, height: 800});
  await page.goto(base);
  await page.getByRole('link', {name: /转关箱到站了/}).click();
  await expect(page).toHaveURL(scenario);
  await page.goto(base + 'flows/');
  await page.getByRole('link', {name: /进口转关运输/}).click();
  await expect(page).toHaveURL(scenario);
  await expect(page.getByRole('heading', {level: 1, name: /进口转关运输/})).toBeVisible();
  await expect(page.locator('.transit-step')).toHaveCount(7);
  await expect(page.locator('.transit-step').nth(1)).toContainText('直转方式');
  await page.locator('a[href="#step-4"]').click();
  await expect(page).toHaveURL(scenario + '#step-4');
  await expect(page.locator('#step-4')).toContainText('运抵报告');
  await page.locator('#step-4').locator('a[href="#source-arrival-report"]').click();
  await expect(page).toHaveURL(scenario + '#source-arrival-report');
  await expect(page.locator('#source-arrival-report a')).toHaveAttribute('href', arrivalSource);
  const question = page.locator('[data-knowledge-check]');
  await question.getByRole('radio', {name: '能，运抵报告已接收等于进口放行。'}).check();
  await question.getByRole('button', {name: '看看解释'}).click();
  await expect(question.getByRole('status')).toContainText('不等于进口放行');
  await question.getByRole('radio', {name: /不能。分别查转关核销/}).check();
  await question.getByRole('button', {name: '看看解释'}).click();
  await expect(question.getByRole('status')).toContainText('理解正确');
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await page.goto(scenario);
  const international = page.locator('.comparison-grid article').filter({has: page.getByRole('heading', {name: '保税国际中转'})});
  await expect(international).toContainText('不能泛化成所有港口换船接续');
  await international.getByRole('link', {name: /对照依据/}).click();
  await expect(page).toHaveURL(scenario + '#source-international-transshipment');
  await expect(page.locator('#source-international-transshipment').getByRole('link', {name: /海关总署公告2023年第109号/})).toBeVisible();
});

test('transit details, sources and the quiz answer stay readable without JavaScript', async ({browser}) => {
  const context = await browser.newContext({javaScriptEnabled: false});
  try {
    const page = await context.newPage();
    await page.goto(new URL(scenario, test.info().project.use.baseURL).href);
    await expect(page.locator('.transit-step')).toHaveCount(7);
    await expect(page.locator('#source-supervision')).toBeVisible();
    await expect(page.locator('[data-check-controls]')).toBeHidden();
    await page.getByText('查看答案解释', {exact: true}).click();
    await expect(page.getByText(/先分清每个状态证明的是哪一件事/)).toBeVisible();
  } finally {
    await context.close();
  }
});


test('full-text search lands on the visible transit exception step', async ({page}) => {
  const query = '承运人或司机通知附近海关';
  await page.goto(base + 'library/?q=' + encodeURIComponent(query));
  await expect(page.locator('body')).toHaveAttribute('data-search-ready', 'true');
  const hit = page.locator('[data-search-card][href*="scenarios/customs-transit/"]');
  await expect(hit).toHaveAttribute('href', scenario + '#step-3');
  await hit.click();
  await expect(page.locator('#step-3')).toBeVisible();
  await expect(page.locator('#step-3')).toContainText(query);
});

test('desktop deep link shows the cited source below the sticky header', async ({page}) => {
  await page.setViewportSize({width: 1440, height: 900});
  await page.goto(scenario + '#source-arrival-report');
  const source = page.locator('#source-arrival-report a');
  await expect(source).toHaveAttribute('href', arrivalSource);
  await expect(source).toBeInViewport();
  await expect.poll(() => source.evaluate(link => {
    const header = document.querySelector('.site-header');
    return header !== null && link.getBoundingClientRect().top >= header.getBoundingClientRect().bottom;
  })).toBe(true);
});
