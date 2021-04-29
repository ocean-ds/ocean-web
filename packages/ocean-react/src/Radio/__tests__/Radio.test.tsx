import React from 'react';
import { render, screen } from '@testing-library/react';

import Radio from '../Radio';

test('renders element properly', () => {
  const { container } = render(
    <Radio data-testid="radio-test" className="custom-class" />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <label
      class="ods-radio__root"
    >
      <input
        class="ods-radio custom-class"
        data-testid="radio-test"
        type="radio"
      />
      <span
        class="ods-radio__checkmark"
      />
    </label>
  `);
  expect(screen.getByTestId('radio-test')).toHaveAttribute('type', 'radio');
});

test('renders a label for the radio', () => {
  render(<Radio label="The radio label" />);
  expect(screen.getByText('The radio label')).toHaveClass('ods-radio__label');
});
