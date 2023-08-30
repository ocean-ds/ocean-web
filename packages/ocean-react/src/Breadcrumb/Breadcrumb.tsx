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
  ({ items, className, ...rest }, ref) => (
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
          <div key={`string-item-${item}`}>
            <span>{item}</span> {showIcon}
          </div>
        ) : (
          <div key={`tag-item-${index + 1}`}>
            {item} {showIcon}
          </div>
        );
      })}
    </div>
  )
);

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
