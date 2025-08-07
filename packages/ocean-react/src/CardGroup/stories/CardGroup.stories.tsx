import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import CardGroup from '../CardGroup';

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
    actionClick: {
      description: 'Função chamada quando o botão de ação é clicado.',
      table: {
        disable: true,
      },
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
    children: 'Conteúdo opcional do card',
    variant: 'minimal',
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

export const Variants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <div style={{ minWidth: '328px' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '14px' }}>Minimal</h4>
        <CardGroup
          title="Card Minimal"
          subtitle="Com conteúdo e ação"
          count={3}
          actionLabel="Ver mais"
          variant="minimal"
        >
          <div style={{ padding: '16px' }}>
            <p>Conteúdo do card na variante minimal.</p>
          </div>
        </CardGroup>
      </div>

      <div style={{ minWidth: '328px' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '14px' }}>Header</h4>
        <CardGroup
          title="Card Header"
          subtitle="Apenas cabeçalho"
          count={7}
          variant="header"
        />
      </div>
    </div>
  ),
};

export const WithChildren: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ minWidth: '328px', maxWidth: '400px' }}>
      <CardGroup
        title="Card com Conteúdo"
        subtitle="Exemplo com children"
        count={12}
        actionLabel="Ação"
      >
        <div style={{ padding: '16px' }}>
          <p style={{ margin: '0 0 12px 0' }}>
            Este é um exemplo de card com conteúdo personalizado.
          </p>
          <ul style={{ margin: '0', paddingLeft: '20px' }}>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </div>
      </CardGroup>
    </div>
  ),
};

export const WithoutCount: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ minWidth: '328px', maxWidth: '400px' }}>
      <CardGroup
        title="Card sem Contador"
        subtitle="Apenas título e subtítulo"
        actionLabel="Ação"
      >
        <div style={{ padding: '16px' }}>
          <p style={{ margin: '0' }}>
            Card sem contador, mostrando apenas título e subtítulo.
          </p>
        </div>
      </CardGroup>
    </div>
  ),
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

export const ActionExamples: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <div style={{ minWidth: '328px' }}>
        <CardGroup
          title="Com Ação"
          subtitle="Card com botão"
          count={8}
          actionLabel="Ver detalhes"
          actionClick={() => alert('Ação clicada!')}
        >
          <div style={{ padding: '16px' }}>
            <p style={{ margin: '0' }}>Card com ação funcional.</p>
          </div>
        </CardGroup>
      </div>

      <div style={{ minWidth: '328px' }}>
        <CardGroup title="Sem Ação" subtitle="Card simples" count={5}>
          <div style={{ padding: '16px' }}>
            <p style={{ margin: '0' }}>Card sem botão de ação.</p>
          </div>
        </CardGroup>
      </div>
    </div>
  ),
};
