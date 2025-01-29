import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CardGroup from '../CardGroup';

describe('CardGroup Component', () => {
  test('should render the title and subtitle', () => {
    render(<CardGroup title="Test Title" subtitle="Test Subtitle" />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  test('should render the Badge when count is provided', () => {
    render(<CardGroup title="Test Title" count={5} />);

    const badge = screen.getByText('5');
    expect(badge).toBeInTheDocument();
  });

  test('should not render the Badge when count is undefined', () => {
    render(<CardGroup title="Test Title" />);

    const badge = screen.queryByText('5');
    expect(badge).not.toBeInTheDocument();
  });

  test('should render the action button when actionLabel is provided', () => {
    const mockActionClick = jest.fn();
    render(
      <CardGroup
        title="Test Title"
        actionLabel="Click Me"
        actionClick={mockActionClick}
      />
    );

    const actionButton = screen.getByText('Click Me');
    expect(actionButton).toBeInTheDocument();

    fireEvent.click(actionButton);
    expect(mockActionClick).toHaveBeenCalledTimes(1);
  });

  test('should not render the action button in the "header" variant', () => {
    render(
      <CardGroup title="Test Title" actionLabel="Click Me" variant="header" />
    );

    const actionButton = screen.queryByText('Click Me');
    expect(actionButton).not.toBeInTheDocument();
  });

  test('should render children content in the "minimal" variant', () => {
    render(
      <CardGroup title="Test Title">
        <p>Child Content</p>
      </CardGroup>
    );

    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  test('should not render children content in the "header" variant', () => {
    render(
      <CardGroup title="Test Title" variant="header">
        <p>Child Content</p>
      </CardGroup>
    );

    const childContent = screen.queryByText('Child Content');
    expect(childContent).not.toBeInTheDocument();
  });
});
