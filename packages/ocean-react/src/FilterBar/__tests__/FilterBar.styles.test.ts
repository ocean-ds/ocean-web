/**
 * @jest-environment node
 */
import fs from 'fs';
import path from 'path';
import { compileString } from 'sass';

describe('compiled FilterBar styles', () => {
  const nodeModules = path.resolve(
    require.resolve('@useblu/ocean-tokens/package.json'),
    '../../..'
  );
  const oceanCore = path.resolve(__dirname, '../../../../ocean-core/src');
  const { css } = compileString(
    `@import '@useblu/ocean-tokens/web/tokens'; @import 'utils/all'; @import 'components/filter-bar';`,
    { loadPaths: [nodeModules, oceanCore] }
  );
  // The media block of `query`, found by matching its braces.
  const block = (query: string): string => {
    const start = css.indexOf(`@media ${query}`);
    let depth = 0;
    let end = css.indexOf('{', start);
    do {
      if (css[end] === '{') depth += 1;
      if (css[end] === '}') depth -= 1;
      end += 1;
    } while (depth > 0);
    return css.slice(start, end);
  };
  const desktopCss = block('(min-width: 768px)');
  const mobileCss = block('(max-width: 767.98px)');
  const sharedCss = css.replace(desktopCss, '').replace(mobileCss, '');
  const rule = (selector: string, source: string) => {
    const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return source.match(
      new RegExp(`(?:^|\\n|\\{)\\s*${escaped}\\s*\\{([^}]*)\\}`)
    )?.[1];
  };
  const properties = (source: string, selector: string) =>
    (rule(selector, source) ?? '')
      .split(';')
      .map((declaration) => declaration.split(':')[0].trim())
      .filter(Boolean);

  test('uses only tokens in the source, except the documented popover gap', () => {
    // Comments may mention design sizes; only declarations count.
    const source = fs
      .readFileSync(path.join(oceanCore, 'components/_filter-bar.scss'), 'utf8')
      .replace(/\/\/.*$/gm, '');
    expect(source).not.toMatch(/#[0-9a-f]{3,8}\b/i);
    expect(source).not.toMatch(/rgba?\(/);
    expect(source.match(/\d+px/g)).toEqual(['6px']);
  });

  test('the shared rules never set a property that a layout block sets', () => {
    [
      '.ods-filter-bar',
      '.ods-filter-bar__filters',
      '.ods-filter-bar__chips',
      '.ods-filter-bar__divider--all-filters',
      '.ods-filter-bar__segmented',
    ].forEach((selector) => {
      const shared = properties(sharedCss, selector);
      [desktopCss, mobileCss].forEach((layout) => {
        properties(layout, selector).forEach((property) =>
          expect(shared).not.toContain(property)
        );
      });
    });
  });

  test('bar: white, no side padding, anchors the chip popovers', () => {
    const root = rule('.ods-filter-bar', sharedCss);
    expect(root).toContain('background-color: white');
    expect(root).toContain('display: flex');
    expect(root).toContain('align-items: center');
    expect(root).toContain('position: relative');
    expect(root).not.toContain('padding');
    const chip = rule('.ods-filter-bar .ods-chips', sharedCss);
    expect(chip).toContain('position: static');
    expect(chip).toContain('flex: none');
    expect(rule('.ods-filter-bar .ods-chips__label', sharedCss)).toContain(
      'white-space: nowrap'
    );
    expect(rule('.ods-filter-bar__chips', sharedCss)).toContain('gap: 8px');
  });

  test('divider: 1 wide, 32 high, light down', () => {
    const divider = rule('.ods-filter-bar__divider', sharedCss);
    expect(divider).toContain('border-left: 1px solid #e0e2ee');
    expect(divider).toContain('height: 32px');
    expect(divider).toContain('flex: none');
  });

  test('desktop: 80 high; only the chips scroll, with 16 at the end', () => {
    expect(rule('.ods-filter-bar', desktopCss)).toContain('height: 80px');
    const chips = rule('.ods-filter-bar__chips', desktopCss);
    expect(chips).toContain('overflow-x: auto');
    expect(chips).toContain('padding-right: 16px');
    expect(chips).toContain('flex: 0 1 auto');
    expect(chips).toContain('min-width: 0');
    expect(rule('.ods-filter-bar__filters', desktopCss)).not.toContain(
      'overflow'
    );
    expect(rule('.ods-filter-bar__divider--all-filters', desktopCss)).toContain(
      'margin-right: 16px'
    );
  });

  test('desktop: Segmented Control on the right, divider only without "All filters"', () => {
    const segmented = rule('.ods-filter-bar__segmented', desktopCss);
    expect(segmented).toContain('margin-left: auto');
    expect(segmented).toContain('padding-left: 16px');
    expect(
      rule(
        '.ods-filter-bar--all-filters .ods-filter-bar__divider--segmented',
        desktopCss
      )
    ).toContain('display: none');
  });

  test('desktop: chip popovers open under the clicked chip, placed by FilterBar', () => {
    const options = rule('.ods-filter-bar .ods-chips__options', desktopCss);
    expect(options).toContain('left: var(--ods-filter-bar-popover-left, 0)');
    expect(options).toContain('top: var(--ods-filter-bar-popover-top, 100%)');
    expect(options).toContain('margin-top: 6px');
    const menu = rule(
      '.ods-filter-bar .ods-chips__contextual-menu',
      desktopCss
    );
    expect(menu).toContain('left: var(--ods-filter-bar-popover-left, 0)');
    expect(menu).toContain('top: var(--ods-filter-bar-popover-top, 100%)');
  });

  test('mobile: 64 high, chips and "All filters" scroll together with 16 on both ends', () => {
    expect(rule('.ods-filter-bar', mobileCss)).toContain('height: 64px');
    const filters = rule('.ods-filter-bar__filters', mobileCss);
    expect(filters).toContain('overflow-x: auto');
    expect(filters).toContain('padding: 0 16px');
    expect(filters).toContain('gap: 8px');
    expect(filters).toContain('flex: 1 1 auto');
    expect(rule('.ods-filter-bar__chips', mobileCss)).toContain('flex: none');
    expect(rule('.ods-filter-bar__chips', mobileCss)).not.toContain('overflow');
    expect(rule('.ods-filter-bar__divider--all-filters', mobileCss)).toContain(
      'margin: 0 8px'
    );
  });

  test('mobile with the Segmented Control: one divider, then 8 · control · 16', () => {
    expect(
      rule(
        '.ods-filter-bar--segmented .ods-filter-bar__divider--all-filters',
        mobileCss
      )
    ).toContain('display: none');
    expect(mobileCss).not.toContain('.ods-filter-bar__divider--segmented');
    const segmented = rule('.ods-filter-bar__segmented', mobileCss);
    expect(segmented).not.toContain('margin-left');
    expect(segmented).toContain('padding: 0 16px 0 8px');
  });

  test('Segmented Control: at most half of the bar, labels cut with an ellipsis beyond that', () => {
    const segmented = rule('.ods-filter-bar__segmented', sharedCss);
    expect(segmented).toContain('max-width: 50%');
    expect(segmented).toContain('box-sizing: border-box');
    expect(
      rule('.ods-filter-bar__segmented .ods-segmented-control', sharedCss)
    ).toContain('min-width: 0');
  });
});
