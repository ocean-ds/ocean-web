import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { CalendarOutline, ViewListOutline } from '@useblu/ocean-icons-react';

import FilterBar, {
  ALL_FILTERS_LABEL,
  FILTER_BAR_MOBILE_QUERY,
} from '../FilterBar';
import type { FilterBarProps } from '../types';
import type { SegmentedControlProps } from '../../SegmentedControl';
import FilterBarFromIndex from '..';

const filters: FilterBarProps['filters'] = [
  { label: 'Paid' },
  { label: 'Pending' },
  {
    label: 'Status',
    options: [
      { label: 'Overdue', value: 'overdue' },
      { label: 'Due today', value: 'today' },
    ],
  },
];

const segmentedControl = (
  props: Partial<SegmentedControlProps> = {}
): SegmentedControlProps => ({
  'aria-label': 'Scope',
  options: [
    { label: 'Store', icon: <ViewListOutline />, count: 3 },
    { label: 'Network', icon: <CalendarOutline />, count: 12 },
  ],
  selectedIndex: 0,
  onChange: jest.fn(),
  ...props,
});

type Listener = () => void;

/** Fakes `window.matchMedia` for the mobile query; returns a function to change it. */
const mockViewport = (mobile: boolean) => {
  let matches = mobile;
  const listeners = new Set<Listener>();
  const query = {
    get matches() {
      return matches;
    },
    media: FILTER_BAR_MOBILE_QUERY,
    addEventListener: jest.fn((_: string, listener: Listener) =>
      listeners.add(listener)
    ),
    removeEventListener: jest.fn((_: string, listener: Listener) =>
      listeners.delete(listener)
    ),
  };
  const matchMedia = jest.fn().mockReturnValue(query);
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: matchMedia,
  });
  return {
    matchMedia,
    query,
    resize: (nextMobile: boolean) => {
      matches = nextMobile;
      act(() => listeners.forEach((listener) => listener()));
    },
  };
};

const bar = (container: HTMLElement) =>
  container.querySelector('.ods-filter-bar') as HTMLElement;

afterEach(() => {
  // jsdom has no matchMedia: remove the fake after each test.
  delete (window as { matchMedia?: unknown }).matchMedia;
  jest.restoreAllMocks();
});

test('is the default export of the folder', () => {
  expect(FilterBarFromIndex).toBe(FilterBar);
});

test('renders only the chips by default, in order, with no divider', () => {
  const { container } = render(<FilterBar filters={filters} />);

  const root = bar(container);
  expect(root).toHaveAttribute('role', 'group');
  expect(root).toHaveClass('ods-filter-bar');
  expect(root).not.toHaveClass('ods-filter-bar--all-filters');
  expect(root).not.toHaveClass('ods-filter-bar--segmented');

  const chips = root.querySelectorAll(
    '.ods-filter-bar__chips > .ods-chips .ods-chips__label'
  );
  expect(Array.from(chips).map((chip) => chip.textContent)).toEqual([
    'Paid',
    'Pending',
    'Status',
  ]);
  expect(root.querySelector('.ods-filter-bar__divider')).toBeNull();
  expect(root.querySelector('.ods-filter-bar__all-filters')).toBeNull();
  expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument();
});

test('passes the Chips props to each chip', () => {
  const onClick = jest.fn();
  render(
    <FilterBar
      filters={[
        { label: 'Paid', onClick, actived: true, initialCounter: 2 },
        { label: 'Canceled', disabled: true },
      ]}
    />
  );

  const paid = screen.getByRole('button', { name: /Paid/ });
  expect(paid).toHaveClass('ods-chips__button--active');
  expect(paid).toHaveTextContent('2');
  fireEvent.click(paid);
  expect(onClick).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('button', { name: 'Canceled' })).toBeDisabled();
});

test('opens the options of a filter chip', () => {
  render(<FilterBar filters={filters} />);

  fireEvent.click(screen.getByRole('button', { name: 'Status' }));

  expect(screen.getByText('Overdue')).toBeInTheDocument();
});

