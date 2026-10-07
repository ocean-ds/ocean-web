/**
 * @jest-environment node
 */
import path from 'path';
import { compileString } from 'sass';

describe('compiled styles', () => {
  const nodeModules = path.resolve(
    require.resolve('@useblu/ocean-tokens/package.json'),
    '../../..'
  );
  const oceanCore = path.resolve(__dirname, '../../../../ocean-core/src');
  const { css } = compileString(
    `@import '@useblu/ocean-tokens/web/tokens'; @import 'components/tag';`,
    { loadPaths: [nodeModules, oceanCore] }
  );

  const rule = (selector: string): string => {
    const match = css.match(
      new RegExp(`${selector.replace(/[.-]/g, '\\$&')}\\s*\\{([^}]*)\\}`)
    );
    return match ? match[1] : '';
  };

  test('font-size is defined by size only', () => {
    expect(rule('.ods-tag--medium')).toMatch(/font-size:\s*12px/);
    expect(rule('.ods-tag--medium')).toMatch(/font-weight:\s*600/);
    expect(rule('.ods-tag--small')).toMatch(/font-size:\s*8px/);
    expect(rule('.ods-tag--small')).toMatch(/font-weight:\s*700/);
    expect(rule('.ods-tag--highlight__neutral')).not.toMatch(/font-size/);
    expect(rule('.ods-tag--highlight__important')).not.toMatch(/font-size/);
  });

  test('highlight is extrabold (800) regardless of size', () => {
    expect(rule('.ods-tag--highlight__neutral')).toMatch(/font-weight:\s*800/);
    expect(rule('.ods-tag--highlight__important')).toMatch(
      /font-weight:\s*800/
    );
  });

  test('complementary uses complementary deep for text and icon', () => {
    expect(rule('.ods-tag--complementary')).toMatch(
      /background-color:\s*#edfdfd/i
    );
    expect(rule('.ods-tag--complementary .ods-tag__content')).toMatch(
      /color:\s*(rgb\(28, 153, 153\)|#1c9999)/i
    );
    expect(rule('.ods-tag--complementary .ods-tag__icon')).toMatch(
      /fill:\s*(rgb\(28, 153, 153\)|#1c9999)/i
    );
    expect(rule('.ods-tag--neutral-03 .ods-tag__content')).toMatch(
      /color:\s*(rgb\(19, 189, 189\)|#13bdbd)/i
    );
  });

  test('highlight neutral uses brand primary down background', () => {
    expect(rule('.ods-tag--highlight__neutral')).toMatch(
      /background-color:\s*(rgb\(88, 114, 245\)|#5872f5)/i
    );
  });
});
