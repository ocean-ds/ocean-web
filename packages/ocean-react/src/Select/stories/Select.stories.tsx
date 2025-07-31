import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Select from '../Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Inputs/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Rótulo do campo de seleção.',
      control: 'text',
    },
    placeholder: {
      description:
        'Texto de placeholder exibido quando nenhuma opção está selecionada.',
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
      description: 'Desabilita o campo e impede a seleção.',
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

type Story = StoryObj<typeof Select>;

const defaultOptions = [
  { value: 'br', label: 'Brasil' },
  { value: 'us', label: 'Estados Unidos' },
  { value: 'ca', label: 'Canadá' },
  { value: 'mx', label: 'México' },
  { value: 'ar', label: 'Argentina' },
  { value: 'cl', label: 'Chile' },
  { value: 'pe', label: 'Peru' },
  { value: 'co', label: 'Colômbia' },
];

const defaultDecorator = [
  (StoryComponent: React.ComponentType): JSX.Element => (
    <div
      style={{
        minWidth: '300px',
        maxWidth: '400px',
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
];

export const Usage: Story = {
  args: {
    label: 'País',
    placeholder: 'Selecione um país...',
    helperText: 'Escolha o país desejado',
    error: false,
    disabled: false,
    options: defaultOptions,
  },
  decorators: defaultDecorator,
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
        onChange={() => {
          // Handler vazio para demo
        }}
      />
      <Select
        label="Com valor selecionado"
        defaultValue="br"
        options={defaultOptions.slice(0, 4)}
        onChange={() => {
          // Handler vazio para demo
        }}
      />
      <Select
        label="Desabilitado"
        placeholder="Campo desabilitado"
        options={defaultOptions.slice(0, 4)}
        disabled
        onChange={() => {
          // Handler vazio para demo
        }}
      />
      <Select
        label="Com erro"
        placeholder="Campo com erro"
        options={defaultOptions.slice(0, 4)}
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
        onChange={() => {
          // Handler vazio para demo
        }}
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
        onChange={() => {
          // Handler vazio para demo
        }}
      />
    </div>
  ),
};
