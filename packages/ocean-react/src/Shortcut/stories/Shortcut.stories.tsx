import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PlaceholderOutline } from '@useblu/ocean-icons-react';
import Shortcut from '../Shortcut';

// Estilos reutilizáveis
const commonStyles = {
  flexContainer: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  flexContainerStart: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
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
  minWidth: '300px',
} as const;

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

// Componente reutilizável para layout horizontal
const HorizontalLayout: React.FC<{
  children: React.ReactNode;
  align?: 'center' | 'flex-start';
  gap?: string;
  style?: React.CSSProperties;
}> = ({ children, align = 'center', gap = commonConfig.gaps.small, style }) => (
  <div
    style={{
      ...(align === 'center'
        ? commonStyles.flexContainer
        : commonStyles.flexContainerStart),
      gap,
      ...style,
    }}
  >
    {children}
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
  padding?: string;
}> = ({
  children,
  minWidth = commonConfig.minWidth,
  justifyContent = 'center',
  padding = '16px',
}) => (
  <div
    style={{
      minWidth,
      ...commonStyles.flexContainer,
      justifyContent,
      padding,
    }}
  >
    {children}
  </div>
);

const meta: Meta<typeof Shortcut> = {
  title: 'Components/Shortcut',
  component: Shortcut,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Texto do label do atalho.',
      control: 'text',
    },
    description: {
      description:
        'Descrição adicional do atalho (apenas para tamanho medium).',
      control: 'text',
    },
    icon: {
      description: 'Ícone do atalho.',
      control: false,
    },
    size: {
      description: 'O tamanho do componente de atalho.',
      control: 'select',
      options: ['tiny', 'small', 'medium'],
    },
    orientation: {
      description: 'A orientação do layout do atalho.',
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    blocked: {
      description: 'Define se o atalho está bloqueado.',
      control: 'boolean',
    },
    disabled: {
      description: 'Desabilita o atalho.',
      control: 'boolean',
    },
    fullWidth: {
      description: 'Faz o atalho ocupar toda a largura disponível.',
      control: 'boolean',
    },
    count: {
      description: 'Número exibido no badge do atalho.',
      control: 'number',
    },
    tag: {
      description: 'Tag exibida no atalho.',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Shortcut>;

export const Usage: Story = {
  args: {
    label: 'Meu Atalho',
    description: 'Descrição do atalho para navegação rápida.',
    icon: <PlaceholderOutline />,
    size: 'medium',
    orientation: 'horizontal',
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
  render: () => (
    <HorizontalLayout align="flex-start">
      <Shortcut label="Tiny" icon={<PlaceholderOutline />} size="tiny" />
      <Shortcut label="Small" icon={<PlaceholderOutline />} size="small" />
      <Shortcut
        label="Medium"
        description="Com descrição"
        icon={<PlaceholderOutline />}
        size="medium"
      />
    </HorizontalLayout>
  ),
};

export const Orientations: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <HorizontalLayout align="flex-start" gap={commonConfig.gaps.large}>
      <Shortcut
        label="Horizontal"
        description="Orientação horizontal (padrão)"
        icon={<PlaceholderOutline />}
        orientation="horizontal"
      />
      <Shortcut
        label="Vertical"
        description="Orientação vertical"
        icon={<PlaceholderOutline />}
        orientation="vertical"
      />
    </HorizontalLayout>
  ),
};

export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <HorizontalLayout align="flex-start">
      <Shortcut label="Normal" icon={<PlaceholderOutline />} />
      <Shortcut label="Bloqueado" icon={<PlaceholderOutline />} blocked />
      <Shortcut label="Desabilitado" icon={<PlaceholderOutline />} disabled />
    </HorizontalLayout>
  ),
};

export const WithBadge: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <HorizontalLayout align="flex-start">
      <Shortcut label="Com Badge" icon={<PlaceholderOutline />} count={5} />
      <Shortcut label="Com Tag" icon={<PlaceholderOutline />} tag="Novo" />
    </HorizontalLayout>
  ),
};

export const FullWidth: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <VerticalLayout style={{ minWidth: commonConfig.minWidth }}>
      <Shortcut
        label="Atalho Normal"
        description="Sem fullWidth"
        icon={<PlaceholderOutline />}
      />
      <Shortcut
        label="Atalho Full Width"
        description="Com fullWidth ativado"
        icon={<PlaceholderOutline />}
        fullWidth
      />
    </VerticalLayout>
  ),
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <VerticalLayout gap={commonConfig.gaps.large}>
      <Section title="Tamanhos:">
        <HorizontalLayout align="flex-start">
          <Shortcut label="Tiny" icon={<PlaceholderOutline />} size="tiny" />
          <Shortcut label="Small" icon={<PlaceholderOutline />} size="small" />
          <Shortcut
            label="Medium"
            description="Com descrição"
            icon={<PlaceholderOutline />}
            size="medium"
          />
        </HorizontalLayout>
      </Section>

      <Section title="Estados:">
        <HorizontalLayout align="flex-start">
          <Shortcut label="Normal" icon={<PlaceholderOutline />} />
          <Shortcut label="Bloqueado" icon={<PlaceholderOutline />} blocked />
          <Shortcut
            label="Desabilitado"
            icon={<PlaceholderOutline />}
            disabled
          />
        </HorizontalLayout>
      </Section>
    </VerticalLayout>
  ),
};
