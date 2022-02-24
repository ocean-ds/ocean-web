import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
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
test('renders a loading button', () => {
  render(<Button data-testid="btn-test" loading />);

  fireEvent.click(screen.getByTestId('btn-test'));

  expect(screen.getByTestId('btn-test')).toMatchInlineSnapshot(`
<button
  class="ods-btn ods-btn--md ods-btn--primary ods-btn--loading"
  data-testid="btn-test"
>
  <div
    class="ods-progress ods-progress--md ods-progress--on-color"
  >
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        opacity="0.4"
        r="10"
        stroke="#B8C3FF"
        stroke-width="4"
      />
      <path
        d="M12 2C13.3132 2 14.6136 2.25866 15.8268 2.7612C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317C21.7413 9.38642 22 10.6868 22 12"
        stroke="#0025E0"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="4"
      />
    </svg>
  </div>
  <span />
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

  expect(screen.getByTestId('btn-test')).toHaveClass(
    'ods-btn ods-btn--md ods-btn--primary',
    { exact: true }
  );
});

test('renders secondary button', () => {
  render(<Button data-testid="btn-test" variant="secondary" />);

  expect(screen.getByTestId('btn-test')).toHaveClass(
    'ods-btn ods-btn--md ods-btn--secondary',
    { exact: true }
  );
});

test('renders a text button', () => {
  render(<Button data-testid="btn-test" variant="text" />);

  expect(screen.getByTestId('btn-test')).toHaveClass(
    'ods-btn ods-btn--md ods-btn--text',
    { exact: true }
  );
});

test('renders an inverse button', () => {
  render(<Button data-testid="btn-test" variant="inverse" />);
  expect(screen.getByTestId('btn-test')).toHaveClass('ods-btn--inverse');
});

test('renders a critical primary button', () => {
  render(<Button data-testid="btn-test" variant="primaryCritical" />);
  expect(screen.getByTestId('btn-test')).toHaveClass(
    'ods-btn--primary-critical'
  );
});

test('renders a critical text button', () => {
  render(<Button data-testid="btn-test" variant="textCritical" />);
  expect(screen.getByTestId('btn-test')).toHaveClass('ods-btn--text-critical');
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
