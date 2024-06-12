import React from 'react';
import classNames from 'classnames';

import TagIcon from './TagIcon';

export type BaseTagProps = {
  /**
   * Sets the size of the Tag.
   */
  size?: 'small' | 'medium';
  /**
   * Sets a custom icon for the Tag.
   */
  icon?: React.ReactElement;
  /**
   * Set icon off.
   */
  setIconOff?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

type DefaultType = {
  variant?: 'default';
  /**
   * Determines the type of Tag, with default icon and colors for each type
   */
  type?:
    | 'positive'
    | 'warning'
    | 'negative'
    | 'neutral'
    | 'neutral-02'
    | 'neutral-03'
    | 'default';
} & BaseTagProps;

type HighlightType = {
  variant: 'highlight';
  type: 'important' | 'neutral';
} & BaseTagProps;

export type TagProps = DefaultType | HighlightType;

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  (
    {
      children,
      variant = 'default',
      type = 'default',
      size = 'medium',
      className,
      icon,
      setIconOff = false,
      ...rest
    },
    ref
  ) => {
    const hasIcon =
      (type === 'positive' ||
        type === 'warning' ||
        type === 'negative' ||
        icon) &&
      !setIconOff;

    const isHighlight = variant === 'highlight';

    return (
      <div
        ref={ref}
        role="Tag"
        className={classNames(
          'ods-tag',
          `ods-tag--${size}`,
          hasIcon && `ods-tag--${size}__with-icon`,
          isHighlight ? `ods-tag--${variant}__${type}` : `ods-tag--${type}`,
          className
        )}
        {...rest}
      >
        {!setIconOff && <TagIcon type={type} icon={icon} />}
        <div className="ods-tag__content">{children}</div>
      </div>
    );
  }
);

Tag.displayName = 'Tag';

export default Tag;
