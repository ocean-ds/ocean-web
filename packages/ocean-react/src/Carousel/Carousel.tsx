import React, { Children } from 'react';
import CarouselDotList from './CarouselDotList';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from '@useblu/ocean-icons-react';

export type CarouselProps = {
  /**
   * Determines the number o columns in the carousel.
   * @default '1'
   */
  columns?: 1 | 2 | 3 | 4 | 5 | null;
} & React.ComponentPropsWithoutRef<'div'>;

const Carousel: React.FC<CarouselProps> = ({ columns = 1, children }) => {
  const columnsAsNumber = Number(columns);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: columnsAsNumber,
    slidesToScroll: columnsAsNumber,
    prevArrow: <ChevronLeft />,
    nextArrow: <ChevronRight />,
    appendDots: (dots: React.ReactElement[]) => {
      console.log('Amigo estou aqui!');
      return CarouselDotList(dots);
    },
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
