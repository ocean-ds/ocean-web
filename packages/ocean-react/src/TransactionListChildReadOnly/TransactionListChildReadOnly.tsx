import React from 'react';
import classNames from 'classnames';
import {
  TransactionListBaseProps,
  TransactionListChildPosition,
  TransactionListContent,
  TransactionListSkeleton,
  TransactionListTimeline,
} from '../_shared/components/TransactionListParts';

export type TransactionListChildReadOnlyProps = TransactionListBaseProps & {
  /**
   * Typography scale of the content block, independent from `amountSize`.
   * @default 'sm'
   */
  contentSize?: TransactionListBaseProps['contentSize'];
  /**
   * Size of the amount block, independent from `contentSize`.
   * @default 'sm'
   */
  amountSize?: TransactionListBaseProps['amountSize'];
  /**
   * Color of the timeline icon. When omitted, child rows use Interface/Light/Down; an explicit
   * `default` / `on-color` / `highlight` overrides it. Disabled always forces
   * Interface/Light/Deep.
   */
  iconColor?: TransactionListBaseProps['iconColor'];
  /**
   * Position on the timeline: `standalone` (no line), `first` (line below), `middle`
   * (above and below) or `last` (line above).
   * @default 'standalone'
   */
  position?: TransactionListChildPosition;
} & React.ComponentPropsWithoutRef<'div'>;

/**
 * Read-only child row of an expanded transaction, linked by the timeline, without chevron.
 * Use inside `TransactionListExpandable`. Figma: _Child Transaction List Read Only.
 */
const TransactionListChildReadOnly = React.forwardRef<
  HTMLDivElement,
  TransactionListChildReadOnlyProps
>(
  (
    {
      title,
      description,
      strikethroughDescription,
      caption,
      inverted = true,
      status = 'default',
      contentSize = 'sm',
      amount,
      amountType = 'default',
      amountSize = 'sm',
      strikethroughAmount,
      amountTag,
      amountIndicator,
      showAmountIndicator = true,
      additionalData,
      icon,
      iconColor,
      disabled = false,
      loading = false,
      density = 'default',
      position = 'standalone',
      className,
      ...rest
    },
    ref
  ) => (
    <div
      ref={ref}
      data-testid="transaction-list-child-read-only"
      className={classNames(
        'ods-transaction-list',
        'ods-transaction-list--child',
        'ods-transaction-list--read-only',
        `ods-transaction-list--${position}`,
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
        <TransactionListTimeline
          position={position}
          icon={icon}
          iconColor={iconColor}
          disabled={disabled}
        />
        {loading ? (
          <TransactionListSkeleton showLeading={false} />
        ) : (
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
        )}
      </div>
    </div>
  )
);

TransactionListChildReadOnly.displayName = 'TransactionListChildReadOnly';

export default TransactionListChildReadOnly;
