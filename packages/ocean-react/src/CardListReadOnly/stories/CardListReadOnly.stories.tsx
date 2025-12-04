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

const iconOptions = {
  withIcon: defaultIcon,
  withoutIcon: undefined,
};

const indicatorOptions = {
  badgeCount: <Badge count={3} color="brand" />,
  badgeText: <Badge color="brand">Novo</Badge>,
  tagHighlight: (
    <Tag variant="highlight" type="important" size="small">
      Urgente
    </Tag>
  ),
  tagNeutral: (
    <Tag variant="default" size="small">
      Info
    </Tag>
  ),
  withoutIndicator: undefined,
};

const renderCardList = (
  items: Array<Partial<CardListReadOnlyProps> & { title?: string }>,
  commonProps?: Partial<CardListReadOnlyProps>
) => (
  <List style={listStyle}>
    {items.map((item, index) => {
      const mergedProps = { ...commonProps, ...item };
      if (!mergedProps.title) {
        mergedProps.title = '';
      }
      const key = mergedProps.title || `item-${index}`;
      return (
        <CardListReadOnly
          key={key}
          {...(mergedProps as CardListReadOnlyProps)}
        />
      );
    })}
  </List>
);

const meta: Meta<typeof CardListReadOnly> = {
  title: 'Components/CardList/CardListReadOnly',
  component: CardListReadOnly,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'The title of the card list read only.',
      control: 'text',
    },
    description: {
      description: 'The description or secondary text of the card.',
      control: 'text',
    },
    strikethroughDescription: {
      description: 'Description with strikethrough text.',
      control: 'text',
    },
    caption: {
      description: 'Caption or tertiary text of the card.',
      control: 'text',
    },
    icon: {
      description: 'Icon displayed at the beginning of the card.',
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      control: { type: 'select' },
    },
    indicator: {
      description: 'Indicator/badge displayed at the end of the card.',
      options: Object.keys(indicatorOptions),
      mapping: indicatorOptions,
      control: { type: 'select' },
    },
    type: {
      description: 'The style type of the list item.',
      options: ['card', 'text'],
      control: { type: 'select' },
    },
    status: {
      description: 'The status type of the card content.',
      options: [
        'default',
        'inactive',
        'positive',
        'warning',
        'highlight',
        'highlight-lead',
        'strikethrough',
      ],
      control: { type: 'select' },
    },
    inverted: {
      description: 'Inverts the position of title and description.',
      control: 'boolean',
    },
    disabled: {
      description: 'If true, the card will be visually disabled.',
      control: 'boolean',
    },
    loading: {
      description: 'If true, shows a loading state with skeleton.',
      control: 'boolean',
    },
    showDivider: {
      description:
        "If true, shows a divider between the items when type is 'text'.",
      control: 'boolean',
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
    strikethroughDescription: '',
    caption: '',
    icon: defaultIcon,
    indicator: indicatorOptions.badgeCount,
    type: 'card',
    status: 'default',
    inverted: false,
    disabled: false,
    loading: false,
    showDivider: false,
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
        <div style={{ width: '400px' }}>
          <StoryComponent />
        </div>
      </div>
    ),
  ],
};

// Story: Tipo Text com Divisor e Caption
export const TextTypeWithDividerAndCaption: Story = {
  parameters: disabledControls,
  render: () => (
    <div style={listStyle}>
      <CardListReadOnly
        title="Card com tipo Text"
        description="R$ 1.234,56"
        caption="Legenda terciária"
        icon={defaultIcon}
        type="text"
        showDivider
      />
      <CardListReadOnly
        title="Card com Caption"
        description="Descrição secundária"
        caption="12/12/2024 às 14:30"
        icon={defaultIcon}
        type="text"
        showDivider
      />
      <CardListReadOnly
        title="Card Invertido com Caption"
        description="R$ 500,00"
        caption="Crédito aprovado"
        icon={defaultIcon}
        type="text"
        inverted
        showDivider
      />
      <CardListReadOnly
        title="Último Card sem Divisor"
        description="Sem showDivider"
        caption="Este é o último item"
        icon={defaultIcon}
        type="text"
      />
    </div>
  ),
};

