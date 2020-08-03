import React from 'react';
import { render } from '@testing-library/react';

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
      type="button"
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
    <Button data-testid="btn-test" color="primary" />
  );

  expect(getByTestId('btn-test').className).toBe(
    'ods-btn ods-btn--md ods-btn--primary'
  );
});

test('renders secondary button', () => {
  const { getByTestId } = render(
    <Button data-testid="btn-test" color="secondary" />
  );

  expect(getByTestId('btn-test').className).toBe(
    'ods-btn ods-btn--md ods-btn--secondary'
  );
});

test('renders a ghost button', () => {
  const { getByTestId } = render(
    <Button data-testid="btn-test" color="ghost" />
  );

  expect(getByTestId('btn-test').className).toBe(
    'ods-btn ods-btn--md ods-btn--ghost'
  );
});

test('renders an inverse button', () => {
  const { getByTestId } = render(
    <Button data-testid="btn-test" color="inverse" />
  );
  expect(getByTestId('btn-test')).toHaveClass('ods-btn--inverse');
});

test('renders a full width button', () => {
  const { getByTestId } = render(<Button data-testid="btn-test" fullWidth />);
  expect(getByTestId('btn-test')).toHaveClass('ods-btn--full-width');
});
