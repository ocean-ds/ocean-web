import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionListReadOnly from '../TransactionListReadOnly';

const icon = <svg data-testid="icon" />;

const tagElement = (): HTMLElement =>
  document.querySelector('.ods-tag') as HTMLElement;

describe('TransactionListReadOnly', () => {
  test('renders content, amount, tag, additional data and divider by default', () => {
    render(
      <TransactionListReadOnly
        title="Title"
        description="Description"
        caption="Caption"
        amount="R$ 0,00"
        amountTag={{ label: 'Label' }}
        additionalData="Additional data"
        icon={icon}
      />
    );

    expect(screen.getByTestId('transaction-list-read-only')).toHaveClass(
      'ods-transaction-list',
      'ods-transaction-list--read-only'
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Title')).toHaveClass(
      'ods-typography__description'
    );
    expect(screen.getByText('Description')).toHaveClass(
      'ods-typography__paragraph'
    );
    expect(screen.getByText('Additional data')).toBeInTheDocument();
    expect(tagElement()).toHaveClass('ods-tag--medium');
    expect(
      document.querySelector('.ods-amount-details--md')
    ).toBeInTheDocument();
    expect(screen.getByTestId('transaction-list-divider')).toBeInTheDocument();
  });

  test('content and amount sizes are independent', () => {
    render(
      <TransactionListReadOnly
        title="Title"
        description="Description"
        amount="R$ 0,00"
        contentSize="sm"
        amountSize="md"
      />
    );

    expect(document.querySelector('.ods-content-list--sm')).toBeInTheDocument();
    expect(
      document.querySelector('.ods-amount-details--md')
    ).toBeInTheDocument();
  });

  test('renders strikethrough amount', () => {
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
  });

  test('disabled uses the inactive type and a neutral tag', () => {
    render(
      <TransactionListReadOnly
        title="Title"
        description="Description"
        amount="R$ 0,00"
        amountTag={{ label: 'Label' }}
        icon={icon}
        disabled
      />
    );

    expect(screen.getByTestId('transaction-list-read-only')).toHaveAttribute(
      'aria-disabled',
      'true'
    );
    expect(screen.getByText('Description')).toHaveClass(
      'ods-typography__paragraph--inactive'
    );
    expect(
      document.querySelector('.ods-amount-details--inactive')
    ).toBeInTheDocument();
    expect(tagElement()).toHaveClass('ods-tag--neutral');
    expect(
      document.querySelector('.ods-transaction-list__icon--inactive')
    ).toBeInTheDocument();
  });

  test('loading shows the skeleton with the icon placeholder', () => {
    render(
      <TransactionListReadOnly
        title="Title"
        amount="R$ 0,00"
        icon={icon}
        loading
      />
    );

    expect(screen.getByTestId('transaction-list-skeleton')).toBeInTheDocument();
    expect(screen.queryByText('Title')).not.toBeInTheDocument();
    expect(
      document.querySelector('.ods-transaction-list__icon .ods-skeleton-bar')
    ).toBeInTheDocument();
    expect(screen.getByTestId('transaction-list-read-only')).toHaveAttribute(
      'aria-busy',
      'true'
    );
  });

  test('loading without icon has no icon placeholder; divider can be hidden', () => {
    render(
      <TransactionListReadOnly
        title="Title"
        amount="R$ 0,00"
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
    expect(screen.getByTestId('transaction-list-read-only')).toHaveClass(
      'custom'
    );
  });

  test('forwards ref to the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<TransactionListReadOnly ref={ref} title="T" amount="R$ 0,00" />);

    expect(ref.current).toBe(screen.getByTestId('transaction-list-read-only'));
  });
});
