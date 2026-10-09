import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import TransactionListSelectable from '../TransactionListSelectable';
import type { TransactionListSelectableProps } from '../TransactionListSelectable';
import { selectableArgTypes } from '../../../../../.storybook/docs-blocks/transaction-list/argTypes';
import { selectableRows } from '../../../../../.storybook/docs-blocks/transaction-list/fixtures';
import { inList } from '../../../../../.storybook/docs-blocks/transaction-list/story-helpers';

/** Checking the control updates the args, so the Controls panel follows the canvas. */
const RenderSelectable = (
  args: TransactionListSelectableProps
): React.ReactElement => {
  const [, updateArgs] = useArgs();
  const { radio, checkbox } = args;
  const key = radio ? 'radio' : 'checkbox';
  const control = radio ?? checkbox ?? {};
  return (
    <TransactionListSelectable
      {...args}
      {...{
        [key]: {
          ...control,
          onChange: () =>
            updateArgs({ [key]: { ...control, checked: !control.checked } }),
        },
      }}
    />
  );
};

const meta: Meta<typeof TransactionListSelectable> = {
  title: 'Components/Lists/Transaction List/Transaction List Selectable',
  component: TransactionListSelectable,
  decorators: [inList],
  parameters: { layout: 'centered' },
  argTypes: selectableArgTypes,
  args: { ...selectableRows[0], showDivider: false },
  render: RenderSelectable,
};

export default meta;

type Story = StoryObj<typeof TransactionListSelectable>;

/** Checkbox control (default): several items can be chosen. */
export const Checkbox: Story = {
  args: { checkbox: { id: 'receivable-credit', checked: true } },
};

/** Radio control: one item of the group. */
export const Radio: Story = {
  args: {
    radio: { id: 'receivable-credit-radio', name: 'receivable', checked: true },
  },
};
