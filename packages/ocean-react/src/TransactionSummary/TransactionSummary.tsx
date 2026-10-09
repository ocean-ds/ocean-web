import React from 'react';
import classNames from 'classnames';
import TransactionListReadOnly, {
  TransactionListReadOnlyProps,
} from '../TransactionListReadOnly';
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
>(({ title, items, total, notice, action, className, ...rest }, ref) => {
  const visibleItems = items.slice(0, 5);

  return (
    <div
      ref={ref}
      className={classNames('ods-transaction-summary', className)}
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
        <div className="ods-transaction-summary__rows">
          {visibleItems.map((item, index) => (
            <TransactionListReadOnly
              key={`${item.content.title}-${item.amount.value}`}
              {...item}
              density={index === 0 ? 'default' : 'compact'}
              showDivider={index === 0 && visibleItems.length > 1}
            />
          ))}
        </div>
        <div className="ods-transaction-summary__total">
          <Typography variant="paragraph">
            <span className="ods-transaction-summary__total-label">
              {total.label}
            </span>
          </Typography>
          <Typography variant="paragraph">
            <span className="ods-transaction-summary__total-value">
              {total.value}
            </span>
          </Typography>
        </div>
      </div>
      {notice != null && (
        <div className="ods-transaction-summary__notice">{notice}</div>
      )}
      {action != null && (
        <div className="ods-transaction-summary__action">{action}</div>
      )}
    </div>
  );
});

TransactionSummary.displayName = 'TransactionSummary';

export default TransactionSummary;
