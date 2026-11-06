import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import SegmentedControl from '../SegmentedControl';
import type { SegmentedControlProps } from '../SegmentedControl';
import { ControlledSegmentedControl } from '../../../../../.storybook/docs-blocks/segmented-control/story-helpers';
import { DEFAULT_OPTIONS } from '../../../../../.storybook/docs-blocks/segmented-control/fixtures';

const meta: Meta<SegmentedControlProps> = {
  title: 'Components/Segmented Control',
  component: SegmentedControl,
  parameters: { layout: 'padded' },
  argTypes: {
    options: { control: 'object' },
    selectedIndex: { control: { type: 'number', min: 0, max: 1 } },
    background: { control: 'inline-radio', options: ['default', 'white'] },
    disabled: { control: 'boolean' },
    'aria-label': { control: 'text' },
    onChange: { action: 'onChange' },
  },
  args: {
    options: DEFAULT_OPTIONS,
    selectedIndex: 0,
    background: 'default',
    disabled: false,
    'aria-label': 'Scope',
  },
  render: (args) => (
    <ControlledSegmentedControl
      {...args}
      surface={args.background === 'white'}
    />
  ),
};

export default meta;

type Story = StoryObj<SegmentedControlProps>;

/** Two options, one always selected; icon and counter are optional in `options`. */
export const Default: Story = {};
