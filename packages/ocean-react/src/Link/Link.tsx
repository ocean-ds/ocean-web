import React from 'react';
import classNames from 'classnames';

import { MergeElementProps } from '../_util/type';

export type LinkProps<P extends React.ElementType = 'a'> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   * @default 'a'
   */
  component?: P;
} & MergeElementProps<
  P,
  {
    /**
     * Use the inverse link on dark backgrounds.
     * @default 'false'
     */
    inverse?: boolean;
  }
>;

function LinkBase<T extends React.ElementType = 'a'>(
  { children, className, inverse, component, ...rest }: LinkProps<T>,
  ref: React.Ref<HTMLLinkElement>
) {
  return React.createElement(
    component || 'a',
    {
      ref,
      className: classNames(
        'ods-lnk',
        inverse && 'ods-lnk--inverse',
        className
      ),
      ...rest,
    },
    children
  );
}

const Link = (React.forwardRef(LinkBase) as unknown) as typeof LinkBase;

export default Link;
