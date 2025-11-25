import React, { ReactElement, ReactNode } from 'react';
import classNames from 'classnames';
import { ChevronRight } from '@useblu/ocean-icons-react';
import ContentList, {
  ContentListProps,
} from '../_shared/components/ContentList';
import SkeletonBar from '../_shared/components/SkeletonBar';
import InternalListActions, { ActionItem } from '../InternalListActions';

export type CardListActionProps = {
  title: string;
  description?: string;
  strikethroughDescription?: string;
  caption?: string;
  inverted?: boolean;
  type?: ContentListProps['type'];
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  indicator?: ReactNode;
  actionType?: 'chevron' | 'menu' | 'swipe';
  menuActions?: ActionItem[];
  menuPosition?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  onClick?: () => void;
  className?: string;
};

const CardListAction = ({
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
}: CardListActionProps): ReactElement => {
  const renderActionIcon = () => {
    if (actionType === 'chevron') {
      return (
        <div className="ods-card-list-action__action">
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
        type='button'
        className={classNames('ods-card-list-action', 'ods-card-list-action--loading', className)}
      >
        <div className="ods-card-list-action__skeleton">
          <SkeletonBar width="100%" height="24px" />
          <SkeletonBar width="80%" height="20px" />
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={classNames('ods-card-list-action', className, {
        'ods-card-list-action--disabled': disabled,
        'ods-card-list-action--swipe-mode': actionType === 'swipe',
      })}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {icon && <div className="ods-card-list-action__icon">{icon}</div>}
      <ContentList
        title={title}
        description={description}
        strikethroughDescription={strikethroughDescription}
        caption={caption}
        inverted={inverted}
        type={type}
      />
      <div className="ods-card-list-action__trailing">
        {indicator && <div className="ods-card-list-action__indicator">{indicator}</div>}
        {renderActionIcon()}
      </div>
    </button>
  );
};

export default CardListAction;

