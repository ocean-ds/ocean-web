import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Stepper from '../Stepper';

// Estilos reutilizáveis
const containerStyles = {
  display: 'flex',
  gap: '16px',
  maxWidth: '300px',
  flexWrap: 'wrap' as const,
};

const centeredContainerStyles = {
  ...containerStyles,
  minWidth: '300px',
  alignItems: 'flex-start' as const,
  justifyContent: 'center' as const,
};

// Parâmetros padrão para stories visuais
const visualStoryParameters = {
  controls: { disable: true },
};

const meta: Meta<typeof Stepper> = {
  title: 'Components/Inputs/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'O rótulo do campo numérico.',
      control: 'text',
    },
    tooltipMessage: {
      description: 'Texto do tooltip exibido ao lado do label.',
      control: 'text',
    },
    placeholder: {
      description: 'Texto de placeholder exibido quando o campo está vazio.',
      control: 'text',
    },
    helperText: {
      description: 'Texto de ajuda exibido abaixo do campo.',
      control: 'text',
    },
    error: {
      description: 'Indica se o campo está em estado de erro.',
      control: 'boolean',
    },
    disabled: {
      description: 'Desabilita o campo numérico.',
      control: 'boolean',
    },
    min: {
      description: 'Valor mínimo aceito pelo stepper.',
      control: 'number',
      defaultValue: 0,
    },
    max: {
      description: 'Valor máximo aceito pelo stepper.',
      control: 'number',
    },
    defaultValue: {
      description: 'Valor inicial do campo (não controlado).',
      control: 'number',
    },
    value: {
      description: 'Valor atual do campo (controlado).',
      control: 'number',
    },
    htmlFor: {
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Stepper>;

export const Usage: Story = {
  args: {
    label: 'Quantidade',
    helperText: 'Selecione a quantidade desejada',
    min: 0,
    max: 10,
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div style={centeredContainerStyles}>
        <StoryComponent />
      </div>
    ),
  ],
};

export const States: Story = {
  parameters: visualStoryParameters,
  render: () => (
    <div style={containerStyles}>
      <Stepper label="Normal" helperText="Estado normal" min={0} max={5} />
      <Stepper
        label="Com Erro"
        helperText="Valor obrigatório"
        error
        min={0}
        max={5}
      />
      <Stepper
        label="Desabilitado"
        helperText="Campo desabilitado"
        disabled
        min={0}
        max={5}
      />
    </div>
  ),
};

export const MinMaxLimits: Story = {
  parameters: visualStoryParameters,
  render: () => (
    <div style={containerStyles}>
      <Stepper
        label="Mínimo 0"
        helperText="Valor mínimo: 0"
        min={0}
        value={0}
      />
      <Stepper
        label="Máximo 10"
        helperText="Valor máximo: 10"
        min={0}
        max={10}
        value={5}
      />
      <Stepper
        label="Faixa 5-15"
        helperText="Entre 5 e 15"
        min={5}
        max={15}
        value={10}
      />
    </div>
  ),
};

export const WithValues: Story = {
  parameters: visualStoryParameters,
  render: () => (
    <div style={containerStyles}>
      <Stepper
        label="Valor Inicial 0"
        helperText="Começa em 0"
        min={0}
        max={10}
        value={0}
      />
      <Stepper
        label="Valor Inicial 5"
        helperText="Começa em 5"
        min={0}
        max={10}
        value={5}
      />
      <Stepper
        label="Valor Inicial 10"
        helperText="Começa em 10"
        min={0}
        max={10}
        value={10}
      />
    </div>
  ),
};

export const ErrorState: Story = {
  parameters: visualStoryParameters,
  render: () => (
    <div style={containerStyles}>
      <Stepper
        label="Campo Obrigatório"
        helperText="Este campo é obrigatório"
        error
        min={1}
        max={5}
      />
      <Stepper
        label="Valor Inválido"
        helperText="Valor deve ser maior que 0"
        error
        min={1}
        max={10}
        value={0}
      />
    </div>
  ),
};

export const Disabled: Story = {
  parameters: visualStoryParameters,
  render: () => (
    <div style={containerStyles}>
      <Stepper
        label="Desabilitado Vazio"
        helperText="Campo desabilitado"
        disabled
        min={0}
        max={5}
      />
      <Stepper
        label="Desabilitado com Valor"
        helperText="Valor fixo: 3"
        disabled
        min={0}
        max={5}
        value={3}
      />
    </div>
  ),
};

export const WithTooltip: Story = {
  parameters: visualStoryParameters,
  render: () => (
    <div style={containerStyles}>
      <Stepper
        label="Pessoas"
        tooltipMessage="Selecione o número de pessoas para a reserva"
        helperText="Máximo 8 pessoas por mesa"
        min={1}
        max={8}
        value={2}
      />
      <Stepper
        label="Itens"
        tooltipMessage="Quantidade de itens a serem adicionados ao carrinho"
        helperText="Estoque disponível: 15 unidades"
        min={1}
        max={15}
        value={1}
      />
    </div>
  ),
};
