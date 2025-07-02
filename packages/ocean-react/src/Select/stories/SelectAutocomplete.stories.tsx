import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import SelectAutocomplete from '../SelectAutocomplete';

type Story = StoryObj<typeof SelectAutocomplete>;

// Componente de Introdução
const Introduction = (): JSX.Element => (
  <>
    <DocBlock.Title />
    <DocBlock.Markdown>
      Componente de seleção com funcionalidade de busca automática que permite
      filtrar opções em tempo real.
    </DocBlock.Markdown>
    <DocBlock.Heading>Visão Geral</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente SelectAutocomplete combina a funcionalidade de um campo de
      busca com um select, permitindo que usuários digitem para filtrar opções
      disponíveis. Ideal para listas grandes onde a busca melhora
      significativamente a experiência do usuário.
    </DocBlock.Markdown>
    <h3>Principais Características</h3>
    <ul>
      <li>
        <strong>Busca em Tempo Real</strong>: Filtragem instantânea conforme o
        usuário digita
      </li>
      <li>
        <strong>Navegação por Teclado</strong>: Suporte completo para
        acessibilidade
      </li>
      <li>
        <strong>Destaque de Termos</strong>: Realce dos termos pesquisados nos
        resultados
      </li>
      <li>
        <strong>Estados Visuais</strong>: Feedback claro para busca e seleção
      </li>
      <li>
        <strong>Performance Otimizada</strong>: Suporte a grandes listas de
        opções
      </li>
    </ul>
    <DocBlock.Heading>Importação</DocBlock.Heading>
    <DocBlock.Source
      dark
      code={`import { SelectAutocomplete } from '@useblu/ocean-react';`}
    />
  </>
);

// Padrões Comuns
const CommonPatterns = (): JSX.Element => (
  <>
    <DocBlock.Source
      dark
      code={`// Uso básico com busca
<SelectAutocomplete
  label="Pesquisar e selecionar"
  placeholder="Digite para buscar..."
  helperText="Digite para buscar e selecionar uma opção"
  options={[
    { value: 'br', label: 'Brasil' },
    { value: 'us', label: 'Estados Unidos' },
    { value: 'ca', label: 'Canadá' }
  ]}
/>

// Com valor controlado
<SelectAutocomplete
  label="País"
  value={selectedCountry}
  onChange={setSelectedCountry}
  options={countries}
/>

// Em formulários com validação
<form onSubmit={handleSubmit}>
  <SelectAutocomplete
    label="Campo Obrigatório"
    error={hasError}
    helperText={hasError ? "Este campo é obrigatório" : "Digite para buscar"}
    options={userOptions}
    required
  />
</form>`}
    />
  </>
);

// Demonstração de Diferentes Tipos de Dados
const DifferentDataTypes = (): JSX.Element => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <SelectAutocomplete
      label="País"
      placeholder="Digite o nome do país"
      helperText="Digite o nome do país para buscar"
      options={[
        { value: 'br', label: 'Brasil' },
        { value: 'us', label: 'Estados Unidos' },
        { value: 'ca', label: 'Canadá' },
        { value: 'mx', label: 'México' },
        { value: 'ar', label: 'Argentina' },
        { value: 'cl', label: 'Chile' },
        { value: 'co', label: 'Colômbia' },
        { value: 'pe', label: 'Peru' },
      ]}
    />
    <SelectAutocomplete
      label="Cidade"
      placeholder="Digite o nome da cidade"
      helperText="Pesquise a cidade desejada"
      options={[
        { value: 'sp', label: 'São Paulo' },
        { value: 'rj', label: 'Rio de Janeiro' },
        { value: 'bh', label: 'Belo Horizonte' },
        { value: 'salvador', label: 'Salvador' },
        { value: 'brasilia', label: 'Brasília' },
        { value: 'fortaleza', label: 'Fortaleza' },
      ]}
    />
    <SelectAutocomplete
      label="Produto"
      placeholder="Digite o nome do produto"
      helperText="Digite o nome do produto para encontrar"
      options={[
        { value: 'laptop', label: 'Laptop' },
        { value: 'smartphone', label: 'Smartphone' },
        { value: 'tablet', label: 'Tablet' },
        { value: 'monitor', label: 'Monitor' },
        { value: 'keyboard', label: 'Teclado' },
        { value: 'mouse', label: 'Mouse' },
      ]}
    />
  </div>
);

