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
      autoplay: boolean;
      autoplaySpeed: number;
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
          autoplay: {props.infinite.toString()}
          autoplaySpeed: {props.autoplaySpeed}
          speed: {props.speed}
          slidesToShow : {props.slidesToShow}
          slidesToScroll : {props.slidesToScroll}
          prevArrow : {props.prevArrow}
          nextArrow: {props.nextArrow}
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
    infinite: true,
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
  class="ods-carousel columns-1"
>
  <div>
    dots: 
    true
    infinite: 
    true
    autoplay: 
    true
    autoplaySpeed: 
    8000
    speed: 
    1500
    slidesToShow : 
    1
    slidesToScroll : 
    1
    prevArrow : 
    mock-chevron-left
    nextArrow: 
    mock-chevron-right
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
    <div
      class="ods-carousel-dots"
    >
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

test('renders the container properly - false case', async () => {
  const setupFalse = (props?: CarouselProps) => {
    return render(
      <Carousel {...props}>
        <div>item1</div>
      </Carousel>
    );
  };

  setupFalse();

  expect(document.querySelector('.ods-carousel')).toBeInTheDocument();
});
