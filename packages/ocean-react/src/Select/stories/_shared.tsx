import React from 'react';
import * as DocBlock from '@storybook/blocks';

// Estilos de container compartilhados
export const sharedContainerStyles = {
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    maxWidth: '400px',
  },
  showcase: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  grid: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap' as const,
    alignItems: 'center',
  },
  decorator: {
    minWidth: '300px',
    display: 'flex',
    justifyContent: 'center',
  },
};

// Tipos para configuração de componentes de documentação
export interface BaseConfig {
  title?: string;
  description: string;
}

export interface IntroductionConfig extends BaseConfig {
  overview: string;
  characteristics?: Array<{
    title: string;
    description: string;
  }>;
  importPath?: string;
}

export interface CommonPatternsConfig {
  patterns: Array<{
    title?: string;
    code: string;
  }>;
}

export interface BestPracticesConfig {
  sections: Array<{
    title: string;
    items: string[];
  }>;
}

export interface CssClass {
  name: string;
  description: string;
}

export interface ApiProp {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

export interface ApiReferenceConfig extends BaseConfig {
  props: ApiProp[];
  footer?: string;
  inheritance?: string;
}

export interface CodeListItem {
  code: string;
  description: string;
}

export interface StateDescription {
  state: string;
  description: string;
}

export interface UsageExample {
  title: string;
  code: string;
}

// ArgTypes comuns para formulários
export const commonFormArgTypes = {
  label: {
    description: 'O rótulo do campo.',
    control: 'text',
  },
  placeholder: {
    description: 'Texto exibido quando o campo está vazio.',
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
    description: 'Quando true, desabilita o campo.',
    control: 'boolean',
  },
};

// Factory para criar componente de Introdução
export const createIntroduction = (config: IntroductionConfig): React.FC => {
  const IntroductionComponent = (): JSX.Element => (
    <>
      <DocBlock.Title />
      <DocBlock.Markdown>{config.description}</DocBlock.Markdown>
      <DocBlock.Heading>Visão Geral</DocBlock.Heading>
      <DocBlock.Markdown>{config.overview}</DocBlock.Markdown>
      {config.characteristics && (
        <>
          <h3>Principais Características</h3>
          <ul>
            {config.characteristics.map((char) => (
              <li key={char.title}>
                <strong>{char.title}</strong>: {char.description}
              </li>
            ))}
          </ul>
        </>
      )}
      <DocBlock.Heading>Importação</DocBlock.Heading>
      <DocBlock.Source
        dark
        code={
          config.importPath ??
          `import { ComponentName } from '@useblu/ocean-react';`
        }
      />
    </>
  );
  return IntroductionComponent;
};

// Factory para criar componente de Padrões Comuns
export const createCommonPatterns = (
  config: CommonPatternsConfig
): React.FC => {
  const CommonPatternsComponent = (): JSX.Element => (
    <>
      {config.patterns.map((pattern) => (
        <div key={pattern.title}>
          {pattern.title && <h3>{pattern.title}</h3>}
          <DocBlock.Source dark code={pattern.code} />
        </div>
      ))}
    </>
  );
  return CommonPatternsComponent;
};

// Factory para criar componente de Melhores Práticas
export const createBestPractices = (config: BestPracticesConfig): React.FC => {
  const BestPracticesComponent = (): JSX.Element => (
    <>
      <DocBlock.Heading>Melhores Práticas</DocBlock.Heading>
      {config.sections.map((section) => (
        <div key={section.title}>
          <h3>{section.title}</h3>
          <ul>
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
  return BestPracticesComponent;
};

// Factory para criar componente de Classes CSS
export const createCssClasses = (cssClasses: CssClass[]): React.FC => {
  const CssClassesComponent = (): JSX.Element => (
    <>
      <DocBlock.Heading>Classes CSS</DocBlock.Heading>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Classe</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {cssClasses.map((cssClass) => (
            <tr key={cssClass.name}>
              <td>
                <code>{cssClass.name}</code>
              </td>
              <td>{cssClass.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
  return CssClassesComponent;
};

// Factory para criar componente de API Reference
export const createApiReference = (config: ApiReferenceConfig): React.FC => {
  const ApiReferenceComponent = (): JSX.Element => (
    <>
      <DocBlock.Heading>API Reference</DocBlock.Heading>
      <DocBlock.Markdown>{config.description}</DocBlock.Markdown>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Tipo</th>
            <th>Padrão</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {config.props.map((prop) => (
            <tr key={prop.name}>
              <td>
                <code>{prop.name}</code>
              </td>
              <td>
                <code>{prop.type}</code>
              </td>
              <td>
                <code>{prop.defaultValue}</code>
              </td>
              <td>{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {config.footer && <DocBlock.Markdown>{config.footer}</DocBlock.Markdown>}
      {config.inheritance && (
        <DocBlock.Markdown>{config.inheritance}</DocBlock.Markdown>
      )}
    </>
  );
  return ApiReferenceComponent;
};

// Utilitário para criar lista de códigos
export const createCodeList = (items: CodeListItem[]): React.FC => {
  const CodeListComponent = (): JSX.Element => (
    <ul>
      {items.map((item) => (
        <li key={item.code}>
          <code>{item.code}</code>: {item.description}
        </li>
      ))}
    </ul>
  );
  return CodeListComponent;
};

// Utilitário para criar descrição de estados
export const createStatesDescription = (
  states: StateDescription[]
): React.FC => {
  const StatesDescriptionComponent = (): JSX.Element => (
    <>
      <DocBlock.Markdown>
        Use as props de estado para diferentes contextos:
      </DocBlock.Markdown>
      <ul>
        {states.map((state) => (
          <li key={state.state}>
            <code>{state.state}</code>: {state.description}
          </li>
        ))}
      </ul>
    </>
  );
  return StatesDescriptionComponent;
};

// Decorator padrão para stories
export const createDefaultDecorator = (): Array<
  (StoryComponent: React.ComponentType) => JSX.Element
> => [
  (StoryComponent: React.ComponentType): JSX.Element => (
    <div style={sharedContainerStyles.decorator}>
      <StoryComponent />
    </div>
  ),
];

// Dados comuns para Select
export const SELECT_COMMON_DATA = {
  COUNTRIES: [
    { value: 'br', label: 'Brasil' },
    { value: 'us', label: 'Estados Unidos' },
    { value: 'ca', label: 'Canadá' },
    { value: 'fr', label: 'França' },
    { value: 'de', label: 'Alemanha' },
    { value: 'it', label: 'Itália' },
    { value: 'es', label: 'Espanha' },
    { value: 'uk', label: 'Reino Unido' },
  ],
  CATEGORIES: [
    { value: 'electronics', label: 'Eletrônicos' },
    { value: 'clothing', label: 'Roupas' },
    { value: 'books', label: 'Livros' },
    { value: 'sports', label: 'Esportes' },
    { value: 'home', label: 'Casa e Jardim' },
  ],
  PRIORITIES: [
    { value: 'low', label: 'Baixa' },
    { value: 'medium', label: 'Média' },
    { value: 'high', label: 'Alta' },
    { value: 'urgent', label: 'Urgente' },
  ],
  STATUSES: [
    { value: 'active', label: 'Ativo' },
    { value: 'inactive', label: 'Inativo' },
    { value: 'pending', label: 'Pendente' },
    { value: 'completed', label: 'Concluído' },
  ],
};

// Gerar opções numéricas
export const generateNumberOptions = (
  count: number,
  prefix = 'Option'
): Array<{ value: string; label: string }> =>
  Array.from(Array(count), (_, index) => ({
    value: `opt-${index + 1}`,
    label: `${prefix} ${index + 1}`,
  }));

// Dados expandidos para demonstrações
export const LARGE_CITIES = [
  'São Paulo',
  'Rio de Janeiro',
  'Brasília',
  'Salvador',
  'Fortaleza',
  'Belo Horizonte',
  'Manaus',
  'Curitiba',
  'Recife',
  'Goiânia',
  'Belém',
  'Porto Alegre',
  'Guarulhos',
  'Campinas',
  'São Luís',
  'São Gonçalo',
  'Maceió',
  'Duque de Caxias',
  'Campo Grande',
  'Natal',
  'Teresina',
  'São Bernardo do Campo',
  'Nova Iguaçu',
  'João Pessoa',
  'Santo André',
  'Osasco',
  'Jaboatão dos Guararapes',
  'São José dos Campos',
  'Ribeirão Preto',
].map((city) => ({
  value: city.toLowerCase().replace(/\s+/g, '-'),
  label: city,
}));

export const PRODUCTS = [
  'Smartphone Galaxy Pro',
  'Notebook Dell Inspiron',
  'Tablet iPad Air',
  'Headphone Sony',
  'Camera Canon EOS',
  'Monitor LG UltraWide',
  'Teclado Mecânico',
  'Mouse Gamer RGB',
  'SSD Kingston 1TB',
  'Memória RAM 16GB',
  'Placa de Vídeo RTX',
  'Processador Intel i7',
  'Impressora HP LaserJet',
  'Webcam Logitech 4K',
  'Caixa de Som JBL',
  'Carregador Wireless',
].map((product) => ({
  value: product.toLowerCase().replace(/\s+/g, '-'),
  label: product,
}));

// Props comuns da API para Select/SelectAutocomplete
export const BASE_SELECT_PROPS: ApiProp[] = [
  {
    name: 'label',
    type: 'string',
    defaultValue: 'undefined',
    description:
      'O rótulo do campo. Exibido acima do campo para identificação.',
  },
  {
    name: 'placeholder',
    type: 'string',
    defaultValue: 'undefined',
    description: 'Texto exibido quando nenhuma opção está selecionada.',
  },
  {
    name: 'helperText',
    type: 'string',
    defaultValue: 'undefined',
    description: 'Texto de ajuda exibido abaixo do campo.',
  },
  {
    name: 'error',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Quando true, aplica o estilo de erro ao campo.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Quando true, desabilita o campo.',
  },
];

// Props de controle compartilhadas entre Select e SelectAutocomplete
export const CONTROL_PROPS: ApiProp[] = [
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
];

// Prop de opções compartilhada
export const OPTIONS_PROP: ApiProp = {
  name: 'options',
  type: 'Array<{ value: string; label: string; disabled?: boolean }>',
  defaultValue: '[]',
  description:
    'Array de opções para seleção. Cada opção deve ter value e label.',
};

// Factory para criar classes CSS comuns
const createCssClassesForComponent = (
  prefix: string,
  isAutocomplete = false
): CssClass[] => {
  const baseClasses: CssClass[] = [
    {
      name: `.${prefix}__root`,
      description: 'Estilos aplicados ao elemento raiz.',
    },
    {
      name: `.${prefix}__arrow`,
      description: 'Estilos aplicados ao elemento de seta.',
    },
    {
      name: `.${prefix}__arrow--up`,
      description: 'Estilos aplicados à seta quando o popup está aberto.',
    },
    {
      name: `.${prefix}__arrow--down`,
      description: 'Estilos aplicados à seta quando o popup está fechado.',
    },
    {
      name: `.${prefix}__arrow--disabled`,
      description: 'Estilos aplicados à seta quando disabled=true.',
    },
  ];

  if (!isAutocomplete) {
    // Classes específicas do Select
    const selectSpecificClasses: CssClass[] = [
      {
        name: `.${prefix}__control`,
        description: 'Estilos aplicados ao elemento de controle.',
      },
      {
        name: `.${prefix}__control--expanded`,
        description:
          'Estilos aplicados ao controle quando o popup está aberto.',
      },
      {
        name: `.${prefix}__control--filled`,
        description: 'Estilos aplicados quando há uma opção selecionada.',
      },
      {
        name: `.${prefix}__control--error`,
        description: 'Estilos aplicados ao controle quando error=true.',
      },
      {
        name: `.${prefix}__value`,
        description: 'Estilos aplicados ao elemento de valor.',
      },
      {
        name: `.${prefix}__value--empty`,
        description: 'Estilos aplicados ao valor quando o placeholder aparece.',
      },
      {
        name: `.${prefix}__listbox-wrapper`,
        description: 'Estilos aplicados ao elemento popup.',
      },
      {
        name: `.${prefix}__listbox`,
        description: 'Estilos aplicados ao elemento listbox.',
      },
      {
        name: `.${prefix}__option`,
        description: 'Estilos aplicados ao elemento de opção.',
      },
      {
        name: `.${prefix}__option--selected`,
        description: 'Estilos aplicados à opção selecionada no listbox.',
      },
      {
        name: `.${prefix}__option--disabled`,
        description: 'Estilos aplicados à opção desabilitada no listbox.',
      },
    ];

    // Insere as classes específicas do Select após a classe root
    return [baseClasses[0], ...selectSpecificClasses, ...baseClasses.slice(1)];
  }

  return baseClasses;
};

// CSS Classes comuns para Select
export const COMMON_SELECT_CSS_CLASSES: CssClass[] =
  createCssClassesForComponent('ods-select', false);

// CSS Classes para SelectAutocomplete
export const COMMON_SELECT_AUTOCOMPLETE_CSS_CLASSES: CssClass[] =
  createCssClassesForComponent('ods-select-autocomplete', true);

// Unified factory para criar Common Patterns
const createCommonPatternsConfig = (
  codeExample: string
): CommonPatternsConfig => ({
  patterns: [
    {
      code: codeExample,
    },
  ],
});

// Factory para criar Common Patterns para Select
export const createSelectCommonPatterns = (): CommonPatternsConfig =>
  createCommonPatternsConfig(SHARED_CODE_EXAMPLES.SELECT_PATTERNS);

// Factory para criar Common Patterns para SelectAutocomplete
export const createSelectAutocompleteCommonPatterns =
  (): CommonPatternsConfig =>
    createCommonPatternsConfig(SHARED_CODE_EXAMPLES.AUTOCOMPLETE_PATTERNS);

// Unified factory para criar Usage Examples
const createUsageExamplesConfig = (
  examples: Array<{ title: string; code: string }>
): React.FC => {
  const UsageExamplesComponent = (): JSX.Element => (
    <>
      <DocBlock.Heading>Exemplos de Uso</DocBlock.Heading>
      {examples.map((example) => (
        <div key={example.title}>
          <h3>{example.title}</h3>
          <DocBlock.Source dark code={example.code} />
        </div>
      ))}
    </>
  );
  return UsageExamplesComponent;
};

// Factory para criar Usage Examples para Select
export const createSelectUsageExamples = (): React.FC =>
  createUsageExamplesConfig([
    {
      title: 'Seleção de País',
      code: COUNTRY_EXAMPLE,
    },
    {
      title: 'Formulários com Validação',
      code: SHARED_CODE_EXAMPLES.SELECT_FORM_VALIDATION,
    },
    {
      title: 'Com Estado Controlado',
      code: SHARED_CODE_EXAMPLES.SELECT_CONTROLLED_STATE,
    },
  ]);

// Factory para criar Usage Examples para SelectAutocomplete
export const createSelectAutocompleteUsageExamples = (): React.FC =>
  createUsageExamplesConfig([
    { title: 'Busca de Cidades', code: SHARED_CODE_EXAMPLES.CITY_SEARCH },
    {
      title: 'Com Estado Controlado',
      code: SHARED_CODE_EXAMPLES.CONTROLLED_STATE,
    },
    {
      title: 'Com Busca no Servidor',
      code: SHARED_CODE_EXAMPLES.SERVER_SEARCH,
    },
  ]);

// Factory para criar demonstração de tamanhos de lista
export const createListSizesDemo = (
  Component: React.ComponentType<any>
): React.FC =>
  createDemoComponent(Component, [
    'listSizeSmall',
    'listSizeMedium',
    'listSizeLarge',
  ]);

// Helper para resolver referências de texto como SHARED_TEXTS.PLACEHOLDERS.SELECT_GENERIC
const resolveTextReference = (textRef: string): string => {
  if (typeof textRef !== 'string' || !textRef.startsWith('SHARED_TEXTS.')) {
    return textRef;
  }

  const parts = textRef.split('.');
  if (parts.length === 3) {
    const [, category, key] = parts;
    const categoryObj = (SHARED_TEXTS as any)[category];
    return categoryObj?.[key] ?? textRef;
  }
  return textRef;
};

// Helper para resolver referências de opções
const resolveOptions = (optionsRef: string) => {
  switch (optionsRef) {
    case 'LARGE_CITIES':
      return LARGE_CITIES;
    case 'PRODUCTS':
      return PRODUCTS;
    case 'SELECT_COMMON_DATA.COUNTRIES':
      return SELECT_COMMON_DATA.COUNTRIES;
    case 'SELECT_COMMON_DATA.PRIORITIES':
      return SELECT_COMMON_DATA.PRIORITIES;
    case 'SELECT_COMMON_DATA.CATEGORIES':
      return SELECT_COMMON_DATA.CATEGORIES;
    case 'SELECT_COMMON_DATA.STATUSES':
      return SELECT_COMMON_DATA.STATUSES;
    case 'generateNumberOptions(15, "Opção")':
      return generateNumberOptions(15, 'Opção');
    default:
      return [];
  }
};

// Helper para resolver referências de opções e criar props do componente
const createComponentProps = (config: any) => ({
  label: config.label,
  placeholder: resolveTextReference(config.placeholder),
  helperText: resolveTextReference(config.helperText),
  options: resolveOptions(config.options),
  ...(config.error && { error: config.error }),
  ...(config.disabled && { disabled: config.disabled }),
});

// Unified demo component factory
export const createDemoComponent = (
  Component: React.ComponentType<any>,
  keys: string[],
  additionalProps: Record<string, any> = {}
): React.FC => {
  const DemoComponent = (): JSX.Element => (
    <div style={sharedContainerStyles.showcase}>
      {keys.map((key) => (
        <Component
          key={key}
          {...createComponentProps(DEMO_CONFIGS.find((cfg) => cfg.key === key))}
          {...additionalProps}
        />
      ))}
    </div>
  );
  return DemoComponent;
};

// Factory para criar demonstração de casos de uso para SelectAutocomplete
export const createUseCasesDemo = (
  Component: React.ComponentType<any>
): React.FC => createDemoComponent(Component, ['city', 'product', 'client']);

// Factory para criar demonstração de performance para SelectAutocomplete
export const createPerformanceDemo = (
  Component: React.ComponentType<any>
): React.FC =>
  createDemoComponent(Component, ['small', 'large', 'productsList']);

// Listas de dados para documentação
export const SELECT_DATA_TYPES_LIST = [
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
];

export const SELECT_STATES_DESCRIPTION = [
  {
    state: 'error',
    description: 'Quando há problemas de validação ou seleção obrigatória',
  },
  { state: 'disabled', description: 'Quando a seleção não está disponível' },
  {
    state: 'helperText',
    description: 'Para fornecer contexto sobre as opções',
  },
];

export const SELECT_AUTOCOMPLETE_USE_CASES_LIST = [
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
];

export const SELECT_AUTOCOMPLETE_STATES_DESCRIPTION = [
  {
    state: 'error',
    description: 'Quando a busca não retorna resultados válidos',
  },
  { state: 'disabled', description: 'Quando a busca não está disponível' },
  { state: 'loading', description: 'Durante buscas em APIs externas' },
];

// Factory para criar demonstração de estados
export const createStatesDemo = (
  Component: React.ComponentType<any>,
  options: Array<{ value: string; label: string }>
): React.FC =>
  createDemoComponent(
    Component,
    ['stateError', 'stateNormal', 'stateDisabled'],
    { options }
  );

// Factory para criar demonstração de tipos de dados
export const createDataTypesDemo = (
  Component: React.ComponentType<any>
): React.FC =>
  createDemoComponent(Component, [
    'dataCountry',
    'dataCategory',
    'dataPriority',
    'dataStatus',
  ]);

// Factory para criar story com controles desabilitados
export const createDisabledControlsStory = (component: React.FC): any => ({
  parameters: {
    controls: { disable: true },
  },
  render: () => React.createElement(component),
});

// Factory para criar argTypes comuns dos Select
export const createSelectArgTypes = (
  specificProps: Record<string, any> = {}
): Record<string, any> => ({
  ...commonFormArgTypes,
  ...specificProps,
  // Props técnicas ocultas
  id: { table: { disable: true } },
  defaultValue: { table: { disable: true } },
  name: { table: { disable: true } },
  ariaLabel: { table: { disable: true } },
  onChange: { table: { disable: true } },
  className: { table: { disable: true } },
  tooltipMessage: { table: { disable: true } },
  options: { table: { disable: true } },
  value: { table: { disable: true } },
});

// Factory para criar Usage story
export const createUsageStory = (
  defaultOptions = generateNumberOptions(10),
  customArgs: Record<string, any> = {}
): any => ({
  args: {
    label: 'Label',
    placeholder: 'Placeholder...',
    helperText: 'Some text here!',
    error: false,
    disabled: false,
    options: defaultOptions,
    ...customArgs,
  },
  decorators: createDefaultDecorator(),
});

// Props específicas do Select
export const SELECT_SPECIFIC_PROPS: ApiProp[] = [
  OPTIONS_PROP,
  ...CONTROL_PROPS,
  ...BASE_SELECT_PROPS,
];

// Props específicas do SelectAutocomplete
export const SELECT_AUTOCOMPLETE_SPECIFIC_PROPS: ApiProp[] = [
  {
    ...OPTIONS_PROP,
    description:
      'Array de opções para seleção e busca. Cada opção deve ter value e label.',
  },
  ...CONTROL_PROPS,
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
  {
    name: 'noOptionsText',
    type: 'string',
    defaultValue: '"Nenhuma opção"',
    description: 'Texto exibido quando nenhuma opção corresponde à busca.',
  },
  ...BASE_SELECT_PROPS,
];

// Configurações compartilhadas
export const SELECT_INTRODUCTION_CONFIG: IntroductionConfig = {
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

export const SELECT_AUTOCOMPLETE_INTRODUCTION_CONFIG: IntroductionConfig = {
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

// Unified factory para criar Best Practices Config
const createBestPracticesConfig = (
  sections: Array<{ title: string; items: string[] }>
): BestPracticesConfig => ({
  sections,
});

// Configurações de Best Practices comuns
export const SELECT_BEST_PRACTICES_CONFIG: BestPracticesConfig =
  createBestPracticesConfig([
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
  ]);

export const SELECT_AUTOCOMPLETE_BEST_PRACTICES_CONFIG: BestPracticesConfig =
  createBestPracticesConfig([
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
  ]);

// Template para página de documentação
export const createDocsPage = (config: {
  Introduction: React.FC;
  Usage: any;
  CommonPatterns: React.FC;
  sections: Array<{
    id: string;
    title: string;
    list?: React.FC;
    story: any;
  }>;
  UsageExamples: React.FC;
  BestPractices: React.FC;
  CssClasses: React.FC;
  ApiReference: React.FC;
}): React.FC => {
  const DocsPageComponent = (): JSX.Element => (
    <>
      <config.Introduction />
      <DocBlock.Heading>Uso</DocBlock.Heading>
      <DocBlock.Canvas of={config.Usage} />
      <DocBlock.Controls of={config.Usage} />
      <DocBlock.Heading>Padrões comuns</DocBlock.Heading>
      <config.CommonPatterns />
      <DocBlock.Heading>Exemplos</DocBlock.Heading>
      {config.sections.map((section) => (
        <React.Fragment key={section.id}>
          <h3 id={section.id}>{section.title}</h3>
          {section.list && <section.list />}
          <DocBlock.Canvas of={section.story} />
        </React.Fragment>
      ))}
      <config.UsageExamples />
      <config.BestPractices />
      <config.CssClasses />
      <config.ApiReference />
    </>
  );
  DocsPageComponent.displayName = 'DocsPageComponent';
  return DocsPageComponent;
};

// Factory para criar configurações de demo com menos duplicação
const createDemoConfig = (
  key: string,
  label: string,
  placeholder: string,
  helperText: string,
  options: string,
  additionalProps: Record<string, any> = {}
) => ({
  key,
  label,
  placeholder,
  helperText,
  options,
  ...additionalProps,
});

// Configurações unificadas para todos os demos - otimizadas
export const DEMO_CONFIGS = [
  // Autocomplete demos
  createDemoConfig(
    'city',
    'Cidade',
    'Digite para buscar cidades...',
    'Comece digitando o nome da cidade',
    'LARGE_CITIES'
  ),
  createDemoConfig(
    'product',
    'Produto',
    'Buscar produtos...',
    'Digite o nome ou categoria do produto',
    'PRODUCTS'
  ),
  createDemoConfig(
    'client',
    'Cliente',
    'Nome do cliente...',
    'Digite para filtrar clientes',
    'SELECT_COMMON_DATA.COUNTRIES'
  ),

  // Performance demos
  createDemoConfig(
    'small',
    'Lista Pequena (8 opções)',
    'Buscar...',
    'Use Select simples para poucas opções',
    'SELECT_COMMON_DATA.COUNTRIES'
  ),
  createDemoConfig(
    'large',
    'Lista Grande (30+ opções)',
    'Digite para filtrar...',
    'Ideal para listas grandes',
    'LARGE_CITIES'
  ),
  createDemoConfig(
    'productsList',
    'Lista com Produtos (16 opções)',
    'Buscar produtos...',
    'Ótimo para catálogos',
    'PRODUCTS'
  ),

  // List size demos
  createDemoConfig(
    'listSizeSmall',
    'Lista Pequena (5 opções)',
    'SHARED_TEXTS.PLACEHOLDERS.SELECT_GENERIC',
    'SHARED_TEXTS.HELPER_TEXTS.SMALL_LIST_HELP',
    'SELECT_COMMON_DATA.PRIORITIES'
  ),
  createDemoConfig(
    'listSizeMedium',
    'Lista Média (8 opções)',
    'SHARED_TEXTS.PLACEHOLDERS.SELECT_GENERIC',
    'SHARED_TEXTS.HELPER_TEXTS.MEDIUM_LIST_HELP',
    'SELECT_COMMON_DATA.COUNTRIES'
  ),
  createDemoConfig(
    'listSizeLarge',
    'Lista Grande (10+ opções)',
    'SHARED_TEXTS.PLACEHOLDERS.SELECT_GENERIC',
    'SHARED_TEXTS.HELPER_TEXTS.LARGE_LIST_HELP',
    'generateNumberOptions(15, "Opção")'
  ),

  // State demos
  createDemoConfig(
    'stateError',
    'Campo com Erro',
    'SHARED_TEXTS.PLACEHOLDERS.SELECT_OPTION',
    'SHARED_TEXTS.HELPER_TEXTS.ERROR_STATE',
    '',
    { error: true }
  ),
  createDemoConfig(
    'stateNormal',
    'Campo Normal',
    'SHARED_TEXTS.PLACEHOLDERS.SELECT_OPTION',
    'SHARED_TEXTS.HELPER_TEXTS.NORMAL_STATE',
    ''
  ),
  createDemoConfig(
    'stateDisabled',
    'Campo Desabilitado',
    'SHARED_TEXTS.PLACEHOLDERS.NOT_AVAILABLE',
    'SHARED_TEXTS.HELPER_TEXTS.DISABLED_STATE',
    '',
    { disabled: true }
  ),

  // Data type demos
  createDemoConfig(
    'dataCountry',
    'País',
    'SHARED_TEXTS.PLACEHOLDERS.SELECT_COUNTRY',
    'SHARED_TEXTS.HELPER_TEXTS.COUNTRY_HELP',
    'SELECT_COMMON_DATA.COUNTRIES'
  ),
  createDemoConfig(
    'dataCategory',
    'Categoria',
    'SHARED_TEXTS.PLACEHOLDERS.SELECT_CATEGORY',
    'SHARED_TEXTS.HELPER_TEXTS.CATEGORY_HELP',
    'SELECT_COMMON_DATA.CATEGORIES'
  ),
  createDemoConfig(
    'dataPriority',
    'Prioridade',
    'SHARED_TEXTS.PLACEHOLDERS.SELECT_PRIORITY',
    'SHARED_TEXTS.HELPER_TEXTS.PRIORITY_HELP',
    'SELECT_COMMON_DATA.PRIORITIES'
  ),
  createDemoConfig(
    'dataStatus',
    'Status',
    'SHARED_TEXTS.PLACEHOLDERS.SELECT_STATUS',
    'SHARED_TEXTS.HELPER_TEXTS.STATUS_HELP',
    'SELECT_COMMON_DATA.STATUSES'
  ),
];

// Códigos de exemplo compartilhados - otimizados para reduzir duplicações
const createSelectExample = (
  label: string,
  placeholder: string,
  helperText: string,
  options: string,
  onChange?: string,
  error?: boolean,
  name?: string,
  required?: boolean
): string => {
  const props = [
    `label="${label}"`,
    `placeholder="${placeholder}"`,
    `helperText="${helperText}"`,
    `options={${options}}`,
    ...(onChange ? [`onChange={${onChange}}`] : []),
    ...(error ? [`error={${error}}`] : []),
    ...(name ? [`name="${name}"`] : []),
    ...(required ? ['required'] : []),
  ];

  return `<Select\n  ${props.join('\n  ')}\n/>`;
};

const createAutocompleteExample = (
  label: string,
  placeholder: string,
  helperText: string,
  options: string,
  onChange?: string,
  onInputChange?: string,
  error?: boolean,
  name?: string,
  required?: boolean
): string => {
  const props = [
    `label="${label}"`,
    `placeholder="${placeholder}"`,
    `helperText="${helperText}"`,
    `options={${options}}`,
    ...(onChange ? [`onChange={${onChange}}`] : []),
    ...(onInputChange ? [`onInputChange={${onInputChange}}`] : []),
    ...(error ? [`error={${error}}`] : []),
    ...(name ? [`name="${name}"`] : []),
    ...(required ? ['required'] : []),
  ];

  return `<SelectAutocomplete\n  ${props.join('\n  ')}\n/>`;
};

// Exemplos reutilizáveis
const COUNTRY_EXAMPLE = createSelectExample(
  'País',
  'Selecione um país...',
  'Escolha seu país de residência',
  'countries',
  'handleCountryChange'
);

const CATEGORY_EXAMPLE = createSelectExample(
  'Categoria',
  'Selecione uma categoria...',
  'hasError ? "Este campo é obrigatório" : "Selecione uma categoria"',
  'categories',
  undefined,
  true
);

const PRIORITY_FORM_EXAMPLE = createSelectExample(
  'Prioridade',
  'Defina a prioridade...',
  'Selecione o nível de urgência',
  'priorities',
  undefined,
  false,
  'priority',
  true
);

export const SHARED_CODE_EXAMPLES = {
  CITY_SEARCH: createAutocompleteExample(
    'Cidade',
    'Digite para buscar cidades...',
    'Comece digitando o nome da cidade',
    'cities',
    'handleCitySelect'
  ),
  CONTROLLED_STATE: `const [inputValue, setInputValue] = useState('');
const [selectedValue, setSelectedValue] = useState('');

${createAutocompleteExample(
  'Produto',
  'Buscar produtos...',
  'Digite para filtrar produtos',
  'filteredProducts',
  'setSelectedValue',
  'setInputValue'
).replace(
  '<SelectAutocomplete',
  '<SelectAutocomplete\n  inputValue={inputValue}\n  value={selectedValue}'
)}`,
  SERVER_SEARCH: `const [options, setOptions] = useState([]);
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

${createAutocompleteExample(
  'Cliente',
  'Digite pelo menos 2 caracteres...',
  'Busca em servidor',
  'options',
  undefined,
  'handleSearch'
).replace('/>', '\n  loading={loading}\n/>')}`,
  SELECT_PATTERNS: `// Uso básico
${COUNTRY_EXAMPLE}

// Com validação
${CATEGORY_EXAMPLE}

// Em formulários
<form onSubmit={handleSubmit}>
  ${PRIORITY_FORM_EXAMPLE}
</form>`,
  AUTOCOMPLETE_PATTERNS: `// Busca em lista grande
${createAutocompleteExample(
  'Cidade',
  'Digite para buscar...',
  'Comece digitando o nome da cidade',
  'cities'
)}

// Com validação de busca
${createAutocompleteExample(
  'Produto',
  'Digite para filtrar produtos...',
  'hasError ? "Produto não encontrado" : "Digite para filtrar produtos"',
  'products',
  undefined,
  'handleSearch',
  true
)}

// Em formulários complexos
<form onSubmit={handleSubmit}>
  ${createAutocompleteExample(
    'Cliente',
    'Nome do cliente...',
    'Digite para filtrar clientes',
    'customers',
    'handleCustomerSelect',
    undefined,
    false,
    'customer',
    true
  )}
</form>`,

  SELECT_FORM_VALIDATION: `<form onSubmit={handleSubmit}>
  <Select
    name="category"
    label="Categoria"
    error={hasError}
    helperText={hasError ? "Categoria é obrigatória" : "Selecione uma categoria"}
    options={categories}
    required
  />
  <Button type="submit">Salvar</Button>
</form>`,
  SELECT_CONTROLLED_STATE: `const [priority, setPriority] = useState('');
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
/>`,
};

// Constantes compartilhadas para textos comuns
export const SHARED_TEXTS = {
  PLACEHOLDERS: {
    SELECT_OPTION: 'Selecione uma opção...',
    SELECT_COUNTRY: 'Selecione um país...',
    SELECT_CATEGORY: 'Selecione uma categoria...',
    SELECT_PRIORITY: 'Defina a prioridade...',
    SELECT_STATUS: 'Escolha o status...',
    SELECT_GENERIC: 'Selecione...',
    NOT_AVAILABLE: 'Não disponível',
  },
  HELPER_TEXTS: {
    ERROR_STATE: 'Este campo tem um erro',
    NORMAL_STATE: 'Campo em estado normal',
    DISABLED_STATE: 'Campo desabilitado',
    COUNTRY_HELP: 'Escolha seu país de residência',
    CATEGORY_HELP: 'Escolha a categoria do produto',
    PRIORITY_HELP: 'Selecione o nível de prioridade',
    STATUS_HELP: 'Defina o status atual',
    SMALL_LIST_HELP: 'Ideal para poucas opções',
    MEDIUM_LIST_HELP: 'Boa para categorias principais',
    LARGE_LIST_HELP: 'Para muitas opções, considere busca',
  },
};
