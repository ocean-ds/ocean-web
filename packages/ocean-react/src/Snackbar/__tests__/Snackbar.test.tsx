import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Snackbar from '../Snackbar';

test('renders element properly', () => {
  render(
    <Snackbar
      isOpen
      className="custom-class"
      message="Hello, this is a snackbar"
      setIsOpen={jest.fn()}
    />
  );

  expect(screen.getByTestId('snackbar-test')).toMatchInlineSnapshot(`
    <div
      class="ods-snackbar ods-snackbar__bottom-right custom-class"
      data-testid="snackbar-test"
    >
      <div
        class="ods-snackbar__content"
      >
        <div
          class="ods-snackbar__icon ods-snackbar__icon-info"
        >
          <svg
            fill="none"
            height="19"
            stroke="currentColor"
            viewBox="0 0 24 24"
            width="19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 16v-4 4zm0-8h.01H12zm9 4a9 9 0 10-18 0 9 9 0 0018 0z"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </div>
        <div
          class="ods-snackbar__label"
        >
          Hello, this is a snackbar
        </div>
      </div>
      <div
        class="ods-snackbar__progress"
        data-testid="snackbar-test-progress"
      />
    </div>
  `);
});

test('renders element without action', () => {
  render(
    <Snackbar
      isOpen
      className="custom-class"
      message="Hello, this is a snackbar"
      setIsOpen={jest.fn()}
    />
  );

  const progress = screen.getByTestId('snackbar-test-progress');

  expect(progress).toBeInTheDocument();

  expect(progress).toHaveClass('ods-snackbar__progress');
});

test('renders element with action', () => {
  render(
    <Snackbar
      isOpen
      className="custom-class"
      message="Hello, this is a snackbar"
      setIsOpen={jest.fn()}
      action={jest.fn()}
    />
  );

  const progress = screen.getByTestId('snackbar-test-progress');

  expect(progress).toBeInTheDocument();

  expect(progress).toHaveClass('ods-snackbar__progress-action');
});

test('renders element with action label property', () => {
  render(
    <Snackbar
      isOpen
      className="custom-class"
      message="Hello, this is a snackbar"
      setIsOpen={jest.fn()}
      action={jest.fn()}
      actionLabel="I'm a label"
    />
  );

  const actionLabel = screen.getByTestId('snackbar-test-label');

  expect(actionLabel).toBeInTheDocument();

  expect(actionLabel).toHaveTextContent("I'm a label");
});

beforeEach(() => {
  jest.useFakeTimers();
});

test('call action after cooldown', async () => {
  const action = jest.fn();

  render(
    <Snackbar
      isOpen
      message="Hello, this is a snackbar"
      setIsOpen={jest.fn()}
      action={action}
    />
  );

  const snackbar = screen.getByTestId('snackbar-test');

  expect(snackbar).toBeInTheDocument();

  setTimeout(() => {
    expect(action).toBeCalled();
  }, 10000);
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test('cancel action event', () => {
  const setIsOpen = jest.fn();
  const action = jest.fn();

  render(
    <Snackbar
      isOpen
      message="Hello, this is a snackbar"
      setIsOpen={setIsOpen}
      action={action}
      actionLabel="cancel"
    />
  );

  const snackbar = screen.getByTestId('snackbar-test');

  expect(snackbar).toBeInTheDocument();

  const cancelButton = screen.getByText('cancel');

  fireEvent.click(cancelButton);

  expect(action).not.toBeCalled();

  expect(setIsOpen).toBeCalled();
});

test('close when is isOpem is false', () => {
  const setIsOpen = jest.fn();
  const action = jest.fn();

  render(
    <Snackbar
      isOpen={false}
      message="Hello, this is a snackbar"
      setIsOpen={setIsOpen}
      action={action}
      actionLabel="cancel"
    />
  );

  expect(action).not.toBeCalled();

  expect(setIsOpen).toBeCalled();
});