// Story: Todos os status
export const AllStatus: Story = {
  parameters: disabledControls,
  render: () =>
    renderCardList(
      [
        {
          status: 'default',
          title: 'Default',
          description: 'R$ 1.234,56',
        },
        {
          status: 'inactive',
          title: 'Inactive',
          description: 'Conteúdo inativo',
        },
        {
          status: 'positive',
          title: 'Positive',
          description: '+ R$ 500,00',
        },
        {
          status: 'warning',
          title: 'Warning',
          description: 'Atenção necessária',
        },
        {
          status: 'highlight',
          title: 'Highlight',
          description: 'Em destaque',
        },
        {
          status: 'highlight-lead',
          title: 'Highlight Lead',
          description: 'Destaque principal',
        },
        {
          status: 'strikethrough',
          title: 'Strikethrough',
          description: 'Texto riscado',
        },
      ],
      { icon: defaultIcon }
    ),
};

// Story: Status com strikethroughDescription
export const WithStrikethroughDescription: Story = {
  parameters: disabledControls,
  render: () =>
    renderCardList(
      [
        {
          title: 'Produto em Promoção',
          description: 'R$ 79,90',
          strikethroughDescription: 'R$ 99,90',
        },
        {
          title: 'Desconto Especial',
          description: 'R$ 149,00',
          strikethroughDescription: 'R$ 199,00',
          status: 'positive',
        },
      ],
      { icon: defaultIcon }
    ),
};

// Story: Com caption
export const WithCaption: Story = {
  parameters: disabledControls,
  render: () =>
    renderCardList(
      [
        {
          title: 'Título do Card',
          description: 'Descrição principal',
          caption: 'Legenda adicional',
          inverted: false,
        },
        {
          title: 'Título Invertido',
          description: 'Descrição principal',
          caption: 'Legenda adicional',
          inverted: true,
        },
      ],
      { icon: defaultIcon, indicator: <Badge count={3} color="brand" /> }
    ),
};

// Story: Inverted (título e descrição invertidos)
export const Inverted: Story = {
  parameters: disabledControls,
  render: () =>
    renderCardList(
      [
        {
          title: 'Normal',
          description: 'R$ 1.234,56',
          inverted: false,
        },
        {
          title: 'Invertido',
          description: 'R$ 1.234,56',
          inverted: true,
        },
      ],
      { icon: defaultIcon }
    ),
};

// Story: Todos os indicadores
export const AllIndicators: Story = {
  parameters: disabledControls,
  render: () =>
    renderCardList(
      [
        {
          title: 'Badge com Contador',
          description: 'Indicator numérico',
          indicator: <Badge count={3} color="brand" />,
        },
        {
          title: 'Badge com Texto',
          description: 'Indicator com texto',
          indicator: <Badge color="brand">Novo</Badge>,
        },
        {
          title: 'Tag Highlight',
          description: 'Indicator com tag highlight',
          indicator: (
            <Tag variant="highlight" type="important" size="small">
              Urgente
            </Tag>
          ),
        },
        {
          title: 'Tag Neutral',
          description: 'Indicator com tag neutra',
          indicator: (
            <Tag variant="default" size="small">
              Info
            </Tag>
          ),
        },
        {
          title: 'Sem Indicator',
          description: 'Card sem indicator',
          indicator: undefined,
        },
      ],
      { icon: defaultIcon }
    ),
};

// Story: Com e sem ícone
export const WithAndWithoutIcon: Story = {
  parameters: disabledControls,
  render: () =>
    renderCardList(
      [
        {
          title: 'Com Ícone',
          description: 'Card com ícone à esquerda',
          icon: defaultIcon,
        },
        { title: 'Sem Ícone', description: 'Card sem ícone' },
      ],
      { indicator: <Badge count={3} color="brand" /> }
    ),
};

