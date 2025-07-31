import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import SelectAutocomplete from '../SelectAutocomplete';
import { sharedArgTypes, defaultDecorator, emptyHandler } from './shared';

// Opções específicas do SelectAutocomplete (com mais opções para demonstrar o filtro)
const autocompleteOptions = [
  { value: 'br', label: 'Brasil' },
  { value: 'us', label: 'Estados Unidos' },
  { value: 'ca', label: 'Canadá' },
  { value: 'mx', label: 'México' },
  { value: 'ar', label: 'Argentina' },
  { value: 'cl', label: 'Chile' },
  { value: 'pe', label: 'Peru' },
  { value: 'co', label: 'Colômbia' },
  { value: 'uy', label: 'Uruguai' },
  { value: 'py', label: 'Paraguai' },
];

const meta: Meta<typeof SelectAutocomplete> = {
  title: 'Components/Inputs/SelectAutocomplete',
  component: SelectAutocomplete,
  tags: ['autodocs'],
  argTypes: {
    ...sharedArgTypes,
    label: {
      description: 'Rótulo do campo de seleção com autocomplete.',
      control: 'text',
    },
    placeholder: {
      description: 'Texto de placeholder exibido no campo de entrada.',
      control: 'text',
    },
    disabled: {
      description: 'Desabilita o campo e impede a digitação e seleção.',
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SelectAutocomplete>;

export const Usage: Story = {
  args: {
    label: 'País',
    placeholder: 'Digite para buscar...',
    helperText: 'Digite o nome do país para filtrar as opções',
    error: false,
    disabled: false,
    options: autocompleteOptions,
  },
  decorators: [defaultDecorator],
};

export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div>
      <SelectAutocomplete
        label="Normal"
        placeholder="Digite para buscar..."
        options={autocompleteOptions.slice(0, 5)}
        onChange={emptyHandler}
      />
      <SelectAutocomplete
        label="Com valor selecionado"
        defaultValue="br"
        options={autocompleteOptions.slice(0, 5)}
        onChange={emptyHandler}
      />
      <SelectAutocomplete
        label="Desabilitado"
        placeholder="Campo desabilitado"
        options={autocompleteOptions.slice(0, 5)}
        disabled
        onChange={emptyHandler}
      />
      <SelectAutocomplete
        label="Com erro"
        placeholder="Campo com erro"
        options={autocompleteOptions.slice(0, 5)}
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
      <SelectAutocomplete
        label="Opções com desabilitadas"
        placeholder="Digite para buscar..."
        options={[
          { value: 'br', label: 'Brasil' },
          { value: 'us', label: 'Estados Unidos', disabled: true },
          { value: 'ca', label: 'Canadá' },
          { value: 'mx', label: 'México', disabled: true },
          { value: 'ar', label: 'Argentina' },
          { value: 'cl', label: 'Chile' },
        ]}
        onChange={emptyHandler}
      />
    </div>
  ),
};

export const LargeDataset: Story = {
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
      <SelectAutocomplete
        label="Conjunto grande de dados"
        placeholder="Digite para buscar..."
        helperText="Teste o filtro digitando algumas letras"
        options={Array.from(Array(50), (_, index) => ({
          value: `item-${index + 1}`,
          label: `Item ${index + 1} - Opção ${String.fromCharCode(
            65 + (index % 26)
          )}`,
        }))}
        onChange={emptyHandler}
      />
    </div>
  ),
};
