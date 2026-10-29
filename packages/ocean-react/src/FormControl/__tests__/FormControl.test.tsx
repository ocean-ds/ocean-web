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

test('CT-3: a group has a single associated error outside its radio cards', () => {
  render(
    <FormControl
      role="radiogroup"
      aria-label="Parcelas"
      aria-describedby="group-error"
      aria-invalid
      error
      helperText="Escolha uma opção."
      helperTextId="group-error"
      helperTextRole="alert"
    >
      <div data-testid="cards">
        <input
          type="radio"
          id="option-six"
          name="installments"
          aria-label="6x"
          aria-describedby="group-error"
        />
        <input
          type="radio"
          id="option-three"
          name="installments"
          aria-label="3x"
          aria-describedby="group-error"
        />
      </div>
    </FormControl>
  );
  const group = screen.getByRole('radiogroup', { name: 'Parcelas' });
  expect(group).toHaveClass('ods-form-control__root--group');
  expect(group).toHaveAttribute('aria-invalid', 'true');
  expect(group).toHaveAccessibleDescription('Escolha uma opção.');
  expect(screen.getAllByRole('radio')).toHaveLength(2);
  screen.getAllByRole('radio').forEach((radio) => {
    expect(radio).toHaveAccessibleDescription('Escolha uma opção.');
    expect(radio).toHaveAttribute('name', 'installments');
  });
  expect(screen.getByRole('alert').parentElement).toBe(group);
  expect(screen.getByTestId('cards')).not.toContainElement(
    screen.getByRole('alert')
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
              d="M17.391 6.939a7.999 7.999 0 1 1-14.78 6.122 7.999 7.999 0 0 1 14.78-6.122zM11 13.333a1 1 0 1 1-2 0V10a1 1 0 0 1 2 0v3.333zm-1-5.666a1 1 0 1 1 0-2h.008a1 1 0 1 1 0 2H10z"
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
