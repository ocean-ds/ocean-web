import React from 'react';
import classNames from 'classnames';

export type CarouselPaginationProps = {
  activePage: number;
  quantButtons: number;
  onChangePage: (page: number) => void;
} & React.ComponentPropsWithoutRef<'div'>;

const CarouselPagination = React.forwardRef<
  HTMLDivElement,
  CarouselPaginationProps
>(function CarouselPagination({ activePage, quantButtons, onChangePage }) {
  return (
    <div className={classNames('ods-carousel-pagination-container')}>
      {Array.from(Array(quantButtons).keys()).map((page) => (
        <div
          onClick={() => {
            onChangePage(page);
          }}
          key={`pageButton${page}`}
          className={classNames('ods-carousel-page', {
            'ods-carousel-page-active': activePage === page,
          })}
        ></div>
      ))}
    </div>
  );
});

export default CarouselPagination;
