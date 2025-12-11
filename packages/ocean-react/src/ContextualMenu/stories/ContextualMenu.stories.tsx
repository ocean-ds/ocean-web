import React from 'react';
import { Trash } from '@useblu/ocean-icons-react';
import type { Meta, StoryObj } from '@storybook/react';
import ContextualMenu from '../ContextualMenu';
import { ContextualMenuTrigger } from './ContextualMenuTrigger';

const meta: Meta<typeof ContextualMenu> = {
  title: 'Components/ContextualMenu',
  component: ContextualMenu,
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'Array de itens do menu contextual.',
      control: false,
    },
    open: {
      description:
        'Define se o menu está aberto ou fechado (componente controlado).',
      control: 'boolean',
    },
    onOpenChange: {
      description: 'Callback chamado quando o estado open muda.',
      control: false,
    },
    onSelect: {
      description: 'Callback chamado ao selecionar um item do menu.',
      control: false,
    },
    selectedValue: {
      description: 'Valor do item atualmente selecionado.',
      control: 'text',
    },
    className: {
      description: 'Classes CSS adicionais para customização.',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ContextualMenu>;

export const Usage: Story = {
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          width: '500px',
          height: '320px',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
  args: {
    open: true,
  },
  render: () => (
    <ContextualMenuTrigger
      items={[
        {
          type: 'primary',
          label: 'Option Text Primary',
          value: 'Option Text Primary',
        },
        {
          type: 'critical',
          label: 'Option Text Critical',
          value: 'Option Text Critical',
        },
        {
          type: 'neutral',
          label: 'Option Text Neutral',
          value: 'Option Text Neutral',
        },
        {
          type: 'primary',
          label: 'Option Text Primary Blocked',
          value: 'Option Text Primary Blocked',
          blocked: true,
        },
        {
          type: 'critical',
          label: 'Option Text Critical Blocked',
          value: 'Option Text Critical Blocked',
          blocked: true,
        },
        {
          type: 'neutral',
          label: 'Option Text Neutral Disabled',
          value: 'Option Text Neutral Disabled',
          disabled: true,
        },
        {
          type: 'neutral',
          label: 'Option Text Neutral With Tag',
          value: 'Option Text Neutral With Tag',
          tag: {
            variant: 'highlight',
            type: 'neutral',
            children: 'Label',
          },
        },
        {
          type: 'primary',
          label: 'Option Text Primary With Tag',
          value: 'Option Text Primary With Tag',
          tag: {
            variant: 'highlight',
            type: 'important',
            children: 'Label',
          },
        },
        {
          type: 'critical',
          label: 'Option Text Critical Blocked',
          value: 'Option Text Critical Blocked',
          icon: <Trash />,
        },
      ]}
    />
  ),
};

export const PrimaryVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          width: '500px',
          height: '300px',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
  args: {
    open: true,
    selectedValue: 'Primary Selected',
    items: [
      {
        type: 'primary',
        label: 'Primary',
        value: 'Primary',
      },
      {
        type: 'primary',
        label: 'Primary With Icon',
        value: 'Primary With Icon',
        icon: <Trash />,
      },
      {
        type: 'primary',
        label: 'Primary With Tag',
        value: 'Primary With Tag',
        tag: {
          variant: 'highlight',
          type: 'important',
          children: 'Info',
        },
      },
      {
        type: 'primary',
        label: 'Primary With Icon and Tag',
        value: 'Primary With Icon and Tag',
        icon: <Trash />,
        tag: {
          variant: 'highlight',
          type: 'important',
          children: 'Label',
        },
      },
      {
        type: 'primary',
        label: 'Primary Selected',
        value: 'Primary Selected',
      },
      {
        type: 'primary',
        label: 'Primary Selected With Icon',
        value: 'Primary Selected With Icon',
        icon: <Trash />,
      },
      {
        type: 'primary',
        label: 'Primary Selected With Tag',
        value: 'Primary Selected With Tag',
        tag: {
          variant: 'highlight',
          type: 'important',
          children: 'Tag',
        },
      },
      {
        type: 'primary',
        label: 'Primary Selected With Icon and Tag',
        value: 'Primary Selected With Icon and Tag',
        icon: <Trash />,
        tag: {
          variant: 'highlight',
          type: 'important',
          children: 'Label',
        },
      },
      {
        type: 'primary',
        label: 'Primary Disabled',
        value: 'Primary Disabled',
        disabled: true,
      },
      {
        type: 'primary',
        label: 'Primary Disabled With Icon',
        value: 'Primary Disabled With Icon',
        icon: <Trash />,
        disabled: true,
      },
      {
        type: 'primary',
        label: 'Primary Disabled With Tag',
        value: 'Primary Disabled With Tag',
        tag: {
          variant: 'highlight',
          type: 'important',
          children: 'Label',
        },
        disabled: true,
      },
      {
        type: 'primary',
        label: 'Primary Disabled With Icon and Tag',
        value: 'Primary Disabled With Icon and Tag',
        icon: <Trash />,
        tag: {
          variant: 'highlight',
          type: 'important',
          children: 'Label',
        },
        disabled: true,
      },
      {
        type: 'primary',
        label: 'Primary Blocked',
        value: 'Primary Blocked',
        blocked: true,
      },
      {
        type: 'primary',
        label: 'Primary Blocked With Icon',
        value: 'Primary Blocked With Icon',
        icon: <Trash />,
        blocked: true,
      },
    ],
  },
};

