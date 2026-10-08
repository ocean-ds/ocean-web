import React from 'react';
import classNames from 'classnames';
import {
  TransactionListBaseProps,
  TransactionListChevron,
  TransactionListChildPosition,
  TransactionListContent,
  TransactionListSkeleton,
  TransactionListTimeline,
} from '../_shared/components/TransactionListParts';

export type TransactionListChildActionProps = TransactionListBaseProps & {
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
  /**
   * Called once per click. Not called while `disabled` or `loading`.
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Class applied to the root element.
   */
  className?: string;
} & Omit<
    React.ComponentPropsWithoutRef<'button'>,
    'type' | 'onClick' | 'className' | 'disabled'
  >;

/**
 * Child row of an expanded transaction, linked by the timeline, with a chevron.
 * Use inside `TransactionListExpandable`. Figma: _Child Transaction List Action.
 *
 * `ref` and the remaining props go to the inner `<button>`; `className` goes to the root.
 */
const TransactionListChildAction = React.forwardRef<
  HTMLButtonElement,
  TransactionListChildActionProps
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
      onClick,
      className,
      ...rest
    },
    ref
  ) => (
    <div
      data-testid="transaction-list-child-action"
      className={classNames(
        'ods-transaction-list',
        'ods-transaction-list--child',
        'ods-transaction-list--action',
        `ods-transaction-list--${position}`,
        {
          'ods-transaction-list--disabled': disabled,
          'ods-transaction-list--loading': loading,
          'ods-transaction-list--compact': density === 'compact',
        },
        className
      )}
    >
      <button
        ref={ref}
        type="button"
        className="ods-transaction-list__main ods-transaction-list__main--interactive"
        onClick={disabled || loading ? undefined : onClick}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...rest}
      >
        <TransactionListTimeline
          position={position}
          icon={icon}
          iconColor={iconColor}
          disabled={disabled}
        />
        {loading ? (
          <TransactionListSkeleton showLeading={false} />
        ) : (
          <>
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
            <TransactionListChevron />
          </>
        )}
      </button>
    </div>
  )
);

TransactionListChildAction.displayName = 'TransactionListChildAction';

export default TransactionListChildAction;
