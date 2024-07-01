import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Accordion, { AccordionProps } from '../Accordion';

const setUp = (props: AccordionProps) => {
  render(<Accordion {...props} />);
};

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders element properly', () => {
  setUp({ title: 'Title', description: 'Description' });

  expect(document.querySelector('.ods-accordion')).toMatchInlineSnapshot(`
    <div
      class="ods-accordion"
    >
      <button
        aria-expanded="false"
        class="ods-accordion__header ods-accordion__header--collapsed"
        data-testid="accordion-header"
        type="button"
      >
        Title
        <svg
          class="ods-accordion__icon ods-accordion__icon--rotated"
          fill="currentColor"
          height="24"
          viewBox="0 0 20 20"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            fill-rule="evenodd"
          />
        </svg>
      </button>
      <div
        class="ods-accordion__content ods-accordion__content--collapsed"
      >
        <p
          class="ods-accordion__description"
        >
          Description
        </p>
      </div>
    </div>
  `);
});

test('render element opened', () => {
  setUp({ title: 'Title', description: 'Description' });

  const button = screen.getByTestId('accordion-header');

  fireEvent.click(button);

  expect(document.querySelector('.ods-accordion')).toMatchInlineSnapshot(`
    <div
      class="ods-accordion"
    >
      <button
        aria-expanded="true"
        class="ods-accordion__header"
        data-testid="accordion-header"
        type="button"
      >
        Title
        <svg
          class="ods-accordion__icon"
          fill="currentColor"
          height="24"
          viewBox="0 0 20 20"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            fill-rule="evenodd"
          />
        </svg>
      </button>
      <div
        class="ods-accordion__content"
      >
        <p
          class="ods-accordion__description"
        >
          Description
        </p>
      </div>
    </div>
  `);
});
