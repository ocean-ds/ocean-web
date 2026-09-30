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
      class="ods-drawer ods-drawer--open ods-drawer--right ods-drawer--small ods-drawer--floating"
    >
      <div
        class="ods-drawer__content--header ods-drawer__content--header--right ods-drawer__content--header--icon"
      >
        <button
          aria-label="Fechar"
          class="ods-icon-btn ods-icon-btn--sm ods-icon-btn--light"
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
        class="ods-drawer__content--header ods-drawer__content--header--right ods-drawer__content--header--icon"
      >
        <button
          aria-label="Fechar"
          class="ods-icon-btn ods-icon-btn--sm ods-icon-btn--light"
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
        class="ods-drawer__content--header ods-drawer__content--header--right ods-drawer__content--header--icon"
      >
        <button
          aria-label="Fechar"
          class="ods-icon-btn ods-icon-btn--sm ods-icon-btn--light"
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
        class="ods-drawer__content--header ods-drawer__content--header--right ods-drawer__content--header--icon"
      >
        <button
          aria-label="Fechar"
          class="ods-icon-btn ods-icon-btn--sm ods-icon-btn--light"
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
        class="ods-drawer__content--header ods-drawer__content--header--right ods-drawer__content--header--icon"
      >
        <button
          aria-label="Fechar"
          class="ods-icon-btn ods-icon-btn--sm ods-icon-btn--light"
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

  expect(document.querySelector(`.ods-overlay`)?.className).toBe(
    'ods-overlay ods-overlay--floating'
  );
});

