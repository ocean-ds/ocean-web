import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ModalProps } from '../Modal';
import SimpleModal from '../examples/SimpleModal';

jest.mock('@useblu/ocean-icons-react', () => ({
  XOutline: () => 'mock-x-outline-xvg',
}));

const setup = (props?: Omit<ModalProps, 'isOpen' | 'onRequestClose'>) => {
  render(
    <SimpleModal ariaHideApp={false} {...props}>
      Hello There!
    </SimpleModal>
  );

  fireEvent.click(screen.getByRole('button', { name: 'Open Modal' }));
};

test('renders element properly', () => {
  setup();

  expect(document.querySelector('.ods-modal')).toMatchInlineSnapshot(`
    <div
      class="ods-modal"
    >
      <div
        class="ods-modal__overlay ods-modal__overlay--after-open"
      >
        <div
          aria-modal="true"
          class="ods-modal__content ods-modal__content--after-open"
          role="dialog"
          tabindex="-1"
        >
          <div
            class="ods-modal__header"
          >
            <button
              aria-label="Close modal"
              class="ods-modal__header-close"
              type="button"
            >
              mock-x-outline-xvg
            </button>
          </div>
          <div
            class="ods-modal__body"
          >
            Hello There!
          </div>
        </div>
      </div>
    </div>
  `);
});

test('renders a full width modal', () => {
  setup({ blocked: true });

  expect(
    document.querySelector('.ods-modal__content--blocked')
  ).toBeInTheDocument();
});

test.each(['sm', 'md', 'lg'] as const)(
  'renders max-width class for `%s`',
  (maxWidth) => {
    setup({ maxWidth });

    expect(
      document.querySelector(`.ods-modal__content--${maxWidth}`)
    ).toBeInTheDocument();
  }
);

test('closes modal', async () => {
  setup();

  fireEvent.click(screen.getByRole('button', { name: 'Close modal' }));

  expect(
    document.querySelector('.ods-modal__overlay--before-close')
  ).toBeInTheDocument();
  expect(
    document.querySelector('.ods-modal__content--before-close')
  ).toBeInTheDocument();

  await waitFor(() =>
    expect(screen.queryByText('Hello There!')).not.toBeInTheDocument()
  );
});
