import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import SettingsListItem, { SettingListItemProps } from '../SettingsListItem';

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
    // === CONTEÚDO PRINCIPAL ===
    title: {
      description: 'Título principal do item de configuração (obrigatório).',
      control: 'text',
      table: {
        category: '📝 Conteúdo',
        type: { summary: 'string' },
      },
    },
    description: {
      description: 'Descrição detalhada do item de configuração (opcional).',
      control: 'text',
      table: {
        category: '📝 Conteúdo',
        type: { summary: 'string' },
      },
    },
    strikethroughDescription: {
      description:
        'Texto a ser exibido com linha cortada quando state="strikethrough" e type="inverted" (opcional).',
      control: 'text',
      table: {
        category: '📝 Conteúdo',
        type: { summary: 'string' },
      },
    },
    caption: {
      description: 'Legenda ou informação adicional em destaque (opcional).',
      control: 'text',
      table: {
        category: '📝 Conteúdo',
        type: { summary: 'string' },
      },
    },
    errorMessage: {
      description: 'Mensagem de erro exibida abaixo do conteúdo (opcional).',
      control: 'text',
      table: {
        category: '📝 Conteúdo',
        type: { summary: 'string' },
      },
    },

    // === APARÊNCIA ===
    showDivider: {
      description: 'Controla se deve exibir o divisor visual do item.',
      control: 'boolean',
      table: {
        category: '🎨 Aparência',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    type: {
      description:
        'Tipo visual que inverte a hierarquia do título e descrição.',
      control: 'select',
      options: ['default', 'inverted'],
      table: {
        category: '🎨 Aparência',
        type: { summary: "'default' | 'inverted'" },
        defaultValue: { summary: "'default'" },
      },
    },

    // === ESTADOS E COMPORTAMENTO ===
    disabled: {
      description: 'Desabilita o item e todos os elementos internos.',
      control: 'boolean',
      table: {
        category: '⚙️ Estados',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      description: 'Exibe skeleton de carregamento substituindo o conteúdo.',
      control: 'boolean',
      table: {
        category: '⚙️ Estados',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    state: {
      description: 'Estado visual do item que afeta cores e estilos.',
      control: 'select',
      options: [
        'default',
        'inactive',
        'positive',
        'warning',
        'highlight',
        'highlight-lead',
        'strikethrough',
      ],
      table: {
        category: '⚙️ Estados',
        type: {
          summary:
            "'default' | 'inactive' | 'positive' | 'warning' | 'highlight' | 'highlight-lead' | 'strikethrough'",
        },
        defaultValue: { summary: "'default'" },
      },
    },
    blocked: {
      description: 'Exibe ícone de cadeado indicando funcionalidade bloqueada.',
      control: 'boolean',
      table: {
        category: '⚙️ Estados',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },

    // === PROPS INTERNAS (não editáveis diretamente) ===
    button: {
      description:
        'Props do Button. Use os controles "Button" abaixo para configurar.',
      control: false,
      table: {
        category: '🔧 Props Internas',
        type: { summary: 'ButtonProps' },
      },
    },
    tag: {
      description:
        'Props da Tag. Use os controles "Tag" abaixo para configurar.',
      control: false,
      table: {
        category: '🔧 Props Internas',
        type: { summary: 'TagProps' },
      },
    },

    // === CONTROLES DO PLAYGROUND (Button) ===
    hasButton: {
      name: 'Exibir Botão',
      description: 'Mostra ou oculta o botão no item.',
      control: 'boolean',
      table: {
        category: '🔘 Button (Playground)',
      },
    },
    buttonText: {
      name: 'Texto do Botão',
      description: 'Texto exibido no botão.',
      control: 'text',
      if: { arg: 'hasButton', truthy: true },
      table: {
        category: '🔘 Button (Playground)',
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
        category: '🔘 Button (Playground)',
      },
    },

    // === CONTROLES DO PLAYGROUND (Tag) ===
    hasTag: {
      name: 'Exibir Tag',
      description: 'Mostra ou oculta a tag no item.',
      control: 'boolean',
      table: {
        category: '🏷️ Tag (Playground)',
      },
    },
    tagText: {
      name: 'Texto da Tag',
      description: 'Texto exibido na tag.',
      control: 'text',
      if: { arg: 'hasTag', truthy: true },
      table: {
        category: '🏷️ Tag (Playground)',
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
        category: '🏷️ Tag (Playground)',
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
    state: 'default',
    showDivider: true,
    blocked: false,
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
          '✨ **Exemplos de uso** mostrando as principais combinações de props do SettingsListItem com Button e Tag.',
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

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '🎨 **Estados visuais** demonstrando diferentes valores da prop `state` e seus efeitos visuais.',
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
        width: '400PX',
      }}
    >
      <SettingsListItem
        title="Estado Padrão"
        description="Item em estado normal de funcionamento"
        caption="Configuração ativa"
        state="default"
        tag={{ children: 'Normal', variant: 'default', type: 'neutral' }}
      />

      <SettingsListItem
        title="Estado Inativo"
        description="Item temporariamente desativado"
        caption="Funcionalidade pausada"
        state="inactive"
        type="inverted"
        tag={{ children: 'Inativo', variant: 'default', type: 'neutral-02' }}
      />

      <SettingsListItem
        title="Estado Positivo"
        description="Item funcionando perfeitamente"
        caption="Tudo funcionando bem"
        state="positive"
        type="inverted"
        tag={{ children: 'Sucesso', variant: 'default', type: 'positive' }}
      />

      <SettingsListItem
        title="Estado de Aviso"
        description="Item que precisa de atenção"
        caption="Verificação recomendada"
        state="warning"
        type="inverted"
        tag={{ children: 'Atenção', variant: 'default', type: 'warning' }}
      />

      <SettingsListItem
        title="Estado em Destaque"
        description="Item destacado para chamar atenção"
        caption="Configuração importante"
        state="highlight"
        type="inverted"
        button={{ children: 'Configurar', variant: 'primary', size: 'sm' }}
      />

      <SettingsListItem
        title="Destaque Principal"
        description="Item com máxima prioridade visual"
        caption="Ação prioritária necessária"
        state="highlight-lead"
        button={{
          children: 'Ação Prioritária',
          variant: 'primary',
          size: 'sm',
        }}
      />
    </div>
  ),
};

export const InvertedType: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '🔄 **Tipo invertido** demonstrando como `type="inverted"` altera a hierarquia visual do título e descrição.',
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
        width: '600PX',
      }}
    >
      <SettingsListItem
        title="Notificações Push"
        description="Tipo padrão - título maior, descrição menor"
        caption="Hierarquia normal"
        type="inverted"
        button={{ children: 'Configurar', variant: 'secondary', size: 'sm' }}
      />

      <SettingsListItem
        title="Notificações Push"
        description="Tipo invertido - descrição maior, título menor"
        caption="Hierarquia invertida"
        type="inverted"
        button={{ children: 'Configurar', variant: 'secondary', size: 'sm' }}
      />

      <SettingsListItem
        title="Configuração Avançada"
        description="No tipo invertido, a descrição ganha mais destaque visual"
        caption="Ideal quando a descrição é mais importante"
        type="inverted"
        state="highlight"
        tag={{ children: 'Avançado', variant: 'default', type: 'neutral-03' }}
      />
    </div>
  ),
};

