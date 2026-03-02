import React from 'react';
import { render, screen } from '@testing-library/react';
import AmountDetails from '../AmountDetails';

describe('AmountDetails', () => {
  test('renders with amount', () => {
    render(<AmountDetails amount="R$ 100,00" />);
    expect(screen.getByText('R$ 100,00')).toBeInTheDocument();
  });

  test('renders with indicator when showIndicator is true', () => {
    render(
      <AmountDetails
        amount="R$ 100,00"
        indicator={<span data-testid="test-indicator">Icon</span>}
        showIndicator
      />
    );
    expect(screen.getByTestId('test-indicator')).toBeInTheDocument();
  });

  test('does not render indicator when showIndicator is false', () => {
    render(
      <AmountDetails
        amount="R$ 100,00"
        indicator={<span data-testid="test-indicator">Icon</span>}
        showIndicator={false}
      />
    );
    expect(screen.queryByTestId('test-indicator')).not.toBeInTheDocument();
  });

  test('renders additional data when showAdditionalData is true', () => {
    render(
      <AmountDetails
        amount="R$ 100,00"
        additionalData="Detail info"
        showAdditionalData
      />
    );
    expect(screen.getByText('Detail info')).toBeInTheDocument();
  });

  test('does not render additional data when showAdditionalData is false', () => {
    render(
      <AmountDetails
        amount="R$ 100,00"
        additionalData="Detail info"
        showAdditionalData={false}
      />
    );
    expect(screen.queryByText('Detail info')).not.toBeInTheDocument();
  });

  test('renders with type positive applying positive class', () => {
    render(<AmountDetails amount="R$ 50,00" type="positive" />);
    expect(
      document.querySelector('.ods-amount-details__amount--positive')
    ).toBeInTheDocument();
  });

  test('renders type negative with minus sign before amount', () => {
    render(<AmountDetails amount="R$ 25,00" type="negative" />);
    expect(screen.getByText('- ')).toBeInTheDocument();
    expect(screen.getByText('R$ 25,00')).toBeInTheDocument();
  });
});
