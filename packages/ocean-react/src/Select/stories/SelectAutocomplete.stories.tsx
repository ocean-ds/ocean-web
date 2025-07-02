import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import SelectAutocomplete from '../SelectAutocomplete';
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
  LARGE_CITIES,
  PRODUCTS,
  COMMON_SELECT_PROPS,
  type IntroductionConfig,
  type CommonPatternsConfig,
  type BestPracticesConfig,
  type CssClass,
  type ApiReferenceConfig,
} from './_shared';

type Story = StoryObj<typeof SelectAutocomplete>;

// Configurações para componentes de documentação
const introductionConfig: IntroductionConfig = {
  description:
    'Componente de seleção com busca integrada que permite ao usuário filtrar opções digitando.',
  overview:
    'O SelectAutocomplete combina a funcionalidade de um campo de texto com uma lista suspensa, permitindo que o usuário digite para filtrar opções em tempo real. É ideal para listas grandes onde a busca é essencial para encontrar rapidamente a opção desejada.',
  characteristics: [
    {
      title: 'Busca em Tempo Real',
      description: 'Filtra opções conforme o usuário digita',
    },
    {
      title: 'Performance Otimizada',
      description: 'Otimizado para listas grandes com centenas de opções',
    },
    {
      title: 'Flexibilidade',
      description: 'Permite entrada personalizada ou apenas seleção de opções',
    },
    {
      title: 'Navegação por Teclado',
      description: 'Suporte completo a navegação por setas e Enter',
    },
    {
      title: 'Acessibilidade',
      description: 'Compatível com leitores de tela e ARIA',
    },
  ],
  importPath: `import { SelectAutocomplete } from '@useblu/ocean-react';`,
};

const commonPatternsConfig: CommonPatternsConfig = {
  patterns: [
    {
      code: `// Busca em lista grande
<SelectAutocomplete
  label="Cidade"
  placeholder="Digite para buscar..."
  helperText="Comece digitando o nome da cidade"
  options={cities}
/>

// Com validação de busca
<SelectAutocomplete
  label="Produto"
  error={hasError}
  helperText={hasError ? "Produto não encontrado" : "Digite para filtrar produtos"}
  options={products}
  onInputChange={handleSearch}
/>

// Em formulários complexos
<form onSubmit={handleSubmit}>
  <SelectAutocomplete
    name="customer"
    label="Cliente"
    required
    options={customers}
    onChange={handleCustomerSelect}
  />
</form>`,
    },
  ],
};

const bestPracticesConfig: BestPracticesConfig = {
  sections: [
    {
      title: '1. Quando Usar',
      items: [
        'Para listas com mais de 50 opções onde busca é essencial',
        'Quando usuários precisam encontrar rapidamente opções específicas',
        'Para dados como cidades, clientes, produtos com nomes únicos',
        'Substitua Select comum quando usuários reportam dificuldade para encontrar opções',
      ],
    },
    {
      title: '2. Performance e Dados',
      items: [
        'Use para listas de até 1000 opções com boa performance',
        'Para mais de 1000 itens, considere paginação ou busca no servidor',
        'Mantenha dados ordenados alfabeticamente para melhor UX',
        'Use debounce para buscas em APIs externas',
      ],
    },
    {
      title: '3. UX e Busca',
      items: [
        'Forneça placeholders que orientem sobre a busca (&ldquo;Digite para buscar...&rdquo;)',
        'Use helperText para explicar como a busca funciona',
        'Considere mostrar &ldquo;Nenhum resultado&rdquo; quando a busca não retorna opções',
        'Permita limpar a busca facilmente',
      ],
    },
    {
      title: '4. Acessibilidade',
      items: [
        'Mantenha foco visível durante navegação por teclado',
        'Anuncie resultados de busca para leitores de tela',
        'Use aria-labels apropriados para estado da busca',
        'Garanta que Escape limpe a busca e feche a lista',
      ],
    },
  ],
};

