import React from 'react';
import { CheckCircle } from '@useblu/ocean-icons-react';
import Button from '../../../packages/ocean-react/src/Button';

export const transactionSummaryMainItem = {
  label: 'Subtotal',
  value: 'R$ 1.250,00',
};

export const transactionSummaryDetails = [
  {
    label: 'Installments',
    value: '5x of R$ 250,00',
    info: 'No additional fees',
  },
];

export const transactionFourDetails = [
  ...transactionSummaryDetails,
  { label: 'Service fee', value: 'R$ 12,50' },
  { label: 'Delivery date', value: 'Mar 15' },
  { label: 'Payment method', value: 'Credit card' },
];

export const transactionSummaryTotal = {
  label: 'Total',
  value: 'R$ 1.250,00',
};

export const transactionSummaryAction = (
  <Button variant="primary" blocked>
    Continue
  </Button>
);

export const transactionNotice = {
  description: 'Supporting text for the notice.',
};

export const transactionNoticeWithTitleAndIcon = {
  title: 'Discount applied',
  description: 'Supporting text for the notice.',
  icon: <CheckCircle size={20} focusable={false} />,
};

export const transactionAsideTitle = 'Payment summary';
