import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import TextArea from '../TextArea';

// Estilos reutilizáveis
const containerStyles = {
  display: 'flex',
  gap: '16px',
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

const meta: Meta<typeof TextArea> = {
  title: 'Components/Inputs/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'O rótulo do campo de texto.',
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
      description: 'Desabilita o campo de texto.',
      control: 'boolean',
    },
    defaultValue: {
      description: 'Valor inicial do campo (não controlado).',
      control: 'text',
    },
    value: {
      description: 'Valor atual do campo (controlado).',
      control: 'text',
    },
    rows: {
      description: 'Número de linhas visíveis do textarea.',
      control: 'number',
      defaultValue: 4,
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Usage: Story = {
  args: {
    label: 'Label',
    placeholder: 'Digite seu texto aqui...',
    helperText: 'Texto de ajuda opcional',
    rows: 4,
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
      <TextArea
        label="Normal"
        placeholder="Campo normal"
        helperText="Estado normal"
      />
      <TextArea
        label="Com Erro"
        placeholder="Campo com erro"
        helperText="Mensagem de erro"
        error
      />
      <TextArea
        label="Desabilitado"
        placeholder="Campo desabilitado"
        helperText="Estado desabilitado"
        disabled
      />
    </div>
  ),
};

export const WithContent: Story = {
  parameters: visualStoryParameters,
  render: () => (
    <div style={containerStyles}>
      <TextArea
        label="Com Valor Inicial"
        defaultValue="Este é um texto de exemplo que já está preenchido no campo."
        helperText="Campo com conteúdo inicial"
      />
      <TextArea
        label="Múltiplas Linhas"
        defaultValue="Linha 1&#10;Linha 2&#10;Linha 3&#10;Linha 4"
        rows={4}
        helperText="Campo com múltiplas linhas"
      />
    </div>
  ),
};

export const ErrorState: Story = {
  parameters: visualStoryParameters,
  render: () => (
    <div style={containerStyles}>
      <TextArea
        label="Campo Obrigatório"
        placeholder="Digite algo..."
        helperText="Este campo é obrigatório"
        error
      />
      <TextArea
        label="Formato Inválido"
        defaultValue="Texto inválido"
        helperText="Formato do texto está incorreto"
        error
      />
    </div>
  ),
};

export const Disabled: Story = {
  parameters: visualStoryParameters,
  render: () => (
    <div style={containerStyles}>
      <TextArea
        label="Desabilitado Vazio"
        placeholder="Campo desabilitado"
        helperText="Este campo está desabilitado"
        disabled
      />
      <TextArea
        label="Desabilitado com Conteúdo"
        defaultValue="Conteúdo que não pode ser editado"
        helperText="Campo desabilitado com texto"
        disabled
      />
    </div>
  ),
};

export const WithTooltip: Story = {
  parameters: visualStoryParameters,
  render: () => (
    <div style={containerStyles}>
      <TextArea
        label="Campo com Tooltip"
        tooltipMessage="Esta é uma informação adicional sobre o campo"
        placeholder="Digite seu texto..."
        helperText="Campo com tooltip informativo"
      />
      <TextArea
        label="Comentários"
        tooltipMessage="Use este campo para adicionar observações importantes sobre o item"
        defaultValue="Exemplo de comentário..."
        helperText="Máximo de 500 caracteres"
      />
    </div>
  ),
};
