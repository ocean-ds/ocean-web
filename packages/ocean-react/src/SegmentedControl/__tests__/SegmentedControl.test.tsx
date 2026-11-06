import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';

import SegmentedControl, {
  SegmentedControlIndex,
  SegmentedControlOption,
  SegmentedControlProps,
} from '../SegmentedControl';

type Options = [SegmentedControlOption, SegmentedControlOption];

const options: Options = [{ label: 'Store' }, { label: 'Network' }];

const setup = (props: Partial<SegmentedControlProps> = {}) => {
  const onChange = jest.fn();
  const utils = render(
    <SegmentedControl
      options={options}
      selectedIndex={0}
      onChange={onChange}
      aria-label="Scope"
      {...props}
    />
  );
  return { ...utils, onChange };
};

const group = () => screen.getByRole('radiogroup');
const radio = (name: RegExp | string) => screen.getByRole('radio', { name });
const selection = () =>
  group().querySelector('.ods-segmented-control__selection') as HTMLElement;

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders a radio group with two radios and the selected one checked', () => {
  setup();

  const root = group();
  expect(root).toHaveClass('ods-segmented-control');
  expect(root).toHaveAttribute('aria-label', 'Scope');
  expect(screen.getAllByRole('radio')).toHaveLength(2);

  const store = radio('Store');
  expect(store).toHaveAttribute('type', 'button');
  expect(store).toHaveAttribute('aria-checked', 'true');
  expect(store).toHaveAttribute('tabindex', '0');
  expect(store).toHaveClass(
    'ods-segmented-control__option',
    'ods-segmented-control__option--selected'
  );

  const network = radio('Network');
  expect(network).toHaveAttribute('aria-checked', 'false');
  expect(network).toHaveAttribute('tabindex', '-1');
  expect(network).not.toHaveClass('ods-segmented-control__option--selected');

  const backgrounds = root.querySelectorAll(
    '.ods-segmented-control__selection'
  );
  expect(backgrounds).toHaveLength(1);
  expect(backgrounds[0]).toHaveAttribute('aria-hidden', 'true');
  expect(backgrounds[0].parentElement).toBe(root);
});

test('passes the class name and the other attributes to the root', () => {
  setup({ className: 'custom-control', id: 'scope', title: 'Scope' });

  expect(group()).toHaveClass('ods-segmented-control', 'custom-control');
  expect(group()).toHaveAttribute('id', 'scope');
  expect(group()).toHaveAttribute('title', 'Scope');
});

test('forwards the ref to the root', () => {
  const ref = React.createRef<HTMLDivElement>();
  render(
    <SegmentedControl
      ref={ref}
      options={options}
      selectedIndex={0}
      onChange={jest.fn()}
    />
  );
  expect(ref.current).toBe(group());
});

test('selects the second option when selectedIndex is 1', () => {
  setup({ selectedIndex: 1 });

  expect(radio('Network')).toHaveAttribute('aria-checked', 'true');
  expect(radio('Network')).toHaveAttribute('tabindex', '0');
  expect(radio('Store')).toHaveAttribute('aria-checked', 'false');
  expect(radio('Store')).toHaveAttribute('tabindex', '-1');
});

test('selects the first option when selectedIndex is out of range', () => {
  setup({ selectedIndex: 5 as SegmentedControlIndex });

  expect(radio('Store')).toHaveAttribute('aria-checked', 'true');
  expect(radio('Network')).toHaveAttribute('aria-checked', 'false');
});

test('calls onChange only when the unselected option is clicked', () => {
  const { onChange } = setup();

  fireEvent.click(radio('Store'));
  expect(onChange).not.toHaveBeenCalled();

  fireEvent.click(radio('Network'));
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(1);
});

const Controlled = ({
  onChange,
  onKeyDown,
}: {
  onChange: (index: SegmentedControlIndex) => void;
  onKeyDown: () => void;
}) => {
  const [selected, setSelected] = React.useState<SegmentedControlIndex>(0);
  return (
    <SegmentedControl
      aria-label="Scope"
      options={options}
      selectedIndex={selected}
      onKeyDown={onKeyDown}
      onChange={(index) => {
        onChange(index);
        setSelected(index);
      }}
    />
  );
};

