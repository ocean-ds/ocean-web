import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import TransactionListAction from '../TransactionListAction';
import { Frame, MatrixGrid } from '../../../../../.storybook/docs-blocks';
import { TransactionListDocs } from '../../../../../.storybook/docs-blocks/transaction-list/TransactionListDocs';
import { actionArgTypes } from '../../../../../.storybook/docs-blocks/transaction-list/argTypes';
import {
  menuActions,
  rows,
} from '../../../../../.storybook/docs-blocks/transaction-list/fixtures';
import {
  SizesMatrix,
  actionTypeProps,
  stateCases,
} from '../../../../../.storybook/docs-blocks/transaction-list/examples';

const noSnapshot = { chromatic: { disableSnapshot: true } };
const noControls = { controls: { disable: true } };
const baseArgs = rows.supplierPayment;

const meta: Meta<typeof TransactionListAction> = {
  title: 'Components/List/Transaction List Action',
  component: TransactionListAction,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { page: () => <TransactionListDocs variant="action" /> },
  },
  argTypes: actionArgTypes,
  args: { ...baseArgs, menuActions },
};

export default meta;

type Story = StoryObj<typeof TransactionListAction>;

/** Every prop in the controls. */
export const Default: Story = {
  name: 'Playground',
  parameters: noSnapshot,
  render: (args) => (
    <Frame>
      <TransactionListAction {...args} />
    </Frame>
  ),
};

const types = ['chevron', 'menu', 'swipe'] as const;

/** Action type × state. */
export const States: Story = {
  name: 'Types × states',
  parameters: noControls,
  render: () => (
    <MatrixGrid
      columns={[...types]}
      rows={stateCases('ods-transaction-list--show-hover').map(
        ([label, props]) => ({
          label,
          cells: types.map((type) => (
            <TransactionListAction
              key={type}
              {...baseArgs}
              {...actionTypeProps[type]}
              {...props}
            />
          )),
        })
      )}
    />
  ),
};

/** Amount types × size. */
export const Sizes: Story = {
  name: 'Sizes × amount types',
  parameters: noControls,
  render: () => (
    <SizesMatrix
      render={(props) => <TransactionListAction {...baseArgs} {...props} />}
    />
  ),
};

const openTrigger = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}): Promise<void> => {
  canvasElement
    .querySelector<HTMLButtonElement>('.ods-internal-list-actions__trigger')
    ?.click();
};

/** Menu open below its trigger. */
export const MenuActive: Story = {
  name: 'Menu: open',
  parameters: { ...noSnapshot, ...noControls },
  render: () => (
    <Frame className="odoc-frame--menu">
      <TransactionListAction {...baseArgs} {...actionTypeProps.menu} />
    </Frame>
  ),
  play: openTrigger,
};

/** Actions revealed by the swipe. */
export const SwipeActive: Story = {
  name: 'Swipe: open',
  parameters: { ...noSnapshot, ...noControls },
  render: () => (
    <Frame>
      <TransactionListAction {...baseArgs} {...actionTypeProps.swipe} />
    </Frame>
  ),
  play: openTrigger,
};

/** One onClick per click; none while disabled. */
const ClickCounter = () => {
  const [clicks, setClicks] = useState(0);
  const count = () => setClicks((value) => value + 1);
  return (
    <Frame>
      <TransactionListAction {...baseArgs} onClick={count} />
      <TransactionListAction {...baseArgs} disabled onClick={count} />
      <p className="ods-typography ods-typography__caption">Clicks: {clicks}</p>
    </Frame>
  );
};

export const Clicks: Story = {
  name: 'Click counter',
  parameters: { ...noSnapshot, ...noControls },
  render: () => <ClickCounter />,
};
