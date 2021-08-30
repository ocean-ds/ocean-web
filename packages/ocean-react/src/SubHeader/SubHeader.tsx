import React from 'react';
import classNames from 'classnames';

export type SubHeaderProps = {
  /**
   * Determines the type of Tag, with default icon and colors for each type
   * @default undefined
   */
  subtitle?: string | React.ReactElement;
} & React.ComponentPropsWithoutRef<'div'>;

const SubHeader = React.forwardRef<HTMLDivElement, SubHeaderProps>(function Tag(
  { children, subtitle, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={classNames('ods-sub-header', className)}
      {...rest}
    >
      <div className="ods-sub-header__title">{children}</div>
      {subtitle && <div className="ods-sub-header__subtitle">{subtitle}</div>}
    </div>
  );
});

export default SubHeader;
