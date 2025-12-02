import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Badge from '../../Badge';
import Tag from '../../Tag';
import TextListSelectable from '../TextListSelectable';

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

const meta: Meta<typeof TextListSelectable> = {
  title: 'Components/List/TextListSelectable',
  component: TextListSelectable,
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
    type: {
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

type Story = StoryObj<typeof TextListSelectable>;

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
      <TextListSelectable
        title="Title"
        description="Description"
        checkbox={{ id: 'checkbox-default' }}
        showDivider
      />
      <TextListSelectable
        title="Title"
        description="Description"
        checkbox={{ id: 'checkbox-checked', checked: true }}
        showDivider
      />
      <TextListSelectable
        title="Title"
        description="Description"
        checkbox={{ id: 'checkbox-indeterminate', indeterminate: true }}
        showDivider
      />
      <TextListSelectable
        title="Title"
        description="Description"
        checkbox={{ id: 'checkbox-disabled', disabled: true, checked: true }}
        showDivider
      />
      <TextListSelectable
        title="Title"
        description="Description"
        checkbox={{ id: 'checkbox-disabled-checked' }}
        disabled
        showDivider
      />
      <TextListSelectable
        title="Title"
        description="Description"
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
      <TextListSelectable
        title="Title"
        description="Description"
        radio={{ id: 'radio-default', name: 'radio-group' }}
        showDivider
      />
      <TextListSelectable
        title="Title"
        description="Description"
        radio={{ id: 'radio-selected', name: 'radio-group', checked: true }}
        showDivider
      />
      <TextListSelectable
        title="Title"
        description="Description"
        radio={{ id: 'radio-disabled', name: 'radio-group-2' }}
        disabled
        showDivider
      />
      <TextListSelectable
        title="Title"
        description="Description"
        radio={{
          id: 'radio-disabled-selected',
          name: 'radio-group-2',
          checked: true,
        }}
        disabled
        showDivider
      />
      <TextListSelectable
        title="Title"
        description="Description"
        radio={{ id: 'radio-error', error: true }}
        showDivider
      />
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
      <TextListSelectable
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
      <TextListSelectable
        title="Badge Tiny - Brand"
        description="Indicator com badge tiny"
        indicator={<Badge variation="tiny" color="brand" />}
        checkbox={{ id: 'indicator-1' }}
        showDivider
      />
      <TextListSelectable
        title="Badge Small - Brand"
        description="Indicator com badge small e count"
        indicator={<Badge variation="small" count={5} color="brand" />}
        checkbox={{ id: 'indicator-2' }}
        showDivider
      />
      <TextListSelectable
        title="Badge Medium - Brand"
        description="Indicator com badge medium"
        indicator={<Badge variation="medium" count={99} color="brand" />}
        checkbox={{ id: 'indicator-3' }}
        showDivider
      />
      <TextListSelectable
        title="Badge Medium - Brand"
        description="Indicator com badge medium"
        indicator={<Badge variation="medium" count={100} color="alert" />}
        checkbox={{ id: 'indicator-3' }}
        showDivider
      />
      <TextListSelectable
        title="Badge Complementary"
        description="Indicator com cor complementary"
        indicator={<Badge count={3} color="complementary" />}
        checkbox={{ id: 'indicator-4' }}
        showDivider
      />
      <TextListSelectable
        title="Badge Alert"
        description="Indicator com cor alert"
        indicator={<Badge count={12} color="alert" />}
        checkbox={{ id: 'indicator-5' }}
        showDivider
      />
      <TextListSelectable
        title="Badge Neutral"
        description="Indicator com cor neutral"
        indicator={<Badge count={7} color="neutral" />}
        checkbox={{ id: 'indicator-6' }}
        showDivider
      />
      <TextListSelectable
        title="Badge com Texto"
        description="Indicator com texto ao invés de número"
        indicator={<Badge color="brand">Novo</Badge>}
        checkbox={{ id: 'indicator-7' }}
        showDivider
      />
      <TextListSelectable
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
      <TextListSelectable
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
      <TextListSelectable
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
      <TextListSelectable
        title="Tag Neutral"
        description="Indicator com tag neutral"
        indicator={
          <Tag type="neutral" size="small" setIconOff>
            Info
          </Tag>
        }
        checkbox={{ id: 'indicator-11' }}
        showDivider
      />
      <TextListSelectable
        title="Tag Highlight"
        description="Indicator com tag highlight important"
        indicator={
          <Tag variant="highlight" type="important" size="small" setIconOff>
            Urgente
          </Tag>
        }
        checkbox={{ id: 'indicator-12' }}
        showDivider
      />
      <TextListSelectable
        title="Tag Highlight"
        description="Indicator com tag highlight important"
        indicator={
          <Tag variant="highlight" type="neutral" size="small" setIconOff>
            Neutro
          </Tag>
        }
        checkbox={{ id: 'indicator-13' }}
        showDivider
      />
      <TextListSelectable
        title="Sem Indicator"
        description="Item sem indicator"
        checkbox={{ id: 'indicator-14' }}
        showDivider
      />
    </div>
  ),
};

export const AllIndicatorsAppPlatform: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={storyStyles.container}>
      <TextListSelectable
        title="Badge Tiny - Brand"
        description="Indicator com badge tiny"
        indicator={<Badge variation="tiny" color="brand" />}
        platform="app"
        checkbox={{ id: 'app-indicator-1' }}
        showDivider
      />
      <TextListSelectable
        title="Badge Small - Brand"
        description="Indicator com badge small e count"
        indicator={<Badge variation="small" count={5} color="brand" />}
        platform="app"
        checkbox={{ id: 'app-indicator-2' }}
        showDivider
      />

      <TextListSelectable
        title="Badge Medium - Brand"
        description="Indicator com badge medium"
        indicator={<Badge variation="medium" count={100} color="brand" />}
        platform="app"
        checkbox={{ id: 'app-indicator-3' }}
        showDivider
      />
      <TextListSelectable
        title="Badge Complementary"
        description="Indicator com cor complementary"
        indicator={<Badge count={3} color="complementary" />}
        platform="app"
        checkbox={{ id: 'app-indicator-4' }}
        showDivider
      />
      <TextListSelectable
        title="Badge Alert"
        description="Indicator com cor alert"
        indicator={<Badge count={12} color="alert" />}
        platform="app"
        checkbox={{ id: 'app-indicator-5' }}
        showDivider
      />
      <TextListSelectable
        title="Badge Neutral"
        description="Indicator com cor neutral"
        indicator={<Badge count={7} color="neutral" />}
        platform="app"
        checkbox={{ id: 'app-indicator-6' }}
        showDivider
      />
      <TextListSelectable
        title="Badge com Texto"
        description="Indicator com texto ao invés de número"
        indicator={<Badge color="brand">Novo</Badge>}
        platform="app"
        checkbox={{ id: 'app-indicator-7' }}
        showDivider
      />
      <TextListSelectable
        title="Tag Warning"
        description="Indicator com tag warning"
        indicator={
          <Tag type="warning" size="small" setIconOff>
            Pendente
          </Tag>
        }
        platform="app"
        checkbox={{ id: 'app-indicator-9' }}
        showDivider
      />
    </div>
  ),
};
