/* eslint-disable no-console */
/**
 * Generates the "Design tokens" tables of the Storybook docs from the component styles in
 * packages/ocean-core. It flattens the SCSS (nesting, `&`, mixins), resolves every `$token`
 * to its Ocean name and value, and flags literal values that have no token.
 *
 * Output: .storybook/assets/tokens/<component>.json (imported by the docs pages and served
 * as a download, since .storybook/assets is the static folder). Storybook runs this on start and build, so the tables cannot drift
 * from the styles. `node scripts/generate-design-tokens.js` runs it by hand.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CORE = path.join(ROOT, 'packages', 'ocean-core', 'src');
const TOKENS_FILE = require.resolve('@useblu/ocean-tokens/web/tokens.scss', {
  paths: [ROOT],
});
const OUT = path.join(ROOT, '.storybook', 'assets', 'tokens');

// ---------------------------------------------------------------------------------------
// SCSS flattening

const stripComments = (source) =>
  source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');

const splitTopLevel = (text, separator) => {
  const parts = [];
  let depth = 0;
  let current = '';
  [...text].forEach((char) => {
    if (char === '(') depth += 1;
    if (char === ')') depth -= 1;
    if (char === separator && depth === 0) {
      parts.push(current);
      current = '';
    } else current += char;
  });
  parts.push(current);
  return parts.map((part) => part.trim()).filter(Boolean);
};

/** Reads `{ ... }` starting at the opening brace; returns [body, indexAfter]. */
const readBlock = (text, start) => {
  let depth = 0;
  for (let i = start; i < text.length; i += 1) {
    if (text[i] === '{') depth += 1;
    if (text[i] === '}') {
      depth -= 1;
      if (depth === 0) return [text.slice(start + 1, i), i + 1];
    }
  }
  throw new Error('Unbalanced braces');
};

