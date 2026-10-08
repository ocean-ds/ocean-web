import React from 'react';
import classNames from 'classnames';
import {
  TransactionListBaseProps,
  TransactionListContent,
  TransactionListDivider,
  TransactionListIcon,
  TransactionListSkeleton,
} from '../_shared/components/TransactionListParts';

export type TransactionListReadOnlyProps = TransactionListBaseProps & {
  /**
   * Typography scale of the content block, independent from `amountSize`.
   * @default 'md'
   */
  contentSize?: TransactionListBaseProps['contentSize'];
  /**
   * Size of the amount block, independent from `contentSize`.
   * @default 'md'
   */
  amountSize?: TransactionListBaseProps['amountSize'];
  /**
   * Shows the divider below the item (inset 16, multiply).
   * @default true
   */
  showDivider?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

/**
 * Read-only transaction row: content on the left, amount on the right, no interaction.
 * Figma: Transaction List Read Only.
 */
const TransactionListReadOnly = React.forwardRef<
  HTMLDivElement,
  TransactionListReadOnlyProps
>(
  (
    {
      title,
      description,
      strikethroughDescription,
      caption,
      inverted = true,
      status = 'default',
      contentSize = 'md',
      amount,
      amountType = 'default',
      amountSize = 'md',
      strikethroughAmount,
      amountTag,
      amountIndicator,
      showAmountIndicator = true,
      additionalData,
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
              title={title}
              description={description}
              strikethroughDescription={strikethroughDescription}
              caption={caption}
              inverted={inverted}
              status={status}
              contentSize={contentSize}
              amount={amount}
              amountType={amountType}
              amountSize={amountSize}
              strikethroughAmount={strikethroughAmount}
              amountTag={amountTag}
              amountIndicator={amountIndicator}
              showAmountIndicator={showAmountIndicator}
              additionalData={additionalData}
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
