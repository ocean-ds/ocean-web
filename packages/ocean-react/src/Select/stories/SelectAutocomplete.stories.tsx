import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import SelectAutocomplete from '../SelectAutocomplete';

const meta: Meta<typeof SelectAutocomplete> = {
  title: 'Components/Inputs/SelectAutocomplete',
  component: SelectAutocomplete,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Rótulo do campo de seleção com autocomplete.',
      control: 'text',
    },
    placeholder: {
      description: 'Texto de placeholder exibido no campo de entrada.',
      control: 'text',
    },
    helperText: {
      description: 'Texto de ajuda exibido abaixo do campo.',
      control: 'text',
    },
    error: {
      description: 'Quando true, exibe o estilo de erro.',
      control: 'boolean',
    },
    disabled: {
      description: 'Desabilita o campo e impede a digitação e seleção.',
      control: 'boolean',
    },
    tooltipMessage: {
      description: 'Mensagem de ajuda exibida em tooltip no label.',
      control: 'text',
    },
    id: {
      table: { disable: true },
    },
    name: {
      table: { disable: true },
    },
    value: {
      table: { disable: true },
    },
    defaultValue: {
      table: { disable: true },
    },
    ariaLabel: {
      table: { disable: true },
    },
    onChange: {
      table: { disable: true },
    },
    className: {
      table: { disable: true },
    },
    options: {
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SelectAutocomplete>;

const defaultOptions = [
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

export const Usage: Story = {
  args: {
    label: 'País',
    placeholder: 'Digite para buscar...',
    helperText: 'Digite o nome do país para filtrar as opções',
    error: false,
    disabled: false,
    options: defaultOptions,
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
};

export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <SelectAutocomplete
        label="Normal"
        placeholder="Digite para buscar..."
        options={defaultOptions.slice(0, 5)}
        onChange={() => {
          // Handler vazio para demo
        }}
      />
      <SelectAutocomplete
        label="Com valor selecionado"
        defaultValue="br"
        options={defaultOptions.slice(0, 5)}
        onChange={() => {
          // Handler vazio para demo
        }}
      />
      <SelectAutocomplete
        label="Desabilitado"
        placeholder="Campo desabilitado"
        options={defaultOptions.slice(0, 5)}
        disabled
        onChange={() => {
          // Handler vazio para demo
        }}
      />
      <SelectAutocomplete
        label="Com erro"
        placeholder="Campo com erro"
        options={defaultOptions.slice(0, 5)}
        error
        helperText="Este campo é obrigatório"
        onChange={() => {
          // Handler vazio para demo
        }}
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
        onChange={() => {
          // Handler vazio para demo
        }}
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
        onChange={() => {
          // Handler vazio para demo
        }}
      />
    </div>
  ),
};
