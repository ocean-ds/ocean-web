import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Adjustments, Filter } from '@useblu/ocean-icons-react';
import Chips from '../Chips';

const meta: Meta<typeof Chips> = {
  title: 'Components/Chips',
  component: Chips,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'O texto do rótulo exibido no chip.',
      control: 'text',
    },
    icon: {
      description: 'Ícone opcional exibido antes do texto.',
      control: false,
    },
    disabled: {
      description: 'Desabilita o chip.',
      control: 'boolean',
    },
    multiChoice: {
      description: 'Permite seleção múltipla de opções.',
      control: 'boolean',
    },
    options: {
      description: 'Array de opções disponíveis para seleção.',
      control: false,
    },
    defaultValue: {
      description: 'Valor padrão selecionado.',
      control: false,
    },
    clearLabel: {
      description: 'Texto do botão de limpar (modo múltipla escolha).',
      control: 'text',
    },
    filterLabel: {
      description: 'Texto do botão de filtrar (modo múltipla escolha).',
      control: 'text',
    },
    initialCounter: {
      description: 'Contador inicial exibido no badge.',
      control: 'number',
    },
    actived: {
      description: 'Se verdadeiro, o chip aparece no estado ativo.',
      control: 'boolean',
    },
    selectedValue: {
      description: 'Valor(es) selecionado(s) controlado externamente.',
      control: false,
    },
    onClick: {
      description: 'Função chamada ao clicar no chip.',
      control: false,
    },
    onChange: {
      description: 'Função chamada quando a seleção muda.',
      control: false,
    },
    onClose: {
      description: 'Função chamada quando o dropdown é fechado.',
      control: false,
    },
    onConfirm: {
      description:
        'Função chamada ao confirmar seleção (modo múltipla escolha).',
      control: false,
    },
    onClean: {
      description: 'Função chamada ao limpar seleção.',
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Chips>;

const defaultOptions = [
  { label: 'Opção 1', value: '1' },
  { label: 'Opção 2', value: '2' },
  { label: 'Opção 3', value: '3' },
  { label: 'Opção 4', value: '4' },
  { label: 'Opção 5', value: '5' },
];

export const Usage: Story = {
  args: {
    label: 'Selecione o filtro',
    options: defaultOptions,
    clearLabel: 'Limpar',
    filterLabel: 'Filtrar',
  },
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
          height: '210px',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
};

export const SingleChoice: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        height: '200px',
      }}
    >
      <Chips
        label="Selecione uma categoria"
        options={[
          { label: 'Eletrônicos', value: 'eletronicos' },
          { label: 'Roupas', value: 'roupas' },
          { label: 'Casa e Jardim', value: 'casa-jardim' },
          { label: 'Esportes', value: 'esportes' },
        ]}
      />
    </div>
  ),
};

export const MultiChoice: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        height: '280px',
      }}
    >
      <Chips
        label="Selecione filtros"
        multiChoice
        options={[
          { label: 'Preço baixo', value: 'preco-baixo' },
          { label: 'Frete grátis', value: 'frete-gratis' },
          { label: 'Avaliação 5★', value: 'avaliacao-5' },
          { label: 'Promoção', value: 'promocao' },
          { label: 'Vendido pela loja', value: 'vendido-loja' },
        ]}
        clearLabel="Limpar"
        filterLabel="Aplicar filtros"
      />
    </div>
  ),
};

export const WithIcon: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        height: '280px',
      }}
    >
      <Chips
        label="Filtros avançados"
        icon={<Adjustments />}
        options={defaultOptions}
      />
      <Chips
        label="Filtrar resultados"
        icon={<Filter />}
        multiChoice
        options={defaultOptions}
        clearLabel="Limpar"
        filterLabel="Filtrar"
      />
    </div>
  ),
};

export const WithCounter: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        height: '230px',
      }}
    >
      <Chips
        label="Itens selecionados"
        initialCounter={3}
        options={defaultOptions}
      />
      <Chips
        label="Notificações"
        initialCounter={12}
        options={defaultOptions}
      />
    </div>
  ),
};

export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        height: '230px',
      }}
    >
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <Chips label="Estado normal" options={defaultOptions} />
        <Chips label="Estado ativo" actived options={defaultOptions} />
        <Chips label="Estado desabilitado" disabled options={defaultOptions} />
      </div>
    </div>
  ),
};

export const WithoutOptions: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Chips label="Chip simples" />
      <Chips label="Com contador" initialCounter={5} />
    </div>
  ),
};
