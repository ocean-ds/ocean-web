import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  Pencil,
  Share,
  Archive,
  Trash,
  PlaceholderOutline,
} from '@useblu/ocean-icons-react';
import ListAction from '../ListAction';
import type { ActionItem } from '../../_shared/components/InternalListActions';
import Badge from '../../Badge';
import Tag from '../../Tag';
import List from '../../List';

const meta: Meta<typeof ListAction> = {
  title: 'Components/List/ListAction',
  component: ListAction,
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
        'card',
        'text',
      ],
    },
    showDivider: {
      description: 'Mostra um divisor entre os cards quando type é "text".',
      control: 'boolean',
    },
    disabled: {
      description: 'Desabilita o card.',
      control: 'boolean',
    },
    loading: {
      description: 'Mostra o estado de carregamento com skeleton.',
      control: 'boolean',
    },
    indicator: {
      description: 'Indicador/badge exibido antes da ação.',
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

type Story = StoryObj<typeof ListAction>;

const defaultMenuActions: ActionItem[] = [

  {
    label: 'Editar',
    onClick: () => alert('Editar clicado!'),
    icon: <Pencil />,
    variant: 'neutral',
  },
  {
    label: 'Compartilhar',
    onClick: () => alert('Compartilhar clicado!'),
    icon: <Share />,
    variant: 'warning',
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
  }
];

// Opções de indicadores disponíveis
const indicatorOptions = {
  none: undefined,
  'badge-tiny-brand': <Badge variation="tiny" color="brand" />,
  'badge-small-brand': <Badge variation="small" count={5} color="brand" />,
  'badge-medium-brand': <Badge variation="medium" count={99} color="brand" />,
  'badge-complementary': <Badge count={3} color="complementary" />,
  'badge-alert': <Badge count={12} color="alert" />,
  'badge-neutral': <Badge count={7} color="neutral" />,
  'badge-text': <Badge color="brand">Novo</Badge>,
  'tag-positive': (
    <Tag type="positive" size="small">
      Aprovado
    </Tag>
  ),
  'tag-warning': (
    <Tag type="warning" size="small">
      Pendente
    </Tag>
  ),
  'tag-negative': (
    <Tag type="negative" setIconOff size="medium">
      Recusado
    </Tag>
  ),
  'tag-neutral': (
    <Tag type="neutral" size="small">
      Info
    </Tag>
  ),
  'tag-highlight': (
    <Tag variant="highlight" type="important" size="small">
      Urgente
    </Tag>
  ),
};

type IndicatorOptionKey = keyof typeof indicatorOptions;

// Story Usage (Principal com Controles)
export const Usage: Story = {
  argTypes: {
    icon: {
      description: 'Configuração de exibição do ícone.',
      control: 'select',
      options: ['withIcon', 'withoutIcon'],
    },
    indicator: {
      description: 'Indicador/badge exibido antes da ação.',
      control: 'select',
      options: [
        'none',
        'badge-tiny-brand',
        'badge-small-brand',
        'badge-medium-brand',
        'badge-complementary',
        'badge-alert',
        'badge-neutral',
        'badge-text',
        'tag-positive',
        'tag-warning',
        'tag-negative',
        'tag-neutral',
        'tag-highlight',
      ],
    },
  },
  args: {
    title: 'Título do Card',
    description: 'Descrição do card com informações importantes',
    indicator: 'badge-small-brand' as unknown as React.ReactNode,
    actionType: 'chevron',
    type: 'card',
    onClick: () => alert('Card clicado!'),
    icon: 'withIcon',
  },
  render: (args) => {
    const { icon: iconOption, indicator: indicatorOption, ...restArgs } = args;
    const icon =
      iconOption === 'withIcon' ? <PlaceholderOutline size={24} /> : undefined;
    const indicator = indicatorOptions[indicatorOption as IndicatorOptionKey];

    return (
      <div
        style={{
          minWidth: '300px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ width: '400px' }}>
          <ListAction {...restArgs} icon={icon} indicator={indicator} menuActions={defaultMenuActions} />
        </div>
      </div>
    );
  },
};

// Story: Todos os tipos
export const AllTypes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List style={{ minWidth: '300px' }}>
      <ListAction
        title="Tipo Default"
        description="R$ 1.234,56"
        icon={<PlaceholderOutline size={24} />}
        type="card"
        status="default"
        onClick={() => alert('Default clicado!')}
      />
      <ListAction
        title="Tipo Inactive"
        description="Inativo"
        icon={<PlaceholderOutline size={24} />}
        type="card"
        status="inactive"
        onClick={() => alert('Inactive clicado!')}
      />
      <ListAction
        title="Tipo Positive"
        description="+ R$ 500,00"
        icon={<PlaceholderOutline size={24} />}
        type="card"
        status="positive"
        onClick={() => alert('Positive clicado!')}
      />
      <ListAction
        title="Tipo Warning"
        description="Atenção necessária"
        icon={<PlaceholderOutline size={24} />}
        type="card"
        status="warning"
        onClick={() => alert('Warning clicado!')}
      />
      <ListAction
        title="Tipo Highlight"
        description="Destaque"
        icon={<PlaceholderOutline size={24} />}
        type="card"
        status="highlight"
        onClick={() => alert('Highlight clicado!')}
      />
      <ListAction
        title="Tipo Highlight Lead"
        description="Destaque principal"
        icon={<PlaceholderOutline size={24} />}
        type="card"
        status="highlight-lead"
        onClick={() => alert('Highlight Lead clicado!')}
      />
      <ListAction
        title="Tipo Strikethrough"
        description="R$ 1.234,56"
        strikethroughDescription="riscado"
        icon={<PlaceholderOutline size={24} />}
        type="card"
        status="strikethrough"
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
      <ListAction
        title="Tipo Default"
        description="R$ 1.234,56"
        icon={<PlaceholderOutline size={24} />}
        type="card"
        status="default"
        inverted
        onClick={() => alert('Default clicado!')}
      />
      <ListAction
        title="Tipo Inactive"
        description="Inativo"
        icon={<PlaceholderOutline size={24} />}
        type="card"
        status="inactive"
        inverted
        onClick={() => alert('Inactive clicado!')}
      />
      <ListAction
        title="Tipo Positive"
        description="+ R$ 500,00"
        icon={<PlaceholderOutline size={24} />}
        type="card"
        status="positive"
        inverted
        onClick={() => alert('Positive clicado!')}
      />
      <ListAction
        title="Tipo Warning"
        description="Atenção necessária"
        icon={<PlaceholderOutline size={24} />}
        type="card"
        status="warning"
        inverted
        onClick={() => alert('Warning clicado!')}
      />
      <ListAction
        title="Tipo Highlight"
        description="Destaque"
        icon={<PlaceholderOutline size={24} />}
        type="card"
        status="highlight"
        inverted
        onClick={() => alert('Highlight clicado!')}
      />
      <ListAction
        title="Tipo Highlight Lead"
        description="Destaque principal"
        icon={<PlaceholderOutline size={24} />}
        type="card"
        status="highlight-lead"
        inverted
        onClick={() => alert('Highlight Lead clicado!')}
      />
      <ListAction
        title="Tipo Strikethrough"
        description="R$ 1.234,56"
        strikethroughDescription="riscado"
        icon={<PlaceholderOutline size={24} />}
        type="card"
        status="strikethrough"
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
      <ListAction
        title="Card Normal"
        description="R$ 1.234,56"
        icon={<PlaceholderOutline size={24} />}
        type="card"
        status="default"
        onClick={() => alert('Normal clicado!')}
      />
      <ListAction
        title="Card Disabled"
        description="R$ 1.234,56"
        icon={<PlaceholderOutline size={24} />}
        type="card"
        status="default"
        disabled
        onClick={() => alert('Disabled clicado!')}
      />
      <ListAction
        title="Card Loading"
        description="R$ 1.234,56"
        icon={<PlaceholderOutline size={24} />}
        type="card"
        status="default"
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
      <ListAction
        title="Badge Tiny - Brand"
        description="Indicator com badge tiny"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge variation="tiny" color="brand" />}
        onClick={() => alert('Clicado!')}
      />
      <ListAction
        title="Badge Small - Brand"
        description="Indicator com badge small e count"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge variation="small" count={5} color="brand" />}
        onClick={() => alert('Clicado!')}
      />
      <ListAction
        title="Badge Medium - Brand"
        description="Indicator com badge medium"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge variation="medium" count={99} color="brand" />}
        onClick={() => alert('Clicado!')}
      />
      <ListAction
        title="Badge Complementary"
        description="Indicator com cor complementary"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge count={3} color="complementary" />}
        onClick={() => alert('Clicado!')}
      />
      <ListAction
        title="Badge Alert"
        description="Indicator com cor alert"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge count={12} color="alert" />}
        onClick={() => alert('Clicado!')}
      />
      <ListAction
        title="Badge Neutral"
        description="Indicator com cor neutral"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge count={7} color="neutral" />}
        onClick={() => alert('Clicado!')}
      />
      <ListAction
        title="Badge com Texto"
        description="Indicator com texto ao invés de número"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge color="brand">Novo</Badge>}
        onClick={() => alert('Clicado!')}
      />
      <ListAction
        title="Tag Positive"
        description="Indicator com tag positive"
        icon={<PlaceholderOutline size={24} />}
        indicator={
          <Tag type="positive" size="small">
            Aprovado
          </Tag>
        }
        onClick={() => alert('Clicado!')}
      />
      <ListAction
        title="Tag Warning"
        description="Indicator com tag warning"
        icon={<PlaceholderOutline size={24} />}
        indicator={
          <Tag type="warning" size="small">
            Pendente
          </Tag>
        }
        onClick={() => alert('Clicado!')}
      />
      <ListAction
        title="Tag Negative"
        description="Indicator com tag negative"
        icon={<PlaceholderOutline size={24} />}
        indicator={
          <Tag type="negative" setIconOff size="medium">
            Recusado
          </Tag>
        }
        onClick={() => alert('Clicado!')}
      />
      <ListAction
        title="Tag Neutral"
        description="Indicator com tag neutral"
        icon={<PlaceholderOutline size={24} />}
        indicator={
          <Tag type="neutral" size="small">
            Info
          </Tag>
        }
        onClick={() => alert('Clicado!')}
      />
      <ListAction
        title="Tag Highlight"
        description="Indicator com tag highlight important"
        icon={<PlaceholderOutline size={24} />}
        indicator={
          <Tag variant="highlight" type="important" size="small">
            Urgente
          </Tag>
        }
        onClick={() => alert('Clicado!')}
      />
      <ListAction
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
      <ListAction
        title="Action Type: Chevron"
        description="Exibe um chevron à direita (padrão)"
        icon={<PlaceholderOutline size={24} />}
        actionType="chevron"
        onClick={() => alert('Chevron clicado!')}
      />
      <ListAction
        title="Action Type: Menu"
        description="Exibe menu de ações com dropdown"
        icon={<PlaceholderOutline size={24} />}
        actionType="menu"
        menuActions={defaultMenuActions}
        onClick={() => alert('Card clicado!')}
      />
      <ListAction
        title="Action Type: Swipe"
        description="Exibe menu com swipe lateral"
        icon={<PlaceholderOutline size={24} />}
        indicator={
          <Badge variation="tiny" color="brand">
            Label
          </Badge>
        }
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
      <ListAction
        title="Menu Position: Bottom Right"
        description="Menu abre embaixo à direita (padrão)"
        icon={<PlaceholderOutline size={24} />}
        actionType="menu"
        menuPosition="bottom-right"
        menuActions={defaultMenuActions}
        onClick={() => alert('Card clicado!')}
      />
      <ListAction
        title="Menu Position: Bottom Left"
        description="Menu abre embaixo à esquerda"
        icon={<PlaceholderOutline size={24} />}
        actionType="menu"
        menuPosition="bottom-left"
        menuActions={defaultMenuActions}
        onClick={() => alert('Card clicado!')}
      />
      <ListAction
        title="Menu Position: Top Right"
        description="Menu abre em cima à direita"
        icon={<PlaceholderOutline size={24} />}
        actionType="menu"
        menuPosition="top-right"
        menuActions={defaultMenuActions}
        onClick={() => alert('Card clicado!')}
      />
      <ListAction
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

