import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import TransactionFooter from '../TransactionFooter';
import Typography from '../../Typography';
import Divider from '../../Divider';
import Button from '../../Button';

const meta: Meta<typeof TransactionFooter> = {
  title: 'Components/TransactionFooter',
  component: TransactionFooter,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'A variante visual do rodapé.',
      control: 'select',
      options: ['default', 'highlight'],
    },
    children: {
      description:
        'O conteúdo do rodapé (linhas de resumo, divisor e botões), composto pelo consumidor.',
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof TransactionFooter>;

const rowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  marginBottom: 8,
};

const Row = ({
  label,
  value,
  bold,
}: {
  label: string;
  value: React.ReactNode;
  bold?: boolean;
}): JSX.Element => (
  <div style={rowStyle}>
    <Typography variant="paragraph">{label}</Typography>
    <Typography variant="paragraph">
      {bold ? <strong>{value}</strong> : value}
    </Typography>
  </div>
);

const Summary = (): JSX.Element => (
  <>
    <Row label="Você vai economizar" value="R$ 3.574,28" />
    <Row label="Custo de antecipação" value="Grátis" />
    <Divider style={{ marginTop: 8, marginBottom: 8 }} />
    <Row label="Total" value="R$ 42.314,10" bold />
  </>
);

const decorators = [
  (StoryComponent: React.ComponentType): JSX.Element => (
    <div style={{ maxWidth: 420 }}>
      <StoryComponent />
    </div>
  ),
];

export const Usage: Story = {
  args: {
    variant: 'default',
  },
  decorators,
  render: (args) => (
    <TransactionFooter {...args}>
      <Summary />
      <Button variant="primary" blocked>
        Continuar
      </Button>
    </TransactionFooter>
  ),
};

export const Highlight: Story = {
  parameters: {
    controls: { disable: true },
  },
  decorators,
  render: () => (
    <TransactionFooter variant="highlight">
      <Summary />
      <Button variant="primary" blocked>
        Continuar
      </Button>
    </TransactionFooter>
  ),
};

export const WithTwoButtons: Story = {
  parameters: {
    controls: { disable: true },
  },
  decorators,
  render: () => (
    <TransactionFooter variant="highlight">
      <Row label="Desconto" value="-R$ 1.057,85" />
      <Row label="Pagando" value="R$ 41.256,25" bold />
      <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
        <Button variant="secondary" blocked>
          Voltar
        </Button>
        <Button variant="primary" blocked>
          Confirmar
        </Button>
      </div>
    </TransactionFooter>
  ),
};

export const WithCaption: Story = {
  parameters: {
    controls: { disable: true },
  },
  decorators,
  render: () => (
    <TransactionFooter variant="default">
      <Row label="Pagando" value="R$ 41.256,25" bold />
      <Typography variant="caption">
        O valor pode variar conforme a data de compensação.
      </Typography>
      <Button variant="primary" blocked style={{ marginTop: 16 }}>
        Confirmar pagamento
      </Button>
    </TransactionFooter>
  ),
};
