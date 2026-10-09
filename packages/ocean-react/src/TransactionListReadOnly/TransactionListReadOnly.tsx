import React from 'react';
import classNames from 'classnames';
import {
  TransactionListBaseProps,
  TransactionListContent,
  TransactionListOmittedDomProps,
  TransactionListDivider,
  TransactionListIcon,
  TransactionListSkeleton,
} from '../_shared/components/TransactionListParts';

export type TransactionListReadOnlyProps = TransactionListBaseProps & {
  /**
   * Shows the divider below the item (inset 16, multiply).
   * @default true
   */
  showDivider?: boolean;
} & Omit<React.ComponentPropsWithoutRef<'div'>, TransactionListOmittedDomProps>;

/**
 * Read-only transaction row: content on the left, amount on the right, no interaction.
 */
const TransactionListReadOnly = React.forwardRef<
  HTMLDivElement,
  TransactionListReadOnlyProps
>(
  (
    {
      content,
      amount,
      icon,
      iconColor = 'default',
      disabled = false,
      loading = false,
      density = 'default',
      showDivider = true,
      className,
      ...rest
    },
    ref
  ) => (
      <div
        ref={ref}
        data-testid="transaction-list-read-only"
        className={classNames(
          'ods-transaction-list',
          'ods-transaction-list--read-only',
          {
            'ods-transaction-list--disabled': disabled,
            'ods-transaction-list--loading': loading,
            'ods-transaction-list--compact': density === 'compact',
          },
          className
        )}
        aria-disabled={disabled || undefined}
        aria-busy={loading || undefined}
        {...rest}
      >
        <div className="ods-transaction-list__main">
          {loading ? (
            <TransactionListSkeleton showLeading={Boolean(icon)} />
          ) : (
            <>
              {icon && (
                <TransactionListIcon
                  icon={icon}
                  iconColor={iconColor}
                  disabled={disabled}
                />
              )}
              <TransactionListContent
                content={content}
                amount={amount}
                defaultSize="md"
                disabled={disabled}
              />
            </>
          )}
        </div>
        {showDivider && <TransactionListDivider />}
      </div>
    )
);

TransactionListReadOnly.displayName = 'TransactionListReadOnly';

export default TransactionListReadOnly;
