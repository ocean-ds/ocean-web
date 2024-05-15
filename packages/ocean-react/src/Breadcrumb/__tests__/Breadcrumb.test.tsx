import React from 'react';
import { render, screen } from '@testing-library/react';

import Breadcrumb from '../Breadcrumb';

window.matchMedia = jest.fn().mockImplementation((query) => ({
  matches: query === '(max-width: 576px)',
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

test('renders breadcrumb with array elements', () => {
  render(
    <Breadcrumb
      data-testid="breadcrumb-test"
      className="custom-class"
      key="test23"
      items={[
        <span key="element-1">item 1</span>,
        <span key="element-2">item 2</span>,
      ]}
    />
  );

  expect(screen.getByTestId('breadcrumb-test')).toMatchInlineSnapshot(`
    <div
      class="ods-breadcrumb custom-class"
      data-testid="breadcrumb-test"
    >
      <div
        class="ods-breadcrumb__item"
      >
        <svg
          fill="currentColor"
          height="12"
          viewBox="0 0 20 20"
          width="12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            fill-rule="evenodd"
          />
        </svg>
        <span>
          <span>
            item 2
          </span>
        </span>
      </div>
    </div>
  `);
});

test('renders breadcrumb with array string', () => {
  render(
    <Breadcrumb
      data-testid="breadcrumb-test"
      className="custom-class"
      key="test23"
      items={['item 1', 'item 2', 'item 3']}
    />
  );

  expect(screen.getByTestId('breadcrumb-test')).toMatchInlineSnapshot(`
    <div
      class="ods-breadcrumb custom-class"
      data-testid="breadcrumb-test"
    >
      <div
        class="ods-breadcrumb__item"
      >
        <svg
          fill="currentColor"
          height="12"
          viewBox="0 0 20 20"
          width="12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            fill-rule="evenodd"
          />
        </svg>
        <span>
          item 3
        </span>
      </div>
    </div>
  `);
});
