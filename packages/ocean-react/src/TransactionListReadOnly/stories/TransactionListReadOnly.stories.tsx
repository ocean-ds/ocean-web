import type { Meta, StoryObj } from '@storybook/react';
import { colorStatusWarningUp } from '@useblu/ocean-tokens/web/tokens';
import React from 'react';
import { PlaceholderOutline } from '@useblu/ocean-icons-react';
import TransactionListReadOnly from '../TransactionListReadOnly';

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

const meta: Meta<typeof TransactionListReadOnly> = {
  title: 'Components/List/Transaction List Read Only',
  component: TransactionListReadOnly,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Linha de transação só de leitura: conteúdo à esquerda, valor à direita, sem interação. Figma: Transaction List Read Only (26559:4449).',
      },
    },
  },
  argTypes: {
    status: {
      control: 'select',
      options: [
        'default',
        'inactive',
        'positive',
        'warning',
        'highlight',
        'highlight-lead',
        'strikethrough',
      ],
    },
    amountType: {
      control: 'select',
      options: [
        'default',
        'positive',
        'negative',
        'inactive',
        'strikethrough',
        'strikethrough-neutral',
      ],
    },
    contentSize: { control: 'inline-radio', options: ['md', 'sm'] },
    amountSize: { control: 'inline-radio', options: ['md', 'sm'] },
    icon: { control: false },
    iconColor: {
      control: 'inline-radio',
      options: ['default', 'on-color', 'highlight'],
    },
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

type Story = StoryObj<typeof TransactionListReadOnly>;

export const Default: Story = {};

export const Loading: Story = {
  parameters: noControls,
  args: { loading: true },
};

export const Disabled: Story = {
  parameters: noControls,
  args: { disabled: true },
};

export const Sizes: Story = {
  parameters: noControls,
  render: () => (
    <div>
      <TransactionListReadOnly {...baseArgs} contentSize="md" amountSize="md" />
      <TransactionListReadOnly {...baseArgs} contentSize="sm" amountSize="md" />
      <TransactionListReadOnly {...baseArgs} contentSize="md" amountSize="sm" />
      <TransactionListReadOnly {...baseArgs} contentSize="sm" amountSize="sm" />
    </div>
  ),
};

export const AmountTypes: Story = {
  name: 'Amount types',
  parameters: noControls,
  render: () => (
    <div>
      <TransactionListReadOnly {...baseArgs} description="Default" />
      <TransactionListReadOnly
        {...baseArgs}
        description="Positive"
        amountType="positive"
      />
      <TransactionListReadOnly
        {...baseArgs}
        description="Negative"
        amountType="negative"
      />
      <TransactionListReadOnly
        {...baseArgs}
        description="Inactive"
        amountType="inactive"
      />
      <TransactionListReadOnly
        {...baseArgs}
        title="Juros"
        description="Strikethrough"
        amount="Grátis"
        strikethroughAmount="3,99%"
        amountType="strikethrough"
      />
      <TransactionListReadOnly
        {...baseArgs}
        title="Taxa"
        description="Strikethrough Neutral"
        amount="R$ 2,00"
        strikethroughAmount="R$ 3,99"
        amountType="strikethrough-neutral"
      />
      <TransactionListReadOnly
        {...baseArgs}
        contentSize="sm"
        amountSize="sm"
        title="Juros"
        description="Strikethrough (sm)"
        amount="Grátis"
        strikethroughAmount="3,99%"
        amountType="strikethrough"
      />
    </div>
  ),
};

export const ContentTypes: Story = {
  name: 'Content types',
  parameters: noControls,
  render: () => (
    <div>
      {(
        [
          'default',
          'inactive',
          'positive',
          'warning',
          'highlight',
          'highlight-lead',
        ] as const
      ).map((status) =>
        (['md', 'sm'] as const).map((size) => (
          <TransactionListReadOnly
            key={`${status}-${size}`}
            {...baseArgs}
            description={`${status} · ${size}`}
            status={status}
            contentSize={size}
          />
        ))
      )}
      <TransactionListReadOnly
        {...baseArgs}
        description="Grátis"
        strikethroughDescription="3,99%"
        status="strikethrough"
      />
      <TransactionListReadOnly
        {...baseArgs}
        description="Grátis"
        strikethroughDescription="3,99%"
        status="strikethrough"
        contentSize="sm"
      />
    </div>
  ),
};

export const WithoutIcon: Story = {
  name: 'Without icon',
  parameters: noControls,
  args: { icon: undefined, showDivider: false },
};

export const IconColors: Story = {
  name: 'Icon colors',
  parameters: noControls,
  render: () => (
    <div>
      <TransactionListReadOnly
        {...baseArgs}
        description="default · fundo branco"
        iconColor="default"
      />
      <div style={{ backgroundColor: colorStatusWarningUp }}>
        <TransactionListReadOnly
          {...baseArgs}
          description="on-color · fundo colorido"
          iconColor="on-color"
        />
      </div>
      <TransactionListReadOnly
        {...baseArgs}
        description="highlight · mais ênfase"
        iconColor="highlight"
      />
      <TransactionListReadOnly
        {...baseArgs}
        description="disabled · sempre Light/Deep"
        iconColor="highlight"
        disabled
      />
    </div>
  ),
};

export const Density: Story = {
  name: 'Density',
  parameters: noControls,
  render: () => (
    <div style={{ display: 'flex', gap: '24px' }}>
      {(['default', 'compact'] as const).map((density) => (
        <div key={density} style={{ width: '360px' }}>
          <p className="ods-typography ods-typography__caption">{density}</p>
          <TransactionListReadOnly {...baseArgs} density={density} />
          <TransactionListReadOnly {...baseArgs} density={density} loading />
        </div>
      ))}
    </div>
  ),
};
