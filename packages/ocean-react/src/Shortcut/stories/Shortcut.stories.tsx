import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PlaceholderOutline } from '@useblu/ocean-icons-react';
import Shortcut from '../Shortcut';

const meta: Meta<typeof Shortcut> = {
  title: 'Components/Shortcut',
  component: Shortcut,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Texto do label do atalho.',
      control: 'text',
    },
    description: {
      description:
        'Descrição adicional do atalho (apenas para tamanho medium).',
      control: 'text',
    },
    icon: {
      description: 'Ícone do atalho.',
      control: false,
    },
    size: {
      description: 'O tamanho do componente de atalho.',
      control: 'select',
      options: ['tiny', 'small', 'medium'],
    },
    orientation: {
      description: 'A orientação do layout do atalho.',
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    blocked: {
      description: 'Define se o atalho está bloqueado.',
      control: 'boolean',
    },
    disabled: {
      description: 'Desabilita o atalho.',
      control: 'boolean',
    },
    fullWidth: {
      description: 'Faz o atalho ocupar toda a largura disponível.',
      control: 'boolean',
    },
    count: {
      description: 'Número exibido no badge do atalho.',
      control: 'number',
    },
    tag: {
      description: 'Tag exibida no atalho.',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Shortcut>;

export const Usage: Story = {
  args: {
    label: 'Meu Atalho',
    description: 'Descrição do atalho para navegação rápida.',
    icon: <PlaceholderOutline />,
    size: 'medium',
    orientation: 'horizontal',
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          minWidth: '300px',
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
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
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      }}
    >
      <Shortcut label="Tiny" icon={<PlaceholderOutline />} size="tiny" />
      <Shortcut label="Small" icon={<PlaceholderOutline />} size="small" />
      <Shortcut
        label="Medium"
        description="Com descrição"
        icon={<PlaceholderOutline />}
        size="medium"
      />
    </div>
  ),
};

export const Orientations: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      }}
    >
      <Shortcut
        label="Horizontal"
        description="Orientação horizontal (padrão)"
        icon={<PlaceholderOutline />}
        orientation="horizontal"
      />
      <Shortcut
        label="Vertical"
        description="Orientação vertical"
        icon={<PlaceholderOutline />}
        orientation="vertical"
      />
    </div>
  ),
};

export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      }}
    >
      <Shortcut label="Normal" icon={<PlaceholderOutline />} />
      <Shortcut label="Bloqueado" icon={<PlaceholderOutline />} blocked />
      <Shortcut label="Desabilitado" icon={<PlaceholderOutline />} disabled />
    </div>
  ),
};

export const WithBadge: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      }}
    >
      <Shortcut label="Com Badge" icon={<PlaceholderOutline />} count={5} />
      <Shortcut label="Com Tag" icon={<PlaceholderOutline />} tag="Novo" />
      <Shortcut
        label="Com Badge e Tag"
        icon={<PlaceholderOutline />}
        count={12}
        tag="Importante"
      />
    </div>
  ),
};

export const FullWidth: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        minWidth: '300px',
      }}
    >
      <Shortcut
        label="Atalho Normal"
        description="Sem fullWidth"
        icon={<PlaceholderOutline />}
      />
      <Shortcut
        label="Atalho Full Width"
        description="Com fullWidth ativado"
        icon={<PlaceholderOutline />}
        fullWidth
      />
    </div>
  ),
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4
          style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '500' }}
        >
          Tamanhos:
        </h4>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
          }}
        >
          <Shortcut label="Tiny" icon={<PlaceholderOutline />} size="tiny" />
          <Shortcut label="Small" icon={<PlaceholderOutline />} size="small" />
          <Shortcut
            label="Medium"
            description="Com descrição"
            icon={<PlaceholderOutline />}
            size="medium"
          />
        </div>
      </div>

      <div>
        <h4
          style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '500' }}
        >
          Estados:
        </h4>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
          }}
        >
          <Shortcut label="Normal" icon={<PlaceholderOutline />} />
          <Shortcut label="Bloqueado" icon={<PlaceholderOutline />} blocked />
          <Shortcut
            label="Desabilitado"
            icon={<PlaceholderOutline />}
            disabled
          />
        </div>
      </div>

      <div>
        <h4
          style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '500' }}
        >
          Com Badge e Tag:
        </h4>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
          }}
        >
          <Shortcut label="Com Badge" icon={<PlaceholderOutline />} count={5} />
          <Shortcut label="Com Tag" icon={<PlaceholderOutline />} tag="Novo" />
          <Shortcut
            label="Com Badge e Tag"
            icon={<PlaceholderOutline />}
            count={12}
            tag="Importante"
          />
        </div>
      </div>
    </div>
  ),
};
