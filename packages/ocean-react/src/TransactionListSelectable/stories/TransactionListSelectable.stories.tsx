import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import TransactionListSelectable from '../TransactionListSelectable';
import type { TransactionListSelectableProps } from '../TransactionListSelectable';

const noControls = { controls: { disable: true } };

const baseArgs = {
  title: 'Title',
  description: 'Description',
  caption: 'Caption',
  amount: 'R$ 0,00',
  amountTag: { label: 'Label' },
  additionalData: 'Additional data',
};

type Controller = 'checkbox' | 'radio';
type Platform = 'web' | 'app';

/**
 * Figma `State` → props. Indeterminate exists only for the checkbox.
 */
const stateProps: Record<
  string,
  (controller: Controller) => Partial<TransactionListSelectableProps> | null
> = {
  Default: (controller) => ({ [controller]: { readOnly: true } }),
  Hover: (controller) => ({
    [controller]: { readOnly: true },
    className: 'ods-transaction-list--show-hover',
  }),
  Indeterminate: (controller) =>
    controller === 'checkbox'
      ? { checkbox: { indeterminate: true, checked: true, readOnly: true } }
      : null,
  Selected: (controller) => ({
    [controller]: { checked: true, readOnly: true },
  }),
  Disabled: (controller) => ({
    [controller]: { readOnly: true },
    disabled: true,
  }),
  'Disabled Selected': (controller) => ({
    [controller]: { checked: true, readOnly: true },
    disabled: true,
  }),
  Error: (controller) => ({ [controller]: { error: true, readOnly: true } }),
  Loading: (controller) => ({ [controller]: {}, loading: true }),
};

const combos: Array<[Controller, Platform]> = [
  ['checkbox', 'app'],
  ['radio', 'app'],
  ['checkbox', 'web'],
  ['radio', 'web'],
];

const StateRow = ({ state }: { state: string }) => (
  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
    {combos.map(([controller, platform]) => {
      const props = stateProps[state](controller);

      return (
        <div key={`${controller}-${platform}`} style={{ width: '360px' }}>
          <p className="ods-typography ods-typography__caption">
            {`${state} · ${controller} · ${platform}`}
          </p>
          {props ? (
            <TransactionListSelectable
              {...baseArgs}
              platform={platform}
              {...props}
            />
          ) : (
            <p className="ods-typography ods-typography__caption">
              Não se aplica
            </p>
          )}
        </div>
      );
    })}
  </div>
);

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
};

export default meta;

type Story = StoryObj<typeof TransactionListSelectable>;

const CheckboxGroup = (props: Partial<TransactionListSelectableProps>) => {
  const { platform } = props;
  const [checked, setChecked] = useState<Record<string, boolean>>({ b: true });

  return (
    <div style={{ width: '360px' }}>
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
    </div>
  );
};

const RadioGroup = (props: Partial<TransactionListSelectableProps>) => {
  const { platform } = props;
  const [selected, setSelected] = useState('b');

  return (
    <div style={{ width: '360px' }}>
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

const stateStory = (state: string): Story => ({
  name: `State: ${state}`,
  parameters: noControls,
  render: () => <StateRow state={state} />,
});

export const StateDefault = stateStory('Default');
export const StateHover = stateStory('Hover');
export const StateIndeterminate = stateStory('Indeterminate');
export const StateSelected = stateStory('Selected');
export const StateDisabled = stateStory('Disabled');
export const StateDisabledSelected = stateStory('Disabled Selected');
export const StateError = stateStory('Error');
export const StateLoading = stateStory('Loading');
