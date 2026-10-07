import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TransactionListChildAction from '../TransactionListChildAction';

const lines = () =>
  Array.from(
    document.querySelectorAll('.ods-transaction-list__timeline-line')
  ).map((line) =>
    line.classList.contains('ods-transaction-list__timeline-line--visible')
  );

describe('TransactionListChildAction', () => {
  test('defaults: standalone, sm content and sm amount, chevron, clickable', () => {
    const onClick = jest.fn();
    render(
      <TransactionListChildAction
        title="Title"
        description="Description"
        amount="R$ 0,00"
        amountTag={{ label: 'Label' }}
        icon={<svg data-testid="icon" />}
        onClick={onClick}
      />
    );

    expect(screen.getByTestId('transaction-list-child-action')).toHaveClass(
      'ods-transaction-list--child',
      'ods-transaction-list--standalone'
    );
    expect(lines()).toEqual([false, false]);
    expect(document.querySelector('.ods-content-list--sm')).toBeInTheDocument();
    expect(
      document.querySelector('.ods-amount-details--sm')
    ).toBeInTheDocument();
    expect(screen.getByRole('Tag')).toHaveClass('ods-tag--small');
    expect(
      document.querySelector('.ods-transaction-list__chevron')
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test.each([
    ['first', [false, true]],
    ['middle', [true, true]],
    ['last', [true, false]],
  ] as const)('position %s draws the timeline lines', (position, expected) => {
    render(
      <TransactionListChildAction
        title="Title"
        amount="R$ 0,00"
        position={position}
      />
    );

    expect(lines()).toEqual(expected);
  });

  test('disabled does not call onClick and marks the timeline icon inactive', () => {
    const onClick = jest.fn();
    render(
      <TransactionListChildAction
        title="Title"
        amount="R$ 0,00"
        icon={<svg />}
        onClick={onClick}
        disabled
      />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
    expect(
      document.querySelector('.ods-transaction-list__timeline-icon--inactive')
    ).toBeInTheDocument();
  });

  test('loading shows the skeleton without chevron', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <TransactionListChildAction
        ref={ref}
        title="Title"
        amount="R$ 0,00"
        loading
        className="custom"
      />
    );

    expect(screen.getByTestId('transaction-list-skeleton')).toBeInTheDocument();
    expect(
      document.querySelector('.ods-transaction-list__chevron')
    ).not.toBeInTheDocument();
    expect(ref.current).toBe(screen.getByRole('button'));
    expect(screen.getByTestId('transaction-list-child-action')).toHaveClass(
      'custom'
    );
  });
});
