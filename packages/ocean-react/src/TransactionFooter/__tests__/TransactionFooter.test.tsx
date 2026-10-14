import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import TransactionFooter from '../TransactionFooter';
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

test('renders notice before the body, rows, total and action', () => {
  const ref = React.createRef<HTMLDivElement>();

  render(
    <TransactionFooter
      ref={ref}
      mainItem={mainItem}
      details={details}
      total={total}
      action={action}
      notice={{
        title: 'Desconto aplicado',
        description: 'Texto de apoio do aviso.',
      }}
      data-testid="footer"
      className="custom-class"
      aria-label="resumo da compra"
    />
  );

  const footer = screen.getByTestId('footer');
  const notice = footer.querySelector('.ods-transaction-footer-v2__notice');
  const body = footer.querySelector('.ods-transaction-footer-v2__body');

  expect(ref.current).toBe(footer);
  expect(footer).toHaveClass('ods-transaction-footer-v2', 'custom-class');
  expect(footer).toHaveAttribute('aria-label', 'resumo da compra');
  expect(notice?.nextElementSibling).toBe(body);
  expect(body).toHaveClass('ods-transaction-footer-v2__body--default');
  expect(footer).not.toHaveClass('ods-transaction-footer--default');
  expect(screen.getByText('Desconto aplicado')).toBeInTheDocument();
  expect(screen.getByText('Texto de apoio do aviso.')).toBeInTheDocument();
  expect(
    notice?.querySelector('.ods-transaction-notice__icon svg')
  ).toBeInTheDocument();
  expect(screen.getByText('Subtotal')).toBeInTheDocument();
  expect(
    screen
      .getByText('Parcelamento')
      .closest('.ods-transaction-footer-v2__row--compact')
  ).toBeInTheDocument();
  expect(
    screen
      .getByText('Subtotal')
      .closest('.ods-transaction-footer-v2__row--default')
  ).toBeInTheDocument();
  expect(screen.getByText('Total').parentElement).toHaveClass(
    'ods-transaction-footer-v2__total--bold-16'
  );
  expect(screen.getByRole('button', { name: 'Continuar' })).toBeInTheDocument();
});

test('places highlight styling on the body', () => {
  cleanup();
  render(
    <TransactionFooter
      type="highlight"
      mainItem={mainItem}
      total={total}
      action={action}
      data-testid="footer"
    />
  );

  const footer = screen.getByTestId('footer');
  const body = footer.querySelector('.ods-transaction-footer-v2__body');

  expect(body).toHaveClass('ods-transaction-footer-v2__body--highlight');
  expect(footer).not.toHaveClass('ods-transaction-footer-v2__body--highlight');
});

test('omits the optional notice title and icon', () => {
  render(
    <TransactionFooter
      mainItem={mainItem}
      total={total}
      action={action}
      notice={{
        description: 'Texto de apoio do aviso.',
        icon: null,
      }}
    />
  );

  expect(screen.getByText('Texto de apoio do aviso.')).toBeInTheDocument();
  expect(
    document.querySelector('.ods-transaction-notice__title')
  ).not.toBeInTheDocument();
  expect(
    document.querySelector('.ods-transaction-notice__icon')
  ).not.toBeInTheDocument();
});

test('renders details only with compact rows and one divider', () => {
  render(
    <TransactionFooter
      details={details}
      total={total}
      action={action}
      data-testid="footer"
    />
  );

  const footer = screen.getByTestId('footer');

  expect(
    footer.querySelector('.ods-transaction-footer-v2__row--default')
  ).toBeNull();
  expect(
    footer.querySelectorAll('.ods-transaction-footer-v2__row--compact')
  ).toHaveLength(1);
  expect(footer.querySelectorAll(dividerSelector)).toHaveLength(1);
});

test('renders a main item only with default density and one divider', () => {
  render(
    <TransactionFooter
      mainItem={mainItem}
      total={total}
      action={action}
      data-testid="footer"
    />
  );

  const footer = screen.getByTestId('footer');

  expect(
    footer.querySelector('.ods-transaction-footer-v2__row--default')
  ).toBeInTheDocument();
  expect(footer.querySelectorAll(dividerSelector)).toHaveLength(1);
});

test('renders two dividers when main item and details are present', () => {
  render(
    <TransactionFooter
      mainItem={mainItem}
      details={details}
      total={total}
      action={action}
      data-testid="footer"
    />
  );

  expect(
    screen.getByTestId('footer').querySelectorAll(dividerSelector)
  ).toHaveLength(2);
});

test('renders no divider when main item and details are absent', () => {
  render(
    <TransactionFooter total={total} action={action} data-testid="footer" />
  );

  expect(
    screen.getByTestId('footer').querySelectorAll(dividerSelector)
  ).toHaveLength(0);
});

