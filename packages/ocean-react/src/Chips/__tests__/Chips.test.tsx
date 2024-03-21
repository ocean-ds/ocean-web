import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Chips from '../Chips';

describe('Chips', () => {
  test('renders the label', () => {
    render(<Chips label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  test('renders the counter', () => {
    render(<Chips label="Test Label" counter="10" />);
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  test('renders the icon', () => {
    render(
      <Chips label="Test Label" icon={<span data-testid="test-icon" />} />
    );
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  test('disables the chips', () => {
    render(<Chips label="Test Label" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('renders the options', async () => {
    const options = [
      { label: 'Option 1', value: 1 },
      { label: 'Option 2', value: 2 },
    ];
    render(<Chips label="Test Label" options={options} />);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Chips label="Test Label" onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalled();
  });

  test('calls onChange with the selected value', async () => {
    const handleChange = jest.fn();
    const options = [
      { label: 'Option 1', value: 1 },
      { label: 'Option 2', value: 2 },
    ];
    render(
      <Chips label="Test Label" options={options} onChange={handleChange} />
    );
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Option 1'));
    expect(handleChange).toHaveBeenCalledWith({ label: 'Option 1', value: 1 });
  });
});
