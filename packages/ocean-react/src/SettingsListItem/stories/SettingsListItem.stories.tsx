import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import SettingsListItem, { SettingListItemProps } from '../SettingsListItem';

// Interface para os controles customizados do Storybook
interface StoryControls extends SettingListItemProps {
  hasButton: boolean;
  buttonText: string;
  buttonVariant:
    | 'primary'
    | 'primaryCritical'
    | 'secondary'
    | 'secondaryCritical'
    | 'tertiary'
    | 'tertiaryCritical'
    | 'textTertiary'
    | 'textTertiaryCritical'
    | 'inverse';
  hasTag: boolean;
  tagText: string;
  tagType:
    | 'positive'
    | 'warning'
    | 'negative'
    | 'neutral'
    | 'neutral-02'
    | 'neutral-03'
    | 'default';
}

const meta: Meta<StoryControls> = {
  title: 'Components/SettingsListItem',
  component: SettingsListItem,
  tags: ['autodocs'],
  argTypes: {
    showDivider: {
      control: 'boolean',
      table: {
        category: '🎨 Aparência',
        defaultValue: { summary: 'true' },
      },
    },
    // === CONTEÚDO PRINCIPAL ===
    title: {
      description: 'Título principal do item de configuração.',
      control: 'text',
      table: {
        category: '📝 Conteúdo',
      },
    },
    description: {
      description: 'Descrição detalhada do item de configuração.',
      control: 'text',
      table: {
        category: '📝 Conteúdo',
      },
    },
    strikethroughDescription: {
      description: 'Descrição com linha cortada.',
      control: 'text',
      table: {
        category: '📝 Conteúdo',
      },
    },
    caption: {
      description: 'Legenda ou informação adicional.',
      control: 'text',
      table: {
        category: '📝 Conteúdo',
      },
    },
    errorMessage: {
      description: 'Mensagem de erro quando presente.',
      control: 'text',
      table: {
        category: '📝 Conteúdo',
      },
    },
    button: {
      control: false,
    },
    tag: {
      control: false,
    },
    // === BUTTON CONTROLS ===
    hasButton: {
      name: 'Exibir Botão',
      description: 'Mostra ou oculta o botão no item.',
      control: 'boolean',
      table: {
        category: '🔘 Button',
      },
    },
    buttonText: {
      name: 'Texto do Botão',
      description: 'Texto exibido no botão.',
      control: 'text',
      if: { arg: 'hasButton', truthy: true },
      table: {
        category: '🔘 Button',
      },
    },
    buttonVariant: {
      name: 'Variante do Botão',
      description: 'Estilo visual do botão.',
      control: 'select',
      options: [
        'primary',
        'primaryCritical',
        'secondary',
        'secondaryCritical',
        'tertiary',
        'tertiaryCritical',
        'textTertiary',
        'textTertiaryCritical',
        'inverse',
      ],
      if: { arg: 'hasButton', truthy: true },
      table: {
        category: '🔘 Button',
      },
    },

    // === TAG CONTROLS ===
    hasTag: {
      name: 'Exibir Tag',
      description: 'Mostra ou oculta a tag no item.',
      control: 'boolean',
      table: {
        category: '🏷️ Tag',
      },
    },
    tagText: {
      name: 'Texto da Tag',
      description: 'Texto exibido na tag.',
      control: 'text',
      if: { arg: 'hasTag', truthy: true },
      table: {
        category: '🏷️ Tag',
      },
    },
    tagType: {
      name: 'Tipo da Tag',
      description: 'Tipo da tag com cores predefinidas.',
      control: 'select',
      options: [
        'positive',
        'warning',
        'negative',
        'neutral',
        'neutral-02',
        'neutral-03',
        'default',
      ],
      if: { arg: 'hasTag', truthy: true },
      table: {
        category: '🏷️ Tag',
      },
    },

    // === ESTADOS E COMPORTAMENTO ===
    disabled: {
      description: 'Desabilita o item de configuração.',
      control: 'boolean',
      table: {
        category: '⚙️ Estados',
      },
    },
    loading: {
      description: 'Exibe estado de carregamento.',
      control: 'boolean',
      table: {
        category: '⚙️ Estados',
      },
    },
    type: {
      description: 'Tipo visual do item.',
      control: 'select',
      options: ['default', 'inverted'],
      table: {
        category: '🎨 Aparência',
      },
    },
    state: {
      description: 'Estado do item.',
      control: 'select',
      options: [
        'default',
        'inactive',
        'positive',
        'warning',
        'highlight',
        'highlight-light',
        'strikethrough',
      ],
      table: {
        category: '⚙️ Estados',
      },
    },
    blocked: {
      description: 'Bloqueia o item de configuração.',
      control: 'boolean',
      table: {
        category: '⚙️ Estados',
      },
    },
  },
};

export default meta;

type Story = StoryObj<StoryControls>;

