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
  expect(summary.querySelector('.ods-tab__indicator')).toHaveAttribute(
    'aria-hidden',
    'true'
  );

  const payments = tab('Payments 3');
  expect(payments).toHaveAttribute('aria-selected', 'false');
  expect(payments).toHaveAttribute('tabindex', '-1');
  expect(payments).not.toHaveClass('ods-tab__item--selected');
  expect(payments.querySelector('.ods-tab__indicator')).not.toBeInTheDocument();
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

  const selected = tab('Payments 3').querySelector('.ods-badge');
  expect(selected).toHaveClass(
    'ods-tab__count',
    'ods-badge--small',
    'ods-badge--brand'
  );
  expect(selected).not.toHaveAttribute('role');

  const other = tab('Receipts 99+').querySelector('.ods-badge');
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

  fireEvent.click(tab('Payments 3'));
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
  expect(tab('Payments 3')).toHaveFocus();
  expect(tab('Payments 3')).toHaveAttribute('aria-selected', 'true');
  expect(tab('Payments 3')).toHaveAttribute('tabindex', '0');

  fireEvent.keyDown(tab('Payments 3'), { key: 'End' });
  expect(onChange).toHaveBeenLastCalledWith(2);
  expect(tab('Receipts 99+')).toHaveFocus();

  fireEvent.keyDown(tab('Receipts 99+'), { key: 'ArrowRight' });
  expect(onChange).toHaveBeenLastCalledWith(0);
  expect(tab('Summary')).toHaveFocus();

  fireEvent.keyDown(tab('Summary'), { key: 'ArrowLeft' });
  expect(onChange).toHaveBeenLastCalledWith(2);
  expect(tab('Receipts 99+')).toHaveFocus();

  fireEvent.keyDown(tab('Receipts 99+'), { key: 'ArrowLeft' });
  expect(onChange).toHaveBeenLastCalledWith(1);

  fireEvent.keyDown(tab('Payments 3'), { key: 'Home' });
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

test('scrolls the bar so the selected tab is visible', () => {
  const offsets: Record<string, number> = {
    Summary: 32,
    Payments: 200,
    Receipts: 400,
  };
  jest
    .spyOn(HTMLElement.prototype, 'offsetLeft', 'get')
    .mockImplementation(function offsetLeft(this: HTMLElement) {
      return offsets[this.textContent?.replace(/\d|\+/g, '') ?? ''] ?? 0;
    });
  jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(120);
  jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(375);
  jest.spyOn(window, 'getComputedStyle').mockReturnValue({
    paddingLeft: '32px',
    paddingRight: '32px',
  } as CSSStyleDeclaration);

  const { rerender } = setup({ tabs: manyTabs, selectedIndex: 0 });
  const root = tablist();
  expect(root.scrollLeft).toBe(0);

  const renderSelected = (selectedIndex: number) =>
    rerender(
      <Tab
        tabs={[
          { label: 'Summary' },
          { label: 'Payments' },
          { label: 'Receipts' },
          { label: 'Invoices' },
        ]}
        selectedIndex={selectedIndex}
        onChange={jest.fn()}
      />
    );

  renderSelected(2);
  expect(root.scrollLeft).toBe(400 + 120 + 32 - 375);

  renderSelected(1);
  expect(root.scrollLeft).toBe(200 - 32);

  renderSelected(0);
  expect(root.scrollLeft).toBe(0);
});