// Story: Tipo Text com Divisor e Caption
export const TextTypeWithDividerAndCaption: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ minWidth: '300px' }}>
      <ListAction
        title="Card com tipo Text"
        description="R$ 1.234,56"
        caption="Legenda terciária"
        icon={<PlaceholderOutline size={24} />}
        type="text"
        showDivider
        onClick={() => alert('Clicado!')}
      />
      <ListAction
        title="Card com Caption"
        description="Descrição secundária"
        caption="12/12/2024 às 14:30"
        icon={<PlaceholderOutline size={24} />}
        type="text"
        showDivider
        onClick={() => alert('Clicado!')}
      />
      <ListAction
        title="Card Invertido com Caption"
        description="R$ 500,00"
        caption="Crédito aprovado"
        icon={<PlaceholderOutline size={24} />}
        type="text"
        inverted
        showDivider
        onClick={() => alert('Clicado!')}
      />
      <ListAction
        title="Último Card sem Divisor"
        description="Sem showDivider"
        caption="Este é o último item"
        icon={<PlaceholderOutline size={24} />}
        type="text"
        onClick={() => alert('Clicado!')}
      />
    </div>
  ),
};

// Story: Comparação entre tipos Card e Text
export const CardVsTextInsideList: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <div>
        <h4 style={{ marginBottom: '16px' }}>type=&quot;card&quot; (padrão)</h4>
        <List style={{ minWidth: '300px' }}>
          <ListAction
            title="Card Type"
            description="Com borda de card"
            caption="Caption de exemplo"
            icon={<PlaceholderOutline size={24} />}
            type="card"
            onClick={() => alert('Clicado!')}
          />
          <ListAction
            title="Outro Card"
            description="Segunda linha"
            caption="Mais informações"
            icon={<PlaceholderOutline size={24} />}
            type="card"
            onClick={() => alert('Clicado!')}
          />
        </List>
      </div>
      <div>
        <h4 style={{ marginBottom: '16px' }}>type=&quot;text&quot;</h4>
        <List style={{ minWidth: '300px' }}>
          <ListAction
            title="Text Type"
            description="Sem borda de card"
            caption="Caption de exemplo"
            icon={<PlaceholderOutline size={24} />}
            type="text"
            showDivider
            onClick={() => alert('Clicado!')}
          />
          <ListAction
            title="Outro Text"
            description="Segunda linha"
            caption="Mais informações"
            icon={<PlaceholderOutline size={24} />}
            type="text"
            showDivider
            onClick={() => alert('Clicado!')}
          />
        </List>
      </div>
    </div>
  ),
};

