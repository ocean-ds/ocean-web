import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionSummary from '../TransactionSummary';
import type { TransactionSummaryItem } from '../index';

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

  expect(screen.getByText('sem acréscimo')).toBeInTheDocument();
  expect(screen.getByText('Sem acréscimo')).toBeInTheDocument();
});

test('renders new content and amount props through Transaction List Read Only', () => {
  const item: TransactionSummaryItem = {
    content: {
      title: 'Installments',
      description: 'Five monthly payments',
      inverted: false,
    },
    amount: {
      value: '$24.00',
      type: 'strikethrough',
      strikethroughValue: '$30.00',
      info: 'No additional fees',
      tag: { label: 'Scheduled', type: 'complementary' },
    },
  };

  render(
    <TransactionSummary
      title="Payment summary"
      mainItem={item}
      details={[
        {
          content: { title: 'Neutral adjustment', inverted: false },
          amount: {
            value: '$20.00',
            type: 'strikethrough-neutral',
            strikethroughValue: '$25.00',
          },
        },
      ]}
      total={total}
      action={action}
      data-testid="summary"
    />
  );

  const summary = screen.getByTestId('summary');
  const rows = summary.querySelectorAll('.ods-transaction-summary__row');

  expect(rows).toHaveLength(2);
  expect(rows[0]).not.toHaveClass('ods-transaction-list--compact');
  expect(rows[1]).toHaveClass('ods-transaction-list--compact');
  expect(screen.getByText('Five monthly payments')).toBeInTheDocument();
  expect(screen.getByText('$24.00')).toBeInTheDocument();
  expect(screen.getByText('$30.00')).toHaveClass(
    'ods-amount-details__strikethrough'
  );
  expect(screen.getByText('$20.00')).toBeInTheDocument();
  expect(screen.getByText('$25.00')).toHaveClass(
    'ods-amount-details__strikethrough'
  );
  expect(screen.getByText('No additional fees')).toBeInTheDocument();
  expect(screen.getByText('Scheduled')).toBeInTheDocument();
  rows.forEach((row) => {
    expect(row.querySelector('.ods-transaction-list__divider')).toBeNull();
  });
  expect(
    summary.querySelectorAll('.ods-transaction-list__divider')
  ).toHaveLength(2);
});
