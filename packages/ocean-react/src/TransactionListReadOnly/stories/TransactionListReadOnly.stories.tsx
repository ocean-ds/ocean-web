import type { Meta, StoryObj } from '@storybook/react';
import TransactionListReadOnly from '../TransactionListReadOnly';
import { readOnlyArgTypes } from '../../../../../.storybook/docs-blocks/transaction-list/argTypes';
import { rows } from '../../../../../.storybook/docs-blocks/transaction-list/fixtures';
import { inList } from '../../../../../.storybook/docs-blocks/transaction-list/story-helpers';

const meta: Meta<typeof TransactionListReadOnly> = {
  title: 'Components/Lists/Transaction List/Transaction List Read Only',
  component: TransactionListReadOnly,
  decorators: [inList],
  parameters: { layout: 'centered' },
  argTypes: readOnlyArgTypes,
  args: { ...rows.supplierPayment, showDivider: false },
};

export default meta;

/** A statement line: content, amount and leading icon. */
export const Default: StoryObj<typeof TransactionListReadOnly> = {};
