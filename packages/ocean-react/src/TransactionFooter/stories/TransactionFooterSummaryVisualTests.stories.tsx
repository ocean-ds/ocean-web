import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MatrixGrid } from '../../../../../.storybook/docs-blocks';
import TransactionFooter from '../TransactionFooter';
import TransactionSummary from '../../TransactionSummary/TransactionSummary';
import {
  transactionFourDetails,
  transactionNotice,
  transactionNoticeWithTitleAndIcon,
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
    label: 'With notice',
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
    node: (
      <TransactionFooter mainItem={mainItem} total={total} action={action} />
    ),
  },
  {
    label: 'Details only',
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
    node: (
      <TransactionFooter
        mainItem={{ ...mainItem, info: 'No additional fees' }}
        details={transactionSummaryDetails}
        total={total}
        action={action}
      />
    ),
  },
];

const summaryCells = [
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
  cells: Array<{ label: string; node: React.ReactNode }>,
  width: number
): React.ReactElement => (
  <MatrixGrid
    columns={['Variant']}
    rows={cells.map(({ label, node }) => ({
      label,
      cells: [
        <div key={label} style={{ width }}>
          {node}
        </div>,
      ],
    }))}
  />
);

export const Footer: Story = {
  render: () => matrix(footerCells, 360),
};

export const Aside: Story = {
  render: () => matrix(summaryCells, 360),
  parameters: { whiteCanvas: true },
};
