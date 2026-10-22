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
   * Sets the visual appearance of the Tag.
   */
  appearance?: 'default';
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
    | 'complementary'
    | 'default';
} & BaseTagProps;

type HighlightType = {
  variant: 'highlight';
  type: 'important' | 'neutral';
} & BaseTagProps;

type TranslucentType = {
  variant?: 'default';
  /**
   * Sets the visual appearance of the Tag.
   */
  appearance: 'translucent';
  size?: 'medium';
  setIconOff?: false;
} & (
  | {
      type: 'positive' | 'warning' | 'negative';
      icon?: React.ReactElement;
    }
  | {
      type: 'neutral' | 'neutral-02' | 'complementary';
      icon: React.ReactElement;
    }
) &
  Omit<BaseTagProps, 'size' | 'icon' | 'setIconOff'>;

export type TagProps = DefaultType | HighlightType | TranslucentType;

const Tag = React.forwardRef<HTMLDivElement, TagProps>((tagProps, ref) => {
  const {
    children,
    variant = 'default',
    type = 'default',
    appearance = 'default',
    size = 'medium',
    className,
    icon,
    setIconOff = false,
    ...rest
  } = tagProps as TagProps & {
    appearance?: 'default' | 'translucent';
  };

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
      className={classNames(
        'ods-tag',
        `ods-tag--${size}`,
        hasIcon && `ods-tag--${size}__with-icon`,
        isHighlight ? `ods-tag--${variant}__${type}` : `ods-tag--${type}`,
        appearance === 'translucent' && 'ods-tag--translucent',
        className
      )}
      {...rest}
    >
      {!setIconOff && <TagIcon type={type} icon={icon} />}
      <div className="ods-tag__content">{children}</div>
    </div>
  );
});

Tag.displayName = 'Tag';

export default Tag;
