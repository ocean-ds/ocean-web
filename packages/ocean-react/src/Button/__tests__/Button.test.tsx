import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router, Link } from 'react-router-dom';

import Button from '../Button';

test('renders element properly', () => {
  render(
    <Button data-testid="btn-test" className="custom-class">
      Hello
    </Button>
  );

  expect(screen.getByTestId('btn-test')).toMatchInlineSnapshot(`
    <button
      class="ods-btn ods-btn--md ods-btn--primary custom-class"
      data-testid="btn-test"
    >
      Hello
    </button>
  `);
});

test('renders a small button', () => {
  render(<Button data-testid="btn-test" size="sm" />);
  expect(screen.getByTestId('btn-test')).toHaveClass('ods-btn--sm');
});

test('renders a medium button', () => {
  render(<Button data-testid="btn-test" size="md" />);
  expect(screen.getByTestId('btn-test')).toHaveClass('ods-btn--md');
});

test('renders a large button', () => {
  render(<Button data-testid="btn-test" size="lg" />);
  expect(screen.getByTestId('btn-test')).toHaveClass('ods-btn--lg');
});

test('renders primary button', () => {
  render(<Button data-testid="btn-test" variant="primary" />);

  expect(
    screen.getByTestId('btn-test')
  ).toHaveClass('ods-btn ods-btn--md ods-btn--primary', { exact: true });
});

test('renders secondary button', () => {
  render(<Button data-testid="btn-test" variant="secondary" />);

  expect(
    screen.getByTestId('btn-test')
  ).toHaveClass('ods-btn ods-btn--md ods-btn--secondary', { exact: true });
});

test('renders a text button', () => {
  render(<Button data-testid="btn-test" variant="text" />);

  expect(
    screen.getByTestId('btn-test')
  ).toHaveClass('ods-btn ods-btn--md ods-btn--text', { exact: true });
});

test('renders an inverse button', () => {
  render(<Button data-testid="btn-test" variant="inverse" />);
  expect(screen.getByTestId('btn-test')).toHaveClass('ods-btn--inverse');
});

test('renders a full width button', () => {
  render(<Button data-testid="btn-test" blocked />);
  expect(screen.getByTestId('btn-test')).toHaveClass('ods-btn--blocked');
});

test('renders a link button', () => {
  render(
    <Router>
      <Button data-testid="btn-test" component={Link} to="/teste/1234">
        Link
      </Button>
    </Router>
  );

  expect(screen.getByTestId('btn-test')).toMatchInlineSnapshot(`
    <a
      class="ods-btn ods-btn--md ods-btn--primary"
      data-testid="btn-test"
      href="/teste/1234"
    >
      Link
    </a>
  `);
});
