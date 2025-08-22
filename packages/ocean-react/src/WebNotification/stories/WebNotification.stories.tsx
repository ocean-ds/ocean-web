import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import WebNotification from '../WebNotification';
import Button from '../../Button/Button';

const meta: Meta<typeof WebNotification> = {
  title: 'Components/WebNotification',
  component: WebNotification,
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: 'Tipo que afeta a cor do texto da ação (quando presente).',
      control: 'select',
      options: ['info', 'positive', 'warning'],
    },
    title: {
      description: 'Título da notificação.',
      control: 'text',
    },
    description: {
      description: 'Descrição detalhada da notificação.',
      control: 'text',
    },
    isOpen: {
      description: 'Controla se a notificação está visível.',
      control: 'boolean',
    },
    setIsOpen: {
      description: 'Função para controlar o estado de abertura.',
      control: false,
    },
    action: {
      description: 'Função chamada ao clicar na ação.',
      control: false,
    },
    actionLabel: {
      description: 'Texto do botão de ação.',
      control: 'text',
    },
    position: {
      description: 'Posição da notificação na tela.',
      control: 'select',
      options: ['bottom-left', 'bottom-right'],
    },
    className: {
      description: 'Classes CSS adicionais.',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof WebNotification>;

// Componente wrapper para demonstrar o uso
const WebNotificationDemo = ({ action, ...props }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const actionHandler = action
    ? () => console.log('Ação executada')
    : undefined;

  return (
    <div style={{ padding: '20px' }}>
      <Button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Fechar' : 'Abrir'} Notificação
      </Button>
      <WebNotification
        {...props}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        action={actionHandler}
      />
    </div>
  );
};

export const Usage: Story = {
  render: (args) => <WebNotificationDemo {...args} />,
  args: {
    type: 'info',
    title: 'Título da Notificação',
    description:
      'Esta é uma notificação de exemplo com informações importantes.',
    actionLabel: 'Ver mais',
    action: () => console.log('Ação executada'),
    position: 'bottom-right',
  },
};

export const Info: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <WebNotificationDemo
      type="info"
      title="Informação"
      description="Esta é uma notificação informativa."
    />
  ),
};

export const WithAction: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <WebNotificationDemo
      type="info"
      title="Nova mensagem"
      description="Você recebeu uma nova mensagem."
      actionLabel="Ver mensagem"
      action={() => console.log('Ver mensagem')}
    />
  ),
};

export const WithoutAction: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <WebNotificationDemo
      type="positive"
      title="Atualização concluída"
      description="Sua conta foi atualizada com sucesso."
    />
  ),
};

export const MultipleNotifications: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const MultipleDemo = () => {
      const [notifications, setNotifications] = useState({
        info: false,
        positive: false,
        warning: false,
      });

      const toggleNotification = (type: keyof typeof notifications) => {
        setNotifications((prev) => ({ ...prev, [type]: !prev[type] }));
      };

      return (
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <Button onClick={() => toggleNotification('info')}>
              {notifications.info ? 'Fechar' : 'Abrir'} Info
            </Button>
            <Button onClick={() => toggleNotification('positive')}>
              {notifications.positive ? 'Fechar' : 'Abrir'} Success
            </Button>
            <Button onClick={() => toggleNotification('warning')}>
              {notifications.warning ? 'Fechar' : 'Abrir'} Warning
            </Button>
          </div>

          <WebNotification
            type="info"
            title="Informação"
            description="Esta é uma notificação informativa."
            isOpen={notifications.info}
            setIsOpen={(value) =>
              setNotifications((prev) => ({
                ...prev,
                info: typeof value === 'boolean' ? value : value(prev.info),
              }))
            }
            position="bottom-right"
            actionLabel="Ver mensagem"
            action={() => console.log('Ver mensagem')}
          />

          <WebNotification
            type="positive"
            title="Sucesso"
            description="Operação realizada com sucesso!"
            isOpen={notifications.positive}
            setIsOpen={(value) =>
              setNotifications((prev) => ({
                ...prev,
                positive:
                  typeof value === 'boolean' ? value : value(prev.positive),
              }))
            }
            position="bottom-right"
            actionLabel="Ver mensagem"
            action={() => console.log('Ver mensagem')}
          />

          <WebNotification
            type="warning"
            title="Atenção"
            description="Algo precisa da sua atenção."
            isOpen={notifications.warning}
            setIsOpen={(value) =>
              setNotifications((prev) => ({
                ...prev,
                warning:
                  typeof value === 'boolean' ? value : value(prev.warning),
              }))
            }
            position="bottom-right"
            actionLabel="Ver mensagem"
            action={() => console.log('Ver mensagem')}
          />
        </div>
      );
    };

    return <MultipleDemo />;
  },
};