test('renders "All filters" after a divider, with the default text, icon and counter', () => {
  const onClick = jest.fn();
  const { container } = render(
    <FilterBar filters={filters} allFilters={{ count: 2, onClick }} />
  );

  const root = bar(container);
  expect(root).toHaveClass('ods-filter-bar--all-filters');
  const divider = root.querySelector(
    '.ods-filter-bar__filters > .ods-filter-bar__divider--all-filters'
  );
  expect(divider).toHaveAttribute('aria-hidden', 'true');
  expect(divider?.nextElementSibling).toHaveClass(
    'ods-filter-bar__all-filters'
  );

  const allFilters = screen.getByRole('button', {
    name: `${ALL_FILTERS_LABEL} 2`,
  });
  expect(ALL_FILTERS_LABEL).toBe('Todos os filtros');
  expect(allFilters).toHaveClass('ods-chips__button--no-options');
  expect(allFilters.querySelector('svg')).toBeInTheDocument();
  fireEvent.click(allFilters);
  expect(onClick).toHaveBeenCalledTimes(1);
});

test('uses the given "All filters" text and hides the counter without filters applied', () => {
  render(
    <FilterBar
      filters={filters}
      allFilters={{ label: 'All filters', onClick: jest.fn() }}
    />
  );

  const allFilters = screen.getByRole('button', { name: 'All filters' });
  expect(allFilters.querySelector('.ods-badge')).toBeNull();
});

test('renders the Segmented Control fixed on the right, after a divider', () => {
  const props = segmentedControl();
  const { container } = render(
    <FilterBar filters={filters} segmentedControl={props} />
  );

  const root = bar(container);
  expect(root).toHaveClass('ods-filter-bar--segmented');
  const divider = root.querySelector(':scope > .ods-filter-bar__divider');
  expect(divider).toHaveClass('ods-filter-bar__divider--segmented');
  expect(divider).toHaveAttribute('aria-hidden', 'true');
  expect(divider?.nextElementSibling).toHaveClass('ods-filter-bar__segmented');

  const group = screen.getByRole('radiogroup', { name: 'Scope' });
  expect(root.lastElementChild).toContainElement(group);

  fireEvent.click(screen.getByRole('radio', { name: /Network/ }));
  expect(props.onChange).toHaveBeenCalledWith(1);
});

test('keeps the Segmented Control icons and counters on desktop', () => {
  mockViewport(false);
  render(<FilterBar filters={filters} segmentedControl={segmentedControl()} />);

  expect(screen.getByRole('radio', { name: 'Store, 3' })).toBeInTheDocument();
  expect(
    screen
      .getByRole('radio', { name: 'Network, 12' })
      .querySelector('.ods-segmented-control__icon')
  ).toBeInTheDocument();
});

test('shows only the Segmented Control labels on mobile', () => {
  const { matchMedia } = mockViewport(true);
  const { container } = render(
    <FilterBar filters={filters} segmentedControl={segmentedControl()} />
  );

  expect(matchMedia).toHaveBeenCalledWith('(max-width: 767.98px)');
  expect(screen.getByRole('radio', { name: 'Store' })).toBeInTheDocument();
  expect(screen.getByRole('radio', { name: 'Network' })).toBeInTheDocument();
  expect(
    bar(container).querySelector('.ods-segmented-control__icon')
  ).toBeNull();
  expect(
    bar(container).querySelector('.ods-segmented-control__count')
  ).toBeNull();
});

test('follows the viewport when it crosses the mobile breakpoint', () => {
  const viewport = mockViewport(false);
  const { container, unmount } = render(
    <FilterBar filters={filters} segmentedControl={segmentedControl()} />
  );
  expect(
    bar(container).querySelector('.ods-segmented-control__count')
  ).not.toBeNull();

  viewport.resize(true);
  expect(
    bar(container).querySelector('.ods-segmented-control__count')
  ).toBeNull();

  viewport.resize(false);
  expect(
    bar(container).querySelector('.ods-segmented-control__count')
  ).not.toBeNull();

  unmount();
  expect(viewport.query.removeEventListener).toHaveBeenCalledWith(
    'change',
    expect.any(Function)
  );
});

