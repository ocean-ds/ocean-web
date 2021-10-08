import React from 'react';
import { render } from '@testing-library/react';
import Carousel, { CarouselProps } from '../Carousel';

const setup = (
  props: CarouselProps = { maxPerPage: 1, children: <div> Carousel Item </div> }
) => render(<Carousel {...props} />);

test('renders default element properly', () => {
  setup();

  expect(document.querySelector('.ods-carousel-and-buttons'))
    .toMatchInlineSnapshot(`
    <div
      class="ods-carousel-and-buttons"
    >
      <div
        class="ods-carousel-container"
      >
        <div
          class="ods-carousel-item-maxPerPage ods-carousel-item-maxPerPage--1"
        >
          <div>
             Carousel Item 
          </div>
        </div>
      </div>
    </div>
  `);
});

test('renders 5 elements per page', () => {
  setup({ maxPerPage: 5 });

  expect(document.querySelector('.ods-carousel-and-buttons'))
    .toMatchInlineSnapshot(`
    <div
      class="ods-carousel-and-buttons"
    >
      <div
        class="ods-carousel-container"
      />
    </div>
  `);
});
