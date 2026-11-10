import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React from 'react';
import FilterBar from '../FilterBar';
import type { FilterBarProps } from '../types';
import { ControlledFilterBar } from '../../../../../.storybook/docs-blocks/filter-bar/story-helpers';
import {
  ALL_FILTERS,
  FEW_FILTERS,
  SCOPE_OPTIONS,
} from '../../../../../.storybook/docs-blocks/filter-bar/fixtures';

const onClick = (): void => undefined;

/**
 * Sends the clicks of the chips, of "All filters" and the Segmented Control changes to the
 * Actions panel. The nested callbacks are not matched by `argTypesRegex`, so the story wires
 * them here; Filter Bar itself only calls them (the screen opens its own filters).
 */
const withActions = (args: FilterBarProps): FilterBarProps => ({
  ...args,
  filters: args.filters.map((filter) => ({
    ...filter,
    onClick: () => {
      filter.onClick?.();
      action('filters.onClick')(filter.label);
    },
  })) as FilterBarProps['filters'],
  allFilters: args.allFilters && {
    ...args.allFilters,
    onClick: action('allFilters.onClick'),
  },
  segmentedControl: args.segmentedControl && {
    ...args.segmentedControl,
    onChange: action('segmentedControl.onChange'),
  },
});

const meta: Meta<FilterBarProps> = {
  title: 'Components/Filter Bar',
  component: FilterBar,
  parameters: { layout: 'padded' },
  argTypes: {
    filters: { control: 'object' },
    allFilters: { control: 'object' },
    segmentedControl: { control: 'object' },
    'aria-label': { control: 'text' },
  },
  args: {
    'aria-label': 'Filters',
    filters: FEW_FILTERS,
  },
  render: (args) => <ControlledFilterBar {...withActions(args)} />,
};

export default meta;

type Story = StoryObj<FilterBarProps>;

/** Quick filters only: the chips, in one row that scrolls when they do not fit. */
export const Default: Story = {};

/** Adds the "All filters" chip after the chips and a divider. */
export const AllFilters: Story = {
  name: 'All filters',
  args: { allFilters: { ...ALL_FILTERS, onClick } },
};

/** Adds a Segmented Control fixed on the right, to switch the scope of the list. */
export const SegmentedControl: Story = {
  name: 'Segmented control',
  args: {
    segmentedControl: {
      'aria-label': 'Scope',
      options: SCOPE_OPTIONS,
      selectedIndex: 0,
      onChange: onClick,
    },
  },
};

/** Chips, "All filters" and the Segmented Control together. */
export const AllFiltersAndSegmentedControl: Story = {
  name: 'All filters and segmented control',
  args: {
    allFilters: { ...ALL_FILTERS, onClick },
    segmentedControl: {
      'aria-label': 'Scope',
      options: SCOPE_OPTIONS,
      selectedIndex: 0,
      onChange: onClick,
    },
  },
};