test('moves the focus and the selection with the arrow keys (roving tabindex)', () => {
  const onChange = jest.fn();
  const onKeyDown = jest.fn();
  render(<Controlled onChange={onChange} onKeyDown={onKeyDown} />);

  radio('Store').focus();
  fireEvent.keyDown(radio('Store'), { key: 'ArrowRight' });
  expect(onChange).toHaveBeenLastCalledWith(1);
  expect(radio('Network')).toHaveFocus();
  expect(radio('Network')).toHaveAttribute('aria-checked', 'true');
  expect(radio('Network')).toHaveAttribute('tabindex', '0');
  expect(radio('Store')).toHaveAttribute('tabindex', '-1');

  fireEvent.keyDown(radio('Network'), { key: 'ArrowRight' });
  expect(onChange).toHaveBeenLastCalledWith(0);
  expect(radio('Store')).toHaveFocus();

  fireEvent.keyDown(radio('Store'), { key: 'ArrowLeft' });
  expect(onChange).toHaveBeenLastCalledWith(1);
  expect(radio('Network')).toHaveFocus();

  fireEvent.keyDown(radio('Network'), { key: 'ArrowUp' });
  expect(onChange).toHaveBeenLastCalledWith(0);

  fireEvent.keyDown(radio('Store'), { key: 'ArrowDown' });
  expect(onChange).toHaveBeenLastCalledWith(1);
  expect(onChange).toHaveBeenCalledTimes(5);

  onChange.mockClear();
  fireEvent.keyDown(radio('Network'), { key: 'Enter' });
  fireEvent.keyDown(radio('Network'), { key: 'Home' });
  expect(onChange).not.toHaveBeenCalled();
  expect(onKeyDown).toHaveBeenCalledTimes(7);
});

test('prevents the page scroll on arrow keys only', () => {
  setup();

  const arrow = new KeyboardEvent('keydown', {
    key: 'ArrowDown',
    bubbles: true,
    cancelable: true,
  });
  radio('Store').dispatchEvent(arrow);
  expect(arrow.defaultPrevented).toBe(true);

  const tab = new KeyboardEvent('keydown', {
    key: 'Tab',
    bubbles: true,
    cancelable: true,
  });
  radio('Store').dispatchEvent(tab);
  expect(tab.defaultPrevented).toBe(false);
});

test('shows the icon only when it is given, hidden from screen readers', () => {
  setup({
    options: [
      { label: 'List', icon: <svg data-testid="list-icon" /> },
      { label: 'Calendar' },
    ],
  });

  const icon = radio('List').querySelector('.ods-segmented-control__icon');
  expect(icon).toHaveAttribute('aria-hidden', 'true');
  expect(icon).toContainElement(screen.getByTestId('list-icon'));
  expect(
    radio('Calendar').querySelector('.ods-segmented-control__icon')
  ).not.toBeInTheDocument();
});

test('shows the counter only when it is given, as a small primary Badge in the name', () => {
  setup({
    options: [{ label: 'Store', count: 3 }, { label: 'Network' }],
    selectedIndex: 1,
  });

  const badge = radio('Store, 3').querySelector('.ods-badge');
  expect(badge).toHaveClass(
    'ods-segmented-control__count',
    'ods-badge--small',
    'ods-badge--brand'
  );
  expect(badge).not.toHaveAttribute('role');
  expect(badge).toHaveTextContent('3');
  expect(radio('Network')).not.toHaveAttribute('aria-label');
  expect(radio('Network').querySelector('.ods-badge')).not.toBeInTheDocument();
});

test('reads a counter above 99 as 99+ and a zero counter as 0', () => {
  setup({
    options: [
      { label: 'Store', count: 120 },
      { label: 'Network', count: 0 },
    ],
  });

  expect(radio('Store, 99+')).toBeInTheDocument();
  expect(radio('Network, 0')).toBeInTheDocument();
});

test('keeps a long label whole in the label element, cut only by the ellipsis style', () => {
  const long = 'Receivables of the whole network in the last thirty days';
  setup({ options: [{ label: 'Store' }, { label: long }] });

  const label = radio(long).querySelector('.ods-segmented-control__label');
  expect(label).toHaveTextContent(long);
  expect(label?.textContent).toBe(long);
});

test('draws only the first two options of a longer list', () => {
  setup({
    options: [
      { label: 'Store' },
      { label: 'Network' },
      { label: 'Region' },
    ] as unknown as Options,
  });

  expect(screen.getAllByRole('radio')).toHaveLength(2);
  expect(
    screen.queryByRole('radio', { name: 'Region' })
  ).not.toBeInTheDocument();
});

test('handles a list with a single option without moving on arrow keys', () => {
  const { onChange } = setup({
    options: [{ label: 'Store' }] as unknown as Options,
  });

  fireEvent.keyDown(radio('Store'), { key: 'ArrowRight' });
  expect(onChange).not.toHaveBeenCalled();
  expect(radio('Store')).toHaveAttribute('aria-checked', 'true');
});

test('shows no selection background when the selected option is missing', () => {
  setup({
    options: [{ label: 'Store' }] as unknown as Options,
    selectedIndex: 1,
  });

  expect(selection()).toBeNull();
  expect(radio('Store')).toHaveAttribute('aria-checked', 'false');
});

const mockGeometry = () => {
  const geometry: Record<string, [number, number]> = {
    Store: [4, 80],
    Network: [88, 100],
  };
  const of = (element: HTMLElement) =>
    geometry[element.textContent ?? ''] ?? [0, 0];
  jest
    .spyOn(HTMLElement.prototype, 'offsetLeft', 'get')
    .mockImplementation(function offsetLeft(this: HTMLElement) {
      return of(this)[0];
    });
  jest
    .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
    .mockImplementation(function offsetWidth(this: HTMLElement) {
      return of(this)[1];
    });
  return geometry;
};

