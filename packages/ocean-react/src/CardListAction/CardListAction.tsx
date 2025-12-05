import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { ChevronRight } from '@useblu/ocean-icons-react';
import ContentList, {
  ContentListProps,
} from '../_shared/components/ContentList';
import SkeletonBar from '../_shared/components/SkeletonBar';
import InternalListActions, { ActionItem } from '../_shared/components/InternalListActions';

export type CardListActionProps = {
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
   * The style type of the card content.
   * @default 'default'
   */
  type?: ContentListProps['type'];
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
} & Omit<React.ComponentPropsWithoutRef<'button'>, 'type'>;

const CardListAction = React.forwardRef<HTMLButtonElement, CardListActionProps>(
  (
    {
      title,
      description,
      strikethroughDescription,
      caption,
      inverted = false,
      type = 'default',
      disabled = false,
      loading = false,
      icon,
      indicator,
      actionType = 'chevron',
      menuActions,
      menuPosition = 'bottom-right',
      onClick,
      className,
      ...rest
    },
    ref
  ) => {
    const renderActionIcon = () => {
      if (actionType === 'chevron') {
        return (
          <div className='ods-card-list-action__action'>
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

    if (loading) {
      return (
        <button
          ref={ref}
          type='button'
          data-testid='card-list-action'
          className={classNames(
            'ods-card-list-action',
            'ods-card-list-action--loading',
            className
          )}
          {...rest}
        >
          <div className='ods-card-list-action__skeleton'>
            <SkeletonBar width='40%' height='16px' />
            <SkeletonBar width='100%' height='16px' />
          </div >
        </button >
      );
    }

    return (
      <button
        ref={ref}
        type='button'
        data-testid='card-list-action'
        className={classNames('ods-card-list-action', className, {
          'ods-card-list-action--disabled': disabled,
          'ods-card-list-action--swipe-mode': actionType === 'swipe',
        })}
        onClick={onClick}
        disabled={disabled}
        {...rest}
      >
        {icon && <div className={classNames('ods-card-list-action__icon', {
          'ods-card-list-action__icon--inactive': type === 'inactive',
        })}>{icon}</div>}
        <ContentList
          title={title}
          description={description}
          strikethroughDescription={strikethroughDescription}
          caption={caption}
          inverted={inverted}
          type={type}
        />
        <div className='ods-card-list-action__trailing'>
          {indicator && (
            <div className='ods-card-list-action__indicator'>{indicator}</div>
          )}
          {renderActionIcon()}
        </div>
      </button >
    );
  }
);

CardListAction.displayName = 'CardListAction';

export default CardListAction;

