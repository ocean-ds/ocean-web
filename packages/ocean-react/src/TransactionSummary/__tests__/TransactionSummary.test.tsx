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
      notice="Aviso"
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
  expect(screen.getByText('Aviso')).toBeInTheDocument();
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
  expect(screen.queryByText('Aviso')).not.toBeInTheDocument();
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('renders no more than five rows', () => {
  const moreThanFiveItems = Array.from({ length: 6 }, (_, index) => ({
    content: { title: `Linha ${index + 1}` },
    amount: { value: `R$ ${index + 1}` },
  }));

  render(
    <TransactionSummary
      items={moreThanFiveItems}
      total={total}
      data-testid="summary"
    />
  );

  expect(screen.getByText('Linha 5')).toBeInTheDocument();
  expect(screen.queryByText('Linha 6')).not.toBeInTheDocument();
});
