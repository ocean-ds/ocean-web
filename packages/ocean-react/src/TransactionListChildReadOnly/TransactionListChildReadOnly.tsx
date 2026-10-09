import React from 'react';
import classNames from 'classnames';
import {
  TransactionListBaseProps,
  TransactionListChildPosition,
  TransactionListContent,
  TransactionListOmittedDomProps,
  TransactionListSkeleton,
  TransactionListTimeline,
} from '../_shared/components/TransactionListParts';

export type TransactionListChildReadOnlyProps = TransactionListBaseProps & {
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
} & Omit<React.ComponentPropsWithoutRef<'div'>, TransactionListOmittedDomProps>;

/**
 * Read-only child row of an expanded transaction, linked by the timeline, without chevron.
 * Use inside `TransactionListExpandable`.
 */
const TransactionListChildReadOnly = React.forwardRef<
  HTMLDivElement,
  TransactionListChildReadOnlyProps
>(
  (
    {
      content,
      amount,
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
            content={content}
            amount={amount}
            defaultSize="sm"
            disabled={disabled}
          />
        )}
      </div>
    </div>
  )
);

TransactionListChildReadOnly.displayName = 'TransactionListChildReadOnly';

export default TransactionListChildReadOnly;
