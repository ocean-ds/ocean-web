import React from 'react';
import classNames from 'classnames';

export type SubHeaderProps = {
  /**
   * Determines a subtitle for the header positioned
   * in right side of the element.
   * @default undefined
   */
  subtitle?: string | React.ReactElement;
  /**
   * Determines an icon for the header positioned
   * in left side of the element.
   * @default undefined
   */
  icon?: React.ReactNode;
  /**
   * Determines the size of the header.
   * @default 'medium'
   */
  size?: 'small' | 'medium';
} & React.ComponentPropsWithoutRef<'div'>;

const SubHeader = React.forwardRef<HTMLDivElement, SubHeaderProps>(
  ({ children, subtitle, icon, className, size = 'medium', ...rest }, ref) => (
    <div
      ref={ref}
      className={classNames('ods-sub-header', className, {
        [`ods-sub-header--${size}`]: size,
      })}
      {...rest}
    >
      <div className="ods-sub-header__title">
        {icon && <div className="ods-sub-header__icon">{icon}</div>}
        {children}
      </div>
      {subtitle && <div className="ods-sub-header__subtitle">{subtitle}</div>}
    </div>
  )
);

SubHeader.displayName = 'SubHeader';

export default SubHeader;
