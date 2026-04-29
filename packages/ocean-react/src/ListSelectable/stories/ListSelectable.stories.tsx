import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Badge from '../../Badge';
import Tag from '../../Tag';
import ListSelectable from '../ListSelectable';

import List from '../../List';

const storyStyles = {
  container: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '16px',
    width: '360px',
  },
  gridContainer: {
    display: 'grid' as const,
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    width: '100%',
    maxWidth: '800px',
  },
  singleItem: {
    width: '360px',
  },
};

const category = {
  content: '📝 Conteúdo',
  appearance: '🎨 Aparência',
  state: '⚙️ Estado',
  config: '⚙️ Configuração',
};

const meta: Meta<typeof ListSelectable> = {
  title: 'Components/List/ListSelectable',
  component: ListSelectable,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Título principal do item (obrigatório).',
      control: 'text',
      table: {
        category: category.content,
        type: { summary: 'string' },
      },
    },
    description: {
      description: 'Descrição detalhada do item (opcional).',
      control: 'text',
      table: {
        category: category.content,
        type: { summary: 'string' },
      },
    },
    strikethroughDescription: {
      description:
        'Texto a ser exibido com linha cortada quando state="strikethrough" e type="inverted" (opcional).',
      control: 'text',
      table: {
        category: category.content,
        type: { summary: 'string' },
      },
    },
    caption: {
      description: 'Legenda ou informação adicional em destaque (opcional).',
      control: 'text',
      table: {
        category: category.content,
        type: { summary: 'string' },
      },
    },
    inverted: {
      description: 'Inverte a hierarquia do título e descrição.',
      control: 'boolean',
      table: {
        category: category.appearance,
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    status: {
      description: 'Tipo visual que define o estilo do conteúdo.',
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
        category: category.appearance,
        type: {
          summary:
            "'default' | 'inactive' | 'positive' | 'warning' | 'highlight' | 'highlight-lead' | 'strikethrough'",
        },
        defaultValue: { summary: "'default'" },
      },
    },
    type: {
      description: 'Define o estilo do container (texto ou card).',
      control: 'inline-radio',
      options: ['text', 'card'],
      table: {
        category: category.appearance,
        type: { summary: "'text' | 'card'" },
        defaultValue: { summary: "'text'" },
      },
    },
    showDivider: {
      description: 'Controla se deve exibir o divisor visual do item.',
      control: 'boolean',
      table: {
        category: category.appearance,
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    loading: {
      description: 'Exibe estado de carregamento com skeleton.',
      control: 'boolean',
      table: {
        category: category.state,
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      description: 'Desabilita o item, tornando-o não interativo.',
      control: 'boolean',
      table: {
        category: category.state,
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    platform: {
      description: 'Define a plataforma para ajustes visuais específicos.',
      control: 'inline-radio',
      options: ['web', 'app'],
      table: {
        category: category.config,
        type: { summary: "'web' | 'app'" },
        defaultValue: { summary: "'web'" },
      },
    },
    isSelectableDisabled: {
      description:
        'Quando `true`, oculta os controles de seleção (checkbox/radio) e renderiza o conteúdo como `ListReadOnly`.',
      control: 'boolean',
      table: {
        category: category.state,
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    checkbox: {
      table: { disable: true },
    },
    radio: {
      table: { disable: true },
    },
    indicator: {
      table: { disable: true },
    },
    className: {
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ListSelectable>;

export const Usage: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    checkbox: { id: 'checkbox-usage' },
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div style={storyStyles.singleItem}>
        <StoryComponent />
      </div>
    ),
  ],
};

// Checkbox States
export const CheckboxStates: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={storyStyles.container}>
      <ListSelectable
        title="Title"
        description="Description"
        checkbox={{ id: 'checkbox-default' }}
        showDivider
      />
      <ListSelectable
        title="Title"
        description="Com check"
        checkbox={{ id: 'checkbox-checked', checked: true }}
        showDivider
      />
      <ListSelectable
        title="Title"
        description="Indeterminado"
        checkbox={{ id: 'checkbox-indeterminate', indeterminate: true }}
        showDivider
      />
      <ListSelectable
        title="Title"
        description="Desabilitado e selecionado"
        checkbox={{ id: 'checkbox-disabled', disabled: true, checked: true }}
        showDivider
      />
      <ListSelectable
        title="Title"
        description="Desabilitado"
        checkbox={{ id: 'checkbox-disabled-checked', disabled: true }}
        disabled
        showDivider
      />
      <ListSelectable
        title="Title"
        description="Erro"
        checkbox={{ id: 'checkbox-error', error: true }}
        showDivider
      />
    </div>
  ),
};

// Radio States
export const RadioStates: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={storyStyles.container}>
      <ListSelectable
        title="Title"
        description="Description"
        radio={{ id: 'radio-default', name: 'radio-group' }}
        showDivider
      />
      <ListSelectable
        title="Title"
        description="Description"
        radio={{ id: 'radio-selected', name: 'radio-group', checked: true }}
        showDivider
      />
      <ListSelectable
        title="Title"
        description="Desabilitado e selecionado"
        radio={{
          id: 'radio-disabled',
          name: 'radio-group-2',
          checked: true,
          disabled: true,
        }}
        showDivider
      />
      <ListSelectable
        title="Title"
        description="Desabilitado"
        radio={{
          id: 'radio-disabled-selected',
          name: 'radio-group-3',
          disabled: true,
        }}
        disabled
        showDivider
      />
      <ListSelectable
        title="Title"
        description="Erro"
        radio={{ id: 'radio-error', error: true }}
        showDivider
      />
    </div>
  ),
};

// Text Type
export const TextType: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={storyStyles.container}>
      <ListSelectable
        type="text"
        title="Title"
        description="Description"
        checkbox={{ id: 'checkbox-text' }}
        showDivider
      />
      <ListSelectable
        type="text"
        title="Title"
        description="Selected"
        checkbox={{ id: 'checkbox-text-selected', checked: true }}
        showDivider
      />
      <ListSelectable
        type="text"
        title="Title"
        description="Disabled"
        disabled
        checkbox={{ id: 'checkbox-text-disabled', disabled: true }}
        showDivider
      />
    </div>
  ),
};

