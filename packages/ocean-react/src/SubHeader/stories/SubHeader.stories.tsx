import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import SubHeader from '../SubHeader';

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
