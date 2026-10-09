import type { Meta, StoryObj } from '@storybook/react';
import { ContentListAmount } from '../../../../../../../.storybook/docs-blocks/transaction-list/block-previews';
import { contentListAmountArgTypes } from '../../../../../../../.storybook/docs-blocks/transaction-list/argTypes';
import { TAGS } from '../../../../../../../.storybook/docs-blocks/transaction-list/fixtures';
import { asBlock } from '../../../../../../../.storybook/docs-blocks/transaction-list/story-helpers';

const meta: Meta<typeof ContentListAmount> = {
  title: 'Components/Lists/Content List/Content List Amount',
  component: ContentListAmount,
  decorators: [asBlock],
  parameters: { layout: 'centered' },
  argTypes: contentListAmountArgTypes,
  args: { value: 'R$ 6.819,33' },
};

export default meta;

type Story = StoryObj<typeof ContentListAmount>;

/** Neutral value. */
export const Default: Story = {};

/** Money coming in. */
export const Positive: Story = {
  args: { value: 'R$ 7.899,01', type: 'positive' },
};

/** Money going out: the block adds the sign. */
export const Negative: Story = {
  args: { value: 'R$ 1.314,28', type: 'negative' },
};

/** A value that changed in the customer’s favor. */
export const Strikethrough: Story = {
  args: {
    value: 'Free',
    type: 'strikethrough',
    strikethroughValue: 'R$ 89,90',
    info: 'Advance fee',
  },
};

/** A value that changed with no gain or loss implied. */
export const StrikethroughNeutral: Story = {
  name: 'Strikethrough neutral',
  args: {
    type: 'strikethrough-neutral',
    strikethroughValue: 'R$ 7.120,00',
  },
};

/** Status that needs attention. */
export const WithTag: Story = {
  name: 'With tag',
  args: { value: 'R$ 1.314,28', tag: TAGS.scheduled },
};
