import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  Pencil,
  Share,
  Archive,
  Trash,
  PlaceholderOutline
} from '@useblu/ocean-icons-react';
import CardListAction from '../CardListAction';
import type { ActionItem } from '../../InternalListActions';
import Badge from '../../Badge';
import Tag from '../../Tag';
import List from '../../List';

const meta: Meta<typeof CardListAction> = {
  title: 'Components/CardList/CardListAction',
  component: CardListAction,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Título principal do card.',
      control: 'text',
    },
    description: {
      description: 'Descrição ou texto secundário do card.',
      control: 'text',
    },
    strikethroughDescription: {
      description: 'Descrição com texto riscado.',
      control: 'text',
    },
    caption: {
      description: 'Legenda ou texto terciário do card.',
      control: 'text',
    },
    inverted: {
      description: 'Inverte a posição do título com a descrição.',
      control: 'boolean',
    },
    type: {
      description: 'Tipo de estilo do conteúdo do card.',
      control: 'select',
      options: [
        'default',
        'inactive',
        'positive',
        'warning',
        'highlight',
        'highlight-lead',
        'strikethrough'
      ],
    },
    disabled: {
      description: 'Desabilita o card.',
      control: 'boolean',
    },
    loading: {
      description: 'Mostra o estado de carregamento com skeleton.',
      control: 'boolean',
    },
    icon: {
      description: 'Ícone exibido no início do card.',
      control: false,
    },
    indicator: {
      description: 'Indicador/badge exibido antes da ação.',
      control: false,
    },
    actionType: {
      description: 'Tipo de ação exibida no card.',
      control: 'select',
      options: ['chevron', 'menu', 'swipe'],
    },
    menuActions: {
      description: 'Lista de ações para os tipos "menu" e "swipe".',
      control: false,
    },
    menuPosition: {
      description: 'Posição do menu dropdown.',
      control: 'select',
      options: ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
    },
    onClick: {
      description: 'Função chamada ao clicar no card.',
      action: 'clicked',
    },
    className: {
      description: 'Classe CSS adicional para o card.',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof CardListAction>;

const defaultMenuActions: ActionItem[] = [
  {
    label: 'Editar',
    onClick: () => alert('Editar clicado!'),
    icon: <Pencil />,
    variant: 'default',
  },
  {
    label: 'Compartilhar',
    onClick: () => alert('Compartilhar clicado!'),
    icon: <Share />,
    variant: 'default',
  },
  {
    label: 'Arquivar',
    onClick: () => alert('Arquivar clicado!'),
    icon: <Archive />,
    variant: 'positive',
  },
  {
    label: 'Excluir',
    onClick: () => alert('Excluir clicado!'),
    icon: <Trash />,
    variant: 'negative',
  },
];

// Story Usage (Principal com Controles)
export const Usage: Story = {
  args: {
    title: 'Título do Card',
    description: 'Descrição do card com informações importantes',
    icon: <PlaceholderOutline size={24} />,
    indicator: <Badge count={3} color="brand" />,
    actionType: 'chevron',
    type: 'default',
    onClick: () => alert('Card clicado!'),
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          minWidth: '300px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <List>
          <StoryComponent />
        </List>
      </div>
    ),
  ],
};

// Story: Todos os tipos
export const AllTypes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List style={{ minWidth: '300px' }}>
      <CardListAction
        title="Tipo Default"
        description="R$ 1.234,56"
        icon={<PlaceholderOutline size={24} />}
        type="default"
        onClick={() => alert('Default clicado!')}
      />
      <CardListAction
        title="Tipo Inactive"
        description="Inativo"
        icon={<PlaceholderOutline size={24} />}
        type="inactive"
        onClick={() => alert('Inactive clicado!')}
      />
      <CardListAction
        title="Tipo Positive"
        description="+ R$ 500,00"
        icon={<PlaceholderOutline size={24} />}
        type="positive"
        onClick={() => alert('Positive clicado!')}
      />
      <CardListAction
        title="Tipo Warning"
        description="Atenção necessária"
        icon={<PlaceholderOutline size={24} />}
        type="warning"
        onClick={() => alert('Warning clicado!')}
      />
      <CardListAction
        title="Tipo Highlight"
        description="Destaque"
        icon={<PlaceholderOutline size={24} />}
        type="highlight"
        onClick={() => alert('Highlight clicado!')}
      />
      <CardListAction
        title="Tipo Highlight Lead"
        description="Destaque principal"
        icon={<PlaceholderOutline size={24} />}
        type="highlight-lead"
        onClick={() => alert('Highlight Lead clicado!')}
      />
      <CardListAction
        title="Tipo Strikethrough"
        description="R$ 1.234,56"
        strikethroughDescription='riscado'
        icon={<PlaceholderOutline size={24} />}
        type="strikethrough"
        onClick={() => alert('Strikethrough clicado!')}
      />
    </List>
  ),
};

