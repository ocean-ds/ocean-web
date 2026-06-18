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
        'Define o layout do banner. `large` exibe a imagem no topo; `small` exibe a imagem à direita (82px).',
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
    primaryAction: {
      description:
        'Ação primária do banner. A variante do botão é derivada automaticamente do `type`.',
      control: false,
    },
    secondaryAction: {
      description:
        'Ação secundária do banner. A variante do botão é derivada automaticamente do `type`.',
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
    primaryAction: { label: 'Ação Primária', onClick: () => console.log('Primary clicked') },
    secondaryAction: {
      label: 'Ação Secundária',
      onClick: () => console.log('Secondary clicked'),
    },
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
        primaryAction={{ label: 'Ação Primária', onClick: () => console.log('Large primary') }}
      />
      <Banner
        size="small"
        title="Banner Small"
        description="Imagem à direita (82px), conteúdo à esquerda."
        image="https://placehold.co/200x150"
        primaryAction={{ label: 'Ação Primária', onClick: () => console.log('Small primary') }}
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
        type="default"
        title="Tipo Default"
        description="Fundo claro com texto escuro — para comunicações gerais."
        primaryAction={{ label: 'Saiba Mais', onClick: () => console.log('default') }}
      />
      <Banner
        type="warning"
        title="Tipo Warning"
        description="Fundo amarelo de atenção — para avisos importantes."
        primaryAction={{ label: 'Entendi', onClick: () => console.log('warning') }}
        secondaryAction={{ label: 'Cancelar', onClick: () => console.log('warning secondary') }}
      />
      <Banner
        type="negative"
        title="Tipo Negative"
        description="Fundo vermelho suave — para erros ou alertas críticos."
        primaryAction={{ label: 'Ver Detalhes', onClick: () => console.log('negative') }}
      />
      <Banner
        type="emphasys"
        title="Tipo Emphasys"
        description="Fundo azul primário — para destaques e chamadas de ação importantes."
        primaryAction={{ label: 'Começar', onClick: () => console.log('emphasys primary') }}
        secondaryAction={{ label: 'Saiba Mais', onClick: () => console.log('emphasys secondary') }}
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
        title="Banner sem Imagem"
        description="Quando a prop `image` é omitida, nenhuma área de imagem é renderizada."
        primaryAction={{ label: 'Ação', onClick: () => console.log('no image') }}
      />
    </div>
  ),
};

export const WithoutActions: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <Banner
        title="Banner sem Ações"
        description="Quando `primaryAction` e `secondaryAction` são omitidos, nenhum botão é renderizado."
        image="https://placehold.co/800x200"
      />
    </div>
  ),
};
