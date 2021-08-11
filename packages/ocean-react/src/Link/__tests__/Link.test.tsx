import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router, Link as RouterLink } from 'react-router-dom';

import Link from '../Link';

test('renders element properly', () => {
  render(
    <Link data-testid="lnk-test" className="custom-class">
      Click here!
    </Link>
  );

  expect(screen.getByTestId('lnk-test')).toMatchInlineSnapshot(`
    <a
      class="ods-lnk ods-lnk--md custom-class"
      data-testid="lnk-test"
    >
      Click here!
    </a>
  `);
});

test('renders an inverse link', () => {
  render(<Link data-testid="lnk-test" inverse />);
  expect(screen.getByTestId('lnk-test')).toHaveClass('ods-lnk--inverse');
});

test('renders a link with router', () => {
  render(
    <Router>
      <Link data-testid="lnk-test" component={RouterLink} to="/teste/1234">
        Link
      </Link>
    </Router>
  );

  expect(screen.getByTestId('lnk-test')).toMatchInlineSnapshot(`
    <a
      class="ods-lnk ods-lnk--md"
      data-testid="lnk-test"
      href="/teste/1234"
    >
      Link
    </a>
  `);
});

test('renders a small link', () => {
  render(<Link data-testid="lnk-test" size="sm" />);
  expect(screen.getByTestId('lnk-test')).toHaveClass('ods-lnk--sm');
});

test('renders a medium link', () => {
  render(<Link data-testid="lnk-test" size="md" />);
  expect(screen.getByTestId('lnk-test')).toHaveClass('ods-lnk--md');
});
