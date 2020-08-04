import React from 'react';
import classNames from 'classnames';

import { MergeElementProps } from '../_util/type';

import './styles/button.scss';

type ButtonProps<P extends React.ElementType = 'button'> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   * @default 'button'
   */
  component?: P;
} & MergeElementProps<
  P,
  {
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
  }
>;

function ButtonBase<T extends React.ElementType = 'button'>(
  {
    children,
    className,
    size = 'md',
    variant = 'primary',
    fullWidth = false,
    component,
    ...rest
  }: ButtonProps<T>,
  ref: React.Ref<HTMLButtonElement>
) {
  return React.createElement(
    component || 'button',
    {
      ref,
      className: classNames(
        'ods-btn',
        `ods-btn--${size}`,
        `ods-btn--${variant}`,
        fullWidth && 'ods-btn--full-width',
        className
      ),
      ...rest,
    },
    children
  );
}

const Button = (React.forwardRef(ButtonBase) as unknown) as typeof ButtonBase;

export default Button;
