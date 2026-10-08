import React from 'react';
import { DocTable, Section, Swatch, c, tokenValue } from '../blocks';

/* Values below are the tokens used by the component styles (ocean-core). */

export const SPECS_SECTIONS = [
  'Color',
  'Icon color',
  'Interactive states',
  'Typography',
  'Structure',
  'Size',
];

const COLOR_ROWS: [string, string, string][] = [
  ['Title (small line)', 'Text', 'color-interface-dark-down'],
  ['Description (emphasized line)', 'Text', 'color-interface-dark-deep'],
  ['Caption', 'Text', 'color-interface-dark-down'],
  [
    'Emphasized line, positive / strikethrough',
    'Text',
    'color-status-positive-deep',
  ],
  ['Emphasized line, warning', 'Text', 'color-status-warning-deep'],
  ['Amount, default and negative', 'Text', 'color-interface-dark-deep'],
  ['Amount, positive and strikethrough', 'Text', 'color-status-positive-deep'],
  ['Struck original value', 'Text', 'color-interface-dark-up'],
  ['Additional data', 'Text', 'color-interface-dark-down'],
  ['Disabled or inactive text and amount', 'Text', 'color-interface-dark-up'],
  ['Chevron', 'Icon', 'color-interface-dark-up'],
  ['Chevron, disabled', 'Icon', 'color-interface-light-deep'],
  ['Divider', 'Border', 'color-interface-light-down'],
  ['Timeline line (child items)', 'Background', 'color-interface-light-down'],
  ['Skeleton', 'Background', 'color-interface-light-up'],
];

const ICON_ROWS: [string, string, string][] = [
  ['default', 'Rows on white backgrounds', 'color-interface-dark-up'],
  ['on-color', 'Rows on colored backgrounds', 'color-interface-dark-down'],
  ['highlight', 'An icon that needs emphasis', 'color-brand-primary-down'],
  ['disabled', 'Any row with `disabled`', 'color-interface-light-deep'],
  [
    'child (no iconColor)',
    'Child items on the timeline',
    'color-interface-light-down',
  ],
];

const STATE_ROWS: [string, React.ReactNode, React.ReactNode][] = [
  [
    'Hover',
    <Swatch token="color-interface-light-up" />,
    'Overlay on the row, multiply blend',
  ],
  [
    'Pressed',
    <Swatch token="color-interface-light-deep" />,
    'Overlay on the row, multiply blend',
  ],
  [
    'Focus',
    <Swatch token="color-brand-primary-pure" />,
    <>2px outline inside the row (value of {c('border-width-thin')})</>,
  ],
  ['Disabled', '–', 'No overlay; pointer shows not-allowed'],
];

const sizes = (md: string, sm: string, weight: string) => (
  <>
    {c(md)} / {c(sm)} · {c(weight)}
  </>
);

const TYPE_ROWS: React.ReactNode[][] = [
  [
    'Title (small line)',
    '14px',
    '12px',
    'Regular / Medium',
    sizes('font-size-xxs', 'font-size-xxxs', 'font-weight-regular / medium'),
  ],
  [
    'Description (emphasized line)',
    '16px',
    '14px',
    'Regular',
    sizes('font-size-xs', 'font-size-xxs', 'font-weight-regular'),
  ],
  [
    'Caption',
    '12px',
    '12px',
    'Medium',
    sizes('font-size-xxxs', 'font-size-xxxs', 'font-weight-medium'),
  ],
  [
    'Amount',
    '16px',
    '14px',
    'Medium',
    sizes('font-size-xs', 'font-size-xxs', 'font-weight-medium'),
  ],
  [
    'Struck original value',
    '16px',
    '14px',
    'Regular',
    sizes('font-size-xs', 'font-size-xxs', 'font-weight-regular'),
  ],
  [
    'Additional data',
    '12px',
    '12px',
    'Medium',
    sizes('font-size-xxxs', 'font-size-xxxs', 'font-weight-medium'),
  ],
  [
    'Tag',
    '12px',
    '10px',
    'Medium / Bold',
    <>{c('font-size-xxxs')} / no token (10px)</>,
  ],
];

const space = (token: string) => [tokenValue(token), c(token)];

const STRUCTURE_ROWS: React.ReactNode[][] = [
  ['Row', 'Padding', ...space('spacing-inline-xs')],
  ['Row, compact', 'Vertical padding', ...space('spacing-stack-xxs')],
  ['Icon to content', 'Gap', ...space('spacing-inline-xxs-extra')],
  ['Content to amount', 'Gap', ...space('spacing-inline-xxs')],
  ['Amount block', 'Gap between lines', ...space('spacing-inline-xxxs')],
  ['Caption', 'Top margin', ...space('spacing-inline-xxxs')],
  ['Divider', 'Inset (left and right)', ...space('spacing-inline-xs')],
  ['Divider', 'Thickness', ...space('border-width-hairline')],
  ['Selectable control to content', 'Gap', ...space('spacing-inline-xs')],
  ['Menu trigger', 'Right padding', ...space('spacing-inline-xxs')],
  [
    'Child item content',
    'Vertical padding',
    ...space('spacing-inline-xxs-extra'),
  ],
  ['Timeline column', 'Width', ...space('spacing-inline-sm')],
  ['Timeline icon', 'Padding', ...space('spacing-inline-xxxs')],
  ['Icon', 'Size (top level / child)', '24px / 16px', 'No token'],
].map(([element, property, px, token]) => [
  element,
  property,
  px,
  typeof px === 'string' && px.endsWith('px') && px.indexOf('/') < 0
    ? `${parseInt(px, 10) / 16}rem`
    : '–',
  token,
]);

const SIZE_ROWS = [
  ['Content md · amount md', '100px', '84px'],
  ['Content sm · amount sm', '94px', '78px'],
  ['Loading', '73px', '57px'],
];

const md = (text: string) =>
  text.split('`').map((part, index) =>
    // eslint-disable-next-line react/no-array-index-key
    index % 2 ? <code key={index}>{part}</code> : part
  );

export const Specs = (): React.ReactElement => (
  <>
    <Section title="Color">
      <DocTable
        columns={['Element', 'Property', 'Color token']}
        rows={COLOR_ROWS.map(([element, property, token]) => [
          element,
          property,
          <Swatch token={token} />,
        ])}
      />
    </Section>
    <Section title="Icon color">
      <DocTable
        columns={['iconColor', 'Use', 'Color token']}
        rows={ICON_ROWS.map(([value, use, token]) => [
          c(value),
          md(use),
          <Swatch token={token} />,
        ])}
      />
    </Section>
    <Section title="Interactive states">
      <DocTable
        columns={['State', 'Color token', 'Treatment']}
        rows={STATE_ROWS}
      />
    </Section>
    <Section title="Typography">
      <p>
        All text uses {c('font-family-base')} ({tokenValue('font-family-base')})
        with {c('line-height-comfy')}. Tokens are listed as md / sm.
      </p>
      <DocTable
        columns={[
          'Element',
          'Size md',
          'Size sm',
          'Weight',
          'Tokens (md / sm)',
        ]}
        rows={TYPE_ROWS}
      />
    </Section>
    <Section title="Structure">
      <DocTable
        columns={['Element', 'Property', 'px', 'rem', 'Spacing token']}
        rows={STRUCTURE_ROWS}
      />
    </Section>
    <Section title="Size">
      <p>
        Row height comes from the content; the values below are the heights with
        every element shown (title, description, caption, amount, tag and
        additional data).
      </p>
      <DocTable
        columns={['Configuration', 'Default', 'Compact']}
        rows={SIZE_ROWS}
      />
    </Section>
  </>
);
