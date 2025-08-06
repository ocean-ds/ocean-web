import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { StarOutline } from '@useblu/ocean-icons-react';
import Alert from '../Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    type: {
      description:
        'Determina o tipo do alerta, com ícone e cores padrão para cada tipo.',
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
    },
    title: {
      description: 'Define um título para o alerta.',
      control: 'text',
    },
    size: {
      description: 'Define o tamanho da descrição.',
      control: 'select',
      options: ['short', 'long'],
    },
    button: {
      description: 'Define o texto do botão.',
      control: 'text',
    },
    buttonAction: {
      description: 'Função chamada ao clicar no botão.',
      control: false,
    },
    icon: {
      description: 'Define um ícone customizado para o alerta.',
      control: false,
    },
    className: {
      description: 'Classes CSS adicionais para customização.',
      control: 'text',
    },
    children: {
      description: 'O conteúdo descritivo do alerta.',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Usage: Story = {
  args: {
    type: 'default',
    title: 'Título do Alerta',
    size: 'long',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    button: '',
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          minWidth: '300px',
          maxWidth: '600px',
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

export const Types: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '600px',
      }}
    >
      <Alert type="default">Esta é uma mensagem informativa.</Alert>
      <Alert type="success">Esta é uma mensagem de sucesso.</Alert>
      <Alert type="warning">Esta é uma mensagem de aviso.</Alert>
      <Alert type="error">Esta é uma mensagem de erro.</Alert>
    </div>
  ),
};

export const WithTitle: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '600px',
      }}
    >
      <Alert type="default" title="Título Padrão">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Alert>
      <Alert type="success" title="Título de Sucesso">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Alert>
      <Alert type="warning" title="Título de Aviso">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Alert>
      <Alert type="error" title="Título de Erro">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Alert>
    </div>
  ),
};

export const CustomIcon: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <Alert
        title="Alerta com ícone customizado!"
        icon={<StarOutline size={24} stroke="#5872f5" />}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Alert>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '600px',
      }}
    >
      <Alert title="Título Curto" size="short">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Alert>
      <Alert title="Título Longo" size="long">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Alert>
    </div>
  ),
};

export const WithButton: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '600px',
      }}
    >
      <Alert
        title="Título Padrão"
        button="Botão"
        buttonAction={() => alert('Botão clicado!')}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Alert>
      <Alert
        title="Título de Aviso"
        button="Botão"
        type="warning"
        buttonAction={() => alert('Botão clicado!')}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Alert>
      <Alert
        title="Título de Erro"
        button="Botão"
        type="error"
        buttonAction={() => alert('Botão clicado!')}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Alert>
      <Alert
        title="Título de Sucesso"
        button="Botão"
        type="success"
        buttonAction={() => alert('Botão clicado!')}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Alert>
    </div>
  ),
};

export const WithoutTitle: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '600px',
      }}
    >
      <Alert>
        <strong>Atenção</strong>: Esta é uma mensagem sem título!
      </Alert>
      <Alert type="warning">
        <strong>Cuidado</strong>: Esta é uma mensagem de aviso sem título!
      </Alert>
    </div>
  ),
};
