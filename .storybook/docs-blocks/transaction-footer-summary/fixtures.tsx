import React from 'react';
import { CheckCircle } from '@useblu/ocean-icons-react';
import Button from '../../../packages/ocean-react/src/Button';

export const transactionSummaryMainItem = {
  content: { title: 'Subtotal' },
  amount: { value: '$1,250.00' },
};

export const transactionSummaryDetails = [
  {
    content: { title: 'Installments' },
    amount: { value: '5 × $250.00', info: 'No additional fees' },
  },
];

export const transactionFourDetails = [
  ...transactionSummaryDetails,
  { content: { title: 'Service fee' }, amount: { value: '$12.50' } },
  { content: { title: 'Delivery date' }, amount: { value: 'Mar 15' } },
  { content: { title: 'Payment method' }, amount: { value: 'Credit card' } },
];

export const transactionSummaryTotal = {
  label: 'Total',
  value: '$1,250.00',
};

export const transactionSummaryAmountVariants = [
  {
    content: { title: 'Standard amount', inverted: false },
    amount: { value: '$24.00' },
  },
  {
    content: { title: 'Positive amount', inverted: false },
    amount: { value: '$24.00', type: 'positive' as const },
  },
  {
    content: { title: 'Negative amount', inverted: false },
    amount: { value: '$24.00', type: 'negative' as const },
  },
  {
    content: { title: 'Inactive amount', inverted: false },
    amount: { value: '$24.00', type: 'inactive' as const },
  },
  {
    content: { title: 'Changed amount', inverted: false },
    amount: {
      value: '$24.00',
      type: 'strikethrough' as const,
      strikethroughValue: '$30.00',
    },
  },
  {
    content: { title: 'Neutral change', inverted: false },
    amount: {
      value: '$24.00',
      type: 'strikethrough-neutral' as const,
      strikethroughValue: '$30.00',
    },
  },
  {
    content: { title: 'Scheduled payment', inverted: false },
    amount: {
      value: '$24.00',
      tag: { label: 'Scheduled', type: 'complementary' as const },
    },
  },
  {
    content: {
      title: 'Monthly payment',
      description: '5 monthly payments',
      inverted: false,
    },
    amount: { value: '$24.00', info: 'No additional fees' },
  },
];

export const transactionSummaryAction = (
  <Button variant="primary" blocked>
    Continue
  </Button>
);

export const transactionNotice = {
  description: 'Your discount is included in the total.',
};

export const transactionNoticeWithTitleAndIcon = {
  title: 'Discount applied',
  description: 'Your discount is included in the total.',
  icon: <CheckCircle size={20} focusable={false} />,
};

export const transactionAsideTitle = 'Payment summary';
