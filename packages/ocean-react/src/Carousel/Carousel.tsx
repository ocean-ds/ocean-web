import React, { Children, useRef, useState } from 'react';
import classNames from 'classnames';
import CarouselPagination from './CarouselPagination';
import { ChevronLeft, ChevronRight } from '@useblu/ocean-icons-react';

export type CarouselProps = {
  maxPerSection: 1 | 2 | 3 | 4 | 5;
  children: React.ReactElement;
} & React.ComponentPropsWithoutRef<'div'>;

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  function Carousel({ maxPerSection = 1, children }) {
    const carousel = useRef<HTMLDivElement>(null);
    const [activePage, setActivePage] = useState(0);

    const quantButtons = Math.ceil(
      (1 / maxPerSection) * Children.toArray(children).length
    );

    const scrollTo = (
      element: React.RefObject<HTMLDivElement>,
      direction: string,
      steps = 1
    ) => {
      if (element.current === null) return;

      const amount = (element.current.clientWidth + 16) * steps;
      console.log('amout', amount);

      element.current.scrollLeft += direction === 'left' ? amount * -1 : amount;
    };

    const handleLeftClick = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      scrollTo(carousel, 'left');
      setActivePage(activePage - 1);
    };

    const handleRightClick = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      scrollTo(carousel, 'right');
      setActivePage(activePage + 1);
    };

    return (
      <>
        <div className={classNames('ods-carousel-and-buttons')}>
          {quantButtons > 1 && (
            <button onClick={handleLeftClick} disabled={activePage === 0}>
              <ChevronLeft />
            </button>
          )}
          <div className={classNames('ods-carousel-container')} ref={carousel}>
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
          {quantButtons > 1 && (
            <button
              onClick={handleRightClick}
              disabled={activePage === quantButtons - 1}
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
      </>
    );
  }
);

export default Carousel;
