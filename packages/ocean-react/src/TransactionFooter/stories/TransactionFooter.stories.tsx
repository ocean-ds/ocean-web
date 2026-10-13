import type { Meta, StoryObj } from '@storybook/react';
import TransactionFooter from '../TransactionFooter';
import {
  transactionFourDetails,
  transactionFooterDecorators as decorators,
  transactionNotice,
  transactionNoticeWithTitleAndIcon,
  transactionSummaryAction as action,
  transactionSummaryDetails,
  transactionSummaryMainItem as mainItem,
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

export const Default: Story = {
  args: { mainItem, details: transactionSummaryDetails, total, action },
  decorators,
};

export const Highlight: Story = {
  args: {
    type: 'highlight',
    mainItem,
    details: transactionSummaryDetails,
    total,
    action,
  },
  decorators,
};

export const WithNotice: Story = {
  args: {
    mainItem,
    details: transactionSummaryDetails,
    total,
    action,
    notice: transactionNotice,
  },
  decorators,
};

export const WithNoticeHighlight: Story = {
  args: {
    type: 'highlight',
    mainItem,
    details: transactionSummaryDetails,
    total,
    action,
    notice: transactionNotice,
  },
  decorators,
};

export const NoticeWithTitleAndIcon: Story = {
  args: {
    mainItem,
    details: transactionSummaryDetails,
    total,
    action,
    notice: transactionNoticeWithTitleAndIcon,
  },
  decorators,
};

export const MainItemOnly: Story = {
  args: { mainItem, total, action },
  decorators,
};

export const DetailsOnly: Story = {
  args: { details: transactionSummaryDetails, total, action },
  decorators,
};

export const FourDetails: Story = {
  args: { details: transactionFourDetails, total, action },
  decorators,
};
