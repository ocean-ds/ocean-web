import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { XOutline, ChevronDown, Plus } from '@useblu/ocean-icons-react';
import IconButton from '../IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Ícone a ser exibido no botão.',
      control: false,
    },
    component: {
      description:
        'Elemento HTML ou componente usado como root. Padrão: button.',
      control: 'select',
      options: ['button', 'a', 'div'],
    },
    size: {
      description: 'Tamanho do botão.',
      control: 'select',
      options: ['sm', 'md'],
    },
    disabled: {
      description: 'Desabilita o botão.',
      control: 'boolean',
    },
    onClick: {
      description: 'Função chamada ao clicar no botão.',
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Usage: Story = {
  args: {
    children: <ChevronDown />,
    size: 'sm',
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

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <IconButton size="sm">
        <XOutline />
      </IconButton>
      <IconButton size="md">
        <XOutline />
      </IconButton>
    </div>
  ),
};

export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <IconButton>
        <XOutline />
      </IconButton>
      <IconButton disabled>
        <XOutline />
      </IconButton>
    </div>
  ),
};

export const AsLink: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <IconButton component="a" href="#">
        <XOutline />
      </IconButton>
      <IconButton component="a" href="#" disabled>
        <XOutline />
      </IconButton>
    </div>
  ),
};

const InteractiveComponent = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'center',
      }}
    >
      <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
        Cliques: {count}
      </p>
      <IconButton onClick={() => setCount(count + 1)}>
        <Plus />
      </IconButton>
    </div>
  );
};

export const Interactive: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <InteractiveComponent />,
};
