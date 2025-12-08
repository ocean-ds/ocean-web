import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { ChevronRight } from '@useblu/ocean-icons-react';
import ContentList, {
  ContentListProps,
} from '../_shared/components/ContentList';
import SkeletonBar from '../_shared/components/SkeletonBar';
import InternalListActions, {
  ActionItem,
} from '../_shared/components/InternalListActions';

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
      ...rest
    },
    ref
  ) => {
    const renderActionIcon = () => {
      if (actionType === 'chevron') {
        return (
          <div className='ods-list-action__action'>
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
          />
        );
      }

      return null;
    };

    const renderLoadingContent = () => (
      <div className='ods-list-action__skeleton'>
        <SkeletonBar width='40%' height='16px' />
        <SkeletonBar width='100%' height='16px' />
      </div>
    );

    const renderContent = () => (
      <>
        {icon && (
          <div
            className={classNames('ods-list-action__icon', {
              'ods-list-action__icon--inactive': status === 'inactive',
            })}
          >
            {icon}
          </div>
        )}
        <ContentList
          title={title}
          description={description}
          strikethroughDescription={strikethroughDescription}
          caption={caption}
          inverted={inverted}
          type={status}
        />
        <div className='ods-list-action__trailing'>
          {indicator && (
            <div className='ods-list-action__indicator'>{indicator}</div>
          )}
          {renderActionIcon()}
        </div>
      </>
    );

    const buttonClassName = classNames('ods-list-action', className, {
      'ods-list-action--loading': loading,
      'ods-list-action--disabled': disabled,
      'ods-list-action--swipe-mode': actionType === 'swipe',
      [`ods-list-action--${type}`]: type,
    });

    return (
      <div className='ods-list-action__container'>
        <button
          ref={ref}
          type='button'
          data-testid='list-action'
          className={buttonClassName}
          onClick={loading ? undefined : onClick}
          disabled={disabled || loading}
          {...rest}
        >
          {loading ? renderLoadingContent() : renderContent()}
        </button>
        {showDivider && type === 'text' && (
          <div className='ods-list-action__divider' />
        )}
      </div>
    );
  }
);

ListAction.displayName = 'ListAction';

export default ListAction;

