import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  PlaceholderOutline,
  ChevronRight,
  Star,
} from '@useblu/ocean-icons-react';
import CardListItem from '../CardListItem';

const meta: Meta<typeof CardListItem> = {
  title: 'Components/CardListItem',
  component: CardListItem,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'O título do item da lista (obrigatório).',
      control: 'text',
    },
    description: {
      description: 'A descrição opcional do item.',
      control: 'text',
    },
    caption: {
      description: 'O texto de legenda (visível apenas no tamanho medium).',
      control: 'text',
    },
    leadingIcon: {
      description: 'Ícone exibido à esquerda do conteúdo.',
      control: 'text',
      table: {
        disable: true,
      },
    },
    actionIcon: {
      description: 'Ícone de ação exibido à direita.',
      control: 'text',
      table: {
        disable: true,
      },
    },
    size: {
      description: 'O tamanho do componente.',
      control: 'select',
      options: ['small', 'medium'],
    },
    disabled: {
      description: 'Desabilita o componente.',
      control: 'boolean',
    },
    fullWidth: {
      description: 'Faz o componente ocupar toda a largura disponível.',
      control: 'boolean',
    },
    tag: {
      description: 'Texto da tag exibida na área de tags.',
      control: 'text',
    },
    loading: {
      description: 'Exibe um estado de carregamento (skeleton).',
      control: 'boolean',
    },
    onClick: {
      description: 'Função chamada quando o item é clicado.',
      table: {
        disable: true,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CardListItem>;

export const Usage: Story = {
  args: {
    title: 'Título do Item',
    description: 'Descrição do item da lista',
    caption: 'Legenda adicional',
    leadingIcon: <PlaceholderOutline />,
    actionIcon: <ChevronRight />,
    size: 'medium',
    tag: 'Novo',
    disabled: false,
    fullWidth: false,
    loading: false,
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          minWidth: '300px',
          maxWidth: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Small</h4>
        <CardListItem
          title="Item Pequeno"
          description="Descrição para o tamanho small"
          leadingIcon={<PlaceholderOutline />}
          actionIcon={<ChevronRight />}
          size="small"
          tag="Tag"
        />
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
          Medium (padrão)
        </h4>
        <CardListItem
          title="Item Médio"
          description="Descrição para o tamanho medium"
          caption="Legenda só aparece no medium"
          leadingIcon={<PlaceholderOutline />}
          actionIcon={<ChevronRight />}
          size="medium"
          tag="Tag"
        />
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <CardListItem
        title="Com Leading Icon"
        description="Item com ícone à esquerda"
        leadingIcon={<Star />}
        actionIcon={<ChevronRight />}
      />

      <CardListItem
        title="Sem Leading Icon"
        description="Item apenas com ícone de ação"
        actionIcon={<ChevronRight />}
      />

      <CardListItem title="Sem Ícones" description="Item sem nenhum ícone" />
    </div>
  ),
};

export const WithTags: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <CardListItem
        title="Com Tag"
        description="Item com tag destacada"
        leadingIcon={<PlaceholderOutline />}
        actionIcon={<ChevronRight />}
        tag="Novo"
      />

      <CardListItem
        title="Tag e Caption"
        description="Item com tag e caption"
        caption="Caption adicional"
        leadingIcon={<PlaceholderOutline />}
        actionIcon={<ChevronRight />}
        tag="Popular"
      />

      <CardListItem
        title="Sem Tag"
        description="Item sem tag"
        leadingIcon={<PlaceholderOutline />}
        actionIcon={<ChevronRight />}
      />
    </div>
  ),
};

