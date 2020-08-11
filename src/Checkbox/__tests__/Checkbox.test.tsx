import React from 'react';
import { render } from '@testing-library/react';

import Checkbox from '../Checkbox';

test('renders element properly', () => {
  const { container, getByTestId } = render(
    <Checkbox data-testid="checkbox-test" className="custom-class" />
  );

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
  expect(getByTestId('checkbox-test')).toHaveAttribute('type', 'checkbox');
});

test('renders a label for the checkbox', () => {
  const { getByText } = render(<Checkbox label="My label" />);
  expect(getByText('My label')).toHaveClass('ods-checkbox__label');
});
