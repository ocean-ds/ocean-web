import React from 'react';
import { render } from '@testing-library/react';

import Input from '../Input';

test('renders element properly', () => {
  const { container, getByTestId } = render(
    <Input
      data-testid="input-test"
      className="other-css-class__1 other-css-class__2"
    />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="ods-input__root"
    >
      <input
        class="ods-input other-css-class__1 other-css-class__2"
        data-testid="input-test"
        type="text"
      />
    </div>
  `);
  expect(getByTestId('input-test')).toHaveAttribute('type', 'text');
});

test('renders a label for the input', () => {
  const { getByText } = render(<Input label="The input label" />);
  expect(getByText('The input label').className).toBe('ods-input__label');
});

test('renders a helper text for the input', () => {
  const { getByText } = render(<Input helperText="Just a small info." />);
  expect(getByText('Just a small info.').className).toBe(
    'ods-input__helper-text'
  );
});

test('renders a full width input', () => {
  const { getByTestId } = render(<Input data-testid="input-test" blocked />);
  expect(getByTestId('input-test').className).toBe(
    'ods-input ods-input--blocked'
  );
});

test('renders a error state for the input', () => {
  const { getByTestId, getByText } = render(
    <Input data-testid="input-test" error helperText="Error message." />
  );
  expect(getByTestId('input-test').className).toBe(
    'ods-input ods-input--error'
  );
  expect(getByText('Error message.').className).toBe(
    'ods-input__helper-text ods-input__helper-text--error'
  );
});
