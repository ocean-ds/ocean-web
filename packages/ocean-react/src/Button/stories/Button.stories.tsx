import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Button from '../Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'A variante visual do botão.',
      control: 'select',
      options: [
        'primary',
        'primaryCritical',
        'primaryWarning',
        'secondary',
        'secondaryCritical',
        'secondaryWarning',
        'tertiary',
        'tertiaryCritical',
        'tertiaryWarning',
        'textTertiary',
        'textTertiaryCritical',
        'inverse',
      ],
    },
    size: {
      description: 'O tamanho do botão.',
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    blocked: {
      description: 'Faz o botão ocupar toda a largura do container pai.',
      control: 'boolean',
    },
    loading: {
      description: 'Exibe um estado de carregamento alterando o conteúdo.',
      control: 'boolean',
    },
    disabled: {
      description: 'Desabilita o botão.',
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Usage: Story = {
  args: {
    children: 'Clique Aqui!',
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
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
};

export const Variants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button variant="primary">primary</Button>
      <Button variant="primaryCritical">primaryCritical</Button>
      <Button variant="primaryWarning">primaryWarning</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="secondaryCritical">secondaryCritical</Button>
      <Button variant="secondaryWarning">secondaryWarning</Button>
      <Button variant="tertiary">tertiary</Button>
      <Button variant="tertiaryCritical">tertiaryCritical</Button>
      <Button variant="tertiaryWarning">tertiaryWarning</Button>
      <Button variant="textTertiary">textTertiary</Button>
      <Button variant="textTertiaryCritical">textTertiaryCritical</Button>
      <Button variant="inverse">inverse</Button>
    </div>
  ),
};

export const Size: Story = {
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
      <Button size="sm">Pequeno</Button>
      <Button size="md">Médio</Button>
      <Button size="lg">Grande</Button>
    </div>
  ),
};

export const Blocked: Story = {
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
        minWidth: '300px',
      }}
    >
      <Button blocked>Botão Bloco</Button>
    </div>
  ),
};

export const Disabled: Story = {
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
      <Button variant="primary" disabled>
        Primary Desabilitado
      </Button>
      <Button variant="primaryCritical" disabled>
        Primary Critical Desabilitado
      </Button>
      <Button variant="secondary" disabled>
        Secondary Desabilitado
      </Button>
      <Button variant="secondaryCritical" disabled>
        Secondary Critical Desabilitado
      </Button>
      <Button variant="tertiary" disabled>
        Tertiary Desabilitado
      </Button>
      <Button variant="tertiaryCritical" disabled>
        Tertiary Critical Desabilitado
      </Button>
      <Button variant="textTertiary" disabled>
        Text Tertiary Desabilitado
      </Button>
      <Button variant="textTertiaryCritical" disabled>
        Text Tertiary Critical Desabilitado
      </Button>
      <Button variant="inverse" disabled>
        Inverse Desabilitado
      </Button>
    </div>
  ),
};

export const Loading: Story = {
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
      <Button variant="primary" loading>
        Primary Carregando
      </Button>
      <Button variant="primaryCritical" loading>
        Primary Critical Carregando
      </Button>
      <Button variant="secondary" loading>
        Secondary Carregando
      </Button>
      <Button variant="secondaryCritical" loading>
        Secondary Critical Carregando
      </Button>
      <Button variant="tertiary" loading>
        Tertiary Carregando
      </Button>
      <Button variant="tertiaryCritical" loading>
        Tertiary Critical Carregando
      </Button>
      <Button variant="textTertiary" loading>
        Text Tertiary Carregando
      </Button>
      <Button variant="textTertiaryCritical" loading>
        Text Tertiary Critical Carregando
      </Button>
      <Button variant="inverse" loading>
        Inverse Carregando
      </Button>
    </div>
  ),
};

export const LoadingSize: Story = {
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
      <Button size="sm" loading>
        Pequeno
      </Button>
      <Button size="md" loading>
        Médio
      </Button>
      <Button size="lg" loading>
        Grande
      </Button>
    </div>
  ),
};
