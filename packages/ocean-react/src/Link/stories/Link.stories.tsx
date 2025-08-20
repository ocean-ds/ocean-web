import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Link from '../Link';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Conteúdo do link.',
      control: 'text',
    },
    variant: {
      description: 'Variante de cor do link.',
      control: 'select',
      options: ['primary', 'inverse', 'neutral'],
    },
    size: {
      description: 'Tamanho do link.',
      control: 'select',
      options: ['sm', 'md', 'tiny'],
    },
    icon: {
      description: 'Ícone opcional do link.',
      control: 'select',
      options: ['', 'linkChevron', 'externalLink'],
    },
    disabled: {
      description: 'Desabilita o link.',
      control: 'boolean',
    },
    href: {
      description: 'URL de destino do link.',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Usage: Story = {
  args: {
    children: 'Link de exemplo',
    href: '#',
    variant: 'primary',
    size: 'md',
  },
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

export const Variants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Link href="#" variant="primary">
        Link primário
      </Link>
      <Link href="#" variant="inverse">
        Link inverso
      </Link>
      <Link href="#" variant="neutral">
        Link neutro
      </Link>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Link href="#" size="tiny">
        Link tiny
      </Link>
      <Link href="#" size="sm">
        Link pequeno
      </Link>
      <Link href="#" size="md">
        Link médio
      </Link>
    </div>
  ),
};

export const WithIcons: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Link href="#" icon="linkChevron">
        Link com chevron
      </Link>
      <Link href="#" icon="externalLink">
        Link externo
      </Link>
    </div>
  ),
};

export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Link href="#" variant="primary">
        Link normal
      </Link>
      <Link href="#" variant="primary" disabled>
        Link desabilitado
      </Link>
    </div>
  ),
};

export const InContext: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
      <p>
        Este é um parágrafo com um{' '}
        <Link href="#" variant="primary">
          link primário
        </Link>{' '}
        no meio do texto.
      </p>
      <p>
        E aqui temos um{' '}
        <Link href="#" variant="neutral">
          link neutro
        </Link>{' '}
        para comparação.
      </p>
      <p>
        Para mais informações, visite nosso{' '}
        <Link href="#" icon="externalLink">
          site externo
        </Link>{' '}
        ou veja a{' '}
        <Link href="#" icon="linkChevron">
          documentação completa
        </Link>
        .
      </p>
    </div>
  ),
};
