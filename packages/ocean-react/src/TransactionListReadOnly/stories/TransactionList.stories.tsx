import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import TransactionListAction from '../../TransactionListAction';
import { Frame } from '../../../../../.storybook/docs-blocks';
import { TransactionListDocs } from '../../../../../.storybook/docs-blocks/transaction-list/TransactionListDocs';
import { OverviewList } from '../../../../../.storybook/docs-blocks/transaction-list/examples';

const meta: Meta<typeof TransactionListAction> = {
  title: 'Components/List/Transaction list',
  component: TransactionListAction,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
    docs: { page: () => <TransactionListDocs /> },
  },
};

export default meta;

/** A group of Action rows, as shown at the top of the guidelines. */
export const Overview: StoryObj<typeof TransactionListAction> = {
  render: () => (
    <Frame>
      <OverviewList />
    </Frame>
  ),
};
