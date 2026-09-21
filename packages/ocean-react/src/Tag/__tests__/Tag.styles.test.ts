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

  test('typography is defined by size only', () => {
    expect(rule('.ods-tag--medium')).toMatch(/font-size:\s*12px/);
    expect(rule('.ods-tag--medium')).toMatch(/font-weight:\s*600/);
    expect(rule('.ods-tag--small')).toMatch(/font-size:\s*8px/);
    expect(rule('.ods-tag--small')).toMatch(/font-weight:\s*700/);
    expect(rule('.ods-tag--highlight__neutral')).not.toMatch(/font-size/);
    expect(rule('.ods-tag--highlight__neutral')).not.toMatch(/font-weight/);
    expect(rule('.ods-tag--highlight__important')).not.toMatch(/font-size/);
    expect(rule('.ods-tag--highlight__important')).not.toMatch(/font-weight/);
  });

  test('highlight neutral uses brand primary down background', () => {
    expect(rule('.ods-tag--highlight__neutral')).toMatch(
      /background-color:\s*(rgb\(88, 114, 245\)|#5872f5)/i
    );
  });
});
