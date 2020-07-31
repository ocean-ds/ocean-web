import React from 'react';
import classNames from 'classnames';

import './styles/typography.scss';

export const defaultTypesMapping: Record<string, string> = {
  heading1: 'h1',
  heading2: 'h2',
  heading3: 'h3',
  heading4: 'h4',
  subtitle1: 'h6',
  subtitle2: 'h6',
  paragraph: 'p',
  description: 'p',
};

export type Variant =
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'subtitle1'
  | 'subtitle2'
  | 'paragraph'
  | 'description';

export type TypographyProps = {
  /**
   * Applies the theme typography styles.
   */
  variant: Variant;
  /**
   * The content of the component.
   */
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'span'>;

const Typography = React.forwardRef<unknown, TypographyProps>(
  function Typography({ children, variant, className, ...rest }, ref) {
    const Component = defaultTypesMapping[variant] as React.ElementType;

    return (
      <Component
        ref={ref}
        className={classNames(
          `ods-typography ods-typography__${variant}`,
          className
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

export default Typography;