test('renders every supplied detail', () => {
  const sixDetails = Array.from({ length: 6 }, (_, index) => ({
    label: `Detalhe ${index + 1}`,
    value: `R$ ${index + 1}`,
  }));

  render(
    <TransactionFooter
      details={sixDetails}
      total={total}
      action={action}
      data-testid="footer"
    />
  );

  expect(
    screen
      .getByTestId('footer')
      .querySelectorAll('.ods-transaction-footer-v2__row--compact')
  ).toHaveLength(6);
  expect(screen.getAllByText(/^Detalhe [1-6]$/)).toHaveLength(6);
});

test('renders additional info under main and detail values only when provided', () => {
  render(
    <TransactionFooter
      mainItem={{ ...mainItem, info: 'sem acréscimo' }}
      details={[{ ...details[0], info: 'Sem acréscimo' }]}
      total={total}
      action={action}
    />
  );

  expect(screen.getByText('sem acréscimo')).toBeInTheDocument();
  expect(screen.getByText('Sem acréscimo')).toBeInTheDocument();

  cleanup();
  render(
    <TransactionFooter
      mainItem={mainItem}
      details={[{ label: 'Parcelamento', value: '5x de R$ 250,00' }]}
      total={total}
      action={action}
    />
  );
  expect(screen.queryByText('sem acréscimo')).not.toBeInTheDocument();
});

test('renders Transaction List amount types and content in compact detail rows', () => {
  const items: TransactionSummaryItem[] = [
    {
      content: { title: 'Positive amount', inverted: false },
      amount: { value: '$24.00', type: 'positive' },
    },
    {
      content: { title: 'Negative amount', inverted: false },
      amount: { value: '$12.50', type: 'negative' },
    },
    {
      content: { title: 'Inactive amount', inverted: false },
      amount: { value: '$8.00', type: 'inactive' },
    },
    {
      content: { title: 'Changed amount', inverted: false },
      amount: {
        value: '$24.00',
        type: 'strikethrough',
        strikethroughValue: '$30.00',
      },
    },
    {
      content: { title: 'Neutral change', inverted: false },
      amount: {
        value: '$24.00',
        type: 'strikethrough-neutral',
        strikethroughValue: '$30.00',
      },
    },
    {
      content: { title: 'Scheduled payment', inverted: false },
      amount: {
        value: '$24.00',
        tag: { label: 'Scheduled', type: 'complementary' },
      },
    },
    {
      content: {
        title: 'Monthly payment',
        description: 'Five monthly payments',
        inverted: false,
      },
      amount: { value: '$24.00', info: 'No additional fees' },
    },
  ];

  render(
    <TransactionFooter
      mainItem={{
        content: { title: 'Subtotal', inverted: false },
        amount: { value: '$100.00' },
      }}
      details={items}
      total={total}
      action={action}
      data-testid="footer"
    />
  );

  const footer = screen.getByTestId('footer');
  const rows = footer.querySelectorAll('.ods-transaction-footer-v2__row');

  expect(rows).toHaveLength(items.length + 1);
  expect(rows[0]).not.toHaveClass('ods-transaction-list--compact');
  expect(rows[1]).toHaveClass('ods-transaction-list--compact');
  expect(screen.getByText('Five monthly payments')).toBeInTheDocument();
  expect(screen.getByText('No additional fees')).toBeInTheDocument();
  expect(screen.getByText('Scheduled')).toBeInTheDocument();
  expect(
    footer.querySelectorAll('.ods-amount-details__strikethrough')
  ).toHaveLength(2);
  expect(screen.getAllByText('$30.00')).toHaveLength(2);
  expect(
    footer.querySelector('.ods-amount-details__amount--positive')
  ).toBeInTheDocument();
  expect(
    footer.querySelector('.ods-amount-details__amount-sign')
  ).toBeInTheDocument();
  expect(
    footer.querySelector('.ods-amount-details__amount-sign--sized')
  ).toBeInTheDocument();
  expect(
    footer.querySelector('.ods-amount-details--inactive')
  ).toBeInTheDocument();
  expect(
    footer.querySelector('.ods-amount-details__amount--strikethrough-neutral')
  ).toBeInTheDocument();
  const scheduledTag = screen.getByText('Scheduled');
  const scheduledValue = scheduledTag
    .closest('.ods-amount-details')
    ?.querySelector('.ods-amount-details__amount');
  expect(scheduledValue?.compareDocumentPosition(scheduledTag)).toBe(
    Node.DOCUMENT_POSITION_FOLLOWING
  );
  const info = screen.getByText('No additional fees');
  const infoValue = info
    .closest('.ods-amount-details')
    ?.querySelector('.ods-amount-details__amount');
  expect(infoValue?.compareDocumentPosition(info)).toBe(
    Node.DOCUMENT_POSITION_FOLLOWING
  );
  rows.forEach((row) => {
    expect(row.querySelector('.ods-transaction-list__divider')).toBeNull();
  });
  expect(footer.querySelectorAll(dividerSelector)).toHaveLength(2);
});
