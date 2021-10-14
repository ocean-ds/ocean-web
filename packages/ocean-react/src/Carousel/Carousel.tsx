import React, { Children, useRef, useState } from 'react';
import { useMedia } from 'react-use';
import classNames from 'classnames';
import CarouselPagination from './CarouselPagination';
import { ChevronLeft, ChevronRight } from '@useblu/ocean-icons-react';

export type CarouselProps = {
  /**
   * Determines the number o columns in the carousel.
   * @default '1'
   */
  columns?: 1 | 2 | 3 | 4 | 5 | undefined;
} & React.ComponentPropsWithoutRef<'div'>;

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  function Carousel({ columns = 1, children }, ref) {
    const carousel = useRef<HTMLDivElement>(null);
    const [activePage, setActivePage] = useState(0);
    const isMobile = useMedia('(max-width: 768px)');

    const quantButtons = isMobile
      ? 1 * Children.toArray(children).length
      : Math.ceil((1 / columns) * Children.toArray(children).length);

    const scrollTo = (
      element: React.RefObject<HTMLDivElement>,
      direction: string,
      steps = 1
    ) => {
      if (element.current === null) return;

      const amount = (element.current.clientWidth + 16) * steps;

      element.current.scrollLeft += direction === 'left' ? amount * -1 : amount;
    };

    const handlePrevious = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      scrollTo(carousel, 'left');
      setActivePage(activePage - 1);
    };

    const handleNext = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      scrollTo(carousel, 'right');
      setActivePage(activePage + 1);
    };

    const testFunc = (event) => {
      console.log('event', event);
      console.log('window.pageYOffset;', window.pageYOffset);
    };

    return (
      <div className="ods-carousel" ref={ref}>
        <div className="ods-carousel-main-container">
          {quantButtons > 1 && (
            <button
              onClick={handlePrevious}
              disabled={activePage === 0}
              data-testid="previous-page-button"
            >
              <ChevronLeft />
            </button>
          )}
          <div
            className="ods-carousel-children-container"
            onScroll={testFunc}
            ref={carousel}
          >
            {Children.toArray(children).map((child, index) => (
              <div
                key={index}
                className={classNames(
                  'ods-carousel-item-columns',
                  `ods-carousel-item-columns--${columns}`
                )}
              >
                {child}
              </div>
            ))}
          </div>
          {quantButtons > 1 && (
            <button
              onClick={handleNext}
              disabled={activePage === quantButtons - 1}
              data-testid="next-page-button"
            >
              <ChevronRight />
            </button>
          )}
        </div>
        {quantButtons > 1 && (
          <CarouselPagination
            quantButtons={quantButtons}
            activePage={activePage}
            onChangePage={(page: number) => {
              const steps = Math.abs(page - activePage);
              const checkDirection = activePage > page ? 'left' : 'right';
              if (page !== activePage)
                scrollTo(carousel, checkDirection, steps);
              setActivePage(page);
            }}
          />
        )}
      </div>
    );
  }
);

export default Carousel;
