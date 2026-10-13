import React from 'react';
import classNames from 'classnames';
import TransactionSummaryContent from '../_shared/components/TransactionSummaryContent';
import TransactionNotice, {
  TransactionNoticeProps,
} from '../_shared/components/TransactionNotice';
import Typography from '../Typography';
import type { TransactionRow } from '../_shared/components/TransactionSummaryContent';

export type TransactionSummaryProps = {
  title?: React.ReactNode;
  mainItem?: TransactionRow;
  details?: TransactionRow[];
  total: TransactionRow;
  notice?: TransactionNoticeProps;
  action: React.ReactNode;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>;

const TransactionSummary = React.forwardRef<
  HTMLDivElement,
  TransactionSummaryProps
>(
  (
    { title, mainItem, details, total, notice, action, className, ...rest },
    ref
  ) => (
    <div
      ref={ref}
      className={classNames(
        'ods-transaction-summary',
        { 'ods-transaction-summary--has-notice': notice != null },
        className
      )}
      {...rest}
    >
      {title != null && (
        <Typography
          variant="heading5"
          className="ods-transaction-summary__title"
        >
          {title}
        </Typography>
      )}
      <div className="ods-transaction-summary__card">
        <TransactionSummaryContent
          classPrefix="ods-transaction-summary"
          mainItem={mainItem}
          details={details}
          total={total}
        />
      </div>
      {notice != null && (
        <TransactionNotice
          className="ods-transaction-summary__notice"
          notice={notice}
        />
      )}
      <div className="ods-transaction-summary__action">{action}</div>
    </div>
  )
);

TransactionSummary.displayName = 'TransactionSummary';

export default TransactionSummary;
