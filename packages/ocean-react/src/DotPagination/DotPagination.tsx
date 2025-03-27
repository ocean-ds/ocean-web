/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import classNames from 'classnames';

export interface IDotPagination {
  items: number;
  activeItem: number;
}

const DotPagination: React.FunctionComponent<IDotPagination> = ({
  items,
  activeItem,
}) => {
  const [activeDot, setActiveDot] = React.useState<number>(activeItem);
  const validItems = Math.max(1, Math.floor(items));

  const handleDotClick = (index: number) => {
    setActiveDot(index);
  };

  useEffect(() => {
    setActiveDot(activeItem);
  }, [activeItem]);

  return (
    <div className="dot-pagination" data-testid={`dot-active-${activeDot}`}>
      {Array.from({ length: validItems }).map((_, index) => (
        <div
          key={index}
          className={classNames('dot-pagination__dot', {
            'dot-pagination__dot--active': activeDot === index,
          })}
          onClick={() => handleDotClick(index)}
          data-testid={`dot-${index}`}
          role="button"
          tabIndex={0}
          aria-label={`Dot ${index + 1} ${
            activeDot === index ? '(active)' : ''
          }`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleDotClick(index);
            }
          }}
        />
      ))}
    </div>
  );
};

export default DotPagination;