// Card Type
export const CardType: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={storyStyles.container}>
      <ListSelectable
        type="card"
        title="Title"
        description="Description"
        checkbox={{ id: 'checkbox-card' }}
      />
      <ListSelectable
        type="card"
        title="Title"
        description="Selected"
        checkbox={{ id: 'checkbox-card-selected', checked: true }}
      />
      <ListSelectable
        type="card"
        title="Title"
        description="Disabled"
        disabled
        checkbox={{ id: 'checkbox-card-disabled', disabled: true }}
      />
    </div>
  ),
};

// Usage Inside List
export const UsageInsideList: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: '360px' }}>
      <List>
        <ListSelectable
          title="Notificações"
          description="Receber alertas por email"
          checkbox={{ id: 'settings-1', checked: true }}
          showDivider
          type="text"
        />
        <ListSelectable
          title="Tema Escuro"
          description="Ativar modo noturno"
          checkbox={{ id: 'settings-2' }}
          showDivider
          type="text"
        />
        <ListSelectable
          title="Sons"
          description="Reproduzir sons no aplicativo"
          checkbox={{ id: 'settings-3', checked: true }}
          showDivider
          type="text"
        />
      </List>
    </div>
  ),
};

// Loading State
export const Loading: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={storyStyles.container}>
      <ListSelectable
        title="Title"
        description="Description"
        loading
        checkbox={{ id: 'checkbox-loading' }}
        showDivider
      />
    </div>
  ),
};

