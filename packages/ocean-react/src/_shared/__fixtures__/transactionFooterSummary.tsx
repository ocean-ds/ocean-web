import React from 'react';
import Button from '../../Button';
import { TransactionListReadOnlyProps } from '../../TransactionListReadOnly';

export const getTransactionSummaryItems = (
  title: string
): TransactionListReadOnlyProps[] => [
  { content: { title }, amount: { value: 'R$ 100,00' } },
  { content: { title: 'Desconto' }, amount: { value: 'R$ 10,00' } },
];

export const transactionSummaryTotal = {
  label: 'Total',
  value: 'R$ 90,00',
};

export const transactionSummaryAction = (
  <Button variant="primary" blocked>
    Continuar
  </Button>
);

export const transactionSummaryDecorators: Array<
  (StoryComponent: React.ComponentType) => JSX.Element
> = [
  (StoryComponent: React.ComponentType): JSX.Element => (
    <div style={{ maxWidth: 393 }}>
      <StoryComponent />
    </div>
  ),
];
