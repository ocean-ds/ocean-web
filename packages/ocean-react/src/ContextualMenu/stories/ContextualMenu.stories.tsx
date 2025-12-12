import React from 'react';
import { Trash } from '@useblu/ocean-icons-react';
import type { Meta, StoryObj } from '@storybook/react';
import type { TagProps } from '../../Tag/Tag';
import ContextualMenu from '../ContextualMenu';
import { ContextualMenuTrigger } from './ContextualMenuTrigger';
import type { ContextualMenuItemProps } from '../ContextualMenuItem';

type ItemType = 'primary' | 'neutral' | 'critical';

const getTagForType = (type: ItemType, label: string): TagProps | undefined => {
  const tagMap: Record<ItemType, 'neutral' | 'important'> = {
    primary: 'important',
    neutral: 'neutral',
    critical: 'important',
  };

  const labelMap: Record<string, string> = {
    'With Tag': type === 'neutral' ? 'Warning' : 'Info',
    'Selected With Tag': 'Tag',
    'Disabled With Tag': 'Label',
  };

  const tagLabel = Object.keys(labelMap).find((key) => label.includes(key));

  return tagLabel
    ? {
        variant: 'highlight' as const,
        type: tagMap[type],
        children: labelMap[tagLabel],
      }
    : undefined;
};

const createVariantItems = (
  type: ItemType
): Omit<ContextualMenuItemProps, 'onClick'>[] => {
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);
  const typeLabel = capitalize(type);

  const variants = [
    { suffix: '', hasIcon: false, hasTag: false },
    { suffix: ' With Icon', hasIcon: true, hasTag: false },
    { suffix: ' With Tag', hasIcon: false, hasTag: true },
    { suffix: ' With Icon and Tag', hasIcon: true, hasTag: true },
  ];

  const states = ['', 'Selected ', 'Disabled ', 'Blocked '];

  const items: Omit<ContextualMenuItemProps, 'onClick'>[] = [];

  states.forEach((state) => {
    const isBlocked = state === 'Blocked ';
    const maxVariants = isBlocked ? 2 : variants.length;

    variants.slice(0, maxVariants).forEach((variant) => {
      const label = `${typeLabel} ${state}${variant.suffix}`.trim();
      const value = label;

      items.push({
        type,
        label,
        value,
        ...(variant.hasIcon && { icon: <Trash /> }),
        ...(variant.hasTag && { tag: getTagForType(type, label) }),
        ...(state === 'Disabled ' && { disabled: true }),
        ...(state === 'Blocked ' && { blocked: true }),
      });
    });
  });

  return items;
};

const variantDecorator = (StoryComponent: React.ComponentType): JSX.Element => (
  <div
    style={{
      width: '350px',
      height: '300px',
    }}
  >
    <StoryComponent />
  </div>
);

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
      control: false,
      table: {
        type: { summary: 'boolean' },
      },
    },
    onOpenChange: {
      description: 'Callback chamado quando o estado open muda.',
      control: false,
      table: {
        type: { summary: '(open: boolean) => void' },
      },
    },
    onSelect: {
      description: 'Callback chamado ao selecionar um item do menu.',
      control: false,
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
    selectedValue: {
      description: 'Valor do item atualmente selecionado.',
      control: false,
      table: {
        type: { summary: 'string | undefined' },
      },
    },
    className: {
      description: 'Classes CSS adicionais para customização.',
      control: false,
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ContextualMenu>;

export const Usage: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Exemplo completo com botão trigger mostrando diferentes tipos de items: primary, neutral, critical, com estados disabled, blocked, ícones e tags.',
      },
    },
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          height: '320px',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
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
          label: 'Option Text Critical With Icon',
          value: 'Option Text Critical With Icon',
          icon: <Trash />,
        },
      ]}
    />
  ),
};

export const PrimaryVariants: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Todas as variantes e estados do tipo Primary: padrão, com ícone, com tag, selecionado, desabilitado e bloqueado.',
      },
    },
  },
  decorators: [variantDecorator],
  args: {
    open: true,
    selectedValue: 'Primary Selected',
    items: createVariantItems('primary'),
  },
};

export const NeutralVariants: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Todas as variantes e estados do tipo Neutral: padrão, com ícone, com tag, selecionado, desabilitado e bloqueado.',
      },
    },
  },
  decorators: [variantDecorator],
  args: {
    open: true,
    selectedValue: 'Neutral Selected',
    items: createVariantItems('neutral'),
  },
};

export const CriticalVariants: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Todas as variantes e estados do tipo Critical: padrão, com ícone, com tag, selecionado, desabilitado e bloqueado. Use para ações destrutivas.',
      },
    },
  },
  decorators: [variantDecorator],
  args: {
    open: true,
    selectedValue: 'Critical Selected',
    items: createVariantItems('critical'),
  },
};
