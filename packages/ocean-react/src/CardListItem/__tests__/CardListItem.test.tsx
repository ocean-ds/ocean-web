import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CardListItem from '../CardListItem';

describe('CardListItem', () => {
  test('renders the title', () => {
    render(<CardListItem title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('renders the description', () => {
    render(<CardListItem title="Test Title" description="Test Description" />);
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  test('renders the caption when size is medium', () => {
    render(<CardListItem title="Test Title" caption="Test Caption" />);
    expect(screen.getByText('Test Caption')).toBeInTheDocument();
  });

  test('does not render the caption when size is small', () => {
    render(
      <CardListItem title="Test Title" caption="Test Caption" size="small" />
    );
    expect(screen.queryByText('Test Caption')).not.toBeInTheDocument();
  });

  test('calls onClick when clicked and not disabled', () => {
    const onClick = jest.fn();
    render(<CardListItem title="Test Title" onClick={onClick} />);
    fireEvent.click(screen.getByTestId('card-list-item'));

    expect(onClick).toHaveBeenCalled();
  });

  test('does not call onClick when clicked and disabled', () => {
    const onClick = jest.fn();
    render(<CardListItem title="Test Title" onClick={onClick} disabled />);
    fireEvent.click(screen.getByTestId('card-list-item'));
    expect(onClick).not.toHaveBeenCalled();
  });

  test('renders the leading icon', () => {
    render(
      <CardListItem title="Test Title" leadingIcon={<div>Leading Icon</div>} />
    );
    expect(screen.getByText('Leading Icon')).toBeInTheDocument();
  });

  test('renders the action icon', () => {
    render(
      <CardListItem title="Test Title" actionIcon={<div>Action Icon</div>} />
    );
    expect(screen.getByText('Action Icon')).toBeInTheDocument();
  });

  test('renders the small size', () => {
    render(<CardListItem title="Test Title" size="small" />);
    expect(screen.getByTestId('card-list-item')).toHaveClass(
      'ods-card-list-item--size-small'
    );
  });

  test('renders the disabled state', () => {
    render(<CardListItem title="Test Title" disabled />);
    expect(screen.getByTestId('card-list-item')).toHaveClass(
      'ods-card-list-item--disabled'
    );
  });

  test('renders the full width variation', () => {
    render(<CardListItem title="Test Title" fullWidth />);
    expect(screen.getByTestId('card-list-item')).toHaveClass(
      'ods-card-list-item--full-width'
    );
  });
});
