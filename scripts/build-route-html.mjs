import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  absoluteUrl,
  buildStructuredData,
  imageUrl,
  routeSeo,
  siteConfig
} from '../src/utils/seo.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const distRoot = join(root, 'dist');
const indexPath = join(distRoot, 'index.html');

if (!existsSync(indexPath)) {
  throw new Error('dist/index.html was not found. Run vite build before route HTML generation.');
}

const sourceHtml = readFileSync(indexPath, 'utf8');
const searchableRoutes = Object.values(routeSeo).filter((route) => route.path && !route.noindex);

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function replaceTag(html, regex, replacement) {
  if (regex.test(html)) return html.replace(regex, replacement);
  return html.replace('</head>', `    ${replacement}\n  </head>`);
}

function setMetaName(html, name, content) {
  const replacement = `<meta name="${name}" content="${escapeHtml(content)}" />`;
  return replaceTag(html, new RegExp(`<meta name="${name}" content="[^"]*" \\/>`), replacement);
}

function setMetaProperty(html, property, content) {
  const replacement = `<meta property="${property}" content="${escapeHtml(content)}" />`;
  return replaceTag(html, new RegExp(`<meta property="${property}" content="[^"]*" \\/>`), replacement);
}

function setCanonical(html, href) {
  const replacement = `<link rel="canonical" href="${escapeHtml(href)}" />`;
  return replaceTag(html, /<link rel="canonical" href="[^"]*" \/>/, replacement);
}

function setStructuredData(html, metadata) {
  const json = JSON.stringify(buildStructuredData(metadata));
  const replacement = `<script id="structured-data" type="application/ld+json">${json}</script>`;
  return replaceTag(
    html,
    /<script id="structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/,
    replacement
  );
}

function renderRouteHtml(metadata) {
  const canonical = absoluteUrl(metadata.path);
  const previewImage = imageUrl(metadata.image || siteConfig.image);
  const imageAlt = metadata.imageAlt || siteConfig.imageAlt;
  const robots = metadata.noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  let html = sourceHtml;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(metadata.title)}</title>`);
  html = setMetaName(html, 'description', metadata.description);
  html = setMetaName(html, 'robots', robots);
  html = setCanonical(html, canonical);
  html = setMetaProperty(html, 'og:title', metadata.title);
  html = setMetaProperty(html, 'og:description', metadata.description);
  html = setMetaProperty(html, 'og:url', canonical);
  html = setMetaProperty(html, 'og:image', previewImage);
  html = setMetaProperty(html, 'og:image:secure_url', previewImage);
  html = setMetaProperty(html, 'og:image:alt', imageAlt);
  html = setMetaProperty(html, 'og:type', metadata.schemaType === 'ProfilePage' ? 'profile' : 'website');
  html = setMetaName(html, 'twitter:title', metadata.title);
  html = setMetaName(html, 'twitter:description', metadata.description);
  html = setMetaName(html, 'twitter:image', previewImage);
  html = setMetaName(html, 'twitter:image:alt', imageAlt);
  html = setStructuredData(html, metadata);
  return html;
}

for (const route of searchableRoutes) {
  const html = renderRouteHtml(route);
  const targets = route.path === '/'
    ? [indexPath]
    : [
        join(distRoot, `${route.path.replace(/^\//, '')}.html`),
        join(distRoot, route.path.replace(/^\//, ''), 'index.html')
      ];

  for (const target of targets) {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, html);
  }
}

writeFileSync(join(distRoot, '404.html'), renderRouteHtml(routeSeo['*']));
