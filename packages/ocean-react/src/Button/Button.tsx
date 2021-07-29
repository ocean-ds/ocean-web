import React from 'react';
import classNames from 'classnames';

import { MergeElementProps } from '../_util/type';

export type ButtonProps<P extends React.ElementType = 'button'> = {
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
    variant?: 'primary' | 'secondary' | 'text' | 'inverse' | 'primaryCritical';
    /**
     * The size of the button.
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Spans the full width of the Button parent.
     * @default false
     */
    blocked?: boolean;
  }
>;

function ButtonBase<T extends React.ElementType = 'button'>(
  {
    children,
    className,
    size = 'md',
    variant = 'primary',
    blocked = false,
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
        `ods-btn--${variant.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())}`,
        blocked && 'ods-btn--blocked',
        className
      ),
      ...rest,
    },
    children
  );
}

const Button = React.forwardRef(ButtonBase) as unknown as typeof ButtonBase;

export default Button;
