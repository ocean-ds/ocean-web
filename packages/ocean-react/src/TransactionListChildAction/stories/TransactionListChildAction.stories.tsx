import type { Meta, StoryObj } from '@storybook/react';
import TransactionListChildAction from '../TransactionListChildAction';
import { childActionArgTypes } from '../../../../../.storybook/docs-blocks/transaction-list/argTypes';
import {
  childRows,
  handlers,
} from '../../../../../.storybook/docs-blocks/transaction-list/fixtures';
import { timelineRender } from '../../../../../.storybook/docs-blocks/transaction-list/story-helpers';

const meta: Meta<typeof TransactionListChildAction> = {
  title: 'Components/Lists/Transaction List/Transaction List Child Action',
  component: TransactionListChildAction,
  parameters: { layout: 'centered' },
  argTypes: childActionArgTypes,
  args: { ...childRows[1], position: 'middle', onClick: handlers.openDetails },
};

export default meta;

/**
 * Three items on the timeline inside an expanded row. The controls apply to the middle item;
 * density, icon color and states apply to all three.
 */
export const Timeline: StoryObj<typeof TransactionListChildAction> = {
  render: timelineRender(TransactionListChildAction),
};
