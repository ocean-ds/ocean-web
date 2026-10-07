import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { PlaceholderOutline } from '@useblu/ocean-icons-react';
import TransactionListAction from '../TransactionListAction';
import type { TransactionListActionProps } from '../TransactionListAction';

const frame = { width: '360px' };
const icon = <PlaceholderOutline size={24} />;
const noControls = { controls: { disable: true } };

const menuActions = [
  { label: 'Option Text', onClick: () => undefined },
  {
    label: 'Option Text',
    onClick: () => undefined,
    variant: 'negative' as const,
  },
];

const swipeActions = [
  {
    label: 'Label',
    onClick: () => undefined,
    icon,
    variant: 'neutral' as const,
  },
  {
    label: 'Label',
    onClick: () => undefined,
    icon,
    variant: 'negative' as const,
  },
];

const baseArgs = {
  title: 'Title',
  description: 'Description',
  caption: 'Caption',
  amount: 'R$ 0,00',
  amountTag: { label: 'Label' },
  additionalData: 'Additional data',
  icon,
};

const typeArgs = {
  chevron: { actionType: 'chevron' as const },
  menu: { actionType: 'menu' as const, menuActions },
  swipe: { actionType: 'swipe' as const, menuActions: swipeActions },
};

const meta: Meta<typeof TransactionListAction> = {
  title: 'Components/List/Transaction List Action',
  component: TransactionListAction,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Linha de transação com ação à direita: seta (leva ao detalhe), menu contextual ou swipe. Realce ao passar o mouse em Interface/Light/Up (multiply). Figma: Transaction List Action (24289:64384).',
      },
    },
  },
  argTypes: {
    actionType: {
      control: 'inline-radio',
      options: ['chevron', 'menu', 'swipe'],
    },
    contentSize: { control: 'inline-radio', options: ['md', 'sm'] },
    amountSize: { control: 'inline-radio', options: ['md', 'sm'] },
    icon: { control: false },
    menuActions: { control: false },
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

const States = (props: Partial<TransactionListActionProps>) => (
  <div>
    <p className="ods-typography ods-typography__caption">Default</p>
    <TransactionListAction {...baseArgs} {...props} />
    <p className="ods-typography ods-typography__caption">Hover</p>
    <TransactionListAction
      {...baseArgs}
      {...props}
      className="ods-transaction-list--show-hover"
    />
    <p className="ods-typography ods-typography__caption">Disabled</p>
    <TransactionListAction {...baseArgs} {...props} disabled />
    <p className="ods-typography ods-typography__caption">Loading</p>
    <TransactionListAction {...baseArgs} {...props} loading />
  </div>
);

const openActions = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}): Promise<void> => {
  canvasElement
    .querySelector<HTMLButtonElement>('.ods-internal-list-actions__trigger')
    ?.click();
};

export const Default: Story = {
  render: (args) => <ClickCounter {...args} />,
};

export const TypeChevron: Story = {
  name: 'Type: Chevron',
  parameters: noControls,
  render: () => <States {...typeArgs.chevron} />,
};

export const TypeMenu: Story = {
  name: 'Type: Menu',
  parameters: noControls,
  render: () => <States {...typeArgs.menu} />,
};

export const TypeSwipe: Story = {
  name: 'Type: Swipe',
  parameters: noControls,
  render: () => <States {...typeArgs.swipe} />,
};

export const Hover: Story = {
  parameters: noControls,
  render: () => (
    <div>
      {Object.entries(typeArgs).map(([type, args]) => (
        <TransactionListAction
          key={type}
          {...baseArgs}
          {...args}
          className="ods-transaction-list--show-hover"
        />
      ))}
    </div>
  ),
};

export const MenuActive: Story = {
  name: 'Menu: Active',
  parameters: noControls,
  render: () => (
    <div style={{ paddingBottom: '120px' }}>
      <TransactionListAction {...baseArgs} {...typeArgs.menu} />
    </div>
  ),
  play: openActions,
};

export const SwipeActive: Story = {
  name: 'Swipe: Active',
  parameters: noControls,
  render: () => <TransactionListAction {...baseArgs} {...typeArgs.swipe} />,
  play: openActions,
};

export const Loading: Story = {
  parameters: noControls,
  args: { loading: true },
};

export const Disabled: Story = {
  parameters: noControls,
  render: () => (
    <div>
      <ClickCounter disabled />
      <TransactionListAction {...baseArgs} {...typeArgs.menu} disabled />
      <TransactionListAction {...baseArgs} {...typeArgs.swipe} disabled />
    </div>
  ),
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
