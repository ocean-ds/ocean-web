/* eslint-disable no-console */
/**
 * Fails when the Storybook docs blocks use raw design values instead of Ocean tokens:
 * hex or rgb()/hsl() colors, px values and font-family literals. Checks the styles
 * (.scss/.css) and the style strings of the components (.ts/.tsx) under
 * .storybook/docs-blocks. Run by `yarn lint`.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '.storybook', 'docs-blocks');

const STYLE_RULES = [
  { name: 'hex color', pattern: /#[0-9a-f]{3,8}\b/i },
  { name: 'rgb/hsl color', pattern: /\b(rgba?|hsla?)\s*\(/i },
  { name: 'raw px value', pattern: /(^|[^\w$-])\d*\.?\d+px\b/ },
  { name: 'font-family literal', pattern: /font-family\s*:\s*[^$\s]/i },
];

// Anywhere in components: color literals and font families.
const SCRIPT_RULES = [
  { name: 'hex color', pattern: /['"`]#[0-9a-f]{3,8}['"`]/i },
  { name: 'rgb/hsl color', pattern: /['"`]\s*(rgba?|hsla?)\s*\(/i },
  { name: 'font-family literal', pattern: /fontFamily\s*:/ },
];

// Inside inline `style={{ ... }}` objects: no px values (documentation text may cite them).
const INLINE_STYLE_RULES = [
  {
    name: 'raw px value in inline style',
    pattern: /\d*\.?\d+px\b|:\s*\d+\s*[,}]/,
  },
];

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });

const stripComments = (line, inBlock) => {
  let text = line;
  let block = inBlock;
  if (block) {
    const end = text.indexOf('*/');
    if (end < 0) return { text: '', block };
    text = text.slice(end + 2);
    block = false;
  }
  text = text.replace(/\/\*.*?\*\//g, '');
  const start = text.indexOf('/*');
  if (start >= 0) {
    text = text.slice(0, start);
    block = true;
  }
  return { text: text.replace(/(^|\s)\/\/.*$/, '$1'), block };
};

const problems = [];

walk(ROOT).forEach((file) => {
  const ext = path.extname(file);
  let rules = null;
  if (['.scss', '.css'].includes(ext)) rules = STYLE_RULES;
  if (['.ts', '.tsx'].includes(ext)) rules = SCRIPT_RULES;
  if (!rules) return;
  let block = false;
  let inStyle = false;
  fs.readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, index) => {
      const stripped = stripComments(line, block);
      block = stripped.block;
      const opensStyle =
        rules === SCRIPT_RULES && /style=\{\{/.test(stripped.text);
      inStyle = inStyle || opensStyle;
      const active = inStyle ? [...rules, ...INLINE_STYLE_RULES] : rules;
      if (inStyle && /\}\}/.test(stripped.text)) inStyle = false;
      active.forEach(({ name, pattern }) => {
        if (pattern.test(stripped.text)) {
          problems.push(
            `${path.relative(process.cwd(), file)}:${
              index + 1
            }  ${name}: ${line.trim()}`
          );
        }
      });
    });
});

if (problems.length) {
  console.error(
    `Docs blocks must use Ocean tokens (@useblu/ocean-tokens). ${problems.length} problem(s):\n`
  );
  problems.forEach((problem) => console.error(`  ${problem}`));
  process.exit(1);
}
console.log('Docs blocks use Ocean tokens only.');
