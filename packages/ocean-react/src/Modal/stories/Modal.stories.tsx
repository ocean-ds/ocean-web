import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Modal from '../Modal';
import SimpleModal from '../examples/SimpleModal';
import Button from '../../Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Conteúdo a ser exibido dentro do modal.',
      control: false,
    },
    onRequestClose: {
      description: 'Função chamada quando o modal é solicitado para fechar.',
      control: false,
    },
    blocked: {
      description: 'Se true, o modal se estende até a largura máxima.',
      control: 'boolean',
    },
    maxWidth: {
      description: 'Determina a largura máxima do modal (apenas desktop).',
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', false],
    },
    disableClose: {
      description: 'Desabilita o botão de fechar.',
      control: 'boolean',
    },
    contentLabel: {
      description: 'Label para acessibilidade do conteúdo do modal.',
      control: 'text',
    },
    ariaHideApp: {
      description: 'Controla se deve esconder a aplicação do screen reader.',
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

const ModalContent = ({
  title = 'Título do Modal',
  content,
}: {
  title?: string;
  content?: string;
}) => (
  <div>
    <h2 style={{ margin: '0 0 16px 0', fontSize: '24px', fontWeight: 'bold' }}>
      {title}
    </h2>
    <p style={{ margin: '0 0 16px 0', lineHeight: '1.5' }}>
      {content ||
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
    </p>
    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
      <Button variant="secondary">Cancelar</Button>
      <Button variant="primary">Confirmar</Button>
    </div>
  </div>
);

export const Usage: Story = {
  args: {
    maxWidth: 'md',
    blocked: false,
    disableClose: false,
    contentLabel: 'Modal Example',
    ariaHideApp: false,
  },
  render: (args) => (
    <SimpleModal {...args}>
      <ModalContent />
    </SimpleModal>
  ),
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
        justifyContent: 'center',
      }}
    >
      <SimpleModal maxWidth="sm" contentLabel="Small Modal" ariaHideApp={false}>
        <ModalContent
          title="Modal Pequeno"
          content="Ideal para confirmações simples e alertas."
        />
      </SimpleModal>

      <SimpleModal
        maxWidth="md"
        contentLabel="Medium Modal"
        ariaHideApp={false}
      >
        <ModalContent
          title="Modal Médio"
          content="Tamanho padrão para formulários e conteúdo geral."
        />
      </SimpleModal>

      <SimpleModal maxWidth="lg" contentLabel="Large Modal" ariaHideApp={false}>
        <ModalContent
          title="Modal Grande"
          content="Para conteúdo extenso, formulários complexos e tabelas."
        />
      </SimpleModal>

      <SimpleModal
        maxWidth="xl"
        contentLabel="Extra Large Modal"
        ariaHideApp={false}
      >
        <ModalContent
          title="Modal Extra Grande"
          content="Para conteúdo muito extenso, formulários complexos e tabelas."
        />
      </SimpleModal>
    </div>
  ),
};

export const Blocked: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <SimpleModal
      blocked
      maxWidth="lg"
      contentLabel="Blocked Modal"
      ariaHideApp={false}
    >
      <ModalContent
        title="Modal em bloco"
        content="Este modal se estende até a largura máxima disponível, ocupando mais espaço na tela."
      />
    </SimpleModal>
  ),
};

export const WithoutCloseButton: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <SimpleModal
      disableClose
      maxWidth="md"
      contentLabel="Modal without close"
      ariaHideApp={false}
    >
      <ModalContent
        title="Modal sem botão fechar"
        content="Este modal não possui o botão X no canto superior direito. Feche clicando fora ou usando as ações do rodapé."
      />
    </SimpleModal>
  ),
};
