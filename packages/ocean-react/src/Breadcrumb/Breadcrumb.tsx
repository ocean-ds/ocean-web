import React, { ReactNode, ComponentPropsWithoutRef, forwardRef } from 'react';
import { ChevronLeft, ChevronRight } from '@useblu/ocean-icons-react';
import { useMedia } from 'react-use';
import classNames from 'classnames';

export type BreadcrumbProps = {
  /**
   * Determines the items of Breadcrumbs
   */
  items: Array<ReactNode | string>;
} & ComponentPropsWithoutRef<'div'>;

const Breadcrumb = forwardRef<HTMLDivElement, BreadcrumbProps>(
  ({ items, className, ...rest }, ref) => {
    const isMobile = useMedia('(max-width: 576px)');

    const onHandleLastItem = () => {
      window.history.back();
    };

    return (
      <div
        className={classNames('ods-breadcrumb', className)}
        ref={ref}
        {...rest}
      >
        {items?.map((item, index) => {
          const isLast = index === items.length - 1;
          const showIcon = index !== items.length - 1 && (
            <ChevronRight size={12} />
          );

          if (isMobile && isLast) {
            return (
              <div
                onClick={onHandleLastItem}
                className="ods-breadcrumb__item"
                key={`tag-item-${index + 1}`}
              >
                <ChevronLeft size={12} />
                <span>{item}</span>
              </div>
            );
          }

          if (!isMobile) {
            return typeof item === 'string' ? (
              <div className="ods-breadcrumb__item" key={`string-item-${item}`}>
                <span>{item}</span> {showIcon}
              </div>
            ) : (
              <div
                className="ods-breadcrumb__item"
                key={`tag-item-${index + 1}`}
              >
                {item} {showIcon}
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
