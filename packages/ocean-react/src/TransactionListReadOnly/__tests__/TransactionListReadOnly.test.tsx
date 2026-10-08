import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionListReadOnly from '../TransactionListReadOnly';

const icon = <svg data-testid="icon" />;

const row = () => screen.getByTestId('transaction-list-read-only');

describe('TransactionListReadOnly', () => {
  test('reads content, amount, tag and additional data in order', () => {
    render(
      <TransactionListReadOnly
        title="Pix recebido"
        description="Padaria São José"
        caption="12 de novembro às 14:32"
        amount="R$ 150,00"
        amountTag={{ label: 'Pago' }}
        additionalData="Saldo disponível"
        icon={icon}
      />
    );

    expect(row()).toHaveTextContent(
      'Pix recebidoPadaria São José12 de novembro às 14:32R$ 150,00PagoSaldo disponível'
    );
    expect(screen.getByText('Pix recebido')).toHaveClass(
      'ods-typography__description'
    );
    expect(screen.getByText('Padaria São José')).toHaveClass(
      'ods-typography__paragraph'
    );
    expect(screen.getByText('Pago')).toBeInTheDocument();
    expect(screen.getByTestId('transaction-list-divider')).toBeInTheDocument();
  });

  test('is not focusable and has no interactive role', () => {
    render(
      <TransactionListReadOnly
        title="Pix recebido"
        amount="R$ 150,00"
        icon={icon}
      />
    );

    row().focus();
    expect(row()).not.toHaveFocus();
    expect(row()).not.toHaveAttribute('tabindex');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  test('content and amount sizes are independent', () => {
    render(
      <TransactionListReadOnly
        title="Pix recebido"
        description="Padaria São José"
        amount="R$ 150,00"
        contentSize="sm"
        amountSize="md"
      />
    );

    expect(screen.getByText('Pix recebido')).toHaveClass(
      'ods-content-list__support'
    );
    expect(screen.getByText('R$ 150,00')).toHaveClass(
      'ods-amount-details__amount--sized'
    );
    expect(
      document.querySelector('.ods-amount-details--md')
    ).toBeInTheDocument();
  });

  test('renders the strikethrough amount before the current amount', () => {
    render(
      <TransactionListReadOnly
        title="Juros"
        amount="Grátis"
        amountType="strikethrough"
        strikethroughAmount="3,99%"
      />
    );

    expect(screen.getByText('3,99%')).toHaveClass(
      'ods-amount-details__strikethrough'
    );
    expect(screen.getByText('3,99%').nextElementSibling).toBe(
      screen.getByText('Grátis')
    );
  });

  test('disabled is announced and uses the inactive type and a neutral tag', () => {
    render(
      <TransactionListReadOnly
        title="Pix recebido"
        description="Padaria São José"
        amount="R$ 150,00"
        amountTag={{ label: 'Pago' }}
        icon={icon}
        disabled
      />
    );

    expect(row()).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByText('Padaria São José')).toHaveClass(
      'ods-typography__paragraph--inactive'
    );
    expect(
      document.querySelector('.ods-amount-details--inactive')
    ).toBeInTheDocument();
    expect(screen.getByText('Pago').closest('.ods-tag')).toHaveClass(
      'ods-tag--neutral'
    );
    expect(screen.getByTestId('icon').parentElement).toHaveClass(
      'ods-transaction-list__icon--inactive'
    );
  });

  test('loading is announced as busy and hides the texts', () => {
    render(
      <TransactionListReadOnly
        title="Pix recebido"
        amount="R$ 150,00"
        icon={icon}
        loading
      />
    );

    expect(row()).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByTestId('transaction-list-skeleton')).toBeInTheDocument();
    expect(screen.queryByText('Pix recebido')).not.toBeInTheDocument();
    expect(
      document.querySelector('.ods-transaction-list__icon .ods-skeleton-bar')
    ).toBeInTheDocument();
  });

  test('loading without icon has no icon placeholder; divider can be hidden', () => {
    render(
      <TransactionListReadOnly
        title="Pix recebido"
        amount="R$ 150,00"
        loading
        showDivider={false}
        className="custom"
      />
    );

    expect(
      document.querySelector('.ods-transaction-list__icon')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('transaction-list-divider')
    ).not.toBeInTheDocument();
    expect(row()).toHaveClass('custom');
  });

  test('forwards ref to the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <TransactionListReadOnly ref={ref} title="Pix" amount="R$ 150,00" />
    );

    expect(ref.current).toBe(row());
  });
});
