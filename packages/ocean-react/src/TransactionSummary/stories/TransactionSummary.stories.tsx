import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../Button';
import TransactionSummary from '../TransactionSummary';
import type { TransactionSummaryProps } from '../TransactionSummary';
import {
  transactionSummaryDetails,
  transactionSummaryMainItem as mainItem,
  transactionSummaryTotal as total,
  transactionAsideTitle,
} from '../../../../../.storybook/docs-blocks/transaction-footer-summary/fixtures';
import { transactionSummaryDecorator } from '../../../../../.storybook/docs-blocks/transaction-footer-summary/story-helpers';

type StoryArgs = TransactionSummaryProps & {
  actionLabel: string;
  showNoticeIcon: boolean;
};

const meta: Meta<StoryArgs> = {
  title: 'Components/Transaction Summary/Aside',
  component: TransactionSummary,
  decorators: [transactionSummaryDecorator],
  args: {
    actionLabel: 'Continue',
    action: (
      <Button variant="primary" blocked>
        Continue
      </Button>
    ),
    showNoticeIcon: true,
  },
  argTypes: {
    title: { control: 'text' },
    mainItem: { control: 'object' },
    details: { control: 'object' },
    total: { control: 'object' },
    notice: { control: 'object' },
    action: { control: false },
    actionLabel: { control: 'text', name: 'Action label' },
    showNoticeIcon: { control: 'boolean' },
    className: { control: 'text' },
  },
  render: ({ notice, showNoticeIcon, actionLabel, ...props }) => (
    <TransactionSummary
      {...props}
      notice={
        notice
          ? { ...notice, icon: showNoticeIcon ? notice.icon : null }
          : undefined
      }
      action={
        <Button variant="primary" blocked>
          {actionLabel}
        </Button>
      }
    />
  ),
};

export default meta;
type Story = StoryObj<typeof TransactionSummary>;

export const Default: Story = {
  args: {
    title: transactionAsideTitle,
    mainItem,
    details: transactionSummaryDetails,
    total,
  },
};
