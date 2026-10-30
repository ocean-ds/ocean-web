import type { TabItem } from '../../../packages/ocean-react/src/Tab';

/** Example tabs shared by the stories, Visual tests and docs pages. */
export const DEFAULT_TABS: TabItem[] = [
  { label: 'Summary' },
  { label: 'Payments' },
  { label: 'Receipts' },
];

export const BADGE_TABS: TabItem[] = [
  { label: 'Summary' },
  { label: 'Payments', count: 3 },
  { label: 'Receipts', count: 12 },
];

export const SCROLL_TABS: TabItem[] = [
  { label: 'Summary' },
  { label: 'Payments', count: 3 },
  { label: 'Receipts' },
  { label: 'Invoices' },
  { label: 'Transfers' },
  { label: 'Statements' },
  { label: 'Refunds' },
  { label: 'Disputes' },
];

export const LONG_TABS: TabItem[] = [
  { label: 'Scheduled payments' },
  { label: 'Receivables in negotiation', count: 2 },
  { label: 'Statements' },
];

export const tabsCode = (tabs: TabItem[]): string =>
  `[\n${tabs
    .map(({ label, count }) =>
      count === undefined
        ? `    { label: '${label}' },`
        : `    { label: '${label}', count: ${count} },`
    )
    .join('\n')}\n  ]`;

export const tabCode = (tabs: TabItem[], ariaLabel = 'Account'): string =>
  `const [selected, setSelected] = useState(0);

<Tab
  aria-label="${ariaLabel}"
  tabs={${tabsCode(tabs)}}
  selectedIndex={selected}
  onChange={setSelected}
/>`;

/** Filters of one list: the wrong use of tabs, shown in Do and don't. */
export const FILTER_TABS: TabItem[] = [
  { label: 'All' },
  { label: 'Pending' },
  { label: 'Paid' },
];
