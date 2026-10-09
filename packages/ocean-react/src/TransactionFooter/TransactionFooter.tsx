import React from 'react';
import classNames from 'classnames';
import TransactionListReadOnly, {
  TransactionListReadOnlyProps,
} from '../TransactionListReadOnly';
import Typography from '../Typography';

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
  ) => {
    const visibleItems = items.slice(0, 5);

    return (
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
        <div className="ods-transaction-footer__content">
          {visibleItems.map((item, index) => (
            <TransactionListReadOnly
              key={`${item.content.title}-${item.amount.value}`}
              {...item}
              density={index === 0 ? 'default' : 'compact'}
              showDivider={index === 0 && visibleItems.length > 1}
            />
          ))}
          <div className="ods-transaction-footer__total">
            <Typography variant="paragraph">
              <span className="ods-transaction-footer__total-label">
                {total.label}
              </span>
            </Typography>
            <Typography variant="paragraph">
              <span className="ods-transaction-footer__total-value">
                {total.value}
              </span>
            </Typography>
          </div>
        </div>
        <div className="ods-transaction-footer__action">{action}</div>
      </div>
    );
  }
);

TransactionFooter.displayName = 'TransactionFooter';

export default TransactionFooter;