test('renders chips, "All filters" and the Segmented Control together', () => {
  const { container } = render(
    <FilterBar
      filters={filters}
      allFilters={{ onClick: jest.fn() }}
      segmentedControl={segmentedControl()}
    />
  );

  const root = bar(container);
  expect(root).toHaveClass(
    'ods-filter-bar--all-filters',
    'ods-filter-bar--segmented'
  );
  expect(Array.from(root.children).map((child) => child.className)).toEqual([
    'ods-filter-bar__filters',
    'ods-filter-bar__divider ods-filter-bar__divider--segmented',
    'ods-filter-bar__segmented',
  ]);
  expect(
    Array.from(
      root.querySelector('.ods-filter-bar__filters')?.children ?? []
    ).map((child) => child.className)
  ).toEqual([
    'ods-filter-bar__chips',
    'ods-filter-bar__divider ods-filter-bar__divider--all-filters',
    'ods-filter-bar__all-filters',
  ]);
});

test('keeps long texts whole', () => {
  const label = 'Receivables due in the next thirty days';
  render(
    <FilterBar
      filters={[{ label }]}
      segmentedControl={segmentedControl({
        options: [
          { label: 'Receivables of this store' },
          { label: 'Receivables of the whole network' },
        ],
      })}
    />
  );

  expect(screen.getByRole('button', { name: label })).toHaveTextContent(label);
  expect(
    screen.getByRole('radio', { name: 'Receivables of the whole network' })
  ).toBeInTheDocument();
});

test('renders nothing without chips', () => {
  const { container } = render(
    <FilterBar
      filters={[] as unknown as FilterBarProps['filters']}
      allFilters={{ onClick: jest.fn() }}
    />
  );

  expect(container).toBeEmptyDOMElement();
});

test('forwards the ref, className and other attributes to the bar', () => {
  const ref = React.createRef<HTMLDivElement>();
  const { container } = render(
    <FilterBar
      ref={ref}
      filters={filters}
      className="custom"
      aria-label="Filters"
      data-testid="bar"
    />
  );

  const root = bar(container);
  expect(ref.current).toBe(root);
  expect(root).toHaveClass('ods-filter-bar', 'custom');
  expect(root).toHaveAttribute('aria-label', 'Filters');
  expect(root).toHaveAttribute('data-testid', 'bar');
});

test('anchors the chip popovers under the clicked chip and follows the scroll', () => {
  const onClickCapture = jest.fn();
  const onScrollCapture = jest.fn();
  const { container } = render(
    <FilterBar
      filters={filters}
      onClickCapture={onClickCapture}
      onScrollCapture={onScrollCapture}
    />
  );
  const root = bar(container);
  const chips = root.querySelector('.ods-filter-bar__chips') as HTMLElement;
  const status = screen.getByRole('button', { name: 'Status' });
  const rect = (left: number, top: number, width: number, height: number) =>
    ({
      left,
      top,
      right: left + width,
      bottom: top + height,
      width,
      height,
      x: left,
      y: top,
      toJSON: () => ({}),
    } as DOMRect);
  jest
    .spyOn(root, 'getBoundingClientRect')
    .mockReturnValue(rect(100, 50, 600, 80));
  const chip = status.closest('.ods-chips') as HTMLElement;
  const chipRect = jest
    .spyOn(chip, 'getBoundingClientRect')
    .mockReturnValue(rect(300, 74, 90, 32));

  // A click outside the chips keeps the popover where it is.
  fireEvent.click(root);
  expect(root.style.getPropertyValue('--ods-filter-bar-popover-left')).toBe('');

  fireEvent.click(status);
  expect(root.style.getPropertyValue('--ods-filter-bar-popover-left')).toBe(
    '200px'
  );
  expect(root.style.getPropertyValue('--ods-filter-bar-popover-top')).toBe(
    '56px'
  );
  expect(onClickCapture).toHaveBeenCalledTimes(2);

  chipRect.mockReturnValue(rect(250, 74, 90, 32));
  fireEvent.scroll(chips);
  expect(root.style.getPropertyValue('--ods-filter-bar-popover-left')).toBe(
    '150px'
  );
  expect(onScrollCapture).toHaveBeenCalledTimes(1);
});

