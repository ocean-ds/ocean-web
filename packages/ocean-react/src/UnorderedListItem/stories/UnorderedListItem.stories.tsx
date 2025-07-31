import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  Cash,
  CashOutline,
  LockClosedOutline,
  CheckCircleOutline,
  SupportOutline,
} from '@useblu/ocean-icons-react';
import UnorderedListItem from '../UnorderedListItem';

const meta: Meta<typeof UnorderedListItem> = {
  title: 'Components/List/UnorderedListItem',
  component: UnorderedListItem,
  tags: ['autodocs'],
  argTypes: {
    description: {
      description: 'Texto descritivo do item da lista.',
      control: 'text',
    },
    iconVariant: {
      description: 'A variante do ícone a ser exibido.',
      control: 'select',
      options: ['chevron', 'outline', 'solid'],
    },
    icon: {
      description:
        'Ícone personalizado a ser exibido (quando iconVariant não é chevron).',
      control: { type: null },
    },
    title: {
      description: 'Título opcional do item da lista.',
      control: 'text',
    },
    className: {
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof UnorderedListItem>;

const STORY_STYLES = {
  centeredContainer: {
    minWidth: '300px',
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
  } as React.CSSProperties,
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '300px',
  } as React.CSSProperties,
  rowContainer: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  } as React.CSSProperties,
};

// Story principal com controles ativos
export const Usage: Story = {
  args: {
    description:
      'Lorem ipsum dolor sit amet consectetur porta feugiat faucibus scelerisque.',
    iconVariant: 'outline',
    title: 'Lorem ipsum',
    icon: CashOutline,
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div style={STORY_STYLES.centeredContainer}>
        <StoryComponent />
      </div>
    ),
  ],
};

// Variantes de ícone

export const IconVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={STORY_STYLES.columnContainer}>
      <UnorderedListItem
        title="Ícone chevron padrão"
        description="Usa seta para direita como ícone de navegação"
        iconVariant="chevron"
      />
      <UnorderedListItem
        title="Ícone outline personalizado"
        description="Ícone outline com 24px de tamanho"
        iconVariant="outline"
        icon={CashOutline}
      />
      <UnorderedListItem
        title="Ícone solid personalizado"
        description="Ícone solid com 20px de tamanho"
        iconVariant="solid"
        icon={Cash}
      />
    </div>
  ),
};

// Com título
export const WithTitle: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={STORY_STYLES.columnContainer}>
      <UnorderedListItem
        title="Título do item"
        description="Descrição detalhada do item com título"
        iconVariant="outline"
        icon={CashOutline}
      />
      <UnorderedListItem
        title="Item com chevron"
        description="Descrição com chevron padrão"
        iconVariant="chevron"
      />
      <UnorderedListItem
        title="Segurança avançada"
        description="Seus dados estão protegidos com criptografia de ponta a ponta"
        iconVariant="solid"
        icon={LockClosedOutline}
      />
    </div>
  ),
};

// Sem título
export const WithoutTitle: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={STORY_STYLES.columnContainer}>
      <UnorderedListItem
        description="Item sem título, apenas descrição"
        iconVariant="outline"
        icon={CashOutline}
      />
      <UnorderedListItem
        description="Item simples com chevron para navegação"
        iconVariant="chevron"
      />
      <UnorderedListItem
        description="Processamento instantâneo de transações"
        iconVariant="solid"
        icon={CheckCircleOutline}
      />
    </div>
  ),
};

// Lista de benefícios
export const BenefitsList: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={STORY_STYLES.columnContainer}>
      <UnorderedListItem
        title="Segurança"
        description="Seus dados estão protegidos com criptografia de ponta a ponta"
        iconVariant="solid"
        icon={LockClosedOutline}
      />
      <UnorderedListItem
        title="Velocidade"
        description="Transações processadas em segundos"
        iconVariant="solid"
        icon={CheckCircleOutline}
      />
      <UnorderedListItem
        title="Suporte 24/7"
        description="Atendimento disponível a qualquer momento"
        iconVariant="solid"
        icon={SupportOutline}
      />
    </div>
  ),
};

// Navegação simples
export const NavigationList: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={STORY_STYLES.columnContainer}>
      <UnorderedListItem
        description="Configurações da conta"
        iconVariant="chevron"
      />
      <UnorderedListItem
        description="Histórico de transações"
        iconVariant="chevron"
      />
      <UnorderedListItem
        description="Preferências de notificação"
        iconVariant="chevron"
      />
      <UnorderedListItem description="Central de ajuda" iconVariant="chevron" />
    </div>
  ),
};
