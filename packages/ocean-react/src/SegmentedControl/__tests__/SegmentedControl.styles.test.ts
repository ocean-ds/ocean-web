/**
 * @jest-environment node
 */
import fs from 'fs';
import path from 'path';
import { compileString } from 'sass';

describe('compiled SegmentedControl styles', () => {
  const nodeModules = path.resolve(
    require.resolve('@useblu/ocean-tokens/package.json'),
    '../../..'
  );
  const oceanCore = path.resolve(__dirname, '../../../../ocean-core/src');
  const { css } = compileString(
    `@import '@useblu/ocean-tokens/web/tokens'; @import 'utils/all'; @import 'components/segmented-control';`,
    { loadPaths: [nodeModules, oceanCore] }
  );
  const rule = (selector: string) => {
    const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return css.match(
      new RegExp(`(?:^|\\n)\\s*${escaped}\\s*\\{([^}]*)\\}`)
    )?.[1];
  };
  const HOVER_OR_FOCUS =
    '.ods-segmented-control:not(.ods-segmented-control--disabled):hover, .ods-segmented-control:has(.ods-segmented-control__option:focus-visible)';

  test('uses only tokens in the source, except the documented sizes', () => {
    const source = fs.readFileSync(
      path.join(oceanCore, 'components/_segmented-control.scss'),
      'utf8'
    );
    expect(source).not.toMatch(/#[0-9a-f]{3,8}\b/i);
    expect(source.match(/\d+px/g)).toEqual(['32px', '16px', '16px']);
    expect(source).not.toMatch(/rgba\(/);
  });

  test('draws the control: light up pill without border, 4px padding and gap', () => {
    const control = rule('.ods-segmented-control');
    expect(control).toContain('background-color: #f3f5fe');
    expect(control).not.toContain('box-shadow');
    expect(control).not.toContain('border:');
    expect(control).toContain('border-radius: 56px');
    expect(control).toContain('padding: 4px 4px');
    expect(control).toContain('gap: 4px');
    expect(control).toContain('display: inline-flex');
    expect(control).toContain('max-width: 100%');
  });

  test('styles the option with heading5, the option spacing and the primary color', () => {
    const option = rule('.ods-segmented-control__option');
    expect(option).toContain('height: 32px');
    expect(option).toContain('padding: 4px 12px');
    expect(option).toContain('gap: 4px');
    expect(option).toContain('font-size: 14px');
    expect(option).toContain('font-weight: 800');
    expect(option).toContain('line-height: 1.32');
    expect(option).toContain('color: #0025e0');
    expect(option).toContain('white-space: nowrap');
    expect(option).toContain('min-width: 0');
    expect(
      rule(
        '.ods-segmented-control__option:focus, .ods-segmented-control__option:focus-visible'
      )
    ).toContain('outline: none');
    expect(rule('.ods-segmented-control__icon svg')).toContain('width: 16px');
  });

  test('cuts a long label with an ellipsis', () => {
    const label = rule('.ods-segmented-control__label');
    expect(label).toContain('overflow: hidden');
    expect(label).toContain('text-overflow: ellipsis');
    expect(label).toContain('min-width: 0');
  });

  test('draws the white background with the white modifier', () => {
    expect(rule('.ods-segmented-control--white')).toContain(
      'background-color: white'
    );
  });

  test('fills the selection with primary pure and turns the selected text white', () => {
    expect(rule('.ods-segmented-control__selection')).toContain(
      'background-color: #0025e0'
    );
    expect(rule('.ods-segmented-control__option--selected')).toContain(
      'color: white'
    );
    expect(rule('.ods-segmented-control__option')).toContain(
      'transition: color 150ms ease'
    );
  });

  test('makes the selected counter primary inverse, except when disabled', () => {
    const inverse = rule(
      '.ods-segmented-control__option--selected .ods-segmented-control__count .ods-badge__content'
    );
    expect(inverse).toContain('background-color: white');
    expect(inverse).toContain('color: #0025e0');
    const neutral = rule(
      '.ods-segmented-control--disabled .ods-segmented-control__count .ods-badge__content'
    );
    expect(neutral).toContain('background-color: #aaadc0');
    expect(neutral).toContain('color: white');
    // Same specificity: the disabled rule comes later, so it wins over the inverse.
    expect(css.indexOf(neutral as string)).toBeGreaterThan(
      css.indexOf(inverse as string)
    );
  });

  test('changes only the control background to light down on hover and keyboard focus', () => {
    expect(rule(HOVER_OR_FOCUS)).toContain('background-color: #e0e2ee');
    // The only hover or focus rule is the control one: selection and texts stay as they are.
    expect(css.match(/:hover|:has\(/g)).toEqual([':hover', ':has(']);
  });

  test('draws the disabled control: light down selection, dark up texts, no hover', () => {
    const option = rule(
      '.ods-segmented-control--disabled .ods-segmented-control__option'
    );
    expect(option).toContain('color: #aaadc0');
    expect(option).toContain('cursor: default');
    expect(
      rule('.ods-segmented-control--disabled .ods-segmented-control__selection')
    ).toContain('background-color: #e0e2ee');
    expect(HOVER_OR_FOCUS).toContain(
      ':not(.ods-segmented-control--disabled):hover'
    );
  });

  test('slides the selection in 300ms and turns motion off for reduced motion', () => {
    expect(rule('.ods-segmented-control')).toContain(
      'transition: background-color 150ms ease'
    );
    const animated = rule('.ods-segmented-control__selection--animated');
    expect(animated).toContain(
      'transform 300ms cubic-bezier(0.65, 0, 0.35, 1)'
    );
    expect(animated).toContain('width 300ms cubic-bezier(0.65, 0, 0.35, 1)');
    expect(css).toMatch(
      /@media \(prefers-reduced-motion: reduce\) \{\s*\.ods-segmented-control, \.ods-segmented-control__option, \.ods-segmented-control__selection, \.ods-segmented-control__selection--animated \{\s*transition: none;/
    );
  });
});