// Story: Todos os tipos invertidos
export const AllTypesInverted: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List style={{ minWidth: '300px' }}>
      <CardListAction
        title="Tipo Default"
        description="R$ 1.234,56"
        icon={<PlaceholderOutline size={24} />}
        type="default"
        inverted
        onClick={() => alert('Default clicado!')}
      />
      <CardListAction
        title="Tipo Inactive"
        description="Inativo"
        icon={<PlaceholderOutline size={24} />}
        type="inactive"
        inverted
        onClick={() => alert('Inactive clicado!')}
      />
      <CardListAction
        title="Tipo Positive"
        description="+ R$ 500,00"
        icon={<PlaceholderOutline size={24} />}
        type="positive"
        inverted
        onClick={() => alert('Positive clicado!')}
      />
      <CardListAction
        title="Tipo Warning"
        description="Atenção necessária"
        icon={<PlaceholderOutline size={24} />}
        type="warning"
        inverted
        onClick={() => alert('Warning clicado!')}
      />
      <CardListAction
        title="Tipo Highlight"
        description="Destaque"
        icon={<PlaceholderOutline size={24} />}
        type="highlight"
        inverted
        onClick={() => alert('Highlight clicado!')}
      />
      <CardListAction
        title="Tipo Highlight Lead"
        description="Destaque principal"
        icon={<PlaceholderOutline size={24} />}
        type="highlight-lead"
        inverted
        onClick={() => alert('Highlight Lead clicado!')}
      />
      <CardListAction
        title="Tipo Strikethrough"
        description="R$ 1.234,56"
        strikethroughDescription='riscado'
        icon={<PlaceholderOutline size={24} />}
        type="strikethrough"
        inverted
        onClick={() => alert('Strikethrough clicado!')}
      />
    </List>
  ),
};

// Story: Estados disabled e loading
export const DisabledAndLoading: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List style={{ minWidth: '300px' }}>
      <CardListAction
        title="Card Normal"
        description="R$ 1.234,56"
        icon={<PlaceholderOutline size={24} />}
        type="default"
        onClick={() => alert('Normal clicado!')}
      />
      <CardListAction
        title="Card Disabled"
        description="R$ 1.234,56"
        icon={<PlaceholderOutline size={24} />}
        type="default"
        disabled
        onClick={() => alert('Disabled clicado!')}
      />
      <CardListAction
        title="Card Loading"
        description="R$ 1.234,56"
        icon={<PlaceholderOutline size={24} />}
        type="default"
        loading
        onClick={() => alert('Loading clicado!')}
      />
    </List>
  ),
};

