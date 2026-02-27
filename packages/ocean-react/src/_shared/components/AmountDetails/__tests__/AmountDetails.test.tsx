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
        showIndicator={true}
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
        showAdditionalData={true}
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

  test('applies status type classes', () => {
    const { container } = render(
      <AmountDetails amount="R$ 100,00" type="positive" />
    );
    expect(container.querySelector('.ods-typography__paragraph--positive')).toBeInTheDocument();
  });
});
