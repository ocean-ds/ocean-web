import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Alert, { AlertProps } from '../Alert';

jest.mock('@useblu/ocean-icons-react', () => ({
  InformationCircleOutline: () => 'mock-information-circle-outline',
  ExclamationCircleOutline: () => 'mock-exclamation-circle-outline',
  XCircleOutline: () => 'mock-x-circle-outline',
  CheckCircleOutline: () => 'mock-check-circle-outline',
  ChevronRight: () => 'mock-chevron-right',
  ExternalLink: () => 'mock-external-link',
  StarOutline: function StarOutlineMock(
    props: React.HTMLAttributes<HTMLDivElement>
  ) {
    return <div {...props}>mock-start-circle-outline</div>;
  },
}));

const setup = (props?: AlertProps) => {
  render(
    <Alert {...props}>
      <div className="ods-alert__content">Hello There!</div>
    </Alert>
  );
};

describe('Alert', () => {
  test('renders the title', () => {
    setup({ title: 'Test Title' });

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('renders the title and the description', () => {
    setup({ title: 'Test Title' });

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Hello There!')).toBeInTheDocument();
  });

  test('renders the button with the title', () => {
    setup({ button: 'Test Button', title: 'Test Title' });

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getAllByText('Test Button')[0]).toBeInTheDocument();
  });

  test('renders the button without the title', () => {
    setup({ button: 'Test Button' });

    expect(screen.getAllByText('Test Button')[0]).toBeInTheDocument();
  });

  test('checks the button click', () => {
    const mockFunction = jest.fn();

    setup({ button: 'Test Button', buttonAction: mockFunction });

    fireEvent.click(screen.getAllByText('Test Button')[0]);
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  test('checks long description snapshot', () => {
    setup({ title: 'Test Title', size: 'long' });

    expect(document.querySelector('.ods-alert')).toMatchInlineSnapshot(`
    <div
      class="ods-alert ods-alert--default ods-alert--long"
      role="alert"
    >
      <div
        class="ods-alert__header ods-alert__header--margin"
      >
        mock-information-circle-outline
        <div
          class="ods-alert__title"
        >
          Test Title
        </div>
      </div>
      <div
        class="alert__content"
      >
        <div
          class="ods-alert__content"
        >
          Hello There!
        </div>
      </div>
    </div>
    `);
  });

  test('checks short description snapshot', () => {
    setup({ title: 'Test Title', size: 'short' });

    expect(document.querySelector('.ods-alert')).toMatchInlineSnapshot(`
    <div
      class="ods-alert ods-alert--default"
      role="alert"
    >
      <div
        class="ods-alert__header"
      >
        mock-information-circle-outline
        <div
          class="ods-alert__text"
        >
          <div
            class="ods-alert__title"
          >
            Test Title
          </div>
          <div
            class="alert__content"
          >
            <div
              class="ods-alert__content"
            >
              Hello There!
            </div>
          </div>
        </div>
      </div>
    </div>
    `);
  });
});
