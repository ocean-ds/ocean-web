import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';

import Tab, { getTabId, TabItem } from '../Tab';

const tabs: TabItem[] = [
  { label: 'Summary' },
  { label: 'Payments', count: 3 },
  { label: 'Receipts', count: 120 },
];

const manyTabs: TabItem[] = [
  { label: 'Summary' },
  { label: 'Payments' },
  { label: 'Receipts' },
  { label: 'Invoices' },
];

const setup = (props: Partial<React.ComponentProps<typeof Tab>> = {}) => {
  const onChange = jest.fn();
  const utils = render(
    <Tab
      tabs={tabs}
      selectedIndex={0}
      onChange={onChange}
      aria-label="Account sections"
      {...props}
    />
  );
  return { ...utils, onChange };
};

const tablist = () => screen.getByRole('tablist');
const tab = (name: RegExp | string) => screen.getByRole('tab', { name });

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders a tablist with one tab per item and a generated id', () => {
  jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(375);
  setup();

  const root = tablist();
  expect(root).toHaveClass('ods-tab', 'ods-tab--fill');
  expect(root).toHaveAttribute('aria-label', 'Account sections');
  expect(root).toHaveAttribute('aria-orientation', 'horizontal');
  expect(root.id).toBeTruthy();
  expect(screen.getAllByRole('tab')).toHaveLength(3);

  const summary = tab('Summary');
  expect(summary).toHaveAttribute('aria-selected', 'true');
  expect(summary).toHaveAttribute('tabindex', '0');
  expect(summary).toHaveAttribute('type', 'button');
  expect(summary).toHaveClass('ods-tab__item', 'ods-tab__item--selected');
  expect(summary.id).toBe(getTabId(root.id, 0));
  const indicators = root.querySelectorAll('.ods-tab__indicator');
  expect(indicators).toHaveLength(1);
  expect(indicators[0]).toHaveAttribute('aria-hidden', 'true');
  expect(indicators[0].parentElement).toBe(root);

  const payments = tab('Payments, 3');
  expect(payments).toHaveAttribute('aria-selected', 'false');
  expect(payments).toHaveAttribute('tabindex', '-1');
  expect(payments).not.toHaveClass('ods-tab__item--selected');
});

test('uses the given id, panel ids and class name', () => {
  setup({
    id: 'sections',
    className: 'custom-tab',
    tabs: [
      { label: 'Summary', panelId: 'summary-panel' },
      { label: 'Payments' },
    ],
  });

  expect(tablist()).toHaveAttribute('id', 'sections');
  expect(tablist()).toHaveClass('ods-tab', 'custom-tab');
  expect(tab('Summary')).toHaveAttribute('id', 'sections-tab-0');
  expect(tab('Summary')).toHaveAttribute('aria-controls', 'summary-panel');
  expect(tab('Payments')).toHaveAttribute('id', 'sections-tab-1');
  expect(tab('Payments')).not.toHaveAttribute('aria-controls');
});

test('shows the counter as a small Badge, primary when selected and neutral otherwise', () => {
  setup({ selectedIndex: 1 });

  const selected = tab('Payments, 3').querySelector('.ods-badge');
  expect(selected).toHaveClass(
    'ods-tab__count',
    'ods-badge--small',
    'ods-badge--brand'
  );
  expect(selected).not.toHaveAttribute('role');

  const other = tab('Receipts, 99+').querySelector('.ods-badge');
  expect(other).toHaveClass('ods-badge--small', 'ods-badge--neutral');
  expect(tab('Summary').querySelector('.ods-badge')).not.toBeInTheDocument();
});

test('forwards the ref to the root as an object or a function', () => {
  const objectRef = React.createRef<HTMLDivElement>();
  const { unmount } = render(
    <Tab ref={objectRef} tabs={tabs} selectedIndex={0} onChange={jest.fn()} />
  );
  expect(objectRef.current).toBe(tablist());
  unmount();

  const functionRef = jest.fn();
  render(
    <Tab ref={functionRef} tabs={tabs} selectedIndex={0} onChange={jest.fn()} />
  );
  expect(functionRef).toHaveBeenCalledWith(tablist());
});

