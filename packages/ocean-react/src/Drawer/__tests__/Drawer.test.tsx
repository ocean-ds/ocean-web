import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import SimpleDrawer from '../../Drawer/examples/SimpleDrawer';
import AttachedDrawer from '../../Drawer/examples/AttachedDrawer';
import Drawer from '../../Drawer';

jest.mock('@useblu/ocean-icons-react', () => ({
  XOutline: () => 'mock-x-outline-xvg',
  ArrowLeftOutline: () => 'mock-arrow-left-xvg',
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

describe('stack props (MR-795)', () => {
  test('without stack props keeps the legacy markup', () => {
    render(
      <Drawer open overlayClose={jest.fn()}>
        <p>Drawer content!</p>
      </Drawer>
    );

    const overlay = screen.getByTestId('drawer-overlay');
    const drawer = document.querySelector('.ods-drawer') as HTMLElement;

    expect(overlay).toHaveClass('ods-overlay ods-overlay--open', {
      exact: true,
    });
    expect(overlay).not.toHaveAttribute('style');
    expect(drawer.className).toBe(
      'ods-drawer ods-drawer--open ods-drawer--right ods-drawer--small'
    );
    expect(drawer).not.toHaveAttribute('style');
    expect(screen.getByRole('button', { hidden: true })).toHaveTextContent(
      'mock-x-outline-xvg'
    );
  });

  test('floating adds the floating class and keeps the size class', () => {
    render(
      <Drawer open overlayClose={jest.fn()} floating size="large">
        <p>Drawer content!</p>
      </Drawer>
    );

    const drawer = document.querySelector('.ods-drawer') as HTMLElement;
    expect(drawer).toHaveClass('ods-drawer--floating');
    expect(drawer).toHaveClass('ods-drawer--large');
  });

  test('offsetX is exposed as the stack offset custom property', () => {
    render(
      <Drawer open overlayClose={jest.fn()} floating offsetX={394}>
        <p>Drawer content!</p>
      </Drawer>
    );

    const drawer = document.querySelector('.ods-drawer') as HTMLElement;
    expect(drawer.style.getPropertyValue('--ods-drawer-offset-x')).toBe(
      '394px'
    );
    expect(drawer).not.toHaveStyle({ transform: 'translateX(-394px)' });
  });

  test('floating drawer mounted open enters from the closed state', () => {
    const reflow = jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect');

    render(
      <Drawer open overlayClose={jest.fn()} floating>
        <p>Drawer content!</p>
      </Drawer>
    );

    expect(reflow).toHaveBeenCalled();
    expect(document.querySelector('.ods-drawer')).toHaveClass(
      'ods-drawer--open'
    );
    reflow.mockRestore();
  });

  test('floating drawer closes as soon as open becomes false', () => {
    const { rerender } = render(
      <Drawer open overlayClose={jest.fn()} floating>
        <p>Drawer content!</p>
      </Drawer>
    );

    rerender(
      <Drawer open={false} overlayClose={jest.fn()} floating>
        <p>Drawer content!</p>
      </Drawer>
    );

    expect(document.querySelector('.ods-drawer')).not.toHaveClass(
      'ods-drawer--open'
    );
  });

  test('depth stacks the overlay z-index', () => {
    render(
      <Drawer open overlayClose={jest.fn()} depth={1}>
        <p>Drawer content!</p>
      </Drawer>
    );

    expect(screen.getByTestId('drawer-overlay')).toHaveStyle('z-index: 201');
    expect(document.querySelector('.ods-drawer')).toHaveStyle('z-index: 401');
  });

  test('width overrides the size width in px', () => {
    render(
      <Drawer open overlayClose={jest.fn()} floating width={300}>
        <p>Drawer content!</p>
      </Drawer>
    );

    expect(document.querySelector('.ods-drawer')).toHaveStyle('width: 300px');
  });

  test('hideOverlay makes the instance scrim transparent', () => {
    render(
      <Drawer open overlayClose={jest.fn()} hideOverlay>
        <p>Drawer content!</p>
      </Drawer>
    );

    expect(screen.getByTestId('drawer-overlay')).toHaveClass(
      'ods-overlay--transparent'
    );
  });

  test('onBack replaces the close icon by a left-aligned back arrow', () => {
    const onBack = jest.fn();
    const onDrawerClose = jest.fn();

    render(
      <Drawer
        open
        overlayClose={jest.fn()}
        onDrawerClose={onDrawerClose}
        onBack={onBack}
      >
        <p>Drawer content!</p>
      </Drawer>
    );

    expect(
      document.querySelector('.ods-drawer__content--header--left')
    ).toBeInTheDocument();

    const back = screen.getByRole('button', { name: 'Voltar', hidden: true });
    expect(back).toHaveTextContent('mock-arrow-left-xvg');

    fireEvent.click(back);

    expect(onBack).toHaveBeenCalledTimes(1);
    expect(onDrawerClose).not.toHaveBeenCalled();
  });
});
