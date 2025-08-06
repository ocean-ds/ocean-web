import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Breadcrumb from '../Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    items: {
      description:
        'Array de elementos do breadcrumb. IMPORTANTE: Todos os itens devem ser links/âncoras navegáveis, EXCETO o último item que deve ser uma string (página atual).',
      control: 'object',
      table: {
        disable: true,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Usage: Story = {
  args: {
    items: [
      <a href="/" rel="noopener noreferrer" key="home">
        Home
      </a>,
      <a href="/page-1" rel="noopener noreferrer" key="page1">
        Página 1
      </a>,
      <a href="/page-2" rel="noopener noreferrer" key="page2">
        Página 2
      </a>,
      'Página Atual',
    ],
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          minWidth: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '16px',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
};

export const WithLinks: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ padding: '16px' }}>
      <Breadcrumb
        items={[
          <a href="/" rel="noopener noreferrer" key="home">
            Home
          </a>,
          <a href="/products" rel="noopener noreferrer" key="products">
            Produtos
          </a>,
          <a
            href="/products/electronics"
            rel="noopener noreferrer"
            key="electronics"
          >
            Eletrônicos
          </a>,
          'Smartphone',
        ]}
      />
    </div>
  ),
};

export const LongPath: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ padding: '16px' }}>
      <Breadcrumb
        items={[
          <a href="/" rel="noopener noreferrer" key="home">
            Home
          </a>,
          <a href="/nivel1" rel="noopener noreferrer" key="nivel1">
            Nível 1
          </a>,
          <a href="/nivel1/nivel2" rel="noopener noreferrer" key="nivel2">
            Nível 2
          </a>,
          <a
            href="/nivel1/nivel2/nivel3"
            rel="noopener noreferrer"
            key="nivel3"
          >
            Nível 3
          </a>,
          <a
            href="/nivel1/nivel2/nivel3/nivel4"
            rel="noopener noreferrer"
            key="nivel4"
          >
            Nível 4
          </a>,
          'Página Atual',
        ]}
      />
    </div>
  ),
};

export const SingleItem: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ padding: '16px' }}>
      <Breadcrumb items={['Página Única']} />
    </div>
  ),
};

export const ResponsiveBehavior: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Demonstra o comportamento responsivo do breadcrumb. No desktop mostra todos os itens, no mobile (≤576px) mostra apenas o último item com botão "voltar".',
      },
    },
  },
  render: () => (
    <div style={{ padding: '16px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h4
          style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 'bold' }}
        >
          🖥️ Visualização Desktop (padrão)
        </h4>
        <div
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '16px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <Breadcrumb
            items={[
              <a href="/" rel="noopener noreferrer" key="home">
                Home
              </a>,
              <a href="/categoria" rel="noopener noreferrer" key="categoria">
                Categoria
              </a>,
              <a
                href="/categoria/subcategoria"
                rel="noopener noreferrer"
                key="sub"
              >
                Subcategoria
              </a>,
              'Página Atual',
            ]}
          />
        </div>
      </div>

      <div>
        <h4
          style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 'bold' }}
        >
          📱 Comportamento Mobile (≤576px)
        </h4>
        <div
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '16px',
            backgroundColor: '#f0f8ff',
            maxWidth: '320px',
          }}
        >
          <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#666' }}>
            💡 <strong>Dica:</strong> Redimensione sua tela para ≤576px ou use
            as ferramentas de desenvolvedor para simular um dispositivo móvel e
            ver o comportamento real.
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
              backgroundColor: 'white',
              borderRadius: '4px',
              border: '1px solid #ddd',
            }}
          >
            <span style={{ fontSize: '12px' }}>←</span>
            <span style={{ fontSize: '14px' }}>Página Atual</span>
          </div>
          <p style={{ margin: '8px 0 0 0', fontSize: '11px', color: '#888' }}>
            Simulação do visual mobile: apenas o último item é exibido com um
            botão &ldquo;voltar&rdquo;
          </p>
        </div>
      </div>
    </div>
  ),
};
