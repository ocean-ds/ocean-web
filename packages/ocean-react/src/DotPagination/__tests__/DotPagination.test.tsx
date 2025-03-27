import React from 'react';
import { render, screen } from '@testing-library/react';
import DotPagination, { IDotPagination } from '../DotPagination';

const setup = (props: IDotPagination = { items: 4, activeItem: 1 }) =>
  render(<DotPagination {...props} />);

test.each([1, 2, 3] as const)(
  'renders each activeItem option',
  (activeItem) => {
    setup({ activeItem, items: 4 });

    expect(screen.getByTestId(`dot-active-${activeItem}`)).toBeInTheDocument();
  }
);

test('renders the first activeItem items two', () => {
  setup({ activeItem: 1, items: 2 });

  expect(document.firstChild).toMatchInlineSnapshot(`DocumentType {}`);
});

test('renders the first activeItem items three', () => {
  setup({ activeItem: 1, items: 3 });

  expect(document.firstChild).toMatchInlineSnapshot(`DocumentType {}`);
});

test('renders the second activeItem items three', () => {
  setup({ activeItem: 2, items: 3 });

  expect(document.firstChild).toMatchInlineSnapshot(`DocumentType {}`);
});

test('renders the fourth activeItem items four', () => {
  setup({ activeItem: 4, items: 4 });

  expect(document.firstChild).toMatchInlineSnapshot(`DocumentType {}`);
});
test('handles dot click and updates activeDot', () => {
  setup({ activeItem: 0, items: 3 });

  const dotToClick = screen.getByTestId('dot-1');
  dotToClick.click();

  expect(screen.getByTestId('dot-1')).toHaveClass(
    'dot-pagination__dot--active'
  );
});
