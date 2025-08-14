import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Star, Heart, ShoppingCart } from '@useblu/ocean-icons-react';
import CrossSellCard from '../CrossSellCard';
import emptyImage from '../img/empty-image.svg';

const meta: Meta<typeof CrossSellCard> = {
  title: 'Components/CrossSellCard',
  component: CrossSellCard,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'O título principal do card.',
      control: 'text',
    },
    description: {
      description: 'A descrição detalhada do card.',
      control: 'text',
    },
    imageSrc: {
      description: 'URL da imagem a ser exibida no card.',
      control: 'text',
    },
    ctaText: {
      description: 'Texto do botão de call-to-action.',
      control: 'text',
    },
    customIcon: {
      description: 'Ícone customizado para o botão CTA (substitui o padrão).',
      control: false,
    },
    ctaAction: {
      description: 'Função executada quando o botão CTA é clicado.',
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof CrossSellCard>;

export const Usage: Story = {
  args: {
    title: 'Oferta Especial',
    description:
      'Aproveite nossa promoção exclusiva com até 50% de desconto em produtos selecionados.',
    imageSrc: emptyImage,
    ctaText: 'Ver Oferta',
    ctaAction: () => console.log('CTA clicked'),
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          minWidth: '300px',
          maxWidth: '400px',
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

export const WithoutImage: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <CrossSellCard
        title="Cadastre-se Agora"
        description="Crie sua conta e tenha acesso a benefícios exclusivos e ofertas personalizadas."
        ctaText="Criar Conta"
        ctaAction={() => console.log('Create account clicked')}
      />
    </div>
  ),
};

export const WithImage: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <CrossSellCard
        title="Produtos Premium"
        description="Descubra nossa linha premium com qualidade superior e design exclusivo."
        imageSrc={emptyImage}
        ctaText="Explorar"
        ctaAction={() => console.log('Explore clicked')}
      />
    </div>
  ),
};

export const CustomIcons: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '400px',
      }}
    >
      <CrossSellCard
        title="Favoritos"
        description="Salve seus produtos preferidos na sua lista de desejos."
        ctaText="Adicionar aos Favoritos"
        customIcon={<Heart />}
        ctaAction={() => console.log('Add to favorites')}
      />
      <CrossSellCard
        title="Avaliações"
        description="Veja o que outros clientes estão falando sobre nossos produtos."
        ctaText="Ver Avaliações"
        customIcon={<Star />}
        ctaAction={() => console.log('View reviews')}
      />
      <CrossSellCard
        title="Carrinho"
        description="Continue sua compra e finalize seu pedido com segurança."
        ctaText="Ir ao Carrinho"
        customIcon={<ShoppingCart />}
        ctaAction={() => console.log('Go to cart')}
      />
    </div>
  ),
};

export const DifferentSizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ maxWidth: '300px' }}>
        <CrossSellCard
          title="Título Curto"
          description="Descrição breve."
          ctaText="Ação"
          ctaAction={() => console.log('Short clicked')}
        />
      </div>
      <div style={{ maxWidth: '500px' }}>
        <CrossSellCard
          title="Título um Pouco Mais Longo para Demonstrar"
          description="Uma descrição mais detalhada que explica melhor o contexto e benefícios da oferta apresentada no card."
          imageSrc={emptyImage}
          ctaText="Call to Action Mais Longo"
          ctaAction={() => console.log('Long clicked')}
        />
      </div>
    </div>
  ),
};

export const Examples: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '16px',
      }}
    >
      <CrossSellCard
        title="Cashback Especial"
        description="Ganhe 10% de cashback em todas as suas compras este mês."
        ctaText="Ativar Cashback"
        ctaAction={() => console.log('Activate cashback')}
      />
      <CrossSellCard
        title="Cartão de Crédito"
        description="Solicite seu cartão sem anuidade e com limite pré-aprovado."
        imageSrc={emptyImage}
        ctaText="Solicitar Cartão"
        ctaAction={() => console.log('Request card')}
      />
      <CrossSellCard
        title="Investimentos"
        description="Comece a investir com apenas R$ 10 e faça seu dinheiro render."
        ctaText="Começar a Investir"
        customIcon={<Star />}
        ctaAction={() => console.log('Start investing')}
      />
      <CrossSellCard
        title="Seguro Proteção"
        description="Proteja você e sua família com nosso seguro completo."
        imageSrc={emptyImage}
        ctaText="Contratar Seguro"
        ctaAction={() => console.log('Hire insurance')}
      />
    </div>
  ),
};
