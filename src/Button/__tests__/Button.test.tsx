import React from 'react';
import { render } from '@testing-library/react';
import { Router, Link } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Button from '../Button';

test('renders element properly', () => {
  const { getByTestId } = render(
    <Button
      data-testid="btn-test"
      className="other-css-class__1 other-css-class__2"
    >
      Hello
    </Button>
  );

  expect(getByTestId('btn-test')).toMatchInlineSnapshot(`
    <button
      class="ods-btn ods-btn--md ods-btn--primary other-css-class__1 other-css-class__2"
      data-testid="btn-test"
    >
      Hello
    </button>
  `);
});

it('renders a small button', () => {
  const { getByTestId } = render(<Button data-testid="btn-test" size="sm" />);
  expect(getByTestId('btn-test')).toHaveClass('ods-btn--sm');
});

it('renders a medium button', () => {
  const { getByTestId } = render(<Button data-testid="btn-test" size="md" />);
  expect(getByTestId('btn-test')).toHaveClass('ods-btn--md');
});

it('renders a large button', () => {
  const { getByTestId } = render(<Button data-testid="btn-test" size="lg" />);
  expect(getByTestId('btn-test')).toHaveClass('ods-btn--lg');
});

test('renders primary button', () => {
  const { getByTestId } = render(
    <Button data-testid="btn-test" variant="primary" />
  );

  expect(getByTestId('btn-test').className).toBe(
    'ods-btn ods-btn--md ods-btn--primary'
  );
});

test('renders secondary button', () => {
  const { getByTestId } = render(
    <Button data-testid="btn-test" variant="secondary" />
  );

  expect(getByTestId('btn-test').className).toBe(
    'ods-btn ods-btn--md ods-btn--secondary'
  );
});

test('renders a ghost button', () => {
  const { getByTestId } = render(
    <Button data-testid="btn-test" variant="ghost" />
  );

  expect(getByTestId('btn-test').className).toBe(
    'ods-btn ods-btn--md ods-btn--ghost'
  );
});

test('renders an inverse button', () => {
  const { getByTestId } = render(
    <Button data-testid="btn-test" variant="inverse" />
  );
  expect(getByTestId('btn-test')).toHaveClass('ods-btn--inverse');
});

test('renders a full width button', () => {
  const { getByTestId } = render(<Button data-testid="btn-test" fullWidth />);
  expect(getByTestId('btn-test')).toHaveClass('ods-btn--full-width');
});

test('renders a link button', () => {
  const history = createMemoryHistory();
  const { getByTestId } = render(
    <Router history={history}>
      <Button data-testid="btn-test" component={Link} to="/teste/1234">
        Link
      </Button>
    </Router>
  );

  expect(getByTestId('btn-test')).toMatchInlineSnapshot(`
    <a
      class="ods-btn ods-btn--md ods-btn--primary"
      data-testid="btn-test"
      href="/teste/1234"
    >
      Link
    </a>
  `);
});
