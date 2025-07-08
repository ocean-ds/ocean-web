import React from 'react';

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
