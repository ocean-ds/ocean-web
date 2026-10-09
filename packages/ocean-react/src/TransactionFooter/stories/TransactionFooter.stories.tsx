import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import TransactionFooter from '../TransactionFooter';
import Button from '../../Button';

const meta: Meta<typeof TransactionFooter> = {
  title: 'Components/Transaction Footer',
  component: TransactionFooter,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'highlight'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TransactionFooter>;

const items = [
  { content: { title: 'Compra' }, amount: { value: 'R$ 100,00' } },
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
  args: { items, total, action },
  decorators,
};

export const Highlight: Story = {
  args: { type: 'highlight', items, total, action },
  decorators,
};

export const WithNotice: Story = {
  args: {
    items,
    total,
    action,
    notice: 'Seu pagamento será processado após a confirmação.',
  },
  decorators,
};

export const RichRows: Story = {
  args: {
    items: [
      {
        content: { title: 'Compra', description: 'Loja', caption: 'Hoje' },
        amount: {
          value: 'R$ 0,00',
          strikethroughValue: 'R$ 10,00',
          tag: { label: 'Grátis', type: 'positive' },
        },
      },
      {
        content: { title: 'Desconto', description: 'Benefício aplicado' },
        amount: { value: 'R$ 10,00', type: 'positive' },
      },
    ],
    total,
    action,
  },
  decorators,
};

export const MaxRows: Story = {
  args: {
    items: Array.from({ length: 7 }, (_, index) => ({
      content: { title: `Linha ${index + 1}` },
      amount: { value: `R$ ${index + 1},00` },
    })),
    total,
    action,
  },
  decorators,
};