test('calls onChange when an unselected tab is clicked', () => {
  const { onChange } = setup();

  fireEvent.click(tab('Summary'));
  expect(onChange).not.toHaveBeenCalled();

  fireEvent.click(tab('Payments, 3'));
  expect(onChange).toHaveBeenCalledWith(1);
});

const Controlled = ({
  onChange,
  onKeyDown,
}: {
  onChange: (index: number) => void;
  onKeyDown: () => void;
}) => {
  const [selected, setSelected] = React.useState(0);
  return (
    <Tab
      tabs={tabs}
      selectedIndex={selected}
      onKeyDown={onKeyDown}
      onChange={(index) => {
        onChange(index);
        setSelected(index);
      }}
    />
  );
};

test('moves focus and selection with the arrow, Home and End keys', () => {
  const onKeyDown = jest.fn();
  const onChange = jest.fn();
  render(<Controlled onChange={onChange} onKeyDown={onKeyDown} />);

  tab('Summary').focus();
  fireEvent.keyDown(tab('Summary'), { key: 'ArrowRight' });
  expect(onChange).toHaveBeenLastCalledWith(1);
  expect(tab('Payments, 3')).toHaveFocus();
  expect(tab('Payments, 3')).toHaveAttribute('aria-selected', 'true');
  expect(tab('Payments, 3')).toHaveAttribute('tabindex', '0');

  fireEvent.keyDown(tab('Payments, 3'), { key: 'End' });
  expect(onChange).toHaveBeenLastCalledWith(2);
  expect(tab('Receipts, 99+')).toHaveFocus();

  fireEvent.keyDown(tab('Receipts, 99+'), { key: 'ArrowRight' });
  expect(onChange).toHaveBeenLastCalledWith(0);
  expect(tab('Summary')).toHaveFocus();

  fireEvent.keyDown(tab('Summary'), { key: 'ArrowLeft' });
  expect(onChange).toHaveBeenLastCalledWith(2);
  expect(tab('Receipts, 99+')).toHaveFocus();

  fireEvent.keyDown(tab('Receipts, 99+'), { key: 'ArrowLeft' });
  expect(onChange).toHaveBeenLastCalledWith(1);

  fireEvent.keyDown(tab('Payments, 3'), { key: 'Home' });
  expect(onChange).toHaveBeenLastCalledWith(0);
  expect(tab('Summary')).toHaveFocus();

  onChange.mockClear();
  fireEvent.keyDown(tab('Summary'), { key: 'Home' });
  fireEvent.keyDown(tab('Summary'), { key: 'Enter' });
  expect(onChange).not.toHaveBeenCalled();
  expect(onKeyDown).toHaveBeenCalledTimes(8);
});

test('keeps the first tab reachable when selectedIndex is out of range', () => {
  const { rerender } = setup({ selectedIndex: -1 });
  expect(tab('Summary')).toHaveAttribute('tabindex', '0');
  expect(tab('Summary')).toHaveAttribute('aria-selected', 'false');

  rerender(<Tab tabs={tabs} selectedIndex={5} onChange={jest.fn()} />);
  expect(tab('Summary')).toHaveAttribute('tabindex', '0');
});

test('renders an empty bar without tabs', () => {
  render(<Tab tabs={[]} selectedIndex={0} onChange={jest.fn()} />);

  expect(tablist()).toBeEmptyDOMElement();
});

test('lets more than three tabs size to their content', () => {
  setup({ tabs: manyTabs });
  expect(tablist()).not.toHaveClass('ods-tab--fill');
});

test('reads a missing padding as zero', () => {
  jest.spyOn(window, 'getComputedStyle').mockReturnValue({
    paddingLeft: '',
    paddingRight: '',
  } as CSSStyleDeclaration);
  jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(375);
  setup();
  expect(tablist()).toHaveClass('ods-tab--fill');
});

test('stops sharing the width when a label does not fit its share', () => {
  jest
    .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockReturnValue({ width: 120 } as DOMRect);
  jest.spyOn(window, 'getComputedStyle').mockReturnValue({
    paddingLeft: '16px',
    paddingRight: '16px',
  } as CSSStyleDeclaration);
  jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(375);

  setup();
  expect(tablist()).not.toHaveClass('ods-tab--fill');
});

