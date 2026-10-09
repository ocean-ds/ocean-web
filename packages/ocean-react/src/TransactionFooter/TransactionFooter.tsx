import React from 'react';
import classNames from 'classnames';
import TransactionSummaryContent from '../_shared/components/TransactionSummaryContent';
import { TransactionListReadOnlyProps } from '../TransactionListReadOnly';

export type TransactionFooterType = 'default' | 'highlight';

export type TransactionFooterProps = {
  type?: TransactionFooterType;
  notice?: React.ReactNode;
  items: TransactionListReadOnlyProps[];
  total: {
    label: React.ReactNode;
    value: React.ReactNode;
  };
  action: React.ReactNode;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>;

const TransactionFooter = React.forwardRef<
  HTMLDivElement,
  TransactionFooterProps
>(
  (
    { type = 'default', notice, items, total, action, className, ...rest },
    ref
  ) => (
    <div
      ref={ref}
      className={classNames(
        'ods-transaction-footer',
        `ods-transaction-footer--${type}`,
        className
      )}
      {...rest}
    >
      {notice != null && (
        <div className="ods-transaction-footer__notice">{notice}</div>
      )}
      <TransactionSummaryContent
        classPrefix="ods-transaction-footer"
        rowsClassName="ods-transaction-footer__content"
        items={items}
        total={total}
      />
      <div className="ods-transaction-footer__action">{action}</div>
    </div>
  )
);

TransactionFooter.displayName = 'TransactionFooter';

export default TransactionFooter;
