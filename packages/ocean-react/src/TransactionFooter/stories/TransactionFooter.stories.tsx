import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  colorInterfaceDarkDown,
  colorInterfaceDarkUp,
  spacingInlineXs,
  spacingStackXxs,
  spacingStackXxxs,
  spacingStackXxsExtra,
} from '@useblu/ocean-tokens/web/tokens';
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
        'O conteúdo do rodapé (Section Header, linhas de resumo, Divider e Button Bar), composto pelo consumidor.',
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof TransactionFooter>;

/* Blocos de composição espelhando a estrutura do Figma (node 25851-3910):
 * Section Header, Inline Text List Item (label + value), Divider e Button Bar.
 * Espaçamentos e cores vêm dos tokens Ocean. */

const SectionHeader = ({ title }: { title: string }): JSX.Element => (
  <div
    style={{
      padding: `${spacingStackXxs} ${spacingInlineXs} ${spacingStackXxxs}`,
    }}
  >
    <Typography variant="heading5">
      <span style={{ color: colorInterfaceDarkUp }}>{title}</span>
    </Typography>
  </div>
);

const Row = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}): JSX.Element => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: spacingStackXxs,
      padding: `${spacingStackXxs} ${spacingInlineXs}`,
    }}
  >
    <div style={{ flex: '1 0 0' }}>
      <Typography variant="paragraph">
        <span style={{ color: colorInterfaceDarkDown }}>{label}</span>
      </Typography>
    </div>
    <div style={{ flex: '1 0 0', textAlign: 'right' }}>
      <Typography variant="paragraph">{value}</Typography>
    </div>
  </div>
);

const InternalDivider = (): JSX.Element => (
  <div style={{ padding: `${spacingStackXxsExtra} ${spacingInlineXs}` }}>
    <Divider />
  </div>
);

const ButtonBar = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: spacingStackXxs,
      padding: spacingInlineXs,
    }}
  >
    {children}
  </div>
);

const Summary = (): JSX.Element => (
  <>
    <SectionHeader title="Resumo" />
    <Row label="Você vai economizar" value="R$ 3.574,28" />
    <Row label="Custo de antecipação" value="Grátis" />
    <InternalDivider />
    <Row label="Total" value="R$ 42.314,10" />
  </>
);

const decorators = [
  (StoryComponent: React.ComponentType): JSX.Element => (
    <div style={{ width: 393 }}>
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
      <ButtonBar>
        <Button variant="primary" blocked>
          Continuar
        </Button>
      </ButtonBar>
    </TransactionFooter>
  ),
};

export const Default: Story = {
  parameters: {
    controls: { disable: true },
  },
  decorators,
  render: () => (
    <TransactionFooter variant="default">
      <Summary />
      <ButtonBar>
        <Button variant="primary" blocked>
          Continuar
        </Button>
      </ButtonBar>
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
      <ButtonBar>
        <Button variant="primary" blocked>
          Continuar
        </Button>
      </ButtonBar>
    </TransactionFooter>
  ),
};

export const WithoutHeader: Story = {
  parameters: {
    controls: { disable: true },
  },
  decorators,
  render: () => (
    <TransactionFooter variant="highlight">
      <Row label="Desconto" value="-R$ 1.057,85" />
      <Row label="Pagando" value="R$ 41.256,25" />
      <ButtonBar>
        <Button variant="primary" blocked>
          Confirmar pagamento
        </Button>
      </ButtonBar>
    </TransactionFooter>
  ),
};

export const WithTwoButtons: Story = {
  parameters: {
    controls: { disable: true },
  },
  decorators,
  render: () => (
    <TransactionFooter variant="default">
      <Summary />
      <ButtonBar>
        <Button variant="primary" blocked>
          Confirmar
        </Button>
        <Button variant="secondary" blocked>
          Voltar
        </Button>
      </ButtonBar>
    </TransactionFooter>
  ),
};