// Story: Estados disabled e loading
export const DisabledAndLoading: Story = {
  parameters: disabledControls,
  render: () =>
    renderCardList(
      [
        { title: 'Card Normal', disabled: false, loading: false },
        { title: 'Card Disabled', disabled: true, loading: false },
        { title: 'Card Loading', loading: true },
      ],
      { description: 'R$ 1.234,56', icon: defaultIcon, type: 'card' }
    ),
};

// Story: Comparação entre tipos Card e Text
export const CardVsText: Story = {
  parameters: disabledControls,
  render: () => (
    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <div>
        <h4 style={{ marginBottom: '16px' }}>type=&quot;card&quot; (padrão)</h4>
        {renderCardList(
          [
            { title: 'Card Type', description: 'Com borda de card', caption: 'Caption de exemplo' },
            { title: 'Outro Card', description: 'Segunda linha', caption: 'Mais informações' },
            { title: 'Terceiro Card', description: 'Terceira linha' },
          ],
          { type: 'card', icon: defaultIcon }
        )}
      </div>
      <div>
        <h4 style={{ marginBottom: '16px' }}>type=&quot;text&quot;</h4>
        {renderCardList(
          [
            { title: 'Text Type', description: 'Sem borda de card', caption: 'Caption de exemplo' },
            { title: 'Outro Text', description: 'Segunda linha', caption: 'Mais informações' },
            { title: 'Terceiro Text', description: 'Terceira linha' },
          ],
          { type: 'text', icon: defaultIcon }
        )}
      </div>
    </div>
  ),
};

// Story: ShowDivider (para tipo text)
export const ShowDivider: Story = {
  parameters: disabledControls,
  render: () => (
    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <div>
        <h4 style={{ marginBottom: '16px' }}>Sem Divider</h4>
        {renderCardList(
          [
            { title: 'Item 1', description: 'Descrição 1' },
            { title: 'Item 2', description: 'Descrição 2' },
            { title: 'Item 3', description: 'Descrição 3' },
          ],
          { type: 'text', showDivider: false, icon: defaultIcon }
        )}
      </div>
      <div>
        <h4 style={{ marginBottom: '16px' }}>Com Divider</h4>
        {renderCardList(
          [
            { title: 'Item 1', description: 'Descrição 1' },
            { title: 'Item 2', description: 'Descrição 2' },
            { title: 'Item 3', description: 'Descrição 3' },
          ],
          { type: 'text', showDivider: true, icon: defaultIcon }
        )}
      </div>
    </div>
  ),
};

// Story: Exemplo completo com todas as props
export const CompleteExample: Story = {
  parameters: disabledControls,
  render: () =>
    renderCardList(
      [
        {
          title: 'Transação Aprovada',
          description: '+ R$ 1.500,00',
          caption: 'Crédito em conta',
          status: 'positive',
          indicator: (
            <Tag variant="highlight" type="neutral" size="small">
              Concluído
            </Tag>
          ),
        },
        {
          title: 'Pagamento Pendente',
          description: 'R$ 350,00',
          caption: 'Aguardando confirmação',
          status: 'warning',
          indicator: (
            <Tag variant="highlight" type="important" size="small">
              Pendente
            </Tag>
          ),
        },
        {
          title: 'Promoção Especial',
          description: 'R$ 79,90',
          strikethroughDescription: 'R$ 149,90',
          caption: 'Oferta válida até 31/12',
          status: 'highlight',
          indicator: <Badge color="brand">-47%</Badge>,
        },
        {
          title: 'Conta Inativa',
          description: 'Sem movimentação',
          caption: 'Última atividade: 30 dias',
          status: 'inactive',
          disabled: true,
        },
      ],
      { icon: defaultIcon }
    ),
};
