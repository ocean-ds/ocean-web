import React from 'react';
import { render } from '@testing-library/react';

import Carousel, { CarouselProps } from '../Carousel';

jest.mock('@useblu/ocean-icons-react', () => ({
  ChevronLeft: () => 'mock-chevron-left',
  ChevronRight: () => 'mock-chevron-right',
}));

jest.mock(
  'react-slick',
  () =>
    function Slider(props: {
      children: HTMLElement;
      appendDots: (dots: React.ReactElement[]) => HTMLLIElement;
      dots: boolean;
      infinite: boolean;
      speed: number;
      slidesToShow: number;
      slidesToScroll: number;
      prevArrow: React.ReactElement;
      nextArrow: React.ReactElement;
      responsive: {
        breakpoint: number;
        settings: {
          slidesToShow: number;
          slidesToScroll: number;
        };
      }[];
    }) {
      return (
        <div>
          dots: {props.dots.toString()}
          infinite: {props.infinite.toString()}
          speed : {props.speed}
          slidesToShow : {props.slidesToShow}
          slidesToScroll : {props.slidesToScroll}
          prevArrow : {props.prevArrow}
          nextArrow: {props.nextArrow}
          breakpoint: {props.responsive[0].breakpoint}
          slidesToShow: {props.responsive[0].settings.slidesToShow}
          slidesToScroll: {props.responsive[0].settings.slidesToScroll}
          {props.children}
          {props.appendDots([
            <div key={1}>teste 1</div>,
            <div key={2}>teste 2</div>,
          ])}
        </div>
      );
    }
);

const setup = (
  props: CarouselProps = {
    columns: undefined,
    children: (
      <>
        <div> Carousel Item </div>
        <div> Carousel Item </div>
        <div> Carousel Item </div>
        <div> Carousel Item </div>
      </>
    ),
  }
) => {
  return render(<Carousel {...props} />);
};

test('renders the container properly', async () => {
  setup();

  expect(document.querySelector('.ods-carousel')).toBeInTheDocument();
  expect(document.querySelector('.ods-carousel')).toMatchInlineSnapshot(`
<div
  class="ods-carousel"
>
  <div>
    dots: 
    true
    infinite: 
    false
    speed : 
    500
    slidesToShow : 
    1
    slidesToScroll : 
    1
    prevArrow : 
    mock-chevron-left
    nextArrow: 
    mock-chevron-right
    breakpoint: 
    768
    slidesToShow: 
    1
    slidesToScroll: 
    1
    <div>
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
    <div>
      <ul
        data-testid="ods-ul-dots"
      >
         
        <div>
          teste 1
        </div>
         
      </ul>
      <ul
        data-testid="ods-ul-dots"
      >
         
        <div>
          teste 2
        </div>
         
      </ul>
    </div>
  </div>
</div>
`);
});
