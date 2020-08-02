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
      class="ods-btn ods-btn--md ods-btn__contained other-css-class__1 other-css-class__2"
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

test('renders contained button', () => {
  const { getByTestId } = render(
    <Button data-testid="btn-test" variant="contained" />
  );

  expect(getByTestId('btn-test').className).toBe(
    'ods-btn ods-btn--md ods-btn__contained'
  );
});

test('renders contained primary button', () => {
  const { getByTestId } = render(
    <Button data-testid="btn-test" variant="contained" color="primary" />
  );

  expect(getByTestId('btn-test').className).toBe(
    'ods-btn ods-btn--md ods-btn__contained ods-btn__contained--primary'
  );
});

test('renders contained secondary button', () => {
  const { getByTestId } = render(
    <Button data-testid="btn-test" variant="contained" color="secondary" />
  );

  expect(getByTestId('btn-test').className).toBe(
    'ods-btn ods-btn--md ods-btn__contained ods-btn__contained--secondary'
  );
});

test('renders a text button', () => {
  const { getByTestId } = render(
    <Button data-testid="btn-test" variant="text" />
  );

  expect(getByTestId('btn-test').className).toBe(
    'ods-btn ods-btn--md ods-btn__text'
  );
});

test('renders a text primary button', () => {
  const { getByTestId } = render(
    <Button data-testid="btn-test" variant="text" color="primary" />
  );

  expect(getByTestId('btn-test').className).toBe(
    'ods-btn ods-btn--md ods-btn__text ods-btn__text--primary'
  );
});

test('renders a text secondary button', () => {
  const { getByTestId } = render(
    <Button data-testid="btn-test" variant="text" color="secondary" />
  );

  expect(getByTestId('btn-test').className).toBe(
    'ods-btn ods-btn--md ods-btn__text ods-btn__text--secondary'
  );
});

test('renders a full width button', () => {
  const { getByTestId } = render(<Button data-testid="btn-test" fullWidth />);
  expect(getByTestId('btn-test')).toHaveClass('ods-btn--full-width');
});

test('renders inverted button', () => {
  const { getByTestId } = render(<Button data-testid="btn-test" inverted />);
  expect(getByTestId('btn-test')).toHaveClass('ods-btn--inverted');
});
