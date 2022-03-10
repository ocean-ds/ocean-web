import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Stepper from '../Stepper';

jest.mock('@useblu/ocean-icons-react', () => ({
  PlusOutline: function StarOutlineMock(
    props: React.HTMLAttributes<HTMLDivElement>
  ) {
    return <div {...props}>Plus-Outline</div>;
  },
  MinusSm: function StarOutlineMock(
    props: React.HTMLAttributes<HTMLDivElement>
  ) {
    return <div {...props}>Minus-Sm</div>;
  },
}));

test('renders element properly', () => {
  const { container } = render(
    <Stepper
      data-testid="stepper-test"
      label="Teste"
      className="custom-class"
    />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
<div
  class="ods-form-control__root"
>
  <label
    class="ods-form-label"
  >
    Teste
  </label>
  <div
    class="ods-form-control__element"
  >
    <div
      class="ods-input ods-input--amount custom-class"
    >
      <div
        class="ods-input--amount__stepper-controls ods-input--amount__stepper-controls_minus"
      >
        <button
          class="ods-icon-btn ods-icon-btn--sm ods-icon-btn--disabled"
        >
          <div
            size="24"
          >
            Minus-Sm
          </div>
        </button>
      </div>
      <input
        data-testid="stepper-test"
        type="text"
        value="0"
      />
      <div
        class="ods-input--amount__stepper-controls ods-input--amount__stepper-controls_plus"
      >
        <button
          class="ods-icon-btn ods-icon-btn--sm"
        >
          <div
            size="24"
          >
            Plus-Outline
          </div>
        </button>
      </div>
    </div>
  </div>
</div>
`);
});

test('add a step to amount', () => {
  render(
    <Stepper
      data-testid="stepper-test"
      label="Teste"
      value={1}
      className="custom-class"
    />
  );

  fireEvent.click(screen.getByText(/Plus-Outline/));

  expect(screen.getByTestId('stepper-test')).toHaveAttribute('value', '2');
});

test('deduce a step from amount', () => {
  render(
    <Stepper
      data-testid="stepper-test"
      label="Teste"
      value={2}
      className="custom-class"
    />
  );

  fireEvent.click(screen.getByText(/Minus-Sm/));

  expect(screen.getByTestId('stepper-test')).toHaveAttribute('value', '1');
});

test('renders and change amount until max and min value', () => {
  render(
    <Stepper
      data-testid="stepper-test"
      label="Teste"
      value={1}
      max={2}
      className="custom-class"
    />
  );

  fireEvent.click(screen.getByText(/Minus-Sm/));

  expect(screen.getByTestId('stepper-test')).toHaveAttribute('value', '0');

  fireEvent.click(screen.getByText(/Minus-Sm/));

  expect(screen.getByTestId('stepper-test')).toHaveAttribute('value', '0');

  fireEvent.click(screen.getByText(/Plus-Outline/));

  expect(screen.getByTestId('stepper-test')).toHaveAttribute('value', '1');

  fireEvent.click(screen.getByText(/Plus-Outline/));

  expect(screen.getByTestId('stepper-test')).toHaveAttribute('value', '2');

  fireEvent.click(screen.getByText(/Plus-Outline/));

  expect(screen.getByTestId('stepper-test')).toHaveAttribute('value', '2');
});

test('renders with disabled estatus and do not change amount', () => {
  render(
    <Stepper
      data-testid="stepper-test"
      label="Teste"
      value={2}
      disabled
      className="custom-class"
    />
  );

  fireEvent.click(screen.getByText(/Minus-Sm/));

  expect(screen.getByTestId('stepper-test')).toHaveAttribute('value', '2');

  fireEvent.click(screen.getByText(/Plus-Outline/));

  expect(screen.getByTestId('stepper-test')).toHaveAttribute('value', '2');
});

test('renders works with arrow keys to change amount', () => {
  render(
    <Stepper
      data-testid="stepper-test"
      label="Teste"
      value={2}
      className="custom-class"
    />
  );

  fireEvent.click(screen.getByTestId('stepper-test'));

  fireEvent.keyDown(screen.getByTestId('stepper-test'), {
    key: 'ArrowDown',
  });

  expect(screen.getByTestId('stepper-test')).toHaveAttribute('value', '1');

  fireEvent.keyDown(screen.getByTestId('stepper-test'), {
    key: 'ArrowUp',
  });

  expect(screen.getByTestId('stepper-test')).toHaveAttribute('value', '2');

  fireEvent.keyDown(screen.getByTestId('stepper-test'), {
    key: 'm',
  });

  expect(screen.getByTestId('stepper-test')).toHaveAttribute('value', '2');
});

test('updates change amount with input', () => {
  render(
    <Stepper
      data-testid="stepper-test"
      label="Teste"
      value={2}
      className="custom-class"
    />
  );

  fireEvent.change(screen.getByTestId('stepper-test'), {
    target: { value: 3 },
  });

  expect(screen.getByTestId('stepper-test')).toHaveAttribute('value', '3');
});

test('does not updates change amount with input more than max', () => {
  render(
    <Stepper
      data-testid="stepper-test"
      label="Teste"
      value={2}
      max={4}
      className="custom-class"
    />
  );

  fireEvent.change(screen.getByTestId('stepper-test'), {
    target: { value: 5 },
  });

  expect(screen.getByTestId('stepper-test')).toHaveAttribute('value', '2');
});

test('does not updates change amount without target', () => {
  render(
    <Stepper
      data-testid="stepper-test"
      label="Teste"
      value={2}
      max={4}
      className="custom-class"
    />
  );

  fireEvent.change(screen.getByTestId('stepper-test'), { target: false });

  expect(screen.getByTestId('stepper-test')).toHaveAttribute('value', '2');
});

test('does not updates change amount with value less than min', () => {
  render(
    <Stepper
      data-testid="stepper-test"
      label="Teste"
      value={2}
      max={4}
      className="custom-class"
    />
  );

  fireEvent.change(screen.getByTestId('stepper-test'), {
    target: { value: -1 },
  });

  expect(screen.getByTestId('stepper-test')).toHaveAttribute('value', '2');
});

test('renders with error status', () => {
  const { container } = render(
    <Stepper
      data-testid="stepper-test"
      label="Teste"
      value={2}
      error
      className="custom-class"
    />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
<div
  class="ods-form-control__root"
>
  <label
    class="ods-form-label"
  >
    Teste
  </label>
  <div
    class="ods-form-control__element"
  >
    <div
      class="ods-input ods-input--amount ods-input--error custom-class"
    >
      <div
        class="ods-input--amount__stepper-controls ods-input--amount__stepper-controls_minus"
      >
        <button
          class="ods-icon-btn ods-icon-btn--sm"
        >
          <div
            size="24"
          >
            Minus-Sm
          </div>
        </button>
      </div>
      <input
        data-testid="stepper-test"
        type="text"
        value="2"
      />
      <div
        class="ods-input--amount__stepper-controls ods-input--amount__stepper-controls_plus"
      >
        <button
          class="ods-icon-btn ods-icon-btn--sm"
        >
          <div
            size="24"
          >
            Plus-Outline
          </div>
        </button>
      </div>
    </div>
  </div>
</div>
`);
});
