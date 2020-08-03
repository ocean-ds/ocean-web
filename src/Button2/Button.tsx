import React from 'react';
import classNames from 'classnames';

import './styles/button.scss';

type ButtonProps = {
  /**
   * The size of the button.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * The color of the component.
   */
  color?: 'primary' | 'secondary' | 'ghost' | 'inverse';
  /**
   * If true, the button will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
} & React.ComponentPropsWithoutRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className,
    size = 'md',
    color = 'primary',
    fullWidth = false,
    ...rest
  },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={classNames(
        'ods-btn',
        `ods-btn--${size}`,
        `ods-btn--${color}`,
        fullWidth && 'ods-btn--full-width',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
