import React from 'react';
import classNames from 'classnames';
import {
  TransactionListBaseProps,
  TransactionListChevron,
  TransactionListContent,
  TransactionListDivider,
  TransactionListIcon,
  TransactionListSkeleton,
} from '../_shared/components/TransactionListParts';

export type TransactionListActionProps = TransactionListBaseProps & {
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
 * Transaction row that leads to a detail: chevron on the right, hover highlight
 * (Interface/Light/Up in multiply). Figma: Transaction List Action (Type=Chevron).
 *
 * `ref` and the remaining props go to the inner `<button>`; `className` goes to the root.
 */
const TransactionListAction = React.forwardRef<
  HTMLButtonElement,
  TransactionListActionProps
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
      disabled = false,
      loading = false,
      showDivider = true,
      onClick,
      className,
      ...rest
    },
    ref
  ) => (
    <div
      data-testid="transaction-list-action"
      className={classNames(
        'ods-transaction-list',
        'ods-transaction-list--action',
        {
          'ods-transaction-list--disabled': disabled,
          'ods-transaction-list--loading': loading,
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
        {loading ? (
          <TransactionListSkeleton showLeading={Boolean(icon)} />
        ) : (
          <>
            {icon && <TransactionListIcon icon={icon} disabled={disabled} />}
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
      {showDivider && <TransactionListDivider />}
    </div>
  )
);

TransactionListAction.displayName = 'TransactionListAction';

export default TransactionListAction;