const rerenderWith = (index: SegmentedControlIndex) => (
  <SegmentedControl
    aria-label="Scope"
    options={options}
    selectedIndex={index}
    onChange={jest.fn()}
  />
);

test('places the selection background under the selected option and slides it on change', () => {
  mockGeometry();
  const { rerender } = setup();

  expect(selection()).toHaveStyle({
    transform: 'translateX(4px)',
    width: '80px',
  });
  expect(selection()).not.toHaveClass(
    'ods-segmented-control__selection--animated'
  );

  rerender(rerenderWith(1));
  expect(selection()).toHaveStyle({
    transform: 'translateX(88px)',
    width: '100px',
  });
  expect(selection()).toHaveClass('ods-segmented-control__selection--animated');
});

test('moves the background at once when the person prefers reduced motion', () => {
  mockGeometry();
  const matchMedia = jest.fn().mockReturnValue({ matches: true });
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: matchMedia,
  });
  const { rerender } = setup();

  rerender(rerenderWith(1));
  expect(matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
  expect(selection()).toHaveStyle({ transform: 'translateX(88px)' });
  expect(selection()).not.toHaveClass(
    'ods-segmented-control__selection--animated'
  );

  matchMedia.mockReturnValue({ matches: false });
  rerender(rerenderWith(0));
  expect(selection()).toHaveClass('ods-segmented-control__selection--animated');
  delete (window as { matchMedia?: unknown }).matchMedia;
});

test('places the background again on resize and keeps it when nothing moved', () => {
  const geometry = mockGeometry();
  setup();
  const before = selection();

  act(() => {
    window.dispatchEvent(new Event('resize'));
  });
  expect(selection()).toBe(before);
  expect(selection()).toHaveStyle({ width: '80px' });

  geometry.Store = [4, 90];
  act(() => {
    window.dispatchEvent(new Event('resize'));
  });
  expect(selection()).toHaveStyle({ width: '90px' });
  expect(selection()).not.toHaveClass(
    'ods-segmented-control__selection--animated'
  );
});

test('slides only on a change of selection, not when measured again', () => {
  const geometry = mockGeometry();
  const { rerender } = setup();

  rerender(rerenderWith(1));
  expect(selection()).toHaveClass('ods-segmented-control__selection--animated');

  geometry.Network = [88, 120];
  act(() => {
    window.dispatchEvent(new Event('resize'));
  });
  expect(selection()).toHaveStyle({
    transform: 'translateX(88px)',
    width: '120px',
  });
  expect(selection()).not.toHaveClass(
    'ods-segmented-control__selection--animated'
  );
});

test('stops listening to resize when unmounted', () => {
  const remove = jest.spyOn(window, 'removeEventListener');
  const { unmount } = setup();
  unmount();
  expect(remove).toHaveBeenCalledWith('resize', expect.any(Function));
});

test('observes the options with ResizeObserver when available', () => {
  const observe = jest.fn();
  const disconnect = jest.fn();
  let callback: () => void = () => undefined;
  const original = window.ResizeObserver;
  window.ResizeObserver = jest.fn((cb: () => void) => {
    callback = cb;
    return { observe, disconnect, unobserve: jest.fn() };
  }) as unknown as typeof ResizeObserver;
  const geometry = mockGeometry();

  const { rerender, unmount } = setup();
  expect(observe).toHaveBeenCalledTimes(2);
  expect(observe).toHaveBeenCalledWith(radio('Store'));

  geometry.Store = [4, 96];
  act(() => callback());
  expect(selection()).toHaveStyle({ width: '96px' });

  rerender(
    <SegmentedControl
      options={[{ label: 'Store' }, { label: 'Region' }]}
      selectedIndex={0}
      onChange={jest.fn()}
    />
  );
  expect(disconnect).toHaveBeenCalledTimes(1);
  expect(observe).toHaveBeenCalledTimes(4);

  unmount();
  expect(disconnect).toHaveBeenCalledTimes(2);
  act(() => callback());
  window.ResizeObserver = original;
});

test('places the background again after the fonts load, and not after unmount', async () => {
  const geometry = mockGeometry();
  let fontsLoaded: () => void = () => undefined;
  const ready = new Promise<void>((resolve) => {
    fontsLoaded = resolve;
  });
  Object.defineProperty(document, 'fonts', {
    configurable: true,
    value: { ready },
  });

  const { unmount } = setup();
  const { unmount: unmountSecond } = render(rerenderWith(0));
  unmountSecond();

  geometry.Store = [4, 110];
  await act(async () => {
    fontsLoaded();
    await ready;
  });
  expect(selection()).toHaveStyle({ width: '110px' });

  unmount();
  delete (document as { fonts?: unknown }).fonts;
});
