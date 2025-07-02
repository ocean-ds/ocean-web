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
