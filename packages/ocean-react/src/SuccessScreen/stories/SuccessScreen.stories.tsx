import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import List from '../../List';
import TransactionListItem from '../../TransactionListItem';
import SuccessScreen from '../SuccessScreen';
import './success-screen-story-frame.scss';

type Args = React.ComponentProps<typeof SuccessScreen> & {
  showDescription: boolean;
  layout: 'desktop' | 'mobile';
  primaryActionLabel: string;
  secondaryActionLabel: string;
};

const TAG_LABELS = {
  positive: 'Paid',
  neutral: 'Scheduled',
  negative: 'Not completed',
};

const meta: Meta<Args> = {
  title: 'Components/Feedback/Success Screen/Success Screen',
  component: SuccessScreen,
  argTypes: {
    status: {
      control: 'inline-radio',
      options: ['positive', 'neutral', 'negative'],
    },
    title: { control: 'text' },
    description: { control: 'text' },
    closeButtonAriaLabel: { control: 'text' },
    showDescription: { control: 'boolean' },
    extraInformation: { control: 'text' },
    showTopBar: { control: 'boolean' },
    layout: { control: 'inline-radio', options: ['desktop', 'mobile'] },
    primaryActionLabel: { control: 'text' },
    secondaryActionLabel: { control: 'text' },
  },
  args: {
    title: 'Payment complete',
    description: 'Your payment has been processed.',
    showDescription: true,
    extraInformation: 'Nov 12, 9:15 AM',
    showTopBar: false,
    layout: 'desktop',
    primaryActionLabel: 'View payment',
    secondaryActionLabel: 'Done',
  },
  render: ({
    showDescription,
    layout,
    primaryActionLabel,
    secondaryActionLabel,
    ...args
  }) => (
    <div
      className={
        layout === 'mobile'
          ? 'ods-success-screen-story-frame--mobile'
          : undefined
      }
      style={{
        width: layout === 'desktop' ? 1024 : 360,
        height: layout === 'mobile' ? 640 : undefined,
        margin: '0 auto',
      }}
    >
      <SuccessScreen
        {...args}
        description={showDescription ? args.description : undefined}
        primaryAction={{ label: primaryActionLabel }}
        secondaryAction={{ label: secondaryActionLabel }}
        tagLabel={TAG_LABELS[args.status ?? 'positive']}
      >
        <List>
          <TransactionListItem>
            Payment to supplier · Coral Distributors · R$ 6.819,33
          </TransactionListItem>
          <TransactionListItem>Payment method · Ocean Card</TransactionListItem>
        </List>
      </SuccessScreen>
    </div>
  ),
};

export default meta;
type Story = StoryObj<Args>;

export const Positive: Story = { args: { status: 'positive' } };
export const Neutral: Story = {
  args: {
    status: 'neutral',
    title: 'Payment scheduled',
    description: 'Your payment will be processed on Nov 12.',
  },
};
export const Negative: Story = {
  args: {
    status: 'negative',
    title: 'Payment not completed',
    description: "We couldn't process this payment.",
  },
};
export const PositiveMobileTopBar: Story = {
  args: { status: 'positive', showTopBar: true, layout: 'mobile' },
};
export const NeutralMobileTopBar: Story = {
  args: { ...Neutral.args, showTopBar: true, layout: 'mobile' },
};
export const NegativeMobile: Story = {
  args: { ...Negative.args, layout: 'mobile' },
};
