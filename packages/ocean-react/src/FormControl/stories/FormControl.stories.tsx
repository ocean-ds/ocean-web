import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import FormControl from '../FormControl';

const meta: Meta<typeof FormControl> = {
  title: 'Components/Forms/FormControl',
  component: FormControl,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Elemento filho único (input, select, etc.).',
      control: false,
    },
    label: {
      description: 'Texto ou elemento do label.',
      control: 'text',
    },
    tooltipMessage: {
      description: 'Mensagem do tooltip de ajuda.',
      control: 'text',
    },
    htmlFor: {
      description: 'ID do elemento associado ao label.',
      control: 'text',
    },
    error: {
      description: 'Exibe estado de erro.',
      control: 'boolean',
    },
    helperText: {
      description: 'Texto de ajuda ou erro.',
      control: 'text',
    },
    disabled: {
      description: 'Desabilita o componente.',
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof FormControl>;

export const Usage: Story = {
  args: {
    label: 'Nome completo',
    helperText: 'Digite seu nome completo',
    htmlFor: 'name-input',
  },
  render: (args) => (
    <FormControl {...args}>
      <div className="ods-input">
        <input id="name-input" type="text" placeholder="Digite seu nome" />
      </div>
    </FormControl>
  ),
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          minWidth: '300px',
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '16px',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
};

export const WithTooltip: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <FormControl
        label="CPF"
        tooltipMessage="Digite apenas números, sem pontos ou traços"
        helperText="Ex: 12345678901"
        htmlFor="cpf-input"
      >
        <div className="ods-input">
          <input id="cpf-input" type="text" placeholder="000.000.000-00" />
        </div>
      </FormControl>
    </div>
  ),
};

export const WithSelect: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <FormControl
        label="Estado"
        helperText="Selecione seu estado"
        htmlFor="state-select"
      >
        <div className="ods-select__root">
          <button
            id="state-select"
            type="button"
            className="ods-select__control"
            style={{ cursor: 'pointer' }}
          >
            <span className="ods-select__value ods-select__value--empty">
              Escolha um estado
            </span>
            <div className="ods-select__arrow">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>
      </FormControl>
    </div>
  ),
};

export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <FormControl
        label="Campo normal"
        helperText="Este é um campo normal"
        htmlFor="normal-input"
      >
        <div className="ods-input">
          <input id="normal-input" type="text" placeholder="Campo normal" />
        </div>
      </FormControl>

      <FormControl
        label="Campo com erro"
        error
        helperText="Este campo tem um erro"
        htmlFor="error-input"
      >
        <div className="ods-input ods-input--error">
          <input id="error-input" type="text" placeholder="Campo com erro" />
        </div>
      </FormControl>

      <FormControl
        label="Campo desabilitado"
        disabled
        helperText="Este campo está desabilitado"
        htmlFor="disabled-input"
      >
        <div className="ods-input ods-input--disabled">
          <input
            id="disabled-input"
            type="text"
            placeholder="Campo desabilitado"
            disabled
          />
        </div>
      </FormControl>
    </div>
  ),
};

export const WithoutLabel: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <FormControl helperText="Campo sem label, apenas com texto de ajuda">
        <div className="ods-input">
          <input type="text" placeholder="Campo sem label" />
        </div>
      </FormControl>
    </div>
  ),
};