const combine = (parents, header) => {
  const children = splitTopLevel(header, ',');
  return parents.flatMap((parent) =>
    children.map((child) => {
      if (!parent) return child;
      if (child.includes('&'))
        return child.replace(/#\{&\}/g, parent).replace(/&/g, parent);
      return `${parent} ${child}`;
    })
  );
};

const parseParams = (text) =>
  splitTopLevel(text, ',').map((param) => {
    const [name, fallback] = param.split(':').map((part) => part.trim());
    return { name, fallback };
  });

/**
 * Walks a SCSS body and calls `emit(selector, property, value, media)` for each
 * declaration. `mixins` maps name → { params, body }.
 */
const walk = (body, selectors, mixins, emit, media = '') => {
  let i = 0;
  while (i < body.length) {
    const next = body.slice(i).search(/[{;}]/);
    if (next < 0) break;
    const end = i + next;
    const head = body.slice(i, end).trim();
    if (body[end] === '{') {
      const [inner, after] = readBlock(body, end);
      if (head.startsWith('@mixin')) {
        const match = head.match(/@mixin\s+([\w-]+)\s*(?:\((.*)\))?/);
        mixins[match[1]] = { params: parseParams(match[2] || ''), body: inner };
      } else if (head.startsWith('@media') || head.startsWith('@supports')) {
        walk(inner, selectors, mixins, emit, head);
      } else if (!head.startsWith('@')) {
        walk(inner, combine(selectors, head), mixins, emit, media);
      }
      i = after;
    } else {
      if (head.startsWith('@include')) {
        const match = head.match(/@include\s+([\w-]+)\s*(?:\((.*)\))?/);
        const mixin = mixins[match[1]];
        if (mixin) {
          const args = match[2] ? splitTopLevel(match[2], ',') : [];
          let mixinBody = mixin.body;
          mixin.params.forEach(({ name, fallback }, index) => {
            const value = args[index] ?? fallback;
            mixinBody = mixinBody.split(name).join(value);
          });
          walk(mixinBody, selectors, mixins, emit, media);
        }
      } else if (head && !head.startsWith('@') && head.includes(':')) {
        const colon = head.indexOf(':');
        selectors.forEach((selector) =>
          emit(
            selector,
            head.slice(0, colon).trim(),
            head
              .slice(colon + 1)
              .trim()
              .replace(/\s+/g, ' '),
            media
          )
        );
      }
      i = end + 1;
    }
  }
};

const readScss = (file) => stripComments(fs.readFileSync(file, 'utf8'));

const sharedMixins = () => {
  const mixins = {};
  walk(
    readScss(path.join(CORE, 'utils', '_list-blend.scss')),
    [''],
    mixins,
    () => {}
  );
  return mixins;
};

const declarations = (file) => {
  const list = [];
  walk(
    readScss(path.join(CORE, 'components', file)),
    [''],
    sharedMixins(),
    (selector, property, value, media) =>
      list.push({ selector, property, value, media, file })
  );
  return list;
};

// ---------------------------------------------------------------------------------------
// Tokens

const TOKENS = Object.fromEntries(
  [
    ...fs.readFileSync(TOKENS_FILE, 'utf8').matchAll(/^\$([\w-]+):\s*(.+);$/gm),
  ].map(([, name, value]) => [name, value.trim()])
);

const DESIGN_PROPERTIES =
  /^(color|background(-color)?|fill|stroke|border(-[\w-]+)?|outline(-offset)?|padding(-[\w]+)?|margin(-[\w]+)?|gap|font-(size|weight|family)|line-height|width|height|min-width|max-width|box-shadow|opacity)$/;
const NEUTRAL_VALUES =
  /^(0|1|none|auto|inherit|transparent|currentColor|100%|fit-content|normal|initial|unset)$/;

const resolve = (value) => {
  const tokens = [...value.matchAll(/\$([\w-]+)/g)].map((m) => m[1]);
  const resolved = value.replace(
    /\$([\w-]+)/g,
    (_, name) => TOKENS[name] ?? `$${name}`
  );
  const literals = value
    .replace(/\$[\w-]+/g, '')
    .match(/#[0-9a-f]{3,8}\b|-?\d*\.?\d+(px|rem|%)?/gi)
    ?.filter((literal) => !/^-?0(px)?$/.test(literal) && literal !== '100%');
  return {
    tokens,
    value: resolved,
    literal: (literals || []).join(' ') || null,
  };
};

// ---------------------------------------------------------------------------------------
// Parts and states

const PART_NAMES = {
  'ods-transaction-list': 'Row',
  'ods-transaction-list__main': 'Row',
  'ods-transaction-list__row': 'Row',
  'ods-checkbox__root': 'Row',
  'ods-radio__root': 'Row',
  'ods-transaction-list__icon': 'Icon',
  'ods-transaction-list__timeline': 'Timeline',
  'ods-transaction-list__timeline-line': 'Timeline line',
  'ods-transaction-list__timeline-icon': 'Timeline icon',
  'ods-transaction-list__content': 'Content area',
  'ods-transaction-list__trailing': 'Trailing',
  'ods-transaction-list__chevron': 'Chevron',
  'ods-transaction-list__divider': 'Divider',
  'ods-transaction-list__skeleton': 'Skeleton',
  'ods-transaction-list__skeleton-text': 'Skeleton',
  'ods-transaction-list__skeleton-amount': 'Skeleton',
  'ods-transaction-list__actions': 'Menu trigger',
  'ods-internal-list-actions__trigger': 'Menu trigger',
  'ods-transaction-list__control': 'Control',
  'ods-checkbox__label': 'Label',
  'ods-radio__label': 'Label',
  'ods-skeleton-bar': 'Skeleton',
  'ods-list-expandable': 'Row',
  'ods-list-expandable__main': 'Row',
  'ods-list-expandable__icon': 'Icon',
  'ods-list-expandable__transaction-content': 'Content area',
  'ods-list-expandable__trailing': 'Trailing',
  'ods-list-expandable__action': 'Chevron',
  'ods-list-expandable__divider': 'Divider',
  'ods-list-expandable__footer': 'Supporting text',
  'ods-list-expandable__skeleton': 'Skeleton',
  'ods-list-expandable__skeleton-list': 'Skeleton',
  'ods-list-expandable__skeleton-amount': 'Skeleton',
  'ods-list-expandable__content': 'Child items',
  'ods-content-list': 'Block',
  'ods-content-list__indicator': 'Indicator',
  'ods-typography__paragraph': 'Emphasized line (md)',
  'ods-typography__description': 'Small line (md)',
  'ods-typography__captionbold': 'Caption',
  'ods-content-list__emphasis': 'Emphasized line (sm)',
  'ods-content-list__support': 'Small line (sm)',
  'ods-typography__paragraph--strikethrough-text': 'Struck text',
  'ods-amount-details': 'Block',
  'ods-amount-details__amount': 'Value',
  'ods-amount-details__amount-sign': 'Sign',
  'ods-amount-details__amount-row': 'Value row',
  'ods-amount-details__strikethrough': 'Struck value',
  'ods-amount-details__caption': 'Info',
  'ods-amount-details__indicator': 'Tag',
  'ods-tag': 'Tag',
  'ods-tag__content': 'Tag text',
  'ods-tag__icon': 'Tag icon',
  'ods-transaction-footer': 'Footer',
  'ods-transaction-footer__content': 'Rows',
  'ods-transaction-footer__details': 'Details',
  'ods-transaction-footer__total': 'Total',
  'ods-transaction-footer__total-label': 'Total label',
  'ods-transaction-footer__total-value': 'Total value',
  'ods-transaction-footer__notice': 'Notice',
  'ods-transaction-footer__action': 'Action',
  'ods-transaction-summary': 'Summary',
  'ods-transaction-summary__title': 'Title',
  'ods-transaction-summary__card': 'Card',
  'ods-transaction-summary__rows': 'Rows',
  'ods-transaction-summary__details': 'Details',
  'ods-transaction-summary__total': 'Total',
  'ods-transaction-summary__total-label': 'Total label',
  'ods-transaction-summary__total-value': 'Total value',
  'ods-transaction-summary__notice': 'Notice',
  'ods-transaction-summary__action': 'Action',
  'ods-transaction-notice': 'Notice',
  'ods-transaction-notice__icon': 'Notice icon',
  'ods-transaction-notice__content': 'Notice content',
  'ods-transaction-notice__title': 'Notice title',
  'ods-transaction-notice__description': 'Notice description',
};

const STATE_NAMES = {
  hover: 'Hover',
  'focus-visible': 'Focus',
  'focus-within': 'Focus',
  active: 'Pressed',
  disabled: 'Disabled',
  inactive: 'Disabled',
  compact: 'Compact',
  loading: 'Loading',
  'on-color': 'on-color',
  highlight: 'highlight',
  default: 'default',
  child: 'Child (no iconColor)',
  visible: 'Visible',
  expanded: 'Expanded',
  positive: 'positive',
  negative: 'negative',
  warning: 'warning',
  neutral: 'neutral',
  complementary: 'complementary',
  strikethrough: 'strikethrough',
  'strikethrough-neutral': 'strikethrough-neutral',
  'highlight-lead': 'highlight-lead',
  md: 'Size md',
  sm: 'Size sm',
  medium: 'Size md',
  small: 'Size sm',
  app: 'App',
  swipe: 'Swipe',
};

const describe = (selector) => {
  const clean = selector
    .replace(/:not\([^)]*\)/g, '')
    .replace(/:has\([^)]*\)/g, '');
  const classes = [...clean.matchAll(/\.([\w-]+)/g)].map((m) => m[1]);
  // The part is the last class with a known name (element names win over modifiers).
  let part = 'Row';
  for (let i = classes.length - 1; i >= 0; i -= 1) {
    const name = classes[i];
    if (PART_NAMES[name]) {
      part = PART_NAMES[name];
      break;
    }
    const element = name.replace(/--[\w-]+$/, '');
    if (PART_NAMES[element]) {
      part = PART_NAMES[element];
      break;
    }
  }
  const states = new Set();
  classes.forEach((name) => {
    const modifier = name.match(/--([\w-]+)$/)?.[1];
    if (modifier && STATE_NAMES[modifier]) states.add(STATE_NAMES[modifier]);
  });
  [...clean.matchAll(/:([\w-]+)/g)].forEach(([, pseudo]) => {
    if (STATE_NAMES[pseudo]) states.add(STATE_NAMES[pseudo]);
  });
  if (/svg\s*$/.test(clean) && part === 'Row') part = 'Icon';
  return { part, state: [...states].join(' · ') || 'Default' };
};

