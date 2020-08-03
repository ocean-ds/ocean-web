import React from 'react';
import classNames from 'classnames';

import './styles/button.scss';

type ButtonProps = {
  /**
   * The variant to use.
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'ghost' | 'inverse';
  /**
   * The size of the button.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
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
    variant = 'primary',
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
        `ods-btn--${variant}`,
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
