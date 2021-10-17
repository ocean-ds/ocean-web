import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Carousel, { CarouselProps } from '../Carousel';
import CarouselPagination from '../CarouselPagination';
import BannerExample from '../examples/BannerExample';

const setup = (
  props: CarouselProps = {
    columns: 1,
    children: (
      <>
        <div> Carousel Item </div>
        <div> Carousel Item </div>
        <div> Carousel Item </div>
        <div> Carousel Item </div>
      </>
    ),
  }
) => render(<Carousel {...props} />);

test('renders default element properly', () => {
  setup();

  expect(document.querySelector('.ods-carousel-main-container'))
    .toMatchInlineSnapshot(`
    <div
      class="ods-carousel-main-container"
    >
      <div
        class="ods-carousel-children-container"
      >
        <div
          class="ods-carousel-item-columns ods-carousel-item-columns--1"
        >
          <div>
             Carousel Item 
          </div>
          <div>
             Carousel Item 
          </div>
          <div>
             Carousel Item 
          </div>
          <div>
             Carousel Item 
          </div>
        </div>
      </div>
    </div>
  `);
});

test('renders 5 elements per page', () => {
  setup({ columns: 5 });

  expect(document.querySelector('.ods-carousel-main-container'))
    .toMatchInlineSnapshot(`
    <div
      class="ods-carousel-main-container"
    >
      <div
        class="ods-carousel-children-container"
      />
    </div>
  `);
});

test('render example', () => {
  render(<BannerExample />);

  expect(screen.queryByText('Click me!')).toBeInTheDocument();
});

test('move from page to page - via CarouselPagination', () => {
  render(
    <Carousel columns={1}>
      <div> Carousel Item </div>
      <div> Carousel Item </div>
      <div> Carousel Item </div>
      <div> Carousel Item </div>
      <CarouselPagination
        quantButtons={4}
        activePage={0}
        onChangePage={jest.fn()}
      />
    </Carousel>
  );

  const pageList = document.querySelectorAll('.ods-carousel-page');
  expect(pageList[0]).toBeInTheDocument();

  fireEvent.click(pageList[0]);
  fireEvent.click(pageList[1]);
  fireEvent.click(pageList[0]);
  fireEvent.click(pageList[3]);
  fireEvent.click(pageList[0]);
});