// ---------------------------------------------------------------------------------------
// Components

const has =
  (...words) =>
  (selector) =>
    words.some((word) => selector.includes(word));
const not = (test) => (selector) => !test(selector);
const all =
  (...tests) =>
  (selector) =>
    tests.every((test) => test(selector));

const NOT_DOCS = has('--show-hover', ':has(');
const ROW_VARIANTS = {
  selectable: has('--selectable', 'ods-checkbox', 'ods-radio', '__control'),
  child: has('--child', '__timeline'),
  interactive: has(
    '--interactive',
    '__chevron',
    '__row',
    '__actions',
    '--swipe',
    'internal-list-actions'
  ),
  icon: (s) =>
    /__icon(?![\w-])|__icon--/.test(s) && !s.includes('timeline-icon'),
};

const ROW_FILE = '_transaction-list.scss';
const SKELETON_FILE = '_skeleton-bar.scss';

const COMPONENTS = {
  'transaction-list-read-only': {
    files: [ROW_FILE, SKELETON_FILE],
    include: all(
      not(NOT_DOCS),
      not(ROW_VARIANTS.selectable),
      not(ROW_VARIANTS.child),
      not(ROW_VARIANTS.interactive)
    ),
  },
  'transaction-footer-summary': {
    files: ['_transaction-footer.scss'],
    include: (selector) => selector.startsWith('.ods-transaction-'),
  },
  'transaction-list-action': {
    files: [ROW_FILE, SKELETON_FILE],
    include: all(
      not(NOT_DOCS),
      not(ROW_VARIANTS.selectable),
      not(ROW_VARIANTS.child)
    ),
  },
  'transaction-list-selectable': {
    files: [ROW_FILE, SKELETON_FILE],
    include: all(
      not(NOT_DOCS),
      not(ROW_VARIANTS.child),
      not(ROW_VARIANTS.interactive),
      not(ROW_VARIANTS.icon)
    ),
  },
  'transaction-list-child-read-only': {
    files: [ROW_FILE, SKELETON_FILE],
    include: all(
      not(NOT_DOCS),
      not(ROW_VARIANTS.selectable),
      not(ROW_VARIANTS.interactive),
      not(ROW_VARIANTS.icon)
    ),
  },
  'transaction-list-child-action': {
    files: [ROW_FILE, SKELETON_FILE],
    include: all(
      not(NOT_DOCS),
      not(ROW_VARIANTS.selectable),
      not(has('__row', '__actions', '--swipe', 'internal-list-actions')),
      not(ROW_VARIANTS.icon)
    ),
  },
  'transaction-list-expandable': {
    files: ['_list-expandable.scss', SKELETON_FILE],
    include: all(
      not(NOT_DOCS),
      not(
        has('ods-list-action', ':not(.ods-content-list__text)', '__skeleton.')
      )
    ),
  },
  'content-list-default': {
    files: ['_content-list.scss'],
    include: () => true,
  },
  'content-list-amount': {
    files: ['_amount-details.scss', '_tag.scss'],
    include: (selector) =>
      !selector.startsWith('.ods-tag') ||
      /^\.ods-tag(--(medium|small|neutral|complementary|positive|warning|negative))?( \.ods-tag__(content))?$/.test(
        selector
      ),
  },
};

