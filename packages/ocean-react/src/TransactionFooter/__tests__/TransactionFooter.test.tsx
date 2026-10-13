import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionFooter from '../TransactionFooter';

const mainItem = { label: 'Pedido', value: 'R$ 10,00' };
const details = [{ label: 'Desconto', value: 'R$ 2,00' }];
const total = { label: 'Total', value: 'R$ 8,00' };
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
        title: 'Economia de R$ 96,39',
        description: 'A economia será aplicada ao pagamento.',
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
  expect(screen.getByText('Economia de R$ 96,39')).toBeInTheDocument();
  expect(
    screen.getByText('A economia será aplicada ao pagamento.')
  ).toBeInTheDocument();
  expect(
    notice?.querySelector('.ods-transaction-notice__icon svg')
  ).toBeInTheDocument();
  expect(screen.getByText('Pedido')).toHaveClass(
    'ods-transaction-footer-v2__row-label'
  );
  expect(screen.getByText('Desconto').parentElement).toHaveClass(
    'ods-transaction-footer-v2__row--compact'
  );
  expect(screen.getByText('Pedido').parentElement).toHaveClass(
    'ods-transaction-footer-v2__row--default'
  );
  expect(screen.getByText('Total').parentElement).toHaveClass(
    'ods-transaction-footer-v2__total--bold-16'
  );
  expect(screen.getByRole('button', { name: 'Continuar' })).toBeInTheDocument();
});

test('places highlight styling on the body', () => {
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
        description: 'Economia aplicada.',
        icon: null,
      }}
    />
  );

  expect(screen.getByText('Economia aplicada.')).toBeInTheDocument();
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
