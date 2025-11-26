import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PlaceholderOutline } from '@useblu/ocean-icons-react';
import CardListReadOnly from '../CardListReadOnly';
import Badge from '../../Badge';
import Tag from '../../Tag';
import List from '../../List';

const defaultIcon = <PlaceholderOutline size={24} />;
const listStyle = { minWidth: '300px' };

const typeExamples = [
  { type: 'default' as const, title: 'Tipo Default', description: 'R$ 1.234,56' },
  { type: 'inactive' as const, title: 'Tipo Inactive', description: 'Inativo' },
  { type: 'positive' as const, title: 'Tipo Positive', description: '+ R$ 500,00' },
  { type: 'warning' as const, title: 'Tipo Warning', description: 'Atenção necessária' },
  { type: 'highlight' as const, title: 'Tipo Highlight', description: 'Destaque' },
  { type: 'highlight-lead' as const, title: 'Tipo Highlight Lead', description: 'Destaque principal' },
  { type: 'strikethrough' as const, title: 'Tipo Strikethrough', description: 'R$ 1.234,56', strikethroughDescription: 'riscado' },
];

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
    icon: defaultIcon,
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
    <List style={listStyle}>
      {typeExamples.map(({ type, title, description, strikethroughDescription }) => (
        <CardListReadOnly
          key={type}
          icon={defaultIcon}
          type={type}
          title={title}
          description={description}
          strikethroughDescription={strikethroughDescription}
        />
      ))}
    </List>
  ),
};

// Story: Todos os tipos invertidos
export const AllTypesInverted: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List style={listStyle}>
      {typeExamples.map(({ type, title, description, strikethroughDescription }) => (
        <CardListReadOnly
          key={type}
          icon={defaultIcon}
          type={type}
          title={title}
          description={description}
          strikethroughDescription={strikethroughDescription}
          inverted
        />
      ))}
    </List>
  ),
};

// Story: Estados disabled e loading
export const DisabledAndLoading: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const baseProps = {
      title: 'Card Normal',
      description: 'R$ 1.234,56',
      icon: defaultIcon,
      type: 'default' as const,
    };

    return (
      <List style={listStyle}>
        <CardListReadOnly {...baseProps} />
        <CardListReadOnly {...baseProps} title="Card Disabled" disabled />
        <CardListReadOnly {...baseProps} title="Card Loading" loading />
      </List>
    );
  },
};

// Story: Todos os indicadores
export const AllIndicators: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const baseProps = {
      icon: defaultIcon,
    };

    return (
      <List style={listStyle}>
        <CardListReadOnly
          {...baseProps}
          title="Badge Tiny - Brand"
          description="Indicator com badge tiny"
          indicator={<Badge variation="tiny" color="brand" />}
        />
        <CardListReadOnly
          {...baseProps}
          title="Badge Small - Brand"
          description="Indicator com badge small e count"
          indicator={<Badge variation="small" count={5} color="brand" />}
        />
        <CardListReadOnly
          {...baseProps}
          title="Badge Medium - Brand"
          description="Indicator com badge medium"
          indicator={<Badge variation="medium" count={99} color="brand" />}
        />
        <CardListReadOnly
          {...baseProps}
          title="Badge Complementary"
          description="Indicator com cor complementary"
          indicator={<Badge count={3} color="complementary" />}
        />
        <CardListReadOnly
          {...baseProps}
          title="Badge Alert"
          description="Indicator com cor alert"
          indicator={<Badge count={12} color="alert" />}
        />
        <CardListReadOnly
          {...baseProps}
          title="Badge Neutral"
          description="Indicator com cor neutral"
          indicator={<Badge count={7} color="neutral" />}
        />
        <CardListReadOnly
          {...baseProps}
          title="Badge com Texto"
          description="Indicator com texto ao invés de número"
          indicator={<Badge color="brand">Novo</Badge>}
        />
        <CardListReadOnly
          {...baseProps}
          title="Tag Positive"
          description="Indicator com tag positive"
          indicator={<Tag type="positive" size="small">Aprovado</Tag>}
        />
        <CardListReadOnly
          {...baseProps}
          title="Tag Warning"
          description="Indicator com tag warning"
          indicator={<Tag type="warning" size="small">Pendente</Tag>}
        />
        <CardListReadOnly
          {...baseProps}
          title="Tag Negative"
          description="Indicator com tag negative"
          indicator={<Tag type="negative" setIconOff size="medium">Recusado</Tag>}
        />
        <CardListReadOnly
          {...baseProps}
          title="Tag Neutral"
          description="Indicator com tag neutral"
          indicator={<Tag type="neutral" size="small">Info</Tag>}
        />
        <CardListReadOnly
          {...baseProps}
          title="Tag Highlight"
          description="Indicator com tag highlight important"
          indicator={<Tag variant="highlight" type="important" size="small">Urgente</Tag>}
        />
        <CardListReadOnly
          {...baseProps}
          title="Sem Indicator"
          description="Card sem indicator"
        />
      </List>
    );
  },
};

// Story: Com e sem ícone
export const WithAndWithoutIcon: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const commonIndicator = <Badge count={3} color="brand" />;

    return (
      <List style={listStyle}>
        <CardListReadOnly
          title="Com Ícone"
          description="Card com ícone à esquerda"
          icon={defaultIcon}
          indicator={commonIndicator}
        />
        <CardListReadOnly
          title="Sem Ícone"
          description="Card sem ícone"
          indicator={commonIndicator}
        />
      </List>
    );
  },
};

// Story: Com caption
export const WithCaption: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const baseProps = {
      title: 'Título do Card',
      description: 'Descrição do card',
      caption: 'Legenda adicional',
      icon: defaultIcon,
      indicator: <Badge count={3} color="brand" />,
    };

    return (
      <List style={listStyle}>
        <CardListReadOnly {...baseProps} />
        <CardListReadOnly {...baseProps} inverted />
      </List>
    );
  },
};

