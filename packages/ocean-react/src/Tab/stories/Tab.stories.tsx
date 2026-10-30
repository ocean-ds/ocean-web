import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Tab from '../Tab';
import type { TabProps } from '../Tab';
import { ControlledTab } from '../../../../../.storybook/docs-blocks/tab/story-helpers';
import {
  BADGE_TABS,
  DEFAULT_TABS,
  LONG_TABS,
  SCROLL_TABS,
} from '../../../../../.storybook/docs-blocks/tab/fixtures';

type StoryArgs = TabProps & { narrow?: boolean };

const meta: Meta<StoryArgs> = {
  title: 'Components/Tab',
  component: Tab,
  parameters: { layout: 'padded' },
  argTypes: {
    tabs: { control: 'object' },
    selectedIndex: { control: { type: 'number', min: 0, max: 7 } },
    'aria-label': { control: 'text' },
    onChange: { action: 'onChange' },
    narrow: { table: { disable: true } },
  },
  args: {
    tabs: DEFAULT_TABS,
    selectedIndex: 0,
    'aria-label': 'Account',
  },
  render: (args) => <ControlledTab {...args} />,
};

export default meta;

type Story = StoryObj<StoryArgs>;

// On mobile the bar spans the whole screen: no canvas padding around it.
const mobile = {
  layout: 'fullscreen',
  viewport: { defaultViewport: 'galaxys5' },
  chromatic: { viewports: [375] },
};

/** Tabs sized to their labels, aligned to the left. */
export const Default: Story = {};

/** A counter after the label: primary on the selected tab, neutral on the others. */
export const WithBadge: Story = {
  name: 'With badge',
  args: { tabs: BADGE_TABS, selectedIndex: 1, 'aria-label': 'Account' },
};

/** More tabs than the width holds: the bar scrolls sideways. */
export const WithScroll: Story = {
  name: 'With scroll',
  args: { tabs: SCROLL_TABS, selectedIndex: 5, narrow: true },
};

/** On mobile, up to three tabs share the width equally. */
export const Mobile: Story = {
  args: { tabs: BADGE_TABS, 'aria-label': 'Account' },
  parameters: mobile,
};

/** A label that does not fit its share keeps one line and the bar scrolls. */
export const LongLabels: Story = {
  name: 'Long labels',
  args: { tabs: LONG_TABS, 'aria-label': 'Receivables' },
  parameters: mobile,
};
