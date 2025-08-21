import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Progress from '../Progress';

// Estilos reutilizáveis
const commonStyles = {
  flexContainer: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  container: {
    padding: '16px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
  },
  lightContainer: {
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  sectionTitle: {
    margin: '0 0 12px 0',
    fontSize: '14px',
    fontWeight: '500',
  },
} as const;

// Componente reutilizável para container de progresso
const ProgressContainer: React.FC<{
  children: React.ReactNode;
  variant?: 'light' | 'dark';
  style?: React.CSSProperties;
}> = ({ children, variant = 'light', style }) => (
  <div
    style={{
      ...commonStyles.container,
      ...(variant === 'dark'
        ? commonStyles.darkContainer
        : commonStyles.lightContainer),
      ...style,
    }}
  >
    {children}
  </div>
);

// Componente reutilizável para seção com título
const Section: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div>
    <h4 style={commonStyles.sectionTitle}>{title}</h4>
    {children}
  </div>
);

// Componente reutilizável para mostrar todos os tamanhos
const AllSizes: React.FC<{ onColor?: boolean }> = ({ onColor = false }) => (
  <div style={commonStyles.flexContainer}>
    <Progress size="sm" onColor={onColor} />
    <Progress size="md" onColor={onColor} />
    <Progress size="lg" onColor={onColor} />
  </div>
);

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: 'O tamanho do componente de progresso.',
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    onColor: {
      description:
        'Define se o progresso deve ser exibido sobre fundo colorido.',
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Usage: Story = {
  args: {
    size: 'md',
    onColor: false,
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          minWidth: '300px',
          ...commonStyles.flexContainer,
          justifyContent: 'center',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <AllSizes />,
};

export const OnColor: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <ProgressContainer variant="dark">
        <Progress onColor />
      </ProgressContainer>
      <ProgressContainer variant="light">
        <Progress />
      </ProgressContainer>
    </div>
  ),
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Section title="Tamanhos (fundo claro)">
        <ProgressContainer variant="light">
          <AllSizes />
        </ProgressContainer>
      </Section>

      <Section title="Tamanhos (fundo escuro)">
        <ProgressContainer variant="dark">
          <AllSizes onColor />
        </ProgressContainer>
      </Section>
    </div>
  ),
};
