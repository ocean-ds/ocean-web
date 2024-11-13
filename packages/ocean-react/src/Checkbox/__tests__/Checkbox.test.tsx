import React from 'react';
import { render, screen } from '@testing-library/react';

import Checkbox from '../Checkbox';

test('renders element properly', () => {
  const { container } = render(
    <Checkbox data-testid="checkbox-test" className="custom-class" />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="ods-checkbox__root-container"
    >
      <label
        class="ods-checkbox__root"
      >
        <input
          class="ods-checkbox custom-class"
          data-testid="checkbox-test"
          type="checkbox"
        />
        <span
          class="ods-checkbox__checkmark"
        />
      </label>
    </div>
  `);

  expect(screen.getByTestId('checkbox-test')).toHaveAttribute(
    'type',
    'checkbox'
  );
});

test('renders a label for the checkbox', () => {
  render(<Checkbox label="My label" />);
  expect(screen.getByText('My label')).toHaveClass('ods-checkbox__label');
});

test('renders indeterminate state of the checkbox', () => {
  const { container } = render(<Checkbox indeterminate />);
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="ods-checkbox__root-container"
    >
      <label
        class="ods-checkbox__root"
      >
        <input
          class="ods-checkbox"
          data-indeterminate="true"
          type="checkbox"
        />
        <span
          class="ods-checkbox__checkmark ods-checkbox__checkmark--indeterminate"
        />
      </label>
    </div>
  `);
});

test('renders error state of the checkbox', () => {
  const { container } = render(<Checkbox error />);
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="ods-checkbox__root-container"
    >
      <label
        class="ods-checkbox__root"
      >
        <input
          class="ods-checkbox"
          type="checkbox"
        />
        <span
          class="ods-checkbox__checkmark ods-checkbox__checkmark--error"
        />
      </label>
    </div>
  `);
});

test('renders error state of the checkbox with error message', () => {
  render(<Checkbox error errorMessage="message of error" />);
  const error = screen.getByText('message of error');

  expect(error).toBeInTheDocument();
});