test('measures again when the window is resized', () => {
  const width = jest
    .spyOn(HTMLElement.prototype, 'clientWidth', 'get')
    .mockReturnValue(375);
  jest
    .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockReturnValue({ width: 100 } as DOMRect);

  setup();
  expect(tablist()).toHaveClass('ods-tab--fill');

  width.mockReturnValue(200);
  act(() => {
    window.dispatchEvent(new Event('resize'));
  });
  expect(tablist()).not.toHaveClass('ods-tab--fill');
});

test('observes the bar and the tab contents with ResizeObserver when available', () => {
  const observe = jest.fn();
  const disconnect = jest.fn();
  let callback: () => void = () => undefined;
  const original = window.ResizeObserver;
  window.ResizeObserver = jest.fn((cb: () => void) => {
    callback = cb;
    return { observe, disconnect, unobserve: jest.fn() };
  }) as unknown as typeof ResizeObserver;
  const width = jest
    .spyOn(HTMLElement.prototype, 'clientWidth', 'get')
    .mockReturnValue(375);
  jest
    .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockReturnValue({ width: 100 } as DOMRect);

  const { rerender, unmount } = setup();
  expect(observe).toHaveBeenCalledWith(tablist());
  expect(observe).toHaveBeenCalledTimes(4);

  width.mockReturnValue(200);
  act(() => callback());
  expect(tablist()).not.toHaveClass('ods-tab--fill');

  rerender(
    <Tab tabs={tabs.slice(0, 2)} selectedIndex={0} onChange={jest.fn()} />
  );
  expect(disconnect).toHaveBeenCalledTimes(1);
  expect(observe).toHaveBeenCalledTimes(7);

  unmount();
  expect(disconnect).toHaveBeenCalledTimes(2);
  window.ResizeObserver = original;
});

type FrameCallback = (time: number) => void;

const mockScrollGeometry = () => {
  const offsets: Record<string, number> = {
    Summary: 32,
    Payments: 200,
    Receipts: 400,
    Invoices: 600,
  };
  jest
    .spyOn(HTMLElement.prototype, 'offsetLeft', 'get')
    .mockImplementation(function offsetLeft(this: HTMLElement) {
      return offsets[this.textContent ?? ''] ?? 0;
    });
  jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(120);
  jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(400);
  jest.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockReturnValue(1000);
  const frames: FrameCallback[] = [];
  jest
    .spyOn(window, 'requestAnimationFrame')
    .mockImplementation((callback) => frames.push(callback));
  const cancel = jest
    .spyOn(window, 'cancelAnimationFrame')
    .mockImplementation(() => undefined);
  const runFrame = (time: number) =>
    act(() => (frames.shift() as FrameCallback)(time));
  return { frames, cancel, runFrame };
};

const renderScroll = (selectedIndex: number) => (
  <Tab tabs={manyTabs} selectedIndex={selectedIndex} onChange={jest.fn()} />
);

test('centers a hidden selected tab at once on the first render', () => {
  const { frames } = mockScrollGeometry();
  render(renderScroll(3));

  expect(tablist().scrollLeft).toBe(600 + 60 - 200);
  expect(frames).toHaveLength(0);
});

test('eases the bar scroll toward a hidden selected tab', () => {
  const { frames, runFrame } = mockScrollGeometry();
  const { rerender } = render(renderScroll(3));
  const root = tablist();

  rerender(renderScroll(0));
  expect(root.scrollLeft).toBe(460);
  runFrame(1000);
  expect(root.scrollLeft).toBe(460);
  runFrame(1100);
  expect(root.scrollLeft).toBe(460 - 460 * 0.0625);
  runFrame(1300);
  expect(root.scrollLeft).toBe(460 - 460 * 0.9375);
  runFrame(1500);
  expect(root.scrollLeft).toBe(0);
  expect(frames).toHaveLength(0);
});

test('keeps the bar still when the selected tab is fully visible', () => {
  const { frames } = mockScrollGeometry();
  const { rerender } = render(renderScroll(0));

  rerender(renderScroll(1));
  expect(tablist().scrollLeft).toBe(0);
  expect(frames).toHaveLength(0);
});

