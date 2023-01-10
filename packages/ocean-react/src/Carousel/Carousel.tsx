/* eslint react/no-array-index-key: 0 */

import React, { Children } from 'react';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from '@useblu/ocean-icons-react';
import classNames from 'classnames';
import CarouselDotList from './CarouselDotList';

export type CarouselProps = {
  /**
   * Determines the number of columns in the carousel.
   * @default '1'
   */
  columns?: 1 | 2 | 3 | 4 | 5 | null;
  /**
   * Determines if the component can scroll infinitely or not.
   * @default 'false'
   */
  infinite?: boolean;
  autoplay?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

const Carousel: React.FC<CarouselProps> = ({
  columns = 1,
  infinite = false,
  autoplay = false,
  children,
}) => {
  const columnsAsNumber = Number(columns);

  const appendDots = (dots?: React.ReactElement[] | undefined) => (
    <CarouselDotList dots={dots} />
  );

  const settings = {
    dots: true,
    infinite,
    speed: 1500,
    slidesToShow: columnsAsNumber,
    slidesToScroll: columnsAsNumber,
    prevArrow: <ChevronLeft />,
    nextArrow: <ChevronRight />,
    appendDots,
    autoplay,
    autoplaySpeed: 8000,
  };

  return (
    <div className={classNames('ods-carousel', `columns-${columnsAsNumber}`)}>
      <Slider {...settings}>
        {Children.toArray(children).map((child, index) => (
          <div key={index}>{child}</div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
