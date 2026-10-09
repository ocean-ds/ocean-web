import React from 'react';
import { named } from '../jsx';
import {
  ReceiptTaxOutline,
  LightningBoltOutline,
} from '@useblu/ocean-icons-react';
import type {
  ContentListAmountProps,
  ContentListDefaultProps,
} from '../../../packages/ocean-react/src/_shared/components/TransactionListParts';

/**
 * Sample data shared by every docs page and story of the Transaction List family.
 * Fictional names only; amounts in Brazilian format. The same data is used in every locale.
 */

type IconProps = { size?: number; className?: string };

const strokeIcon = (
  paths: React.ReactNode,
  name: string
): React.FC<IconProps> => {
  const Icon = ({ size = 24, className }: IconProps): React.ReactElement => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className={className}
      aria-hidden
      data-icon={name}
    >
      {paths}
    </svg>
  );
  return Icon;
};

/** Money leaving the account. Docs-local copy of the design icon `outflowOutline`. */
export const OutflowOutline = strokeIcon(
  <>
    <path d="M14 17H18C19.1046 17 20 16.1046 20 15V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V11" />
    <path d="M6 20L3 17L6 14M3 17L10 17" strokeLinejoin="round" />
    <path
      d="M11.9592 13C10.8321 13 10 12.1046 10 11C10 9.89543 10.8321 9 11.9592 9C13.0863 9 14 9.89543 14 11C14 12.1046 13.0863 13 11.9592 13Z"
      strokeLinejoin="round"
    />
  </>,
  'outflow-outline'
);
OutflowOutline.displayName = 'OutflowOutline';

/** Money entering the account. Docs-local copy of the design icon `inflowOutline`. */
export const InflowOutline = strokeIcon(
  <>
    <path d="M10 17H6C4.89543 17 4 16.1046 4 15V7C4 5.89543 4.89543 5 6 5H18C19.1046 5 20 5.89543 20 7V11" />
    <path d="M18 20L21 17L18 14M21 17L14 17" strokeLinejoin="round" />
    <path
      d="M12.0408 13C13.1679 13 14 12.1046 14 11C14 9.89543 13.1679 9 12.0408 9C10.9137 9 10 9.89543 10 11C10 12.1046 10.9137 13 12.0408 13Z"
      strokeLinejoin="round"
    />
  </>,
  'inflow-outline'
);
InflowOutline.displayName = 'InflowOutline';

export type RowFixture = {
  content: ContentListDefaultProps;
  amount: ContentListAmountProps;
  icon?: React.ReactNode;
};

export const TAGS = {
  scheduled: { label: 'Payment scheduled', type: 'complementary' as const },
  processing: { label: 'Processing', type: 'neutral' as const },
  canceled: { label: 'Canceled', type: 'neutral' as const },
};

const outflow = <OutflowOutline />;
const inflow = <InflowOutline />;

type RowKey =
  | 'supplierPayment'
  | 'bankTransfer'
  | 'creditSales'
  | 'debitSales'
  | 'receivablesAdvance'
  | 'canceled';

export const rows: Record<RowKey, RowFixture> = {
  supplierPayment: {
    content: {
      title: 'Payment to supplier',
      description: 'Tidewater Company',
      caption: 'Order #7182',
    },
    amount: { value: 'R$ 6.819,33' },
    icon: outflow,
  },
  bankTransfer: {
    content: { title: 'Bank transfer', description: 'Seashell Corporation' },
    amount: { value: 'R$ 1.314,28', tag: TAGS.scheduled },
    icon: outflow,
  },
  creditSales: {
    content: { title: 'Sales received', description: 'Credit card' },
    amount: { value: 'R$ 7.899,01', type: 'positive' },
    icon: inflow,
  },
  debitSales: {
    content: { title: 'Sales received', description: 'Debit card' },
    amount: { value: 'R$ 12.890,02', type: 'positive' },
    icon: inflow,
  },
  receivablesAdvance: {
    content: { title: 'Receivables advance', description: 'Credit card' },
    amount: {
      value: 'Free',
      type: 'strikethrough',
      strikethroughValue: 'R$ 89,90',
      info: 'Advance fee',
    },
    icon: <LightningBoltOutline size={24} />,
  },
  canceled: {
    content: {
      title: 'Payment to supplier',
      description: 'Reef Wholesale',
      caption: 'Order #7064',
    },
    amount: { value: 'R$ 2.450,00', tag: TAGS.canceled },
    icon: outflow,
  },
};

