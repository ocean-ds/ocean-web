import React from 'react';
import { render, screen } from '@testing-library/react';

import Breadcrumb from '../Breadcrumb';

test('renders element', () => {
  render(
    <Breadcrumb
      data-testid="breadcrumb-test"
      className="custom-class"
      items={[<span>item 1</span>, <span>item 2</span>]}
    />
  );

  expect(screen.getByTestId('breadcrumb-test')).toMatchInlineSnapshot(`
    <div
       class="ods-breadcrumb custom-class"
       data-testid="breadcrumb-test"
     >
       <span>
         item 1
       </span>
       <svg
         fill="currentColor"
         height="12"
         viewBox="0 0 20 20"
         width="12"
         xmlns="http://www.w3.org/2000/svg"
       >
         <path
           clip-rule="evenodd"
           d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
           fill-rule="evenodd"
         />
       </svg>
       <span>
         item 2
       </span>
    </div>   
    `);
});
