import React from 'react';
import classNames from 'classnames';

type ContainerProps = {
  /**
   * Allow the Container to fill all of its available horizontal space.
   * @default false
   */
  fluid?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  function Container({ children, fluid = false, className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={classNames(
          `ods-container${fluid ? '-fluid' : ''}`,
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default Container;
