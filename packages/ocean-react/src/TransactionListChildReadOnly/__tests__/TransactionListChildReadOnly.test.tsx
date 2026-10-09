import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionListChildReadOnly from '../TransactionListChildReadOnly';

describe('TransactionListChildReadOnly', () => {
  test('defaults: standalone, sm sizes and no chevron', () => {
    render(
      <TransactionListChildReadOnly
        content={{ title: 'Title', description: 'Description' }}
        amount={{ value: 'R$ 0,00' }}
      />
    );

    expect(screen.getByTestId('transaction-list-child-read-only')).toHaveClass(
      'ods-transaction-list--child',
      'ods-transaction-list--standalone'
    );
    expect(document.querySelector('.ods-content-list--sm')).toBeInTheDocument();
    expect(
      document.querySelector('.ods-amount-details--sm')
    ).toBeInTheDocument();
    expect(
      document.querySelector('.ods-transaction-list__chevron')
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  test('position middle draws both lines', () => {
    render(
      <TransactionListChildReadOnly
        content={{ title: 'Title' }}
        amount={{ value: 'R$ 0,00' }}
        position="middle"
      />
    );

    expect(
      document.querySelectorAll('.ods-transaction-list__timeline-line--visible')
    ).toHaveLength(2);
  });

  test('disabled uses the inactive type', () => {
    render(
      <TransactionListChildReadOnly
        content={{ title: 'Title' }}
        amount={{ value: 'R$ 0,00' }}
        disabled
      />
    );

    expect(
      screen.getByTestId('transaction-list-child-read-only')
    ).toHaveAttribute('aria-disabled', 'true');
    expect(
      document.querySelector('.ods-amount-details--inactive')
    ).toBeInTheDocument();
  });

  test('loading shows the skeleton and forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <TransactionListChildReadOnly
        content={{ title: 'Title' }}
        amount={{ value: 'R$ 0,00' }}
        ref={ref}
        loading
        className="custom"
      />
    );

    expect(screen.getByTestId('transaction-list-skeleton')).toBeInTheDocument();
    expect(ref.current).toBe(
      screen.getByTestId('transaction-list-child-read-only')
    );
    expect(ref.current).toHaveClass('custom');
  });
});
