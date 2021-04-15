import React from 'react';
import { render, screen } from '@testing-library/react';

import Checkbox from '../Checkbox';

test('renders element properly', () => {
  const { container } = render(
    <Checkbox data-testid="checkbox-test" className="custom-class" />
  );

  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toMatchInlineSnapshot(`
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