export const NeutralVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          width: '500px',
          height: '300px',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
  args: {
    open: true,
    selectedValue: 'Neutral Selected',
    items: [
      {
        type: 'neutral',
        label: 'Neutral',
        value: 'Neutral',
      },
      {
        type: 'neutral',
        label: 'Neutral With Icon',
        value: 'Neutral With Icon',
        icon: <Trash />,
      },
      {
        type: 'neutral',
        label: 'Neutral With Tag',
        value: 'Neutral With Tag',
        tag: {
          variant: 'highlight',
          type: 'neutral',
          children: 'Warning',
        },
      },
      {
        type: 'neutral',
        label: 'Neutral With Icon and Tag',
        value: 'Neutral With Icon and Tag',
        icon: <Trash />,
        tag: {
          variant: 'highlight',
          type: 'neutral',
          children: 'Label',
        },
      },
      {
        type: 'neutral',
        label: 'Neutral Selected',
        value: 'Neutral Selected',
      },
      {
        type: 'neutral',
        label: 'Neutral Selected With Icon',
        value: 'Neutral Selected With Icon',
        icon: <Trash />,
      },
      {
        type: 'neutral',
        label: 'Neutral Selected With Tag',
        value: 'Neutral Selected With Tag',
        tag: {
          variant: 'highlight',
          type: 'neutral',
          children: 'Tag',
        },
      },
      {
        type: 'neutral',
        label: 'Neutral Selected With Icon and Tag',
        value: 'Neutral Selected With Icon and Tag',
        icon: <Trash />,
        tag: {
          variant: 'highlight',
          type: 'neutral',
          children: 'Label',
        },
      },
      {
        type: 'neutral',
        label: 'Neutral Disabled',
        value: 'Neutral Disabled',
        disabled: true,
      },
      {
        type: 'neutral',
        label: 'Neutral Disabled With Icon',
        value: 'Neutral Disabled With Icon',
        icon: <Trash />,
        disabled: true,
      },
      {
        type: 'neutral',
        label: 'Neutral Disabled With Tag',
        value: 'Neutral Disabled With Tag',
        tag: {
          variant: 'highlight',
          type: 'neutral',
          children: 'Label',
        },
        disabled: true,
      },
      {
        type: 'neutral',
        label: 'Neutral Disabled With Icon and Tag',
        value: 'Neutral Disabled With Icon and Tag',
        icon: <Trash />,
        tag: {
          variant: 'highlight',
          type: 'neutral',
          children: 'Label',
        },
        disabled: true,
      },
      {
        type: 'neutral',
        label: 'Neutral Blocked',
        value: 'Neutral Blocked',
        blocked: true,
      },
    ],
  },
};

export const CriticalVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          width: '500px',
          height: '300px',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
  args: {
    open: true,
    selectedValue: 'Critical Selected',
    items: [
      {
        type: 'critical',
        label: 'Critical',
        value: 'Critical',
      },
      {
        type: 'critical',
        label: 'Critical With Icon',
        value: 'Critical With Icon',
        icon: <Trash />,
      },
      {
        type: 'critical',
        label: 'Critical With Tag',
        value: 'Critical With Tag',
        tag: {
          variant: 'highlight',
          type: 'important',
          children: 'Important',
        },
      },
      {
        type: 'critical',
        label: 'Critical With Icon and Tag',
        value: 'Critical With Icon and Tag',
        icon: <Trash />,
        tag: {
          variant: 'highlight',
          type: 'important',
          children: 'Label',
        },
      },
      {
        type: 'critical',
        label: 'Critical Selected',
        value: 'Critical Selected',
      },
      {
        type: 'critical',
        label: 'Critical Selected With Icon',
        value: 'Critical Selected With Icon',
        icon: <Trash />,
      },
      {
        type: 'critical',
        label: 'Critical Selected With Tag',
        value: 'Critical Selected With Tag',
        tag: {
          variant: 'highlight',
          type: 'important',
          children: 'Tag',
        },
      },
      {
        type: 'critical',
        label: 'Critical Selected With Icon and Tag',
        value: 'Critical Selected With Icon and Tag',
        icon: <Trash />,
        tag: {
          variant: 'highlight',
          type: 'important',
          children: 'Label',
        },
      },
      {
        type: 'critical',
        label: 'Critical Disabled',
        value: 'Critical Disabled',
        disabled: true,
      },
      {
        type: 'critical',
        label: 'Critical Disabled With Icon',
        value: 'Critical Disabled With Icon',
        icon: <Trash />,
        disabled: true,
      },
      {
        type: 'critical',
        label: 'Critical Disabled With Tag',
        value: 'Critical Disabled With Tag',
        tag: {
          variant: 'highlight',
          type: 'important',
          children: 'Label',
        },
        disabled: true,
      },
      {
        type: 'critical',
        label: 'Critical Disabled With Icon and Tag',
        value: 'Critical Disabled With Icon and Tag',
        icon: <Trash />,
        tag: {
          variant: 'highlight',
          type: 'important',
          children: 'Label',
        },
        disabled: true,
      },
      {
        type: 'critical',
        label: 'Critical Blocked',
        value: 'Critical Blocked',
        blocked: true,
      },
    ],
  },
};
