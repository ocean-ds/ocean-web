import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Star } from '@useblu/ocean-icons-react';
import Tag from '../Tag';
import type { TagProps } from '../Tag';
import { tagDecorator } from '../../../../../.storybook/docs-blocks/tag/story-helpers';

type TagType =
  | 'default'
  | 'positive'
  | 'warning'
  | 'negative'
  | 'neutral'
  | 'neutral-02'
  | 'neutral-03'
  | 'complementary'
  | 'important';

type StoryArgs = {
  appearance: 'default' | 'translucent';
  children: string;
  icon: 'default' | 'star' | 'none';
  setIconOff: boolean;
  size: 'small' | 'medium';
  type: TagType;
  variant: 'default' | 'highlight';
};

const meta: Meta<StoryArgs> = {
  title: 'Components/Data Display/Tag/Tag',
  component: Tag,
  decorators: [tagDecorator],
  args: {
    appearance: 'default',
    children: 'Harbor Market',
    icon: 'default',
    setIconOff: false,
    size: 'medium',
    type: 'positive',
    variant: 'default',
  },
  argTypes: {
    appearance: {
      control: 'inline-radio',
      options: ['default', 'translucent'],
    },
    children: { control: 'text', name: 'Label' },
    icon: {
      control: 'select',
      options: ['default', 'star', 'none'],
    },
    setIconOff: { control: 'boolean' },
    size: { control: 'inline-radio', options: ['small', 'medium'] },
    type: {
      control: 'select',
      options: [
        'default',
        'positive',
        'warning',
        'negative',
        'neutral',
        'neutral-02',
        'neutral-03',
        'complementary',
        'important',
      ],
    },
    variant: { control: 'inline-radio', options: ['default', 'highlight'] },
  },
  render: ({ appearance, children, icon, setIconOff, size, type, variant }) => {
    const needsCustomIcon =
      appearance === 'translucent' &&
      ['neutral', 'neutral-02', 'complementary'].includes(type);
    const iconElement =
      icon === 'star' || (icon === 'default' && needsCustomIcon) ? (
        <Star />
      ) : undefined;
    const appearanceProps = variant === 'highlight' ? {} : { appearance };

    return (
      <Tag
        {...({
          ...appearanceProps,
          icon: iconElement,
          setIconOff: setIconOff || icon === 'none',
          size,
          type,
          variant,
        } as TagProps)}
      >
        {children}
      </Tag>
    );
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {};

export const Highlight: Story = {
  args: { type: 'important', variant: 'highlight' },
};

export const Translucent: Story = {
  args: { appearance: 'translucent', type: 'positive', variant: 'default' },
};
