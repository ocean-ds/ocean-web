import React from 'react';
import classNames from 'classnames';
import TransactionSummaryContent from '../_shared/components/TransactionSummaryContent';
import { TransactionListReadOnlyProps } from '../TransactionListReadOnly';
import Typography from '../Typography';

export type TransactionSummaryProps = {
  title?: React.ReactNode;
  items: TransactionListReadOnlyProps[];
  total: {
    label: React.ReactNode;
    value: React.ReactNode;
  };
  notice?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>;

const TransactionSummary = React.forwardRef<
  HTMLDivElement,
  TransactionSummaryProps
>(({ title, items, total, notice, action, className, ...rest }, ref) => (
  <div
    ref={ref}
    className={classNames('ods-transaction-summary', className)}
    {...rest}
  >
    {title != null && (
      <Typography variant="heading5" className="ods-transaction-summary__title">
        {title}
      </Typography>
    )}
    <div className="ods-transaction-summary__card">
      <TransactionSummaryContent
        classPrefix="ods-transaction-summary"
        rowsClassName="ods-transaction-summary__rows"
        items={items}
        total={total}
      />
    </div>
    {notice != null && (
      <div className="ods-transaction-summary__notice">{notice}</div>
    )}
    {action != null && (
      <div className="ods-transaction-summary__action">{action}</div>
    )}
  </div>
));

TransactionSummary.displayName = 'TransactionSummary';

export default TransactionSummary;
