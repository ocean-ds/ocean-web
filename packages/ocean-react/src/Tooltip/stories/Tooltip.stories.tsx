import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Tooltip from '../Tooltip';
import Button from '../../Button/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    text: {
      description: 'Texto que será exibido no tooltip.',
      control: 'text',
    },
    position: {
      description: 'Posição do tooltip em relação ao elemento.',
      control: 'select',
      options: [
        'up',
        'down',
        'left',
        'right',
        'up-left',
        'up-right',
        'down-left',
        'down-right',
      ],
    },
    length: {
      description: 'Tamanho do tooltip.',
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge', 'fit'],
    },
    break: {
      description: 'Permite quebra de linha no tooltip.',
      control: 'boolean',
    },
    blunt: {
      description: 'Remove animações do tooltip.',
      control: 'boolean',
    },
    noFocus: {
      description: 'Desabilita o tooltip no foco.',
      control: 'boolean',
    },
    className: {
      description: 'Classes CSS adicionais.',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Usage: Story = {
  args: {
    text: 'Este é um tooltip de exemplo',
    position: 'up',
    children: <Button>Passe o mouse sobre mim</Button>,
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
          padding: '50px',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
};

export const Positions: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        padding: '50px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Tooltip text="Tooltip acima" position="up">
        <Button>Acima</Button>
      </Tooltip>

      <Tooltip text="Tooltip abaixo" position="down">
        <Button>Abaixo</Button>
      </Tooltip>

      <Tooltip text="Tooltip à esquerda" position="left">
        <Button>Esquerda</Button>
      </Tooltip>

      <Tooltip text="Tooltip à direita" position="right">
        <Button>Direita</Button>
      </Tooltip>

      <Tooltip text="Tooltip diagonal superior esquerda" position="up-left">
        <Button>Sup. Esq.</Button>
      </Tooltip>

      <Tooltip text="Tooltip diagonal superior direita" position="up-right">
        <Button>Sup. Dir.</Button>
      </Tooltip>

      <Tooltip text="Tooltip diagonal inferior esquerda" position="down-left">
        <Button>Inf. Esq.</Button>
      </Tooltip>

      <Tooltip text="Tooltip diagonal inferior direita" position="down-right">
        <Button>Inf. Dir.</Button>
      </Tooltip>
    </div>
  ),
};

export const Lengths: Story = {
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
        justifyContent: 'center',
        padding: '50px',
      }}
    >
      <Tooltip text="Pequeno" length="small">
        <Button>Small</Button>
      </Tooltip>

      <Tooltip text="Este é um tooltip de tamanho médio" length="medium">
        <Button>Medium</Button>
      </Tooltip>

      <Tooltip
        text="Este é um tooltip de tamanho grande com mais texto para demonstrar o comportamento"
        length="large"
      >
        <Button>Large</Button>
      </Tooltip>

      <Tooltip
        text="Este é um tooltip extra grande com muito texto para demonstrar como ele se comporta quando há uma grande quantidade de conteúdo"
        length="xlarge"
      >
        <Button>XLarge</Button>
      </Tooltip>

      <Tooltip text="Fit" length="fit">
        <Button>Fit</Button>
      </Tooltip>
    </div>
  ),
};

export const Blunt: Story = {
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
        justifyContent: 'center',
        padding: '50px',
      }}
    >
      <Tooltip text="Tooltip com animação" position="up">
        <Button>Com animação</Button>
      </Tooltip>

      <Tooltip text="Tooltip sem animação" blunt position="up">
        <Button>Sem animação</Button>
      </Tooltip>
    </div>
  ),
};
