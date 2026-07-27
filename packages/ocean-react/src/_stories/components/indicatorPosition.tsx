import React from 'react';
import Tag from '../../Tag';

/**
 * Shared pieces of the `IndicatorPosition` story, used by ListAction, ListExpandable,
 * ListReadOnly and ListSelectable. Kept here so the four stories do not repeat the same
 * parameters, argTypes and cases.
 *
 * This folder is excluded from the published build (see `tsconfig.build.json`).
 */

const indicatorOptions = {
  tag: <Tag type="positive">3x sem acréscimo</Tag>,
  withoutIndicator: undefined,
};

export const indicatorPositionStackStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 16,
  minWidth: 320,
};

/** `parameters`, `argTypes` and `args` shared by the four stories. */
export const indicatorPositionStoryConfig = {
  parameters: {
    docs: {
      description: {
        story:
          'The `indicatorPosition` prop sets where the `indicator` sits relative to the ' +
          'text. `inline` (default) keeps the current behaviour — same row as the text, at ' +
          'the end of the content block. `above` and `below` stack it inside the content ' +
          'block, with 8px of breathing room, left-aligned. The control slot never receives ' +
          'the indicator.',
      },
    },
  },
  argTypes: {
    indicator: {
      options: Object.keys(indicatorOptions),
      mapping: indicatorOptions,
      control: { type: 'radio' as const },
      description:
        'Toggles the indicator on and off in the three positions below.',
    },
  },
  args: {
    indicator: 'tag' as unknown as React.ReactNode,
  },
};

/** One entry per position, in the order they are shown. */
export const indicatorPositionCases = [
  {
    id: 'inline',
    title: 'inline (default)',
    description: 'Current behaviour — nothing changes in production',
  },
  {
    id: 'above',
    title: 'above',
    description: 'Tag stacked above the title',
    indicatorPosition: 'above' as const,
  },
  {
    id: 'below',
    title: 'below',
    description: 'Tag stacked below the text',
    caption: 'Caption',
    indicatorPosition: 'below' as const,
  },
];
