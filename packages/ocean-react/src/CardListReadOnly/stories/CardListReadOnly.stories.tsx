import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PlaceholderOutline } from '@useblu/ocean-icons-react';
import CardListReadOnly from '../CardListReadOnly';
import type { CardListReadOnlyProps } from '../CardListReadOnly';
import Badge from '../../Badge';
import Tag from '../../Tag';
import List from '../../List';

const defaultIcon = <PlaceholderOutline size={24} />;
const listStyle = { minWidth: '300px' };
const disabledControls = { controls: { disable: true } };

const typeExamples = [
  { type: 'default' as const, title: 'Tipo Default', description: 'R$ 1.234,56' },
  { type: 'inactive' as const, title: 'Tipo Inactive', description: 'Inativo' },
  { type: 'positive' as const, title: 'Tipo Positive', description: '+ R$ 500,00' },
  { type: 'warning' as const, title: 'Tipo Warning', description: 'Atenção necessária' },
  { type: 'highlight' as const, title: 'Tipo Highlight', description: 'Destaque' },
  { type: 'highlight-lead' as const, title: 'Tipo Highlight Lead', description: 'Destaque principal' },
  { type: 'strikethrough' as const, title: 'Tipo Strikethrough', description: 'R$ 1.234,56', strikethroughDescription: 'riscado' },
];

const indicatorExamples = [
  { title: 'Badge com Texto', description: 'Indicator com texto ao invés de número', indicator: <Badge color="brand">Novo</Badge> },
  { title: 'Tag Highlight', description: 'Indicator com tag highlight important', indicator: <Tag variant="highlight" type="important" size="small">Urgente</Tag> },
  { title: 'Sem Indicator', description: 'Card sem indicator', indicator: undefined },
];

const renderCardList = (items: Array<Partial<CardListReadOnlyProps> & { title?: string }>, commonProps?: Partial<CardListReadOnlyProps>) => (
  <List style={listStyle}>
    {items.map((item, index) => {
      const mergedProps = { ...commonProps, ...item };
      if (!mergedProps.title) {
        mergedProps.title = '';
      }
      return <CardListReadOnly key={index} {...mergedProps as CardListReadOnlyProps} />;
    })}
  </List>
);

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
  parameters: disabledControls,
  render: () => renderCardList(typeExamples, { icon: defaultIcon }),
};

// Story: Todos os tipos invertidos
export const AllTypesInverted: Story = {
  parameters: disabledControls,
  render: () => renderCardList(typeExamples, { icon: defaultIcon, inverted: true }),
};

// Story: Estados disabled e loading
export const DisabledAndLoading: Story = {
  parameters: disabledControls,
  render: () => renderCardList([
    { title: 'Card Normal' },
    { title: 'Card Disabled', disabled: true },
    { title: 'Card Loading', loading: true },
  ], { description: 'R$ 1.234,56', icon: defaultIcon, type: 'default' }),
};

// Story: Todos os indicadores
export const AllIndicators: Story = {
  parameters: disabledControls,
  render: () => renderCardList(indicatorExamples, { icon: defaultIcon }),
};

// Story: Com e sem ícone
export const WithAndWithoutIcon: Story = {
  parameters: disabledControls,
  render: () => renderCardList([
    { title: 'Com Ícone', description: 'Card com ícone à esquerda', icon: defaultIcon },
    { title: 'Sem Ícone', description: 'Card sem ícone' },
  ], { indicator: <Badge count={3} color="brand" /> }),
};

// Story: Com caption
export const WithCaption: Story = {
  parameters: disabledControls,
  render: () => renderCardList([
    { inverted: false },
    { inverted: true },
  ], {
    title: 'Título do Card',
    description: 'Descrição do card',
    caption: 'Legenda adicional',
    icon: defaultIcon,
    indicator: <Badge count={3} color="brand" />,
  }),
};

