import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import TransactionListExpandable from '../TransactionListExpandable';
import type { TransactionListExpandableProps } from '../TransactionListExpandable';
import TransactionListChildReadOnly from '../../TransactionListChildReadOnly';
import { expandableArgTypes } from '../../../../../.storybook/docs-blocks/transaction-list/argTypes';
import {
  CHILD_POSITIONS,
  childRows,
  expandableParent,
} from '../../../../../.storybook/docs-blocks/transaction-list/fixtures';
import { inList } from '../../../../../.storybook/docs-blocks/transaction-list/story-helpers';

/** Toggling updates the `expanded` arg, so the Controls panel follows the canvas. */
const RenderExpandable = (
  args: TransactionListExpandableProps
): React.ReactElement => {
  const [, updateArgs] = useArgs();
  return (
    <TransactionListExpandable
      {...args}
      onToggle={(expanded) => updateArgs({ expanded })}
    />
  );
};

const childItems = childRows.map((row, index) => (
  <TransactionListChildReadOnly
    key={row.content.title}
    {...row}
    position={CHILD_POSITIONS[index]}
  />
));

const meta: Meta<typeof TransactionListExpandable> = {
  title: 'Components/Lists/Transaction List/Transaction List Expandable',
  component: TransactionListExpandable,
  decorators: [inList],
  parameters: { layout: 'centered' },
  argTypes: expandableArgTypes,
  args: {
    ...expandableParent,
    supportingText: 'Fees already deducted',
    children: childItems,
  },
  render: RenderExpandable,
};

export default meta;

type Story = StoryObj<typeof TransactionListExpandable>;

/** The total with a chevron; a click opens the items. */
export const Collapsed: Story = { args: { expanded: false } };

/** The items that compose the total, on a timeline, with the supporting text. */
export const Expanded: Story = { args: { expanded: true } };
