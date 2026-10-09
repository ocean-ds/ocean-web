import type { Meta, StoryObj } from '@storybook/react';
import TransactionListAction from '../TransactionListAction';
import { actionArgTypes } from '../../../../../.storybook/docs-blocks/transaction-list/argTypes';
import {
  handlers,
  menuActions,
  rows,
  swipeActions,
} from '../../../../../.storybook/docs-blocks/transaction-list/fixtures';
import { inList } from '../../../../../.storybook/docs-blocks/transaction-list/story-helpers';

const meta: Meta<typeof TransactionListAction> = {
  title: 'Components/Lists/Transaction List/Transaction List Action',
  component: TransactionListAction,
  decorators: [inList],
  parameters: { layout: 'centered' },
  argTypes: actionArgTypes,
  args: { ...rows.supplierPayment, showDivider: false },
};

export default meta;

type Story = StoryObj<typeof TransactionListAction>;

const openTrigger: Story['play'] = async ({ canvasElement }) => {
  canvasElement
    .querySelector<HTMLButtonElement>('.ods-internal-list-actions__trigger')
    ?.click();
};

/** The whole row opens the details. */
export const Chevron: Story = {
  args: { actionType: 'chevron', onClick: handlers.openDetails },
};

/** Overflow button with the actions; the play function opens the menu. */
export const Menu: Story = {
  args: {
    actionType: 'menu',
    menuActions,
    menuLabel: 'Actions for Payment to supplier',
  },
  parameters: { layout: 'padded' },
  play: openTrigger,
};

/** Actions revealed by swiping left; the play function opens them. */
export const Swipe: Story = {
  args: {
    ...rows.bankTransfer,
    actionType: 'swipe',
    menuActions: swipeActions,
  },
  play: openTrigger,
};
