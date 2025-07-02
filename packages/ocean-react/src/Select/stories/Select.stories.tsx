import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import Select from '../Select';

type Story = StoryObj<typeof Select>;

// Componente de Introdução
const Introduction = (): JSX.Element => (
  <>
    <DocBlock.Title />
    <DocBlock.Markdown>
      Componente de seleção que permite escolher uma opção de uma lista
      predefinida.
    </DocBlock.Markdown>
    <DocBlock.Heading>Visão Geral</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente Select oferece uma interface intuitiva para seleção de
      opções, com suporte a busca, navegação por teclado e estados visuais
      claros. Ideal para formulários que requerem escolha entre opções
      específicas.
    </DocBlock.Markdown>
    <h3>Principais Características</h3>
    <ul>
      <li>
        <strong>Lista Expansível</strong>: Interface dropdown com opções
        organizadas
      </li>
      <li>
        <strong>Busca Integrada</strong>: Filtragem de opções por digitação
      </li>
      <li>
        <strong>Navegação por Teclado</strong>: Suporte completo a
        acessibilidade
      </li>
      <li>
        <strong>Estados Visuais</strong>: Feedback claro para seleção e
        validação
      </li>
      <li>
        <strong>Configurável</strong>: Suporte a diferentes tipos de dados e
        formatos
      </li>
    </ul>
    <DocBlock.Heading>Importação</DocBlock.Heading>
    <DocBlock.Source
      dark
      code={`import { Select } from '@useblu/ocean-react';`}
    />
  </>
);

// Padrões Comuns
const CommonPatterns = (): JSX.Element => (
  <>
    <DocBlock.Source
      dark
      code={`// Uso básico
<Select
  label="Selecione uma opção"
  placeholder="Selecione..."
  helperText="Escolha uma das opções disponíveis"
  options={[
    { value: 'br', label: 'Brasil' },
    { value: 'us', label: 'Estados Unidos' },
    { value: 'ca', label: 'Canadá' }
  ]}
/>

// Com valor controlado
<Select
  label="País"
  value={selectedCountry}
  onChange={setSelectedCountry}
  options={countries}
/>

// Em formulários com validação
<form onSubmit={handleSubmit}>
  <Select
    label="Campo Obrigatório"
    error={hasError}
    helperText={hasError ? "Este campo é obrigatório" : "Escolha uma categoria"}
    options={categories}
    required
  />
</form>`}
    />
  </>
);

// Demonstração de Diferentes Opções
const DifferentOptions = (): JSX.Element => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Select
      label="País"
      placeholder="Escolha um país"
      helperText="Selecione o país de origem"
      options={[
        { value: 'br', label: 'Brasil' },
        { value: 'us', label: 'Estados Unidos' },
        { value: 'ca', label: 'Canadá' },
        { value: 'mx', label: 'México' },
        { value: 'ar', label: 'Argentina' },
      ]}
    />
    <Select
      label="Categoria"
      placeholder="Selecione uma categoria"
      helperText="Escolha a categoria do produto"
      options={[
        { value: 'electronics', label: 'Eletrônicos' },
        { value: 'clothing', label: 'Vestuário' },
        { value: 'books', label: 'Livros' },
        { value: 'home', label: 'Casa e Jardim' },
        { value: 'sports', label: 'Esportes' },
      ]}
    />
    <Select
      label="Prioridade"
      placeholder="Defina a prioridade"
      helperText="Defina a prioridade da tarefa"
      options={[
        { value: 'low', label: 'Baixa' },
        { value: 'medium', label: 'Média' },
        { value: 'high', label: 'Alta' },
        { value: 'urgent', label: 'Urgente' },
      ]}
    />
  </div>
);

