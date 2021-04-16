import React from 'react';
import { render, screen } from '@testing-library/react';

import FormLabel from '../FormLabel';

test('renders element properly', () => {
  const { container } = render(
    <FormLabel data-testid="lbl-test" className="custom-class">
      Form label:
    </FormLabel>
  );

  // eslint-disable-next-line testing-library/no-node-access
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
  render(<FormLabel data-testid="lbl-test" disabled />);
  expect(
    screen.getByTestId('lbl-test')
  ).toHaveClass('ods-form-label ods-form-label--disabled', { exact: true });
});

test('renders a span element', () => {
  render(
    <FormLabel data-testid="lbl-test" component="span">
      Polimorphism
    </FormLabel>
  );

  expect(screen.getByTestId('lbl-test')).toMatchInlineSnapshot(`
    <span
      class="ods-form-label"
      data-testid="lbl-test"
    >
      Polimorphism
    </span>
  `);
});
