import React from 'react';

export type CarouselDotListProps = {
  dots?: React.ReactElement[] | undefined;
};

const CarouselDotList: React.FC<CarouselDotListProps> = ({
  dots,
}: CarouselDotListProps) => (
  <div className="ods-carousel-dots">
    {dots &&
      dots.map((dot) => (
        <ul key={dot.key} data-testid="ods-ul-dots">
          {' '}
          {dot}{' '}
        </ul>
      ))}
  </div>
);

export default CarouselDotList;
