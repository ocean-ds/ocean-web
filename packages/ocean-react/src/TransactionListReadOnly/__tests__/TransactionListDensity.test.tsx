import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionListReadOnly from '../TransactionListReadOnly';
import TransactionListAction from '../../TransactionListAction';
import TransactionListSelectable from '../../TransactionListSelectable';
import TransactionListChildAction from '../../TransactionListChildAction';
import TransactionListChildReadOnly from '../../TransactionListChildReadOnly';
import TransactionListExpandable from '../../TransactionListExpandable';

describe('density (Transaction List family)', () => {
  test.each([
    ['ReadOnly', TransactionListReadOnly, 'transaction-list-read-only'],
    ['Action', TransactionListAction, 'transaction-list-action'],
    ['Selectable', TransactionListSelectable, 'transaction-list-selectable'],
    [
      'ChildAction',
      TransactionListChildAction,
      'transaction-list-child-action',
    ],
    [
      'ChildReadOnly',
      TransactionListChildReadOnly,
      'transaction-list-child-read-only',
    ],
  ] as const)(
    '%s: default keeps the padding; compact adds the modifier',
    (_, Component, testId) => {
      const { rerender } = render(<Component title="Title" amount="R$ 0,00" />);

      expect(screen.getByTestId(testId)).not.toHaveClass(
        'ods-transaction-list--compact'
      );

      rerender(<Component title="Title" amount="R$ 0,00" density="compact" />);

      expect(screen.getByTestId(testId)).toHaveClass(
        'ods-transaction-list--compact'
      );
    }
  );

  test('compact also applies while loading (skeleton follows)', () => {
    render(
      <TransactionListReadOnly
        title="Title"
        amount="R$ 0,00"
        density="compact"
        loading
      />
    );

    expect(screen.getByTestId('transaction-list-read-only')).toHaveClass(
      'ods-transaction-list--compact',
      'ods-transaction-list--loading'
    );
  });

  test('Expandable: compact is opt-in', () => {
    const { rerender } = render(
      <TransactionListExpandable title="Title" amount="R$ 0,00" />
    );

    expect(screen.getByTestId('transaction-list-expandable')).not.toHaveClass(
      'ods-list-expandable--compact'
    );

    rerender(
      <TransactionListExpandable
        title="Title"
        amount="R$ 0,00"
        density="compact"
      />
    );

    expect(screen.getByTestId('transaction-list-expandable')).toHaveClass(
      'ods-list-expandable--compact'
    );
  });
});
