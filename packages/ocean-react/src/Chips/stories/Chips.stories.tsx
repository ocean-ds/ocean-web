import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Adjustments, Filter } from '@useblu/ocean-icons-react';
import Chips from '../Chips';
import WithAmount from './WithAmount';
import WithoutOptions from './WithoutOptions';
import SelectAll from './SelectAll';
import Typography from '../../Typography';

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
    selectAllOptions: {
      description:
        'Adiciona o checkbox "Selecionar todos" ao topo do dropdown em modo multiChoice',
      control: 'boolean',
    },
    headerOptions: {
      description:
        'Conteúdo extra exibido no topo do dropdown de múltipla escolha.',
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
          height: '400px',
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
        height: '340px',
      }}
    >
      <Chips
        label="Filtros"
        options={defaultOptions}
        clearLabel="Limpar"
        filterLabel="Aplicar"
        multiChoice
      />
    </div>
  ),
};

export const MultiChoiceWithAmount: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <WithAmount />,
};

export const WithHeaderOptions: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <WithAmount
      headerOptions={
        <Typography variant="heading5" style={{ color: '#AAADC0' }}>
          Title
        </Typography>
      }
    />
  ),
};

export const SelectAllStory: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <SelectAll />,
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
        height: '350px',
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

export const WithoutOptionsBehaviour: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <WithoutOptions />,
};
