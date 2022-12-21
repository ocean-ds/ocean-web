import React, { ReactNode, ComponentPropsWithoutRef, forwardRef } from 'react';
import { ChevronRight } from '@useblu/ocean-icons-react';
import classNames from 'classnames';

export type BreadcrumbProps = {
  /**
   * Determines the items of Breadcrumbs
   */
  items: Array<ReactNode | string>;
} & ComponentPropsWithoutRef<'div'>;

const Breadcrumb = forwardRef<HTMLDivElement, BreadcrumbProps>(
  function Breadcrumb({ items, className, ...rest }, ref) {
    return (
      <div
        className={classNames('ods-breadcrumb', className)}
        ref={ref}
        {...rest}
      >
        {items?.map((item, index) => {
          const showIcon = index !== items.length - 1 && (
            <ChevronRight size={12} />
          );

          return typeof item === 'string' ? (
            <>
              <span>{item}</span> {showIcon}
            </>
          ) : (
            <>
              {item} {showIcon}
            </>
          );
        })}
      </div>
    );
  }
);

export default Breadcrumb;
