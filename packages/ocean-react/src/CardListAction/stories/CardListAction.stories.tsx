import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  Star,
  Pencil,
  Share,
  Archive,
  Trash,
  PlaceholderOutline,
  Cog,
  Heart,
  Bell,
} from '@useblu/ocean-icons-react';
import CardListAction from '../CardListAction';
import List from '../../List';
import Tag from '../../Tag';
import Badge from '../../Badge';
import type { ActionItem } from '../../InternalListActions/types';

const meta: Meta<typeof CardListAction> = {
  title: 'Components/CardList/CardListAction',
  component: CardListAction,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'O título do item (obrigatório).',
      control: 'text',
    },
    description: {
      description: 'A descrição do item.',
      control: 'text',
    },
    strikethroughDescription: {
      description: 'Descrição com texto riscado (tachado).',
      control: 'text',
    },
    caption: {
      description: 'Texto de legenda adicional.',
      control: 'text',
    },
    inverted: {
      description: 'Inverte a ordem de exibição entre descrição e título.',
      control: 'boolean',
    },
    type: {
      description: 'Tipo visual do conteúdo.',
      control: 'select',
      options: ['default', 'primary', 'secondary'],
    },
    disabled: {
      description: 'Desabilita o componente.',
      control: 'boolean',
    },
    loading: {
      description: 'Exibe um estado de carregamento (skeleton).',
      control: 'boolean',
    },
    icon: {
      description: 'Ícone exibido à esquerda do conteúdo.',
      control: false,
      table: { disable: true },
    },
    indicator: {
      description: 'Componente indicador exibido (Tag, Badge, Brands, etc.).',
      control: false,
    },
    actionType: {
      description: 'Tipo de ação exibida à direita.',
      control: 'select',
      options: ['chevron', 'menu', 'swipe', 'none'],
    },
    menuActions: {
      description: 'Lista de ações para o menu dropdown (usado com actionType="menu").',
      control: false,
      table: { disable: true },
    },
    menuPosition: {
      description: 'Posição do menu dropdown.',
      control: 'select',
      options: ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
    },
    onClick: {
      description: 'Função chamada quando o item é clicado.',
      table: { disable: true },
    },
    className: {
      description: 'Classes CSS adicionais.',
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
  },
  {
    label: 'Compartilhar',
    onClick: () => alert('Compartilhar clicado!'),
    icon: <Share />,
  },
  {
    label: 'Excluir',
    onClick: () => alert('Excluir clicado!'),
    icon: <Trash />,
    variant: 'negative',
  },
];

