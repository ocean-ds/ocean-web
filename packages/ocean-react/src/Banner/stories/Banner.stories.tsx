import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Banner from '../Banner';

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      description:
        'Define o layout do banner. `large` exibe a imagem no topo; `small` exibe a imagem à direita.',
      control: 'select',
      options: ['large', 'small'],
    },
    type: {
      description:
        'Define o tipo visual do banner com cores correspondentes aos tokens do Ocean DS.',
      control: 'select',
      options: ['default', 'warning', 'negative', 'emphasys'],
    },
    title: {
      description: 'Título principal exibido no banner.',
      control: 'text',
    },
    description: {
      description: 'Texto descritivo exibido abaixo do título (opcional).',
      control: 'text',
    },
    image: {
      description:
        'URL da imagem exibida no banner. Quando ausente, a área de imagem não é renderizada.',
      control: 'text',
    },
    backgroundColor: {
      description:
        'Cor de fundo customizada que sobrescreve o padrão do tipo selecionado.',
      control: 'color',
    },
    buttons: {
      description:
        'Array de botões (máximo 2). Quando vazio ou ausente, nenhum botão é renderizado.',
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Banner>;

export const Usage: Story = {
  args: {
    size: 'large',
    type: 'default',
    title: 'Título do Banner',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.',
    image: 'https://placehold.co/800x200',
    buttons: [
      { label: 'Ação Primária', onClick: () => console.log('Primary clicked') },
      {
        label: 'Ação Secundária',
        onClick: () => console.log('Secondary clicked'),
      },
    ],
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div style={{ minWidth: '320px', maxWidth: '800px' }}>
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
      style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}
    >
      <Banner
        size="large"
        title="Banner Large"
        description="Imagem no topo (full-width), seguida de título, descrição e botões."
        image="https://placehold.co/800x200"
        buttons={[
          {
            label: 'Ação Primária',
            onClick: () => console.log('Large primary'),
          },
        ]}
      />
      <Banner
        size="small"
        title="Banner Small"
        description="Imagem à direita (25% de largura), conteúdo à esquerda."
        image="https://placehold.co/200x150"
        buttons={[
          {
            label: 'Ação Primária',
            onClick: () => console.log('Small primary'),
          },
        ]}
      />
    </div>
  ),
};

export const Types: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}
    >
      <Banner
        size="large"
        type="default"
        title="Tipo Default"
        description="Fundo claro com texto escuro — para comunicações gerais."
        buttons={[{ label: 'Saiba Mais', onClick: () => console.log('default') }]}
      />
      <Banner
        size="large"
        type="warning"
        title="Tipo Warning"
        description="Fundo amarelo de atenção — para avisos importantes."
        buttons={[{ label: 'Entendi', onClick: () => console.log('warning') }]}
      />
      <Banner
        size="large"
        type="negative"
        title="Tipo Negative"
        description="Fundo vermelho suave — para erros ou alertas críticos."
        buttons={[{ label: 'Ver Detalhes', onClick: () => console.log('negative') }]}
      />
      <Banner
        size="large"
        type="emphasys"
        title="Tipo Emphasys"
        description="Fundo azul primário — para destaques e chamadas de ação importantes."
        buttons={[
          { label: 'Começar', onClick: () => console.log('emphasys primary') },
          { label: 'Saiba Mais', onClick: () => console.log('emphasys secondary') },
        ]}
      />
    </div>
  ),
};

export const WithoutImage: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <Banner
        size="large"
        title="Banner sem Imagem"
        description="Quando a prop `image` é omitida, nenhuma área de imagem é renderizada."
        buttons={[{ label: 'Ação', onClick: () => console.log('no image') }]}
      />
    </div>
  ),
};

export const WithoutButtons: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <Banner
        size="large"
        title="Banner sem Botões"
        description="Quando a prop `buttons` é omitida ou vazia, nenhum botão é renderizado."
        image="https://placehold.co/800x200"
      />
    </div>
  ),
};
