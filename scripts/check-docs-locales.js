/* eslint-disable no-console */
/**
 * Fails when the docs locale files are out of sync: every key (and list length, and
 * `{placeholder}`) of `<page>.en.json` must exist in `<page>.pt.json` and the other way
 * round. Run by `yarn lint`.
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', '.storybook', 'docs-blocks', 'locales');
const LOCALES = ['en', 'pt'];

const flatten = (node, prefix = '', out = {}) => {
  if (Array.isArray(node)) {
    out[prefix] = { list: node.length };
    node.forEach((item, index) => flatten(item, `${prefix}[${index}]`, out));
  } else if (node && typeof node === 'object') {
    Object.entries(node).forEach(([key, value]) =>
      flatten(value, prefix ? `${prefix}.${key}` : key, out)
    );
  } else {
    out[prefix] = {
      placeholders: (String(node).match(/\{\w+\}/g) || []).sort().join(','),
      empty: String(node).trim() === '',
    };
  }
  return out;
};

const pages = [
  ...new Set(
    fs
      .readdirSync(DIR)
      .filter((file) => file.endsWith('.json'))
      .map((file) => file.replace(/\.(\w+)\.json$/, ''))
  ),
];

const problems = [];
pages.forEach((page) => {
  const flat = {};
  LOCALES.forEach((locale) => {
    const file = path.join(DIR, `${page}.${locale}.json`);
    if (!fs.existsSync(file)) {
      problems.push(`${page}: missing ${locale} file`);
      flat[locale] = {};
      return;
    }
    flat[locale] = flatten(JSON.parse(fs.readFileSync(file, 'utf8')));
  });
  const [a, b] = LOCALES;
  const keys = new Set([...Object.keys(flat[a]), ...Object.keys(flat[b])]);
  keys.forEach((key) => {
    const x = flat[a][key];
    const y = flat[b][key];
    if (!x || !y) {
      problems.push(`${page}: "${key}" only in ${x ? a : b}`);
    } else if (JSON.stringify(x) !== JSON.stringify(y)) {
      problems.push(
        `${page}: "${key}" differs (${JSON.stringify(x)} vs ${JSON.stringify(
          y
        )})`
      );
    } else if (x.empty) {
      problems.push(`${page}: "${key}" is empty`);
    }
  });
});

if (problems.length) {
  console.error(`Docs locales out of sync (${problems.length}):\n`);
  problems.forEach((problem) => console.error(`  ${problem}`));
  process.exit(1);
}
console.log(
  `Docs locales in sync (${pages.length} pages × ${LOCALES.length} languages).`
);
