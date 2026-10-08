import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import TransactionListChildAction from '../TransactionListChildAction';
import TransactionListChildReadOnly from '../../TransactionListChildReadOnly';
import { Frame, MatrixGrid } from '../../../../../.storybook/docs-blocks';
import { TransactionListDocs } from '../../../../../.storybook/docs-blocks/transaction-list/TransactionListDocs';
import { childActionArgTypes } from '../../../../../.storybook/docs-blocks/transaction-list/argTypes';
import { childRows } from '../../../../../.storybook/docs-blocks/transaction-list/fixtures';
import { stateCases } from '../../../../../.storybook/docs-blocks/transaction-list/examples';

const noSnapshot = { chromatic: { disableSnapshot: true } };
const noControls = { controls: { disable: true } };
const baseArgs = {
  ...childRows[1],
  caption: 'Nov 12',
  amountTag: { label: 'Paid' },
};

const positions = ['standalone', 'first', 'middle', 'last'] as const;

const meta: Meta<typeof TransactionListChildAction> = {
  title: 'Components/List/Transaction List Child',
  component: TransactionListChildAction,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { page: () => <TransactionListDocs variant="childAction" /> },
  },
  argTypes: childActionArgTypes,
  args: baseArgs,
};

export default meta;

type Story = StoryObj<typeof TransactionListChildAction>;

/** Child action with every prop in the controls. */
export const Default: Story = {
  name: 'Playground',
  parameters: noSnapshot,
  render: (args) => (
    <Frame>
      <TransactionListChildAction {...args} />
    </Frame>
  ),
};

/** Timeline position × child type. */
export const Timeline: Story = {
  name: 'Timeline',
  parameters: noControls,
  render: () => (
    <MatrixGrid
      columns={['Child action', 'Child read only']}
      rows={positions.map((position) => ({
        label: position,
        cells: [
          <TransactionListChildAction
            key="action"
            {...baseArgs}
            position={position}
          />,
          <TransactionListChildReadOnly
            key="read-only"
            {...baseArgs}
            position={position}
          />,
        ],
      }))}
    />
  ),
};

/** State × child type × density. */
export const States: Story = {
  name: 'States',
  parameters: noControls,
  render: () => (
    <MatrixGrid
      columns={['Child action', 'Child read only', 'Child action · compact']}
      rows={stateCases('ods-transaction-list--show-hover').map(
        ([label, props]) => ({
          label,
          cells: [
            <TransactionListChildAction
              key="action"
              {...baseArgs}
              {...props}
              position="middle"
            />,
            <TransactionListChildReadOnly
              key="read-only"
              {...baseArgs}
              {...props}
              position="middle"
            />,
            <TransactionListChildAction
              key="compact"
              {...baseArgs}
              {...props}
              position="middle"
              density="compact"
            />,
          ],
        })
      )}
    />
  ),
};

/** Icon color (no iconColor = child default) × background. */
export const IconColors: Story = {
  name: 'Icon colors',
  parameters: noControls,
  render: () => (
    <MatrixGrid
      columns={['White', 'Warning up']}
      rows={(
        [
          ['no iconColor', {}],
          ['default', { iconColor: 'default' }],
          ['on-color', { iconColor: 'on-color' }],
          ['highlight', { iconColor: 'highlight' }],
          ['disabled', { iconColor: 'highlight', disabled: true }],
        ] as const
      ).map(([label, props]) => ({
        label,
        cells: ['', 'odoc-bg--warning'].map((background) => (
          <div key={background} className={background}>
            <TransactionListChildAction
              {...baseArgs}
              {...props}
              position="middle"
            />
          </div>
        )),
      }))}
    />
  ),
};
