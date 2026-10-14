import React from 'react';
import classNames from 'classnames';
import TransactionSummaryContent from '../_shared/components/TransactionSummaryContent';
import TransactionNotice, {
  TransactionNoticeProps,
} from '../_shared/components/TransactionNotice';
import type { TransactionRow } from '../_shared/components/TransactionSummaryContent';

export type TransactionFooterType = 'default' | 'highlight';

export type TransactionFooterProps = {
  type?: TransactionFooterType;
  notice?: TransactionNoticeProps;
  mainItem?: TransactionRow;
  details?: TransactionRow[];
  total: TransactionRow;
  action: React.ReactNode;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>;

const TransactionFooter = React.forwardRef<
  HTMLDivElement,
  TransactionFooterProps
>(
  (
    {
      type = 'default',
      notice,
      mainItem,
      details,
      total,
      action,
      className,
      ...rest
    },
    ref
  ) => (
    <div
      ref={ref}
      className={classNames('ods-transaction-footer-v2', className)}
      {...rest}
    >
      {notice != null && (
        <TransactionNotice
          className="ods-transaction-footer-v2__notice"
          notice={notice}
        />
      )}
      <div
        className={classNames(
          'ods-transaction-footer-v2__body',
          `ods-transaction-footer-v2__body--${type}`
        )}
      >
        <TransactionSummaryContent
          classPrefix="ods-transaction-footer-v2"
          mainItem={mainItem}
          details={details}
          total={total}
        />
        <div className="ods-transaction-footer-v2__action">{action}</div>
      </div>
    </div>
  )
);

TransactionFooter.displayName = 'TransactionFooter';

export default TransactionFooter;
