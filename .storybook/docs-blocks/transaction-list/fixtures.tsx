import React from 'react';
import {
  ArrowCircleDownOutline,
  BarcodeOutline,
  CalendarOutline,
  CashOutline,
  LightningBoltOutline,
  PixOutline,
  ReceiptTaxOutline,
  TruckOutline,
} from '@useblu/ocean-icons-react';
import type { TransactionListBaseProps } from '../../../packages/ocean-react/src/_shared/components/TransactionListParts';

/**
 * Sample data shared by every docs page and story of the Transaction list family.
 * Fictional names only; amounts in Brazilian format, dates in English.
 */
export type RowFixture = TransactionListBaseProps;

const icon24 = (Icon: typeof CashOutline) => <Icon size={24} />;
const icon16 = (Icon: typeof CashOutline) => <Icon size={16} />;

export const PEOPLE = {
  suppliers: ['Coral Distributors', 'Tidewater Supplies', 'Reef Wholesale'],
  retailers: ['Seashell Store', 'Harbor Market', 'Lighthouse Pharmacy'],
};

export const TAGS = {
  paid: { label: 'Paid', type: 'positive' as const },
  scheduled: { label: 'Scheduled', type: 'warning' as const },
  canceled: { label: 'Canceled', type: 'neutral' as const },
};

type RowKey =
  | 'supplierPayment'
  | 'saleReceived'
  | 'receivablesAdvance'
  | 'installment'
  | 'pixReceived'
  | 'boletoPaid'
  | 'canceled';

export const rows: Record<RowKey, RowFixture> = {
  supplierPayment: {
    title: 'Supplier payment',
    description: 'Coral Distributors',
    caption: 'Nov 12, 9:15 AM',
    amount: 'R$ 1.250,00',
    amountType: 'negative',
    amountTag: TAGS.paid,
    icon: icon24(TruckOutline),
  },
  saleReceived: {
    title: 'Sale received',
    description: 'Seashell Store',
    caption: 'Nov 12, 8:40 AM',
    amount: 'R$ 980,00',
    amountType: 'positive',
    additionalData: 'Available balance',
    icon: icon24(CashOutline),
  },
  receivablesAdvance: {
    title: 'Receivables advance',
    description: 'Tidewater Supplies',
    caption: 'Nov 11, 4:20 PM',
    amount: 'Free',
    amountType: 'strikethrough',
    strikethroughAmount: 'R$ 89,90',
    additionalData: 'Advance fee',
    icon: icon24(LightningBoltOutline),
  },
  installment: {
    title: 'Installment 3 of 10',
    description: 'Reef Wholesale',
    caption: 'Due Nov 20',
    amount: 'R$ 320,00',
    amountTag: TAGS.scheduled,
    icon: icon24(CalendarOutline),
  },
  pixReceived: {
    title: 'Pix received',
    description: 'Harbor Market',
    caption: 'Nov 10, 2:05 PM',
    amount: 'R$ 450,00',
    amountType: 'positive',
    amountTag: TAGS.paid,
    icon: icon24(PixOutline),
  },
  boletoPaid: {
    title: 'Boleto paid',
    description: 'Lighthouse Pharmacy',
    caption: 'Nov 9, 11:30 AM',
    amount: 'R$ 210,00',
    amountType: 'negative',
    amountTag: TAGS.paid,
    icon: icon24(BarcodeOutline),
  },
  canceled: {
    title: 'Supplier payment',
    description: 'Lighthouse Pharmacy',
    caption: 'Nov 8, 10:00 AM',
    amount: 'R$ 15,00',
    amountTag: TAGS.canceled,
    icon: icon24(TruckOutline),
  },
};

/** Rows of the overview list, in the order they are shown. */
export const overviewRows: RowFixture[] = [
  rows.supplierPayment,
  rows.saleReceived,
  rows.receivablesAdvance,
  rows.installment,
];

/** Selectable rows: retailers to pick for a transfer. */
export const selectableRows: RowFixture[] = PEOPLE.retailers.map(
  (name, index) => ({
    title: 'Retailer',
    description: name,
    caption: `Account ${index + 1}`,
    amount: ['R$ 1.250,00', 'R$ 980,00', 'R$ 450,00'][index],
    additionalData: 'Available balance',
  })
);

/** Parent row of the expandable example and its child items. */
export const expandableParent: RowFixture = {
  title: 'Sale received',
  description: 'Seashell Store',
  caption: 'Nov 12, 8:40 AM',
  amount: 'R$ 1.000,00',
  amountType: 'positive',
  amountTag: TAGS.scheduled,
  additionalData: 'Net amount',
  contentSize: 'md',
  amountSize: 'md',
  icon: icon24(ArrowCircleDownOutline),
};

export const childRows: RowFixture[] = [
  {
    title: 'Gross amount',
    description: 'Card sale',
    amount: 'R$ 1.089,90',
    icon: icon16(CashOutline),
  },
  {
    title: 'Advance fee',
    description: 'Receivables advance',
    amount: 'R$ 89,90',
    amountType: 'negative',
    icon: icon16(ReceiptTaxOutline),
  },
  {
    title: 'Net amount',
    description: 'Available balance',
    amount: 'R$ 1.000,00',
    amountType: 'positive',
    icon: icon16(ArrowCircleDownOutline),
  },
];

export const CHILD_POSITIONS = ['first', 'middle', 'last'] as const;

export const noop = (): void => undefined;

/** Overflow menu and swipe actions. */
export const menuActions = [
  { label: 'View receipt', onClick: noop },
  { label: 'Cancel payment', onClick: noop, variant: 'negative' as const },
];

export const swipeActions = [
  {
    label: 'Receipt',
    onClick: noop,
    icon: icon24(ReceiptTaxOutline),
    variant: 'neutral' as const,
  },
  {
    label: 'Cancel',
    onClick: noop,
    icon: icon24(TruckOutline),
    variant: 'negative' as const,
  },
];

/** Amount types with the values each one needs. */
export const AMOUNT_TYPE_CASES = [
  ['default', { amount: 'R$ 320,00' }],
  ['positive', { amount: 'R$ 980,00' }],
  ['negative', { amount: 'R$ 1.250,00' }],
  ['strikethrough', { amount: 'Free', strikethroughAmount: 'R$ 89,90' }],
  [
    'strikethrough-neutral',
    { amount: 'R$ 45,00', strikethroughAmount: 'R$ 89,90' },
  ],
  ['inactive', { amount: 'R$ 15,00' }],
] as const;
