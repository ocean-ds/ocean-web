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
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
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

// Configurações comuns
const commonConfig = {
  gaps: {
    small: '16px',
    large: '24px',
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

// Componente reutilizável para layout vertical
const VerticalLayout: React.FC<{
  children: React.ReactNode;
  gap?: string;
  style?: React.CSSProperties;
}> = ({ children, gap = commonConfig.gaps.small, style }) => (
  <div style={{ ...commonStyles.flexColumn, gap, ...style }}>{children}</div>
);

// Componente reutilizável para decorator comum
const CommonDecorator: React.FC<{
  children: React.ReactNode;
  minWidth?: string;
  justifyContent?: string;
}> = ({ children, minWidth = '300px', justifyContent = 'center' }) => (
  <div
    style={{
      minWidth,
      ...commonStyles.flexContainer,
      justifyContent,
    }}
  >
    {children}
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
      <CommonDecorator>
        <StoryComponent />
      </CommonDecorator>
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
    <VerticalLayout>
      <ProgressContainer variant="dark">
        <Progress onColor />
      </ProgressContainer>
      <ProgressContainer variant="light">
        <Progress />
      </ProgressContainer>
    </VerticalLayout>
  ),
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <VerticalLayout gap={commonConfig.gaps.large}>
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
    </VerticalLayout>
  ),
};