// Demonstração de Estados
const States = (): JSX.Element => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Select
      label="Campo Obrigatório"
      placeholder="Selecione uma categoria"
      helperText="Este campo é obrigatório"
      error
      options={[
        { value: 'electronics', label: 'Eletrônicos' },
        { value: 'clothing', label: 'Vestuário' },
        { value: 'books', label: 'Livros' },
      ]}
    />
    <Select
      label="Status"
      placeholder="Escolha o status"
      helperText="Atualize o status do item"
      options={[
        { value: 'pending', label: 'Pendente' },
        { value: 'in-progress', label: 'Em Andamento' },
        { value: 'completed', label: 'Concluído' },
        { value: 'cancelled', label: 'Cancelado' },
      ]}
    />
    <Select
      label="Prioridade"
      placeholder="Defina a prioridade"
      helperText="Defina a prioridade da tarefa"
      disabled
      options={[
        { value: 'low', label: 'Baixa' },
        { value: 'medium', label: 'Média' },
        { value: 'high', label: 'Alta' },
        { value: 'urgent', label: 'Urgente' },
      ]}
    />
  </div>
);

// Story principal com controles ativos
export const Usage: Story = {
  args: {
    label: 'Selecione uma opção',
    placeholder: 'Selecione...',
    helperText: 'Escolha uma das opções disponíveis',
    error: false,
    disabled: false,
    options: [
      { value: 'br', label: 'Brasil' },
      { value: 'us', label: 'Estados Unidos' },
      { value: 'ca', label: 'Canadá' },
      { value: 'mx', label: 'México' },
      { value: 'ar', label: 'Argentina' },
    ],
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div style={{ minWidth: '300px' }}>
        <StoryComponent />
      </div>
    ),
  ],
};

// Stories visuais sem controles
export const DifferentOptionTypes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <DifferentOptions />,
};

export const ErrorStates: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <States />,
};

// Meta configuration
const meta: Meta<typeof Select> = {
  title: 'Components/Inputs/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'O valor atualmente selecionado.',
      control: 'text',
    },
    label: {
      description: 'O rótulo do campo select.',
      control: 'text',
    },
    placeholder: {
      description: 'Texto exibido quando nenhuma opção está selecionada.',
      control: 'text',
    },
    helperText: {
      description: 'Texto de ajuda exibido abaixo do campo.',
      control: 'text',
    },
    error: {
      description: 'Quando true, aplica o estilo de erro ao campo.',
      control: 'boolean',
    },
    disabled: {
      description: 'Quando true, desabilita o campo select.',
      control: 'boolean',
    },
    options: {
      description: 'Array de opções disponíveis no select.',
      control: { type: null },
    },
    ariaLabel: {
      control: { type: null },
    },
    name: {
      control: { type: null },
    },
    id: {
      control: { type: null },
    },
    tooltipMessage: {
      control: { type: null },
      table: { disable: true },
    },
    htmlFor: {
      control: { type: null },
    },
    className: {
      control: { type: null },
    },
    autoFocus: {
      control: { type: null },
    },
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <Introduction />
          <DocBlock.Heading>Uso</DocBlock.Heading>
          <DocBlock.Canvas of={Usage} />
          <DocBlock.Controls of={Usage} />
          <DocBlock.Heading>Padrões comuns</DocBlock.Heading>
          <CommonPatterns />
          <DocBlock.Heading>Exemplos</DocBlock.Heading>
          <h3 id="opcoes">Tipos de Opções</h3>
          <ul>
            <li>
              <code>Países/Localizações</code>: Para formulários geográficos
            </li>
            <li>
              <code>Categorias</code>: Para classificação de produtos ou
              conteúdo
            </li>
            <li>
              <code>Status/Estados</code>: Para workflows e processos
            </li>
            <li>
              <code>Prioridades</code>: Para sistemas de tarefas e tickets
            </li>
          </ul>
          <DocBlock.Canvas of={DifferentOptionTypes} />
          <h3 id="estados">Estados</h3>
          <DocBlock.Markdown>
            Use as props de estado para diferentes contextos:
          </DocBlock.Markdown>
          <ul>
            <li>
              <code>error</code>: Quando há problemas de validação ou seleção
              obrigatória
            </li>
            <li>
              <code>disabled</code>: Quando a seleção não está disponível
            </li>
            <li>
              <code>helperText</code>: Para fornecer orientações sobre as opções
            </li>
          </ul>
          <DocBlock.Canvas of={ErrorStates} />
        </>
      ),
    },
  },
};

export default meta;
