import React from 'react';
import classNames from 'classnames';

import { MergeElementProps } from '../_util/type';
import Progress from '../Progress';

type DeprecatedVariant = 'text' | 'textCritical';

type Variant =
  | 'primary'
  | 'primaryCritical'
  | 'secondary'
  | 'secondaryCritical'
  | 'tertiary'
  | 'tertiaryCritical'
  | 'textTertiary'
  | 'textTertiaryCritical'
  | 'inverse'
  | DeprecatedVariant;

type ButtonVariant = Exclude<Variant, DeprecatedVariant>;

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
    variant?: ButtonVariant;
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
    /**
     * Sent a loading state changing the content of the button.
     * @default false
     */
    loading?: boolean;
  }
>;

function ButtonBase<T extends React.ElementType = 'button'>(
  {
    children,
    className,
    size = 'md',
    variant = 'primary',
    blocked = false,
    loading = false,
    component,
    ...rest
  }: ButtonProps<T>,
  ref: React.Ref<HTMLButtonElement>
) {
  // Warn about deprecated variants
  React.useEffect(() => {
    // @ts-expect-error - This is a deprecated variant
    if (variant === 'text') {
      console.warn(
        'Ocean Design System: The "text" variant is deprecated. Please use "tertiary" instead.'
      );
      // @ts-expect-error - This is a deprecated variant
    } else if (variant === 'textCritical') {
      console.warn(
        'Ocean Design System: The "textCritical" variant is deprecated. Please use "tertiaryCritical" instead.'
      );
    }
  }, [variant]);

  const onColor = ['primary', 'primaryCritical', 'inverse'].includes(variant);

  return React.createElement(
    component || 'button',
    {
      ref,
      className: classNames(
        'ods-btn',
        `ods-btn--${size}`,
        `ods-btn--${variant.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`,
        blocked && 'ods-btn--blocked',
        className,
        { 'ods-btn--loading': loading }
      ),
      ...rest,
      onClick: loading ? () => false : rest.onClick,
    },
    loading ? (
      <>
        <Progress size={size} onColor={onColor} />
        <span>{children}</span>
      </>
    ) : (
      children
    )
  );
}

const Button = React.forwardRef(ButtonBase) as unknown as typeof ButtonBase;

export default Button;
