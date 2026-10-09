import type { Meta, StoryObj } from '@storybook/react';
import TransactionSummary from '../TransactionSummary';
import {
  getTransactionSummaryItems,
  transactionSummaryAction as action,
  transactionSummaryDecorators as decorators,
  transactionSummaryTotal as total,
} from '../../_shared/__fixtures__/transactionFooterSummary';

const meta: Meta<typeof TransactionSummary> = {
  title: 'Components/Transaction Summary',
  component: TransactionSummary,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TransactionSummary>;

const items = getTransactionSummaryItems('Valor da compra');

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
