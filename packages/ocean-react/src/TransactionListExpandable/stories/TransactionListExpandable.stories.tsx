import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import TransactionListExpandable, {
  TransactionListExpandableProps,
} from '../TransactionListExpandable';
import TransactionListChildReadOnly from '../../TransactionListChildReadOnly';
import { Frame, MatrixGrid } from '../../../../../.storybook/docs-blocks';
import { TransactionListDocs } from '../../../../../.storybook/docs-blocks/transaction-list/TransactionListDocs';
import { expandableArgTypes } from '../../../../../.storybook/docs-blocks/transaction-list/argTypes';
import { expandableParent } from '../../../../../.storybook/docs-blocks/transaction-list/fixtures';
import {
  ExpandableExample,
  SizesMatrix,
  childItems,
  stateCases,
} from '../../../../../.storybook/docs-blocks/transaction-list/examples';

const noSnapshot = { chromatic: { disableSnapshot: true } };
const noControls = { controls: { disable: true } };

const familyArgs: TransactionListExpandableProps = {
  ...expandableParent,
  showDivider: true,
  supportingText: 'Fees already deducted',
};

const withoutSizes: TransactionListExpandableProps = {
  ...familyArgs,
  contentSize: undefined,
  amountSize: undefined,
};

const meta: Meta<typeof TransactionListExpandable> = {
  title: 'Components/List/TransactionListExpandable',
  component: TransactionListExpandable,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { page: () => <TransactionListDocs variant="expandable" /> },
  },
  argTypes: expandableArgTypes,
  args: familyArgs,
};

export default meta;

type Story = StoryObj<typeof TransactionListExpandable>;

/** Every prop in the controls; opens and closes on click. */
export const Usage: Story = {
  name: 'Playground',
  parameters: noSnapshot,
  render: (args) => (
    <Frame>
      <ExpandableExample {...args} initial={args.expanded ?? true} />
    </Frame>
  ),
};

/** Collapsed / expanded / without size props × state. */
export const States: Story = {
  name: 'States',
  parameters: noControls,
  render: () => (
    <MatrixGrid
      columns={['Collapsed', 'Expanded', 'Without size props, expanded']}
      rows={stateCases('ods-list-expandable--show-hover').map(
        ([label, props]) => ({
          label,
          cells: [
            <TransactionListExpandable
              key="closed"
              {...familyArgs}
              {...props}
            />,
            <TransactionListExpandable
              key="open"
              {...familyArgs}
              {...props}
              expanded
            >
              {childItems(TransactionListChildReadOnly)}
            </TransactionListExpandable>,
            <TransactionListExpandable
              key="unsized"
              {...withoutSizes}
              {...props}
              expanded
            >
              {childItems(TransactionListChildReadOnly)}
            </TransactionListExpandable>,
          ],
        })
      )}
    />
  ),
};

/** Loading row (kept for the external documentation embed). */
export const StateLoading: Story = {
  name: 'Loading',
  parameters: { ...noSnapshot, ...noControls },
  render: () => (
    <Frame>
      <TransactionListExpandable {...familyArgs} loading />
    </Frame>
  ),
};

/** Amount types × size and density. */
export const AmountTypes: Story = {
  name: 'Sizes × amount types',
  parameters: noControls,
  render: () => (
    <SizesMatrix
      compactSm
      render={(props) => (
        <TransactionListExpandable {...familyArgs} {...props} />
      )}
    />
  ),
};

/** Opens and closes with the family child items. */
export const WithFamilyChildren: Story = {
  name: 'With child items',
  parameters: { ...noSnapshot, ...noControls },
  render: () => (
    <Frame>
      <ExpandableExample initial={false} />
    </Frame>
  ),
};
