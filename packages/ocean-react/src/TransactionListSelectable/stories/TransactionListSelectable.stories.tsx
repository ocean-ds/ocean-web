import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import TransactionListSelectable from '../TransactionListSelectable';
import type { TransactionListSelectableProps } from '../TransactionListSelectable';

const frame = { width: '360px' };
const noControls = { controls: { disable: true } };

const baseArgs = {
  title: 'Title',
  description: 'Description',
  caption: 'Caption',
  amount: 'R$ 0,00',
  amountTag: { label: 'Label' },
  additionalData: 'Additional data',
};

const meta: Meta<typeof TransactionListSelectable> = {
  title: 'Components/List/Transaction List Selectable',
  component: TransactionListSelectable,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Linha de transação selecionável pelo valor, com caixa de marcar ou opção única, versões portal (web) e app. Figma: Transaction List Selectable (24320:5708).',
      },
    },
  },
  argTypes: {
    platform: { control: 'inline-radio', options: ['web', 'app'] },
    contentSize: { control: 'inline-radio', options: ['md', 'sm'] },
    amountSize: { control: 'inline-radio', options: ['md', 'sm'] },
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

type Story = StoryObj<typeof TransactionListSelectable>;

const CheckboxGroup = (props: Partial<TransactionListSelectableProps>) => {
  const { platform } = props;
  const [checked, setChecked] = useState<Record<string, boolean>>({
    b: true,
  });

  return (
    <div>
      {['a', 'b'].map((id) => (
        <TransactionListSelectable
          key={id}
          {...baseArgs}
          {...props}
          checkbox={{
            id: `${platform}-checkbox-${id}`,
            checked: Boolean(checked[id]),
            onChange: () =>
              setChecked((current) => ({ ...current, [id]: !current[id] })),
          }}
        />
      ))}
      <TransactionListSelectable
        {...baseArgs}
        {...props}
        checkbox={{ indeterminate: true, readOnly: true }}
      />
      <TransactionListSelectable
        {...baseArgs}
        {...props}
        checkbox={{ error: true }}
      />
    </div>
  );
};

const RadioGroup = (props: Partial<TransactionListSelectableProps>) => {
  const { platform } = props;
  const [selected, setSelected] = useState('b');

  return (
    <div>
      {['a', 'b'].map((id) => (
        <TransactionListSelectable
          key={id}
          {...baseArgs}
          {...props}
          radio={{
            id: `${platform}-radio-${id}`,
            name: `${platform}-radio`,
            value: id,
            checked: selected === id,
            onChange: () => setSelected(id),
          }}
        />
      ))}
      <TransactionListSelectable
        {...baseArgs}
        {...props}
        radio={{ error: true, name: `${platform}-radio-error` }}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <CheckboxGroup {...args} />,
};

export const PlatformWeb: Story = {
  name: 'Platform: web',
  parameters: noControls,
  render: () => (
    <div>
      <CheckboxGroup platform="web" />
      <RadioGroup platform="web" />
    </div>
  ),
};

export const PlatformApp: Story = {
  name: 'Platform: app',
  parameters: noControls,
  render: () => (
    <div>
      <CheckboxGroup platform="app" />
      <RadioGroup platform="app" />
    </div>
  ),
};

export const Hover: Story = {
  parameters: noControls,
  render: () => (
    <div>
      <TransactionListSelectable
        {...baseArgs}
        className="ods-transaction-list--show-hover"
      />
      <TransactionListSelectable
        {...baseArgs}
        platform="app"
        radio={{ name: 'hover' }}
        className="ods-transaction-list--show-hover"
      />
    </div>
  ),
};

export const Disabled: Story = {
  parameters: noControls,
  render: () => (
    <div>
      <TransactionListSelectable {...baseArgs} disabled />
      <TransactionListSelectable
        {...baseArgs}
        checkbox={{ checked: true, readOnly: true }}
        disabled
      />
      <TransactionListSelectable
        {...baseArgs}
        platform="app"
        radio={{ checked: true, readOnly: true }}
        disabled
      />
    </div>
  ),
};

export const Loading: Story = {
  parameters: noControls,
  render: () => (
    <div>
      <TransactionListSelectable {...baseArgs} loading />
      <TransactionListSelectable {...baseArgs} platform="app" loading />
    </div>
  ),
};
