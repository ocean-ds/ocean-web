import React from 'react';
import { render, screen } from '@testing-library/react';

import TransactionFooter from '../TransactionFooter';

test('renders the default variant when no variant is provided', () => {
  render(
    <TransactionFooter data-testid="footer-test" className="custom-class">
      <span>content</span>
    </TransactionFooter>
  );

  const element = screen.getByTestId('footer-test');

  expect(element).toHaveClass(
    'ods-transaction-footer',
    'ods-transaction-footer--default',
    'custom-class'
  );
});

test('renders the highlight variant', () => {
  render(
    <TransactionFooter variant="highlight" data-testid="footer-test">
      <span>content</span>
    </TransactionFooter>
  );

  expect(screen.getByTestId('footer-test')).toHaveClass(
    'ods-transaction-footer',
    'ods-transaction-footer--highlight'
  );
});

test('forwards the ref and spreads additional props', () => {
  const ref = React.createRef<HTMLDivElement>();

  render(
    <TransactionFooter ref={ref} data-testid="footer-test" aria-label="resumo">
      <span>content</span>
    </TransactionFooter>
  );

  const element = screen.getByTestId('footer-test');

  expect(ref.current).toBe(element);
  expect(element).toHaveAttribute('aria-label', 'resumo');
});

test('renders the composed children', () => {
  render(
    <TransactionFooter>
      <button type="button">Continuar</button>
    </TransactionFooter>
  );

  expect(screen.getByRole('button', { name: 'Continuar' })).toBeInTheDocument();
});
