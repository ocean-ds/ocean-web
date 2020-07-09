import React from 'react';
import classNames from 'classnames';

export type ButtonProps = {
  /**
   * The content of the component.
   */
  children: React.ReactNode;
  /**
   * The CSS class name of the wrapper element.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<'span'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, className, ...rest },
  ref
) {
  return (
    <button ref={ref} className={classNames(`ods-button`, className)} {...rest}>
      {children}
    </button>
  );
});

export default Button;