export const Usage: Story = {
  args: {
    title: 'Título do Item',
    description: 'Descrição do item',
    caption: 'Legenda adicional',
    icon: <Star />,
    actionType: 'chevron',
    disabled: false,
    loading: false,
    inverted: false,
    type: 'default',
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

export const ActionTypes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        code: `// Chevron (padrão)
<CardListAction
  title="Com Chevron"
  description="Ação de navegação"
  icon={<Star />}
  actionType="chevron"
  onClick={() => alert('Clicou!')}
/>

// Menu
<CardListAction
  title="Com Menu"
  description="Múltiplas ações"
  icon={<Star />}
  actionType="menu"
  menuActions={[
    { label: 'Editar', onClick: () => {}, icon: <Pencil /> },
    { label: 'Excluir', onClick: () => {}, icon: <Trash />, variant: 'negative' },
  ]}
/>

// Swipe (trabalha com InternalListActions)
<CardListAction
  title="Com Swipe"
  description="Ações por arrastar"
  icon={<Star />}
  actionType="swipe"
  menuActions={[
    { label: 'Editar', onClick: () => {}, icon: <Pencil /> },
    { label: 'Excluir', onClick: () => {}, icon: <Trash />, variant: 'negative' },
  ]}
/>

// None
<CardListAction
  title="Sem Ação"
  description="Apenas exibição"
  icon={<Star />}
  actionType="none"
/>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
          Chevron (Navegação)
        </h4>
        <List>
          <CardListAction
            title="Detalhes da Conta"
            description="Ver informações completas"
            icon={<PlaceholderOutline />}
            actionType="chevron"
            onClick={() => alert('Navegando...')}
          />
        </List>
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Menu (Dropdown)</h4>
        <List>
          <CardListAction
            title="Conta Corrente"
            description="R$ 1.234,56"
            icon={<Star />}
            actionType="menu"
            menuActions={defaultMenuActions}
          />
        </List>
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Swipe (Arrastar)</h4>
        <List>
          <CardListAction
            title="Investimentos"
            description="Total aplicado"
            icon={<Heart />}
            actionType="swipe"
            menuActions={defaultMenuActions}
          />
        </List>
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>None (Sem ação)</h4>
        <List>
          <CardListAction
            title="Informação Estática"
            description="Apenas para visualização"
            icon={<PlaceholderOutline />}
            actionType="none"
          />
        </List>
      </div>
    </div>
  ),
};

export const WithTags: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        code: `import Tag from '../Tag';
import Badge from '../Badge';

<CardListAction
  title="Conta Premium"
  description="Benefícios exclusivos"
  icon={<Star />}
  indicator={<Tag size="medium" type="positive">Novo</Tag>}
  actionType="chevron"
/>

<CardListAction
  title="Promoção Especial"
  description="Até 30% de desconto"
  icon={<Heart />}
  indicator={<Badge color="alert">Promo</Badge>}
  actionType="chevron"
/>`,
      },
    },
  },
  render: () => (
    <List>
      <CardListAction
        title="Conta Premium"
        description="Benefícios exclusivos"
        caption="Upgrade disponível"
        icon={<Star />}
        indicator={<Tag size="medium" type="positive">Novo</Tag>}
        actionType="chevron"
        onClick={() => alert('Ver detalhes')}
      />

      <CardListAction
        title="Promoção Especial"
        description="Até 30% de desconto"
        caption="Válida até 31/12"
        icon={<Heart />}
        indicator={<Badge color="alert">Promo</Badge>}
        actionType="chevron"
        onClick={() => alert('Ver promoção')}
      />

      <CardListAction
        title="Configurações"
        description="Personalize sua experiência"
        icon={<Cog />}
        indicator={<Tag size="medium" type="neutral">Beta</Tag>}
        actionType="menu"
        menuActions={defaultMenuActions}
      />
    </List>
  ),
};

export const ContentTypes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        code: `// Default
<CardListAction
  title="Tipo Default"
  description="Estilo padrão"
  type="default"
/>

// Positive
<CardListAction
  title="Tipo Positive"
  description="Estilo positivo"
  type="positive"
/>

// Warning
<CardListAction
  title="Tipo Warning"
  description="Estilo de aviso"
  type="warning"
/>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Default</h4>
        <List>
          <CardListAction
            title="Tipo Default"
            description="Estilo padrão do conteúdo"
            caption="Legenda padrão"
            icon={<Star />}
            type="default"
            actionType="chevron"
          />
        </List>
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Positive</h4>
        <List>
          <CardListAction
            title="Tipo Positive"
            description="Estilo positivo do conteúdo"
            caption="Legenda positiva"
            icon={<Star />}
            type="positive"
            actionType="chevron"
          />
        </List>
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Warning</h4>
        <List>
          <CardListAction
            title="Tipo Warning"
            description="Estilo de aviso do conteúdo"
            caption="Legenda de aviso"
            icon={<Star />}
            type="warning"
            actionType="chevron"
          />
        </List>
      </div>
    </div>
  ),
};

export const InvertedContent: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        code: `// Normal (inverted=false)
<CardListAction
  title="R$ 1.234,56"
  description="Saldo disponível"
  inverted={false}
/>

// Invertido (inverted=true)
<CardListAction
  title="R$ 1.234,56"
  description="Saldo disponível"
  inverted={true}
/>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Normal</h4>
        <List>
          <CardListAction
            title="R$ 1.234,56"
            description="Saldo disponível"
            caption="Conta Corrente"
            icon={<Star />}
            inverted={false}
            actionType="chevron"
          />
        </List>
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
          Invertido (descrição acima do título)
        </h4>
        <List>
          <CardListAction
            title="R$ 1.234,56"
            description="Saldo disponível"
            caption="Conta Corrente"
            icon={<Star />}
            inverted
            actionType="chevron"
          />
        </List>
      </div>
    </div>
  ),
};

export const WithStrikethroughDescription: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        code: `import Tag from '../Tag';

<CardListAction
  title="Produto em Oferta"
  description="R$ 99,90"
  strikethroughDescription="R$ 149,90"
  caption="Desconto de 33%"
  icon={<Heart />}
  indicator={<Tag size="medium" type="warning">Oferta</Tag>}
  actionType="chevron"