// Story: Todos os indicadores
export const AllIndicators: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={storyStyles.container}>
      <ListSelectable
        title="Badge Tiny - Brand"
        description="Indicator com badge tiny"
        indicator={<Badge variation="tiny" color="brand" />}
        checkbox={{ id: 'indicator-1' }}
        showDivider
      />
      <ListSelectable
        title="Badge Small - Brand"
        description="Indicator com badge small e count"
        indicator={<Badge variation="small" count={5} color="brand" />}
        checkbox={{ id: 'indicator-2' }}
        showDivider
      />
      <ListSelectable
        title="Badge Medium - Brand"
        description="Indicator com badge medium"
        indicator={<Badge variation="medium" count={99} color="brand" />}
        checkbox={{ id: 'indicator-3' }}
        showDivider
      />
      <ListSelectable
        title="Badge Medium - Brand"
        description="Indicator com badge medium"
        indicator={<Badge variation="medium" count={100} color="alert" />}
        checkbox={{ id: 'indicator-3' }}
        showDivider
      />
      <ListSelectable
        title="Badge Complementary"
        description="Indicator com cor complementary"
        indicator={<Badge count={3} color="complementary" />}
        checkbox={{ id: 'indicator-4' }}
        showDivider
      />
      <ListSelectable
        title="Badge Alert"
        description="Indicator com cor alert"
        indicator={<Badge count={12} color="alert" />}
        checkbox={{ id: 'indicator-5' }}
        showDivider
      />
      <ListSelectable
        title="Badge Neutral"
        description="Indicator com cor neutral"
        indicator={<Badge count={7} color="neutral" />}
        checkbox={{ id: 'indicator-6' }}
        showDivider
      />
      <ListSelectable
        title="Badge com Texto"
        description="Indicator com texto ao invés de número"
        indicator={<Badge color="brand">Novo</Badge>}
        checkbox={{ id: 'indicator-7' }}
        showDivider
      />
      <ListSelectable
        title="Tag Positive"
        description="Indicator com tag positive"
        indicator={
          <Tag type="positive" size="small" setIconOff>
            Aprovado
          </Tag>
        }
        checkbox={{ id: 'indicator-8' }}
        showDivider
      />
      <ListSelectable
        title="Tag Warning"
        description="Indicator com tag warning"
        indicator={
          <Tag type="warning" size="small" setIconOff>
            Pendente
          </Tag>
        }
        checkbox={{ id: 'indicator-9' }}
        showDivider
      />
      <ListSelectable
        title="Tag Negative"
        description="Indicator com tag negative"
        indicator={
          <Tag type="negative" setIconOff size="medium">
            Recusado
          </Tag>
        }
        checkbox={{ id: 'indicator-10' }}
        showDivider
      />
      <ListSelectable
        title="Tag Neutral"
        description="Indicator com tag neutral"
        indicator={
          <Tag type="neutral" size="small" setIconOff>
            Info
          </Tag>
        }
        radio={{ id: 'indicator-11' }}
        showDivider
      />
      <ListSelectable
        title="Tag Highlight"
        description="Indicator com tag highlight important"
        indicator={
          <Tag variant="highlight" type="important" size="small" setIconOff>
            Urgente
          </Tag>
        }
        radio={{ id: 'indicator-12' }}
        showDivider
      />
      <ListSelectable
        title="Tag Highlight"
        description="Indicator com tag highlight important"
        indicator={
          <Tag variant="highlight" type="neutral" size="small" setIconOff>
            Neutro
          </Tag>
        }
        radio={{ id: 'indicator-13' }}
        showDivider
      />
      <ListSelectable
        title="Sem Indicator"
        description="Item sem indicator"
        radio={{ id: 'indicator-14' }}
        showDivider
      />
    </div>
  ),
};

export const IndicatorsAppPlatform: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={storyStyles.container}>
      <ListSelectable
        title="Badge Alert"
        description="Indicator com cor alert"
        indicator={<Badge count={12} color="alert" />}
        platform="app"
        checkbox={{ id: 'app-indicator-5' }}
        showDivider
      />
      <ListSelectable
        title="Badge Neutral"
        description="Indicator com cor neutral"
        indicator={<Badge count={7} color="neutral" />}
        platform="app"
        checkbox={{ id: 'app-indicator-6' }}
        showDivider
      />
      <ListSelectable
        title="Badge com Texto"
        description="Indicator com texto ao invés de número"
        indicator={<Badge color="brand">Novo</Badge>}
        platform="app"
        radio={{ id: 'app-indicator-7' }}
        showDivider
      />
      <ListSelectable
        title="Tag Warning"
        description="Indicator com tag warning"
        indicator={
          <Tag type="warning" size="small" setIconOff>
            Pendente
          </Tag>
        }
        platform="app"
        radio={{ id: 'app-indicator-9' }}
        showDivider
      />
    </div>
  ),
};

