import React from 'react';
import classNames from 'classnames';

export type BadgeProps = {
  /**
   * Determines the type of Badge, with default icon and colors for each type
   * @default 'small'
   */
  variation?: 'tiny' | 'small' | 'medium';
  /**
   * Determines the type of Badge colors scheam.
   */
  color?: 'brand' | 'complementary' | 'alert' | 'neutral';
  /**
   * Determines the number of that badge should display
   */
  count?: number;
} & React.ComponentPropsWithoutRef<'div'>;

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(function Badge(
  { children, variation = 'small', className, count, color, ...rest },
  ref
) {
  const countToShow = count && count > 99 ? `99+` : count;

  return (
    <div
      ref={ref}
      role="tag"
      className={classNames(
        'ods-badge',
        `ods-badge--${variation}`,
        `ods-badge--${color}`,
        className,
        {
          'ods-badge--overflow': count && count > 99,
        }
      )}
      {...rest}
    >
      {variation !== 'tiny' && count && (
        <div className="ods-badge__content ods-badge__count">{countToShow}</div>
      )}

      {variation !== 'tiny' && typeof count === 'undefined' && children && (
        <div className="ods-badge__content ods-badge__text">{children}</div>
      )}

      {variation === 'tiny' && <div className="ods-badge__content"></div>}
    </div>
  );
});

export default Badge;
