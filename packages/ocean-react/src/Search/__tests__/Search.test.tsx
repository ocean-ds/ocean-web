import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import Search from '../Search';

test('renders element properly', () => {
  const { container } = render(
    <Search data-testid="input-test" className="custom-class" />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="ods-form-control__root"
    >
      <div
        class="ods-form-control__element"
      >
        <div
          class="ods-search custom-class"
        >
          <div
            class="ods-search__adornment"
          >
            <svg
              fill="currentColor"
              height="24"
              viewBox="0 0 20 20"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM2 8a6 6 0 1 1 10.89 3.476l4.817 4.817a1 1 0 0 1-1.414 1.414l-4.816-4.816A6 6 0 0 1 2 8z"
                fill-rule="evenodd"
              />
            </svg>
          </div>
          <input
            data-testid="input-test"
            type="text"
            value=""
          />
        </div>
      </div>
    </div>
  `);
  expect(screen.getByTestId('input-test')).toHaveAttribute('type', 'text');
});

test('renders a disabled state for the input', () => {
  render(<Search data-testid="input-test" disabled />);

  expect(screen.getByTestId('input-test').parentElement).toHaveClass(
    'ods-search ods-search--disabled',
    { exact: true }
  );
});

test('renders a value state for input', () => {
  render(<Search data-testid="input-test" defaultValue="Test test" />);

  expect(screen.getByTestId('close').parentElement).toBeInTheDocument();

  fireEvent.change(screen.getByTestId('input-test'), {
    target: { value: '' },
  });

  expect(screen.queryByTestId('close')).not.toBeInTheDocument();
});

test('renders a function clean for input', () => {
  render(<Search data-testid="input-test" defaultValue="Test test" />);

  expect(screen.getByTestId('close').parentElement).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('close'));

  expect(screen.queryByTestId('close')).not.toBeInTheDocument();
});
