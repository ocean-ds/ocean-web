import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import Select from '../Select';
import {
  createIntroduction,
  createCommonPatterns,
  createBestPractices,
  createCssClasses,
  createApiReference,
  createCodeList,
  createStatesDescription,
  createDefaultDecorator,
  createStatesDemo,
  commonFormArgTypes,
  sharedContainerStyles,
  SELECT_COMMON_DATA,
  generateNumberOptions,
  COMMON_SELECT_PROPS,
  COMMON_SELECT_CSS_CLASSES,
  type IntroductionConfig,
  type CommonPatternsConfig,
  type BestPracticesConfig,
  type CssClass,
  type ApiReferenceConfig,
} from './_shared';

type Story = StoryObj<typeof Select>;

// Configurações para componentes de documentação
const introductionConfig: IntroductionConfig = {
  description:
    'Componente de seleção que permite ao usuário escolher uma opção de uma lista suspensa.',
  overview:
    'O componente Select oferece uma interface limpa e intuitiva para seleção de opções em listas. É ideal para formulários onde o usuário precisa escolher entre múltiplas alternativas pré-definidas. Suporta placeholder, validação de erro, estado desabilitado e texto de ajuda.',
  characteristics: [
    {
      title: 'Lista Suspensa',
      description: 'Interface compacta que se expande para mostrar opções',
    },
    {
      title: 'Busca Integrada',
      description: 'Permite filtrar opções conforme o usuário digita',
    },
    {
      title: 'Validação',
      description: 'Estados de erro e validação em tempo real',
    },
    {
      title: 'Acessibilidade',
      description: 'Navegação por teclado e suporte a leitores de tela',
    },
    {
      title: 'Customizável',
      description: 'Suporte a placeholder, helper text e estados visuais',
    },
  ],
  importPath: `import { Select } from '@useblu/ocean-react';`,
};

const commonPatternsConfig: CommonPatternsConfig = {
  patterns: [
    {
      code: `// Uso básico
<Select
  label="País"
  placeholder="Selecione um país..."
  helperText="Escolha seu país de residência"
  options={[
    { value: 'br', label: 'Brasil' },
    { value: 'us', label: 'Estados Unidos' },
    { value: 'fr', label: 'França' }
  ]}
/>

// Com validação
<Select
  label="Categoria"
  error={hasError}
  helperText={hasError ? "Este campo é obrigatório" : "Selecione uma categoria"}
  options={categories}
/>

// Em formulários
<form onSubmit={handleSubmit}>
  <Select
    name="priority"
    label="Prioridade"
    required
    options={priorities}
  />
</form>`,
    },
  ],
};

const bestPracticesConfig: BestPracticesConfig = {
  sections: [
    {
      title: '1. Uso Geral',
      items: [
        'Use para listas de 3 a 100 opções para melhor performance',
        'Forneça labels descritivos que indiquem claramente o propósito',
        'Use placeholders que orientem sobre a ação esperada',
        'Mantenha as opções em ordem lógica (alfabética, por frequência)',
      ],
    },
    {
      title: '2. Organização das Opções',
      items: [
        'Para até 10 opções: ordem alfabética ou por importância',
        'Para 10-50 opções: considere agrupamento por categoria',
        'Para 50+ opções: implemente busca ou use SelectAutocomplete',
        'Coloque opções mais comuns no topo quando apropriado',
      ],
    },
    {
      title: '3. Acessibilidade',
      items: [
        'Sempre forneça labels apropriados para leitores de tela',
        'Use helperText para orientações específicas',
        'Mantenha navegação por teclado funcional (Enter, Esc, setas)',
        'Forneça feedback claro sobre seleção atual',
      ],
    },
    {
      title: '4. Design e UX',
      items: [
        'Use placeholders que indiquem a ação (&ldquo;Selecione...&rdquo;)',
        'Forneça feedback visual claro para estados de erro',
        'Considere o contexto mobile - opções grandes o suficiente',
        'Mantenha consistência com outros campos do formulário',
      ],
    },
  ],
};

// Usando CSS Classes comuns
const cssClasses: CssClass[] = COMMON_SELECT_CSS_CLASSES;

// Usando props comuns + props específicas do Select
const apiReferenceConfig: ApiReferenceConfig = {
  description:
    'O componente Select é baseado no elemento select e suporta todos os atributos padrão de select.',
  props: [
    {
      name: 'options',
      type: 'Array<{ value: string; label: string; disabled?: boolean }>',
      defaultValue: '[]',
      description:
        'Array de opções para seleção. Cada opção deve ter value e label.',
    },
    {
      name: 'value',
      type: 'string',
      defaultValue: 'undefined',
      description: 'O valor atual selecionado (modo controlado).',
    },
    {
      name: 'onChange',
      type: '(value: string) => void',
      defaultValue: 'undefined',
      description: 'Callback chamado quando a seleção muda.',
    },
    ...COMMON_SELECT_PROPS,
  ],
  footer:
    'A ref é encaminhada para o elemento select. Qualquer outra prop fornecida será passada para o elemento select.',
};

// Criação dos componentes usando os factories
const Introduction = createIntroduction(introductionConfig);
const CommonPatterns = createCommonPatterns(commonPatternsConfig);
const BestPractices = createBestPractices(bestPracticesConfig);
const CssClasses = createCssClasses(cssClasses);
const ApiReference = createApiReference(apiReferenceConfig);

