/**
 * @jest-environment node
 */
import path from 'path';
import { compileString } from 'sass';

describe('Transaction List amount block layout', () => {
  const nodeModules = path.resolve(
    require.resolve('@useblu/ocean-tokens/package.json'),
    '../../..'
  );
  const oceanCore = path.resolve(__dirname, '../../../../../../ocean-core/src');
  const { css } = compileString(
    `@import '@useblu/ocean-tokens/web/tokens'; @import 'components/amount-details';`,
    { loadPaths: [nodeModules, oceanCore] }
  );

  const rule = (selector: string): string => {
    const match = css.match(
      new RegExp(`${selector.replace(/[.\-()>]/g, '\\$&')}[^{]*\\{([^}]*)\\}`)
    );
    return match ? match[1] : '';
  };

  test('the content block is never squeezed', () => {
    const content = rule('.ods-transaction-list__content > .ods-content-list');
    expect(content).toMatch(/flex:\s*1 1 auto/);
    expect(content).toMatch(/min-width:\s*0/);
  });

  test('the amount block takes at most half of the row', () => {
    const amount = rule('.ods-transaction-list__content > .ods-amount-details');
    expect(amount).toMatch(/max-width:\s*50%/);
    expect(amount).toMatch(/min-width:\s*0/);
  });

  test('a long tag is truncated with an ellipsis', () => {
    const tag = rule(
      '.ods-transaction-list__content .ods-amount-details__indicator .ods-tag__content'
    );
    expect(tag).toMatch(/text-overflow:\s*ellipsis/);
    expect(tag).toMatch(/overflow:\s*hidden/);
    expect(tag).toMatch(/white-space:\s*nowrap/);
  });
});
