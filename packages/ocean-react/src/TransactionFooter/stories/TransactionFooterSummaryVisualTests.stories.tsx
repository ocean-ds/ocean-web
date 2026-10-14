import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MatrixGrid } from '../../../../../.storybook/docs-blocks';
import TransactionFooter from '../TransactionFooter';
import TransactionSummary from '../../TransactionSummary/TransactionSummary';
import {
  transactionFourDetails,
  transactionNotice,
  transactionNoticeWithTitleAndIcon,
  transactionSummaryAmountVariants,
  transactionSummaryAction as action,
  transactionSummaryDetails,
  transactionSummaryMainItem as mainItem,
  transactionSummaryTotal as total,
} from '../../../../../.storybook/docs-blocks/transaction-footer-summary/fixtures';
import { centeredMatrix } from '../../../../../.storybook/docs-blocks/transaction-footer-summary/story-helpers';

const meta: Meta = {
  title: 'Visual tests/Transaction Summary',
  decorators: [centeredMatrix],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    chromatic: { disableSnapshot: false },
  },
};

export default meta;
type Story = StoryObj;

const footerCells = [
  {
    label: 'Amount types, tags and content',
    canvasClass: 'odoc-footer-swatch--default',
    node: (
      <TransactionFooter
        mainItem={transactionSummaryAmountVariants[0]}
        details={transactionSummaryAmountVariants.slice(1)}
        total={total}
        action={action}
      />
    ),
  },
  {
    label: 'With notice',
    canvasClass: 'odoc-footer-swatch--default',
    node: (
      <TransactionFooter
        notice={transactionNotice}
        mainItem={mainItem}
        details={transactionSummaryDetails}
        total={total}
        action={action}
      />
    ),
  },
  {
    label: 'Notice + highlight',
    canvasClass: 'odoc-footer-swatch--highlight',
    node: (
      <TransactionFooter
        type="highlight"
        notice={transactionNotice}
        mainItem={mainItem}
        details={transactionSummaryDetails}
        total={total}
        action={action}
      />
    ),
  },
  {
    label: 'Notice title and icon',
    canvasClass: 'odoc-footer-swatch--default',
    node: (
      <TransactionFooter
        notice={transactionNoticeWithTitleAndIcon}
        mainItem={mainItem}
        details={transactionSummaryDetails}
        total={total}
        action={action}
      />
    ),
  },
  {
    label: 'Main item only',
    canvasClass: 'odoc-footer-swatch--default',
    node: (
      <TransactionFooter mainItem={mainItem} total={total} action={action} />
    ),
  },
  {
    label: 'Details only',
    canvasClass: 'odoc-footer-swatch--default',
    node: (
      <TransactionFooter
        details={transactionSummaryDetails}
        total={total}
        action={action}
      />
    ),
  },
  {
    label: 'Four details',
    canvasClass: 'odoc-footer-swatch--default',
    node: (
      <TransactionFooter
        details={transactionFourDetails}
        total={total}
        action={action}
      />
    ),
  },
  {
    label: 'Additional info',
    canvasClass: 'odoc-footer-swatch--default',
    node: (
      <TransactionFooter
        mainItem={{
          ...mainItem,
          amount: { ...mainItem.amount, info: 'No additional fees' },
        }}
        details={transactionSummaryDetails}
        total={total}
        action={action}
      />
    ),
  },
];

const summaryCells = [
  {
    label: 'Amount types, tags and content',
    node: (
      <TransactionSummary
        title="Payment summary"
        mainItem={transactionSummaryAmountVariants[0]}
        details={transactionSummaryAmountVariants.slice(1)}
        total={total}
        action={action}
      />
    ),
  },
  {
    label: 'Without title',
    node: (
      <TransactionSummary
        mainItem={mainItem}
        details={transactionSummaryDetails}
        total={total}
        action={action}
      />
    ),
  },
  {
    label: 'With notice',
    node: (
      <TransactionSummary
        title="Payment summary"
        mainItem={mainItem}
        details={transactionSummaryDetails}
        total={total}
        notice={transactionNotice}
        action={action}
      />
    ),
  },
  {
    label: 'Details only',
    node: (
      <TransactionSummary
        title="Payment summary"
        details={transactionSummaryDetails}
        total={total}
        action={action}
      />
    ),
  },
];

const matrix = (
  cells: Array<{
    label: string;
    node: React.ReactNode;
    canvasClass?: string;
  }>,
  width: number,
  matrixClass?: string
): React.ReactElement => (
  <MatrixGrid
    columns={['Variant']}
    className={matrixClass}
    rows={cells.map(({ label, node, canvasClass }) => ({
      label,
      cells: [
        canvasClass ? (
          <div key={label} className={`odoc-footer-swatch ${canvasClass}`}>
            <div className="odoc-footer-surface">{node}</div>
          </div>
        ) : (
          <div key={label} style={{ width }}>
            {node}
          </div>
        ),
      ],
    }))}
  />
);

export const Footer: Story = {
  render: () => matrix(footerCells, 360, 'odoc-matrix--footer'),
};

export const Aside: Story = {
  render: () => matrix(summaryCells, 360),
  parameters: { whiteCanvas: true },
};
