import type { Meta, StoryObj } from '@storybook/react';
import TransactionFooter from '../TransactionFooter';
import {
  getTransactionSummaryItems,
  transactionSummaryAction as action,
  transactionSummaryDecorators as decorators,
  transactionSummaryTotal as total,
} from '../../_shared/__fixtures__/transactionFooterSummary';

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

const items = getTransactionSummaryItems('Compra');

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
