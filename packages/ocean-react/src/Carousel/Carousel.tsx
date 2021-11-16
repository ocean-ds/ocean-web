import React, { Children } from 'react';
import CarouselDotList from './CarouselDotList';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from '@useblu/ocean-icons-react';

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
} & React.ComponentPropsWithoutRef<'div'>;

const Carousel: React.FC<CarouselProps> = ({
  columns = 1,
  infinite = false,
  children,
}) => {
  const columnsAsNumber = Number(columns);

  const appendDots = (dots?: React.ReactElement[] | undefined) => (
    <CarouselDotList dots={dots} />
  );

  const settings = {
    dots: true,
    infinite,
    speed: 500,
    slidesToShow: columnsAsNumber,
    slidesToScroll: columnsAsNumber,
    prevArrow: <ChevronLeft />,
    nextArrow: <ChevronRight />,
    appendDots,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="ods-carousel">
      <Slider {...settings}>
        {Children.toArray(children).map((child, index) => (
          <div key={index}>{child}</div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
