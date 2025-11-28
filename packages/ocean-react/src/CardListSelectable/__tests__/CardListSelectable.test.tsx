import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardListSelectable from '../CardListSelectable';

describe('CardListSelectable', () => {
  test('should render the component with title', () => {
    render(
      <CardListSelectable id="test" title="Test Title" controlType="checkbox" />
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('should render with description', () => {
    render(
      <CardListSelectable
        id="test"
        title="Test Title"
        description="Test Description"
        controlType="checkbox"
      />
    );
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  test('should render with caption', () => {
    render(
      <CardListSelectable
        id="test"
        title="Test Title"
        caption="Test Caption"
        controlType="checkbox"
      />
    );
    expect(screen.getByText('Test Caption')).toBeInTheDocument();
  });

  test('should render checkbox by default', () => {
    render(
      <CardListSelectable id="test" title="Test Title" controlType="checkbox" />
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  test('should render radio when controlType is radio', () => {
    render(
      <CardListSelectable id="test" title="Test Title" controlType="radio" />
    );
    const radio = screen.getByRole('radio');
    expect(radio).toBeInTheDocument();
  });

  test('should call onChange when checkbox is clicked', async () => {
    const handleChange = jest.fn();
    render(
      <CardListSelectable
        id="test"
        title="Test Title"
        controlType="checkbox"
        onChange={handleChange}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('should call onChange when radio is clicked', async () => {
    const handleChange = jest.fn();
    render(
      <CardListSelectable
        id="test"
        title="Test Title"
        controlType="radio"
        onChange={handleChange}
      />
    );

    const radio = screen.getByRole('radio');
    await userEvent.click(radio);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('should be disabled when disabled prop is true', () => {
    render(
      <CardListSelectable
        id="test"
        title="Test Title"
        controlType="checkbox"
        disabled
      />
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  test('should render skeleton when loading', () => {
    render(<CardListSelectable id="test" title="Test Title" loading />);
    expect(screen.getByTestId('card-list-selectable')).toHaveClass(
      'ods-card-list-selectable--loading'
    );
  });

  test('should apply error class when error prop is true', () => {
    render(<CardListSelectable id="test" title="Test Title" error />);
    expect(screen.getByTestId('card-list-selectable')).toHaveClass(
      'ods-card-list-selectable--error'
    );
  });

  test('should apply checked class when checked prop is true', () => {
    render(<CardListSelectable id="test" title="Test Title" checked />);
    expect(screen.getByTestId('card-list-selectable')).toHaveClass(
      'ods-card-list-selectable--checked'
    );
  });

  test('should render indicator when provided', () => {
    render(
      <CardListSelectable
        id="test"
        title="Test Title"
        indicator={<span>Indicator</span>}
      />
    );
    expect(screen.getByText('Indicator')).toBeInTheDocument();
  });

  test('should pass indeterminate prop to checkbox', () => {
    render(
      <CardListSelectable
        id="test"
        title="Test Title"
        controlType="checkbox"
        indeterminate
      />
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('data-indeterminate', 'true');
  });

  test('should apply custom className', () => {
    render(
      <CardListSelectable
        id="test"
        title="Test Title"
        className="custom-class"
      />
    );
    expect(screen.getByTestId('card-list-selectable')).toHaveClass(
      'custom-class'
    );
  });

  test('should not trigger onChange when disabled', async () => {
    const handleChange = jest.fn();
    render(
      <CardListSelectable
        id="test"
        title="Test Title"
        disabled
        onChange={handleChange}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
