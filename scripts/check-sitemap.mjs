import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve('dist');
const normalizeRoute = value => {
  const route = value.replaceAll('\\', '/').replace(/^\/+/, '');
  if (route === 'index.html') return '';
  if (route.endsWith('/index.html')) return route.slice(0, -'index.html'.length);
  return route;
};
const files = await fs.readdir(root, { recursive: true });
const pageRoutes = new Set(files
  .filter(file => file.endsWith('.html'))
  .map(normalizeRoute)
  .filter(route => route !== '404.html'));
const sitemapPath = path.join(root, 'sitemap.xml');
const xml = await fs.readFile(sitemapPath, 'utf8');
const sitemapUrls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]));
if (!sitemapUrls.length) throw new Error('Sitemap contains no URLs.');
const origin = sitemapUrls[0].origin;
const basePath = sitemapUrls[0].pathname;
if (!basePath.endsWith('/')) throw new Error(`Sitemap homepage URL must end in '/': ${sitemapUrls[0].href}`);
const sitemapRoutes = sitemapUrls.map(url => {
  if (url.origin !== origin || !url.pathname.startsWith(basePath)) throw new Error(`Sitemap URL is outside the site base: ${url.href}`);
  return url.pathname.slice(basePath.length);
});
const sitemapSet = new Set(sitemapRoutes);
const duplicates = sitemapRoutes.filter((route, index) => sitemapRoutes.indexOf(route) !== index);
const missing = [...pageRoutes].filter(route => !sitemapSet.has(route));
const extra = [...sitemapSet].filter(route => !pageRoutes.has(route));
if (duplicates.length || missing.length || extra.length) {
  const lines = [];
  if (duplicates.length) lines.push(`duplicate sitemap routes: ${duplicates.join(', ')}`);
  if (missing.length) lines.push(`pages missing from sitemap: ${missing.join(', ')}`);
  if (extra.length) lines.push(`sitemap routes without pages: ${extra.join(', ')}`);
  throw new Error(lines.join('\n'));
}
console.log(`Sitemap OK: ${sitemapSet.size} generated pages covered; 404 excluded.`);
