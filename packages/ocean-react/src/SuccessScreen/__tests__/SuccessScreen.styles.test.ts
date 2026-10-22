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

  test('keeps extra information on the dark-up token', () => {
    expect(css).toMatch(
      /\.ods-success-screen__extra-information\.ods-typography__captionbold\s*\{\s*color:\s*#aaadc0;/
    );
  });

  test.each([
    { status: 'positive', background: '#2da94f', closeColor: 'white' },
    { status: 'neutral', background: '#f3f5fe', closeColor: '#aaadc0' },
    { status: 'negative', background: '#67697a', closeColor: 'white' },
  ])(
    'uses the mobile $status card surface and close icon color',
    ({ status, background, closeColor }) => {
      expect(css).toMatch(
        new RegExp(
          `\\.ods-success-screen--${status} \\.ods-success-screen__card\\s*\\{\\s*background-color:\\s*${background};`
        )
      );
      expect(css).toMatch(
        new RegExp(
          `\\.ods-success-screen--${status} \\.ods-success-screen__close\\s*\\{\\s*color:\\s*${closeColor};`
        )
      );
    }
  );

  test('leaves the 24px header gap without overlapping Details', () => {
    expect(css).toMatch(
      /\.ods-success-screen__header\s*\{[^}]*padding:\s*0 0 24px;/
    );
    expect(css).not.toMatch(/margin-top:\s*-24px/);
    expect(css).toMatch(
      /\.ods-success-screen__details\s*\{[^}]*margin-top:\s*0;/
    );
  });

  test('fills the available height on mobile while keeping desktop content-sized', () => {
    expect(css).toMatch(/\.ods-success-screen\s*\{[^}]*height:\s*100%;/);
    expect(css).toMatch(
      /\.ods-success-screen__card\s*\{[^}]*display:\s*flex;[^}]*flex-direction:\s*column;[^}]*min-height:\s*100%;/
    );
    expect(css).toMatch(
      /\.ods-success-screen__header\s*\{[^}]*flex:\s*0 0 auto;/
    );
    expect(css).toMatch(/\.ods-success-screen__details\s*\{[^}]*flex:\s*1;/);

    const desktopStyles = css.split('@container (min-width: 530px)')[1];
    expect(desktopStyles).toBeDefined();
    expect(desktopStyles).not.toMatch(/min-height:\s*100%/);
    expect(css).toMatch(/box-sizing:\s*border-box/);
  });

  test('uses the Figma desktop Details border and radius', () => {
    expect(css).toMatch(
      /border:\s*1px solid #e0e2ee;[\s\S]*?border-radius:\s*16px;/
    );
    expect(css).toMatch(/margin-top:\s*0/);
  });
});
