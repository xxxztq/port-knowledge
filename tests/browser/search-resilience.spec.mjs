import {test,expect} from '@playwright/test';
const base='/port-knowledge/';
const openSearch=async(page,query)=>{await page.goto(base+'library/?q='+encodeURIComponent(query));await expect(page.locator('body')).toHaveAttribute('data-search-ready','true');await expect(page.locator('body')).toHaveAttribute('data-search-index-state','full');};

test('opening the library stays on summary data until a keyword is entered',async({page})=>{
 let requests=0;
 await page.route('**/search-index.json*',async route=>{requests++;await route.continue();});
 await page.goto(base+'library/');
 await expect(page.locator('body')).toHaveAttribute('data-search-index-state','summary');
 await expect(page.locator('#search-status')).toContainText('输入关键词后');
 await page.waitForTimeout(150);
 expect(requests).toBe(0);
 await page.getByLabel('搜索知识百科').fill('管网交接留痕');
 await expect(page.locator('body')).toHaveAttribute('data-search-index-state','full');
 expect(requests).toBe(1);
 await expect(page.locator('[data-search-card][href*="shipment/"]')).toBeVisible();
});

test('search anchors activate the hidden shipment step and system panel',async({page})=>{
 await openSearch(page,'管网交接留痕');
 const shipment=page.locator('[data-search-card][href*="shipment/"]').first();
 await expect(shipment).toHaveAttribute('href',/shipment\/#lng-handover$/);
 await shipment.click();
 await expect(page.locator('#lng-handover')).toBeVisible();
 await openSearch(page,'电子口岸与中国国际贸易单一窗口');
 const systems=page.locator('[data-search-card][href*="systems/"]').first();
 await expect(systems).toHaveAttribute('href',/systems\/#system-single-window$/);
 await systems.click();
 await expect(page.locator('#system-single-window')).toBeVisible();
});

test('malformed full-text index preserves summary search and can retry',async({page})=>{
 let requests=0;
 await page.route('**/search-index.json*',async route=>{
  requests++;
  if(requests===1) await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({version:2,entries:[null]})});
  else await route.continue();
 });
 await page.goto(base+'library/?q='+encodeURIComponent('粉红色集装箱'));
 await expect(page.locator('body')).toHaveAttribute('data-search-ready','fallback');
 await expect(page.locator('#retry-search-index')).toBeVisible();
 await expect(page.locator('[data-search-card][href*="brands/"]')).toBeVisible();
 await page.locator('#retry-search-index').click();
 await expect(page.locator('body')).toHaveAttribute('data-search-index-state','full');
 await expect(page.locator('#retry-search-index')).toBeHidden();
});

test('aborted full-text requests keep summary matching and retry after recovery',async({page})=>{
 let fail=true;
 await page.route('**/search-index.json*',async route=>{if(fail)await route.abort();else await route.continue();});
 await page.goto(base+'library/');
 await page.getByLabel('搜索知识百科').fill('粉红色集装箱');
 await expect(page.locator('body')).toHaveAttribute('data-search-ready','fallback');
 await expect(page.locator('[data-search-card][href*="brands/"]')).toBeVisible();
 fail=false;
 await page.locator('#retry-search-index').click();
 await expect(page.locator('body')).toHaveAttribute('data-search-index-state','full');
});

test('corrupt bookmarks do not suppress valid read progress',async({page})=>{
 await page.goto(base+'knowledge-map/');
 const href=await page.locator('.km-steps').first().locator('li a').first().getAttribute('href');
 await page.goto(href);
 const read=page.locator('[data-learning-toggle="read"]').first();
 await read.click();
 await expect(read).toHaveAttribute('aria-pressed','true');
 await page.evaluate(()=>localStorage.setItem('port-bookmarks','{}'));
 await page.reload();
 await expect(read).toHaveAttribute('aria-pressed','true');
 await page.goto(base+'knowledge-map/');
 await expect(page.locator('.km-steps').first().locator('li.is-read')).toHaveCount(1);
 await expect(page.locator('.route-progress').first()).toContainText('已完成 1 /');
});
