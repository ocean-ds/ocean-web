import React from 'react';
import Button from '../../Button';
import { TransactionListReadOnlyProps } from '../../TransactionListReadOnly';

export const getTransactionSummaryItems = (
  title = 'Pedido'
): TransactionListReadOnlyProps[] => [
  { content: { title }, amount: { value: 'R$ 623,80' } },
  {
    content: { title: 'Pague em' },
    amount: { value: '3x de R$ 207,93', info: 'sem acréscimo' },
  },
];

export const transactionSummaryTotal = {
  label: 'Total',
  value: 'R$ 623,80',
};

export const transactionSummaryAction = (
  <Button variant="primary" blocked>
    Revisar pagamento
  </Button>
);

export const transactionNotice = {
  title: 'Economia de R$ 96,39',
  description: 'Economia aplicada ao seu pagamento.',
};

export const transactionFooterDecorators: Array<
  (StoryComponent: React.ComponentType) => JSX.Element
> = [
  (StoryComponent: React.ComponentType): JSX.Element => (
    <div style={{ width: 393 }}>
      <StoryComponent />
    </div>
  ),
];

export const transactionSummaryDecorators: Array<
  (StoryComponent: React.ComponentType) => JSX.Element
> = [
  (StoryComponent: React.ComponentType): JSX.Element => (
    <div style={{ width: 360 }}>
      <StoryComponent />
    </div>
  ),
];
