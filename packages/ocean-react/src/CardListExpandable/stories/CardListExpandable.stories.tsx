import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PlaceholderOutline } from '@useblu/ocean-icons-react';
import CardListExpandable from '../CardListExpandable';
import Badge from '../../Badge';
import Tag from '../../Tag';
import List from '../../List';
import Typography from '../../Typography';

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
      description: 'Ícone exibido no início do card. Se não fornecido, não será exibido.',
      control: false,
    },
    indicator: {
      description: 'Indicador/badge exibido antes da ação de expansão. Se não fornecido, não será exibido.',
      control: false,
    },
    expanded: {
      description: 'Controla o estado expandido/colapsado (controlled).',
      control: 'boolean',
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
    icon: <PlaceholderOutline size={24} />,
    indicator: <Badge count={3} color="brand" />,
    type: 'default',
    defaultExpanded: false,
    children: (
      <div style={{ padding: '16px', background: '#f3f5fe' }}>
        <Typography variant="paragraph">
          Conteúdo expandido do card. Aqui você pode adicionar qualquer
          informação adicional que deseja mostrar quando o card está expandido.
        </Typography>
      </div>
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
        <div style={{ padding: '16px', background: '#f3f5fe' }}>
          <Typography variant="paragraph">Conteúdo expandido</Typography>
        </div>
      </CardListExpandable>
      <CardListExpandable
        title="Card Expandido"
        description="Clique para colapsar"
        icon={<PlaceholderOutline size={24} />}
        defaultExpanded={true}
      >
        <div style={{ padding: '16px', background: '#f3f5fe' }}>
          <Typography variant="paragraph">
            Este card já inicia expandido por padrão
          </Typography>
        </div>
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
        <div style={{ padding: '16px', background: '#f3f5fe' }}>
          <Typography variant="description">Detalhes da transação</Typography>
        </div>
      </CardListExpandable>
      <CardListExpandable
        title="Tipo Inactive"
        description="Inativo"
        icon={<PlaceholderOutline size={24} />}
        type="inactive"
      >
        <div style={{ padding: '16px', background: '#f3f5fe' }}>
          <Typography variant="description">Item inativo</Typography>
        </div>
      </CardListExpandable>
      <CardListExpandable
        title="Tipo Positive"
        description="+ R$ 500,00"
        icon={<PlaceholderOutline size={24} />}
        type="positive"
      >
        <div style={{ padding: '16px', background: '#f3f5fe' }}>
          <Typography variant="description">Crédito recebido</Typography>
        </div>
      </CardListExpandable>
      <CardListExpandable
        title="Tipo Warning"
        description="Atenção necessária"
        icon={<PlaceholderOutline size={24} />}
        type="warning"
      >
        <div style={{ padding: '16px', background: '#f3f5fe' }}>
          <Typography variant="description">Requer ação</Typography>
        </div>
      </CardListExpandable>
      <CardListExpandable
        title="Tipo Highlight"
        description="Destaque"
        icon={<PlaceholderOutline size={24} />}
        type="highlight"
      >
        <div style={{ padding: '16px', background: '#f3f5fe' }}>
          <Typography variant="description">Informação importante</Typography>
        </div>
      </CardListExpandable>
      <CardListExpandable
        title="Tipo Highlight Lead"
        description="Destaque principal"
        icon={<PlaceholderOutline size={24} />}
        type="highlight-lead"
      >
        <div style={{ padding: '16px', background: '#f3f5fe' }}>
          <Typography variant="description">Destaque com ênfase</Typography>
        </div>
      </CardListExpandable>
      <CardListExpandable
        title="Tipo Strikethrough"
        description="R$ 1.234,56"
        strikethroughDescription="R$ 2.000,00"
        icon={<PlaceholderOutline size={24} />}
        type="strikethrough"
      >
        <div style={{ padding: '16px', background: '#f3f5fe' }}>
          <Typography variant="description">Valor com desconto</Typography>
        </div>
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
        indicator={<Badge variation="tiny" color="brand" />}
      >
        <div style={{ padding: '16px', background: '#f3f5fe' }}>
          <Typography variant="description">Conteúdo expandido</Typography>
        </div>
      </CardListExpandable>
      <CardListExpandable
        title="Badge com Count"
        description="Indicator com badge e contador"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge count={5} color="brand" />}
      >
        <div style={{ padding: '16px', background: '#f3f5fe' }}>
          <Typography variant="description">5 novos itens</Typography>
        </div>
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
        <div style={{ padding: '16px', background: '#f3f5fe' }}>
          <Typography variant="description">Status aprovado</Typography>
        </div>
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
        <div style={{ padding: '16px', background: '#f3f5fe' }}>
          <Typography variant="description">Aguardando aprovação</Typography>
        </div>
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
        <div style={{ padding: '16px', background: '#f3f5fe' }}>
          <Typography variant="description">Conteúdo</Typography>
        </div>
      </CardListExpandable>
      <CardListExpandable
        title="Card Loading"
        description="Este texto não aparece"
        icon={<PlaceholderOutline size={24} />}
        loading
      >
        <div style={{ padding: '16px', background: '#f3f5fe' }}>
          <Typography variant="description">Conteúdo</Typography>
        </div>
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
        defaultExpanded={true}
      >
        <div
          style={{
            padding: '16px',
            background: '#f3f5fe',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="description">Destinatário:</Typography>
            <Typography variant="paragraph">João Silva</Typography>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="description">Data:</Typography>
            <Typography variant="paragraph">25/11/2025</Typography>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="description">Hora:</Typography>
            <Typography variant="paragraph">14:35</Typography>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="description">ID:</Typography>
            <Typography variant="paragraph">ABC123456</Typography>
          </div>
        </div>
      </CardListExpandable>
      <CardListExpandable
        title="Informações Adicionais"
        description="Ver mais detalhes"
        icon={<PlaceholderOutline size={24} />}
      >
        <div style={{ padding: '16px', background: '#f3f5fe' }}>
          <Typography variant="paragraph" style={{ marginBottom: '8px' }}>
            <strong>Observações:</strong>
          </Typography>
          <Typography variant="description">
            Esta é uma transação de exemplo que demonstra como o conteúdo
            expandido pode conter informações mais detalhadas e complexas.
          </Typography>
        </div>
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
          <div style={{ padding: '16px', background: '#f3f5fe' }}>
            <Typography variant="paragraph">
              Este card é controlado por um estado externo. O botão acima
              também controla o estado de expansão.
            </Typography>
          </div>
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
        <div style={{ padding: '16px', background: '#f3f5fe' }}>
          <Typography variant="description">
            O card também funciona sem ícone
          </Typography>
        </div>
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
        <div style={{ padding: '16px', background: '#f3f5fe' }}>
          <Typography variant="description">Conteúdo expandido</Typography>
        </div>
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
        <div style={{ padding: '16px', background: '#f3f5fe' }}>
          <Typography variant="description">
            Com o modo invertido, o título fica maior e a descrição menor
          </Typography>
        </div>
      </CardListExpandable>
    </List>
  ),
};

