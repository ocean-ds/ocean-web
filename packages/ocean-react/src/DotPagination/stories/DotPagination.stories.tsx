import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import DotPagination from '../DotPagination';

const meta: Meta<typeof DotPagination> = {
  title: 'Components/DotPagination',
  component: DotPagination,
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'Número total de pontos a serem exibidos.',
      control: { type: 'number', min: 2, max: 10 },
    },
    activeItem: {
      description: 'Índice do ponto ativo (baseado em 0).',
      control: { type: 'number', min: 0, max: 9 },
    },
    onActiveChange: {
      description: 'Função chamada quando um ponto é clicado.',
      action: 'onActiveChange',
    },
  },
};

export default meta;

type Story = StoryObj<typeof DotPagination>;

export const Usage: Story = {
  args: {
    items: 4,
    activeItem: 1,
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
          padding: '32px',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
};

export const DifferentSizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666' }}>
          2 pontos
        </p>
        <DotPagination items={2} activeItem={0} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666' }}>
          4 pontos
        </p>
        <DotPagination items={4} activeItem={1} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666' }}>
          6 pontos
        </p>
        <DotPagination items={6} activeItem={2} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666' }}>
          8 pontos
        </p>
        <DotPagination items={8} activeItem={3} />
      </div>
    </div>
  ),
};

export const ActiveStates: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666' }}>
          Primeiro ativo
        </p>
        <DotPagination items={5} activeItem={0} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666' }}>
          Meio ativo
        </p>
        <DotPagination items={5} activeItem={2} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666' }}>
          Último ativo
        </p>
        <DotPagination items={5} activeItem={4} />
      </div>
    </div>
  ),
};

const InteractiveComponent = () => {
  const [activeItem, setActiveItem] = React.useState(0);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'center',
      }}
    >
      <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
        Clique nos pontos para navegar (Ativo: {activeItem + 1})
      </p>
      <DotPagination
        items={5}
        activeItem={activeItem}
        onActiveChange={setActiveItem}
      />
    </div>
  );
};

export const Interactive: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <InteractiveComponent />,
};
