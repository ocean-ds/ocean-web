import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TransactionListExpandable from '../TransactionListExpandable';

describe('TransactionListExpandable', () => {
  test('renders the title', () => {
    render(<TransactionListExpandable title="Test Title" amount="R$ 0,00" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('renders the description', () => {
    render(
      <TransactionListExpandable
        title="Test Title"
        description="Test Description"
        amount="R$ 0,00"
      />
    );
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  test('renders the amount', () => {
    render(
      <TransactionListExpandable title="Test Title" amount="R$ 1.234,56" />
    );
    expect(screen.getByText('R$ 1.234,56')).toBeInTheDocument();
  });

  test('renders the caption', () => {
    render(
      <TransactionListExpandable
        title="Test Title"
        caption="Test Caption"
        amount="R$ 0,00"
      />
    );
    expect(screen.getByText('Test Caption')).toBeInTheDocument();
  });

  test('renders the icon', () => {
    render(
      <TransactionListExpandable
        title="Test Title"
        amount="R$ 0,00"
        icon={<div>Test Icon</div>}
      />
    );
    expect(screen.getByText('Test Icon')).toBeInTheDocument();
  });

  test('renders the amount indicator', () => {
    render(
      <TransactionListExpandable
        title="Test Title"
        amount="R$ 0,00"
        amountIndicator={<span>Tag</span>}
      />
    );
    expect(screen.getByText('Tag')).toBeInTheDocument();
  });

  test('renders additional data when provided', () => {
    render(
      <TransactionListExpandable
        title="Test Title"
        amount="R$ 0,00"
        additionalData="Extra info"
      />
    );
    expect(screen.getByText('Extra info')).toBeInTheDocument();
  });

  test('does not render children when collapsed', () => {
    render(
      <TransactionListExpandable title="Test Title" amount="R$ 0,00">
        <div>Children Content</div>
      </TransactionListExpandable>
    );
    expect(screen.queryByText('Children Content')).not.toBeInTheDocument();
  });

  test('renders children when expanded', () => {
    render(
      <TransactionListExpandable title="Test Title" amount="R$ 0,00" expanded>
        <div>Children Content</div>
      </TransactionListExpandable>
    );
    expect(screen.getByText('Children Content')).toBeInTheDocument();
  });

  test('calls onToggle with true when button clicked and expanded is false', () => {
    const onToggle = jest.fn();
    render(
      <TransactionListExpandable
        title="Test Title"
        amount="R$ 0,00"
        expanded={false}
        onToggle={onToggle}
      >
        <div>Children Content</div>
      </TransactionListExpandable>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  test('calls onToggle with false when button clicked and expanded is true', () => {
    const onToggle = jest.fn();
    render(
      <TransactionListExpandable
        title="Test Title"
        amount="R$ 0,00"
        expanded
        onToggle={onToggle}
      >
        <div>Children</div>
      </TransactionListExpandable>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onToggle).toHaveBeenCalledWith(false);
  });

  test('renders divider when showDivider is true', () => {
    render(
      <TransactionListExpandable
        title="Test Title"
        amount="R$ 0,00"
        showDivider
      />
    );
    expect(
      screen.getByTestId('transaction-list-expandable-divider')
    ).toBeInTheDocument();
  });

  test('does not render divider when showDivider is false', () => {
    render(
      <TransactionListExpandable
        title="Test Title"
        amount="R$ 0,00"
        showDivider={false}
      />
    );
    expect(
      screen.queryByTestId('transaction-list-expandable-divider')
    ).not.toBeInTheDocument();
  });

  test('has correct data-testid', () => {
    render(<TransactionListExpandable title="Test Title" amount="R$ 0,00" />);
    expect(
      screen.getByTestId('transaction-list-expandable')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('transaction-list-expandable-button')
    ).toBeInTheDocument();
  });

  test('renders supportingText when expanded', () => {
    render(
      <TransactionListExpandable
        title="Test Title"
        amount="R$ 0,00"
        expanded
        supportingText="Supporting text that providing context."
      />
    );
    expect(
      screen.getByTestId('transaction-list-expandable-supporting-text')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Supporting text that providing context.')
    ).toBeInTheDocument();
  });

  test('does not render supportingText when collapsed', () => {
    render(
      <TransactionListExpandable
        title="Test Title"
        amount="R$ 0,00"
        supportingText="Supporting text"
      />
    );
    expect(
      screen.queryByTestId('transaction-list-expandable-supporting-text')
    ).not.toBeInTheDocument();
  });

  test('does not render children or supportingText when loading even if expanded', () => {
    render(
      <TransactionListExpandable
        title="Test Title"
        amount="R$ 0,00"
        expanded
        loading
        supportingText="Supporting text"
      >
        <div>Children Content</div>
      </TransactionListExpandable>
    );
    expect(screen.queryByText('Children Content')).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('transaction-list-expandable-supporting-text')
    ).not.toBeInTheDocument();
  });
});
