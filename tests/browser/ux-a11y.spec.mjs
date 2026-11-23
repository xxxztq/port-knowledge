import { expect, test } from '@playwright/test';

const base = '/port-knowledge/';
test.use({ reducedMotion: 'reduce' });

for (const width of [390, 1100]) {
  test(`collapsed navigation is keyboard-operable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 840 });
    await page.goto(base);
    const header = page.getByRole('banner');
    const toggle = header.getByRole('button', { name: /导航/ });
    const nav = header.locator('#site-navigation');
    const search = header.getByRole('link', { name: '搜索港口知识' });
    const firstMainLink = page.getByRole('main').getByRole('link', { name: '跟着箱子出发' });
    await expect(nav).toBeHidden();
    await expect(search).toHaveCount(1);
    await search.focus();
    await page.keyboard.press('Tab');
    await expect(toggle).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(toggle).toHaveAccessibleName('收起导航');
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');

    const links = await nav.getByRole('link').all();
    expect(links.length).toBeGreaterThan(1);
    await page.keyboard.press('Tab');
    await expect(links[0]).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(toggle).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(links[0]).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveAccessibleName('展开导航');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(nav).toBeHidden();
    await page.keyboard.press('Tab');
    await expect(firstMainLink).toBeFocused();

    await toggle.press('Space');
    await expect(nav).toBeVisible();
    await page.keyboard.press('Shift+Tab');
    await expect(search).toBeFocused();
    await expect(nav).toBeHidden();
    await page.keyboard.press('Escape');
    await expect(search).toBeFocused();

    await toggle.press('Space');
    await expect(nav).toBeVisible();
    await toggle.press('Space');
    await expect(nav).toBeHidden();
    await expect(toggle).toBeFocused();

    await toggle.press('Enter');
    for (const link of links) {
      await page.keyboard.press('Tab');
      await expect(link).toBeFocused();
    }
    await page.keyboard.press('Tab');
    await expect(firstMainLink).toBeFocused();
    await expect(nav).toBeHidden();

    await toggle.press('Enter');
    await nav.getByRole('link', { name: '箱型与货类' }).press('Enter');
    await expect(page).toHaveURL(base + 'cargo/');
    await expect(nav).toBeHidden();
    await page.goBack();
    await expect(nav).toBeHidden();
  });
}

test('a short viewport can scroll the open menu to the last focused link', async ({ page }) => {
  const height = 170;
  await page.setViewportSize({ width: 320, height });
  await page.goto(base);
  await page.locator('.mobile-toggle').press('Enter');
  const nav = page.getByRole('navigation', { name: '主要导航' });
  const links = await nav.getByRole('link').all();
  const box = await nav.boundingBox();
  const scroll = await nav.evaluate(element => ({
    overflowY: getComputedStyle(element).overflowY,
    clientHeight: element.clientHeight,
    scrollHeight: element.scrollHeight,
  }));
  expect(box.y + box.height).toBeLessThanOrEqual(height - 8);
  expect(scroll.overflowY).toBe('auto');
  expect(scroll.scrollHeight).toBeGreaterThan(scroll.clientHeight);
  for (const link of links) await page.keyboard.press('Tab');
  await expect(links.at(-1)).toBeFocused();
  await expect(links.at(-1)).toBeInViewport({ ratio: 1 });
});

test('desktop navigation keeps its tab order and mobile disclosure resets on resize', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(base);
  const header = page.getByRole('banner');
  const brand = header.getByRole('link', { name: '看懂港口首页' });
  const nav = header.getByRole('navigation', { name: '主要导航' });
  const search = header.getByRole('link', { name: '搜索港口知识' });
  const toggle = header.locator('.mobile-toggle');
  await expect(toggle).toBeHidden();
  await expect(search).toHaveCount(1);
  await brand.focus();
  await page.keyboard.press('Tab');
  await expect(nav.getByRole('link').first()).toBeFocused();
  await nav.getByRole('link').last().focus();
  await page.keyboard.press('Tab');
  await expect(search).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(search).toBeFocused();
  await expect(nav).toBeVisible();

  await page.setViewportSize({ width: 1180, height: 900 });
  await toggle.click();
  await expect(nav).toBeVisible();
  await page.setViewportSize({ width: 1181, height: 900 });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(nav).toBeVisible();
  await page.setViewportSize({ width: 1180, height: 900 });
  await expect(nav).toBeHidden();
});

for (const width of [320, 390]) {
  test(`knowledge map exposes its complete directory without horizontal scrolling at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(base + 'knowledge-map/');
    const directory = page.getByRole('navigation', { name: '知识大类目录' });
    await expect(directory.getByText('地图目录', { exact: true })).toBeVisible();
    const links = await directory.locator('[data-km-index]').all();
    expect(links.length).toBe(await page.locator('[data-km-group]').count());
    expect(links.length).toBeGreaterThan(1);
    for (const link of links) {
      await expect(link).toBeVisible();
      expect((await link.boundingBox()).height).toBeGreaterThanOrEqual(44);
    }
    const sizes = await directory.evaluate(element => ({
      hasHorizontalScroll: element.scrollWidth > element.clientWidth,
      pageHasHorizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    }));
    expect(sizes).toEqual({ hasHorizontalScroll: false, pageHasHorizontalScroll: false });

    const lastLink = links.at(-1);
    const hash = await lastLink.getAttribute('href');
    await lastLink.press('Enter');
    await expect(page).toHaveURL(base + 'knowledge-map/' + hash);
    await expect(page.locator(hash).getByRole('heading', { level: 3 })).toBeInViewport();
  });
}

for (const width of [320, 950, 1440]) {
  test(`homepage notes and legend remain legible at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base);
    const legend = page.locator('.map-legend');
    await expect(legend).toBeVisible();
    expect(await legend.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);

    const notes = page.locator('.hero-proof > span:last-child, .map-note > span, .map-legend > span, .map-legend > small:visible, .eyebrow.muted');
    expect(await notes.count()).toBeGreaterThanOrEqual(5);
    for (const note of await notes.all()) {
      const { text, ratio, fontSize } = await note.evaluate(element => {
        const rgb = value => value.match(/[\d.]+/g).map(Number);
        const lightness = channels => channels.slice(0, 3).reduce((sum, value, index) => {
          const s = value / 255;
          const linear = s <= .04045 ? s / 12.92 : ((s + .055) / 1.055) ** 2.4;
          return sum + linear * [.2126, .7152, .0722][index];
        }, 0);
        const style = getComputedStyle(element);
        // All target areas sit on solid surfaces; transparent descendants inherit that surface visually.
        let background = [255, 255, 255];
        for (let node = element; node; node = node.parentElement) {
          const color = rgb(getComputedStyle(node).backgroundColor);
          if (color.length === 3 || color[3] === 1) {
            background = color;
            break;
          }
        }
        const values = [lightness(rgb(style.color)), lightness(background)].sort((a, b) => b - a);
        return { text: element.textContent, ratio: (values[0] + .05) / (values[1] + .05), fontSize: parseFloat(style.fontSize) };
      });
      expect(ratio, text).toBeGreaterThanOrEqual(4.5);
      expect(fontSize, text).toBeGreaterThanOrEqual(11);
    }
  });
}
