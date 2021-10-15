import React, { Children } from 'react';
import { useMedia } from 'react-use';
import classNames from 'classnames';
// import CarouselPagination from './CarouselPagination';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import { ChevronLeft, ChevronRight } from '@useblu/ocean-icons-react';

export type CarouselProps = {
  /**
   * Determines the number o columns in the carousel.
   * @default '1'
   */
  columns?: 1 | 2 | 3 | 4 | 5 | null;
} & React.ComponentPropsWithoutRef<'div'>;

const Carousel: React.FC<CarouselProps> = ({ columns = 1, children }) => {
  const isMobile = useMedia('(max-width: 768px)');
  const columnsAsNumber = Number(columns);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: isMobile ? 1 : columnsAsNumber,
    slidesToScroll: isMobile ? 1 : columnsAsNumber,
    className: '',
  };

  return (
    <div>
      <h2>Single Item</h2>
      <Slider {...settings}>
        {Children.toArray(children).map((child, index) => (
          <div
            className={classNames('child-container', {
              'first-child-container': index === 0,
            })}
            key={index}
          >
            {child}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