export const TagVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <CardListItem
        leadingIcon={<PlaceholderOutline />}
        actionIcon={<ChevronRight />}
        title="Tag highlight importante"
        description="Exemplo de destaque crítico"
        tag={{
          variant: 'highlight',
          type: 'important',
          children: 'Importante',
        }}
      />
      <CardListItem
        leadingIcon={<PlaceholderOutline />}
        actionIcon={<ChevronRight />}
        title="Tag highlight neutra"
        description="Exemplo com variante highlight neutra"
        tag={{ variant: 'highlight', type: 'neutral', children: 'Neutra' }}
      />
      <CardListItem
        leadingIcon={<PlaceholderOutline />}
        actionIcon={<ChevronRight />}
        title="Tag default positiva"
        description="Tag padrão com tipo positivo"
        tag={{ type: 'positive', children: 'Sucesso', setIconOff: true }}
      />
      <CardListItem
        leadingIcon={<PlaceholderOutline />}
        actionIcon={<ChevronRight />}
        title="Tag default neutra"
        description="Tag padrão com tipo neutro"
        tag={{ type: 'neutral', children: 'Neutro', setIconOff: true }}
      />
      <CardListItem
        leadingIcon={<PlaceholderOutline />}
        actionIcon={<ChevronRight />}
        title="Tag default default"
        description="Tag padrão com tipo default"
        tag={{ type: 'default', children: 'Default', setIconOff: true }}
      />
      <CardListItem
        leadingIcon={<PlaceholderOutline />}
        actionIcon={<ChevronRight />}
        title="Tag default negativa"
        description="Tag padrão com tipo negativo"
        tag={{ type: 'negative', children: 'Erro', setIconOff: true }}
      />
      <CardListItem
        leadingIcon={<PlaceholderOutline />}
        actionIcon={<ChevronRight />}
        title="Tag default neutral-02"
        description="Tag padrão com tipo neutral-02"
        tag={{ type: 'neutral-02', children: 'Neutral 02', setIconOff: true }}
      />
      <CardListItem
        leadingIcon={<PlaceholderOutline />}
        actionIcon={<ChevronRight />}
        title="Tag default neutral-03"
        description="Tag padrão com tipo neutral-03"
        tag={{ type: 'neutral-03', children: 'Neutral 03', setIconOff: true }}
      />
    </div>
  ),
};

export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Normal</h4>
        <CardListItem
          title="Item Normal"
          description="Estado padrão do item"
          leadingIcon={<PlaceholderOutline />}
          actionIcon={<ChevronRight />}
          tag="Ativo"
        />
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Disabled</h4>
        <CardListItem
          title="Item Desabilitado"
          description="Item em estado desabilitado"
          leadingIcon={<PlaceholderOutline />}
          actionIcon={<ChevronRight />}
          disabled
          tag="Inativo"
        />
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Loading</h4>
        <CardListItem
          title="Este título será ignorado"
          description="Esta descrição será ignorada"
          loading
        />
      </div>
    </div>
  ),
};

export const FullWidth: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '16px' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
          Largura Normal
        </h4>
        <CardListItem
          title="Item com largura normal"
          description="Este item tem largura padrão"
          leadingIcon={<PlaceholderOutline />}
          actionIcon={<ChevronRight />}
        />
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Full Width</h4>
        <CardListItem
          title="Item com largura total"
          description="Este item ocupa toda a largura disponível"
          leadingIcon={<PlaceholderOutline />}
          actionIcon={<ChevronRight />}
          fullWidth
        />
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <CardListItem
        title="Item Clicável"
        description="Clique neste item para ver a ação"
        leadingIcon={<PlaceholderOutline />}
        actionIcon={<ChevronRight />}
        tag="Clicável"
        onClick={() => alert('Item clicado!')}
      />

      <CardListItem
        title="Item Não Clicável"
        description="Este item não tem ação onClick"
        leadingIcon={<PlaceholderOutline />}
        actionIcon={<ChevronRight />}
        tag="Estático"
      />

      <CardListItem
        title="Item Desabilitado Clicável"
        description="Este item está desabilitado, mesmo tendo onClick"
        leadingIcon={<PlaceholderOutline />}
        actionIcon={<ChevronRight />}
        disabled
        onClick={() => alert('Este alert não deveria aparecer')}
      />
    </div>
  ),
};
