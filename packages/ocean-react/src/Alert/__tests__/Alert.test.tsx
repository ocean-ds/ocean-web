import React from 'react';
import { render } from '@testing-library/react';
import { StarOutline } from '@useblu/ocean-icons-react';

import Alert, { AlertProps } from '../Alert';

jest.mock('@useblu/ocean-icons-react', () => ({
  InformationCircleOutline: () => 'mock-information-circle-outline',
  ExclamationCircleOutline: () => 'mock-exclamation-circle-outline',
  XCircleOutline: () => 'mock-x-circle-outline',
  CheckCircleOutline: () => 'mock-check-circle-outline',
  StarOutline: () => 'mock-start-outline',
}));

const setup = (props?: AlertProps) => {
  render(<Alert {...props}>Hello There!</Alert>);
};

test('renders default element properly', () => {
  setup();

  expect(document.querySelector('.ods-alert')).toMatchInlineSnapshot(`
    <div
      class="ods-alert ods-alert--default"
      role="alert"
    >
      mock-information-circle-outline
      Hello There!
    </div>
  `);
});

test('renders success element properly', () => {
  setup({ type: 'success' });

  expect(document.querySelector('.ods-alert')).toMatchInlineSnapshot(`
    <div
      class="ods-alert ods-alert--success"
      role="alert"
    >
      mock-check-circle-outline
      Hello There!
    </div>
  `);
});

test('renders error element properly', () => {
  setup({ type: 'error' });

  expect(document.querySelector('.ods-alert')).toMatchInlineSnapshot(`
    <div
      class="ods-alert ods-alert--error"
      role="alert"
    >
      mock-x-circle-outline
      Hello There!
    </div>
  `);
});

test('renders element with a custom icon', () => {
  setup({ icon: <StarOutline /> });

  expect(document.querySelector('.ods-alert')).toMatchInlineSnapshot(`
    <div
      class="ods-alert ods-alert--default"
      role="alert"
    >
      <div
        class="ods-alert__icon"
      >
        mock-start-outline
      </div>
      Hello There!
    </div>
  `);
});

test('renders warning element properly', () => {
  setup({ type: 'warning' });

  expect(document.querySelector('.ods-alert')).toMatchInlineSnapshot(`
    <div
      class="ods-alert ods-alert--warning"
      role="alert"
    >
      mock-exclamation-circle-outline
      Hello There!
    </div>
  `);
});

test('renders element properly with title', () => {
  setup({ title: "Test's Title" });

  expect(document.querySelector('.ods-alert')).toMatchInlineSnapshot(`
    <div
      class="ods-alert ods-alert--default ods-alert--has-header"
      role="alert"
    >
      <div
        class="ods-alert__header"
      >
        mock-information-circle-outline
        <div
          class="ods-alert__title"
        >
          Test's Title
        </div>
      </div>
      Hello There!
    </div>
  `);
});
