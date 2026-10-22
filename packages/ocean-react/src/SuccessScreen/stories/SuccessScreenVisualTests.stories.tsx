import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MatrixGrid } from '../../../../../.storybook/docs-blocks';
import SuccessScreen from '../SuccessScreen';

const meta: Meta = {
  title: 'Visual tests/Success Screen',
  parameters: { layout: 'padded', controls: { disable: true } },
};
export default meta;
type Story = StoryObj;
const LABELS = {
  positive: 'Paid',
  neutral: 'Processing',
  negative: 'Not completed',
};

export const Matrix: Story = {
  render: () => (
    <MatrixGrid
      columns={[
        'Description off',
        'Description on',
        'Top Bar',
        '0 actions',
        '1 action',
        '2 actions',
        'Long title',
      ]}
      rows={(['positive', 'neutral', 'negative'] as const).flatMap((status) =>
        (['desktop', 'mobile'] as const).map((layout) => {
          const render = (options: {
            description?: string;
            showTopBar?: boolean;
            actions?: number;
            longTitle?: boolean;
          }) => (
            <div style={{ width: layout === 'desktop' ? 530 : 360 }}>
              <SuccessScreen
                status={status}
                title={
                  options.longTitle
                    ? 'Your payment to Coral Distributors has been completed successfully'
                    : 'Payment complete'
                }
                description={options.description}
                tagLabel={LABELS[status]}
                showTopBar={options.showTopBar}
                primaryAction={
                  options.actions ? { label: 'Continue' } : undefined
                }
                secondaryAction={
                  options.actions === 2 ? { label: 'Done' } : undefined
                }
              >
                <span>Payment · R$ 6.819,33</span>
              </SuccessScreen>
            </div>
          );
          return {
            label: `${status} · ${layout}`,
            cells: [
              render({}),
              render({ description: 'Your payment has been processed.' }),
              render({ showTopBar: true }),
              render({ actions: 0 }),
              render({ actions: 1 }),
              render({ actions: 2 }),
              render({ longTitle: true }),
            ],
          };
        })
      )}
    />
  ),
};
