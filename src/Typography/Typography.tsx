import React from 'react';
import classNames from 'classnames';

import './styles/_typography.scss';

const defaultTypesMapping: Record<string, string> = {
  heading1: 'h1',
  heading2: 'h2',
  heading3: 'h3',
  heading4: 'h4',
  subtitle1: 'h6',
  subtitle2: 'h6',
  paragraph: 'p',
  description: 'p',
};

export type TypographyProps = {
  variant:
    | 'heading1'
    | 'heading2'
    | 'heading3'
    | 'heading4'
    | 'subtitle1'
    | 'subtitle2'
    | 'paragraph'
    | 'description';
  children: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<'span'>;

const Typography = React.forwardRef<unknown, TypographyProps>(
  function Typography({ variant, children, className, ...rest }, ref) {
    const Component = defaultTypesMapping[variant] as React.ElementType;

    return (
      <Component
        ref={ref}
        className={classNames(`typography typography__${variant}`, className)}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

export default Typography;
