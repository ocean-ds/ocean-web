/* eslint-disable testing-library/no-container */
import React from 'react';
import { render, screen } from '@testing-library/react';

import FormControl, { FormControlProps } from '../FormControl';

const setup = (props?: Omit<FormControlProps, 'children'>) =>
  render(
    <FormControl {...props}>
      <span>Hi</span>
    </FormControl>
  );

test('renders element properly', () => {
  const { container } = setup();

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="ods-form-control__root"
    >
      <div
        class="ods-form-control__element"
      >
        <span>
          Hi
        </span>
      </div>
    </div>
  `);
});

test('renders a helper text', () => {
  setup({ helperText: 'Just a small info.' });
  expect(screen.getByText('Just a small info.')).toHaveClass(
    'ods-form-control__helper-text',
    { exact: true }
  );
});

test('renders a error state', () => {
  setup({
    error: true,
    helperText: 'Error message.',
  });

  expect(screen.getByText('Error message.')).toHaveClass(
    'ods-form-control__helper-text ods-form-control__helper-text--error',
    { exact: true }
  );
});

test('renders a disabled state', () => {
  setup({
    disabled: true,
    label: 'Label Test',
    helperText: 'Error message.',
  });

  expect(screen.getByText('Error message.')).toHaveClass(
    'ods-form-control__helper-text ods-form-control__helper-text--disabled',
    { exact: true }
  );
});

test('renders a Hello World tooltip', () => {
  setup({
    tooltipMessage: 'Hello World!',
  });

  expect(document.querySelector('.ods-form-control__root'))
    .toMatchInlineSnapshot(`
    <div
      class="ods-form-control__root"
    >
      <div
        class="ods-form-control__header"
      >
        <div
          aria-label="Hello World!"
          class="ods-form-control__icon ods-tooltip"
          data-tooltip-pos="up-left"
        >
          <svg
            color="#B6B9CC"
            fill="currentColor"
            height="16"
            viewBox="0 0 20 20"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              fill-rule="evenodd"
            />
          </svg>
           
        </div>
      </div>
      <div
        class="ods-form-control__element"
      >
        <span>
          Hi
        </span>
      </div>
    </div>
  `);
});