describe('stack props (MR-795)', () => {
  test('floating is the default and adds no inline style', () => {
    render(
      <Drawer open overlayClose={jest.fn()}>
        <p>Drawer content!</p>
      </Drawer>
    );

    const overlay = screen.getByTestId('drawer-overlay');
    const drawer = document.querySelector('.ods-drawer') as HTMLElement;

    expect(overlay).toHaveClass(
      'ods-overlay ods-overlay--open ods-overlay--floating',
      { exact: true }
    );
    expect(overlay).not.toHaveAttribute('style');
    expect(drawer.className).toBe(
      'ods-drawer ods-drawer--open ods-drawer--right ods-drawer--small ods-drawer--floating'
    );
    expect(drawer).not.toHaveAttribute('style');
    expect(screen.getByRole('button', { hidden: true })).toHaveTextContent(
      'mock-x-outline-xvg'
    );
  });

  test('floating={false} keeps the legacy edge-attached markup', () => {
    render(
      <Drawer open overlayClose={jest.fn()} floating={false}>
        <p>Drawer content!</p>
      </Drawer>
    );

    expect(screen.getByTestId('drawer-overlay')).toHaveClass(
      'ods-overlay ods-overlay--open',
      { exact: true }
    );
    expect(document.querySelector('.ods-drawer')?.className).toBe(
      'ods-drawer ods-drawer--open ods-drawer--right ods-drawer--small'
    );
  });

  test('anchored drawer does not float', () => {
    const anchor = { current: document.createElement('div') };
    render(
      <Drawer open overlayClose={jest.fn()} anchorEl={anchor}>
        <p>Drawer content!</p>
      </Drawer>
    );

    expect(document.querySelector('.ods-drawer')).not.toHaveClass(
      'ods-drawer--floating'
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
  describe('stack dim (MR-854)', () => {
    const renderDimmed = (
      props: Partial<React.ComponentProps<typeof Drawer>> = {}
    ) => {
      const onDimClick = jest.fn();
      const onDrawerClose = jest.fn();
      const onItemClick = jest.fn();
      render(
        <Drawer
          open
          overlayClose={jest.fn()}
          onDrawerClose={onDrawerClose}
          onDimClick={onDimClick}
          closeButton="icon"
          {...props}
        >
          <button type="button" onClick={onItemClick}>
            Item
          </button>
        </Drawer>
      );
      return { onDimClick, onDrawerClose, onItemClick };
    };

    test('dim="near" covers the panel and makes the content inert', () => {
      renderDimmed({ dim: 'near' });

      expect(document.querySelector('.ods-drawer')).toHaveClass(
        'ods-drawer--dimmed'
      );
      expect(screen.getByTestId('drawer-dim')).toHaveClass(
        'ods-drawer__dim ods-drawer__dim--near',
        { exact: true }
      );
      expect(document.querySelector('.ods-drawer__body')).toHaveAttribute(
        'inert'
      );
    });

    test('dim="far" uses the far modifier', () => {
      renderDimmed({ dim: 'far' });

      expect(screen.getByTestId('drawer-dim')).toHaveClass(
        'ods-drawer__dim--far'
      );
    });

    test('clicking the dimmed body calls onDimClick and not the content', () => {
      const { onDimClick, onItemClick, onDrawerClose } = renderDimmed({
        dim: 'near',
      });

      fireEvent.click(screen.getByText('Item'));

      expect(onDimClick).toHaveBeenCalledTimes(1);
      expect(onItemClick).not.toHaveBeenCalled();
      expect(onDrawerClose).not.toHaveBeenCalled();
    });

    test('the X of a dimmed drawer still closes it', () => {
      const { onDimClick, onDrawerClose } = renderDimmed({ dim: 'far' });

      fireEvent.click(
        screen.getByRole('button', { name: 'Fechar', hidden: true })
      );

      expect(onDrawerClose).toHaveBeenCalledTimes(1);
      expect(onDimClick).not.toHaveBeenCalled();
    });

    test('keyboard: the back button is focusable and the X is not', () => {
      const { onDimClick } = renderDimmed({ dim: 'near' });

      const back = screen.getByRole('button', {
        name: 'Voltar para esta janela',
        hidden: true,
      });
      expect(back).toHaveAttribute('tabindex', '0');
      expect(
        screen.getByRole('button', { name: 'Fechar', hidden: true })
      ).toHaveAttribute('tabindex', '-1');

      fireEvent.click(back);
      expect(onDimClick).toHaveBeenCalledTimes(1);
    });

    test('front drawer of a stack is not dimmed and its content is live', () => {
      const { onDimClick, onItemClick } = renderDimmed();

      fireEvent.click(screen.getByText('Item'));

      expect(onItemClick).toHaveBeenCalledTimes(1);
      expect(onDimClick).not.toHaveBeenCalled();
      expect(document.querySelector('.ods-drawer__body')).not.toHaveAttribute(
        'inert'
      );
      expect(screen.getByTestId('drawer-dim')).toHaveAttribute(
        'aria-hidden',
        'true'
      );
    });

    test('toggling dim keeps the content mounted', () => {
      const { rerender } = render(
        <Drawer open overlayClose={jest.fn()} onDimClick={jest.fn()}>
          <input aria-label="campo" defaultValue="abc" />
        </Drawer>
      );
      const input = screen.getByLabelText('campo');

      rerender(
        <Drawer open overlayClose={jest.fn()} onDimClick={jest.fn()} dim="far">
          <input aria-label="campo" defaultValue="abc" />
        </Drawer>
      );

      expect(screen.getByLabelText('campo')).toBe(input);
    });

    test('closeButton="icon" renders the X as an IconButton', () => {
      render(
        <Drawer open overlayClose={jest.fn()} closeButton="icon">
          <p>Drawer content!</p>
        </Drawer>
      );

      expect(
        screen.getByRole('button', { name: 'Fechar', hidden: true })
      ).toHaveClass('ods-icon-btn ods-icon-btn--sm ods-icon-btn--light', {
        exact: true,
      });
      expect(
        document.querySelector('.ods-drawer__content--header')
      ).toHaveClass('ods-drawer__content--header--icon');
    });

    test('closeButton="icon" with onBack renders the back arrow', () => {
      const onBack = jest.fn();
      render(
        <Drawer
          open
          overlayClose={jest.fn()}
          closeButton="icon"
          onBack={onBack}
        >
          <p>Drawer content!</p>
        </Drawer>
      );

      fireEvent.click(
        screen.getByRole('button', { name: 'Voltar', hidden: true })
      );
      expect(onBack).toHaveBeenCalledTimes(1);
    });

    test('without the new props the markup is unchanged', () => {
      render(
        <Drawer open overlayClose={jest.fn()} dim="near">
          <p>Drawer content!</p>
        </Drawer>
      );

      expect(document.querySelector('.ods-drawer__dim')).toBeNull();
      expect(document.querySelector('.ods-drawer__body')).toBeNull();
      expect(document.querySelector('.ods-drawer')).not.toHaveClass(
        'ods-drawer--dimmed'
      );
    });
  });
});

describe('MR-877: X, title and actions', () => {
  test('the X is a small light IconButton by default', () => {
    render(
      <Drawer open overlayClose={jest.fn()}>
        <p>Drawer content!</p>
      </Drawer>
    );

    expect(
      screen.getByRole('button', { name: 'Fechar', hidden: true })
    ).toHaveClass('ods-icon-btn ods-icon-btn--sm ods-icon-btn--light', {
      exact: true,
    });
  });

  test('closeButton="legacy" keeps the X as a Button', () => {
    render(
      <Drawer open overlayClose={jest.fn()} closeButton="legacy">
        <p>Drawer content!</p>
      </Drawer>
    );

    expect(
      document.querySelector('.ods-drawer__content--header button')
    ).toHaveClass('ods-btn');
  });

  test('without title and actions the children render directly', () => {
    render(
      <Drawer open overlayClose={jest.fn()}>
        <p>Drawer content!</p>
      </Drawer>
    );

    expect(document.querySelector('.ods-drawer__scroll')).toBeNull();
    expect(document.querySelector('.ods-drawer__actions')).toBeNull();
    expect(screen.getByText('Drawer content!').parentElement).toHaveClass(
      'ods-drawer'
    );
  });

  test('a string title renders as heading3 above the content', () => {
    render(
      <Drawer open overlayClose={jest.fn()} title="Detalhes do contrato">
        <p>Drawer content!</p>
      </Drawer>
    );

    const title = document.querySelector('.ods-drawer__title');
    expect(title).toHaveTextContent('Detalhes do contrato');
    expect(title?.firstElementChild).toHaveClass('ods-typography__heading3');
    expect(title?.nextElementSibling).toHaveClass('ods-drawer__main');
    expect(document.querySelector('.ods-drawer__actions')).toBeNull();
  });

  test('a node title is rendered as given', () => {
    render(
      <Drawer open overlayClose={jest.fn()} title={<span>Custom</span>}>
        <p>Drawer content!</p>
      </Drawer>
    );

    expect(
      document.querySelector('.ods-drawer__title > span')
    ).toHaveTextContent('Custom');
  });

  test('actions render in a footer outside the scroll area', () => {
    render(
      <Drawer
        open
        overlayClose={jest.fn()}
        actions={<button type="button">Pagar</button>}
      >
        <p>Drawer content!</p>
      </Drawer>
    );

    const actions = document.querySelector('.ods-drawer__actions');
    expect(actions).toHaveTextContent('Pagar');
    expect(actions?.previousElementSibling).toHaveClass('ods-drawer__scroll');
    expect(document.querySelector('.ods-drawer__title')).toBeNull();
  });

  test('in a stack the title and actions stay inside the inert body', () => {
    render(
      <Drawer
        open
        overlayClose={jest.fn()}
        onDimClick={jest.fn()}
        dim="near"
        title="Título"
        actions={<button type="button">Pagar</button>}
      >
        <p>Drawer content!</p>
      </Drawer>
    );

    const body = document.querySelector('.ods-drawer__body');
    expect(body).toHaveAttribute('inert');
    expect(body?.querySelector('.ods-drawer__title')).not.toBeNull();
    expect(body?.querySelector('.ods-drawer__actions')).not.toBeNull();
  });

  test.each(['warning', 'negative'] as const)(
    'headerColor="%s" tints the header',
    (headerColor) => {
      render(
        <Drawer open overlayClose={jest.fn()} headerColor={headerColor}>
          <p>Drawer content!</p>
        </Drawer>
      );

      expect(
        document.querySelector('.ods-drawer__content--header')
      ).toHaveClass(`ods-drawer__content--header--${headerColor}`);
    }
  );

  test('without headerColor the header has no tint class', () => {
    render(
      <Drawer open overlayClose={jest.fn()}>
        <p>Drawer content!</p>
      </Drawer>
    );

    const header = document.querySelector('.ods-drawer__content--header');
    expect(header).not.toHaveClass('ods-drawer__content--header--warning');
    expect(header).not.toHaveClass('ods-drawer__content--header--negative');
  });
});