const cssClasses: CssClass[] = [
  {
    name: '.ods-select-autocomplete__root',
    description: 'Estilos aplicados ao elemento raiz.',
  },
  {
    name: '.ods-select-autocomplete__arrow',
    description: 'Estilos aplicados ao elemento de seta.',
  },
  {
    name: '.ods-select-autocomplete__arrow--up',
    description: 'Estilos aplicados à seta quando o popup está aberto.',
  },
  {
    name: '.ods-select-autocomplete__arrow--down',
    description: 'Estilos aplicados à seta quando o popup está fechado.',
  },
  {
    name: '.ods-select-autocomplete__arrow--disabled',
    description: 'Estilos aplicados à seta quando disabled=true.',
  },
];

const apiReferenceConfig: ApiReferenceConfig = {
  description:
    'O componente SelectAutocomplete é baseado no elemento input com funcionalidades de autocomplete e suporta todos os atributos padrão de input.',
  props: [
    {
      name: 'options',
      type: 'Array<{ value: string; label: string; disabled?: boolean }>',
      defaultValue: '[]',
      description:
        'Array de opções para seleção e busca. Cada opção deve ter value e label.',
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
    {
      name: 'onInputChange',
      type: '(inputValue: string) => void',
      defaultValue: 'undefined',
      description: 'Callback chamado quando o texto de busca muda.',
    },
    {
      name: 'inputValue',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Valor atual do campo de busca (modo controlado).',
    },
    // Props comuns com outros componentes de formulário
    ...COMMON_SELECT_PROPS,
    {
      name: 'noOptionsText',
      type: 'string',
      defaultValue: '"Nenhuma opção"',
      description: 'Texto exibido quando nenhuma opção corresponde à busca.',
    },
  ],
  footer:
    'A ref é encaminhada para o elemento input. Qualquer outra prop fornecida será passada para o elemento input.',
};

// Criação dos componentes usando os factories
const Introduction = createIntroduction(introductionConfig);
const CommonPatterns = createCommonPatterns(commonPatternsConfig);
const BestPractices = createBestPractices(bestPracticesConfig);
const CssClasses = createCssClasses(cssClasses);
const ApiReference = createApiReference(apiReferenceConfig);

// Lista de Casos de Uso
const UseCasesList = createCodeList([
  {
    code: 'Busca de Cidades',
    description: 'Para listas grandes de localizações geográficas',
  },
  {
    code: 'Seleção de Clientes',
    description: 'Em sistemas CRM com muitos clientes',
  },
  {
    code: 'Catálogo de Produtos',
    description: 'Para e-commerce com inventário extenso',
  },
  {
    code: 'Tags e Categorias',
    description: 'Sistemas de classificação flexíveis',
  },
]);

// Descrição dos Estados
const StatesDescription = createStatesDescription([
  {
    state: 'error',
    description: 'Quando a busca não retorna resultados válidos',
  },
  { state: 'disabled', description: 'Quando a busca não está disponível' },
  { state: 'loading', description: 'Durante buscas em APIs externas' },
]);

// Usando dados de exemplo compartilhados do _shared.tsx

// Demonstração de Casos de Uso
const UseCases = (): JSX.Element => (
  <div style={sharedContainerStyles.showcase}>
    <SelectAutocomplete
      label="Cidade"
      placeholder="Digite para buscar cidades..."
      helperText="Comece digitando o nome da cidade"
      options={LARGE_CITIES}
    />
    <SelectAutocomplete
      label="Produto"
      placeholder="Buscar produtos..."
      helperText="Digite o nome ou categoria do produto"
      options={PRODUCTS}
    />
    <SelectAutocomplete
      label="Cliente"
      placeholder="Nome do cliente..."
      helperText="Digite para filtrar clientes"
      options={SELECT_COMMON_DATA.COUNTRIES}
    />
  </div>
);

// Usando demonstração de Estados compartilhada
const States = createStatesDemo(
  SelectAutocomplete,
  SELECT_COMMON_DATA.PRIORITIES
);

// Demonstração de Performance
const Performance = (): JSX.Element => (
  <div style={sharedContainerStyles.showcase}>
    <SelectAutocomplete
      label="Lista Pequena (8 opções)"
      placeholder="Buscar..."
      helperText="Use Select simples para poucas opções"
      options={SELECT_COMMON_DATA.COUNTRIES}
    />
    <SelectAutocomplete
      label="Lista Grande (30+ opções)"
      placeholder="Digite para filtrar..."
      helperText="Ideal para listas grandes"
      options={LARGE_CITIES}
    />
    <SelectAutocomplete
      label="Lista com Produtos (16 opções)"
      placeholder="Buscar produtos..."
      helperText="Ótimo para catálogos"
      options={PRODUCTS}
    />
  </div>
);

// Exemplos de Uso
const UsageExamples = (): JSX.Element => (
  <>
    <DocBlock.Heading>Exemplos de Uso</DocBlock.Heading>

    <h3>Busca de Cidades</h3>
    <DocBlock.Source
      dark
      code={`<SelectAutocomplete
  label="Cidade"
  placeholder="Digite para buscar cidades..."
  helperText="Comece digitando o nome da cidade"
  options={cities}
  onChange={handleCitySelect}
/>`}
    />

    <h3>Com Estado Controlado</h3>
    <DocBlock.Source
      dark
      code={`const [inputValue, setInputValue] = useState('');
const [selectedValue, setSelectedValue] = useState('');

<SelectAutocomplete
  label="Produto"
  inputValue={inputValue}
  value={selectedValue}
  onInputChange={setInputValue}
  onChange={setSelectedValue}
  options={filteredProducts}
  placeholder="Buscar produtos..."
/>`}
    />

    <h3>Com Busca no Servidor</h3>
    <DocBlock.Source
      dark
      code={`const [options, setOptions] = useState([]);
const [loading, setLoading] = useState(false);

const handleSearch = useMemo(
  () => debounce(async (query) => {
    if (query.length < 2) return;
    setLoading(true);
    const results = await searchAPI(query);
    setOptions(results);
    setLoading(false);
  }, 300),
  []
);

<SelectAutocomplete
  label="Cliente"
  placeholder="Digite pelo menos 2 caracteres..."
  onInputChange={handleSearch}
  options={options}
  loading={loading}
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
    options: generateNumberOptions(10).map((opt) => ({
      ...opt,
      disabled: opt.value === 'opt-3',
    })),
  },
  decorators: createDefaultDecorator(),
};

// Stories visuais com controles desabilitados
export const UseCasesStory: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <UseCases />,
};

export const StatesStory: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <States />,
};

export const PerformanceStory: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <Performance />,
};

// Meta configuration
const meta: Meta<typeof SelectAutocomplete> = {
  title: 'Components/Inputs/SelectAutocomplete',
  component: SelectAutocomplete,
  tags: ['autodocs'],
  argTypes: {
    ...commonFormArgTypes,
    noOptionsText: {
      description: 'Texto exibido quando nenhuma opção corresponde à busca.',
      control: 'text',
    },
    // Ocultando props técnicas completamente da documentação
    id: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    name: { table: { disable: true } },
    ariaLabel: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onInputChange: { table: { disable: true } },
    className: { table: { disable: true } },
    tooltipMessage: { table: { disable: true } },
    options: { table: { disable: true } },
    value: { table: { disable: true } },
    inputValue: { table: { disable: true } },
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
          <h3 id="casos-uso">Casos de Uso</h3>
          <UseCasesList />
          <DocBlock.Canvas of={UseCasesStory} />
          <h3 id="estados">Estados</h3>
          <StatesDescription />
          <DocBlock.Canvas of={StatesStory} />
          <h3 id="performance">Performance</h3>
          <DocBlock.Canvas of={PerformanceStory} />
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
