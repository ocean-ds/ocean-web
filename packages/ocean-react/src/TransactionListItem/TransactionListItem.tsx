import React from 'react';
import classNames from 'classnames';
import { ChevronRight } from '@useblu/ocean-icons-react';

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
  withChevron?: boolean;
  readOnly?: boolean;
  isLoading?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

const TransactionListItem = React.forwardRef<
  HTMLDivElement,
  TransactionListItemProps
>(
  (
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
      withChevron,
      readOnly,
      isLoading,
      ...rest
    },
    ref
  ) => (
    <div
      ref={ref}
      className={classNames(
        'ods-transaction-list-item',
        { 'ods-transaction-list-item--chevron': withChevron },
        { 'ods-transaction-list-item--readonly': readOnly },
        { 'ods-transaction-list-item--isloading': isLoading },
        className
      )}
      {...rest}
    >
      <div className="ods-transaction-list-item__content">
        {icon && <div className="ods-transaction-list-item__icon">{icon}</div>}
        <div
          className={`ods-transaction-list-item__information ${
            icon ? 'ods-transaction-list-item__information--with-icon' : ''
          }`}
        >
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
        {withChevron && !readOnly && (
          <span className="ods-transaction-list-item__chevron">
            <ChevronRight size={20} />
          </span>
        )}
      </div>
      {subItens && (
        <div className="ods-transaction-list-item__sub-itens">{subItens}</div>
      )}
    </div>
  )
);

TransactionListItem.displayName = 'TransactionListItem';

export default TransactionListItem;
