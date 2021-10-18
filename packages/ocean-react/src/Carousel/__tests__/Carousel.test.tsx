import React from 'react';
import { render, screen } from '@testing-library/react';
import '../../setupTest.mock';
import Carousel, { CarouselProps } from '../Carousel';

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

test('first thing first', () => {
  setup();

  expect(document.querySelector('.ods-carousel')).toBeInTheDocument();
});

test('dots-list rendered', () => {
  setup();

  expect(screen.getByTestId('dots-list')).toBeInTheDocument();
});

// test('renders default element properly', () => {
//   setup();

//   expect(document.querySelector('.ods-carousel')).toMatchInlineSnapshot(`
//   <div class="show-grid">
//     <div class="ods-carousel">
//         <div
//           class="slick-slider slick-initialized"
//         >
//           <svg class="slick-arrow slick-prev" />
//           <div class="slick-list">
//             <div class="slick-track">
//               <div class="slick-slide"/>
//               <div class="slick-slide"/>
//               <div class="slick-slide"/>
//               <div class="slick-slide"/>
//             </div>
//           </div>
//           <svg class="slick-arrow slick-next" />
//           <div class="slick-dots"/>
//         </div>
//       </div>
//     </div>
//   </div>
//   `);
// });

// test('renders 5 elements per page', () => {
//   setup({ columns: 5 });

//   expect(document.querySelector('.ods-carousel-main-container'))
//     .toMatchInlineSnapshot(`
//     <div
//       class="ods-carousel-main-container"
//     >
//       <div
//         class="ods-carousel-children-container"
//       />
//     </div>
//   `);
// });

// test('render example', () => {
//   render(<BannerExample />);

//   expect(screen.queryByText('Click me!')).toBeInTheDocument();
// });

// test('move from page to page - via CarouselPagination', () => {
//   render(
//     <Carousel columns={1}>
//       <div> Carousel Item </div>
//       <div> Carousel Item </div>
//       <div> Carousel Item </div>
//       <div> Carousel Item </div>
//       <CarouselPagination
//         quantButtons={4}
//         activePage={0}
//         onChangePage={jest.fn()}
//       />
//     </Carousel>
//   );

//   const pageList = document.querySelectorAll('.ods-carousel-page');
//   expect(pageList[0]).toBeInTheDocument();

//   fireEvent.click(pageList[0]);
//   fireEvent.click(pageList[1]);
//   fireEvent.click(pageList[0]);
//   fireEvent.click(pageList[3]);
//   fireEvent.click(pageList[0]);
// });
