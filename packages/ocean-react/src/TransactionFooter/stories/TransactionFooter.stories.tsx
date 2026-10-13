import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../Button';
import TransactionFooter from '../TransactionFooter';
import type { TransactionFooterProps } from '../TransactionFooter';
import {
  transactionSummaryDetails,
  transactionSummaryMainItem as mainItem,
  transactionSummaryTotal as total,
} from '../../../../../.storybook/docs-blocks/transaction-footer-summary/fixtures';
import { transactionFooterDecorator } from '../../../../../.storybook/docs-blocks/transaction-footer-summary/story-helpers';

type StoryArgs = TransactionFooterProps & {
  actionLabel: string;
  showNoticeIcon: boolean;
};

const meta: Meta<StoryArgs> = {
  title: 'Components/Transaction Summary/Footer',
  component: TransactionFooter,
  decorators: [transactionFooterDecorator],
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
    type: {
      control: 'radio',
      options: ['default', 'highlight'],
    },
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
    <TransactionFooter
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
type Story = StoryObj<typeof TransactionFooter>;

export const Default: Story = {
  args: { mainItem, details: transactionSummaryDetails, total },
};

export const Highlight: Story = {
  args: {
    type: 'highlight',
    mainItem,
    details: transactionSummaryDetails,
    total,
  },
};