export const SelectableDisabled: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <p style={{ marginBottom: '12px', fontWeight: 600 }}>
          Tipo texto (com divisor)
        </p>
        <div style={storyStyles.container}>
          <ListSelectable
            title="Item somente leitura"
            description="Sem checkbox ou radio — renderiza como ListReadOnly"
            isSelectableDisabled
            showDivider
            type="text"
          />
          <ListSelectable
            title="Com indicador"
            description="Também sem controle de seleção"
            indicator={<Badge count={3} color="alert" />}
            isSelectableDisabled
            showDivider
            type="text"
          />
          <ListSelectable
            title="Estado inativo"
            description="Desabilitado e somente leitura"
            isSelectableDisabled
            disabled
            showDivider
            type="text"
          />
        </div>
      </div>

      <div>
        <p style={{ marginBottom: '12px', fontWeight: 600 }}>
          Tipo card (com bordas, sem divisor)
        </p>
        <div style={storyStyles.container}>
          <ListSelectable
            title="Item somente leitura"
            description="Sem checkbox ou radio — renderiza como ListReadOnly"
            isSelectableDisabled
            type="card"
          />
          <ListSelectable
            title="Com indicador"
            description="Também sem controle de seleção"
            indicator={<Badge count={3} color="alert" />}
            isSelectableDisabled
            type="card"
          />
          <ListSelectable
            title="Estado inativo"
            description="Desabilitado e somente leitura"
            isSelectableDisabled
            disabled
            type="card"
          />
        </div>
      </div>
    </div>
  ),
};

// Story: Com Corner Tag
export const WithCornerTag: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={storyStyles.container}>
      <ListSelectable
        title="Plano Premium"
        description="R$ 49,90/mês"
        checkbox={{ id: 'corner-tag-1' }}
        cornerTag={{ label: 'Recomendado' }}
      />
      <ListSelectable
        title="Plano Plus"
        description="R$ 79,90/mês"
        radio={{ id: 'corner-tag-2', name: 'plan' }}
        cornerTag={{ label: 'Novo', color: 'complementaryPure' }}
      />
      <ListSelectable
        title="Plano com inline e corner"
        description="Coexistência das duas tags"
        checkbox={{ id: 'corner-tag-3' }}
        indicator={
          <Tag type="positive" size="small" setIconOff>
            Aprovado
          </Tag>
        }
        cornerTag={{ label: 'Mais vendido' }}
      />
      <ListSelectable
        title="Plano selecionado"
        description="Corner Tag persiste em selected"
        checkbox={{ id: 'corner-tag-4', checked: true }}
        cornerTag={{ label: 'Em breve', color: 'complementaryPure' }}
      />
      <ListSelectable
        title="Plano desabilitado"
        description="Corner Tag mantém aparência normal"
        disabled
        checkbox={{ id: 'corner-tag-5', disabled: true }}
        cornerTag={{ label: 'Recomendado' }}
      />
      <ListSelectable
        title="Plano com label longo"
        description="Corner Tag expande sem truncamento"
        checkbox={{ id: 'corner-tag-6' }}
        cornerTag={{ label: 'Texto muito longo de exemplo' }}
      />
    </div>
  ),
};

// Story: Com Highlight
export const WithHighlight: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        minWidth: '360px',
      }}
    >
      <div>
        <h4 style={{ marginBottom: '8px' }}>Highlight com cor padrão</h4>
        <ListSelectable
          title="Plano Premium"
          description="R$ 49,90/mês"
          checkbox={{ checked: true, onChange: () => undefined }}
          highlight={{
            caption:
              'Inclui acesso ilimitado a todos os recursos da plataforma.',
          }}
        />
      </div>
      <div>
        <h4 style={{ marginBottom: '8px' }}>Highlight com cor customizada</h4>
        <ListSelectable
          title="Plano Básico"
          description="R$ 19,90/mês"
          checkbox={{ checked: false, onChange: () => undefined }}
          highlight={{
            caption: 'Limitado a 3 usuários. Faça upgrade para adicionar mais.',
            backgroundColor: '#FFF3CD',
          }}
        />
      </div>
    </div>
  ),
};
