import React from 'react';
import { CalendarOutline, ViewListOutline } from '@useblu/ocean-icons-react';
import type { SegmentedControlOption } from '../../../packages/ocean-react/src/SegmentedControl';

type Options = [SegmentedControlOption, SegmentedControlOption];

/** Example options shared by the stories, Visual tests and docs pages. */
export const DEFAULT_OPTIONS: Options = [
  { label: 'Store' },
  { label: 'Network' },
];

export const ICON_OPTIONS: Options = [
  { label: 'List', icon: <ViewListOutline /> },
  { label: 'Calendar', icon: <CalendarOutline /> },
];

export const COUNT_OPTIONS: Options = [
  { label: 'Store', count: 3 },
  { label: 'Network', count: 12 },
];

export const FULL_OPTIONS: Options = [
  { label: 'List', icon: <ViewListOutline />, count: 3 },
  { label: 'Calendar', icon: <CalendarOutline />, count: 12 },
];

export const LONG_OPTIONS: Options = [
  { label: 'Receivables of this store' },
  { label: 'Receivables of the whole network' },
];

/** Three choices: the wrong use of the control, shown in Do and don't. */
export const FILTER_OPTIONS: Options = [{ label: 'All' }, { label: 'Pending' }];

const ICON_NAMES: Record<string, string> = {
  List: 'ViewListOutline',
  Calendar: 'CalendarOutline',
};

export const optionsCode = (options: Options): string =>
  `[\n${options
    .map(({ label, icon, count }) => {
      const parts = [`label: '${label}'`];
      if (icon) parts.push(`icon: <${ICON_NAMES[label]} />`);
      if (count !== undefined) parts.push(`count: ${count}`);
      return `    { ${parts.join(', ')} },`;
    })
    .join('\n')}\n  ]`;

export const segmentedControlCode = (
  options: Options,
  ariaLabel = 'Scope',
  extraProps: string[] = []
): string =>
  `const [selected, setSelected] = useState<0 | 1>(0);

<SegmentedControl
  aria-label="${ariaLabel}"
  options={${optionsCode(options)}}
  selectedIndex={selected}
  onChange={setSelected}${extraProps.map((prop) => `\n  ${prop}`).join('')}
/>`;
