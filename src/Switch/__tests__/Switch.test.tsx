import React from 'react';
import { render } from '@testing-library/react';

import Switch from '../Switch';

test('renders element properly', () => {
  const { container, getByTestId } = render(
    <Switch data-testid="switch-test" className="custom-class" />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <label
      class="ods-switch__root"
    >
      <input
        class="ods-switch custom-class"
        data-testid="switch-test"
        type="checkbox"
      />
      <span
        class="ods-switch__checkmark"
      />
    </label>
  `);
  expect(getByTestId('switch-test')).toHaveAttribute('type', 'checkbox');
});
