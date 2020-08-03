import React from 'react';
import classNames from 'classnames';

import './styles/button.scss';

type ButtonProps = {
  /**
   * The variant to use.
   * @default 'contained'
   */
  variant?: 'contained' | 'text';
  /**
   * The size of the button.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * The color of the component.
   */
  color?: 'primary' | 'secondary';
  /**
   * If true, the button will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * If true, the button can be formatted to appear on dark backgrounds.
   * @default false
   */
  inverted?: boolean;
} & React.ComponentPropsWithoutRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className,
    variant = 'contained',
    size = 'md',
    color,
    fullWidth = false,
    inverted = false,
    ...rest
  },
  ref
) {
  return (
    <button
      ref={ref}
      className={classNames(
        'ods-btn',
        `ods-btn--${size}`,
        `ods-btn__${variant}`,
        {
          [`ods-btn__${variant}--${color}`]: color,
          [`ods-btn--full-width`]: fullWidth,
          [`ods-btn--inverted`]: inverted,
        },
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
