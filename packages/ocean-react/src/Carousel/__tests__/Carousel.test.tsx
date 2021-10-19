import React from 'react';
import { render, waitFor } from '@testing-library/react';
// import { mocked } from 'ts-jest/utils';
import '../../setupTest.mock';
import Carousel, { CarouselProps } from '../Carousel';
// import CarouselDotsList from '../CarouselDotList';

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
) => render(<Carousel {...props} />);

test('renders the container properly', async () => {
  setup();

  await waitFor(() => {
    expect(document.querySelector('.slick-dots')).toBeInTheDocument();
    expect(document.querySelector('.ods-carousel')).toBeInTheDocument();
    expect(document.querySelector('.ods-carousel')).toMatchInlineSnapshot(`
   <div
     class="ods-carousel"
   >
     <div
       class="slick-slider slick-initialized"
     >
       
       <div
         class="slick-list"
       >
         <div
           class="slick-track"
           style="opacity: 1; transform: translate3d(0px, 0px, 0px);"
         >
           <div
             aria-hidden="false"
             class="slick-slide slick-active slick-current"
             data-index="0"
             style="outline: none; width: 0px;"
             tabindex="-1"
           >
             <div>
               <div
                 style="width: 100%; display: inline-block;"
                 tabindex="-1"
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
         </div>
       </div>
       
       
     </div>
   </div>
  `);
  });
});

// test('renders a dot list pagination component', () => {
//   const CarouselDotListMock = mocked(CarouselDotList);

//   const div = React.createElement('div', 'Some text');
//   render(CarouselDotListMock([div]));

//   expect(screen.getByTestId('ods-ul-dots')).toBeInTheDocument();
// });