// Demonstração de Estados
const States = (): JSX.Element => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <SelectAutocomplete
      label="Campo Obrigatório"
      placeholder="Digite o nome do usuário"
      helperText="Este campo é obrigatório"
      error
      options={[
        { value: 'john', label: 'João Silva' },
        { value: 'mary', label: 'Maria Santos' },
        { value: 'peter', label: 'Pedro Oliveira' },
        { value: 'ana', label: 'Ana Costa', disabled: true },
        { value: 'carlos', label: 'Carlos Ferreira' },
      ]}
    />
    <SelectAutocomplete
      label="Usuário"
      placeholder="Digite o nome do usuário"
      helperText="Busque pelo nome do usuário"
      options={[
        { value: 'john', label: 'João Silva' },
        { value: 'mary', label: 'Maria Santos' },
        { value: 'peter', label: 'Pedro Oliveira' },
        { value: 'ana', label: 'Ana Costa', disabled: true },
        { value: 'carlos', label: 'Carlos Ferreira' },
      ]}
    />
    <SelectAutocomplete
      label="Produto"
      placeholder="Digite o nome do produto"
      helperText="Digite o nome do produto para encontrar"
      disabled
      options={[
        { value: 'laptop', label: 'Laptop' },
        { value: 'smartphone', label: 'Smartphone' },
        { value: 'tablet', label: 'Tablet' },
      ]}
    />
  </div>
);

// Demonstração de Opções Desabilitadas
const DisabledOptionsDemo = (): JSX.Element => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <SelectAutocomplete
      label="Usuário"
      placeholder="Digite o nome do usuário"
      helperText="Ana Costa está desabilitada nesta lista"
      options={[
        { value: 'john', label: 'João Silva' },
        { value: 'mary', label: 'Maria Santos' },
        { value: 'peter', label: 'Pedro Oliveira' },
        { value: 'ana', label: 'Ana Costa', disabled: true },
        { value: 'carlos', label: 'Carlos Ferreira' },
      ]}
    />
  </div>
);

// Story principal com controles ativos
export const Usage: Story = {
  args: {
    label: 'Pesquisar e selecionar',
    placeholder: 'Digite para buscar...',
    helperText: 'Digite para buscar e selecionar uma opção',
    error: false,
    disabled: false,
    options: [
      { value: 'br', label: 'Brasil' },
      { value: 'us', label: 'Estados Unidos' },
      { value: 'ca', label: 'Canadá' },
      { value: 'mx', label: 'México' },
      { value: 'ar', label: 'Argentina' },
      { value: 'cl', label: 'Chile' },
      { value: 'co', label: 'Colômbia' },
      { value: 'pe', label: 'Peru' },
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
export const DifferentDataTypesStory: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <DifferentDataTypes />,
};

export const ErrorStates: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <States />,
};

export const DisabledOptions: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <DisabledOptionsDemo />,
};

// Meta configuration
const meta: Meta<typeof SelectAutocomplete> = {
  title: 'Components/Inputs/SelectAutocomplete',
  component: SelectAutocomplete,
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'O valor atualmente selecionado.',
      control: 'text',
    },
    label: {
      description: 'O rótulo do campo select autocomplete.',
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
      description: 'Quando true, desabilita o campo select autocomplete.',
      control: 'boolean',
    },
    options: {
      description: 'Array de opções disponíveis para busca e seleção.',
      control: { type: null },
    },
    onSearch: {
      description: 'Callback chamado quando o usuário digita no campo.',
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
          <h3 id="tipos-busca">Tipos de Busca</h3>
          <ul>
            <li>
              <code>Países/Localizações</code>: Para formulários geográficos com
              busca
            </li>
            <li>
              <code>Usuários/Pessoas</code>: Para seleção de pessoas em sistemas
            </li>
            <li>
              <code>Produtos</code>: Para catálogos e e-commerce
            </li>
            <li>
              <code>Cidades</code>: Para endereços e localização
            </li>
          </ul>
          <DocBlock.Canvas of={DifferentDataTypesStory} />
          <h3 id="estados">Estados</h3>
          <DocBlock.Markdown>
            Use as props de estado para diferentes contextos de busca:
          </DocBlock.Markdown>
          <ul>
            <li>
              <code>error</code>: Quando há problemas de validação ou seleção
              obrigatória
            </li>
            <li>
              <code>disabled</code>: Quando a busca não está disponível
            </li>
            <li>
              <code>helperText</code>: Para orientar sobre como usar a busca
            </li>
          </ul>
          <DocBlock.Canvas of={ErrorStates} />
          <h3 id="opcoes-desabilitadas">Opções Desabilitadas</h3>
          <DocBlock.Canvas of={DisabledOptions} />
        </>
      ),
    },
  },
};

export default meta;