/>`,
      },
    },
  },
  render: () => (
    <List>
      <CardListAction
        title="Produto em Oferta"
        description="R$ 99,90"
        strikethroughDescription="R$ 149,90"
        caption="Desconto de 33%"
        icon={<Heart />}
        indicator={<Tag size="medium" type="warning">Oferta</Tag>}
        actionType="chevron"
        onClick={() => alert('Ver oferta')}
      />

      <CardListAction
        title="Plano Anual"
        description="R$ 89,90/mês"
        strikethroughDescription="R$ 119,90/mês"
        caption="Economize R$ 360/ano"
        icon={<Star />}
        indicator={<Badge color="brand">Popular</Badge>}
        actionType="chevron"
        onClick={() => alert('Assinar plano')}
      />
    </List>
  ),
};

export const States: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        code: `// Normal
<CardListAction
  title="Item Normal"
  description="Estado padrão"
  icon={<Star />}
  actionType="chevron"
/>

// Disabled
<CardListAction
  title="Item Desabilitado"
  description="Não pode ser clicado"
  icon={<Star />}
  actionType="chevron"
  disabled
/>

// Loading
<CardListAction
  title="Este será ignorado"
  description="Também será ignorado"
  icon={<Star />}
  loading
/>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Normal</h4>
        <List>
          <CardListAction
            title="Conta Ativa"
            description="Saldo disponível"
            caption="R$ 1.234,56"
            icon={<PlaceholderOutline />}
            indicator={<Tag size="medium" type="positive">Ativo</Tag>}
            actionType="chevron"
            onClick={() => alert('Clicou!')}
          />
        </List>
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Disabled</h4>
        <List>
          <CardListAction
            title="Conta Bloqueada"
            description="Acesso temporariamente indisponível"
            caption="Entre em contato"
            icon={<PlaceholderOutline />}
            indicator={<Tag size="medium" type="negative">Bloqueado</Tag>}
            actionType="chevron"
            disabled
            onClick={() => alert('Este alert não deveria aparecer')}
          />
        </List>
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Loading</h4>
        <List>
          <CardListAction
            title="Este título será ignorado"
            description="Esta descrição será ignorada"
            icon={<PlaceholderOutline />}
            loading
          />
        </List>
      </div>
    </div>
  ),
};

export const MenuPositions: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        code: `// Bottom Right (padrão)
<CardListAction
  title="Menu Bottom Right"
  description="Posição padrão"
  actionType="menu"
  menuPosition="bottom-right"
  menuActions={actions}
/>

// Bottom Left
<CardListAction
  title="Menu Bottom Left"
  description="Menu abre à esquerda"
  actionType="menu"
  menuPosition="bottom-left"
  menuActions={actions}
/>

// Top Right
<CardListAction
  title="Menu Top Right"
  description="Menu abre acima"
  actionType="menu"
  menuPosition="top-right"
  menuActions={actions}
/>

// Top Left
<CardListAction
  title="Menu Top Left"
  description="Menu abre acima à esquerda"
  actionType="menu"
  menuPosition="top-left"
  menuActions={actions}
/>`,
      },
    },
  },
  render: () => (
    <div
      style={{
        padding: '40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '60px',
      }}
    >
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Bottom Right</h4>
        <List>
          <CardListAction
            title="Menu Inferior Direito"
            description="Posição padrão do menu"
            icon={<Cog />}
            actionType="menu"
            menuPosition="bottom-right"
            menuActions={defaultMenuActions}
          />
        </List>
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Bottom Left</h4>
        <List>
          <CardListAction
            title="Menu Inferior Esquerdo"
            description="Menu abre à esquerda"
            icon={<Cog />}
            actionType="menu"
            menuPosition="bottom-left"
            menuActions={defaultMenuActions}
          />
        </List>
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Top Right</h4>
        <List>
          <CardListAction
            title="Menu Superior Direito"
            description="Menu abre acima"
            icon={<Cog />}
            actionType="menu"
            menuPosition="top-right"
            menuActions={defaultMenuActions}
          />
        </List>
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Top Left</h4>
        <List>
          <CardListAction
            title="Menu Superior Esquerdo"
            description="Menu abre acima à esquerda"
            icon={<Cog />}
            actionType="menu"
            menuPosition="top-left"
            menuActions={defaultMenuActions}
          />
        </List>
      </div>
    </div>
  ),
};

