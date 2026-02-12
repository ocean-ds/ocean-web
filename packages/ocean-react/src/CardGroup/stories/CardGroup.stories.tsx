import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import CardGroup from '../CardGroup';
import Typography from '../../Typography';
import keepUsingSvg from '../assets/keep-using.svg';
import pendingSvg from '../assets/pending.svg';
import redeSvg from '../assets/rede.svg';
import emptySvg from '../assets/empty.svg';
import inUseSvg from '../assets/in-use.svg';
import firstUsesSvg from '../assets/first-uses.svg';

const meta: Meta<typeof CardGroup> = {
  title: 'Components/CardGroup',
  component: CardGroup,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'O título exibido no cabeçalho do card.',
      control: 'text',
    },
    subtitle: {
      description: 'O subtítulo exibido no cabeçalho do card.',
      control: 'text',
    },
    variant: {
      description: 'A variante do componente que define o layout.',
      control: 'select',
      options: ['minimal', 'header'],
    },
    count: {
      description:
        'O valor exibido no contador. Se undefined, o contador fica oculto.',
      control: 'number',
    },
    actionLabel: {
      description: 'O texto do botão de ação.',
      control: 'text',
    },
    actionCount: {
      description: 'O valor exibido no contador do botão de ação.',
      control: 'number',
    },
    actionClick: {
      description: 'Função chamada quando o botão de ação é clicado.',
      table: {
        disable: true,
      },
    },
    actionBadgeColor: {
      description: 'A cor do badge da ação.',
      control: 'select',
      options: ['brand', 'complementary', 'alert', 'neutral', 'highlight'],
    },
    children: {
      description:
        'Conteúdo adicional exibido abaixo do cabeçalho (apenas na variante minimal).',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof CardGroup>;

export const Usage: Story = {
  args: {
    title: 'Título do Card',
    subtitle: 'Subtítulo descritivo',
    count: 5,
    actionLabel: 'Ação',
    variant: 'minimal',
    actionBadgeColor: 'brand',
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          minWidth: '328px',
          maxWidth: '400px',
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

export const HeaderOnly: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <div style={{ minWidth: '328px' }}>
        <CardGroup
          title="Apenas Cabeçalho"
          subtitle="Variante header"
          count={25}
          variant="header"
        />
      </div>

      <div style={{ minWidth: '328px' }}>
        <CardGroup
          title="Sem Contador"
          subtitle="Header sem count"
          variant="header"
        />
      </div>
    </div>
  ),
};

export const Default: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: '328px' }}>
      <CardGroup
        title="PagBlu"
        subtitle="Garanta até 16% de economia ao antecipar com taxa zero."
        actionLabel="Conheça o PagBlu"
        actionClick={() => alert('Ação clicada!')}
      />
    </div>
  ),
};

export const WithActionCount: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: '328px' }}>
      <CardGroup
        title="PagBlu"
        subtitle="Garanta até 16% de economia ao antecipar com taxa zero."
        actionLabel="Pagar fornecedores"
        actionCount={9}
        actionClick={() => alert('Ação clicada!')}
      />
    </div>
  ),
};

export const WithCustomActionBadgeColor: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: '328px' }}>
      <CardGroup
        title="PagBlu"
        subtitle="Garanta até 16% de economia ao antecipar com taxa zero."
        actionLabel="Pagar fornecedores"
        actionCount={9}
        actionBadgeColor="brand"
        actionClick={() => alert('Ação clicada!')}
      />
    </div>
  ),
};

export const WithAlert: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: '328px' }}>
      <CardGroup
        title="PagBlu"
        subtitle="Garanta até 16% de economia ao antecipar com taxa zero."
        actionLabel="Pagar fornecedores"
        actionCount={9}
        actionClick={() => alert('Ação clicada!')}
      >
        <div
          style={{
            padding: '12px 16px',
            backgroundColor: '#F2FDF5',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <img src={redeSvg as unknown as string} alt="Rede" />
          <Typography variant="caption">
            Use o saldo disponível na Rede e pague hoje
          </Typography>
        </div>
      </CardGroup>
    </div>
  ),
};

