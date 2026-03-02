import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Badge from '../Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variation: {
      description: 'O tamanho da badge.',
      control: 'select',
      options: ['tiny', 'small', 'medium'],
    },
    color: {
      description: 'A cor da badge.',
      control: 'select',
      options: ['brand', 'complementary', 'alert', 'neutral', 'highlight'],
    },
    count: {
      description: 'O número que a badge deve exibir (máximo 99+).',
      control: 'number',
    },
    children: {
      description: 'O texto da badge (usado quando count não é definido).',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Usage: Story = {
  args: {
    count: 5,
    variation: 'small',
    color: 'brand',
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
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
};

export const Variations: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Badge variation="tiny" color="brand" />
      <Badge variation="small" count={5} color="brand" />
      <Badge variation="medium" count={99} color="brand" />
    </div>
  ),
};

export const Colors: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Badge count={5} color="brand" />
      <Badge count={5} color="complementary" />
      <Badge count={5} color="alert" />
      <Badge count={5} color="neutral" />
      <Badge count={5} color="highlight" />
    </div>
  ),
};

export const WithText: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Badge color="brand">Novo</Badge>
      <Badge color="complementary">Popular</Badge>
      <Badge color="alert">Urgente</Badge>
      <Badge color="neutral">Info</Badge>
      <Badge color="highlight">Novidade</Badge>
    </div>
  ),
};

export const WithCount: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Badge count={0} color="brand" />
      <Badge count={1} color="brand" />
      <Badge count={9} color="brand" />
      <Badge count={99} color="brand" />
      <Badge count={123} color="brand" />
    </div>
  ),
};

export const Tiny: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Badge variation="tiny" color="brand" />
      <Badge variation="tiny" color="complementary" />
      <Badge variation="tiny" color="alert" />
      <Badge variation="tiny" color="neutral" />
      <Badge variation="tiny" color="highlight" />
    </div>
  ),
};
