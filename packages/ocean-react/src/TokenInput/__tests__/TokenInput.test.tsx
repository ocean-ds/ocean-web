import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TokenInput from '../TokenInput';

const onChangeToken = jest.fn();

beforeAll(() => {
  const mockGetRandomValues = () =>
    new Uint8Array(16).map(() => Math.floor(Math.random() * 256));
  const mGetRandomValues = jest.fn(mockGetRandomValues);
  Object.defineProperty(window, 'crypto', {
    value: { getRandomValues: mGetRandomValues },
    configurable: true,
  });
});

test('renders element properly', () => {
  const { container } = render(
    <TokenInput
      data-testid="token-input-test"
      digitsQuantity={4}
      autoFocus
      onChangeToken={onChangeToken}
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
          class="ods-token-input"
        >
          <div
            class="ods-token-input__input"
          >
            <input
              data-testid="token-input-test"
              value=""
            />
          </div>
          <div
            class="ods-token-input__input"
          >
            <input
              data-testid="token-input-test"
              value=""
            />
          </div>
          <div
            class="ods-token-input__input"
          >
            <input
              data-testid="token-input-test"
              value=""
            />
          </div>
          <div
            class="ods-token-input__input"
          >
            <input
              data-testid="token-input-test"
              value=""
            />
          </div>
        </div>
      </div>
      
    </div>
  `);
});

test('should allow input of digits', () => {
  const handleChange = jest.fn();
  render(<TokenInput digitsQuantity={4} onChangeToken={handleChange} />);

  const inputs = screen.getAllByTestId('token-input-test');
  fireEvent.change(inputs[0], { target: { value: '1' } });
  fireEvent.change(inputs[1], { target: { value: '2' } });
  fireEvent.change(inputs[2], { target: { value: '3' } });
  fireEvent.change(inputs[3], { target: { value: '4' } });

  expect(handleChange).toHaveBeenCalledWith('1234');
});

test('should be disabled when the disabled prop is true', () => {
  render(<TokenInput digitsQuantity={4} onChangeToken={jest.fn()} disabled />);

  const inputs = screen.getAllByTestId('token-input-test');
  inputs.forEach((input) => {
    const mockGetRandomValues = () =>
      new Uint8Array(16).map(() => Math.floor(Math.random() * 256));
    const mGetRandomValues = jest.fn(mockGetRandomValues);
    Object.defineProperty(window, 'crypto', {
      value: { getRandomValues: mGetRandomValues },
      configurable: true,
    });
    expect(input).toBeDisabled();
  });
});

test('should display error message when error prop is true', () => {
  const errorMessage = 'This field is required';
  render(
    <TokenInput
      digitsQuantity={4}
      onChangeToken={jest.fn()}
      error
      errorMessage={errorMessage}
    />
  );

  expect(screen.getByText(errorMessage)).toBeInTheDocument();
});
