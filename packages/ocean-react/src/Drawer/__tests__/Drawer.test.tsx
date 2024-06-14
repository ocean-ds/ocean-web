import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import SimpleDrawer from '../../Drawer/examples/SimpleDrawer';
import AttachedDrawer from '../../Drawer/examples/AttachedDrawer';
import Drawer from '../../Drawer';

jest.mock('@useblu/ocean-icons-react', () => ({
  XOutline: () => 'mock-x-outline-xvg',
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      class="ods-drawer ods-drawer--open ods-drawer--right ods-drawer--small"
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

test('renders drawer attached to div on right', () => {
  render(
    <AttachedDrawer>
      <p>Drawer content!</p>
    </AttachedDrawer>
  );

  fireEvent.click(screen.getByRole('button', { name: 'Open drawer' }));

  expect(document.querySelector('.ods-drawer')).toMatchInlineSnapshot(`
    <div
      class="ods-drawer ods-drawer--open ods-drawer--right ods-drawer--small"
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

test('renders drawer attached to div on left', () => {
  render(
    <AttachedDrawer align="left">
      <p>Drawer content!</p>
    </AttachedDrawer>
  );

  fireEvent.click(screen.getByRole('button', { name: 'Open drawer' }));

  expect(document.querySelector('.ods-drawer')).toMatchInlineSnapshot(`
    <div
      class="ods-drawer ods-drawer--open ods-drawer--left ods-drawer--small"
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

test('renders drawer small drawer', () => {
  render(
    <AttachedDrawer size="small">
      <p>Drawer content!</p>
    </AttachedDrawer>
  );

  fireEvent.click(screen.getByRole('button', { name: 'Open drawer' }));

  expect(document.querySelector('.ods-drawer')).toMatchInlineSnapshot(`
    <div
      class="ods-drawer ods-drawer--open ods-drawer--right ods-drawer--small"
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

test('renders drawer large drawer', () => {
  render(
    <AttachedDrawer size="large">
      <p>Drawer content!</p>
    </AttachedDrawer>
  );

  fireEvent.click(screen.getByRole('button', { name: 'Open drawer' }));

  expect(document.querySelector('.ods-drawer')).toMatchInlineSnapshot(`
    <div
      class="ods-drawer ods-drawer--open ods-drawer--right ods-drawer--large"
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

test.each(['right', 'left'] as const)(
  'renders ods-drawer in each side',
  (align) => {
    setup({ align });

    expect(document.querySelector(`.ods-drawer--${align}`)).toBeInTheDocument();
  }
);

const TestComponent = () => {
  const [open, setOpen] = useState(true);

  return (
    <Drawer open={open} overlayClose={() => setOpen(false)}>
      <p>Drawer content!</p>
    </Drawer>
  );
};

test('close the drawer clicking the overlay', () => {
  render(<TestComponent />);

  fireEvent.click(screen.getByTestId('drawer-overlay'));

  expect(document.querySelector(`.ods-overlay`)?.className).toBe('ods-overlay');
});
