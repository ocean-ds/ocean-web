import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionSummary from '../TransactionSummary';

const mainItem = { label: 'Subtotal', value: 'R$ 1.250,00' };
const details = [
  {
    label: 'Parcelamento',
    value: '5x de R$ 250,00',
    info: 'sem acréscimo',
  },
];
const total = { label: 'Total', value: 'R$ 1.250,00' };
const action = <button type="button">Continuar</button>;
const dividerSelector = '.ods-transaction-list__divider';

test('shows the title by default and places the notice after the card', () => {
  render(
    <TransactionSummary
      title="Resumo"
      mainItem={mainItem}
      details={details}
      total={total}
      notice={{
        title: 'Desconto aplicado',
        description: 'Texto de apoio do aviso.',
      }}
      action={action}
      data-testid="summary"
    />
  );

  const summary = screen.getByTestId('summary');
  const card = summary.querySelector('.ods-transaction-summary__card');
  const notice = summary.querySelector('.ods-transaction-summary__notice');

  expect(screen.getByText('Resumo')).toBeInTheDocument();
  expect(card?.nextElementSibling).toBe(notice);
  expect(card).toHaveClass('ods-transaction-summary__card');
  expect(screen.getByText('Total').parentElement).toHaveClass(
    'ods-transaction-summary__total--bold-16'
  );
  expect(screen.getByRole('button', { name: 'Continuar' })).toBeInTheDocument();
});

test('does not render a title when one is omitted', () => {
  render(
    <TransactionSummary
      mainItem={mainItem}
      total={total}
      action={action}
      data-testid="summary"
    />
  );

  expect(
    screen
      .getByTestId('summary')
      .querySelector('.ods-transaction-summary__title')
  ).toBeNull();
});

test('renders details only with compact density and one divider', () => {
  render(
    <TransactionSummary
      title="Resumo"
      details={details}
      total={total}
      action={action}
      data-testid="summary"
    />
  );

  const summary = screen.getByTestId('summary');

  expect(
    summary.querySelector('.ods-transaction-summary__row--default')
  ).toBeNull();
  expect(
    summary.querySelectorAll('.ods-transaction-summary__row--compact')
  ).toHaveLength(1);
  expect(summary.querySelectorAll(dividerSelector)).toHaveLength(1);
  expect(screen.getByRole('button', { name: 'Continuar' })).toBeInTheDocument();
});

test('renders a main item with one divider', () => {
  render(
    <TransactionSummary
      title="Resumo"
      mainItem={mainItem}
      total={total}
      action={action}
      data-testid="summary"
    />
  );

  expect(
    screen.getByTestId('summary').querySelectorAll(dividerSelector)
  ).toHaveLength(1);
});

test('renders two dividers when main item and details are present', () => {
  render(
    <TransactionSummary
      title="Resumo"
      mainItem={mainItem}
      details={details}
      total={total}
      action={action}
      data-testid="summary"
    />
  );

  expect(
    screen.getByTestId('summary').querySelectorAll(dividerSelector)
  ).toHaveLength(2);
});

test('renders no divider without a main item or details', () => {
  render(
    <TransactionSummary
      title="Resumo"
      total={total}
      action={action}
      data-testid="summary"
    />
  );

  expect(
    screen.getByTestId('summary').querySelectorAll(dividerSelector)
  ).toHaveLength(0);
});

test('renders all six supplied details', () => {
  const sixDetails = Array.from({ length: 6 }, (_, index) => ({
    label: `Detalhe ${index + 1}`,
    value: `R$ ${index + 1}`,
  }));

  render(
    <TransactionSummary
      title="Resumo"
      details={sixDetails}
      total={total}
      action={action}
      data-testid="summary"
    />
  );

  expect(
    screen
      .getByTestId('summary')
      .querySelectorAll('.ods-transaction-summary__row--compact')
  ).toHaveLength(6);
  expect(screen.getAllByText(/^Detalhe [1-6]$/)).toHaveLength(6);
});

test('renders additional info under main and detail values', () => {
  render(
    <TransactionSummary
      title="Resumo"
      mainItem={{ ...mainItem, info: 'sem acréscimo' }}
      details={[{ ...details[0], info: 'Sem acréscimo' }]}
      total={total}
      action={action}
    />
  );

  expect(screen.getByText('sem acréscimo')).toHaveClass(
    'ods-transaction-summary__row-info'
  );
  expect(screen.getByText('Sem acréscimo')).toHaveClass(
    'ods-transaction-summary__row-info'
  );
});
