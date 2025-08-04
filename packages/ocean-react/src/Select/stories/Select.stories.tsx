import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Select from '../Select';
import {
  sharedArgTypes,
  defaultOptions,
  defaultDecorator,
  emptyHandler,
} from './shared';

const meta: Meta<typeof Select> = {
  title: 'Components/Inputs/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: sharedArgTypes,
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Usage: Story = {
  args: {
    label: 'País',
    placeholder: 'Selecione um país...',
    helperText: 'Escolha o país desejado',
    error: false,
    disabled: false,
    options: defaultOptions,
  },
  decorators: [defaultDecorator],
};

export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div>
      <Select
        label="Normal"
        placeholder="Selecione uma opção..."
        options={defaultOptions.slice(0, 4)}
        onChange={emptyHandler}
      />
      <Select
        label="Com valor selecionado"
        defaultValue="br"
        options={defaultOptions.slice(0, 4)}
        onChange={emptyHandler}
      />
      <Select
        label="Desabilitado"
        placeholder="Campo desabilitado"
        options={defaultOptions.slice(0, 4)}
        disabled
        onChange={emptyHandler}
      />
      <Select
        label="Com erro"
        placeholder="Campo com erro"
        options={defaultOptions.slice(0, 4)}
        error
        helperText="Este campo é obrigatório"
        onChange={emptyHandler}
      />
    </div>
  ),
};

export const WithDisabledOptions: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '400px',
      }}
    >
      <Select
        label="Opções com desabilitadas"
        placeholder="Selecione um país..."
        options={[
          { value: 'br', label: 'Brasil' },
          { value: 'us', label: 'Estados Unidos', disabled: true },
          { value: 'ca', label: 'Canadá' },
          { value: 'mx', label: 'México', disabled: true },
          { value: 'ar', label: 'Argentina' },
        ]}
        onChange={emptyHandler}
      />
    </div>
  ),
};

export const ManyOptions: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '400px',
      }}
    >
      <Select
        label="Muitas opções"
        placeholder="Selecione uma opção..."
        options={Array.from(Array(20), (_, index) => ({
          value: `opt-${index + 1}`,
          label: `Opção ${index + 1}`,
        }))}
        onChange={emptyHandler}
      />
    </div>
  ),
};
