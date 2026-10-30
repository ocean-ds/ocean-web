import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MatrixGrid } from '../../../../../.storybook/docs-blocks';
import { ControlledTab } from '../../../../../.storybook/docs-blocks/tab/story-helpers';
import {
  BADGE_TABS,
  DEFAULT_TABS,
  LONG_TABS,
  SCROLL_TABS,
} from '../../../../../.storybook/docs-blocks/tab/fixtures';
import type { TabItem } from '../Tab';

const meta: Meta = {
  title: 'Visual tests/Tab',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    chromatic: { disableSnapshot: false },
  },
};
export default meta;
type Story = StoryObj;

const withoutCount = (tabs: TabItem[]) => tabs.map(({ label }) => ({ label }));

const bar = (tabs: TabItem[], selectedIndex = 0, narrow = false) => (
  <ControlledTab
    aria-label="Account"
    tabs={tabs}
    selectedIndex={selectedIndex}
    narrow={narrow}
  />
);

/** Selected position × counter, long labels and the desktop scroll. */
export const Matrix: Story = {
  parameters: { chromatic: { viewports: [1440] } },
  render: () => (
    <MatrixGrid
      className="odoc-matrix--tab"
      columns={['Without badge', 'With badge']}
      rows={[
        {
          label: 'Selected first',
          cells: [bar(DEFAULT_TABS), bar(BADGE_TABS)],
        },
        {
          label: 'Selected middle',
          cells: [bar(DEFAULT_TABS, 1), bar(BADGE_TABS, 1)],
        },
        {
          label: 'Long labels',
          cells: [bar(withoutCount(LONG_TABS), 1), bar(LONG_TABS, 1)],
        },
        {
          label: 'With scroll',
          cells: [
            bar(withoutCount(SCROLL_TABS), 6, true),
            bar(SCROLL_TABS, 1, true),
          ],
        },
      ]}
    />
  ),
};

/** Keyboard focus looks like hover: primary label and counter, no ring. */
export const Focused: Story = {
  parameters: { chromatic: { viewports: [1440] } },
  render: () => bar(BADGE_TABS),
  play: async ({ canvasElement }) => {
    canvasElement
      .querySelectorAll<HTMLButtonElement>('[role="tab"]')[1]
      ?.focus();
  },
};

const MOBILE_ROWS: [string, React.ReactElement][] = [
  ['Three tabs', bar(DEFAULT_TABS)],
  ['With badge', bar(BADGE_TABS, 1)],
  ['Long labels', bar(LONG_TABS, 1)],
  ['Eight tabs', bar(SCROLL_TABS, 7)],
];

/** Mobile: three tabs share the width; four or more, or a long label, scroll. */
export const Mobile: Story = {
  parameters: { layout: 'fullscreen', chromatic: { viewports: [375] } },
  render: () => (
    <>
      {MOBILE_ROWS.map(([label, row]) => (
        <React.Fragment key={label}>
          <p className="odoc-matrix__label">{label}</p>
          {row}
        </React.Fragment>
      ))}
    </>
  ),
};
