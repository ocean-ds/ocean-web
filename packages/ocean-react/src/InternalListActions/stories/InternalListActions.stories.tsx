import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Pencil, Share, Archive, Trash } from '@useblu/ocean-icons-react';
import InternalListActions from '../InternalListActions';
import type { ActionItem } from '../InternalListActions';

const meta: Meta<typeof InternalListActions> = {
  title: 'Components/InternalListActions',
  component: InternalListActions,
  tags: ['autodocs'],
  argTypes: {
    actions: {
      description: 'Lista de ações a serem exibidas no menu dropdown.',
      control: false,
      table: { disable: true },
    },
    disabled: {
      description: 'Desabilita o botão.',
      control: 'boolean',
    },
    position: {
      description: 'Posição do menu dropdown em relação ao botão.',
      control: 'select',
      options: ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
    },
    actionType: {
      description:
        'Tipo de ação a ser exibida. "menu" mostra um dropdown com ícone de três pontos (estilo desktop). "swipe" sempre mostra interface de swipe com handle (estilo mobile), independente do dispositivo.',
      control: 'select',
      options: ['menu', 'swipe'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof InternalListActions>;

const defaultActions: ActionItem[] = [
  {
    label: 'Editar',
    onClick: () => alert('Editar clicado!'),
  },
  {
    label: 'Duplicar',
    onClick: () => alert('Duplicar clicado!'),
  },
  {
    label: 'Excluir',
    onClick: () => alert('Excluir clicado!'),
  },
];

export const Usage: Story = {
  args: {
    actions: defaultActions,
    disabled: false,
    position: 'bottom-right',
    actionType: 'menu',
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '200px',
          position: 'relative',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
};

export const WithIcons: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        code: `const actionsWithIcons: ActionItem[] = [
  {
    label: 'Editar',
    onClick: () => alert('Editar clicado!'),
    icon: <Pencil />,
  },
];

<InternalListActions actions={actionsWithIcons} actionType="menu" />`,
      },
    },
  },
  render: () => {
    const actionsWithIcons: ActionItem[] = [
      {
        label: 'Editar',
        onClick: () => alert('Editar clicado!'),
        icon: <Pencil />,
      },
    ];

    return (
      <div
        style={{
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '200px',
          position: 'relative',
        }}
      >
        <InternalListActions actions={actionsWithIcons} actionType="menu" />
      </div>
    );
  },
};

export const Positions: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        code: `// Bottom Left
<InternalListActions
  actions={actions}
  position="bottom-left"
  actionType="menu"
/>

// Bottom Right (default)
<InternalListActions
  actions={actions}
  position="bottom-right"
  actionType="menu"
/>

// Top Left
<InternalListActions
  actions={actions}
  position="top-left"
  actionType="menu"
/>

// Top Right
<InternalListActions
  actions={actions}
  position="top-right"
  actionType="menu"
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
        gap: '100px',
        minHeight: '400px',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Bottom Left</h4>
          <InternalListActions
            actions={defaultActions}
            position="bottom-left"
            actionType="menu"
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
            Bottom Right
          </h4>
          <InternalListActions
            actions={defaultActions}
            position="bottom-right"
            actionType="menu"
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Top Left</h4>
          <InternalListActions
            actions={defaultActions}
            position="top-left"
            actionType="menu"
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Top Right</h4>
          <InternalListActions
            actions={defaultActions}
            position="top-right"
            actionType="menu"
          />
        </div>
      </div>
    </div>
  ),
};

export const States: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        code: `// Normal
<InternalListActions actions={actions} actionType="menu" />

// Com Ação Desabilitada
<InternalListActions
  actions={[
    {
      label: 'Editar',
      onClick: () => alert('Editar clicado!'),
    },
    {
      label: 'Duplicar',
      onClick: () => alert('Duplicar clicado!'),
      disabled: true,
    },
    {
      label: 'Excluir',
      onClick: () => alert('Excluir clicado!'),
    },
  ]}
  actionType="menu"
/>

// Disabled (botão desabilitado)
<InternalListActions actions={actions} disabled actionType="menu" />`,
      },
    },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        position: 'relative',
      }}
    >
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Normal</h4>
        <InternalListActions actions={defaultActions} actionType="menu" />
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
          Com Ação Desabilitada
        </h4>
        <InternalListActions
          actions={[
            {
              label: 'Editar',
              onClick: () => alert('Editar clicado!'),
            },
            {
              label: 'Duplicar',
              onClick: () => alert('Duplicar clicado!'),
              disabled: true,
            },
            {
              label: 'Excluir',
              onClick: () => alert('Excluir clicado!'),
            },
          ]}
          actionType="menu"
        />
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Disabled</h4>
        <InternalListActions
          actions={defaultActions}
          disabled
          actionType="menu"
        />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        code: `const variantActions: ActionItem[] = [
  {
    label: 'Ação Padrão',
    onClick: () => alert('Ação padrão clicada!'),
    icon: <Pencil />,
    variant: 'default',
  },
  {
    label: 'Ação Positiva',
    onClick: () => alert('Ação positiva clicada!'),
    icon: <Archive />,
    variant: 'positive',
  },
  {
    label: 'Ação de Aviso',
    onClick: () => alert('Ação de aviso clicada!'),
    icon: <Share />,
    variant: 'warning',
  },
  {
    label: 'Ação Negativa',
    onClick: () => alert('Ação negativa clicada!'),
    icon: <Trash />,
    variant: 'negative',
  },
  {
    label: 'Ação Neutra',
    onClick: () => alert('Ação neutra clicada!'),
    icon: <Pencil />,
    variant: 'neutral',
  },
];

<InternalListActions actions={variantActions} actionType="menu" />`,
      },
    },
  },
  render: () => {
    const variantActions: ActionItem[] = [
      {
        label: 'Ação Padrão',
        onClick: () => alert('Ação padrão clicada!'),
        icon: <Pencil />,
        variant: 'default',
      },
      {
        label: 'Ação Positiva',
        onClick: () => alert('Ação positiva clicada!'),
        icon: <Archive />,
        variant: 'positive',
      },
      {
        label: 'Ação de Aviso',
        onClick: () => alert('Ação de aviso clicada!'),
        icon: <Share />,
        variant: 'warning',
      },
      {
        label: 'Ação Negativa',
        onClick: () => alert('Ação negativa clicada!'),
        icon: <Trash />,
        variant: 'negative',
      },
      {
        label: 'Ação Neutra',
        onClick: () => alert('Ação neutra clicada!'),
        icon: <Pencil />,
        variant: 'neutral',
      },
    ];

    return (
      <div
        style={{
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '200px',
          position: 'relative',
        }}
      >
        <InternalListActions actions={variantActions} actionType="menu" />
      </div>
    );
  },
};

export const ActionTypes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        code: `// Menu Mode (default) - Dropdown com ícone de três pontos
<InternalListActions
  actions={actions}
  actionType="menu"
/>

// Swipe Mode - Interface mobile com handle de swipe
<InternalListActions
  actions={actions}
  actionType="swipe"
/>`,
      },
    },
  },
  render: () => {
    const actions: ActionItem[] = [
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
        variant: 'default',
      },
      {
        label: 'Excluir',
        onClick: () => alert('Excluir clicado!'),
        icon: <Trash />,
        variant: 'negative',
      },
    ];

    return (
      <div style={{ padding: '20px', position: 'relative' }}>
        <div style={{ marginBottom: '40px' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
            Modo Menu (Desktop)
          </h4>
          <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#666' }}>
            Mostra um dropdown tradicional com ícone de três pontos verticais.
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              position: 'relative',
            }}
          >
            <InternalListActions actions={actions} actionType="menu" />
          </div>
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
            Modo Swipe (Mobile)
          </h4>
          <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#666' }}>
            Interface mobile com handle de swipe e backdrop. Clique no handle
            para abrir o menu.
          </p>
          <div
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#fff',
              position: 'relative',
            }}
          >
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                Item de Lista
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                Deslize ou clique no handle
              </div>
            </div>
            <InternalListActions actions={actions} actionType="swipe" />
          </div>
        </div>
      </div>
    );
  },
};

export const SwipeMode: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        code: `const actions: ActionItem[] = [
  {
    label: 'Editar',
    onClick: () => alert('Editar clicado!'),
    icon: <Pencil />,
    variant: 'neutral',
  },
  {
    label: 'Excluir',
    onClick: () => alert('Excluir clicado!'),
    icon: <Trash />,
    variant: 'negative',
  },
];

// Modo swipe mostra interface mobile independente do tamanho da tela
<InternalListActions actions={actions} actionType="swipe" />`,
      },
    },
  },
  render: () => {
    const actions: ActionItem[] = [
      {
        label: 'Editar',
        onClick: () => alert('Editar clicado!'),
        icon: <Pencil />,
        variant: 'neutral',
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
      },
    ];

    return (
      <div style={{ padding: '16px', position: 'relative' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '14px' }}>
          Modo Swipe - Interface Mobile
        </h4>
        <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#666' }}>
          O modo swipe sempre mostra a interface mobile com backdrop e menu
          horizontal, independente do tamanho da tela. Clique no handle ou
          deslize para abrir.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#fff',
              position: 'relative',
            }}
          >
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                Conta Corrente
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>R$ 1.234,56</div>
            </div>
            <InternalListActions actions={actions} actionType="swipe" />
          </div>

          <div
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#fff',
              position: 'relative',
            }}
          >
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                Investimentos
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>R$ 987,65</div>
            </div>
            <InternalListActions actions={actions} actionType="swipe" />
          </div>

          <div
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#fff',
              position: 'relative',
            }}
          >
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                Poupança
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>R$ 3.456,78</div>
            </div>
            <InternalListActions actions={actions} actionType="swipe" />
          </div>
        </div>
      </div>
    );
  },
};
