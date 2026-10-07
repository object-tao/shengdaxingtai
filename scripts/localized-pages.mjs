import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { pageCatalog, pageMetadata } from '../src/i18n/metadata.ts';
import { languages, localizedPath } from '../src/i18n/locale.ts';

const template = readFileSync('dist/index.html', 'utf8');
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const urls = [];
for (const language of languages) {
  for (const page of pageCatalog) {
    const metadata = pageMetadata(page.path, language);
    const path = localizedPath(page.path, language);
    const head = [
      `<link rel="canonical" href="${metadata.canonical}" />`,
      ...metadata.alternatives.map(item => `<link rel="alternate" hreflang="${item.language === 'zh' ? 'zh-CN' : item.language}" href="${item.url}" />`),
      `<link rel="alternate" hreflang="x-default" href="${metadata.alternatives[0].url}" />`,
      `<meta property="og:title" content="${escape(metadata.title)}" />`,
      `<meta property="og:description" content="${escape(metadata.description)}" />`,
      `<meta property="og:url" content="${metadata.canonical}" />`,
    ].join('\n');
    const html = template
      .replace(/<html lang="[^"]*"/, `<html lang="${language === 'zh' ? 'zh-CN' : language}"`)
      .replace(/<title>.*?<\/title>/, `<title>${escape(metadata.title)}</title>`)
      .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escape(metadata.description)}" />`)
      .replace('</head>', `${head}\n</head>`);
    const directory = join('dist', path);
    mkdirSync(directory, { recursive: true });
    writeFileSync(join(directory, 'index.html'), html);
    urls.push(metadata.canonical);
  }
}
writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url => `<url><loc>${url}</loc></url>`).join('')}</urlset>`);
writeFileSync('dist/robots.txt', 'User-agent: *\nAllow: /\nSitemap: https://shengdaxingtai.com/sitemap.xml\n');
writeFileSync('dist/_redirects', pageCatalog.filter(page => page.path !== '/').map(page => `${page.path} /zh${page.path} 301`).join('\n') + '\n');
console.log(`Generated ${urls.length} localized pages, sitemap and legacy redirects.`);
