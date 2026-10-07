import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { localizedPath, preferredLanguage, getLanguage } from '../src/i18n/locale.ts';
import { pageCatalog, pageMetadata } from '../src/i18n/metadata.ts';

test('switching preserves the current service, query and fragment without duplicate prefixes', () => {
  assert.equal(localizedPath('/zh/business/customs-clearance?source=home#details', 'tr'), '/tr/business/customs-clearance?source=home#details');
  assert.equal(localizedPath('/ru/', 'en'), '/en/');
  assert.equal(localizedPath('/about#subsidiaries', 'ru'), '/ru/about#subsidiaries');
});
test('first visit defaults to Chinese and storage failures do not prevent navigation', () => {
  globalThis.localStorage = { getItem: () => null };
  assert.equal(preferredLanguage(), 'zh');
  globalThis.localStorage = { getItem: () => 'ru' };
  assert.equal(preferredLanguage(), 'ru');
  globalThis.localStorage = { getItem: () => 'invalid' };
  assert.equal(preferredLanguage(), 'zh');
  globalThis.localStorage = { getItem: () => { throw new Error('Blocked'); } };
  assert.equal(preferredLanguage(), 'zh');
  globalThis.window = { location: { pathname: '/tr/contact' } };
  assert.equal(getLanguage(), 'tr');
});
test('every displayed message has complete translations, including regulatory and numeric details', () => {
  const dictionary = JSON.parse(readFileSync('src/i18n/translations.json', 'utf8'));
  const source = readFileSync('src/app/Site.tsx', 'utf8');
  for (const match of source.matchAll(/\bt\("([^"\n]+)"\)/g)) {
    for (const language of ['en', 'ru', 'tr']) assert.ok(dictionary[match[1]]?.[language], `${language}: ${match[1]}`);
  }
  const modes = Object.keys(dictionary).find(key => key.includes('9610、9710、9810、1210及0110'));
  for (const language of ['en', 'ru', 'tr']) {
    for (const code of ['9610', '9710', '9810', '1210', '0110']) assert.ok(dictionary[modes][language].includes(code));
  }
});
test('all 32 pages have localized descriptions and reciprocal language URLs', () => {
  for (const language of ['zh', 'en', 'ru', 'tr']) {
    for (const page of pageCatalog) {
      const metadata = pageMetadata(page.path, language);
      assert.ok(metadata.description.length > 30);
      assert.equal(metadata.alternatives.length, 4);
      assert.ok(metadata.canonical.includes(`/${language}/`) || metadata.canonical.endsWith(`/${language}${page.path}`));
      if (language !== 'zh') assert.doesNotMatch(metadata.title + metadata.description, /[\u3400-\u9fff]/);
    }
  }
});
