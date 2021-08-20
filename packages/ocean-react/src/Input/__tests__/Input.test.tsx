import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { StarOutline } from '@useblu/ocean-icons-react';

import Input from '../Input';
import InputControlled from '../examples/InputControlled';

jest.mock('@useblu/ocean-icons-react', () => ({
  StarOutline: function StarOutlineMock(
    props: React.HTMLAttributes<HTMLDivElement>
  ) {
    return <div {...props}>mock-start-circle-outline</div>;
  },
}));

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
    <div
      class="ods-input custom-class"
    >
      <input
        data-testid="input-test"
        type="text"
        value=""
      />
    </div>
  </div>
</div>
`);
  expect(screen.getByTestId('input-test')).toHaveAttribute('type', 'text');
});

test('renders element with adornment properly', () => {
  const { container } = render(
    <Input
      data-testid="input-test"
      adornment={<StarOutline size={24} stroke="#5872f5" />}
      className="custom-class"
    />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="ods-form-control__root"
    >
      <div
        class="ods-form-control__element"
      >
        <div
          class="ods-input custom-class"
        >
          <input
            data-testid="input-test"
            type="text"
            value=""
          />
          <div
            class="ods-input__adornment"
          >
            <div
              size="24"
              stroke="#5872f5"
            >
              mock-start-circle-outline
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
  expect(screen.getByTestId('input-test')).toHaveAttribute('type', 'text');
});

test('renders a error state for the input', () => {
  render(<Input data-testid="input-test" error helperText="Error message." />);
  expect(screen.getByTestId('input-test').parentElement).toHaveClass(
    'ods-input ods-input--error',
    { exact: true }
  );
});

test('renders a disabled state for the input', () => {
  render(<Input data-testid="input-test" disabled />);
  expect(screen.getByTestId('input-test').parentElement).toHaveClass(
    'ods-input ods-input--disabled',
    { exact: true }
  );
});

test('renders a filled state for uncontrolled input', () => {
  render(<Input data-testid="input-test" defaultValue="Test test" />);

  expect(screen.getByTestId('input-test').parentElement).toHaveClass(
    'ods-input--filled'
  );
  fireEvent.change(screen.getByTestId('input-test'), {
    target: { value: '' },
  });
  expect(screen.getByTestId('input-test').parentElement).not.toHaveClass(
    'ods-input--filled'
  );
});

test('renders a filled state for controlled input', () => {
  render(<InputControlled />);

  expect(screen.getByTestId('controlled-input')).not.toHaveClass(
    'ods-input--filled'
  );
  fireEvent.change(screen.getByTestId('controlled-input'), {
    target: { value: 'Hi there!' },
  });
  expect(screen.getByTestId('controlled-input').parentElement).toHaveClass(
    'ods-input--filled'
  );
});
