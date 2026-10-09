import type { Meta, StoryObj } from '@storybook/react';
import TransactionFooter from '../TransactionFooter';
import {
  getTransactionSummaryItems,
  transactionSummaryAction as action,
  transactionFooterDecorators as decorators,
  transactionSummaryTotal as total,
  transactionNotice,
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

const items = getTransactionSummaryItems();

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
    notice: transactionNotice,
  },
  decorators,
};

export const WithNoticeHighlight: Story = {
  args: {
    type: 'highlight',
    items,
    total,
    action,
    notice: transactionNotice,
  },
  decorators,
};

export const RichRows: Story = {
  args: {
    items: [
      {
        content: { title: 'Pedido', description: 'Loja de colchões' },
        amount: { value: 'R$ 623,80' },
      },
      {
        content: { title: 'Custo de antecipação' },
        amount: {
          value: 'Grátis',
          strikethroughValue: 'R$ 96,39',
          type: 'strikethrough',
        },
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
      content: { title: `Item ${index + 1}` },
      amount: { value: `R$ ${100 + index},00` },
    })),
    total,
    action,
  },
  decorators,
};
