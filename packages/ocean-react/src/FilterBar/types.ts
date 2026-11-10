import type { ComponentProps, ComponentPropsWithoutRef } from 'react';
import type Chips from '../Chips';
import type { SegmentedControlProps } from '../SegmentedControl';

/** One quick filter of the bar: the props of an Ocean `Chips`. */
export type FilterBarFilter = ComponentProps<typeof Chips>;

/** The "All filters" chip, after the quick filters and a divider. */
export type FilterBarAllFilters = {
  /**
   * Text of the chip.
   * @default 'Todos os filtros'
   */
  label?: string;
  /** Number of filters applied through it; shown as a counter when greater than zero. */
  count?: number;
  /** Called when the chip is clicked; the screen opens its full filters. */
  onClick: () => void;
};

export type FilterBarProps = {
  /** Quick filters, in order. At least one: the bar never shows without chips. */
  filters: [FilterBarFilter, ...FilterBarFilter[]];
  /** Optional "All filters" chip, after the quick filters. */
  allFilters?: FilterBarAllFilters;
  /**
   * Optional Segmented Control, fixed on the right, to switch the scope of the list. Below the
   * mobile breakpoint it shows only the labels: icons and counters are removed.
   */
  segmentedControl?: SegmentedControlProps;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>;
