import React from 'react';
import { render, screen } from '@testing-library/react';
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
            height="18"
            stroke="currentColor"
            viewBox="0 0 24 24"
            width="18"
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
        class="ods-snackbar__progress ods-snackbar__progress-default"
      />
    </div>
  `);
});
