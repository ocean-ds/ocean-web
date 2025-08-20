import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Progress from '../Progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: 'O tamanho do componente de progresso.',
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    onColor: {
      description:
        'Define se o progresso deve ser exibido sobre fundo colorido.',
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Usage: Story = {
  args: {
    size: 'md',
    onColor: false,
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
        alignItems: 'center',
      }}
    >
      <Progress size="sm" />
      <Progress size="md" />
      <Progress size="lg" />
    </div>
  ),
};

export const OnColor: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div
        style={{
          backgroundColor: '#333',
          padding: '16px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Progress onColor />
      </div>
      <div
        style={{
          backgroundColor: '#fff',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Progress />
      </div>
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
          Tamanhos (fundo claro):
        </h4>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            padding: '16px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
          }}
        >
          <Progress size="sm" />
          <Progress size="md" />
          <Progress size="lg" />
        </div>
      </div>

      <div>
        <h4
          style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '500' }}
        >
          Tamanhos (fundo escuro):
        </h4>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            padding: '16px',
            backgroundColor: '#333',
            borderRadius: '8px',
          }}
        >
          <Progress size="sm" onColor />
          <Progress size="md" onColor />
          <Progress size="lg" onColor />
        </div>
      </div>
    </div>
  ),
};
