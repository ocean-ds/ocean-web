import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Button from '../../Button';
import Snackbar from '../Snackbar';

const meta: Meta<typeof Snackbar> = {
  title: 'Components/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: 'O tipo do snackbar.',
      control: 'select',
      options: ['info', 'positive', 'negative', 'warning'],
    },
    message: {
      description: 'Mensagem exibida no snackbar.',
      control: 'text',
    },
    isOpen: {
      description: 'Define se o snackbar está visível.',
      control: 'boolean',
    },
    setIsOpen: {
      description: 'Função para controlar a visibilidade do snackbar.',
      control: false,
    },
    action: {
      description: 'Função executada ao clicar na ação.',
      control: false,
    },
    actionLabel: {
      description: 'Texto do botão de ação.',
      control: 'text',
    },
    position: {
      description: 'Posição onde o snackbar é exibido.',
      control: 'select',
      options: ['bottom-left', 'top-left', 'top-right', 'bottom-right'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Snackbar>;

// Componente wrapper para demonstrar o Snackbar
const SnackbarDemo = ({ action, ...props }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <Button onClick={() => setIsOpen(true)}>Abrir Snackbar</Button>
      <Snackbar
        {...props}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        action={action ? () => console.log('Ação executada') : undefined}
      />
    </div>
  );
};

export const Usage: Story = {
  args: {
    type: 'info',
    message: 'Esta é uma mensagem de exemplo no snackbar.',
    position: 'bottom-right',
  },
  render: (args) => <SnackbarDemo {...args} />,
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
};

export const Types: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const TypesDemo = () => {
      const [activeType, setActiveType] = useState<
        'info' | 'positive' | 'negative' | 'warning'
      >('info');
      const [isOpen, setIsOpen] = useState(false);

      const messages = {
        info: 'Esta é uma mensagem informativa.',
        positive: 'Operação realizada com sucesso!',
        negative: 'Ocorreu um erro na operação.',
        warning: 'Atenção! Esta ação requer confirmação.',
      };

      return (
        <div
          style={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button
              onClick={() => {
                setActiveType('info');
                setIsOpen(true);
              }}
            >
              Info
            </Button>
            <Button
              onClick={() => {
                setActiveType('positive');
                setIsOpen(true);
              }}
            >
              Positive
            </Button>
            <Button
              onClick={() => {
                setActiveType('negative');
                setIsOpen(true);
              }}
            >
              Negative
            </Button>
            <Button
              onClick={() => {
                setActiveType('warning');
                setIsOpen(true);
              }}
            >
              Warning
            </Button>
          </div>
          <Snackbar
            type={activeType}
            message={messages[activeType]}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
      );
    };

    return <TypesDemo />;
  },
};

export const Positions: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const PositionsDemo = () => {
      const [activePosition, setActivePosition] = useState<
        'bottom-left' | 'top-left' | 'top-right' | 'bottom-right'
      >('bottom-right');
      const [isOpen, setIsOpen] = useState(false);

      return (
        <div
          style={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button
              onClick={() => {
                setActivePosition('bottom-left');
                setIsOpen(true);
              }}
            >
              Bottom Left
            </Button>
            <Button
              onClick={() => {
                setActivePosition('top-left');
                setIsOpen(true);
              }}
            >
              Top Left
            </Button>
            <Button
              onClick={() => {
                setActivePosition('top-right');
                setIsOpen(true);
              }}
            >
              Top Right
            </Button>
            <Button
              onClick={() => {
                setActivePosition('bottom-right');
                setIsOpen(true);
              }}
            >
              Bottom Right
            </Button>
          </div>
          <Snackbar
            type="info"
            message="Snackbar em diferentes posições"
            position={activePosition}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
      );
    };

    return <PositionsDemo />;
  },
};

export const WithAction: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const ActionDemo = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <div style={{ padding: '20px' }}>
          <Button onClick={() => setIsOpen(true)}>
            Abrir Snackbar com Ação
          </Button>
          <Snackbar
            type="warning"
            message="Esta ação não pode ser desfeita."
            actionLabel="Desfazer"
            action={() => console.log('Ação de desfazer executada')}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
      );
    };

    return <ActionDemo />;
  },
};
