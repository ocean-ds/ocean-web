import React from 'react';
import { CheckCircleOutline } from '@useblu/ocean-icons-react';
import Button from '../../Button';

export const transactionSummaryMainItem = {
  label: 'Pedido',
  value: 'R$ 623,80',
};

export const transactionSummaryDetails = [
  { label: 'Pague em', value: '3x de R$ 207,93 sem acréscimo' },
];

export const transactionFourDetails = [
  ...transactionSummaryDetails,
  { label: 'Custo de antecipação', value: 'R$ 96,39' },
  { label: 'Vencimento', value: '10 de outubro' },
  { label: 'Forma de pagamento', value: 'Cartão de crédito' },
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
  description: 'A economia será aplicada ao seu pagamento.',
};

export const transactionNoticeWithTitleAndIcon = {
  title: 'Economia de R$ 96,39',
  description: 'A economia será aplicada ao seu pagamento.',
  icon: <CheckCircleOutline size={24} focusable={false} />,
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
