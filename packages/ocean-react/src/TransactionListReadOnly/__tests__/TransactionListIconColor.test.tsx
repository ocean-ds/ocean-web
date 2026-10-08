import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionListReadOnly from '../TransactionListReadOnly';
import TransactionListAction from '../../TransactionListAction';
import TransactionListChildAction from '../../TransactionListChildAction';
import TransactionListChildReadOnly from '../../TransactionListChildReadOnly';
import TransactionListExpandable from '../../TransactionListExpandable';

const icon = <svg data-testid="icon" />;
const wrapper = () => screen.getByTestId('icon').parentElement as HTMLElement;

describe('iconColor (Transaction List family)', () => {
  test.each([
    ['ReadOnly', TransactionListReadOnly, 'icon'],
    ['Action', TransactionListAction, 'icon'],
    ['ChildAction', TransactionListChildAction, 'timeline-icon'],
    ['ChildReadOnly', TransactionListChildReadOnly, 'timeline-icon'],
  ] as const)('%s defaults to the default color', (_, Component, block) => {
    render(<Component title="Title" amount="R$ 0,00" icon={icon} />);

    expect(wrapper()).toHaveClass(`ods-transaction-list__${block}--default`);
  });

  test.each(['default', 'on-color', 'highlight'] as const)(
    'applies %s',
    (iconColor) => {
      render(
        <TransactionListReadOnly
          title="Title"
          amount="R$ 0,00"
          icon={icon}
          iconColor={iconColor}
        />
      );

      expect(wrapper()).toHaveClass(`ods-transaction-list__icon--${iconColor}`);
    }
  );

  test.each([
    [TransactionListReadOnly, 'icon'],
    [TransactionListAction, 'icon'],
    [TransactionListChildAction, 'timeline-icon'],
    [TransactionListChildReadOnly, 'timeline-icon'],
  ] as const)(
    'disabled forces inactive over any choice',
    (Component, block) => {
      render(
        <Component
          title="Title"
          amount="R$ 0,00"
          icon={icon}
          iconColor="highlight"
          disabled
        />
      );

      expect(wrapper()).toHaveClass(`ods-transaction-list__${block}--inactive`);
      expect(wrapper()).not.toHaveClass(
        `ods-transaction-list__${block}--highlight`
      );
    }
  );

  test('Expandable keeps the original icon classes without iconColor', () => {
    render(
      <TransactionListExpandable title="Title" amount="R$ 0,00" icon={icon} />
    );

    expect(wrapper()).toHaveClass('ods-list-expandable__icon', {
      exact: true,
    });
  });

  test('Expandable applies iconColor and disabled wins', () => {
    const { rerender } = render(
      <TransactionListExpandable
        title="Title"
        amount="R$ 0,00"
        icon={icon}
        iconColor="on-color"
      />
    );

    expect(wrapper()).toHaveClass('ods-list-expandable__icon--on-color');

    rerender(
      <TransactionListExpandable
        title="Title"
        amount="R$ 0,00"
        icon={icon}
        iconColor="on-color"
        disabled
      />
    );

    expect(wrapper()).toHaveClass('ods-list-expandable__icon--disabled');
    expect(wrapper()).not.toHaveClass('ods-list-expandable__icon--on-color');
  });
});