test('accepts a callback ref', () => {
  const ref = jest.fn();
  const { container, unmount } = render(
    <FilterBar ref={ref} filters={filters} />
  );

  expect(ref).toHaveBeenCalledWith(bar(container));
  // Scrolling before any chip was clicked moves nothing.
  fireEvent.scroll(
    bar(container).querySelector('.ods-filter-bar__chips') as HTMLElement
  );
  expect(
    bar(container).style.getPropertyValue('--ods-filter-bar-popover-left')
  ).toBe('');
  unmount();
  expect(ref).toHaveBeenLastCalledWith(null);
});

describe('Shift + wheel', () => {
  /** Makes a scrolling area of the bar 500 wide inside 200, with a writable scrollLeft. */
  const scrollable = (element: HTMLElement) => {
    let left = 0;
    element.style.overflowX = 'auto';
    Object.defineProperty(element, 'scrollWidth', { value: 500 });
    Object.defineProperty(element, 'clientWidth', { value: 200 });
    Object.defineProperty(element, 'scrollLeft', {
      get: () => left,
      set: (value: number) => {
        left = value;
      },
    });
    return element;
  };
  const wheel = (
    target: Element,
    init: ConstructorParameters<typeof WheelEvent>[1]
  ) => {
    const event = new WheelEvent('wheel', {
      bubbles: true,
      cancelable: true,
      ...init,
    });
    target.dispatchEvent(event);
    return event;
  };

  test('scrolls the chips sideways with Shift + vertical wheel, within the scroll range', () => {
    const { container } = render(
      <FilterBar filters={filters} segmentedControl={segmentedControl()} />
    );
    const chips = scrollable(
      bar(container).querySelector('.ods-filter-bar__chips') as HTMLElement
    );
    const chip = screen.getByRole('button', { name: 'Paid' });

    const first = wheel(chip, { shiftKey: true, deltaY: 120 });
    expect(chips.scrollLeft).toBe(120);
    expect(first.defaultPrevented).toBe(true);

    wheel(chip, { shiftKey: true, deltaY: 400 });
    expect(chips.scrollLeft).toBe(300);

    // At the end of the range the wheel is left to the page.
    const atEnd = wheel(chip, { shiftKey: true, deltaY: 50 });
    expect(chips.scrollLeft).toBe(300);
    expect(atEnd.defaultPrevented).toBe(false);

    wheel(chip, { shiftKey: true, deltaY: -1000 });
    expect(chips.scrollLeft).toBe(0);
  });

  test('scrolls chips and "All filters" together when that area is the one that scrolls', () => {
    const { container } = render(
      <FilterBar filters={filters} allFilters={{ onClick: jest.fn() }} />
    );
    const area = scrollable(
      bar(container).querySelector('.ods-filter-bar__filters') as HTMLElement
    );

    wheel(screen.getByRole('button', { name: ALL_FILTERS_LABEL }), {
      shiftKey: true,
      deltaY: 80,
    });

    expect(area.scrollLeft).toBe(80);
  });

  test('leaves other wheels to the browser', () => {
    const { container, unmount } = render(
      <FilterBar filters={filters} segmentedControl={segmentedControl()} />
    );
    const root = bar(container);
    const chips = scrollable(
      root.querySelector('.ods-filter-bar__chips') as HTMLElement
    );
    const chip = screen.getByRole('button', { name: 'Paid' });

    [
      wheel(chip, { deltaY: 120 }),
      wheel(chip, { shiftKey: true, deltaX: 120, deltaY: 0 }),
      wheel(chip, { shiftKey: true, deltaX: 30, deltaY: 120 }),
      wheel(chip, { shiftKey: true, deltaY: 0 }),
      // Outside the scrolling area.
      wheel(screen.getByRole('radio', { name: /Store/ }), {
        shiftKey: true,
        deltaY: 120,
      }),
    ].forEach((event) => expect(event.defaultPrevented).toBe(false));
    expect(chips.scrollLeft).toBe(0);

    const remove = jest.spyOn(root, 'removeEventListener');
    unmount();
    expect(remove).toHaveBeenCalledWith('wheel', expect.any(Function));
  });
});
