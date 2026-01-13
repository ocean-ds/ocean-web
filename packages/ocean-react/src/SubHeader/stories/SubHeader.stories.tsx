import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  CalendarOutline,
  Star,
  HomeOutline,
  ShoppingCart,
} from '@useblu/ocean-icons-react';
import SubHeader from '../SubHeader';

const iconOptions = {
  none: undefined,
  CalendarOutline: <CalendarOutline size={16} />,
  Star: <Star size={16} />,
  HomeOutline: <HomeOutline size={16} />,
  ShoppingCart: <ShoppingCart size={16} />,
};

const meta: Meta<typeof SubHeader> = {
  title: 'Components/SubHeader',
  component: SubHeader,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'O título principal do sub-header.',
      control: 'text',
    },
    subtitle: {
      description: 'Subtítulo opcional posicionado no lado direito.',
      control: 'text',
    },
    icon: {
      description: 'Ícone opcional posicionado no lado esquerdo.',
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      control: {
        type: 'select',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SubHeader>;

export const Usage: Story = {
  args: {
    children: 'Hoje',
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

export const WithSubtitle: Story = {
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
      <SubHeader
        subtitle={
          <>
            Saldo do dia <strong>R$ 5.000,00</strong>
          </>
        }
      >
        Hoje
      </SubHeader>

      <SubHeader subtitle="Total: 15 itens">Produtos</SubHeader>

      <SubHeader subtitle="Última atualização: 2h atrás">Dashboard</SubHeader>
    </div>
  ),
};

export const TextVariants: Story = {
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
      <SubHeader>Texto simples</SubHeader>

      <SubHeader subtitle="Subtítulo simples">Título com subtítulo</SubHeader>

      <SubHeader
        subtitle={
          <>
            <span style={{ color: '#28a745' }}>✓</span> Concluído
          </>
        }
      >
        Status do projeto
      </SubHeader>
    </div>
  ),
};

export const WithIcon: Story = {
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
      <SubHeader icon={<CalendarOutline size={16} />}>Hoje</SubHeader>

      <SubHeader icon={<HomeOutline size={16} />} subtitle="Bem-vindo de volta">
        Início
      </SubHeader>

      <SubHeader icon={<Star size={16} />} subtitle="12 favoritos">
        Favoritos
      </SubHeader>

      <SubHeader
        icon={<ShoppingCart size={16} />}
        subtitle={
          <>
            Total: <strong>R$ 250,00</strong>
          </>
        }
      >
        Carrinho
      </SubHeader>
    </div>
  ),
};