export const StrikethroughExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '✂️ **Texto cortado** demonstrando como usar `strikethroughDescription` com `type="inverted"` e `state="strikethrough"`.',
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
        width: '600',
      }}
    >
      <SettingsListItem
        title="Plano Premium"
        description="Novo preço: R$ 29,90/mês"
        strikethroughDescription="Preço antigo: R$ 39,90/mês"
        caption="Oferta limitada até o final do mês"
        type="inverted"
        state="strikethrough"
        button={{ children: 'Assinar', variant: 'primary', size: 'sm' }}
      />

      <SettingsListItem
        title="Upgrade de Conta"
        description="Funcionalidades premium liberadas"
        strikethroughDescription="Conta básica"
        caption="Upgrade realizado com sucesso"
        type="inverted"
        state="strikethrough"
        tag={{ children: 'Atualizado', variant: 'default', type: 'positive' }}
      />
    </div>
  ),
};

export const BlockedItems: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '🔒 **Itens bloqueados** demonstrando o uso da prop `blocked` que exibe ícone de cadeado.',
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
        title="Funcionalidade Premium"
        description="Esta funcionalidade está disponível apenas no plano premium"
        caption="Faça upgrade para acessar"
        blocked
      />

      <SettingsListItem
        title="Análise Avançada"
        description="Relatórios detalhados e insights personalizados"
        caption="Bloqueado - upgrade necessário"
        blocked
      />

      <SettingsListItem
        title="API Enterprise"
        description="Acesso completo à API com limites estendidos"
        caption="Funcionalidade corporativa"
        blocked
        disabled
      />

      <SettingsListItem
        title="Funcionalidade Premium"
        description="Esta funcionalidade está disponível apenas no plano premium"
        caption="Faça upgrade para acessar"
        blocked
        type="inverted"
      />
    </div>
  ),
};

export const Complete: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '📚 **Visão geral completa** com exemplos dos principais casos de uso do componente.',
      },
    },
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
