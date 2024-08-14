import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WebNotification from '../WebNotification';

test('renders element properly', () => {
  render(
    <WebNotification
      isOpen
      className="custom-class"
      description="Hello, this is a notification"
      setIsOpen={jest.fn()}
    />
  );

  expect(screen.getByTestId('web-notification-test')).toMatchSnapshot(`
    <div
      class="ods-web-notification position-1 ods-web-notification__bottom-right-default"
      data-testid="web-notification-test"
    >
      <div class="ods-web-notification__content">
        <div class="ods-web-notification__container">
           <div class="ods-web-notification__title">
            Title
          </div>
          <div class="ods-web-notification__description">
            Hello, this is a notification
          </div>
        </div>
        <div
          class="ods-web-notification__wrapper"
        >
          <svg
            fill="none"
            height="16"
            stroke="currentColor"
            viewBox="0 0 24 24"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 18L18 6M6 6l12 12"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </div>
      </div>
    </div>
  `);
});

test('renders element with action', () => {
  render(
    <WebNotification
      isOpen
      className="custom-class"
      description="Hello, this is a notification"
      setIsOpen={jest.fn()}
      action={jest.fn()}
      actionLabel="Action"
    />
  );

  const actionLabel = screen.getByText('Action');

  expect(actionLabel).toBeInTheDocument();
  expect(actionLabel).toHaveTextContent('Action');
});

test('calls action on click', () => {
  const action = jest.fn();

  render(
    <WebNotification
      isOpen
      className="custom-class"
      description="Hello, this is a notification"
      setIsOpen={jest.fn()}
      action={action}
      actionLabel="Perform Action"
    />
  );

  const actionButton = screen.getByText('Perform Action');
  fireEvent.click(actionButton);

  expect(action).toBeCalled();
});

test('calls setIsOpen on close button click', () => {
  const setIsOpen = jest.fn();

  render(
    <WebNotification
      isOpen
      className="custom-class"
      description="Hello, this is a notification"
      setIsOpen={setIsOpen}
    />
  );

  const closeButton = screen
    .getByTestId('web-notification-test')
    .querySelector('svg');
  if (closeButton) {
    fireEvent.click(closeButton);
  }

  expect(setIsOpen).toBeCalledWith(false);
});

test('does not render when isOpen is false', () => {
  render(
    <WebNotification
      isOpen={false}
      className="custom-class"
      description="Hello, this is a notification"
      setIsOpen={jest.fn()}
    />
  );

  expect(screen.queryByTestId('web-notification-test')).not.toBeInTheDocument();
});
