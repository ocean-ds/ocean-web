import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Typography from '../../Typography';
import SuccessScreen from '../SuccessScreen';

const meta: Meta = {
  title: 'Visual tests/Success Screen',
  parameters: { layout: 'padded', controls: { disable: true } },
};
export default meta;
type Story = StoryObj;
const STATUS_COPY = {
  positive: {
    label: 'Paid',
    title: 'Payment complete',
    description: 'Your payment has been processed.',
    longTitle: 'Payment to Coral Distributors has been completed successfully',
  },
  neutral: {
    label: 'Scheduled',
    title: 'Payment scheduled',
    description: 'Your payment will be processed on Nov 12.',
    longTitle: 'Payment to Coral Distributors is scheduled for Nov 12',
  },
  negative: {
    label: 'Not completed',
    title: 'Payment not completed',
    description: "We couldn't process this payment.",
    longTitle: 'Payment to Coral Distributors could not be processed',
  },
};

export const Matrix: Story = {
  render: () => (
    <div>
      {(['desktop', 'mobile'] as const).map((layout) => {
        const width = layout === 'desktop' ? 530 : 360;
        const scenarios: {
          label: string;
          options: {
            description?: boolean;
            showTopBar?: boolean;
            actions?: number;
            longTitle?: boolean;
          };
        }[] = [
          { label: 'Description off', options: {} },
          { label: 'Description on', options: { description: true } },
          { label: 'Top Bar', options: { showTopBar: true } },
          { label: '0 actions', options: { actions: 0 } },
          { label: '1 action', options: { actions: 1 } },
          { label: '2 actions', options: { actions: 2 } },
          { label: 'Long title', options: { longTitle: true } },
        ];

        return (
          <section key={layout} style={{ marginBottom: 32 }}>
            <Typography variant="heading3">
              {layout === 'desktop' ? 'Desktop' : 'Mobile'}
            </Typography>
            {(['positive', 'neutral', 'negative'] as const).map((status) => (
              <section key={status} style={{ marginTop: 24 }}>
                <Typography variant="description">
                  {STATUS_COPY[status].title} · {STATUS_COPY[status].label}
                </Typography>
                <div
                  style={{
                    display: 'grid',
                    gap: 24,
                    gridTemplateColumns: `repeat(auto-fit, minmax(${width}px, 1fr))`,
                    marginTop: 12,
                  }}
                >
                  {scenarios.map(({ label, options }) => (
                    <div key={label} style={{ minWidth: width }}>
                      <Typography variant="captionbold">{label}</Typography>
                      <div
                        style={{
                          marginTop: 8,
                          width,
                          height: layout === 'mobile' ? 640 : undefined,
                        }}
                      >
                        <SuccessScreen
                          status={status}
                          title={
                            options.longTitle
                              ? STATUS_COPY[status].longTitle
                              : STATUS_COPY[status].title
                          }
                          description={
                            options.description
                              ? STATUS_COPY[status].description
                              : undefined
                          }
                          tagLabel={STATUS_COPY[status].label}
                          showTopBar={options.showTopBar}
                          primaryAction={
                            options.actions
                              ? { label: 'View payment' }
                              : undefined
                          }
                          secondaryAction={
                            options.actions === 2
                              ? { label: 'Done' }
                              : undefined
                          }
                        >
                          <Typography variant="description">
                            Payment · R$ 6.819,33
                          </Typography>
                        </SuccessScreen>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </section>
        );
      })}
    </div>
  ),
};
