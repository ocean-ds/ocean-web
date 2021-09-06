import React from 'react';
import classNames from 'classnames';

export type TransactionListItemProps = {
  /**
   * Determines a level 2 information for the item.
   */
  level2?: string | React.ReactElement;
  /**
   * Determines a level 3 information for the item.
   */
  level3?: string | React.ReactElement;
  /**
   * Determines a level 4 information for the item.
   */
  level4?: string | React.ReactElement;
  /**
   * Determines a value for the item.
   */
  value?: string | React.ReactElement;
  /**
   * Determines a if the value has a positive format.
   */
  positive?: boolean;
  /**
   * Determines a time for the item.
   */
  time?: string | React.ReactElement;
  /**
   * Determines a tags area for the item.
   */
  tags?: string | React.ReactElement;
  /**
   * Determines the icon for the.
   */
  icon?: React.ReactElement;
  /**
   * Determines the sub list of items inside the parent item.
   */
  subItens?: React.ReactElement;
} & React.ComponentPropsWithoutRef<'div'>;

const TransactionListItem = React.forwardRef<
  HTMLDivElement,
  TransactionListItemProps
>(function Tag(
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
    subItens,
    className,
    ...rest
  },
  ref
) {
  return (
    <div
      ref={ref}
      className={classNames('ods-transaction-list-item', className)}
      {...rest}
    >
      <div className="ods-transaction-list-item__content">
        {icon && <div className="ods-transaction-list-item__icon">{icon}</div>}
        <div className="ods-transaction-list-item__information">
          {level4 && (
            <div className="ods-transaction-list-item__level4">{level4}</div>
          )}
          <div className="ods-transaction-list-item__level1">{children}</div>
          {level2 && (
            <div className="ods-transaction-list-item__level2">{level2}</div>
          )}
          {level3 && (
            <div className="ods-transaction-list-item__level3">{level3}</div>
          )}
        </div>
        <div className="ods-transaction-list-item__sub-information">
          <div
            className={classNames('ods-transaction-list-item__value', {
              'ods-transaction-list-item__value--positive': positive,
            })}
          >
            {value}
          </div>
          {tags && (
            <div className="ods-transaction-list-item__tags">{tags}</div>
          )}
          {time && (
            <div className="ods-transaction-list-item__time">{time}</div>
          )}
        </div>
      </div>
      {subItens && (
        <div className="ods-transaction-list-item__sub-itens">{subItens}</div>
      )}
    </div>
  );
});

export default TransactionListItem;
