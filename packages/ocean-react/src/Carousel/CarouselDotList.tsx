import React from 'react';

function CarouselDotList(dots: React.ReactElement[]) {
  return (
    <div>
      {dots.map((dot) => (
        <ul key={dot.key} data-testid="ods-ul-dots">
          {' '}
          {dot}{' '}
        </ul>
      ))}
    </div>
  );
}

export default CarouselDotList;
