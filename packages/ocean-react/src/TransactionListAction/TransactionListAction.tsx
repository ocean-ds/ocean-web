import React, { useState } from 'react';
import classNames from 'classnames';
import InternalListActions, {
  ActionItem,
} from '../_shared/components/InternalListActions';
import {
  TransactionListBaseProps,
  TransactionListChevron,
  TransactionListContent,
  splitContentProps,
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
   * Trailing action (Figma `Type`): `chevron` leads to a detail, `menu` opens a contextual
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
    'type' | 'onClick' | 'className' | 'disabled'
  >;

/**
 * Transaction row with a trailing action: chevron (detail), contextual menu or swipe.
 * Hover highlight is Interface/Light/Up in multiply. Figma: Transaction List Action.
 *
 * `ref` and the remaining props go to the inner `<button>`; `className` goes to the root.
 */
const TransactionListAction = React.forwardRef<
  HTMLButtonElement,
  TransactionListActionProps
>(
  (
    {
      contentSize = 'md',
      amountSize = 'md',
      icon,
      iconColor = 'default',
      disabled = false,
      loading = false,
      density = 'default',
      actionType = 'chevron',
      menuActions = [],
      menuPosition = 'bottom-right',
      showDivider = true,
      onClick,
      className,
      ...props
    },
    ref
  ) => {
    const [content, rest] = splitContentProps(props);
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
              {...content}
              contentSize={contentSize}
              amountSize={amountSize}
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
