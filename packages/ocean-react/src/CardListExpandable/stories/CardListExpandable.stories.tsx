import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  PlaceholderOutline,
  HomeOutline,
  Refresh,
} from '@useblu/ocean-icons-react';
import CardListExpandable from '../CardListExpandable';
import Badge from '../../Badge';
import Tag from '../../Tag';
import List from '../../List';
import Typography from '../../Typography';

// Mapeia os nomes dos ícones para seus componentes
const iconMap = {
  withoutIcon: null,
  placeholder: <PlaceholderOutline size={24} />,
  home: <HomeOutline size={24} />,
};

// Mapeia os nomes dos indicadores para seus componentes
const indicatorMap = {
  withoutIndicator: null,
  badgeTiny: <Badge variation="tiny" color="brand" />,
  badgeCount: <Badge count={3} color="brand" />,
  badgeLabel: <Badge>Label</Badge>,
  tagPositive: (
    <Tag type="positive" size="small">
      Aprovado
    </Tag>
  ),
  tagWarning: (
    <Tag type="warning" size="small">
      Pendente
    </Tag>
  ),
  tagNegative: (
    <Tag type="negative" size="small">
      Recusado
    </Tag>
  ),
};

const content = (
  <div
    style={{
      padding: '40px 0',
      backgroundColor: '#EDEAFF',
      borderTop: '1px dashed #7B61FF',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      flexDirection: 'column',
      color: '#7B61FF',
    }}
  >
    <Refresh size={16} />
    <Typography variant="description">Replace me</Typography>
  </div>
);

const meta: Meta<typeof CardListExpandable> = {
  title: 'Components/CardList/CardListExpandable',
  component: CardListExpandable,
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
    caption: {
      description: 'Legenda ou texto terciário do card.',
      control: 'text',
    },
    inverted: {
      description: 'Inverte a posição do título com a descrição.',
      control: 'boolean',
    },
    disabled: {
      description: 'Se o card está desabilitado.',
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
        'strikethrough',
      ],
    },
    loading: {
      description: 'Mostra o estado de carregamento com skeleton.',
      control: 'boolean',
    },
    icon: {
      description:
        'Ícone exibido no início do card. Se não fornecido, não será exibido.',
      control: 'select',
      options: Object.keys(iconMap),
      mapping: iconMap,
    },
    indicator: {
      description:
        'Indicador/badge exibido antes da ação de expansão. Se não fornecido, não será exibido.',
      control: 'select',
      options: Object.keys(indicatorMap),
      mapping: indicatorMap,
    },
    expanded: {
      description: 'Controla o estado expandido/colapsado (controlled).',
      control: 'boolean',
    },
    strikethroughDescription: {
      description: 'Texto riscado exibido quando o card está expandido.',
      control: 'text',
    },
    defaultExpanded: {
      description: 'Estado inicial expandido/colapsado (uncontrolled).',
      control: 'boolean',
    },
    onToggle: {
      description: 'Função chamada ao expandir/colapsar o card.',
      action: 'toggled',
    },
    children: {
      description: 'Conteúdo exibido quando o card está expandido.',
      control: false,
    },
    className: {
      description: 'Classe CSS adicional para o card.',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof CardListExpandable>;

// Story Usage (Principal com Controles)
export const Usage: Story = {
  args: {
    title: 'Título do Card',
    description: 'Descrição do card com informações importantes',
    icon: 'placeholder' as any,
    indicator: 'badgeCount' as any,
    type: 'default',
    strikethroughDescription: 'strikethrough',
    defaultExpanded: false,
    children: (
      content
    ),
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          width: '400px',
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

// Story: Estados colapsado e expandido
export const ExpandedStates: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List style={{ width: '400px' }}>
      <CardListExpandable
        title="Card Colapsado"
        description="Clique para expandir"
        icon={<PlaceholderOutline size={24} />}
        defaultExpanded={false}
      >
        {content}
      </CardListExpandable>
      <CardListExpandable
        title="Card Expandido"
        description="Clique para colapsar"
        icon={<PlaceholderOutline size={24} />}
        defaultExpanded
      >
        {content}
      </CardListExpandable>
    </List>
  ),
};

// Story: Todos os tipos
export const AllTypes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List style={{ width: '400px' }}>
      <CardListExpandable
        title="Tipo Default"
        description="R$ 1.234,56"
        icon={<PlaceholderOutline size={24} />}
        type="default"
      >
        {content}
      </CardListExpandable>
      <CardListExpandable
        title="Tipo Inactive"
        description="Inativo"
        icon={<PlaceholderOutline size={24} />}
        type="inactive"
      >
        {content}
      </CardListExpandable>
      <CardListExpandable
        title="Tipo Positive"
        description="+ R$ 500,00"
        icon={<PlaceholderOutline size={24} />}
        type="positive"
      >
        {content}
      </CardListExpandable>
      <CardListExpandable
        title="Tipo Warning"
        description="Atenção necessária"
        icon={<PlaceholderOutline size={24} />}
        type="warning"
      >
        {content}
      </CardListExpandable>
      <CardListExpandable
        title="Tipo Highlight"
        description="Destaque"
        icon={<PlaceholderOutline size={24} />}
        type="highlight"
      >
        {content}
      </CardListExpandable>
      <CardListExpandable
        title="Tipo Highlight Lead"
        description="Destaque principal"
        icon={<PlaceholderOutline size={24} />}
        type="highlight-lead"
      >
        {content}
      </CardListExpandable>
      <CardListExpandable
        title="Tipo Strikethrough"
        description="R$ 1.234,56"
        strikethroughDescription="R$ 2.000,00"
        icon={<PlaceholderOutline size={24} />}
        type="strikethrough"
      >
        {content}
      </CardListExpandable>
    </List>
  ),
};

