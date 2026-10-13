import type { Meta, StoryObj } from '@storybook/react';
import TransactionSummary from '../TransactionSummary';
import {
  transactionSummaryDecorators,
  transactionSummaryAction as action,
  transactionNotice,
  transactionSummaryDetails,
  transactionSummaryMainItem as mainItem,
  transactionSummaryTotal as total,
} from '../../_shared/__fixtures__/transactionFooterSummary';

const meta: Meta<typeof TransactionSummary> = {
  title: 'Components/Transaction Summary',
  component: TransactionSummary,
  tags: ['autodocs'],
  decorators: transactionSummaryDecorators,
};

export default meta;
type Story = StoryObj<typeof TransactionSummary>;

export const Default: Story = {
  args: {
    title: 'Resumo do pagamento',
    mainItem,
    details: transactionSummaryDetails,
    total,
    action,
  },
};

export const WithoutTitle: Story = {
  args: {
    mainItem,
    details: transactionSummaryDetails,
    total,
    action,
  },
};

export const WithNotice: Story = {
  args: {
    title: 'Resumo do pagamento',
    mainItem,
    details: transactionSummaryDetails,
    total,
    notice: transactionNotice,
    action,
  },
};

export const DetailsOnly: Story = {
  args: {
    title: 'Resumo do pagamento',
    details: transactionSummaryDetails,
    total,
    action,
  },
};
