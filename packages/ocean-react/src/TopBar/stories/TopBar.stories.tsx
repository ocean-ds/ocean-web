import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  ArrowLeftOutline,
  DotsVertical,
  CogOutline,
} from '@useblu/ocean-icons-react';
import TopBar from '../TopBar';

const meta: Meta<typeof TopBar> = {
  title: 'Components/TopBar',
  component: TopBar,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Título principal da barra superior.',
      control: 'text',
    },
    description: {
      description: 'Descrição opcional abaixo do título.',
      control: 'text',
    },
    variants: {
      description: 'Variante visual do TopBar.',
      control: 'select',
      options: ['default', 'extended'],
    },
    color: {
      description: 'Tema de cor do TopBar.',
      control: 'select',
      options: ['off', 'on'],
    },
    scrollBar: {
      description: 'Adiciona sombra quando há scroll.',
      control: 'boolean',
    },
    leftIcon: {
      description: 'Ícone do lado esquerdo.',
      control: false,
    },
    rightIcon: {
      description: 'Ícone do lado direito.',
      control: false,
    },
    onLeftAction: {
      description: 'Função chamada ao clicar no ícone esquerdo.',
      control: false,
    },
    onRightAction: {
      description: 'Função chamada ao clicar no ícone direito.',
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof TopBar>;

export const Usage: Story = {
  args: {
    title: 'Título da Página',
    description: 'Descrição opcional',
    leftIcon: <ArrowLeftOutline />,
    rightIcon: <DotsVertical />,
    onLeftAction: () => console.log('Voltar'),
    onRightAction: () => console.log('Menu'),
    variants: 'default',
    color: 'off',
    scrollBar: true,
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div style={{ width: '100%', minHeight: '200px' }}>
        <StoryComponent />
      </div>
    ),
  ],
};

export const Default: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: '100%', minHeight: '200px' }}>
      <TopBar
        title="Título da Página"
        leftIcon={<ArrowLeftOutline />}
        rightIcon={<DotsVertical />}
        onLeftAction={() => console.log('Voltar')}
        onRightAction={() => console.log('Menu')}
        scrollBar
      />
    </div>
  ),
};

export const WithDescription: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: '100%', minHeight: '200px' }}>
      <TopBar
        title="Título da Página"
        description="Descrição detalhada da página atual"
        leftIcon={<ArrowLeftOutline />}
        rightIcon={<DotsVertical />}
        onLeftAction={() => console.log('Voltar')}
        onRightAction={() => console.log('Menu')}
        scrollBar
      />
    </div>
  ),
};

export const Extended: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: '100%', minHeight: '200px' }}>
      <TopBar
        title="Título da Página"
        description="Descrição detalhada da página atual"
        leftIcon={<ArrowLeftOutline />}
        rightIcon={<CogOutline />}
        onLeftAction={() => console.log('Voltar')}
        onRightAction={() => console.log('Configurações')}
        variants="extended"
        scrollBar
      />
    </div>
  ),
};

export const NoLeftAction: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: '100%', minHeight: '200px' }}>
      <TopBar
        title="Título da Página"
        description="Descrição detalhada da página atual"
        rightIcon={<DotsVertical />}
        onRightAction={() => console.log('Menu')}
        scrollBar
      />
    </div>
  ),
};

export const NoRightAction: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: '100%', minHeight: '200px' }}>
      <TopBar
        title="Título da Página"
        description="Descrição detalhada da página atual"
        leftIcon={<ArrowLeftOutline />}
        onLeftAction={() => console.log('Voltar')}
        scrollBar
      />
    </div>
  ),
};

export const LightTheme: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        width: '100%',
        minHeight: '200px',
        backgroundColor: '#333',
        padding: '20px',
      }}
    >
      <TopBar
        title="Título da Página"
        description="Descrição detalhada da página atual"
        leftIcon={<ArrowLeftOutline />}
        rightIcon={<DotsVertical />}
        onLeftAction={() => console.log('Voltar')}
        onRightAction={() => console.log('Menu')}
        color="on"
        scrollBar
      />
    </div>
  ),
};

export const NoScrollBar: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: '100%', minHeight: '200px' }}>
      <TopBar
        title="Título da Página"
        description="Descrição detalhada da página atual"
        leftIcon={<ArrowLeftOutline />}
        rightIcon={<DotsVertical />}
        onLeftAction={() => console.log('Voltar')}
        onRightAction={() => console.log('Menu')}
        scrollBar={false}
      />
    </div>
  ),
};
