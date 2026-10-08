import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import TransactionListSelectable from '../TransactionListSelectable';
import type { TransactionListSelectableProps } from '../TransactionListSelectable';
import { Frame, MatrixGrid } from '../../../../../.storybook/docs-blocks';
import { TransactionListDocs } from '../../../../../.storybook/docs-blocks/transaction-list/TransactionListDocs';
import { selectableArgTypes } from '../../../../../.storybook/docs-blocks/transaction-list/argTypes';
import { selectableRows } from '../../../../../.storybook/docs-blocks/transaction-list/fixtures';
import { SizesMatrix } from '../../../../../.storybook/docs-blocks/transaction-list/examples';

const noSnapshot = { chromatic: { disableSnapshot: true } };
const noControls = { controls: { disable: true } };
const baseArgs = selectableRows[0] as TransactionListSelectableProps;

type Controller = 'checkbox' | 'radio';
type Platform = 'web' | 'app';

/** State → props (indeterminate only applies to the checkbox). */
const stateProps: [
  string,
  (c: Controller) => Partial<TransactionListSelectableProps> | null
][] = [
  ['Default', (c) => ({ [c]: { readOnly: true } })],
  [
    'Hover',
    (c) => ({
      [c]: { readOnly: true },
      className: 'ods-transaction-list--show-hover',
    }),
  ],
  [
    'Indeterminate',
    (c) =>
      c === 'checkbox'
        ? { checkbox: { indeterminate: true, checked: true, readOnly: true } }
        : null,
  ],
  ['Selected', (c) => ({ [c]: { checked: true, readOnly: true } })],
  ['Disabled', (c) => ({ [c]: { readOnly: true }, disabled: true })],
  [
    'Disabled selected',
    (c) => ({ [c]: { checked: true, readOnly: true }, disabled: true }),
  ],
  ['Error', (c) => ({ [c]: { error: true, readOnly: true } })],
  ['Loading', (c) => ({ [c]: {}, loading: true })],
];

const meta: Meta<typeof TransactionListSelectable> = {
  title: 'Components/List/Transaction List Selectable',
  component: TransactionListSelectable,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { page: () => <TransactionListDocs variant="selectable" /> },
  },
  argTypes: selectableArgTypes,
  args: baseArgs,
};

export default meta;

type Story = StoryObj<typeof TransactionListSelectable>;

const CheckboxPlayground = (props: Partial<TransactionListSelectableProps>) => {
  const { checkbox } = props;
  const [checked, setChecked] = useState(false);
  return (
    <Frame>
      <TransactionListSelectable
        {...baseArgs}
        {...props}
        checkbox={{
          id: 'playground-checkbox',
          ...checkbox,
          checked,
          onChange: () => setChecked(!checked),
        }}
      />
    </Frame>
  );
};

/** Every prop in the controls; checking and unchecking works. */
export const Default: Story = {
  name: 'Playground',
  parameters: noSnapshot,
  render: (args) =>
    args.radio ? (
      <Frame>
        <TransactionListSelectable {...args} />
      </Frame>
    ) : (
      <CheckboxPlayground {...args} />
    ),
};

const platforms: Platform[] = ['web', 'app'];

const statesMatrix = (controller: Controller) => (
  <MatrixGrid
    columns={platforms.map((platform) => `${controller} · ${platform}`)}
    rows={stateProps
      .filter(([, fn]) => fn(controller))
      .map(([label, fn]) => ({
        label,
        cells: platforms.map((platform) => (
          <TransactionListSelectable
            key={platform}
            {...baseArgs}
            platform={platform}
            {...(fn(controller) as Partial<TransactionListSelectableProps>)}
          />
        )),
      }))}
  />
);

/** States × platform, with a checkbox. */
export const StatesCheckbox: Story = {
  name: 'States · checkbox',
  parameters: noControls,
  render: () => statesMatrix('checkbox'),
};

/** States × platform, with a radio. */
export const StatesRadio: Story = {
  name: 'States · radio',
  parameters: noControls,
  render: () => statesMatrix('radio'),
};

/** Amount types × size and density. */
export const Sizes: Story = {
  name: 'Sizes × amount types',
  parameters: noControls,
  render: () => (
    <SizesMatrix
      compactSm
      render={(props) => <TransactionListSelectable {...baseArgs} {...props} />}
    />
  ),
};
