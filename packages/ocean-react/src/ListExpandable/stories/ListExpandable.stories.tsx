import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  PlaceholderOutline,
  HomeOutline,
  Refresh,
} from '@useblu/ocean-icons-react';
import ListExpandable from '../ListExpandable';
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

const meta: Meta<typeof ListExpandable> = {
  title: 'Components/List/ListExpandable',
  component: ListExpandable,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Título principal.',
      control: 'text',
    },
    description: {
      description: 'Descrição ou texto secundário.',
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
      description: 'Se está desabilitado.',
      control: 'boolean',
    },
    showDivider: {
      description: 'Mostra um divisor entre o header e o conteúdo.',
      control: 'boolean',
    },
    type: {
      description: 'Tipo de estilo expandível.',
      control: 'select',
      options: ['card', 'text'],
    },
    status: {
      description: 'Tipo de status do conteúdo.',
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
        'Ícone exibido no início. Se não fornecido, não será exibido.',
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
      description: 'Texto riscado exibido quando está expandido.',
      control: 'text',
    },
    defaultExpanded: {
      description: 'Estado inicial expandido/colapsado (uncontrolled).',
      control: 'boolean',
    },
    onToggle: {
      description: 'Função chamada ao expandir/colapsar.',
      action: 'toggled',
    },
    children: {
      description: 'Conteúdo exibido quando está expandido.',
      control: false,
    },
    className: {
      description: 'Classe CSS adicional.',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ListExpandable>;

// Story Usage (Principal com Controles)
export const Usage: Story = {
  args: {
    title: 'Título',
    description: 'Descrição com informações importantes',
    icon: 'placeholder' as any,
    indicator: 'badgeCount' as any,
    type: 'card',
    status: 'default',
    strikethroughDescription: 'strikethrough',
    defaultExpanded: true,
    showDivider: false,
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
        <div style={{ width: '400px' }}>
          <StoryComponent />
        </div>
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
      <ListExpandable
        title="Card Colapsado"
        description="Clique para expandir"
        icon={<PlaceholderOutline size={24} />}
        defaultExpanded={false}
      >
        {content}
      </ListExpandable>
      <ListExpandable
        title="Card Expandido"
        description="Clique para colapsar"
        icon={<PlaceholderOutline size={24} />}
        defaultExpanded
      >
        {content}
      </ListExpandable>
    </List>
  ),
};

// Story: Todos os status
export const AllStatus: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List style={{ width: '400px' }}>
      <ListExpandable
        title="Status Default"
        description="R$ 1.234,56"
        icon={<PlaceholderOutline size={24} />}
        status="default"
      >
        {content}
      </ListExpandable>
      <ListExpandable
        title="Status Inactive"
        description="Inativo"
        icon={<PlaceholderOutline size={24} />}
        status="inactive"
      >
        {content}
      </ListExpandable>
      <ListExpandable
        title="Status Positive"
        description="+ R$ 500,00"
        icon={<PlaceholderOutline size={24} />}
        status="positive"
      >
        {content}
      </ListExpandable>
      <ListExpandable
        title="Status Warning"
        description="Atenção necessária"
        icon={<PlaceholderOutline size={24} />}
        status="warning"
      >
        {content}
      </ListExpandable>
      <ListExpandable
        title="Status Highlight"
        description="Destaque"
        icon={<PlaceholderOutline size={24} />}
        status="highlight"
      >
        {content}
      </ListExpandable>
      <ListExpandable
        title="Status Highlight Lead"
        description="Destaque principal"
        icon={<PlaceholderOutline size={24} />}
        status="highlight-lead"
      >
        {content}
      </ListExpandable>
      <ListExpandable
        title="Status Strikethrough"
        description="R$ 1.234,56"
        strikethroughDescription="R$ 2.000,00"
        icon={<PlaceholderOutline size={24} />}
        status="strikethrough"
      >
        {content}
      </ListExpandable>
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
      <ListExpandable
        title="Badge Tiny - Brand"
        description="Indicator com badge tiny"
        icon={<PlaceholderOutline size={24} />}
        type="text"
        showDivider
      >
        {content}
      </ListExpandable>
      <ListExpandable
        title="Badge Tiny - Brand"
        description="Indicator com badge tiny"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge variation="tiny" color="brand" />}
        type="text"
        showDivider
      >
        {content}
      </ListExpandable>
      <ListExpandable
        title="Badge com Count"
        description="Indicator com badge e contador"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge count={5} color="brand" />}
        type="text"
        showDivider
      >
        {content}
      </ListExpandable>
      <ListExpandable
        title="Tag Positive"
        description="Indicator com tag positive"
        icon={<PlaceholderOutline size={24} />}
        indicator={
          <Tag type="positive" size="small">
            Aprovado
          </Tag>
        }
        type="text"
        showDivider
      >
        {content}
      </ListExpandable>
      <ListExpandable
        title="Tag Positive"
        description="Indicator com tag positive"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge>Label</Badge>}
        type="text"
        showDivider
      >
        {content}
      </ListExpandable>
      <ListExpandable
        title="Tag Warning"
        description="Indicator com tag warning"
        icon={<PlaceholderOutline size={24} />}
        indicator={
          <Tag type="warning" size="small">
            Pendente
          </Tag>
        }
        type="text"
      >
        {content}
      </ListExpandable>
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
      <ListExpandable
        title="Card Normal"
        description="Estado normal"
        icon={<PlaceholderOutline size={24} />}
      >
        {content}
      </ListExpandable>
      <ListExpandable
        title="Card Loading"
        description="Este texto não aparece"
        icon={<PlaceholderOutline size={24} />}
        loading
      >
        {content}
      </ListExpandable>
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
      <ListExpandable
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
      </ListExpandable>
      <ListExpandable
        title="Informações Adicionais"
        description="Ver mais detalhes"
        icon={<PlaceholderOutline size={24} />}
      >
        {content}
      </ListExpandable>
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
        <ListExpandable
          title="Card Controlado"
          description="Controlado por estado externo"
          icon={<PlaceholderOutline size={24} />}
          expanded={expanded}
          onToggle={(newExpanded) => setExpanded(newExpanded)}
        >
          {content}
        </ListExpandable>
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
      <ListExpandable
        title="Card Sem Ícone"
        description="Exemplo sem ícone à esquerda"
      >
        {content}
      </ListExpandable>
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
      <ListExpandable
        title="Título Principal"
        description="Descrição secundária"
        caption="Legenda adicional"
        icon={<PlaceholderOutline size={24} />}
      >
        {content}
      </ListExpandable>
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
      <ListExpandable
        title="R$ 1.234,56"
        description="Transferência PIX"
        icon={<PlaceholderOutline size={24} />}
        inverted
      >
        {content}
      </ListExpandable>
    </List>
  ),
};

