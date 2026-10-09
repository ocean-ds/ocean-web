import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionSummary from '../TransactionSummary';

const items = [
  { content: { title: 'Compra' }, amount: { value: 'R$ 10,00' } },
  { content: { title: 'Desconto' }, amount: { value: 'R$ 2,00' } },
];
const total = { label: 'Total', value: 'R$ 8,00' };

test('renders title, rows, total, notice, action and forwards props and ref', () => {
  const ref = React.createRef<HTMLDivElement>();

  render(
    <TransactionSummary
      ref={ref}
      title="Resumo"
      items={items}
      total={total}
      notice={{
        title: 'Economia de R$ 96,39',
        icon: <span data-testid="notice-icon" />,
      }}
      action={<button type="button">Continuar</button>}
      data-testid="summary"
      aria-label="resumo da compra"
    />
  );

  const summary = screen.getByTestId('summary');
  expect(ref.current).toBe(summary);
  expect(summary).toHaveAttribute('aria-label', 'resumo da compra');
  expect(summary).toHaveClass('ods-transaction-summary');
  expect(screen.getByText('Resumo')).toBeInTheDocument();
  expect(screen.getByText('Compra')).toBeInTheDocument();
  expect(screen.getByText('Desconto')).toBeInTheDocument();
  expect(screen.getByText('Total')).toBeInTheDocument();
  expect(screen.getByText('R$ 8,00')).toBeInTheDocument();
  expect(screen.getByText('Economia de R$ 96,39')).toBeInTheDocument();
  expect(screen.getByTestId('notice-icon')).toBeInTheDocument();
  expect(summary).toHaveClass('ods-transaction-summary--has-notice');
  expect(
    summary.querySelector('.ods-transaction-notice__description')
  ).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Continuar' })).toBeInTheDocument();
});

test('renders without optional title, notice and action', () => {
  render(
    <TransactionSummary
      items={items}
      total={total}
      data-testid="summary"
      className="custom-class"
    />
  );

  expect(screen.getByTestId('summary')).toHaveClass('custom-class');
  expect(screen.queryByText('Resumo')).not.toBeInTheDocument();
  expect(screen.getByTestId('summary')).not.toHaveClass(
    'ods-transaction-summary--has-notice'
  );
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('renders every supplied row', () => {
  const moreThanFiveItems = Array.from({ length: 6 }, (_, index) => ({
    content: { title: `Item ${index + 1}` },
    amount: { value: `R$ ${index + 1}` },
  }));

  render(
    <TransactionSummary
      items={moreThanFiveItems}
      total={total}
      data-testid="summary"
    />
  );

  expect(screen.getAllByText(/^Item [1-6]$/)).toHaveLength(6);
});

test('renders a divider when there are no rows', () => {
  render(<TransactionSummary items={[]} total={total} data-testid="summary" />);

  expect(
    screen
      .getByTestId('summary')
      .querySelector('.ods-transaction-list__divider')
  ).toBeInTheDocument();
});
