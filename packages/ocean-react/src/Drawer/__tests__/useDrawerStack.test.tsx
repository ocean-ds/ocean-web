import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';

import Drawer from '../Drawer';
import StackedDrawers from '../examples/StackedDrawers';
import {
  DRAWER_STACK_THREE_MIN_WIDTH,
  closeDrawerStack,
  drawerStackDim,
  drawerStackLimit,
  drawerStackWidth,
  fitDrawerStack,
  focusDrawerStack,
  pushDrawerStack,
} from '../useDrawerStack';

jest.mock('@useblu/ocean-icons-react', () => ({
  XOutline: () => 'mock-x-outline-xvg',
  ArrowLeftOutline: () => 'mock-arrow-left-xvg',
  ChevronRight: () => 'mock-chevron-right',
  ChevronLeft: () => 'mock-chevron-left',
}));

const setViewport = (width: number, mobile = false) => {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    value: width,
  });
  window.matchMedia = jest.fn().mockReturnValue({
    matches: mobile,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
};

const openDrawers = () =>
  Array.from(document.querySelectorAll('.ods-drawer--open'));

const flushResize = () => {
  jest.useFakeTimers();
  act(() => {
    window.dispatchEvent(new Event('resize'));
    jest.runOnlyPendingTimers();
  });
  jest.useRealTimers();
};

beforeAll(() => {
  window.requestAnimationFrame = (cb: (time: number) => void) =>
    setTimeout(() => cb(0), 0) as unknown as number;
  window.cancelAnimationFrame = (id: number) => clearTimeout(id);
});

afterEach(() => setViewport(1024));

test('CT-1: uma drawer só abre e fecha como antes, sem a pilha', () => {
  const onClose = jest.fn();
  render(
    <Drawer open overlayClose={jest.fn()} onDrawerClose={onClose} title="Hi">
      <p>content</p>
    </Drawer>
  );
  expect(document.querySelector('.ods-drawer__body')).not.toBeInTheDocument();
  expect(screen.queryByTestId('drawer-dim')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Fechar', hidden: true }));
  expect(onClose).toHaveBeenCalled();
});

test('CT-2: pilha de 3 lado a lado em tela larga, as de trás escurecidas', () => {
  setViewport(1440);
  render(<StackedDrawers />);
  fireEvent.click(screen.getByRole('button', { name: 'Open drawer' }));
  fireEvent.click(screen.getByText('Second drawer'));
  fireEvent.click(screen.getByText('Third drawer'));
  expect(openDrawers()).toHaveLength(3);
  const dimmed = document.querySelectorAll('.ods-drawer--dimmed');
  expect(dimmed).toHaveLength(2);
  expect(screen.getAllByTestId('drawer-dim')[0]).toHaveClass(
    'ods-drawer__dim--far'
  );
  fireEvent.click(screen.getByText('Second drawer'));
  expect(openDrawers()).toHaveLength(1);
  expect(drawerStackLimit(DRAWER_STACK_THREE_MIN_WIDTH, false)).toBe(3);
  expect(drawerStackWidth(1440, 3)).toBe(378);
  expect(pushDrawerStack(['a', 'b'], 'c', 2)).toEqual(['a', 'c']);
  expect(drawerStackDim(0)).toBeUndefined();
});

test('CT-3: clicar na de trás volta para ela e fechar uma fecha as seguintes', () => {
  setViewport(1440);
  render(<StackedDrawers initial={['first', 'second', 'third']} />);
  expect(openDrawers()).toHaveLength(3);
  fireEvent.click(document.querySelectorAll('.ods-drawer--dimmed')[0]);
  expect(openDrawers()).toHaveLength(1);
  fireEvent.click(screen.getByText('Second drawer'));
  fireEvent.click(screen.getByText('Third drawer'));
  fireEvent.click(
    screen.getAllByRole('button', { name: 'Fechar', hidden: true })[1]
  );
  expect(openDrawers()).toHaveLength(1);
  fireEvent.click(document.querySelector('.ods-overlay') as Element);
  expect(openDrawers()).toHaveLength(0);
  expect(closeDrawerStack(['a'], 'z')).toEqual(['a']);
  expect(focusDrawerStack(['a', 'b'], 'b')).toEqual(['a', 'b']);
});

test('CT-4: estreitar a janela com 3 abertas deixa 2', () => {
  setViewport(1440);
  render(<StackedDrawers initial={['first', 'second', 'third']} />);
  expect(openDrawers()).toHaveLength(3);
  setViewport(1024);
  flushResize();
  expect(openDrawers()).toHaveLength(2);
  expect(fitDrawerStack(['a', 'b', 'c'], 2)).toEqual(['a', 'c']);
});

test('CT-5: no celular só a de cima aparece, com seta de voltar', () => {
  setViewport(375, true);
  render(<StackedDrawers />);
  fireEvent.click(screen.getByRole('button', { name: 'Open drawer' }));
  fireEvent.click(screen.getByText('Second drawer'));
  expect(openDrawers()).toHaveLength(1);
  fireEvent.click(screen.getByRole('button', { name: 'Voltar', hidden: true }));
  expect(openDrawers()).toHaveLength(1);
  expect(openDrawers()[0].querySelector('[aria-label="Voltar"]')).toBeNull();
  expect(drawerStackLimit(375, true)).toBe(3);
  expect(drawerStackLimit(1024, false)).toBe(2);
  expect(pushDrawerStack(['a'], 'a', 3)).toEqual(['a']);
  expect(pushDrawerStack([], 'a', 0)).toEqual(['a']);
  expect(fitDrawerStack(['a', 'b'], 0)).toEqual(['b']);
});

test('CT-5: sem matchMedia a pilha segue como tela larga', () => {
  setViewport(1440);
  (window as unknown as { matchMedia?: unknown }).matchMedia = undefined;
  render(<StackedDrawers initial={['first', 'second']} />);
  expect(openDrawers()).toHaveLength(2);
});
