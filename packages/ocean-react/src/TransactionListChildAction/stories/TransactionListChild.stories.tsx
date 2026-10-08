import type { Meta, StoryObj } from '@storybook/react';
import { colorStatusWarningUp } from '@useblu/ocean-tokens/web/tokens';
import React from 'react';
import { Placeholder } from '@useblu/ocean-icons-react';
import TransactionListChildAction from '../TransactionListChildAction';
import TransactionListChildReadOnly from '../../TransactionListChildReadOnly';
import type { TransactionListChildPosition } from '../../_shared/components/TransactionListParts';

const frame = { width: '360px' };
const icon = <Placeholder size={16} />;
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

const meta: Meta<typeof TransactionListChildAction> = {
  title: 'Components/List/Transaction List Child',
  component: TransactionListChildAction,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Itens filhos da Transaction List Expandable, ligados pela linha do tempo (sozinho, primeiro, meio, último). `TransactionListChildAction` tem seta; `TransactionListChildReadOnly` não. Figma: _Child Transaction List Action (24323:3663) e _Child Transaction List Read Only (26758:376).',
      },
    },
  },
  argTypes: {
    position: {
      control: 'inline-radio',
      options: ['standalone', 'first', 'middle', 'last'],
    },
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

type Story = StoryObj<typeof TransactionListChildAction>;

const positionStory = (position: TransactionListChildPosition): Story => ({
  name: `Position: ${position}`,
  parameters: noControls,
  render: () => (
    <div>
      <TransactionListChildAction {...baseArgs} position={position} />
      <TransactionListChildReadOnly {...baseArgs} position={position} />
    </div>
  ),
});

export const Default: Story = {};

export const PositionStandalone = positionStory('standalone');
export const PositionFirst = positionStory('first');
export const PositionMiddle = positionStory('middle');
export const PositionLast = positionStory('last');

export const Timeline: Story = {
  parameters: noControls,
  render: () => (
    <div>
      <TransactionListChildAction {...baseArgs} position="first" />
      <TransactionListChildAction {...baseArgs} position="middle" />
      <TransactionListChildAction {...baseArgs} position="last" />
      <TransactionListChildReadOnly {...baseArgs} position="first" />
      <TransactionListChildReadOnly {...baseArgs} position="middle" />
      <TransactionListChildReadOnly {...baseArgs} position="last" />
    </div>
  ),
};

export const Hover: Story = {
  parameters: noControls,
  args: { className: 'ods-transaction-list--show-hover', position: 'middle' },
};

export const Disabled: Story = {
  parameters: noControls,
  render: () => (
    <div>
      <TransactionListChildAction {...baseArgs} position="first" disabled />
      <TransactionListChildReadOnly {...baseArgs} position="last" disabled />
    </div>
  ),
};

export const Loading: Story = {
  parameters: noControls,
  render: () => (
    <div>
      <TransactionListChildAction {...baseArgs} position="first" loading />
      <TransactionListChildReadOnly {...baseArgs} position="last" loading />
    </div>
  ),
};

export const IconColors: Story = {
  name: 'Icon colors',
  parameters: noControls,
  render: () => (
    <div>
      <p className="ods-typography ods-typography__caption">
        sem iconColor (padrão do filho: Interface/Light/Down)
      </p>
      <TransactionListChildAction {...baseArgs} position="first" />
      <p className="ods-typography ods-typography__caption">default</p>
      <TransactionListChildAction
        {...baseArgs}
        position="middle"
        iconColor="default"
      />
      <p className="ods-typography ods-typography__caption">on-color</p>
      <div style={{ backgroundColor: colorStatusWarningUp }}>
        <TransactionListChildAction
          {...baseArgs}
          position="middle"
          iconColor="on-color"
        />
      </div>
      <p className="ods-typography ods-typography__caption">highlight</p>
      <TransactionListChildAction
        {...baseArgs}
        position="middle"
        iconColor="highlight"
      />
      <p className="ods-typography ods-typography__caption">
        disabled (sempre Interface/Light/Deep)
      </p>
      <TransactionListChildReadOnly
        {...baseArgs}
        position="last"
        iconColor="highlight"
        disabled
      />
    </div>
  ),
};