// Visual order of the anatomy parts (left to right, top to bottom), then of the states.
const PART_ORDER = [
  'Footer',
  'Summary',
  'Card',
  'Rows',
  'Details',
  'Notice',
  'Notice content',
  'Notice icon',
  'Notice title',
  'Notice description',
  'Title',
  'Total',
  'Total label',
  'Total value',
  'Action',
  'Row',
  'Block',
  'Control',
  'Label',
  'Icon',
  'Content area',
  'Emphasized line (md)',
  'Small line (md)',
  'Emphasized line (sm)',
  'Small line (sm)',
  'Caption',
  'Struck text',
  'Indicator',
  'Value row',
  'Value',
  'Sign',
  'Struck value',
  'Tag',
  'Tag text',
  'Tag icon',
  'Info',
  'Trailing',
  'Chevron',
  'Menu trigger',
  'Timeline',
  'Timeline icon',
  'Timeline line',
  'Child items',
  'Supporting text',
  'Divider',
  'Skeleton',
];
const STATE_ORDER = [
  'Default',
  'Hover',
  'Focus',
  'Pressed',
  'Selected',
  'Expanded',
];
const STATE_LAST = ['Compact', 'Swipe', 'App', 'Loading', 'Disabled'];

const partRank = (part) => {
  const index = PART_ORDER.indexOf(part);
  return index < 0 ? PART_ORDER.length : index;
};

