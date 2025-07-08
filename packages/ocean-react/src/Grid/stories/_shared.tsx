import React from 'react';
import * as DocBlock from '@storybook/blocks';

// Componentes compartilhados para demos
export const DEMO_STYLE = {
  padding: '20px',
  backgroundColor: '#f0f0f0',
  border: '1px solid #ccc',
  textAlign: 'center',
} as const;

export const DemoWrapper = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => (
  <div className="show-grid">
    <div style={{ display: 'flex', gap: '10px' }}>{children}</div>
  </div>
);

export const DemoContent = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => <div style={DEMO_STYLE}>{children}</div>;

// Componentes específicos para Container
export const ContainerDemoContent = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => <div style={DEMO_STYLE}>{children}</div>;

export const ContainerDemoWrapper = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => (
  <div style={{ backgroundColor: '#e0e0e0', padding: '10px' }}>{children}</div>
);

// Decorator comum para stories
export const createStoryDecorator = (
  minWidth = '300px'
): Array<(StoryComponent: React.ComponentType) => JSX.Element> => [
  (StoryComponent: React.ComponentType): JSX.Element => (
    <div className="show-grid" style={{ minWidth }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <StoryComponent />
      </div>
    </div>
  ),
];

// Decorator específico para Container
export const createContainerStoryDecorator = (): Array<
  (StoryComponent: React.ComponentType) => JSX.Element
> => [
  (StoryComponent: React.ComponentType): JSX.Element => (
    <div
      style={{
        minWidth: '500px',
        backgroundColor: '#e0e0e0',
        padding: '10px',
      }}
    >
      <StoryComponent />
    </div>
  ),
];

// Função para criar tabela de API reference
export const createApiReferenceTable = (
  componentName: string,
  breakpointConfigs: Record<string, string>,
  typeSummary: string,
  additionalProps: Array<{
    prop: string;
    type: string;
    default: string;
    description: string;
  }> = []
): (() => JSX.Element) => {
  const ApiReferenceComponent = (): JSX.Element => {
    const breakpointProps = Object.entries(breakpointConfigs).map(
      ([key, description]) => (
        <tr key={key}>
          <td>{key}</td>
          <td>
            <code>{typeSummary}</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>{description}</td>
        </tr>
      )
    );

    return (
      <>
        <DocBlock.Heading>Referência da API</DocBlock.Heading>
        <DocBlock.Markdown>
          {`O ${componentName} é baseado no elemento div e suporta todos os atributos HTML padrão.`}
        </DocBlock.Markdown>
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
            {additionalProps.map((prop) => (
              <tr key={prop.prop}>
                <td>{prop.prop}</td>
                <td>
                  <code>{prop.type}</code>
                </td>
                <td>
                  <code>{prop.default}</code>
                </td>
                <td>{prop.description}</td>
              </tr>
            ))}
            {breakpointProps}
          </tbody>
        </table>
        <DocBlock.Markdown>
          A ref é encaminhada para o elemento div. Qualquer outra prop fornecida
          será passada para o elemento div.
        </DocBlock.Markdown>
      </>
    );
  };

  ApiReferenceComponent.displayName = 'ApiReferenceComponent';
  return ApiReferenceComponent;
};
