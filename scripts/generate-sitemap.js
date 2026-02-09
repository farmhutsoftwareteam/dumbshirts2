/**
 * Generates sitemap.xml by querying Supabase for all non-draft products.
 * Run: node scripts/generate-sitemap.js
 *
 * Requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env
 * Falls back to static product data if Supabase is not configured.
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://dumbshirts.co.za';
const OUTPUT = resolve(__dirname, '..', 'public', 'sitemap.xml');

// Try to load .env manually (no dotenv dep — just parse the file)
function loadEnv() {
  try {
    const envPath = resolve(__dirname, '..', '.env');
    const raw = readFileSync(envPath, 'utf-8');
    const vars = {};
    for (const line of raw.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      vars[trimmed.slice(0, eq)] = trimmed.slice(eq + 1).replace(/^["']|["']$/g, '');
    }
    return vars;
  } catch {
    return {};
  }
}

function buildXml(urls) {
  const today = new Date().toISOString().split('T')[0];
  const entries = urls
    .map(
      ({ loc, priority, changefreq }) =>
        `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq || 'weekly'}</changefreq>\n    <priority>${priority || '0.5'}</priority>\n  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

async function fetchProductSlugs(env) {
  const url = env.VITE_SUPABASE_URL;
  const key = env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  const res = await fetch(`${url}/rest/v1/products?select=drop_number,status&status=neq.draft&order=sort_order.asc`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
    },
  });

  if (!res.ok) {
    console.warn(`Supabase fetch failed (${res.status}), falling back to static data`);
    return null;
  }

  return (await res.json()).map((p) => p.drop_number);
}

async function main() {
  const env = loadEnv();
  let dropNumbers = await fetchProductSlugs(env);

  if (!dropNumbers) {
    console.log('Using static product data as fallback...');
    // Import static products — dynamic import relative path
    const productsPath = resolve(__dirname, '..', 'src', 'data', 'products.js');
    try {
      const mod = await import(productsPath);
      const products = mod.default || [];
      dropNumbers = products.map((p) => p.dropNumber);
    } catch {
      dropNumbers = ['001'];
      console.log('Could not load static products, using hardcoded fallback');
    }
  }

  const urls = [
    { loc: `${SITE_URL}/`, priority: '1.0', changefreq: 'weekly' },
    ...dropNumbers.map((dn) => ({
      loc: `${SITE_URL}/drop/${dn}`,
      priority: '0.9',
      changefreq: 'weekly',
    })),
    { loc: `${SITE_URL}/vault`, priority: '0.6', changefreq: 'weekly' },
  ];

  const xml = buildXml(urls);
  writeFileSync(OUTPUT, xml, 'utf-8');
  console.log(`Sitemap generated with ${urls.length} URLs → public/sitemap.xml`);
}

main().catch(console.error);
