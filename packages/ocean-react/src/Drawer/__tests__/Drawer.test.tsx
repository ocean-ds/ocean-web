import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import SimpleDrawer from '../../Drawer/examples/SimpleDrawer';

jest.mock('@useblu/ocean-icons-react', () => ({
  XOutline: () => 'mock-x-outline-xvg',
}));

const setup = (props: any) => {
  render(
    <SimpleDrawer {...props}>
      <p>Drawer content!</p>
    </SimpleDrawer>
  );

  fireEvent.click(screen.getByRole('button', { name: 'Open drawer' }));
};

test('renders drawer component properly', () => {
  setup({ open: true });

  expect(document.querySelector('.ods-drawer')).toMatchInlineSnapshot(`
    <div
      class="ods-drawer ods-drawer--open ods-drawer--right"
    >
      <div
        class="ods-drawer__content--header ods-drawer__content--header--right"
      >
        <button
          class="ods-btn ods-btn--md ods-btn--primary"
          type="button"
        >
          mock-x-outline-xvg
        </button>
      </div>
      <p>
        Drawer content!
      </p>
    </div>
  `);
});

test('close the drawer', () => {
  setup({ open: false });

  expect(
    document.querySelector('ods-drawer__content--header')
  ).not.toBeInTheDocument();
});

test.each(['right', 'left'] as const)(
  'renders ods-drawer__content--header icon in each side',
  (iconAlignment) => {
    setup({ iconAlignment });

    expect(
      document.querySelector(`.ods-drawer__content--header--${iconAlignment}`)
    ).toBeInTheDocument();
  }
);
