import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PlaceholderOutline } from '@useblu/ocean-icons-react';
import CardListReadOnly from '../CardListReadOnly';
import Badge from '../../Badge';
import Tag from '../../Tag';
import List from '../../List';

const meta: Meta<typeof CardListReadOnly> = {
  title: 'Components/CardList/CardListReadOnly',
  component: CardListReadOnly,
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
      description: 'Indicador/badge exibido à direita.',
      control: false,
    },
    className: {
      description: 'Classe CSS adicional para o card.',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof CardListReadOnly>;

// Story Usage (Principal com Controles)
export const Usage: Story = {
  args: {
    title: 'Título do Card',
    description: 'Descrição do card com informações importantes',
    icon: <PlaceholderOutline size={24} />,
    indicator: <Badge count={3} color="brand" />,
    type: 'default',
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
      <CardListReadOnly
        title="Tipo Default"
        description="R$ 1.234,56"
        icon={<PlaceholderOutline size={24} />}
        type="default"
      />
      <CardListReadOnly
        title="Tipo Inactive"
        description="Inativo"
        icon={<PlaceholderOutline size={24} />}
        type="inactive"
      />
      <CardListReadOnly
        title="Tipo Positive"
        description="+ R$ 500,00"
        icon={<PlaceholderOutline size={24} />}
        type="positive"
      />
      <CardListReadOnly
        title="Tipo Warning"
        description="Atenção necessária"
        icon={<PlaceholderOutline size={24} />}
        type="warning"
      />
      <CardListReadOnly
        title="Tipo Highlight"
        description="Destaque"
        icon={<PlaceholderOutline size={24} />}
        type="highlight"
      />
      <CardListReadOnly
        title="Tipo Highlight Lead"
        description="Destaque principal"
        icon={<PlaceholderOutline size={24} />}
        type="highlight-lead"
      />
      <CardListReadOnly
        title="Tipo Strikethrough"
        description="R$ 1.234,56"
        strikethroughDescription='riscado'
        icon={<PlaceholderOutline size={24} />}
        type="strikethrough"
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
      <CardListReadOnly
        title="Tipo Default"
        description="R$ 1.234,56"
        icon={<PlaceholderOutline size={24} />}
        type="default"
        inverted
      />
      <CardListReadOnly
        title="Tipo Inactive"
        description="Inativo"
        icon={<PlaceholderOutline size={24} />}
        type="inactive"
        inverted
      />
      <CardListReadOnly
        title="Tipo Positive"
        description="+ R$ 500,00"
        icon={<PlaceholderOutline size={24} />}
        type="positive"
        inverted
      />
      <CardListReadOnly
        title="Tipo Warning"
        description="Atenção necessária"
        icon={<PlaceholderOutline size={24} />}
        type="warning"
        inverted
      />
      <CardListReadOnly
        title="Tipo Highlight"
        description="Destaque"
        icon={<PlaceholderOutline size={24} />}
        type="highlight"
        inverted
      />
      <CardListReadOnly
        title="Tipo Highlight Lead"
        description="Destaque principal"
        icon={<PlaceholderOutline size={24} />}
        type="highlight-lead"
        inverted
      />
      <CardListReadOnly
        title="Tipo Strikethrough"
        description="R$ 1.234,56"
        strikethroughDescription='riscado'
        icon={<PlaceholderOutline size={24} />}
        type="strikethrough"
        inverted
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
      <CardListReadOnly
        title="Card Normal"
        description="R$ 1.234,56"
        icon={<PlaceholderOutline size={24} />}
        type="default"
      />
      <CardListReadOnly
        title="Card Disabled"
        description="R$ 1.234,56"
        icon={<PlaceholderOutline size={24} />}
        type="default"
        disabled
      />
      <CardListReadOnly
        title="Card Loading"
        description="R$ 1.234,56"
        icon={<PlaceholderOutline size={24} />}
        type="default"
        loading
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
      <CardListReadOnly
        title="Badge Tiny - Brand"
        description="Indicator com badge tiny"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge variation="tiny" color="brand" />}
      />
      <CardListReadOnly
        title="Badge Small - Brand"
        description="Indicator com badge small e count"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge variation="small" count={5} color="brand" />}
      />
      <CardListReadOnly
        title="Badge Medium - Brand"
        description="Indicator com badge medium"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge variation="medium" count={99} color="brand" />}
      />
      <CardListReadOnly
        title="Badge Complementary"
        description="Indicator com cor complementary"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge count={3} color="complementary" />}
      />
      <CardListReadOnly
        title="Badge Alert"
        description="Indicator com cor alert"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge count={12} color="alert" />}
      />
      <CardListReadOnly
        title="Badge Neutral"
        description="Indicator com cor neutral"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge count={7} color="neutral" />}
      />
      <CardListReadOnly
        title="Badge com Texto"
        description="Indicator com texto ao invés de número"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge color="brand">Novo</Badge>}
      />
      <CardListReadOnly
        title="Tag Positive"
        description="Indicator com tag positive"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Tag type="positive" size="small">Aprovado</Tag>}
      />
      <CardListReadOnly
        title="Tag Warning"
        description="Indicator com tag warning"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Tag type="warning" size="small">Pendente</Tag>}
      />
      <CardListReadOnly
        title="Tag Negative"
        description="Indicator com tag negative"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Tag type="negative" setIconOff size="medium">Recusado</Tag>}
      />
      <CardListReadOnly
        title="Tag Neutral"
        description="Indicator com tag neutral"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Tag type="neutral" size="small">Info</Tag>}
      />
      <CardListReadOnly
        title="Tag Highlight"
        description="Indicator com tag highlight important"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Tag variant="highlight" type="important" size="small">Urgente</Tag>}
      />
      <CardListReadOnly
        title="Sem Indicator"
        description="Card sem indicator"
        icon={<PlaceholderOutline size={24} />}
      />
    </List>
  ),
};

// Story: Com e sem ícone
export const WithAndWithoutIcon: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List style={{ minWidth: '300px' }}>
      <CardListReadOnly
        title="Com Ícone"
        description="Card com ícone à esquerda"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge count={3} color="brand" />}
      />
      <CardListReadOnly
        title="Sem Ícone"
        description="Card sem ícone"
        indicator={<Badge count={3} color="brand" />}
      />
    </List>
  ),
};

// Story: Com caption
export const WithCaption: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List style={{ minWidth: '300px' }}>
      <CardListReadOnly
        title="Título do Card"
        description="Descrição do card"
        caption="Legenda adicional"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge count={3} color="brand" />}
      />
      <CardListReadOnly
        title="Título do Card"
        description="Descrição do card"
        caption="Legenda adicional"
        icon={<PlaceholderOutline size={24} />}
        indicator={<Badge count={3} color="brand" />}
        inverted
      />
    </List>
  ),
};

