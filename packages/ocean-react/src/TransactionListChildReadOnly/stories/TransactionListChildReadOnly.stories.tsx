import type { Meta, StoryObj } from '@storybook/react';
import TransactionListChildReadOnly from '../TransactionListChildReadOnly';
import { childReadOnlyArgTypes } from '../../../../../.storybook/docs-blocks/transaction-list/argTypes';
import { childRows } from '../../../../../.storybook/docs-blocks/transaction-list/fixtures';
import { timelineRender } from '../../../../../.storybook/docs-blocks/transaction-list/story-helpers';

const meta: Meta<typeof TransactionListChildReadOnly> = {
  title: 'Components/Lists/Transaction List/Transaction List Child Read Only',
  component: TransactionListChildReadOnly,
  parameters: { layout: 'centered' },
  argTypes: childReadOnlyArgTypes,
  args: { ...childRows[1], position: 'middle' },
};

export default meta;

/**
 * Three items on the timeline inside an expanded row. The controls apply to the middle item;
 * density, icon color and states apply to all three.
 */
export const Timeline: StoryObj<typeof TransactionListChildReadOnly> = {
  render: timelineRender(TransactionListChildReadOnly),
};
