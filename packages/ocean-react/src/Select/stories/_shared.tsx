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
export interface IntroductionConfig {
  title?: string;
  description: string;
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

export interface ApiReferenceConfig {
  description: string;
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
          config.importPath ||
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
      {config.patterns.map((pattern, index) => (
        <div key={pattern.title || `pattern-${index}`}>
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
export const COMMON_SELECT_PROPS: ApiProp[] = [
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

// CSS Classes comuns para Select
export const COMMON_SELECT_CSS_CLASSES: CssClass[] = [
  {
    name: '.ods-select__root',
    description: 'Estilos aplicados ao elemento raiz.',
  },
  {
    name: '.ods-select__control',
    description: 'Estilos aplicados ao elemento de controle.',
  },
  {
    name: '.ods-select__control--expanded',
    description: 'Estilos aplicados ao controle quando o popup está aberto.',
  },
  {
    name: '.ods-select__control--filled',
    description: 'Estilos aplicados quando há uma opção selecionada.',
  },
  {
    name: '.ods-select__control--error',
    description: 'Estilos aplicados ao controle quando error=true.',
  },
  {
    name: '.ods-select__value',
    description: 'Estilos aplicados ao elemento de valor.',
  },
  {
    name: '.ods-select__value--empty',
    description: 'Estilos aplicados ao valor quando o placeholder aparece.',
  },
  {
    name: '.ods-select__arrow',
    description: 'Estilos aplicados ao elemento de seta.',
  },
  {
    name: '.ods-select__arrow--down',
    description: 'Estilos aplicados à seta quando o popup está fechado.',
  },
  {
    name: '.ods-select__arrow--up',
    description: 'Estilos aplicados à seta quando o popup está aberto.',
  },
  {
    name: '.ods-select__arrow--disabled',
    description: 'Estilos aplicados à seta quando disabled=true.',
  },
  {
    name: '.ods-select__listbox-wrapper',
    description: 'Estilos aplicados ao elemento popup.',
  },
  {
    name: '.ods-select__listbox',
    description: 'Estilos aplicados ao elemento listbox.',
  },
  {
    name: '.ods-select__option',
    description: 'Estilos aplicados ao elemento de opção.',
  },
  {
    name: '.ods-select__option--selected',
    description: 'Estilos aplicados à opção selecionada no listbox.',
  },
  {
    name: '.ods-select__option--disabled',
    description: 'Estilos aplicados à opção desabilitada no listbox.',
  },
];

// Factory para criar demonstração de estados
export const createStatesDemo = (
  Component: React.ComponentType<any>,
  options: Array<{ value: string; label: string }>
): React.FC => {
  const StatesDemoComponent = (): JSX.Element => (
    <div style={sharedContainerStyles.showcase}>
      <Component
        label="Campo com Erro"
        placeholder="Selecione uma opção..."
        helperText="Este campo tem um erro"
        error
        options={options}
      />
      <Component
        label="Campo Normal"
        placeholder="Selecione uma opção..."
        helperText="Campo em estado normal"
        options={options}
      />
      <Component
        label="Campo Desabilitado"
        placeholder="Não disponível"
        helperText="Campo desabilitado"
        disabled
        options={options}
      />
    </div>
  );
  return StatesDemoComponent;
};

// Factory para criar demonstração de tipos de dados
export const createDataTypesDemo = (
  Component: React.ComponentType<any>
): React.FC => {
  const DataTypesDemoComponent = (): JSX.Element => (
    <div style={sharedContainerStyles.showcase}>
      <Component
        label="País"
        placeholder="Selecione um país..."
        helperText="Escolha seu país de residência"
        options={SELECT_COMMON_DATA.COUNTRIES}
      />
      <Component
        label="Categoria"
        placeholder="Selecione uma categoria..."
        helperText="Escolha a categoria do produto"
        options={SELECT_COMMON_DATA.CATEGORIES}
      />
      <Component
        label="Prioridade"
        placeholder="Defina a prioridade..."
        helperText="Selecione o nível de prioridade"
        options={SELECT_COMMON_DATA.PRIORITIES}
      />
      <Component
        label="Status"
        placeholder="Escolha o status..."
        helperText="Defina o status atual"
        options={SELECT_COMMON_DATA.STATUSES}
      />
    </div>
  );
  return DataTypesDemoComponent;
};

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
