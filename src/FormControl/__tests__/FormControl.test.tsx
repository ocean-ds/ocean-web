import React from 'react';
import { render } from '@testing-library/react';

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

test('renders a label', () => {
  const { getByText } = setup({ label: 'The label' });
  expect(getByText('The label').className).toBe('ods-form-control__label');
});

test('renders a helper text', () => {
  const { getByText } = setup({ helperText: 'Just a small info.' });
  expect(getByText('Just a small info.').className).toBe(
    'ods-form-control__helper-text'
  );
});

test('renders a full width state', () => {
  const { container } = setup({ blocked: true });
  expect(
    container.querySelector('.ods-form-control__element--blocked')
  ).toBeInTheDocument();
});

test('renders a error state', () => {
  const { getByText } = setup({
    error: true,
    helperText: 'Error message.',
  });

  expect(getByText('Error message.').className).toBe(
    'ods-form-control__helper-text ods-form-control__helper-text--error'
  );
});