export const WithComplexMenuActions: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        code: `const complexActions: ActionItem[] = [
  {
    label: 'Ação Padrão',
    onClick: () => {},
    icon: <Pencil />,
    variant: 'default',
  },
  {
    label: 'Ação Positiva',
    onClick: () => {},
    icon: <Archive />,
    variant: 'positive',
  },
  {
    label: 'Ação de Aviso',
    onClick: () => {},
    icon: <Share />,
    variant: 'warning',
  },
  {
    label: 'Ação Negativa',
    onClick: () => {},
    icon: <Trash />,
    variant: 'negative',
  },
  {
    label: 'Ação Neutra',
    onClick: () => {},
    icon: <Settings />,
    variant: 'neutral',
  },
  {
    label: 'Ação Desabilitada',
    onClick: () => {},
    icon: <Pencil />,
    disabled: true,
  },
];

<CardListAction
  title="Múltiplas Ações"
  description="Menu com variantes"
  actionType="menu"
  menuActions={complexActions}
/>`,
      },
    },
  },
  render: () => {
    const complexActions: ActionItem[] = [
      {
        label: 'Editar',
        onClick: () => alert('Editar clicado!'),
        icon: <Pencil />,
        variant: 'default',
      },
      {
        label: 'Arquivar',
        onClick: () => alert('Arquivar clicado!'),
        icon: <Archive />,
        variant: 'positive',
      },
      {
        label: 'Compartilhar',
        onClick: () => alert('Compartilhar clicado!'),
        icon: <Share />,
        variant: 'warning',
      },
      {
        label: 'Excluir',
        onClick: () => alert('Excluir clicado!'),
        icon: <Trash />,
        variant: 'negative',
      },
      {
        label: 'Configurar',
        onClick: () => alert('Configurar clicado!'),
        icon: <Cog />,
        variant: 'neutral',
      },
      {
        label: 'Ação Desabilitada',
        onClick: () => alert('Não deveria aparecer!'),
        icon: <Pencil />,
        disabled: true,
      },
    ];

    return (
      <List>
        <CardListAction
          title="Menu Completo"
          description="Todas as variantes de ações"
          caption="6 ações disponíveis"
          icon={<Cog />}
          actionType="menu"
          menuActions={complexActions}
        />
      </List>
    );
  },
};

export const RealWorldExamples: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        code: `import Tag from '../Tag';
import Badge from '../Badge';

// Exemplo 1: Lista de Contas Bancárias
<CardListAction
  title="Conta Corrente"
  description="Saldo disponível"
  caption="R$ 1.234,56"
  icon={<PlaceholderOutline />}
  indicator={<Badge color="brand">Principal</Badge>}
  actionType="menu"
  menuActions={accountActions}
/>

// Exemplo 2: Lista de Produtos
<CardListAction
  title="iPhone 14 Pro"
  description="R$ 6.999,00"
  strikethroughDescription="R$ 8.999,00"
  caption="Em estoque"
  icon={<Heart />}
  indicator={<Tag size="medium" type="warning">22% OFF</Tag>}
  actionType="chevron"
  onClick={() => {}}
/>

// Exemplo 3: Configurações
<CardListAction
  title="Notificações"
  description="Gerencie suas preferências"
  icon={<Cog />}
  actionType="chevron"
  onClick={() => {}}
/>

// Exemplo 4: Itens Desabilitados
<CardListAction
  title="Recurso Premium"
  description="Disponível apenas no plano Pro"
  icon={<Star />}
  indicator={<Tag size="medium" type="neutral">Pro</Tag>}
  actionType="chevron"
  disabled
/>`,
      },
    },
  },
  render: () => {
    const accountActions: ActionItem[] = [
      {
        label: 'Ver Extrato',
        onClick: () => alert('Ver Extrato'),
        icon: <Pencil />,
      },
      {
        label: 'Transferir',
        onClick: () => alert('Transferir'),
        icon: <Share />,
      },
      {
        label: 'Configurações',
        onClick: () => alert('Configurações'),
        icon: <Cog />,
      },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
            Lista de Contas
          </h4>
          <List>
            <CardListAction
              title="Conta Corrente"
              description="Saldo disponível"
              caption="R$ 1.234,56"
              icon={<PlaceholderOutline />}
              indicator={<Badge color="brand">Principal</Badge>}
              actionType="menu"
              menuActions={accountActions}
            />
            <CardListAction
              title="Conta Poupança"
              description="Saldo disponível"
              caption="R$ 5.678,90"
              icon={<Star />}
              actionType="menu"
              menuActions={accountActions}
            />
          </List>
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
            Lista de Produtos
          </h4>
          <List>
            <CardListAction
              title="iPhone 14 Pro"
              description="R$ 6.999,00"
              strikethroughDescription="R$ 8.999,00"
              caption="Em estoque"
              icon={<Heart />}
              indicator={<Tag size="medium" type="warning">22% OFF</Tag>}
              actionType="chevron"
              onClick={() => alert('Ver produto')}
            />
            <CardListAction
              title="MacBook Pro M2"
              description="R$ 12.999,00"
              caption="Últimas unidades"
              icon={<Heart />}
              indicator={<Badge color="brand">Popular</Badge>}
              actionType="chevron"
              onClick={() => alert('Ver produto')}
            />
          </List>
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
            Configurações
          </h4>
          <List>
            <CardListAction
              title="Notificações"
              description="Gerencie suas preferências"
              icon={<Cog />}
              actionType="chevron"
              onClick={() => alert('Abrir configurações')}
            />
            <CardListAction
              title="Privacidade"
              description="Controle seus dados"
              icon={<Bell />}
              actionType="chevron"
              onClick={() => alert('Abrir privacidade')}
            />
            <CardListAction
              title="Recurso Premium"
              description="Disponível apenas no plano Pro"
              icon={<Star />}
              indicator={<Tag size="medium" type="neutral">Pro</Tag>}
              actionType="chevron"
              disabled
            />
          </List>
        </div>
      </div>
    );
  },
};

