import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import StackedDrawers from '../examples/StackedDrawers';

const meta: Meta = {
  title: 'Visual tests/Drawer',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};
export default meta;
type Story = StoryObj;

const wide = { chromatic: { viewports: [1440] } };

export const OneOpen: Story = {
  parameters: wide,
  render: () => <StackedDrawers initial={['first']} />,
};

export const TwoOpen: Story = {
  parameters: wide,
  render: () => <StackedDrawers initial={['first', 'second']} />,
};

export const ThreeOpen: Story = {
  parameters: wide,
  render: () => <StackedDrawers initial={['first', 'second', 'third']} />,
};

export const Narrow: Story = {
  parameters: { chromatic: { viewports: [1024] } },
  render: () => <StackedDrawers initial={['first', 'second', 'third']} />,
};

export const Mobile: Story = {
  parameters: { chromatic: { viewports: [375] } },
  render: () => <StackedDrawers initial={['first', 'second']} />,
};
