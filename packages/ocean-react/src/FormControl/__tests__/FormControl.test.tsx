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

  // eslint-disable-next-line testing-library/no-node-access
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
  const { getByText } = setup({ helperText: 'Just a small info.' });
  expect(
    getByText('Just a small info.')
  ).toHaveClass('ods-form-control__helper-text', { exact: true });
});

test('renders a full width state', () => {
  setup({ blocked: true });

  expect(
    // eslint-disable-next-line testing-library/no-node-access
    document.querySelector('.ods-form-control__element--blocked')
  ).toBeInTheDocument();
});

test('renders a error state', () => {
  setup({
    error: true,
    helperText: 'Error message.',
  });

  expect(
    screen.getByText('Error message.')
  ).toHaveClass(
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

  expect(
    screen.getByText('Error message.')
  ).toHaveClass(
    'ods-form-control__helper-text ods-form-control__helper-text--disabled',
    { exact: true }
  );
});
