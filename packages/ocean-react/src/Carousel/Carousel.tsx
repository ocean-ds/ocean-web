import React from 'react';
import classNames from 'classnames';

export type CarouselProps = {
  maxPerSection: 1 | 2 | 3 | 4 | 5;
} & React.ComponentPropsWithoutRef<'div'>;

// const Carousel = React.forwardRef<HTMLDivElement, ListProps>(function OceanList(
//   { children, className, ...rest },
//   ref
// ) {
//   return (
//     <div ref={ref} className={classNames('ods-list', className)} {...rest}>
//       {children}
//     </div>
//   );
// });

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  function Carousel({ maxPerSection = 1 }) {
    return (
      <>
        <div className={classNames('ods-carousel-container')}>
          {Array.from({ length: maxPerSection }, (_, i) => i + 1).map(
            (item) => (
              <div
                key={`item-number${item}`}
                className={classNames(
                  'ods-carousel-item',
                  `ods-carousel-item--${maxPerSection}`
                )}
              >
                Item {item}
              </div>
            )
          )}
        </div>
        <div className={classNames('ods-carousel-pagination-container')}>
          <div className={classNames('ods-carousel-page')}></div>
          <div className={classNames('ods-carousel-page')}></div>
          <div className={classNames('ods-carousel-page')}></div>
          <div className={classNames('ods-carousel-page')}></div>
        </div>
      </>
    );
  }
);

export default Carousel;
