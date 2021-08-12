import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Input from '../Input';
import InputControlled from '../examples/InputControlled';

test('renders element properly', () => {
  const { container } = render(
    <Input data-testid="input-test" className="custom-class" />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="ods-form-control__root"
    >
      <div
        class="ods-form-control__element"
      >
        <input
          class="ods-input custom-class"
          data-testid="input-test"
          type="text"
          value=""
        />
      </div>
    </div>
  `);
  expect(screen.getByTestId('input-test')).toHaveAttribute('type', 'text');
});

test('renders a error state for the input', () => {
  render(<Input data-testid="input-test" error helperText="Error message." />);
  expect(screen.getByTestId('input-test')).toHaveClass(
    'ods-input ods-input--error',
    { exact: true }
  );
});

test('renders a filled state for uncontrolled input', () => {
  render(<Input data-testid="input-test" defaultValue="Test test" />);

  expect(screen.getByTestId('input-test')).toHaveClass('ods-input--filled');
  fireEvent.change(screen.getByTestId('input-test'), {
    target: { value: '' },
  });
  expect(screen.getByTestId('input-test')).not.toHaveClass('ods-input--filled');
});

test('renders a filled state for controlled input', () => {
  render(<InputControlled />);

  expect(screen.getByTestId('controlled-input')).not.toHaveClass(
    'ods-input--filled'
  );
  fireEvent.change(screen.getByTestId('controlled-input'), {
    target: { value: 'Hi there!' },
  });
  expect(screen.getByTestId('controlled-input')).toHaveClass(
    'ods-input--filled'
  );
});
