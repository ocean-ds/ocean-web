import React from 'react';
import { render } from '@testing-library/react';

import FormLabel from '../FormLabel';

test('renders element properly', () => {
  const { container } = render(
    <FormLabel data-testid="lbl-test" className="custom-class">
      Form label:
    </FormLabel>
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <label
      class="ods-form-label custom-class"
      data-testid="lbl-test"
    >
      Form label:
    </label>
  `);
});

test('renders a disabled state', () => {
  const { getByTestId } = render(<FormLabel data-testid="lbl-test" disabled />);
  expect(
    getByTestId('lbl-test')
  ).toHaveClass('ods-form-label ods-form-label--disabled', { exact: true });
});

test('renders a span element', () => {
  const { getByTestId } = render(
    <FormLabel data-testid="lbl-test" component="span">
      Polimorphism
    </FormLabel>
  );

  expect(getByTestId('lbl-test')).toMatchInlineSnapshot(`
    <span
      class="ods-form-label"
      data-testid="lbl-test"
    >
      Polimorphism
    </span>
  `);
});
