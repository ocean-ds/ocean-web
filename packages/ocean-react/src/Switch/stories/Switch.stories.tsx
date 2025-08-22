import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Switch from '../Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      description: 'Define se o switch está ativado ou não.',
      control: 'boolean',
    },
    disabled: {
      description: 'Desabilita o switch.',
      control: 'boolean',
    },
    readOnly: {
      description: 'Torna o switch somente leitura.',
      control: 'boolean',
    },
    id: {
      description: 'ID único do switch para associação com label.',
      control: 'text',
    },
    name: {
      description: 'Nome do campo para formulários.',
      control: 'text',
    },
    onChange: {
      description: 'Função chamada quando o estado do switch muda.',
      control: false,
    },
    className: {
      description: 'Classes CSS adicionais.',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Usage: Story = {
  args: {
    id: 'switch-usage',
    checked: true,
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

export const States: Story = {
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
      <Switch id="switch-on" checked />
      <Switch id="switch-off" checked={false} />
    </div>
  ),
};

export const Disabled: Story = {
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
      <Switch id="switch-disabled-on" checked disabled />
      <Switch id="switch-disabled-off" checked={false} disabled />
    </div>
  ),
};

export const ReadOnly: Story = {
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
      <Switch id="switch-readonly-on" checked readOnly />
      <Switch id="switch-readonly-off" checked={false} readOnly />
    </div>
  ),
};
