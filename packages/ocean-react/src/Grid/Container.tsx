import React from 'react';
import classNames from 'classnames';

type ContainerProps = {
  /**
   * Allow the Container to fill all of its available horizontal space.
   * @default false
   */
  fluid?: boolean | 'sm' | 'md' | 'lg' | 'xl';
} & React.ComponentPropsWithoutRef<'div'>;

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, fluid = false, className, ...rest }, ref) => {
    const prefix = 'ods-container';
    const suffix = typeof fluid === 'string' ? `-${fluid}` : '-fluid';

    return (
      <div
        ref={ref}
        className={classNames(fluid ? `${prefix}${suffix}` : prefix, className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

export default Container;
