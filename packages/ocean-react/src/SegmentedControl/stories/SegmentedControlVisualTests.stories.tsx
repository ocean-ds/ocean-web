import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MatrixGrid } from '../../../../../.storybook/docs-blocks';
import { ControlledSegmentedControl } from '../../../../../.storybook/docs-blocks/segmented-control/story-helpers';
import {
  COUNT_OPTIONS,
  DEFAULT_OPTIONS,
  FULL_OPTIONS,
  ICON_OPTIONS,
  LONG_OPTIONS,
} from '../../../../../.storybook/docs-blocks/segmented-control/fixtures';
import type {
  SegmentedControlIndex,
  SegmentedControlOption,
} from '../SegmentedControl';

const meta: Meta = {
  title: 'Visual tests/Segmented Control',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    chromatic: { disableSnapshot: false },
  },
};
export default meta;
type Story = StoryObj;

const control = (
  options: [SegmentedControlOption, SegmentedControlOption],
  selectedIndex: SegmentedControlIndex = 0,
  narrow = false,
  { white = false, disabled = false } = {}
) => (
  <ControlledSegmentedControl
    aria-label="Scope"
    options={options}
    selectedIndex={selectedIndex}
    narrow={narrow}
    background={white ? 'white' : 'default'}
    surface={white}
    disabled={disabled}
  />
);

/** Selected option × content: label, icon, counter and long labels cut with an ellipsis. */
export const Matrix: Story = {
  parameters: { chromatic: { viewports: [1440] } },
  render: () => (
    <MatrixGrid
      className="odoc-matrix--segmented-control"
      columns={['Option 1 selected', 'Option 2 selected']}
      rows={[
        {
          label: 'Label',
          cells: [control(DEFAULT_OPTIONS), control(DEFAULT_OPTIONS, 1)],
        },
        {
          label: 'With icon',
          cells: [control(ICON_OPTIONS), control(ICON_OPTIONS, 1)],
        },
        {
          label: 'With counter',
          cells: [control(COUNT_OPTIONS), control(COUNT_OPTIONS, 1)],
        },
        {
          label: 'Icon and counter',
          cells: [control(FULL_OPTIONS), control(FULL_OPTIONS, 1)],
        },
        {
          label: 'Long labels',
          cells: [
            control(LONG_OPTIONS, 0, true),
            control(LONG_OPTIONS, 1, true),
          ],
        },
      ]}
    />
  ),
};

/** State × Background, Option 1 and Option 2 selected: the 16 Figma variants without hover/focus. */
export const StatesAndBackgrounds: Story = {
  parameters: { chromatic: { viewports: [1440] } },
  render: () => (
    <MatrixGrid
      className="odoc-matrix--segmented-control"
      columns={['Option 1 selected', 'Option 2 selected']}
      rows={[
        {
          label: 'Default',
          cells: [control(FULL_OPTIONS), control(FULL_OPTIONS, 1)],
        },
        {
          label: 'White background',
          cells: [
            control(FULL_OPTIONS, 0, false, { white: true }),
            control(FULL_OPTIONS, 1, false, { white: true }),
          ],
        },
        {
          label: 'Disabled',
          cells: [
            control(FULL_OPTIONS, 0, false, { disabled: true }),
            control(FULL_OPTIONS, 1, false, { disabled: true }),
          ],
        },
        {
          label: 'Disabled, white background',
          cells: [
            control(FULL_OPTIONS, 0, false, { white: true, disabled: true }),
            control(FULL_OPTIONS, 1, false, { white: true, disabled: true }),
          ],
        },
      ]}
    />
  ),
};

/** Keyboard focus looks like hover: only the control background turns light down, no ring. */
export const Focused: Story = {
  parameters: { chromatic: { viewports: [1440] } },
  render: () => control(FULL_OPTIONS),
  play: async ({ canvasElement }) => {
    canvasElement.querySelector<HTMLButtonElement>('[role="radio"]')?.focus();
  },
};

/** Keyboard focus on the white background: the control turns light down as on the default. */
export const FocusedWhite: Story = {
  parameters: { chromatic: { viewports: [1440] } },
  render: () => control(FULL_OPTIONS, 0, false, { white: true }),
  play: async ({ canvasElement }) => {
    canvasElement.querySelector<HTMLButtonElement>('[role="radio"]')?.focus();
  },
};