// Lista de Tipos de Dados
const DataTypesList = createCodeList([
  {
    code: 'Países',
    description: 'Para seleção de localização e nacionalidade',
  },
  {
    code: 'Categorias',
    description: 'Para classificação de produtos ou conteúdo',
  },
  { code: 'Prioridades', description: 'Para tarefas, tickets e urgência' },
  { code: 'Status', description: 'Para estados de processo e workflow' },
]);

// Descrição dos Estados
const StatesDescription = createStatesDescription([
  {
    state: 'error',
    description: 'Quando há problemas de validação ou seleção obrigatória',
  },
  { state: 'disabled', description: 'Quando a seleção não está disponível' },
  {
    state: 'helperText',
    description: 'Para fornecer contexto sobre as opções',
  },
]);

// Demonstração de Tipos de Dados
const DataTypes = (): JSX.Element => (
  <div style={sharedContainerStyles.showcase}>
    <Select
      label="País"
      placeholder="Selecione um país..."
      helperText="Escolha seu país de residência"
      options={SELECT_COMMON_DATA.COUNTRIES}
    />
    <Select
      label="Categoria"
      placeholder="Selecione uma categoria..."
      helperText="Escolha a categoria do produto"
      options={SELECT_COMMON_DATA.CATEGORIES}
    />
    <Select
      label="Prioridade"
      placeholder="Defina a prioridade..."
      helperText="Selecione o nível de prioridade"
      options={SELECT_COMMON_DATA.PRIORITIES}
    />
    <Select
      label="Status"
      placeholder="Escolha o status..."
      helperText="Defina o status atual"
      options={SELECT_COMMON_DATA.STATUSES}
    />
  </div>
);

// Usando demonstração de Estados compartilhada
const States = createStatesDemo(Select, SELECT_COMMON_DATA.PRIORITIES);

// Demonstração de Tamanhos de Lista
const ListSizes = (): JSX.Element => (
  <div style={sharedContainerStyles.showcase}>
    <Select
      label="Lista Pequena (5 opções)"
      placeholder="Selecione..."
      helperText="Ideal para poucas opções"
      options={SELECT_COMMON_DATA.PRIORITIES}
    />
    <Select
      label="Lista Média (8 opções)"
      placeholder="Selecione..."
      helperText="Boa para categorias principais"
      options={SELECT_COMMON_DATA.COUNTRIES}
    />
    <Select
      label="Lista Grande (10+ opções)"
      placeholder="Selecione..."
      helperText="Para muitas opções, considere busca"
      options={generateNumberOptions(15, 'Opção')}
    />
  </div>
);

// Exemplos de Uso
const UsageExamples = (): JSX.Element => (
  <>
    <DocBlock.Heading>Exemplos de Uso</DocBlock.Heading>

    <h3>Seleção de País</h3>
    <DocBlock.Source
      dark
      code={`<Select
  label="País"
  placeholder="Selecione seu país..."
  helperText="Escolha seu país de residência"
  options={countries}
  onChange={handleCountryChange}
/>`}
    />

    <h3>Formulários com Validação</h3>
    <DocBlock.Source
      dark
      code={`<form onSubmit={handleSubmit}>
  <Select
    name="category"
    label="Categoria"
    error={hasError}
    helperText={hasError ? "Categoria é obrigatória" : "Selecione uma categoria"}
    options={categories}
    required
  />
  <Button type="submit">Salvar</Button>
</form>`}
    />

    <h3>Com Estado Controlado</h3>
    <DocBlock.Source
      dark
      code={`const [priority, setPriority] = useState('');
const [error, setError] = useState(false);

const handlePriorityChange = (value) => {
  setPriority(value);
  setError(!value); // Valida se foi selecionado
};

<Select
  label="Prioridade"
  value={priority}
  onChange={handlePriorityChange}
  error={error}
  helperText={error ? "Selecione uma prioridade" : "Defina o nível de urgência"}
  options={priorities}
/>`}
    />
  </>
);

// Story principal com controles ativos
export const Usage: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder...',
    helperText: 'Some text here!',
    error: false,
    disabled: false,
    options: generateNumberOptions(10),
  },
  decorators: createDefaultDecorator(),
};

// Stories visuais com controles desabilitados
export const DataTypesStory: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <DataTypes />,
};

export const StatesStory: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <States />,
};

export const ListSizesStory: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <ListSizes />,
};

// Meta configuration
const meta: Meta<typeof Select> = {
  title: 'Components/Inputs/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    ...commonFormArgTypes,
    // Ocultando props técnicas completamente da documentação
    id: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    name: { table: { disable: true } },
    ariaLabel: { table: { disable: true } },
    onChange: { table: { disable: true } },
    className: { table: { disable: true } },
    tooltipMessage: { table: { disable: true } },
    options: { table: { disable: true } },
    value: { table: { disable: true } },
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
          <h3 id="tipos-dados">Tipos de Dados</h3>
          <DataTypesList />
          <DocBlock.Canvas of={DataTypesStory} />
          <h3 id="estados">Estados</h3>
          <StatesDescription />
          <DocBlock.Canvas of={StatesStory} />
          <h3 id="tamanhos-lista">Tamanhos de Lista</h3>
          <DocBlock.Canvas of={ListSizesStory} />
          <UsageExamples />
          <BestPractices />
          <CssClasses />
          <ApiReference />
        </>
      ),
    },
  },
};

export default meta;
