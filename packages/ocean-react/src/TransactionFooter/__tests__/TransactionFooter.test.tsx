import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionFooter from '../TransactionFooter';

const items = [
  { content: { title: 'Compra' }, amount: { value: 'R$ 10,00' } },
  { content: { title: 'Desconto' }, amount: { value: 'R$ 2,00' } },
];
const total = { label: 'Total', value: 'R$ 8,00' };
const action = <button type="button">Continuar</button>;

test('renders default type, notice, rows, total, action and forwards props and ref', () => {
  const ref = React.createRef<HTMLDivElement>();

  render(
    <TransactionFooter
      ref={ref}
      items={items}
      total={total}
      action={action}
      notice="Aviso"
      data-testid="footer"
      className="custom-class"
      aria-label="resumo da compra"
    />
  );

  const footer = screen.getByTestId('footer');
  expect(ref.current).toBe(footer);
  expect(footer).toHaveClass(
    'ods-transaction-footer',
    'ods-transaction-footer--default',
    'custom-class'
  );
  expect(footer).toHaveAttribute('aria-label', 'resumo da compra');
  expect(screen.getByText('Aviso')).toBeInTheDocument();
  expect(screen.getByText('Compra')).toBeInTheDocument();
  expect(screen.getByText('Desconto')).toBeInTheDocument();
  expect(screen.getByText('Total')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Continuar' })).toBeInTheDocument();
});

test('renders the highlight type without a notice', () => {
  render(
    <TransactionFooter
      type="highlight"
      items={items}
      total={total}
      action={action}
      data-testid="footer"
    />
  );

  expect(screen.getByTestId('footer')).toHaveClass(
    'ods-transaction-footer--highlight'
  );
  expect(screen.queryByText('Aviso')).not.toBeInTheDocument();
});

test('renders a single main row', () => {
  render(
    <TransactionFooter items={[items[0]]} total={total} action={action} />
  );

  expect(screen.getByText('Compra')).toBeInTheDocument();
  expect(screen.getByText('Total')).toBeInTheDocument();
});

test('renders no more than five rows', () => {
  const moreThanFiveItems = Array.from({ length: 6 }, (_, index) => ({
    content: { title: `Linha ${index + 1}` },
    amount: { value: `R$ ${index + 1}` },
  }));

  render(
    <TransactionFooter
      items={moreThanFiveItems}
      total={total}
      action={action}
    />
  );

  expect(screen.getByText('Linha 5')).toBeInTheDocument();
  expect(screen.queryByText('Linha 6')).not.toBeInTheDocument();
});
