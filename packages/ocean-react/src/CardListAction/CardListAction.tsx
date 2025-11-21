import React, { ReactElement, ReactNode } from 'react';
import classNames from 'classnames';
import { ChevronRight } from '@useblu/ocean-icons-react';
import CardListContent, {
  CardListContentProps,
} from '../_shared/components/CardListContent';
import Tag from '../Tag/Tag';
import SkeletonBar from '../_shared/components/SkeletonBar';
import InternalListActions, { ActionItem } from '../InternalListActions';

export type CardListActionProps = {
  title: string;
  description?: string;
  strikethroughDescription?: string;
  caption?: string;
  inverted?: boolean;
  type?: CardListContentProps['type'];
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  tag?: { label: string } & (
    | { variant?: 'default'; type?: 'positive' | 'warning' | 'negative' | 'neutral' | 'neutral-02' | 'neutral-03' | 'default' }
    | { variant: 'highlight'; type: 'important' | 'neutral' }
  );
  actionType?: 'chevron' | 'menu' | 'swipe' | 'none';
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
  tag,
  actionType = 'chevron',
  menuActions,
  menuPosition = 'bottom-right',
  onClick,
  className,
}: CardListActionProps): ReactElement => {
  const renderActionIcon = () => {
    if (actionType === 'none') return null;

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

    // Placeholder para swipe (implementar depois)
    return null;
  };

  if (loading) {
    return (
      <div
        className={classNames('ods-card-list-action', 'ods-card-list-action--loading', className)}
      >
        {icon && <div className="ods-card-list-action__icon">{icon}</div>}
        <div className="ods-card-list-action__skeleton">
          <SkeletonBar width="100%" height="24px" />
          <SkeletonBar width="80%" height="20px" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={classNames('ods-card-list-action', className, {
        'ods-card-list-action--disabled': disabled,
        'ods-card-list-action--swipe-mode': actionType === 'swipe',
      })}
      onClick={disabled ? undefined : onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
    >
      {icon && <div className="ods-card-list-action__icon">{icon}</div>}
      <CardListContent
        title={title}
        description={description}
        strikethroughDescription={strikethroughDescription}
        caption={caption}
        inverted={inverted}
        type={type}
      />
      <div className="ods-card-list-action__trailing">
        {tag && <Tag size="medium" {...tag} setIconOff>{tag.label}</Tag>}
        {renderActionIcon()}
      </div>
    </div>
  );
};

export default CardListAction;

