import type { Meta, StoryObj } from '@storybook/react';
import { ContentListDefault } from '../../../../../../../.storybook/docs-blocks/transaction-list/block-previews';
import { contentListDefaultArgTypes } from '../../../../../../../.storybook/docs-blocks/transaction-list/argTypes';
import { rows } from '../../../../../../../.storybook/docs-blocks/transaction-list/fixtures';
import { asBlock } from '../../../../../../../.storybook/docs-blocks/transaction-list/story-helpers';

const meta: Meta<typeof ContentListDefault> = {
  title: 'Components/Lists/Content List/Content List Default',
  component: ContentListDefault,
  decorators: [asBlock],
  parameters: { layout: 'centered' },
  argTypes: contentListDefaultArgTypes,
  args: rows.supplierPayment.content,
};

export default meta;

type Story = StoryObj<typeof ContentListDefault>;

/** Title (small line), description (emphasized) and caption. */
export const Default: Story = {};

/** The original text struck through before the new one. */
export const Strikethrough: Story = {
  args: {
    title: 'Installment 3 of 10',
    description: 'Oct 20',
    caption: undefined,
    strikethroughDescription: 'Oct 15',
    status: 'strikethrough',
  },
};
