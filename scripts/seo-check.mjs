import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const read = (path) => readFileSync(join(root, path), 'utf8');

const indexHtml = read('index.html');
const packageJson = JSON.parse(read('package.json'));
const vercelConfig = JSON.parse(read('vercel.json'));
const app = read('src/App.jsx');

const requiredRoutes = ['/', '/projects', '/about', '/contact', '/privacy'];

assert.match(
  indexHtml,
  /<title>Celestial Core \| RealDzolat Systems &amp; Game Engineering<\/title>/,
  'index.html should expose a descriptive default title'
);
assert.match(
  indexHtml,
  /<meta name="description" content=".{120,160}" \/>/,
  'index.html should expose a search-length default meta description'
);
assert.match(indexHtml, /<link rel="canonical" href="https:\/\/celestialcore\.cc\/" \/>/);
assert.match(indexHtml, /<meta property="og:url" content="https:\/\/celestialcore\.cc\/" \/>/);
assert.match(indexHtml, /<meta property="og:image" content="https:\/\/celestialcore\.cc\/projects\/celestial\.png" \/>/);
assert.match(indexHtml, /<meta name="twitter:title" content="Celestial Core \| RealDzolat Systems &amp; Game Engineering" \/>/);
assert.match(indexHtml, /<script[^>]+type="application\/ld\+json"[^>]*>[\s\S]*"@type": "WebSite"[\s\S]*<\/script>/);

for (const route of requiredRoutes) {
  assert.match(app, new RegExp(`path="${route === '/' ? '\\/' : route}"`), `${route} should be routed`);
}

assert.equal(existsSync(join(root, 'src/utils/seo.js')), true, 'route SEO metadata should live in src/utils/seo.js');
assert.equal(existsSync(join(root, 'src/components/SEO.jsx')), true, 'SEO component should manage route metadata');
assert.equal(
  existsSync(join(root, 'scripts/build-route-html.mjs')),
  true,
  'build should generate per-route HTML metadata'
);
assert.match(packageJson.scripts.build, /build-route-html\.mjs/, 'build should run the route HTML generator');
assert.equal(vercelConfig.cleanUrls, true, 'Vercel should serve generated route HTML with clean URLs');
assert.equal(existsSync(join(root, 'public/robots.txt')), true, 'robots.txt should exist');
assert.equal(existsSync(join(root, 'public/sitemap.xml')), true, 'sitemap.xml should exist');
assert.equal(existsSync(join(root, 'public/site.webmanifest')), true, 'site.webmanifest should exist');

const sitemap = read('public/sitemap.xml');
for (const route of requiredRoutes) {
  assert.match(
    sitemap,
    new RegExp(`<loc>https://celestialcore\\.cc${route === '/' ? '/' : `${route}/?`}</loc>`),
    `sitemap should include ${route}`
  );
}

const robots = read('public/robots.txt');
assert.match(robots, /User-agent: \*/);
assert.match(robots, /Allow: \//);
assert.match(robots, /Sitemap: https:\/\/celestialcore\.cc\/sitemap\.xml/);

const seo = read('src/utils/seo.js');
for (const route of requiredRoutes) {
  assert.match(seo, new RegExp(`['"]${route}['"]`), `SEO metadata should include ${route}`);
}
assert.match(seo, /noindex: true/, 'not-found metadata should mark missing pages noindex');
