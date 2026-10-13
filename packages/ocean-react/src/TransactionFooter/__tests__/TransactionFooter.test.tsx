import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import TransactionFooter from '../TransactionFooter';

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
  expect(screen.getByText('Subtotal')).toHaveClass(
    'ods-transaction-footer-v2__row-label'
  );
  expect(screen.getByText('Parcelamento').parentElement).toHaveClass(
    'ods-transaction-footer-v2__row--compact'
  );
  expect(screen.getByText('Subtotal').parentElement).toHaveClass(
    'ods-transaction-footer-v2__row--default'
  );
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

  expect(screen.getByText('sem acréscimo')).toHaveClass(
    'ods-transaction-footer-v2__row-info'
  );
  expect(screen.getByText('Sem acréscimo')).toHaveClass(
    'ods-transaction-footer-v2__row-info'
  );

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
