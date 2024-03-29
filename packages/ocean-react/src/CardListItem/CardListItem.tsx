import React from 'react';
import classNames from 'classnames';

interface CardListItemProps {
  title: string;
  description?: string;
  caption?: string;
  actionIcon?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  size?: 'small' | 'medium';
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}

const CardListItem = ({
  title,
  description,
  caption,
  leadingIcon,
  actionIcon,
  size = 'medium',
  disabled = false,
  fullWidth = false,
  onClick,
}: CardListItemProps): JSX.Element => (
  <div
    data-testid="card-list-item"
    className={classNames(
      'ods-card-list-item',
      `ods-card-list-item--size-${size}`,
      { 'ods-card-list-item--disabled': disabled },
      { 'ods-card-list-item--full-width': fullWidth }
    )}
    onClick={() => {
      if (!disabled && onClick) onClick();
    }}
  >
    {leadingIcon && (
      <div className="ods-card-list-item__leading-icon">{leadingIcon}</div>
    )}
    <div className="ods-card-list-item__content">
      <div className="ods-card-list-item__content__title">{title}</div>
      {description && (
        <div className="ods-card-list-item__content__description">
          {description}
        </div>
      )}
      {caption && size === 'medium' && (
        <div className="ods-card-list-item__content__caption">{caption}</div>
      )}
    </div>
    {actionIcon && (
      <div className="ods-card-list-item__action">{actionIcon}</div>
    )}
  </div>
);

export default CardListItem;
