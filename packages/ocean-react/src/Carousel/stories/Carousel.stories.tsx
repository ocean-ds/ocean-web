import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Carousel from '../Carousel';
import BannerExample from '../examples/BannerExample';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    columns: {
      description: 'Determina o número de colunas no carrossel.',
      control: 'select',
      options: [1, 2, 3, 4, 5],
    },
    infinite: {
      description: 'Determina se o componente pode rolar infinitamente ou não.',
      control: 'boolean',
    },
    autoplay: {
      description: 'Ativa a reprodução automática do carrossel.',
      control: 'boolean',
    },
    children: {
      description: 'Elementos filho a serem exibidos no carrossel.',
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const Usage: Story = {
  args: {
    columns: 1,
    infinite: true,
    autoplay: false,
    children: [
      <BannerExample key={0} color={0} />,
      <BannerExample key={1} color={1} />,
      <BannerExample key={2} color={2} />,
      <BannerExample key={3} color={3} />,
      <BannerExample key={4} color={0} />,
      <BannerExample key={5} color={1} />,
      <BannerExample key={6} color={2} />,
      <BannerExample key={7} color={3} />,
    ],
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div style={{ minWidth: '300px', maxWidth: '900px' }}>
        <StoryComponent />
        <p
          style={{
            fontSize: '12px',
            color: '#666',
            marginTop: '8px',
            textAlign: 'center',
          }}
        >
          💡 Passe o mouse sobre o carousel para ver as setas de navegação
        </p>
      </div>
    ),
  ],
};

export const Columns: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        maxWidth: '900px',
      }}
    >
      <div>
        <h4
          style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}
        >
          1 Coluna
        </h4>
        <Carousel columns={1}>
          <BannerExample color={0} />
          <BannerExample color={1} />
          <BannerExample color={2} />
          <BannerExample color={3} />
        </Carousel>
      </div>
      <div>
        <h4
          style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}
        >
          2 Colunas
        </h4>
        <Carousel columns={2}>
          <BannerExample color={0} />
          <BannerExample color={1} />
          <BannerExample color={2} />
          <BannerExample color={3} />
        </Carousel>
      </div>
      <div>
        <h4
          style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}
        >
          3 Colunas
        </h4>
        <Carousel columns={3}>
          <BannerExample color={0} />
          <BannerExample color={1} />
          <BannerExample color={2} />
          <BannerExample color={3} />
          <BannerExample color={0} />
          <BannerExample color={1} />
        </Carousel>
      </div>
      <div>
        <h4
          style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}
        >
          4 Colunas
        </h4>
        <Carousel columns={4}>
          <BannerExample color={0} />
          <BannerExample color={1} />
          <BannerExample color={2} />
          <BannerExample color={3} />
          <BannerExample color={0} />
          <BannerExample color={1} />
          <BannerExample color={2} />
          <BannerExample color={3} />
        </Carousel>
      </div>
      <div>
        <h4
          style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}
        >
          5 Colunas
        </h4>
        <Carousel columns={5}>
          <BannerExample color={0} />
          <BannerExample color={1} />
          <BannerExample color={2} />
          <BannerExample color={3} />
          <BannerExample color={0} />
          <BannerExample color={1} />
          <BannerExample color={2} />
          <BannerExample color={3} />
        </Carousel>
      </div>
    </div>
  ),
};

export const InfiniteScroll: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        maxWidth: '900px',
      }}
    >
      <div>
        <h4
          style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}
        >
          Scroll Finito (padrão)
        </h4>
        <Carousel columns={3} infinite={false}>
          <BannerExample color={0} />
          <BannerExample color={1} />
          <BannerExample color={2} />
          <BannerExample color={3} />
        </Carousel>
      </div>
      <div>
        <h4
          style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}
        >
          Scroll Infinito
        </h4>
        <Carousel columns={3} infinite>
          <BannerExample color={0} />
          <BannerExample color={1} />
          <BannerExample color={2} />
          <BannerExample color={3} />
        </Carousel>
      </div>
    </div>
  ),
};

export const Autoplay: Story = {
  parameters: {
    controls: { disable: true },
    layout: 'centered',
  },
  render: () => (
    <div style={{ maxWidth: '900px' }}>
      <Carousel columns={1} infinite autoplay>
        <BannerExample color={0} />
        <BannerExample color={1} />
        <BannerExample color={2} />
        <BannerExample color={3} />
        <BannerExample color={0} />
        <BannerExample color={1} />
        <BannerExample color={2} />
        <BannerExample color={3} />
      </Carousel>
    </div>
  ),
};
