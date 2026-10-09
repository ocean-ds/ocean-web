import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import TransactionSummary from '../TransactionSummary';
import Button from '../../Button';

const meta: Meta<typeof TransactionSummary> = {
  title: 'Components/Transaction Summary',
  component: TransactionSummary,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TransactionSummary>;

const items = [
  { content: { title: 'Valor da compra' }, amount: { value: 'R$ 100,00' } },
  { content: { title: 'Desconto' }, amount: { value: 'R$ 10,00' } },
];
const total = { label: 'Total', value: 'R$ 90,00' };
const action = (
  <Button variant="primary" blocked>
    Continuar
  </Button>
);
const decorators = [
  (StoryComponent: React.ComponentType): JSX.Element => (
    <div style={{ maxWidth: 393 }}>
      <StoryComponent />
    </div>
  ),
];

export const Default: Story = {
  args: {
    title: 'Resumo',
    items,
    total,
    action,
  },
  decorators,
};

export const WithoutTitle: Story = {
  args: {
    items,
    total,
    action,
  },
  decorators,
};

export const WithNotice: Story = {
  args: {
    title: 'Resumo',
    items,
    total,
    notice: 'Seu pagamento será processado após a confirmação.',
    action,
  },
  decorators,
};
