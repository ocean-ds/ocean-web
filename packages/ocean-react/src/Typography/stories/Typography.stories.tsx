import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Typography from '../Typography';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description:
        'A variante tipográfica que define o estilo e a semântica do texto.',
      control: 'select',
      options: [
        'heading1',
        'heading2',
        'heading3',
        'heading4',
        'heading5',
        'subtitle1',
        'subtitle2',
        'paragraph',
        'lead',
        'description',
        'caption',
        'captionbold',
        'eyebrow',
      ],
    },
    inverse: {
      description: 'Aplica estilo inverso para uso em fundos escuros.',
      control: 'boolean',
    },
    children: {
      description: 'O conteúdo de texto do componente.',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Usage: Story = {
  args: {
    variant: 'paragraph',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
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

export const Headings: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Typography variant="heading1">Heading 1 - Título Principal</Typography>
      <Typography variant="heading2">Heading 2 - Título Secundário</Typography>
      <Typography variant="heading3">Heading 3 - Título Terciário</Typography>
      <Typography variant="heading4">Heading 4 - Título Quaternário</Typography>
      <Typography variant="heading5">Heading 5 - Título Quinário</Typography>
    </div>
  ),
};

export const Subtitles: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Typography variant="subtitle1">
        Subtitle 1 - Subtítulo Principal
      </Typography>
      <Typography variant="subtitle2">
        Subtitle 2 - Subtítulo Secundário
      </Typography>
    </div>
  ),
};

export const Body: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Typography variant="paragraph">
        Paragraph - Texto padrão para corpo de conteúdo e descrições gerais.
      </Typography>
      <Typography variant="lead">
        Lead - Texto destacado para introduções e chamadas importantes.
      </Typography>
      <Typography variant="description">
        Description - Texto para descrições detalhadas e explicações.
      </Typography>
    </div>
  ),
};

export const Captions: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Typography variant="caption">
        Caption - Texto pequeno para legendas
      </Typography>
      <Typography variant="captionbold">
        Caption Bold - Texto pequeno em negrito para destaques
      </Typography>
      <Typography variant="eyebrow">
        EYEBROW - Texto pequeno em maiúsculas
      </Typography>
    </div>
  ),
};

export const Inverse: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        backgroundColor: '#003366',
        padding: '24px',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <Typography variant="heading2" inverse>
        Heading 2 Inverso
      </Typography>
      <Typography variant="paragraph" inverse>
        Paragraph inverso para uso em fundos escuros
      </Typography>
      <Typography variant="caption" inverse>
        Caption inverso
      </Typography>
    </div>
  ),
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Typography variant="heading1">Heading 1</Typography>
      <Typography variant="heading2">Heading 2</Typography>
      <Typography variant="heading3">Heading 3</Typography>
      <Typography variant="heading4">Heading 4</Typography>
      <Typography variant="heading5">Heading 5</Typography>
      <Typography variant="subtitle1">Subtitle 1</Typography>
      <Typography variant="subtitle2">Subtitle 2</Typography>
      <Typography variant="paragraph">Paragraph</Typography>
      <Typography variant="lead">Lead</Typography>
      <Typography variant="description">Description</Typography>
      <Typography variant="caption">Caption</Typography>
      <Typography variant="captionbold">Caption Bold</Typography>
      <Typography variant="eyebrow">EYEBROW</Typography>
    </div>
  ),
};