export const Usage: Story = {
  args: {
    title: 'Label',
    description: 'Description',
    caption: 'Caption',
    hasButton: true,
    buttonText: 'Ativar',
    buttonVariant: 'primary',
    hasTag: false,
    tagText: 'Status',
    tagType: 'positive',
    disabled: false,
    loading: false,
    type: 'default',
  },
  render: ({
    hasButton,
    buttonText,
    buttonVariant,

    hasTag,
    tagText,
    tagType,
    ...args
  }) => (
    <SettingsListItem
      {...args}
      button={
        hasButton
          ? {
              children: buttonText,
              variant: buttonVariant,
            }
          : undefined
      }
      tag={
        hasTag
          ? {
              children: tagText,
              variant: 'default',
              type: tagType,
            }
          : undefined
      }
    />
  ),
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div style={{ width: '360px' }}>
        <StoryComponent />
      </div>
    ),
  ],
};

// Exemplos pré-configurados mostrando diferentes combinações
export const QuickExamples: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '✨ **Exemplos prontos** com as configurações mais comuns do SettingsListItem',
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '360px',
      }}
    >
      <SettingsListItem
        title="Com Button Primário"
        description="Item com botão de ação principal"
        caption="Clique para ativar"
        button={{
          children: 'Ativar',
          variant: 'primary',
          size: 'sm',
        }}
      />

      <SettingsListItem
        title="Com Tag Positiva"
        description="Item com status ativo"
        caption="Funcionalidade habilitada"
        tag={{
          children: 'Ativo',
          variant: 'default',
          type: 'positive',
        }}
      />

      <SettingsListItem
        title="Com Tag de Alerta"
        description="Item que precisa de atenção"
        caption="Configuração pendente"
        tag={{
          children: 'Atenção',
          variant: 'default',
          type: 'warning',
        }}
      />
    </div>
  ),
};

export const WithButton: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <SettingsListItem
      title="Autenticação de Dois Fatores"
      description="Adicione uma camada extra de segurança à sua conta"
      caption="Recomendado para maior segurança"
      button={{
        children: 'Ativar',
        variant: 'primary',
        size: 'sm',
      }}
    />
  ),
};

export const WithTag: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <SettingsListItem
      title="Sincronização Automática"
      description="Sincronize seus dados automaticamente em todos os dispositivos"
      caption="Última sincronização: agora"
      tag={{
        children: 'Ativo',
        variant: 'default',
      }}
    />
  ),
};

export const WithError: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <SettingsListItem
      title="Backup de Dados"
      description="Configure o backup automático dos seus dados"
      caption="Configuração pendente"
      errorMessage="Falha ao conectar com o serviço de backup"
      button={{
        children: 'Tentar Novamente',
        variant: 'secondary',
        size: 'sm',
      }}
    />
  ),
};

export const Disabled: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <SettingsListItem
      title="Análise de Comportamento"
      description="Permita que coletemos dados anônimos para melhorar o serviço"
      caption="Funcionalidade temporariamente indisponível"
      disabled
      button={{
        children: 'Configurar',
        variant: 'secondary',
        size: 'sm',
      }}
    />
  ),
};

export const Loading: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: '320px' }}>
      <SettingsListItem
        title="Tema da Interface"
        description="Escolha entre tema claro, escuro ou automático"
        caption="Aplicando alterações..."
        loading
        button={{
          children: 'Salvar',
          variant: 'primary',
          size: 'sm',
        }}
      />
    </div>
  ),
};

export const Complete: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <SettingsListItem
        title="Invertido"
        description="Item com descrição invertida"
        caption="Legenda invertida"
        type="inverted"
        button={{
          children: 'Label',
        }}
      />

      <SettingsListItem
        title="Com Botão de Ação"
        description="Item com botão para realizar ações"
        caption="Clique no botão para configurar"
        button={{
          children: 'Configurar',
          variant: 'primary',
          size: 'sm',
        }}
      />

      <SettingsListItem
        title="Com Status Ativo"
        description="Item com tag indicando status"
        caption="Funcionalidade habilitada"
        tag={{
          children: 'Ativo',
          variant: 'default',
        }}
      />

      <SettingsListItem
        title="Com Erro"
        description="Item com mensagem de erro"
        caption="Verificação falhhou"
        errorMessage="Não foi possível validar as configurações"
        button={{
          children: 'Tentar Novamente',
          variant: 'secondary',
          size: 'sm',
        }}
      />

      <SettingsListItem
        title="Carregando"
        description="Item em estado de carregamento"
        caption="Processando..."
        loading
        button={{
          children: 'Processando',
          variant: 'primary',
          size: 'sm',
        }}
      />

      <SettingsListItem
        title="Desabilitado"
        description="Item temporariamente indisponível"
        caption="Funcionalidade em manutenção"
        disabled
        tag={{
          children: 'Indisponível',
          variant: 'default',
        }}
      />
    </div>
  ),
};
