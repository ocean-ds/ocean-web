import React, { useState } from 'react';
import classNames from 'classnames';
import InternalListActions, {
  ActionItem,
} from '../_shared/components/InternalListActions';
import {
  TransactionListBaseProps,
  TransactionListChevron,
  TransactionListContent,
  TransactionListOmittedDomProps,
  TransactionListDivider,
  TransactionListIcon,
  TransactionListSkeleton,
} from '../_shared/components/TransactionListParts';

export type TransactionListActionProps = TransactionListBaseProps & {
  /**
   * Trailing action: `chevron` leads to a detail, `menu` opens a contextual
   * menu, `swipe` reveals the actions sideways (mobile pattern). Same behavior as
   * `ListAction`.
   * @default 'chevron'
   */
  actionType?: 'chevron' | 'menu' | 'swipe';
  /**
   * Actions of the `menu` and `swipe` types.
   */
  menuActions?: ActionItem[];
  /**
   * Position of the `menu` dropdown.
   * @default 'bottom-right'
   */
  menuPosition?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  /**
   * Accessible name of the overflow trigger (`menu` and `swipe`). Name the row when there
   * are several on screen, such as "Actions for Payment to supplier".
   * @default 'Open actions menu'
   */
  menuLabel?: string;
  /**
   * Shows the divider below the item (inset 16, multiply).
   * @default true
   */
  showDivider?: boolean;
  /**
   * Called once per click on the row. Not called while `disabled` or `loading`.
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Class applied to the root element.
   */
  className?: string;
} & Omit<
    React.ComponentPropsWithoutRef<'button'>,
    | 'type'
    | 'onClick'
    | 'className'
    | 'disabled'
    | TransactionListOmittedDomProps
  >;

/**
 * Transaction row with a trailing action: chevron (detail), contextual menu or swipe.
 * Hover highlight is Interface/Light/Up in multiply.
 *
 * `ref` and the remaining props go to the inner `<button>`; `className` goes to the root.
 */
const TransactionListAction = React.forwardRef<
  HTMLButtonElement,
  TransactionListActionProps
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
      actionType = 'chevron',
      menuActions = [],
      menuPosition = 'bottom-right',
      menuLabel = 'Open actions menu',
      showDivider = true,
      onClick,
      className,
      ...rest
    },
    ref
  ) => {
    const [isSwipeOpen, setIsSwipeOpen] = useState(false);
    const [menuWidth, setMenuWidth] = useState(0);
    const isChevron = actionType === 'chevron';

    const handleSwipeOpenChange = (isOpen: boolean, width?: number) => {
      setIsSwipeOpen(isOpen);
      if (width !== undefined) {
        setMenuWidth(width);
      }
    };

    const main = (
      <button
        ref={ref}
        type="button"
        className="ods-transaction-list__main ods-transaction-list__main--interactive"
        style={
          isSwipeOpen && menuWidth > 0
            ? { transform: `translateX(-${menuWidth}px)` }
            : undefined
        }
        onClick={disabled || loading ? undefined : onClick}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        // While loading the button only holds the skeleton: give it a name (axe button-name).
        aria-label={loading ? 'Carregando' : undefined}
        {...rest}
      >
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
            {isChevron && <TransactionListChevron />}
          </>
        )}
      </button>
    );

    return (
      <div
        data-testid="transaction-list-action"
        className={classNames(
          'ods-transaction-list',
          'ods-transaction-list--action',
          `ods-transaction-list--${actionType}`,
          {
            'ods-transaction-list--disabled': disabled,
            'ods-transaction-list--loading': loading,
            'ods-transaction-list--compact': density === 'compact',
            'ods-transaction-list--swipe-open': isSwipeOpen,
          },
          className
        )}
      >
        {isChevron ? (
          main
        ) : (
          <div className="ods-transaction-list__row">
            {main}
            {!loading && (
              <div className="ods-transaction-list__actions">
                <InternalListActions
                  actions={menuActions}
                  actionType={actionType}
                  disabled={disabled}
                  position={menuPosition}
                  triggerLabel={menuLabel}
                  onOpenChange={
                    actionType === 'swipe' ? handleSwipeOpenChange : undefined
                  }
                />
              </div>
            )}
          </div>
        )}
        {showDivider && <TransactionListDivider />}
      </div>
    );
  }
);

TransactionListAction.displayName = 'TransactionListAction';

export default TransactionListAction;
