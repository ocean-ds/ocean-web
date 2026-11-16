/**
 * @jest-environment node
 */
import path from 'path';
import { compileString } from 'sass';
import postcss from 'postcss';

describe('compiled Drawer list styles', () => {
  const nodeModules = path.resolve(
    require.resolve('@useblu/ocean-tokens/package.json'),
    '../../..'
  );
  const oceanCore = path.resolve(__dirname, '../../../../ocean-core/src');
  const { css } = compileString(
    `@import '@useblu/ocean-tokens/web/tokens'; @import 'utils/all'; @import 'components/drawer';`,
    { loadPaths: [nodeModules, oceanCore] }
  );
  const styles = postcss.parse(css);
  const declarations = (selector: string) => {
    const result: Record<string, string> = {};
    styles.walkRules((rule) => {
      if (rule.selectors.includes(selector)) {
        rule.walkDecls((declaration) => {
          result[declaration.prop] = declaration.value;
        });
      }
    });
    return result;
  };
  const text = '.ods-list-container__content--text';
  const loose = `.ods-drawer__main ${text}`;
  const boxed = `.ods-drawer__main ${text}:where(.ods-list *, .ods-list-container__content--card *)`;

  test.each(['readonly', 'action', 'settings'])(
    'loose text %s rows retain zero side padding',
    (type) => {
      expect(declarations(`${loose} > .ods-list-${type}`)).toEqual({
        'padding-left': '0',
        'padding-right': '0',
      });
    }
  );

  test.each(['readonly', 'settings'])(
    'restores 16px on both sides of boxed text %s rows',
    (type) => {
      expect(declarations(`${boxed} > .ods-list-${type}`)).toEqual({
        'padding-left': '16px',
        'padding-right': '16px',
      });
    }
  );

  test('restores action defaults including the loading right inset', () => {
    expect(declarations(`${boxed} > .ods-list-action`)).toEqual({
      'padding-left': '16px',
      'padding-right': '8px',
    });
    expect(
      declarations(
        `${boxed} > .ods-list-action:where(.ods-list-action--loading)`
      )
    ).toEqual({ 'padding-right': '16px' });
  });

  test('restores only text rows below bordered ancestors with zero extra specificity', () => {
    const restoreSelectors: string[] = [];
    styles.walkRules((rule) => {
      if (rule.selector.includes(':where(')) {
        restoreSelectors.push(...rule.selectors);
      }
    });
    expect(restoreSelectors).toHaveLength(5);
    restoreSelectors.forEach((selector) => {
      expect(selector).toContain(`${boxed} > .ods-list-`);
      expect(selector).not.toContain('.ods-list-expandable--text');
      expect(selector).not.toContain('divider');
    });
  });

  test('leaves text divider margins unchanged', () => {
    expect(
      declarations(`${loose} > .ods-list-container__content__divider`)
    ).toEqual({ 'margin-left': '0', 'margin-right': '0' });
  });
});
