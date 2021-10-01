import React, { Children, useRef } from 'react';
import classNames from 'classnames';
import { ChevronLeft, ChevronRight } from '@useblu/ocean-icons-react';

export type CarouselProps = {
  maxPerSection: '1' | '2' | '3' | '4' | '5';
  children: React.ReactElement;
} & React.ComponentPropsWithoutRef<'div'>;

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  function Carousel({ maxPerSection = 1, children }) {
    const count = Children.count(children);
    const carousel = useRef(null);

    const refPixels = {
      '1': 1282,
      '2': 633,
      '3': 416,
      '4': 308,
      '5': 243,
    };

    const handleLeftClick = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      carousel.current.scrollLeft = Math.ceil(
        (carousel.current.scrollLeft -= 1298)
      );
    };

    const handleRightClick = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      carousel.current.scrollLeft = Math.ceil(
        (carousel.current.scrollLeft += 1298)
      );
    };

    return (
      <>
        <div className={classNames('ods-carousel-and-buttons')}>
          <button onClick={handleLeftClick}>
            <ChevronLeft />
          </button>
          <div className={classNames('ods-carousel-container')} ref={carousel}>
            {/* {count} */}
            {Children.toArray(children).map((child, index) => (
              <div
                key={index}
                className={classNames(
                  'ods-carousel-item-maxPerSection',
                  `ods-carousel-item-maxPerSection--${maxPerSection}`
                )}
              >
                {child}
              </div>
            ))}
          </div>
          <button onClick={handleRightClick}>
            <ChevronRight />
          </button>
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