export const Interactive: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: function InteractiveRender() {
    const [clickCount, setClickCount] = React.useState(0);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div
          style={{
            padding: '12px',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <strong>Cliques: {clickCount}</strong>
        </div>

        <List>
          <CardListAction
            title="Clique Aqui"
            description="Item interativo com contador"
            caption={`Clicado ${clickCount} ${clickCount === 1 ? 'vez' : 'vezes'}`}
            icon={<Star />}
            actionType="chevron"
            onClick={() => setClickCount(clickCount + 1)}
          />

          <CardListAction
            title="Resetar Contador"
            description="Zerar a contagem de cliques"
            icon={<Archive />}
            actionType="menu"
            menuActions={[
              {
                label: 'Resetar',
                onClick: () => setClickCount(0),
                icon: <Archive />,
                variant: 'warning',
              },
              {
                label: 'Incrementar +5',
                onClick: () => setClickCount(clickCount + 5),
                icon: <Star />,
                variant: 'positive',
              },
            ]}
          />
        </List>
      </div>
    );
  },
};

export const MenuWithinListOverflow: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Demonstração de que o menu funciona corretamente dentro de um List com overflow hidden. O menu usa React Portal para renderizar fora do container, evitando que seja cortado. Também demonstra que indicators funcionam corretamente com modo swipe.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <p style={{ fontSize: '14px', color: '#666' }}>
        ℹ️ O componente List tem <code>overflow: hidden</code>, mas os menus
        dropdown são renderizados usando React Portal, então não ficam cortados.
      </p>
      <List>
        <CardListAction
          title="Item com Menu Dropdown"
          description="Teste o menu dropdown"
          icon={<Star />}
          actionType="menu"
          menuActions={defaultMenuActions}
        />
        <CardListAction
          title="Item com Menu e Tag"
          description="Menu dropdown com tag"
          icon={<Heart />}
          actionType="menu"
          indicator={<Tag size="medium" type="positive">Popular</Tag>}
          menuActions={defaultMenuActions}
        />
        <CardListAction
          title="Item com Swipe e Badge"
          description="Arraste para ver as ações"
          caption="Indicator visível acima do overlay"
          icon={<Cog />}
          actionType="swipe"
          indicator={<Badge color="complementary">Novo</Badge>}
          menuActions={defaultMenuActions}
        />
        <CardListAction
          title="Outro Item com Swipe"
          description="Mais um exemplo de swipe com tag"
          icon={<Archive />}
          actionType="swipe"
          indicator={<Tag size="medium" type="warning">Beta</Tag>}
          menuActions={defaultMenuActions}
        />
      </List>
    </div>
  ),
};
