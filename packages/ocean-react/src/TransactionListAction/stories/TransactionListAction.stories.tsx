import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { PlaceholderOutline } from '@useblu/ocean-icons-react';
import TransactionListAction from '../TransactionListAction';
import type { TransactionListActionProps } from '../TransactionListAction';

const frame = { width: '360px' };
const icon = <PlaceholderOutline size={24} />;
const noControls = { controls: { disable: true } };

const baseArgs = {
  title: 'Title',
  description: 'Description',
  caption: 'Caption',
  amount: 'R$ 0,00',
  amountTag: { label: 'Label' },
  additionalData: 'Additional data',
  icon,
};

const meta: Meta<typeof TransactionListAction> = {
  title: 'Components/List/Transaction List Action',
  component: TransactionListAction,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Linha de transação que leva ao detalhe: seta à direita e realce ao passar o mouse. Figma: Transaction List Action (24289:64384).',
      },
    },
  },
  argTypes: {
    contentSize: { control: 'inline-radio', options: ['md', 'sm'] },
    amountSize: { control: 'inline-radio', options: ['md', 'sm'] },
    icon: { control: false },
    onClick: { action: 'clicked' },
  },
  args: baseArgs,
  decorators: [
    (Story: React.ComponentType): React.ReactElement => (
      <div style={frame}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof TransactionListAction>;

const ClickCounter = (props: Partial<TransactionListActionProps>) => {
  const [clicks, setClicks] = useState(0);

  return (
    <div>
      <TransactionListAction
        {...baseArgs}
        {...props}
        onClick={() => setClicks((count) => count + 1)}
      />
      <p className="ods-typography ods-typography__caption">Toques: {clicks}</p>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <ClickCounter {...args} />,
};

export const Hover: Story = {
  parameters: noControls,
  args: { className: 'ods-transaction-list--show-hover' },
};

export const Loading: Story = {
  parameters: noControls,
  args: { loading: true },
};

export const Disabled: Story = {
  parameters: noControls,
  render: () => <ClickCounter disabled />,
};

export const Sizes: Story = {
  parameters: noControls,
  render: () => (
    <div>
      <TransactionListAction {...baseArgs} contentSize="md" amountSize="md" />
      <TransactionListAction {...baseArgs} contentSize="sm" amountSize="md" />
      <TransactionListAction {...baseArgs} contentSize="md" amountSize="sm" />
      <TransactionListAction {...baseArgs} contentSize="sm" amountSize="sm" />
    </div>
  ),
};

export const AmountTypes: Story = {
  name: 'Amount types',
  parameters: noControls,
  render: () => (
    <div>
      <TransactionListAction {...baseArgs} amountType="positive" />
      <TransactionListAction {...baseArgs} amountType="negative" />
      <TransactionListAction
        {...baseArgs}
        amount="Grátis"
        strikethroughAmount="3,99%"
        amountType="strikethrough"
      />
      <TransactionListAction
        {...baseArgs}
        amount="R$ 2,00"
        strikethroughAmount="R$ 3,99"
        amountType="strikethrough-neutral"
      />
    </div>
  ),
};