/** Default and interactive states first, variants (sizes, types, colors) next, then density, loading and disabled. */
const stateRank = (state) => {
  const first = state.split(' · ')[0];
  if (STATE_ORDER.includes(first)) return STATE_ORDER.indexOf(first);
  if (STATE_LAST.includes(first)) return 100 + STATE_LAST.indexOf(first);
  return 50;
};

const compareRows = (a, b) =>
  partRank(a.part) - partRank(b.part) ||
  stateRank(a.state) - stateRank(b.state) ||
  a.state.localeCompare(b.state) ||
  a.property.localeCompare(b.property);

const generate = () => {
  fs.mkdirSync(OUT, { recursive: true });
  const index = {};
  Object.entries(COMPONENTS).forEach(([id, { files, include }]) => {
    const seen = new Set();
    const rows = files
      .flatMap(declarations)
      .filter(
        ({ selector, property }) =>
          include(selector) && DESIGN_PROPERTIES.test(property)
      )
      .map(({ selector, property, value, file }) => {
        if (
          NEUTRAL_VALUES.test(value) ||
          (/^-?\d*\.?\d+$/.test(value) && property !== 'opacity')
        )
          return null;
        const { tokens, value: resolved, literal } = resolve(value);
        if (!tokens.length && !literal) return null;
        const { part, state } = describe(selector);
        const row = {
          part,
          property,
          state,
          tokens,
          value: resolved,
          noToken: literal,
          source: `${file} ${selector}`,
        };
        const key = `${part}|${property}|${state}|${value}`;
        if (seen.has(key)) return null;
        seen.add(key);
        return row;
      })
      .filter(Boolean)
      .sort(compareRows);
    const output = {
      component: id,
      generatedFrom: files.map(
        (file) => `packages/ocean-core/src/components/${file}`
      ),
      rows,
    };
    fs.writeFileSync(
      path.join(OUT, `${id}.json`),
      `${JSON.stringify(output, null, 2)}\n`
    );
    index[id] = rows.length;
  });
  return index;
};

module.exports = { generate };

if (require.main === module) {
  const index = generate();
  console.log('Design tokens generated:', index);
}
