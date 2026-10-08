import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import TransactionListReadOnly from '../TransactionListReadOnly';
import { Frame, MatrixGrid } from '../../../../../.storybook/docs-blocks';
import { TransactionListDocs } from '../../../../../.storybook/docs-blocks/transaction-list/TransactionListDocs';
import { readOnlyArgTypes } from '../../../../../.storybook/docs-blocks/transaction-list/argTypes';
import { rows } from '../../../../../.storybook/docs-blocks/transaction-list/fixtures';
import { SizesMatrix } from '../../../../../.storybook/docs-blocks/transaction-list/examples';

const baseArgs = rows.pixReceived;

const meta: Meta<typeof TransactionListReadOnly> = {
  title: 'Components/List/Transaction List Read Only',
  component: TransactionListReadOnly,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { page: () => <TransactionListDocs variant="readOnly" /> },
  },
  argTypes: readOnlyArgTypes,
  args: baseArgs,
};

export default meta;

type Story = StoryObj<typeof TransactionListReadOnly>;

const noControls = { controls: { disable: true } };

/** Every prop in the controls. No snapshot: the matrices cover the visuals. */
export const Default: Story = {
  name: 'Playground',
  parameters: { chromatic: { disableSnapshot: true } },
  render: (args) => (
    <Frame>
      <TransactionListReadOnly {...args} />
    </Frame>
  ),
};

const sizeCombos = [
  ['md', 'md'],
  ['sm', 'md'],
  ['md', 'sm'],
  ['sm', 'sm'],
] as const;

/** States (default, loading, disabled) × content and amount sizes. */
export const States: Story = {
  name: 'States × sizes',
  parameters: noControls,
  render: () => (
    <MatrixGrid
      columns={sizeCombos.map(
        ([content, amount]) => `contentSize ${content} · amountSize ${amount}`
      )}
      rows={(
        [
          ['Default', {}],
          ['Loading', { loading: true }],
          ['Disabled', { disabled: true }],
        ] as const
      ).map(([label, props]) => ({
        label,
        cells: sizeCombos.map(([contentSize, amountSize]) => (
          <TransactionListReadOnly
            key={`${contentSize}-${amountSize}`}
            {...baseArgs}
            {...props}
            contentSize={contentSize}
            amountSize={amountSize}
          />
        )),
      }))}
    />
  ),
};

/** Amount types × size. */
export const Sizes: Story = {
  name: 'Sizes × amount types',
  parameters: noControls,
  render: () => (
    <SizesMatrix
      render={(props) => <TransactionListReadOnly {...baseArgs} {...props} />}
    />
  ),
};

/** Icon color (and disabled) × background. */
export const IconColors: Story = {
  name: 'Icon colors',
  parameters: noControls,
  render: () => (
    <MatrixGrid
      columns={['White', 'Warning up', 'Negative up']}
      rows={(
        [
          ['default', { iconColor: 'default' }],
          ['on-color', { iconColor: 'on-color' }],
          ['highlight', { iconColor: 'highlight' }],
          ['disabled', { iconColor: 'highlight', disabled: true }],
        ] as const
      ).map(([label, props]) => ({
        label,
        cells: ['', 'odoc-bg--warning', 'odoc-bg--negative'].map(
          (background) => (
            <div key={background} className={background}>
              <TransactionListReadOnly {...baseArgs} {...props} />
            </div>
          )
        ),
      }))}
    />
  ),
};

/** Density (default × compact) × size and loading. Heights: 100/84, 94/78, 73/57. */
export const Density: Story = {
  name: 'Density',
  parameters: noControls,
  render: () => (
    <MatrixGrid
      columns={['default', 'compact']}
      rows={(
        [
          ['md · md', {}],
          ['sm · sm', { contentSize: 'sm', amountSize: 'sm' }],
          ['Loading', { loading: true }],
        ] as const
      ).map(([label, props]) => ({
        label,
        cells: (['default', 'compact'] as const).map((density) => (
          <TransactionListReadOnly
            key={density}
            {...baseArgs}
            {...props}
            density={density}
          />
        )),
      }))}
    />
  ),
};