export const WithTag: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: '328px' }}>
      <CardGroup
        title="Crédito"
        actionLabel="Ir para boletos"
        actionCount={9}
        actionClick={() => alert('Ação clicada!')}
        tag={{
          children: 'Boletos disponiveis',
          variant: 'highlight',
          type: 'neutral',
        }}
      >
        <div>
          <div
            style={{
              padding: '8px 16px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <img src={keepUsingSvg as unknown as string} alt="Keep using" />
            <div>
              <Typography variant="description">
                Limite para pagar boletos
              </Typography>
              <Typography
                style={{ fontWeight: 700, fontSize: '14px' }}
                variant="captionbold"
              >
                R$ 6.008,48
              </Typography>
            </div>
          </div>
          <div
            style={{
              padding: '8px 16px',
              backgroundColor: '#F3F5FE',
            }}
          >
            <Typography variant="caption">
              Pague seu boleto da Ortobom Colchões hoje usando seu limite de
              crédito.
            </Typography>
          </div>
        </div>
      </CardGroup>
    </div>
  ),
};

export const WithBackgroundAndTag: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: '328px' }}>
      <CardGroup
        title="Crédito"
        actionLabel="Ir para boletos"
        actionCount={9}
        actionClick={() => alert('Ação clicada!')}
        tag={{
          children: 'Boletos disponiveis',
          variant: 'highlight',
          type: 'neutral',
        }}
        style={{ backgroundColor: '#F3F5FE' }}
      >
        <div>
          <div
            style={{
              padding: '8px 16px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#F3F5FE',
            }}
          >
            <img src={firstUsesSvg as unknown as string} alt="First uses" />
            <div>
              <Typography variant="description">
                Limite para pagar boletos
              </Typography>
              <Typography
                style={{ fontWeight: 700, fontSize: '14px' }}
                variant="captionbold"
              >
                R$ 6.008,48
              </Typography>
            </div>
          </div>
          <div
            style={{
              padding: '8px 16px',
              backgroundColor: '#F3F5FE',
            }}
          >
            <Typography variant="caption">
              Pague seu boleto da Ortobom Colchões hoje usando seu limite de
              crédito.
            </Typography>
          </div>
        </div>
      </CardGroup>
    </div>
  ),
};

export const WithoutTag: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: '328px' }}>
      <CardGroup
        title="Crédito"
        actionLabel="Ir para parcelas atrasadas"
        actionCount={9}
        actionClick={() => alert('Ação clicada!')}
      >
        <div>
          <div
            style={{
              padding: '8px 16px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <img src={pendingSvg as unknown as string} alt="Pending" />
            <div>
              <Typography variant="description">
                Seu parcelamento está atrasado
              </Typography>
              <Typography
                style={{ fontWeight: 700, fontSize: '14px' }}
                variant="captionbold"
              >
                R$ 4.328,04
              </Typography>
            </div>
          </div>
          <div
            style={{
              padding: '8px 16px',
              backgroundColor: '#FFF7F0',
            }}
          >
            <Typography variant="caption">
              Pague seu boleto da Ortobom Colchões hoje usando seu limite de
              crédito.
            </Typography>
          </div>
        </div>
      </CardGroup>
    </div>
  ),
};

export const WithBackgroundWithoutAlert: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: '328px' }}>
      <CardGroup
        title="Crédito"
        actionLabel="Como o usar crédito"
        actionClick={() => alert('Ação clicada!')}
        style={{ backgroundColor: '#F3F5FE' }}
      >
        <div>
          <div
            style={{
              padding: '8px 16px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#F3F5FE',
            }}
          >
            <img
              src={emptySvg as unknown as string}
              alt="Empty"
              width={47}
              height={47}
            />
            <div>
              <Typography variant="description">
                Limite para pagar boletos
              </Typography>
              <Typography
                style={{ fontWeight: 700, fontSize: '14px' }}
                variant="captionbold"
              >
                R$ ••••••
              </Typography>
            </div>
          </div>
        </div>
      </CardGroup>
    </div>
  ),
};

export const WithoutBackground: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: '328px' }}>
      <CardGroup
        title="Crédito"
        actionLabel="Ir para boletos"
        actionClick={() => alert('Ação clicada!')}
      >
        <div>
          <div
            style={{
              padding: '8px 16px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <img src={inUseSvg as unknown as string} alt="In use" />
            <div>
              <Typography variant="description">
                Limite para pagar boletos
              </Typography>
              <Typography
                style={{ fontWeight: 700, fontSize: '14px' }}
                variant="captionbold"
              >
                R$ ••••••
              </Typography>
            </div>
          </div>
        </div>
      </CardGroup>
    </div>
  ),
};
