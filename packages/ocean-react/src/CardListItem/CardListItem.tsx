import React, { ComponentPropsWithoutRef, forwardRef } from 'react';
import classNames from 'classnames';

type CardListItemProps = {
  /*
   * The title of the card list item.
   */
  title: string;
  /*
   * The description of the card list item.
   */
  description?: string;
  /*
   * The caption of the card list item.
   */
  caption?: string;
  /*
   * The action icon of the card list item.
   */
  actionIcon?: React.ReactNode;
  /*
   * The leading icon of the card list item.
   */
  leadingIcon?: React.ReactNode;
  /*
   * The size of the card list item.
   */
  size?: 'small' | 'medium';
  /*
   * Whether the card list item is disabled.
   */
  disabled?: boolean;
  /*
   * Whether the card list item is full width.
   */
  fullWidth?: boolean;
  /*
   * The function to call when the card list item is clicked.
   */
  onClick?: () => void;
  /*
   * Whether the card list item is loading.
   */
  loading?: boolean;
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
      loading,
      ...rest
    },
    ref
  ): JSX.Element =>
    loading ? (
      <div
        ref={ref}
        {...rest}
        className={classNames(
          'ods-card-list-item',
          `ods-card-list-item--size-${size}`,
          { 'ods-card-list-item--full-width': fullWidth },
          {
            'ods-card-list-item--loading': loading,
          }
        )}
      >
        <div className="ods-card-list-item__circle" />
        <div className="ods-card-list-item__lines">
          <div className="ods-card-list-item__lines__line1" />
          <div className="ods-card-list-item__lines__line2" />
          {size === 'medium' && (
            <div className="ods-card-list-item__lines__line3" />
          )}
        </div>
      </div>
    ) : (
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
            <div className="ods-card-list-item__content__caption">
              {caption}
            </div>
          )}
        </div>
        {actionIcon && (
          <div className="ods-card-list-item__action">{actionIcon}</div>
        )}
      </div>
    )
);

CardListItem.displayName = 'CardListItem';

export default CardListItem;
