/**
 * @jest-environment node
 */
import path from 'path';
import { compileString } from 'sass';

describe('compiled SuccessScreen styles', () => {
  const nodeModules = path.resolve(
    require.resolve('@useblu/ocean-tokens/package.json'),
    '../../..'
  );
  const oceanCore = path.resolve(__dirname, '../../../../ocean-core/src');
  const { css } = compileString(
    `@import '@useblu/ocean-tokens/web/tokens'; @import 'components/success-screen';`,
    { loadPaths: [nodeModules, oceanCore] }
  );

  test.each([
    {
      status: 'positive',
      background: '#2da94f',
    },
    {
      status: 'neutral',
      background: '#f3f5fe',
    },
    {
      status: 'negative',
      background: '#67697a',
    },
  ])(
    'uses tokenized header colors and text for $status',
    ({ status, background }) => {
      const header = new RegExp(
        `\\.ods-success-screen--${status} \\.ods-success-screen__header\\s*\\{([^}]*)\\}`
      );
      const headerMatch = css.match(header);
      expect(headerMatch?.[1]).toContain(`background-color: ${background}`);

      const expectedText = status === 'neutral' ? '#0c0d14' : 'white';
      expect(css).toMatch(
        new RegExp(
          `\\.ods-success-screen--${status} \\.ods-success-screen__title,[\\s\\S]*?color:\\s*(?:${
            expectedText === 'white'
              ? 'white|#fff|#ffffff|rgb\\(255, 255, 255\\)'
              : '#0c0d14|rgb\\(12, 13, 20\\)'
          });`,
          'i'
        )
      );
    }
  );

  test('uses the Figma desktop width as the container-query breakpoint', () => {
    expect(css).toMatch(/max-width:\s*530px/);
    expect(css).toMatch(/@container \(min-width: 530px\)/);
  });
});
