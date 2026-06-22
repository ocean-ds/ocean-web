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
    primaryAction: {
      label: 'Label',
      onClick: () => console.log('Primary clicked'),
    },
    secondaryAction: {
      label: 'Label',
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

export const WithPrimaryAndSecondaryActions: Story = {
  name: 'With Primary & Secondary Actions',
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        maxWidth: '800px',
      }}
    >
      <Banner
        size="small"
        type="default"
        title="Tipo Default"
        description="Fundo claro com texto escuro — para comunicações gerais."
        primaryAction={{
          label: 'Label',
          onClick: () => console.log('default primary'),
        }}
        secondaryAction={{
          label: 'Label',
          onClick: () => console.log('default secondary'),
        }}
      />
      <Banner
        size="small"
        type="warning"
        title="Tipo Warning"
        description="Fundo amarelo de atenção — para avisos importantes."
        primaryAction={{
          label: 'Label',
          onClick: () => console.log('warning primary'),
        }}
        secondaryAction={{
          label: 'Label',
          onClick: () => console.log('warning secondary'),
        }}
      />
      <Banner
        size="small"
        type="negative"
        title="Tipo Negative"
        description="Fundo vermelho suave — para erros ou alertas críticos."
        primaryAction={{
          label: 'Label',
          onClick: () => console.log('negative primary'),
        }}
        secondaryAction={{
          label: 'Label',
          onClick: () => console.log('negative secondary'),
        }}
      />
      <Banner
        size="small"
        type="emphasys"
        title="Tipo Emphasys"
        description="Fundo azul primário — para destaques e chamadas de ação importantes."
        primaryAction={{
          label: 'Label',
          onClick: () => console.log('emphasys primary'),
        }}
        secondaryAction={{
          label: 'Label',
          onClick: () => console.log('emphasys secondary'),
        }}
      />
    </div>
  ),
};

export const WithPrimaryActionOnly: Story = {
  name: 'With Primary Action Only',
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        maxWidth: '800px',
      }}
    >
      <Banner
        size="small"
        type="default"
        title="Tipo Default"
        description="Fundo claro com texto escuro — para comunicações gerais."
        primaryAction={{
          label: 'Label',
          onClick: () => console.log('default primary'),
        }}
      />
      <Banner
        size="small"
        type="warning"
        title="Tipo Warning"
        description="Fundo amarelo de atenção — para avisos importantes."
        primaryAction={{
          label: 'Label',
          onClick: () => console.log('warning primary'),
        }}
      />
      <Banner
        size="small"
        type="negative"
        title="Tipo Negative"
        description="Fundo vermelho suave — para erros ou alertas críticos."
        primaryAction={{
          label: 'Label',
          onClick: () => console.log('negative primary'),
        }}
      />
      <Banner
        size="small"
        type="emphasys"
        title="Tipo Emphasys"
        description="Fundo azul primário — para destaques e chamadas de ação importantes."
        primaryAction={{
          label: 'Label',
          onClick: () => console.log('emphasys primary'),
        }}
      />
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
        gap: '24px',
        maxWidth: '800px',
      }}
    >
      <Banner
        size="large"
        title="Banner Large"
        description="Imagem no topo (full-width), seguida de título, descrição e botões."
        image="https://placehold.co/800x200"
        primaryAction={{
          label: 'Label',
          onClick: () => console.log('Large primary'),
        }}
        secondaryAction={{
          label: 'Label',
          onClick: () => console.log('Large secondary'),
        }}
      />
      <Banner
        size="small"
        title="Banner Small"
        description="Imagem à direita (82px), conteúdo à esquerda."
        image="https://placehold.co/200x150"
        primaryAction={{
          label: 'Label',
          onClick: () => console.log('Small primary'),
        }}
        secondaryAction={{
          label: 'Label',
          onClick: () => console.log('Small secondary'),
        }}
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
        size="small"
        title="Banner Small sem Imagem"
        description="No tamanho small, a imagem é opcional. Quando omitida, o conteúdo ocupa toda a largura."
        primaryAction={{
          label: 'Label',
          onClick: () => console.log('no image'),
        }}
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