// Story: Com divisor
export const WithDivider: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List style={{ width: '400px' }}>
      <ListExpandable
        title="Com Divisor"
        description="Card sem divisor entre header e conteúdo"
        icon={<PlaceholderOutline size={24} />}
        showDivider
        defaultExpanded
        type='text'
      >
        {content}
      </ListExpandable>
      <ListExpandable
        title="Sem Divisor"
        description="Card com divisor entre header e conteúdo"
        icon={<PlaceholderOutline size={24} />}
        defaultExpanded
        type='text'
      >
        {content}
      </ListExpandable>
    </List>
  ),
};

// Story: Tipo Text (sem List)
export const TypeText: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <ListExpandable
        title="Card Tipo Text"
        description="Estilo apenas texto, sem card"
        icon={<PlaceholderOutline size={24} />}
        type="text"
        defaultExpanded
        showDivider
      >
        {content}
      </ListExpandable>
      <ListExpandable
        title="Text com Indicador"
        description="R$ 1.234,56"
        icon={<PlaceholderOutline size={24} />}
        type="text"
        showDivider
        indicator={
          <Tag type="positive" size="small">
            Aprovado
          </Tag>
        }
      >
        {content}
      </ListExpandable>
      <ListExpandable
        title="Text Invertido"
        description="Descrição acima do título"
        icon={<PlaceholderOutline size={24} />}
        type="text"
        inverted
        showDivider
      >
        {content}
      </ListExpandable>
      <ListExpandable
        title="Text com Caption"
        description="Descrição secundária"
        caption="Legenda adicional"
        icon={<PlaceholderOutline size={24} />}
        type="text"
        showDivider
      >
        {content}
      </ListExpandable>
      <ListExpandable
        title="Text Disabled"
        description="Card desabilitado"
        icon={<PlaceholderOutline size={24} />}
        type="text"
        disabled
      >
        {content}
      </ListExpandable>
    </div>
  ),
};
