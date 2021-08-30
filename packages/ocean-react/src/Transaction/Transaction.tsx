import React from 'react';
import classNames from 'classnames';

export type TransactionProps = {
  /**
   * Determines a level 2 information for the transaction.
   */
  level2?: string | React.ReactElement;
  /**
   * Determines a level 3 information for the transaction.
   */
  level3?: string | React.ReactElement;
  /**
   * Determines a level 4 information for the transaction.
   */
  level4?: string | React.ReactElement;
  /**
   * Determines a value for the transaction.
   */
  value?: string | React.ReactElement;
  /**
   * Determines a if the value has a positive format.
   */
  positive?: boolean;
  /**
   * Determines a time for the transaction.
   */
  time?: string | React.ReactElement;
  /**
   * Determines a tags area for the transaction.
   */
  tags?: string | React.ReactElement;
  /**
   * Determines the icon for the.
   */
  icon?: React.ReactElement;
  /**
   * Determines the sub list of transactions inside the parent transaction.
   */
  subTransactions?: React.ReactElement;
} & React.ComponentPropsWithoutRef<'div'>;

const Transaction = React.forwardRef<HTMLDivElement, TransactionProps>(
  function Tag(
    {
      children,
      level2,
      level3,
      level4,
      icon,
      value,
      positive,
      tags,
      time,
      subTransactions,
      className,
      ...rest
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={classNames('ods-transaction', className)}
        {...rest}
      >
        <div className="ods-transaction__content">
          {icon && <div className="ods-transaction__icon">{icon}</div>}
          <div className="ods-transaction__information">
            {level4 && <div className="ods-transaction__level4">{level4}</div>}
            <div className="ods-transaction__level1">{children}</div>
            {level2 && <div className="ods-transaction__level2">{level2}</div>}
            {level3 && <div className="ods-transaction__level3">{level3}</div>}
          </div>
          <div className="ods-transaction__sub-information">
            <div
              className={classNames('ods-transaction__value', {
                'ods-transaction__value--positive': positive,
              })}
            >
              {value}
            </div>
            {tags && <div className="ods-transaction__tags">{tags}</div>}
            {time && <div className="ods-transaction__time">{time}</div>}
          </div>
        </div>
        {subTransactions && (
          <div className="ods-transaction__sub-transactions">
            {subTransactions}
          </div>
        )}
      </div>
    );
  }
);

export default Transaction;
