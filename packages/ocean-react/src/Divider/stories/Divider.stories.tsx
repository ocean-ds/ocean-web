import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Divider from '../Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    actions: { disable: true },
  },
  argTypes: {
    className: {
      description: 'Classes CSS adicionais para customização.',
      control: false,
    },
    style: {
      description: 'Estilos inline aplicados ao elemento.',
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Usage: Story = {
  args: {
    style: { width: '300px' },
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          minWidth: '300px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
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

export const DifferentWidths: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
      }}
    >
      <div>
        <p>Divisor com 100px de largura:</p>
        <Divider style={{ width: '100px' }} />
      </div>
      <div>
        <p>Divisor com 200px de largura:</p>
        <Divider style={{ width: '200px' }} />
      </div>
      <div>
        <p>Divisor com 300px de largura:</p>
        <Divider style={{ width: '300px' }} />
      </div>
      <div>
        <p>Divisor com largura total:</p>
        <Divider style={{ width: '100%' }} />
      </div>
    </div>
  ),
};

export const InContent: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ maxWidth: '500px' }}>
      <h3>Seção 1</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>

      <Divider style={{ margin: '20px 0' }} />

      <h3>Seção 2</h3>
      <p>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat.
      </p>

      <Divider style={{ margin: '20px 0' }} />

      <h3>Seção 3</h3>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur.
      </p>
    </div>
  ),
};

export const InLists: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <h3>Lista com Divisores</h3>
      <div
        style={{
          padding: '16px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
        }}
      >
        <div style={{ padding: '12px 0' }}>Item da Lista 1</div>
        <Divider />
        <div style={{ padding: '12px 0' }}>Item da Lista 2</div>
        <Divider />
        <div style={{ padding: '12px 0' }}>Item da Lista 3</div>
        <Divider />
        <div style={{ padding: '12px 0' }}>Item da Lista 4</div>
      </div>
    </div>
  ),
};

export const CustomStyles: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
      }}
    >
      <div>
        <p>Divisor padrão:</p>
        <Divider />
      </div>

      <div>
        <p>Divisor com margem customizada:</p>
        <Divider style={{ margin: '24px 0' }} />
      </div>

      <div>
        <p>Divisor com classe customizada:</p>
        <Divider className="custom-divider" style={{ width: '200px' }} />
      </div>
    </div>
  ),
};

export const ResponsiveExample: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p>Conteúdo antes do divisor</p>
        <Divider style={{ width: '100%' }} />
        <p>Conteúdo depois do divisor</p>
      </div>

      <div
        style={{
          marginTop: '32px',
          padding: '16px',
          backgroundColor: '#f5f5f5',
        }}
      >
        <p>Em containers com fundo:</p>
        <Divider style={{ width: '100%', margin: '16px 0' }} />
        <p>O divisor mantém sua funcionalidade visual</p>
      </div>
    </div>
  ),
};