/** The statement shown at the top of the pages. */
export const statementRows: RowFixture[] = [
  rows.supplierPayment,
  rows.bankTransfer,
  rows.creditSales,
  rows.debitSales,
];

/** Selectable rows: receivables to choose for an advance. */
export const selectableRows: RowFixture[] = [
  {
    content: {
      title: 'Receivables',
      description: 'Credit card',
      caption: 'Due Oct 15',
    },
    amount: { value: 'R$ 7.899,01', info: 'Available balance' },
  },
  {
    content: {
      title: 'Receivables',
      description: 'Debit card',
      caption: 'Due Oct 16',
    },
    amount: { value: 'R$ 12.890,02', info: 'Available balance' },
  },
  {
    content: {
      title: 'Receivables',
      description: 'Boleto',
      caption: 'Due Oct 20',
    },
    amount: { value: 'R$ 1.314,28', info: 'Available balance' },
  },
];

/** Parent row of the expandable example and its child items. */
export const expandableParent: RowFixture = {
  content: {
    title: 'Sales received',
    description: 'Credit card',
    caption: 'Oct 8',
    size: 'md',
  },
  amount: {
    value: 'R$ 7.899,01',
    type: 'positive',
    info: 'Net amount',
    size: 'md',
  },
  icon: inflow,
};

export const childRows: RowFixture[] = [
  {
    content: { title: 'Gross amount', description: 'Card sales' },
    amount: { value: 'R$ 7.988,91' },
    icon: <InflowOutline size={16} />,
  },
  {
    content: { title: 'Advance fee', description: 'Receivables advance' },
    amount: { value: 'R$ 89,90', type: 'negative' },
    icon: <ReceiptTaxOutline size={16} />,
  },
  {
    content: { title: 'Net amount', description: 'Available balance' },
    amount: { value: 'R$ 7.899,01', type: 'positive' },
    icon: <InflowOutline size={16} />,
  },
];

export const CHILD_POSITIONS = ['first', 'middle', 'last'] as const;

export const noop = (): void => undefined;

/** Overflow menu and swipe actions. */
export const handlers = {
  openDetails: named('openDetails', () => undefined),
  viewReceipt: named('viewReceipt', () => undefined),
  share: named('share', () => undefined),
  cancelPayment: named('cancelPayment', () => undefined),
  toggle: named('toggle', () => undefined),
  setExpanded: named('setExpanded', () => undefined),
};

export const menuActions = [
  { label: 'View receipt', onClick: handlers.viewReceipt },
  { label: 'Share', onClick: handlers.share },
  {
    label: 'Cancel payment',
    onClick: handlers.cancelPayment,
    variant: 'negative' as const,
  },
];

export const swipeActions = [
  {
    label: 'Receipt',
    onClick: handlers.viewReceipt,
    icon: <ReceiptTaxOutline size={24} />,
    variant: 'neutral' as const,
  },
  {
    label: 'Cancel',
    onClick: handlers.cancelPayment,
    icon: <OutflowOutline />,
    variant: 'negative' as const,
  },
];

/** Amount types with the values each one needs. */
export const AMOUNT_TYPE_CASES: [
  NonNullable<ContentListAmountProps['type']>,
  Partial<ContentListAmountProps>
][] = [
  ['default', { value: 'R$ 6.819,33' }],
  ['positive', { value: 'R$ 7.899,01' }],
  ['negative', { value: 'R$ 1.314,28' }],
  ['strikethrough', { value: 'Free', strikethroughValue: 'R$ 89,90' }],
  [
    'strikethrough-neutral',
    { value: 'R$ 6.819,33', strikethroughValue: 'R$ 7.120,00' },
  ],
  ['inactive', { value: 'R$ 2.450,00' }],
];
