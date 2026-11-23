import type { APIRoute } from 'astro';
import { cargoProfiles } from '../data/cargo-business.js';
import { foundationTopics } from '../data/port-foundations.js';
import { infrastructureTopics } from '../data/infrastructure.js';
import { articles } from '../data/knowledge.js';
import { portRisks } from '../data/port-risks.js';
import { scenarios } from '../data/scenarios.js';
import { vesselProfiles } from '../data/vessel-types.js';

const normalizeBase = (value: string) => value.replace(/^\/+|\/+$/g, '');
const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, character => ({
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  "'": '&apos;',
  '"': '&quot;',
}[character] ?? character));

const staticRoutes = [
  '',
  'journey/',
  'flows/',
  'cargo/',
  'roles/',
  'equipment/',
  'systems/',
  'gate/',
  'economics/',
  'library/',
  'knowledge-map/',
  'foundations/',
  'infrastructure/',
  'shipment/',
  'import-container/',
  'containers/',
  'documents/',
  'vessels/',
  'berthing/',
  'risks/',
  'about/',
  'brands/',
  'brands-and-ports/',
  'cargo/minerals/',
  'cargo/grains/',
  'cargo/liquids/',
];

const dynamicRoutes = [
  ...cargoProfiles.map(item => `cargo/${item.id}/`),
  ...foundationTopics.map(item => `foundations/${item.id}/`),
  ...infrastructureTopics.map(item => `infrastructure/${item.id}/`),
  ...articles.map(item => `knowledge/${item.id}/`),
  ...portRisks.map(item => `risks/${item.id}/`),
  ...scenarios.map(item => `scenarios/${item.id}/`),
  ...vesselProfiles.map(item => `vessels/${item.id}/`),
];

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://xxxztq.github.io');
  const base = normalizeBase(import.meta.env.BASE_URL);
  const siteRoot = new URL(base ? `/${base}/` : '/', origin);
  const routes = [...new Set([...staticRoutes, ...dynamicRoutes])];
  const urls = routes.map(route => {
    const location = new URL(route, siteRoot).href;
    return `  <url>\n    <loc>${escapeXml(location)}</loc>\n  </url>`;
  });
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};