// Story: Todos os indicadores
export const AllIndicators: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List style={{ minWidth: '300px' }}>
      <CardListAction
        title="Badge Tiny - Brand"
        description="Indicator com badge tiny"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge variation="tiny" color="brand" />}
        onClick={() => alert('Clicado!')}
      />
      <CardListAction
        title="Badge Small - Brand"
        description="Indicator com badge small e count"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge variation="small" count={5} color="brand" />}
        onClick={() => alert('Clicado!')}
      />
      <CardListAction
        title="Badge Medium - Brand"
        description="Indicator com badge medium"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge variation="medium" count={99} color="brand" />}
        onClick={() => alert('Clicado!')}
      />
      <CardListAction
        title="Badge Complementary"
        description="Indicator com cor complementary"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge count={3} color="complementary" />}
        onClick={() => alert('Clicado!')}
      />
      <CardListAction
        title="Badge Alert"
        description="Indicator com cor alert"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge count={12} color="alert" />}
        onClick={() => alert('Clicado!')}
      />
      <CardListAction
        title="Badge Neutral"
        description="Indicator com cor neutral"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge count={7} color="neutral" />}
        onClick={() => alert('Clicado!')}
      />
      <CardListAction
        title="Badge com Texto"
        description="Indicator com texto ao invés de número"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge color="brand">Novo</Badge>}
        onClick={() => alert('Clicado!')}
      />
      <CardListAction
        title="Tag Positive"
        description="Indicator com tag positive"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Tag type="positive" size="small">Aprovado</Tag>}
        onClick={() => alert('Clicado!')}
      />
      <CardListAction
        title="Tag Warning"
        description="Indicator com tag warning"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Tag type="warning" size="small">Pendente</Tag>}
        onClick={() => alert('Clicado!')}
      />
      <CardListAction
        title="Tag Negative"
        description="Indicator com tag negative"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Tag type="negative" setIconOff size="medium">Recusado</Tag>}
        onClick={() => alert('Clicado!')}
      />
      <CardListAction
        title="Tag Neutral"
        description="Indicator com tag neutral"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Tag type="neutral" size="small">Info</Tag>}
        onClick={() => alert('Clicado!')}
      />
      <CardListAction
        title="Tag Highlight"
        description="Indicator com tag highlight important"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Tag variant="highlight" type="important" size="small">Urgente</Tag>}
        onClick={() => alert('Clicado!')}
      />
      <CardListAction
        title="Sem Indicator"
        description="Card sem indicator"
        icon={<PlaceholderOutline size={24} />}
        onClick={() => alert('Clicado!')}
      />
    </List>
  ),
};

// Story: Todos os tipos de ação
export const AllActionTypes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List style={{ minWidth: '300px' }}>
      <CardListAction
        title="Action Type: Chevron"
        description="Exibe um chevron à direita (padrão)"
        icon={<PlaceholderOutline size={24} />}
        actionType="chevron"
        onClick={() => alert('Chevron clicado!')}
      />
      <CardListAction
        title="Action Type: Menu"
        description="Exibe menu de ações com dropdown"
        icon={<PlaceholderOutline size={24} />}
        actionType="menu"
        menuActions={defaultMenuActions}
        onClick={() => alert('Card clicado!')}
      />
      <CardListAction
        title="Action Type: Swipe"
        description="Exibe menu com swipe lateral"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge variation="tiny" color="brand">Label</Badge>}
        actionType="swipe"
        menuActions={[
          {
            label: 'Editar',
            onClick: () => alert('Editar clicado!'),
            icon: <Pencil />,
            variant: 'default',
          },
          {
            label: 'Excluir',
            onClick: () => alert('Excluir clicado!'),
            icon: <Trash />,
            variant: 'negative',
          },
        ]}
        onClick={() => alert('Card clicado!')}
      />
    </List>
  ),
};

// Story: Todas as posições do menu
export const AllMenuPositions: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List style={{ minWidth: '300px' }}>
      <CardListAction
        title="Menu Position: Bottom Right"
        description="Menu abre embaixo à direita (padrão)"
        icon={<PlaceholderOutline size={24} />}
        actionType="menu"
        menuPosition="bottom-right"
        menuActions={defaultMenuActions}
        onClick={() => alert('Card clicado!')}
      />
      <CardListAction
        title="Menu Position: Bottom Left"
        description="Menu abre embaixo à esquerda"
        icon={<PlaceholderOutline size={24} />}
        actionType="menu"
        menuPosition="bottom-left"
        menuActions={defaultMenuActions}
        onClick={() => alert('Card clicado!')}
      />
      <CardListAction
        title="Menu Position: Top Right"
        description="Menu abre em cima à direita"
        icon={<PlaceholderOutline size={24} />}
        actionType="menu"
        menuPosition="top-right"
        menuActions={defaultMenuActions}
        onClick={() => alert('Card clicado!')}
      />
      <CardListAction
        title="Menu Position: Top Left"
        description="Menu abre em cima à esquerda"
        icon={<PlaceholderOutline size={24} />}
        actionType="menu"
        menuPosition="top-left"
        menuActions={defaultMenuActions}
        onClick={() => alert('Card clicado!')}
      />
    </List>
  ),
};