// Story: Com indicadores
export const WithIndicators: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List style={{ width: '400px' }}>
      <CardListExpandable
        title="Badge Tiny - Brand"
        description="Indicator com badge tiny"
        icon={<PlaceholderOutline size={24} />}
      >
        {content}
      </CardListExpandable>
      <CardListExpandable
        title="Badge Tiny - Brand"
        description="Indicator com badge tiny"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge variation="tiny" color="brand" />}
      >
        {content}
      </CardListExpandable>
      <CardListExpandable
        title="Badge com Count"
        description="Indicator com badge e contador"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge count={5} color="brand" />}
      >
        {content}
      </CardListExpandable>
      <CardListExpandable
        title="Tag Positive"
        description="Indicator com tag positive"
        icon={<PlaceholderOutline size={24} />}
        indicator={
          <Tag type="positive" size="small">
            Aprovado
          </Tag>
        }
      >
        {content}
      </CardListExpandable>
      <CardListExpandable
        title="Tag Positive"
        description="Indicator com tag positive"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge>Label</Badge>}
      >
        {content}
      </CardListExpandable>
      <CardListExpandable
        title="Tag Warning"
        description="Indicator com tag warning"
        icon={<PlaceholderOutline size={24} />}
        indicator={
          <Tag type="warning" size="small">
            Pendente
          </Tag>
        }
      >
        {content}
      </CardListExpandable>
    </List>
  ),
};

// Story: Estado de loading
export const LoadingState: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List style={{ width: '400px' }}>
      <CardListExpandable
        title="Card Normal"
        description="Estado normal"
        icon={<PlaceholderOutline size={24} />}
      >
        {content}
      </CardListExpandable>
      <CardListExpandable
        title="Card Loading"
        description="Este texto não aparece"
        icon={<PlaceholderOutline size={24} />}
        loading
      >
        {content}
      </CardListExpandable>
    </List>
  ),
};

// Story: Conteúdo complexo
export const ComplexContent: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List style={{ width: '400px' }}>
      <CardListExpandable
        title="Detalhes da Transação"
        description="PIX enviado"
        icon={<PlaceholderOutline size={24} />}
        indicator={
          <Tag type="positive" size="small">
            Concluído
          </Tag>
        }
        defaultExpanded
      >
        {content}
      </CardListExpandable>
      <CardListExpandable
        title="Informações Adicionais"
        description="Ver mais detalhes"
        icon={<PlaceholderOutline size={24} />}
      >
        {content}
      </CardListExpandable>
    </List>
  ),
};

// Story: Controlled vs Uncontrolled
export const ControlledExample: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: function ControlledRender() {
    const [expanded, setExpanded] = React.useState(false);

    return (
      <List style={{ width: '300px' }}>
        <div style={{ padding: '16px', marginBottom: '16px' }}>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            style={{
              padding: '8px 16px',
              background: '#5872F5',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {expanded ? 'Colapsar' : 'Expandir'} via Botão Externo
          </button>
        </div>
        <CardListExpandable
          title="Card Controlado"
          description="Controlado por estado externo"
          icon={<PlaceholderOutline size={24} />}
          expanded={expanded}
          onToggle={(newExpanded) => setExpanded(newExpanded)}
        >
          {content}
        </CardListExpandable>
      </List>
    );
  },
};

// Story: Sem ícone
export const WithoutIcon: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List style={{ width: '400px' }}>
      <CardListExpandable
        title="Card Sem Ícone"
        description="Exemplo sem ícone à esquerda"
      >
        {content}
      </CardListExpandable>
    </List>
  ),
};

// Story: Com caption
export const WithCaption: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List style={{ width: '400px' }}>
      <CardListExpandable
        title="Título Principal"
        description="Descrição secundária"
        caption="Legenda adicional"
        icon={<PlaceholderOutline size={24} />}
      >
        {content}
      </CardListExpandable>
    </List>
  ),
};

// Story: Invertido
export const Inverted: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List style={{ width: '400px' }}>
      <CardListExpandable
        title="R$ 1.234,56"
        description="Transferência PIX"
        icon={<PlaceholderOutline size={24} />}
        inverted
      >
        {content}
      </CardListExpandable>
    </List>
  ),
};
