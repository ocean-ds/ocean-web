import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TransactionListAction from '../TransactionListAction';

describe('TransactionListAction', () => {
  test('renders the chevron and calls onClick once per click', () => {
    const onClick = jest.fn();
    render(
      <TransactionListAction
        title="Title"
        description="Description"
        amount="R$ 0,00"
        icon={<svg data-testid="icon" />}
        onClick={onClick}
      />
    );

    expect(
      document.querySelector('.ods-transaction-list__chevron')
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('transaction-list-divider')).toBeInTheDocument();
  });

  test('disabled does not call onClick and uses the inactive type', () => {
    const onClick = jest.fn();
    render(
      <TransactionListAction
        title="Title"
        description="Description"
        amount="R$ 0,00"
        amountTag={{ label: 'Label' }}
        onClick={onClick}
        disabled
      />
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByTestId('transaction-list-action')).toHaveClass(
      'ods-transaction-list--disabled'
    );
    expect(screen.getByRole('Tag')).toHaveClass('ods-tag--neutral');
    expect(
      document.querySelector('.ods-amount-details--inactive')
    ).toBeInTheDocument();
  });

  test('loading shows the skeleton, no chevron and is not clickable', () => {
    const onClick = jest.fn();
    render(
      <TransactionListAction
        title="Title"
        amount="R$ 0,00"
        onClick={onClick}
        loading
        showDivider={false}
      />
    );

    expect(screen.getByTestId('transaction-list-skeleton')).toBeInTheDocument();
    expect(
      document.querySelector('.ods-transaction-list__chevron')
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
    expect(
      screen.queryByTestId('transaction-list-divider')
    ).not.toBeInTheDocument();
  });

  test('loading with icon shows the icon placeholder', () => {
    render(
      <TransactionListAction
        title="Title"
        amount="R$ 0,00"
        icon={<svg />}
        loading
      />
    );

    expect(
      document.querySelector('.ods-transaction-list__icon .ods-skeleton-bar')
    ).toBeInTheDocument();
  });

  test('forwards ref and rest props to the button and className to the root', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <TransactionListAction
        ref={ref}
        title="Title"
        amount="R$ 0,00"
        className="custom"
        aria-label="Abrir detalhe"
        contentSize="sm"
        amountSize="sm"
      />
    );

    expect(ref.current).toBe(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Abrir detalhe'
    );
    expect(screen.getByTestId('transaction-list-action')).toHaveClass('custom');
  });
});
