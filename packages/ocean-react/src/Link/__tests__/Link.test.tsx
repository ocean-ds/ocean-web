import React from 'react';
import { render, screen } from '@testing-library/react';
import Link from '../Link';

test('renders element properly', () => {
  render(
    <Link data-testid="link-test" className="custom-class">
      Click here!
    </Link>
  );

  expect(screen.getByTestId('link-test')).toMatchInlineSnapshot(`
    <a
      class="ods-link ods-link--md ods-link--primary custom-class"
      data-testid="link-test"
    >
      <span
        class="ods-link__content"
      >
        Click here!
      </span>
    </a>
  `);
});

test('renders an inverse link', () => {
  render(<Link data-testid="link-test" variant="inverse" />);
  expect(screen.getByTestId('link-test')).toHaveClass('ods-link--inverse');
});

test('renders a small link', () => {
  render(<Link data-testid="link-test" size="sm" />);
  expect(screen.getByTestId('link-test')).toHaveClass('ods-link--sm');
});

test('renders a medium link', () => {
  render(<Link data-testid="link-test" size="md" />);
  expect(screen.getByTestId('link-test')).toHaveClass('ods-link--md');
});
