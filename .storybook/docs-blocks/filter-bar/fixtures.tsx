import React from 'react';
import { CalendarOutline, ViewListOutline } from '@useblu/ocean-icons-react';
import type {
  FilterBarAllFilters,
  FilterBarFilter,
} from '../../../packages/ocean-react/src/FilterBar';
import type { SegmentedControlOption } from '../../../packages/ocean-react/src/SegmentedControl';

type Filters = [FilterBarFilter, ...FilterBarFilter[]];
type Options = [SegmentedControlOption, SegmentedControlOption];

/** Example data shared by the stories, Visual tests and docs pages. */
export const FEW_FILTERS: Filters = [
  { label: 'Pending' },
  {
    label: 'Due date',
    options: [
      { label: 'Due today', value: 'today' },
      { label: 'Next 7 days', value: 'week' },
      { label: 'Overdue', value: 'overdue' },
    ],
  },
];

/** More chips than a narrow bar holds: the chip area scrolls. */
export const MANY_FILTERS: Filters = [
  { label: 'Pending' },
  { label: 'Paid' },
  { label: 'Overdue' },
  { label: 'Scheduled' },
  { label: 'Canceled' },
  { label: 'Refunded' },
  { label: 'Boleto' },
  {
    label: 'Supplier',
    options: [
      { label: 'Tidewater Company', value: 'tidewater' },
      { label: 'Reef Wholesale', value: 'reef' },
    ],
  },
];

export const LONG_FILTERS: Filters = [
  { label: 'Receivables due in the next thirty days' },
  { label: 'Paid with Boleto' },
];

export const ALL_FILTERS: Omit<FilterBarAllFilters, 'onClick'> = {
  label: 'All filters',
  count: 2,
};

export const SCOPE_OPTIONS: Options = [
  { label: 'Store' },
  { label: 'Network' },
];

/** Icon and counter: shown on desktop, removed by the bar on mobile. */
export const FULL_SCOPE_OPTIONS: Options = [
  { label: 'List', icon: <ViewListOutline />, count: 3 },
  { label: 'Calendar', icon: <CalendarOutline />, count: 12 },
];

export const LONG_SCOPE_OPTIONS: Options = [
  { label: 'Receivables of this store' },
  { label: 'Receivables of the whole network' },
];

const filtersCode = (filters: Filters): string =>
  `[\n${filters
    .map(({ label, options }) =>
      options
        ? `    {\n      label: '${label}',\n      options: [\n${options
            .map(
              (option) =>
                `        { label: '${option.label}', value: '${option.value}' },`
            )
            .join('\n')}\n      ],\n    },`
        : `    {\n      label: '${label}',\n      actived: active.includes('${label}'),\n      onClick: () => toggle('${label}'),\n    },`
    )
    .join('\n')}\n  ]`;

const ICON_NAMES: Record<string, string> = {
  List: 'ViewListOutline',
  Calendar: 'CalendarOutline',
};

const optionsCode = (options: Options): string =>
  `[${options
    .map(({ label, icon, count }) => {
      const parts = [`label: '${label}'`];
      if (icon) parts.push(`icon: <${ICON_NAMES[label]} />`);
      if (count !== undefined) parts.push(`count: ${count}`);
      return `{ ${parts.join(', ')} }`;
    })
    .join(', ')}]`;

/** Snippet of a bar, as the screen writes it. */
export const filterBarCode = (
  filters: Filters,
  {
    allFilters = false,
    segmented,
  }: { allFilters?: boolean; segmented?: Options } = {}
): string => {
  const props = [`filters={${filtersCode(filters)}}`];
  if (allFilters)
    props.push(
      `allFilters={{ label: 'All filters', count: 2, onClick: openAllFilters }}`
    );
  if (segmented)
    props.push(
      `segmentedControl={{\n    'aria-label': 'Scope',\n    options: ${optionsCode(
        segmented
      )},\n    selectedIndex: scope,\n    onChange: setScope,\n  }}`
    );
  return `<FilterBar\n  aria-label="Filters"\n  ${props.join('\n  ')}\n/>`;
};
