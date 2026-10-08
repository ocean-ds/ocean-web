import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionListExpandable from '../TransactionListExpandable';
import TransactionListChildAction from '../../TransactionListChildAction';

const tagElement = (): HTMLElement =>
  document.querySelector('.ods-tag') as HTMLElement;

describe('TransactionListExpandable — Transaction List family props', () => {
  test('without the new props keeps the original amount and content markup', () => {
    render(
      <TransactionListExpandable
        title="Title"
        amount="R$ 0,00"
        amountIndicator={<span>Tag</span>}
      />
    );

    expect(document.querySelector('.ods-amount-details')).toHaveClass(
      'ods-amount-details',
      { exact: true }
    );
    expect(
      document.querySelector('.ods-amount-details__indicator')
    ).toHaveClass('ods-amount-details__indicator--medium');
    expect(
      document.querySelector('.ods-content-list--sm')
    ).not.toBeInTheDocument();
  });

  test('forwards strikethroughDescription to the content', () => {
    render(
      <TransactionListExpandable
        title="Title"
        description="Grátis"
        strikethroughDescription="3,99%"
        status="strikethrough"
        amount="R$ 0,00"
      />
    );

    expect(screen.getByText('3,99%')).toHaveClass(
      'ods-typography__paragraph--strikethrough-text'
    );
  });

  test('accepts content and amount sizes, strikethrough amount and tag', () => {
    render(
      <TransactionListExpandable
        title="Title"
        amount="Grátis"
        amountType="strikethrough-neutral"
        strikethroughAmount="R$ 3,99"
        contentSize="sm"
        amountSize="sm"
        amountTag={{ label: 'Label' }}
      />
    );

    expect(document.querySelector('.ods-content-list--sm')).toBeInTheDocument();
    expect(
      document.querySelector('.ods-amount-details--sm')
    ).toBeInTheDocument();
    expect(screen.getByText('R$ 3,99')).toHaveClass(
      'ods-amount-details__strikethrough'
    );
    expect(tagElement()).toHaveClass('ods-tag--small');
  });

  test('tag is medium when amountSize is omitted', () => {
    render(
      <TransactionListExpandable
        title="Title"
        amount="R$ 0,00"
        amountTag={{ label: 'Label' }}
      />
    );

    expect(tagElement()).toHaveClass('ods-tag--medium');
  });

  test('renders the family child rows when expanded', () => {
    render(
      <TransactionListExpandable title="Title" amount="R$ 0,00" expanded>
        <TransactionListChildAction
          title="Child"
          amount="R$ 1,00"
          position="first"
        />
        <TransactionListChildAction
          title="Child 2"
          amount="R$ 2,00"
          position="last"
        />
      </TransactionListExpandable>
    );

    expect(screen.getAllByTestId('transaction-list-child-action')).toHaveLength(
      2
    );
  });
});

describe('TransactionListExpandable — remaining branches', () => {
  test('toggles without onToggle and shows the divider below the expanded content', () => {
    render(
      <TransactionListExpandable
        title="Title"
        amount="R$ 0,00"
        expanded
        showDivider
        supportingText="Additional information"
      />
    );

    screen.getByTestId('transaction-list-expandable-button').click();
    expect(
      screen.getByTestId('transaction-list-expandable-divider')
    ).toBeInTheDocument();
  });
});
