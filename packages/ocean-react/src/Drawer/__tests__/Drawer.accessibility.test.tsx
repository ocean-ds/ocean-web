import React, { useState } from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import Drawer from '../Drawer';

const Example = (): React.ReactElement => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Abrir escolha
      </button>
      <Drawer
        modal
        open={open}
        onDrawerClose={close}
        overlayClose={close}
        aria-labelledby="drawer-title"
        title={<h2 id="drawer-title">Escolher opção</h2>}
        actions={
          <button type="button" onClick={close}>
            Concluir
          </button>
        }
      >
        <input type="radio" name="option" aria-label="Primeira opção" />
      </Drawer>
    </>
  );
};

const openDrawer = () => {
  const trigger = screen.getByRole('button', { name: 'Abrir escolha' });
  trigger.focus();
  fireEvent.click(trigger);
  return trigger;
};

test('CT-1: modal content is visible to assistive technologies and named by its title', async () => {
  render(<Example />);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  openDrawer();
  const dialog = screen.getByRole('dialog', { name: 'Escolher opção' });
  expect(dialog).toHaveAttribute('aria-modal', 'true');
  expect(screen.getByRole('radio', { name: 'Primeira opção' })).toBeVisible();
  expect(screen.getByTestId('drawer-overlay')).not.toHaveAttribute(
    'aria-hidden'
  );
  expect(screen.getByTestId('drawer-overlay')).toHaveAttribute(
    'role',
    'presentation'
  );
  await waitFor(() => expect(dialog).toHaveFocus());
});

test('CT-6: interacting with modal content does not activate the decorative overlay', () => {
  render(<Example />);
  openDrawer();
  fireEvent.click(screen.getByRole('radio', { name: 'Primeira opção' }));
  expect(screen.getByRole('dialog', { name: 'Escolher opção' })).toBeVisible();
  expect(screen.getByRole('radio', { name: 'Primeira opção' })).toBeChecked();
});

test('CT-5: Escape returns focus to the trigger and reopening restores the dialog', async () => {
  render(<Example />);
  const trigger = openDrawer();
  fireEvent.keyDown(screen.getByRole('dialog'), { keyCode: 27, key: 'Escape' });
  await waitFor(() =>
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  );
  expect(trigger).toHaveFocus();
  openDrawer();
  await waitFor(() => expect(screen.getByRole('dialog')).toHaveFocus());
  expect(screen.getByRole('radio')).toBeVisible();
});

test.each(['icon', 'overlay'] as const)(
  'CT-5: %s closes without submitting and restores the trigger',
  async (method) => {
    render(<Example />);
    const trigger = openDrawer();
    fireEvent.click(
      method === 'icon'
        ? screen.getByRole('button', { name: 'Fechar' })
        : screen.getByTestId('drawer-overlay')
    );
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    );
    expect(trigger).toHaveFocus();
  }
);

test('CT-6: Tab and Shift+Tab wrap inside the modal', () => {
  const width = jest
    .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
    .mockReturnValue(100);
  render(<Example />);
  openDrawer();
  const first = screen.getByRole('button', { name: 'Fechar' });
  const last = screen.getByRole('button', { name: 'Concluir' });
  last.focus();
  fireEvent.keyDown(last, { keyCode: 9, key: 'Tab' });
  expect(first).toHaveFocus();
  fireEvent.keyDown(first, { keyCode: 9, key: 'Tab', shiftKey: true });
  expect(last).toHaveFocus();
  width.mockRestore();
});

test('CT-6: the legacy drawer keeps its DOM and hides only when closed', () => {
  const { rerender } = render(
    <Drawer open={false} overlayClose={jest.fn()}>
      Conteúdo
    </Drawer>
  );
  expect(screen.getByTestId('drawer-overlay')).toHaveAttribute(
    'aria-hidden',
    'true'
  );
  expect(screen.getByTestId('drawer-overlay')).toHaveAttribute('inert');
  rerender(
    <Drawer open overlayClose={jest.fn()}>
      Conteúdo
    </Drawer>
  );
  expect(screen.getByTestId('drawer-overlay')).not.toHaveAttribute(
    'aria-hidden'
  );
  expect(screen.getByTestId('drawer-overlay')).not.toHaveAttribute('inert');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('modal panel is laid out closed before opening and stays until slide-out ends', () => {
  const layoutClasses: string[] = [];
  const layout = jest
    .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockImplementation(function record(this: HTMLElement) {
      if (this.classList.contains('ods-drawer'))
        layoutClasses.push(this.className);
      return {} as DOMRect;
    });
  jest.useFakeTimers();
  try {
    const { rerender } = render(
      <Drawer modal open={false} overlayClose={jest.fn()} aria-label="Escolha">
        Conteúdo
      </Drawer>
    );
    rerender(
      <Drawer modal open overlayClose={jest.fn()} aria-label="Escolha">
        Conteúdo
      </Drawer>
    );
    const panel = document.querySelector('.ods-drawer') as HTMLElement;
    expect(layoutClasses).toHaveLength(1);
    expect(layoutClasses[0]).not.toContain('ods-drawer--open');
    expect(panel).toHaveClass('ods-drawer--open');

    rerender(
      <Drawer modal open={false} overlayClose={jest.fn()} aria-label="Escolha">
        Conteúdo
      </Drawer>
    );
    expect(panel).toBeInTheDocument();
    expect(panel).not.toHaveClass('ods-drawer--open');
    act(() => {
      jest.advanceTimersByTime(600);
    });
    expect(document.querySelector('.ods-drawer')).not.toBeInTheDocument();
  } finally {
    jest.useRealTimers();
    layout.mockRestore();
  }
});
