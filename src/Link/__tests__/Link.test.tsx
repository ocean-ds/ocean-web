import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter as Router, Link } from 'react-router-dom';

import Link from '../Link';

test('renders element properly', () => {
  const { getByTestId } = render(
    <Link data-testid="lnk-test" className="custom-class">
      Hello
    </Link>
  );

  expect(getByTestId('lnk-test')).toMatchInlineSnapshot(`
    <a
      class="ods-lnk ods-lnk--md ods-lnk--primary custom-class"
      data-testid="lnk-test"
    >
      Hello
    </a>
  `);
});

test('renders a small a', () => {
  const { getByTestId } = render(<Link data-testid="lnk-test" size="sm" />);
  expect(getByTestId('lnk-test')).toHaveClass('ods-lnk--sm');
});

test('renders a medium a', () => {
  const { getByTestId } = render(<Link data-testid="lnk-test" size="md" />);
  expect(getByTestId('lnk-test')).toHaveClass('ods-lnk--md');
});

test('renders a large a', () => {
  const { getByTestId } = render(<Link data-testid="lnk-test" size="lg" />);
  expect(getByTestId('lnk-test')).toHaveClass('ods-lnk--lg');
});

test('renders primary a', () => {
  const { getByTestId } = render(
    <Link data-testid="lnk-test" variant="primary" />
  );

  expect(getByTestId('lnk-test').className).toBe(
    'ods-lnk ods-lnk--md ods-lnk--primary'
  );
});

test('renders secondary a', () => {
  const { getByTestId } = render(
    <Link data-testid="lnk-test" variant="secondary" />
  );

  expect(getByTestId('lnk-test').className).toBe(
    'ods-lnk ods-lnk--md ods-lnk--secondary'
  );
});

test('renders a text a', () => {
  const { getByTestId } = render(
    <Link data-testid="lnk-test" variant="text" />
  );

  expect(getByTestId('lnk-test').className).toBe(
    'ods-lnk ods-lnk--md ods-lnk--text'
  );
});

test('renders an inverse a', () => {
  const { getByTestId } = render(
    <Link data-testid="lnk-test" variant="inverse" />
  );
  expect(getByTestId('lnk-test')).toHaveClass('ods-lnk--inverse');
});

test('renders a full width a', () => {
  const { getByTestId } = render(<Link data-testid="lnk-test" blocked />);
  expect(getByTestId('lnk-test')).toHaveClass('ods-lnk--blocked');
});

test('renders a link a', () => {
  const { getByTestId } = render(
    <Router>
      <Link data-testid="lnk-test" component={Link} to="/teste/1234">
        Link
      </Link>
    </Router>
  );

  expect(getByTestId('lnk-test')).toMatchInlineSnapshot(`
    <a
      class="ods-lnk ods-lnk--md ods-lnk--primary"
      data-testid="lnk-test"
      href="/teste/1234"
    >
      Link
    </a>
  `);
});
