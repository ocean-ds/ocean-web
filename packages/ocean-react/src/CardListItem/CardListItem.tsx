import React, { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';
import classNames from 'classnames';

export type CardListItemProps = {
  /**
   * Determines the list item title.
   */
  title: string;
  /**
   * Determines the list item description.
   */
  description?: string;
  /**
   * Determines the list item caption.
   */
  caption?: string;
  /**
   * Determines the list item action icon.
   */
  actionIcon?: ReactNode;
  /**
   * Determines the list item leading icon.
   */
  leadingIcon?: ReactNode;
  /**
   * Determines the list item size (small | medium).
   */
  size?: 'small' | 'medium';
  /**
   * Determines if the list item is disabled.
   */
  disabled?: boolean;
  /**
   * Determines if the list item is full width.
   */
  fullWidth?: boolean;
  /**
   * Handles the click event of the list item.
   */
  onClick?: () => void;
} & ComponentPropsWithoutRef<'div'>;

const CardListItem = forwardRef<HTMLDivElement, CardListItemProps>(
  (
    {
      title,
      description,
      caption,
      leadingIcon,
      actionIcon,
      size = 'medium',
      disabled = false,
      fullWidth = false,
      onClick,
      ...rest
    },
    ref
  ) => {
    const click = () => {
      if (!disabled && onClick) onClick();
    };

    return (
      <div
        ref={ref}
        {...rest}
        data-testid="card-list-item"
        className={classNames(
          'ods-card-list-item',
          `ods-card-list-item--size-${size}`,
          { 'ods-card-list-item--disabled': disabled },
          { 'ods-card-list-item--full-width': fullWidth }
        )}
        onClick={click}
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
            <div className="ods-card-list-item__content__caption">
              {caption}
            </div>
          )}
        </div>

        {actionIcon && (
          <div className="ods-card-list-item__action">{actionIcon}</div>
        )}
      </div>
    );
  }
);

CardListItem.displayName = 'CardListItem';

export default CardListItem;
