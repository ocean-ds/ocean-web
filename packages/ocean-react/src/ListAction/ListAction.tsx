import React, { ReactNode, useState } from 'react';
import classNames from 'classnames';
import { ChevronRight } from '@useblu/ocean-icons-react';
import ContentList, {
  ContentListProps,
} from '../_shared/components/ContentList';
import SkeletonBar from '../_shared/components/SkeletonBar';
import InternalListActions, {
  ActionItem,
} from '../_shared/components/InternalListActions';
import AmountDetails, {
  AmountDetailsProps,
} from '../_shared/components/AmountDetails';

export type ListActionProps = {
  /**
   * The title of the card list action.
   */
  title: string;
  /**
   * The description or secondary text of the card list action.
   */
  description?: string;
  /**
   * Description with strikethrough text.
   */
  strikethroughDescription?: string;
  /**
   * Caption or tertiary text of the card list action.
   */
  caption?: string;
  /**
   * Inverts the position of title and description.
   * @default false
   */
  inverted?: boolean;
  /**
   * The type of the border.
   * @default 'card'
   */
  type?: 'card' | 'text';
  /**
   * The status type of the card content.
   * @default 'default'
   */
  status?: ContentListProps['type'];
  /**
   * If true, the card list action will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If true, shows a loading state with skeleton.
   * @default false
   */
  loading?: boolean;
  /**
   * Icon displayed at the beginning of the card.
   */
  icon?: ReactNode;
  /**
   * Indicator/badge displayed before the action icon.
   */
  indicator?: ReactNode;
  /**
   * The type of action displayed on the card.
   * @default 'chevron'
   */
  actionType?: 'chevron' | 'menu' | 'swipe';
  /**
   * List of actions for 'menu' and 'swipe' types.
   */
  menuActions?: ActionItem[];
  /**
   * Position of the dropdown menu.
   * @default 'bottom-right'
   */
  menuPosition?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  /**
   * Callback function when the card is clicked.
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * If true, shows a divider between the cards when type is 'text'.
   * @default false
   */
  showDivider?: boolean;
  /**
   * Amount details displayed alongside the content list (right-aligned).
   */
  amountDetails?: AmountDetailsProps;
  /**
   * Optional position (timeline) with lines around the icon. When set, the icon is wrapped with
   * vertical lines: first = line below only, middle = line above and below, last = line above only.
   */
  position?: 'first' | 'middle' | 'last';
} & Omit<React.ComponentPropsWithoutRef<'button'>, 'type'>;

const ListAction = React.forwardRef<HTMLButtonElement, ListActionProps>(
  (
    {
      title,
      description,
      strikethroughDescription,
      caption,
      inverted = false,
      type = 'card',
      status = 'default',
      disabled = false,
      loading = false,
      icon,
      indicator,
      actionType = 'chevron',
      menuActions,
      menuPosition = 'bottom-right',
      onClick,
      className,
      showDivider = false,
      amountDetails,
      position,
      ...rest
    }: ListActionProps,
    ref
  ) => {
    const [isSwipeOpen, setIsSwipeOpen] = useState(false);
    const [menuWidth, setMenuWidth] = useState(0);

    const handleSwipeOpenChange = (isOpen: boolean, width?: number) => {
      setIsSwipeOpen(isOpen);
      if (width !== undefined) {
        setMenuWidth(width);
      }
    };

    const renderActionIcon = () => {
      if (actionType === 'chevron') {
        return (
          <div className="ods-list-action__action">
            <ChevronRight size={20} />
          </div>
        );
      }

      if (actionType === 'menu' || actionType === 'swipe') {
        return (
          <InternalListActions
            actions={menuActions || []}
            disabled={disabled}
            position={menuPosition}
            actionType={actionType}
            onOpenChange={
              actionType === 'swipe' ? handleSwipeOpenChange : undefined
            }
          />
        );
      }

      return null;
    };

    const renderLoadingContent = () => (
      <div className="ods-list-action__skeleton">
        <SkeletonBar width="40%" height="16px" />
        <SkeletonBar width="100%" height="16px" />
      </div>
    );

    const contentStyle: React.CSSProperties =
      isSwipeOpen && menuWidth > 0
        ? { transform: `translateX(-${menuWidth}px)` }
        : {};

    const showLeading = position && icon;
    const showLineAbove = position === 'middle' || position === 'last';
    const showLineBelow = position === 'first' || position === 'middle';

    const renderContent = () => (
      <>
        <div className="ods-list-action__content" style={contentStyle}>
          {showLeading ? (
            <div className="ods-list-action__position">
              <div
                className={classNames('ods-list-action__position-line', {
                  'ods-list-action__position-line--visible': showLineAbove,
                })}
              />
              <div
                className={classNames('ods-list-action__icon', {
                  'ods-list-action__icon--inactive': status === 'inactive',
                })}
              >
                {icon}
              </div>
              <div
                className={classNames('ods-list-action__position-line', {
                  'ods-list-action__position-line--visible': showLineBelow,
                })}
              />
            </div>
          ) : (
            icon && (
              <div
                className={classNames('ods-list-action__icon', {
                  'ods-list-action__icon--inactive': status === 'inactive',
                })}
              >
                {icon}
              </div>
            )
          )}
          <ContentList
            title={title}
            description={description}
            strikethroughDescription={strikethroughDescription}
            caption={caption}
            inverted={inverted}
            type={status}
          />
          {amountDetails && <AmountDetails type={status} {...amountDetails} />}
          {indicator && (
            <div className="ods-list-action__indicator">{indicator}</div>
          )}
        </div>
        {renderActionIcon()}
      </>
    );

    const buttonClassName = classNames('ods-list-action', className, {
      'ods-list-action--loading': loading,
      'ods-list-action--disabled': disabled,
      'ods-list-action--swipe-mode': actionType === 'swipe',
      'ods-list-action--swipe-open': isSwipeOpen,
      [`ods-list-action--${type}`]: type,
    });

    return (
      <div className="ods-list-action__container">
        <button
          ref={ref}
          type="button"
          data-testid="list-action"
          className={buttonClassName}
          onClick={loading ? undefined : onClick}
          disabled={disabled || loading}
          {...rest}
        >
          {loading ? renderLoadingContent() : renderContent()}
        </button>
        {showDivider && type === 'text' && (
          <div className="ods-list-action__divider" />
        )}
      </div>
    );
  }
);

ListAction.displayName = 'ListAction';

export default ListAction;
