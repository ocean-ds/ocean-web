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
  decorator: {
    minWidth: '300px',
  },
};

// Tipos para configuração de componentes de documentação
export interface IntroductionConfig {
  title?: string;
  description: string;
  overview: string;
  characteristics: Array<{
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

export interface BestPracticesSection {
  title: string;
  items: string[];
}

export interface BestPracticesConfig {
  sections: BestPracticesSection[];
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
  description?: string;
  props: ApiProp[];
  additionalTypes?: Array<{
    name: string;
    code: string;
  }>;
  footer?: string;
}

// Factory para criar componente de Introdução
export const createIntroduction = (config: IntroductionConfig): React.FC => {
  const IntroductionComponent = (): JSX.Element => (
    <>
      <DocBlock.Title />
      <DocBlock.Markdown>{config.description}</DocBlock.Markdown>
      <DocBlock.Heading>Visão Geral</DocBlock.Heading>
      <DocBlock.Markdown>{config.overview}</DocBlock.Markdown>
      <h3>Principais Características</h3>
      <ul>
        {config.characteristics.map((char) => (
          <li key={char.title}>
            <strong>{char.title}</strong>: {char.description}
          </li>
        ))}
      </ul>
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
      {config.patterns.map((pattern) => (
        <React.Fragment key={pattern.code.slice(0, 50)}>
          {pattern.title && <h3>{pattern.title}</h3>}
          <DocBlock.Source dark code={pattern.code} />
        </React.Fragment>
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
        <React.Fragment key={section.title}>
          <h3>{section.title}</h3>
          <ul>
            {section.items.map((item) => (
              <li key={item.slice(0, 30)}>{item}</li>
            ))}
          </ul>
        </React.Fragment>
      ))}
    </>
  );
  return BestPracticesComponent;
};

// Factory para criar componente de Classes CSS
export const createCssClasses = (classes: CssClass[]): React.FC => {
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
          {classes.map((cssClass) => (
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
      <DocBlock.Heading>Referência da API</DocBlock.Heading>
      {config.description && (
        <DocBlock.Markdown>{config.description}</DocBlock.Markdown>
      )}
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
              <td>{prop.name}</td>
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

      {config.additionalTypes?.map((type) => (
        <React.Fragment key={type.name}>
          <h4>{type.name}</h4>
          <DocBlock.Source dark code={type.code} />
        </React.Fragment>
      ))}

      {config.footer && <DocBlock.Markdown>{config.footer}</DocBlock.Markdown>}
    </>
  );
  return ApiReferenceComponent;
};

// Factory para criar lista de itens com código
export const createCodeList = (
  items: Array<{ code: string; description: string }>
): React.FC => {
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

// Factory para criar descrição de estados
export const createStatesDescription = (
  states: Array<{ state: string; description: string }>
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

// Helper para criar decorator padrão
export const createDefaultDecorator = (
  style?: React.CSSProperties
): Array<(StoryComponent: React.ComponentType) => JSX.Element> => [
  (StoryComponent: React.ComponentType): JSX.Element => (
    <div style={{ ...sharedContainerStyles.decorator, ...style }}>
      <StoryComponent />
    </div>
  ),
];

// Common argTypes para formulários
export const commonFormArgTypes = {
  label: {
    description: 'O rótulo do campo.',
    control: 'text',
  },
  helperText: {
    description: 'Texto de ajuda exibido abaixo do campo.',
    control: 'text',
  },
  placeholder: {
    description: 'Texto do placeholder.',
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
