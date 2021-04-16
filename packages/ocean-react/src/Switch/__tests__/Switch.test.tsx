import React from 'react';
import { render, screen } from '@testing-library/react';

import Switch from '../Switch';

test('renders element properly', () => {
  const { container } = render(
    <Switch data-testid="switch-test" className="custom-class" />
  );

  // eslint-disable-next-line testing-library/no-node-access
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
        class="ods-switch__slider"
      />
    </label>
  `);
  expect(screen.getByTestId('switch-test')).toHaveAttribute('type', 'checkbox');
});
