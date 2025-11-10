import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Star, Pencil, Share, Archive, Trash, Save } from '@useblu/ocean-icons-react';
import InternalListActions from '../InternalListActions';
import type { ActionItem } from '../InternalListActions';
import CardListItem from '../../CardListItem';

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
    withMobileMode: {
      description: 'Habilita o comportamento mobile em telas pequenas. Quando false, sempre mostra a versão desktop.',
      control: 'boolean',
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
    withMobileMode: false,
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
        }}
      >
        <InternalListActions actions={actionsWithIcons} withMobileMode={false} />
      </div>
    );
  },
};

export const Positions: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        padding: '40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '100px',
        minHeight: '400px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Bottom Left</h4>
          <InternalListActions
            actions={defaultActions}
            position="bottom-left"
            withMobileMode={false}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
            Bottom Right
          </h4>
          <InternalListActions
            actions={defaultActions}
            position="bottom-right"
            withMobileMode={false}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Top Left</h4>
          <InternalListActions actions={defaultActions} position="top-left" withMobileMode={false} />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Top Right</h4>
          <InternalListActions actions={defaultActions} position="top-right" withMobileMode={false} />
        </div>
      </div>
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
        <InternalListActions actions={defaultActions} withMobileMode={false} />
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
          withMobileMode={false}
        />
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Disabled</h4>
        <InternalListActions actions={defaultActions} disabled withMobileMode={false} />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  parameters: {
    controls: { disable: true },
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
        }}
      >
        <InternalListActions actions={variantActions} withMobileMode={false} />
      </div>
    );
  },
};

export const IntegratedWithCardListItem: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const actions: ActionItem[] = [
      {
        label: 'Default',
        onClick: () => alert('Editar clicado!'),
        icon: <Pencil />,
        variant: 'default',
      },
      {
        label: 'Negative',
        onClick: () => alert('Compartilhar clicado!'),
        icon: <Share />,
        variant: 'negative'
      },
      {
        label: 'Positive',
        onClick: () => alert('Arquivar clicado!'),
        icon: <Save />,
        variant: 'positive',
      },
      {
        label: 'Warning',
        onClick: () => alert('Excluir clicado!'),
        icon: <Trash />,
        variant: 'warning',
      },
      {
        label: 'Neutral',
        onClick: () => alert('Excluir clicado!'),
        icon: <Archive />,
        variant: 'neutral',
      },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
            CardListItem Medium
          </h4>
          <CardListItem
            title="Conta Corrente"
            description="Saldo disponível"
            caption="R$ 1.234,56"
            leadingIcon={<Star />}
            actionIcon={
              <InternalListActions actions={actions} position="bottom-left" />
            }
          />
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
            CardListItem Small
          </h4>
          <CardListItem
            title="Investimentos"
            description="Total investido"
            leadingIcon={<Star />}
            size="small"
            actionIcon={
              <InternalListActions actions={actions} position="bottom-left" />
            }
          />
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Com Tag</h4>
          <CardListItem
            title="Poupança"
            description="Saldo disponível"
            caption="R$ 3.456,78"
            leadingIcon={<Star />}
            tag="Novo"
            actionIcon={
              <InternalListActions actions={actions} position="bottom-left" />
            }
          />
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
            Full Width
          </h4>
          <CardListItem
            title="Cartão de Crédito"
            description="Fatura atual"
            caption="R$ 567,89"
            leadingIcon={<Star />}
            actionIcon={
              <InternalListActions actions={actions} position="bottom-left" />
            }
            fullWidth
          />
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Disabled</h4>
          <CardListItem
            title="Conta Desabilitada"
            description="Esta conta está inativa"
            leadingIcon={<Star />}
            actionIcon={
              <InternalListActions
                actions={actions}
                position="bottom-left"
                disabled
              />
            }
            disabled
          />
        </div>
      </div>
    );
  },
};

export const MobileView: Story = {
  parameters: {
    controls: { disable: true },
    viewport: {
      defaultViewport: 'mobile1',
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
        label: 'Excluir',
        onClick: () => alert('Excluir clicado!'),
        icon: <Trash />,
        variant: 'negative',
      },
    ];

    return (
      <div style={{ padding: '16px' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '14px' }}>
          Visualização Mobile (Overlay no Container)
        </h4>
        <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#666' }}>
          Em telas menores que 768px, o componente ocupa todo o espaço do
          container pai com backdrop.
        </p>

        <CardListItem
          title="Conta Corrente"
          description="Saldo disponível"
          caption="R$ 1.234,56"
          leadingIcon={<Star />}
          actionIcon={<InternalListActions actions={actions} />}
          fullWidth
        />

        <div style={{ marginTop: '16px' }}>
          <CardListItem
            title="Investimentos"
            description="Total investido"
            caption="R$ 987,65"
            leadingIcon={<Star />}
            actionIcon={<InternalListActions actions={actions} />}
            fullWidth
          />
        </div>

        <div style={{ marginTop: '16px' }}>
          <CardListItem
            title="Poupança"
            description="Saldo disponível"
            leadingIcon={<Star />}
            size="small"
            actionIcon={<InternalListActions actions={actions} />}
            fullWidth
          />
        </div>
      </div>
    );
  },
};

export const WithoutMobileMode: Story = {
  args: {
    actions: defaultActions,
    withMobileMode: false,
  },
  render: (args) => (
    <div style={{ padding: '16px' }}>
      <p style={{ marginBottom: '16px', fontSize: '14px', color: '#666' }}>
        Esta versão sempre mostra o menu dropdown tradicional, mesmo em telas pequenas.
        <br />
        Útil quando você quer manter o comportamento desktop em todas as resoluções.
      </p>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <InternalListActions {...args} />
      </div>
    </div>
  ),
};
