/**
 * @jest-environment node
 */
import fs from 'fs';
import path from 'path';
import { compileString } from 'sass';

describe('compiled Tab styles', () => {
  const nodeModules = path.resolve(
    require.resolve('@useblu/ocean-tokens/package.json'),
    '../../..'
  );
  const oceanCore = path.resolve(__dirname, '../../../../ocean-core/src');
  const { css } = compileString(
    `@import '@useblu/ocean-tokens/web/tokens'; @import 'utils/all'; @import 'components/tab';`,
    { loadPaths: [nodeModules, oceanCore] }
  );
  const rule = (selector: string) => {
    const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return css.match(
      new RegExp(`(?:^|\\n)\\s*${escaped}\\s*\\{([^}]*)\\}`)
    )?.[1];
  };

  test('uses only tokens in the source, except the documented item height', () => {
    const source = fs.readFileSync(
      path.join(oceanCore, 'components/_tab.scss'),
      'utf8'
    );
    expect(source).not.toMatch(/#[0-9a-f]{3,8}\b|rgba?\(/i);
    expect(source.match(/\d+px/g)).toEqual(['56px']);
  });

  test('styles the item with heading4, the item spacing and the default color', () => {
    const item = rule('.ods-tab__item');
    expect(item).toContain('height: 56px');
    expect(item).toContain('padding: 0 16px');
    expect(item).toContain('font-size: 16px');
    expect(item).toContain('font-weight: 800');
    expect(item).toContain('line-height: 1.32');
    expect(item).toContain('white-space: nowrap');
    expect(item).toContain('color: #aaadc0');
    expect(rule('.ods-tab__content')).toContain('gap: 8px');
  });

  test('gives hover, keyboard focus and selected the primary color without a focus ring', () => {
    const hover = rule('.ods-tab__item:hover, .ods-tab__item:focus-visible');
    expect(hover).toContain('color: #0025e0');
    expect(hover).toContain('outline: none');
    expect(rule('.ods-tab__item--selected')).toContain('color: #0025e0');
    expect(rule('.ods-tab__indicator')).toContain('height: 2px');
  });

  test('eases the changes and turns motion off for reduced motion', () => {
    expect(rule('.ods-tab__item')).toContain('transition: color 150ms ease');
    expect(rule('.ods-tab__indicator--animated')).toContain(
      'transform 300ms cubic-bezier(0.65, 0, 0.35, 1)'
    );
    expect(css).toMatch(
      /@media \(prefers-reduced-motion: reduce\) \{[^}]*\.ods-tab__indicator--animated \{\s*transition: none;/
    );
  });

  test('draws the divider and the mobile layouts', () => {
    expect(rule('.ods-tab')).toContain('border-bottom: 1px solid #e0e2ee');
    expect(css).toMatch(
      /@media \(max-width: 575\.98px\) \{\s*\.ods-tab \{\s*padding: 0 32px;/
    );
    expect(rule('.ods-tab--fill .ods-tab__item')).toContain('flex: 1 1 0');
  });
});
