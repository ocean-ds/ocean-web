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
        'left-top',
        'left-bottom',
        'right-top',
        'right-bottom',
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
    closeButton: {
      description: 'Exibe botão de fechar no tooltip.',
      control: 'boolean',
    },
    onClose: {
      description: 'Callback quando o tooltip é fechado pelo botão.',
      action: 'closed',
    },
    visible: {
      description: 'Controla a visibilidade do tooltip externamente.',
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
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        padding: '80px',
        alignItems: 'center',
        justifyItems: 'center',
      }}
    >
      <Tooltip text="Tooltip acima" position="up">
        <Button>Up</Button>
      </Tooltip>

      <Tooltip text="Tooltip up-left" position="up-left">
        <Button>Up Left</Button>
      </Tooltip>

      <Tooltip text="Tooltip up-right" position="up-right">
        <Button>Up Right</Button>
      </Tooltip>

      <div />

      <Tooltip text="Tooltip à esquerda" position="left">
        <Button>Left</Button>
      </Tooltip>

      <Tooltip text="Tooltip left-top" position="left-top">
        <Button>Left Top</Button>
      </Tooltip>

      <Tooltip text="Tooltip left-bottom" position="left-bottom">
        <Button>Left Bottom</Button>
      </Tooltip>

      <div />

      <Tooltip text="Tooltip à direita" position="right">
        <Button>Right</Button>
      </Tooltip>

      <Tooltip text="Tooltip right-top" position="right-top">
        <Button>Right Top</Button>
      </Tooltip>

      <Tooltip text="Tooltip right-bottom" position="right-bottom">
        <Button>Right Bottom</Button>
      </Tooltip>

      <div />

      <Tooltip text="Tooltip abaixo" position="down">
        <Button>Down</Button>
      </Tooltip>

      <Tooltip text="Tooltip down-left" position="down-left">
        <Button>Down Left</Button>
      </Tooltip>

      <Tooltip text="Tooltip down-right" position="down-right">
        <Button>Down Right</Button>
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

export const WithCloseButton: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        padding: '100px',
        alignItems: 'center',
        justifyItems: 'center',
      }}
    >
      <Tooltip
        text="Tooltip com botão de fechar"
        position="up"
        closeButton
        onClose={() => console.log('Tooltip fechado!')}
      >
        <Button>Up</Button>
      </Tooltip>

      <Tooltip
        text="Tooltip up-left com close"
        position="up-left"
        closeButton
      >
        <Button>Up Left</Button>
      </Tooltip>

      <Tooltip
        text="Tooltip up-right com close"
        position="up-right"
        closeButton
      >
        <Button>Up Right</Button>
      </Tooltip>

      <div />

      <Tooltip
        text="Tooltip à esquerda com close"
        position="left"
        closeButton
      >
        <Button>Left</Button>
      </Tooltip>

      <Tooltip
        text="Tooltip left-top com close"
        position="left-top"
        closeButton
      >
        <Button>Left Top</Button>
      </Tooltip>

      <Tooltip
        text="Tooltip left-bottom com close"
        position="left-bottom"
        closeButton
      >
        <Button>Left Bottom</Button>
      </Tooltip>

      <div />

      <Tooltip
        text="Tooltip à direita com close"
        position="right"
        closeButton
      >
        <Button>Right</Button>
      </Tooltip>

      <Tooltip
        text="Tooltip right-top com close"
        position="right-top"
        closeButton
      >
        <Button>Right Top</Button>
      </Tooltip>

      <Tooltip
        text="Tooltip right-bottom com close"
        position="right-bottom"
        closeButton
      >
        <Button>Right Bottom</Button>
      </Tooltip>

      <div />

      <Tooltip
        text="Tooltip abaixo com close"
        position="down"
        closeButton
      >
        <Button>Down</Button>
      </Tooltip>

      <Tooltip
        text="Tooltip down-left com close"
        position="down-left"
        closeButton
      >
        <Button>Down Left</Button>
      </Tooltip>

      <Tooltip
        text="Tooltip down-right com close"
        position="down-right"
        closeButton
      >
        <Button>Down Right</Button>
      </Tooltip>
    </div>
  ),
};

export const ControlledVisibility: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: function ControlledExample() {
    const [isVisible, setIsVisible] = React.useState(false);

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '100px',
          alignItems: 'center',
        }}
      >
        <Button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'Esconder Tooltip' : 'Mostrar Tooltip'}
        </Button>

        <Tooltip
          text="Este tooltip é controlado externamente"
          position="down"
          closeButton
          visible={isVisible}
          onClose={() => setIsVisible(false)}
        >
          <Button>Elemento com tooltip controlado</Button>
        </Tooltip>
      </div>
    );
  },
};
