import React, { ReactNode } from 'react';
import { ChevronRight } from '@useblu/ocean-icons-react';
import classNames from 'classnames';

export type BreadcrumbProps = {
  /**
   * Determines the items of Breadcrumbs
   */
  items: Array<ReactNode | string>;
} & React.ComponentPropsWithoutRef<'div'>;

const Breadcrumb = React.forwardRef<HTMLDivElement, BreadcrumbProps>(
  function Breadcrumb({ items, className, ...rest }, ref) {
    return (
      <div
        className={classNames('ods-breadcrumb', className)}
        ref={ref}
        {...rest}
      >
        {items
          ?.map((item) => item)
          .reduce((prev, curr) => [
            prev,
            <ChevronRight width={12} height={12} />,
            curr,
          ])}
      </div>
    );
  }
);

export default Breadcrumb;