test('cancels the scroll in progress when the selection changes again', () => {
  const { cancel, runFrame } = mockScrollGeometry();
  const { rerender } = render(renderScroll(0));

  rerender(renderScroll(3));
  runFrame(0);
  rerender(renderScroll(2));
  expect(cancel).toHaveBeenCalled();
});

test('scrolls at once when the person prefers reduced motion', () => {
  const { frames } = mockScrollGeometry();
  const matchMedia = jest.fn().mockReturnValue({ matches: true });
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: matchMedia,
  });
  const { rerender } = render(renderScroll(0));

  rerender(renderScroll(3));
  expect(matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
  expect(tablist().scrollLeft).toBe(460);
  expect(frames).toHaveLength(0);

  matchMedia.mockReturnValue({ matches: false });
  rerender(renderScroll(0));
  expect(frames).toHaveLength(1);
  delete (window as { matchMedia?: unknown }).matchMedia;
});

const indicator = () =>
  tablist().querySelector('.ods-tab__indicator') as HTMLElement;

const mockTabGeometry = () => {
  const geometry: Record<string, [number, number]> = {
    Summary: [0, 100],
    Payments: [100, 140],
    Receipts: [240, 120],
  };
  const of = (element: HTMLElement) =>
    geometry[element.textContent?.replace(/[\d+]/g, '') ?? ''] ?? [0, 0];
  jest
    .spyOn(HTMLElement.prototype, 'offsetLeft', 'get')
    .mockImplementation(function offsetLeft(this: HTMLElement) {
      return of(this)[0];
    });
  const width = jest
    .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
    .mockImplementation(function offsetWidth(this: HTMLElement) {
      return of(this)[1];
    });
  return { geometry, width };
};

test('places one selection line under the selected tab and slides it on change', () => {
  mockTabGeometry();
  const { rerender } = setup({ selectedIndex: 1 });

  expect(indicator()).toHaveStyle({
    transform: 'translateX(100px)',
    width: '140px',
  });
  expect(indicator()).not.toHaveClass('ods-tab__indicator--animated');

  rerender(<Tab tabs={tabs} selectedIndex={2} onChange={jest.fn()} />);
  expect(indicator()).toHaveStyle({
    transform: 'translateX(240px)',
    width: '120px',
  });
  expect(indicator()).toHaveClass('ods-tab__indicator--animated');
});

test('hides the selection line when no tab is selected', () => {
  const { rerender } = setup({ selectedIndex: -1 });
  expect(indicator()).not.toBeInTheDocument();

  rerender(<Tab tabs={tabs} selectedIndex={0} onChange={jest.fn()} />);
  expect(indicator()).toBeInTheDocument();
  expect(indicator()).not.toHaveClass('ods-tab__indicator--animated');
});

test('moves the selection line again on resize and after the fonts load', async () => {
  const { geometry } = mockTabGeometry();
  let fontsLoaded: () => void = () => undefined;
  const ready = new Promise<void>((resolve) => {
    fontsLoaded = resolve;
  });
  Object.defineProperty(document, 'fonts', {
    configurable: true,
    value: { ready },
  });

  setup({ selectedIndex: 1 });
  geometry.Payments = [110, 150];
  act(() => {
    window.dispatchEvent(new Event('resize'));
  });
  expect(indicator()).toHaveStyle({
    transform: 'translateX(110px)',
    width: '150px',
  });

  act(() => {
    window.dispatchEvent(new Event('resize'));
  });
  expect(indicator()).toHaveStyle({ width: '150px' });

  geometry.Payments = [120, 160];
  await act(async () => {
    fontsLoaded();
    await ready;
  });
  expect(indicator()).toHaveStyle({
    transform: 'translateX(120px)',
    width: '160px',
  });

  delete (document as { fonts?: unknown }).fonts;
});

test('ignores the fonts after the bar is gone', async () => {
  let fontsLoaded: () => void = () => undefined;
  const ready = new Promise<void>((resolve) => {
    fontsLoaded = resolve;
  });
  Object.defineProperty(document, 'fonts', {
    configurable: true,
    value: { ready },
  });
  const { unmount } = setup();
  unmount();
  expect(screen.queryByRole('tablist')).not.toBeInTheDocument();

  await act(async () => {
    fontsLoaded();
    await ready;
  });
  delete (document as { fonts?: unknown }).fonts;
});
