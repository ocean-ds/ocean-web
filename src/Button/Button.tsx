import React from 'react';
import classNames from 'classnames';

import './styles/button.scss';
import { MergeProps } from '../_util/type';

/**
 * Utility type
 */

export type ButtonProps<P extends React.ElementType = 'button'> = {
  component?: P;
} & MergeProps<
  P,
  {
    children: React.ReactNode;

    className?: string;

    variant?: 'contained' | 'text' | 'blocked';

    color?: 'primary' | 'secondary' | 'inverse';

    size?: 'sm' | 'md' | 'lg';
  }
>;

function ButtonBase<T extends React.ElementType = 'button'>(
  {
    children,
    className,
    type = 'button',
    variant = 'contained',
    color = 'primary',
    size = 'md',
    ...rest
  }: ButtonProps<T>,
  ref: React.Ref<HTMLButtonElement>
) {
  return React.createElement(
    rest.component || 'button',
    {
      ref,
      className: classNames(
        `ods-button ods-button-${variant} ods-button-${color} ods-button-${size}`,
        className
      ),
      type,
      ...rest,
    },
    children
  );
}

const Button = (React.forwardRef(ButtonBase) as unknown) as typeof ButtonBase;

export default Button;
