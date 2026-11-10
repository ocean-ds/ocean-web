import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ControlledFilterBar } from '../../../../../.storybook/docs-blocks/filter-bar/story-helpers';
import type { ControlledFilterBarProps } from '../../../../../.storybook/docs-blocks/filter-bar/story-helpers';
import {
  ALL_FILTERS,
  FEW_FILTERS,
  FULL_SCOPE_OPTIONS,
  LONG_FILTERS,
  LONG_SCOPE_OPTIONS,
  MANY_FILTERS,
  SCOPE_OPTIONS,
} from '../../../../../.storybook/docs-blocks/filter-bar/fixtures';

const meta: Meta = {
  title: 'Visual tests/Filter Bar',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    chromatic: { disableSnapshot: false },
  },
};
export default meta;
type Story = StoryObj;

const noop = () => undefined;

const bar = (
  filters: ControlledFilterBarProps['filters'],
  {
    allFilters = false,
    segmented,
    width = 'full',
  }: {
    allFilters?: boolean;
    segmented?: typeof SCOPE_OPTIONS;
    width?: ControlledFilterBarProps['width'];
  } = {}
) => (
  <ControlledFilterBar
    aria-label="Filters"
    width={width}
    filters={filters}
    allFilters={allFilters ? { ...ALL_FILTERS, onClick: noop } : undefined}
    segmentedControl={
      segmented && {
        'aria-label': 'Scope',
        options: segmented,
        selectedIndex: 0,
        onChange: noop,
      }
    }
  />
);

/** The four combinations of All filters × Segmented control, with few and many chips. */
const combinations = (width: ControlledFilterBarProps['width']) =>
  (
    [
      ['Chips only', false, undefined],
      ['All filters', true, undefined],
      ['Segmented control', false, FULL_SCOPE_OPTIONS],
      ['All filters and segmented control', true, FULL_SCOPE_OPTIONS],
    ] as const
  ).flatMap(([label, allFilters, segmented]) =>
    [
      ['1 chip', [FEW_FILTERS[0]]],
      ['8 chips', MANY_FILTERS],
    ].map(([chips, filters]) => [
      `${label}, ${chips}`,
      bar(filters as ControlledFilterBarProps['filters'], {
        allFilters,
        segmented: segmented && [...segmented],
        width,
      }),
    ])
  ) as [string, React.ReactElement][];

const Rows = ({
  rows,
}: {
  rows: [string, React.ReactElement][];
}): React.ReactElement => (
  <>
    {rows.map(([label, row]) => (
      <React.Fragment key={label}>
        <p className="odoc-matrix__label">{label}</p>
        {row}
      </React.Fragment>
    ))}
  </>
);

/** Desktop, wide bar: chips hug their width; the Segmented Control sits on the right. */
export const Desktop: Story = {
  parameters: { chromatic: { viewports: [1440] } },
  render: () => <Rows rows={combinations('wide')} />,
};

/** Desktop, narrow bar: only the chips scroll, cut right at the divider. */
export const DesktopNarrow: Story = {
  name: 'Desktop narrow',
  parameters: { chromatic: { viewports: [1440] } },
  render: () => <Rows rows={combinations('narrow')} />,
};

/** Mobile: chips and All filters scroll together; the Segmented Control shows only labels. */
export const Mobile: Story = {
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [393] },
    viewport: { defaultViewport: 'galaxys5' },
  },
  render: () => <Rows rows={combinations('full')} />,
};

/**
 * Long texts: chips stay on one line; the Segmented Control takes at most half of the bar and
 * its labels are cut with an ellipsis, so the chips never disappear.
 */
export const LongText: Story = {
  name: 'Long text',
  parameters: { chromatic: { viewports: [393, 1440] } },
  render: () => (
    <Rows
      rows={[
        [
          'Long chip and option labels, wide bar',
          bar(LONG_FILTERS, {
            allFilters: true,
            segmented: LONG_SCOPE_OPTIONS,
            width: 'wide',
          }),
        ],
        [
          'Long chip and option labels, narrow bar',
          bar(LONG_FILTERS, {
            allFilters: true,
            segmented: LONG_SCOPE_OPTIONS,
            width: 'narrow',
          }),
        ],
        [
          'Long option labels, chips only',
          bar(MANY_FILTERS, {
            segmented: LONG_SCOPE_OPTIONS,
            width: 'narrow',
          }),
        ],
      ]}
    />
  ),
};
