import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Steps from '../Steps';

const meta: Meta<typeof Steps> = {
  title: 'Components/Steps',
  component: Steps,
  tags: ['autodocs'],
  argTypes: {
    currentStep: {
      description: 'O passo atual do processo.',
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    steps: {
      description: 'O número total de passos no processo.',
      control: 'select',
      options: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Steps>;

export const Usage: Story = {
  args: {
    currentStep: 1,
    steps: 4,
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

export const ProgressStates: Story = {
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
      <div>
        <h4
          style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '500' }}
        >
          Passo 1 de 4:
        </h4>
        <Steps currentStep={1} steps={4} />
      </div>

      <div>
        <h4
          style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '500' }}
        >
          Passo 2 de 4:
        </h4>
        <Steps currentStep={2} steps={4} />
      </div>

      <div>
        <h4
          style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '500' }}
        >
          Passo 3 de 4:
        </h4>
        <Steps currentStep={3} steps={4} />
      </div>

      <div>
        <h4
          style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '500' }}
        >
          Passo 4 de 4 (Concluído):
        </h4>
        <Steps currentStep={4} steps={4} />
      </div>
    </div>
  ),
};
