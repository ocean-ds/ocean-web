import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CardListExpandable from '../CardListExpandable';

describe('CardListExpandable', () => {
  test('renders the title', () => {
    render(<CardListExpandable title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('renders the description', () => {
    render(
      <CardListExpandable title="Test Title" description="Test Description" />
    );
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  test('renders the strikethrough description', () => {
    render(
      <CardListExpandable
        title="Test Title"
        strikethroughDescription="Strikethrough Text"
        type="strikethrough"
      />
    );
    expect(screen.getByText('Strikethrough Text')).toBeInTheDocument();
  });

  test('renders the caption', () => {
    render(<CardListExpandable title="Test Title" caption="Test Caption" />);
    expect(screen.getByText('Test Caption')).toBeInTheDocument();
  });

  test('renders the icon', () => {
    render(
      <CardListExpandable title="Test Title" icon={<div>Test Icon</div>} />
    );
    expect(screen.getByText('Test Icon')).toBeInTheDocument();
  });

  test('renders the indicator', () => {
    render(
      <CardListExpandable
        title="Test Title"
        indicator={<div>Test Indicator</div>}
      />
    );
    expect(screen.getByText('Test Indicator')).toBeInTheDocument();
  });

  test('renders chevron down icon when collapsed', () => {
    const { container } = render(<CardListExpandable title="Test Title" />);
    const chevronDown = container.querySelector('.ods-card-list-expandable__action svg');
    expect(chevronDown).toBeInTheDocument();
  });

  test('renders chevron up icon when expanded', () => {
    const { container } = render(
      <CardListExpandable title="Test Title" defaultExpanded />
    );
    const chevronUp = container.querySelector('.ods-card-list-expandable__action svg');
    expect(chevronUp).toBeInTheDocument();
  });

  test('does not render children when collapsed', () => {
    render(
      <CardListExpandable title="Test Title">
        <div>Children Content</div>
      </CardListExpandable>
    );
    expect(screen.queryByText('Children Content')).not.toBeInTheDocument();
  });

  test('renders children when expanded by default', () => {
    render(
      <CardListExpandable title="Test Title" defaultExpanded>
        <div>Children Content</div>
      </CardListExpandable>
    );
    expect(screen.getByText('Children Content')).toBeInTheDocument();
  });

  test('toggles expansion when clicked', () => {
    const { container } = render(
      <CardListExpandable title="Test Title">
        <div>Children Content</div>
      </CardListExpandable>
    );

    const button = screen.getByRole('button');

    // Initially collapsed
    expect(screen.queryByText('Children Content')).not.toBeInTheDocument();
    expect(container.querySelector('.ods-card-list-expandable--expanded')).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(button);
    expect(screen.getByText('Children Content')).toBeInTheDocument();
    expect(container.querySelector('.ods-card-list-expandable--expanded')).toBeInTheDocument();

    // Click to collapse
    fireEvent.click(button);
    expect(screen.queryByText('Children Content')).not.toBeInTheDocument();
    expect(container.querySelector('.ods-card-list-expandable--expanded')).not.toBeInTheDocument();
  });

  test('calls onToggle when expanded state changes', () => {
    const onToggle = jest.fn();
    render(
      <CardListExpandable title="Test Title" onToggle={onToggle}>
        <div>Children Content</div>
      </CardListExpandable>
    );

    const button = screen.getByRole('button');

    // Click to expand
    fireEvent.click(button);
    expect(onToggle).toHaveBeenCalledWith(true);

    // Click to collapse
    fireEvent.click(button);
    expect(onToggle).toHaveBeenCalledWith(false);
  });

  test('works as controlled component with expanded prop', () => {
    const { rerender } = render(
      <CardListExpandable title="Test Title" expanded={false}>
        <div>Children Content</div>
      </CardListExpandable>
    );

    // Initially collapsed
    expect(screen.queryByText('Children Content')).not.toBeInTheDocument();

    // Change expanded prop
    rerender(
      <CardListExpandable title="Test Title" expanded={true}>
        <div>Children Content</div>
      </CardListExpandable>
    );

    // Should be expanded
    expect(screen.getByText('Children Content')).toBeInTheDocument();
  });

  test('does not change internal state when controlled and clicked', () => {
    const onToggle = jest.fn();
    render(
      <CardListExpandable title="Test Title" expanded={false} onToggle={onToggle}>
        <div>Children Content</div>
      </CardListExpandable>
    );

    const button = screen.getByRole('button');

    // Click button
    fireEvent.click(button);

    // onToggle should be called
    expect(onToggle).toHaveBeenCalledWith(true);

    // But content should still be hidden because expanded prop is still false
    expect(screen.queryByText('Children Content')).not.toBeInTheDocument();
  });

  test('renders loading state', () => {
    const { container } = render(
      <CardListExpandable title="Test Title" loading />
    );

    expect(
      container.querySelector('.ods-card-list-expandable--loading')
    ).toBeInTheDocument();

    // Should not render the button in loading state
    expect(screen.queryByRole('button')).not.toBeInTheDocument();

    // Should not render the title in loading state
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
  });

  test('renders with custom className', () => {
    const { container } = render(
      <CardListExpandable title="Test Title" className="custom-class" />
    );

    expect(
      container.querySelector('.ods-card-list-expandable.custom-class')
    ).toBeInTheDocument();
  });

  test('renders with inverted prop', () => {
    render(<CardListExpandable title="Test Title" inverted />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('renders with different type variations', () => {
    const { rerender } = render(
      <CardListExpandable title="Test Title" type="default" />
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();

    rerender(<CardListExpandable title="Test Title" type="positive" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();

    rerender(<CardListExpandable title="Test Title" type="warning" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('renders with all props combined', () => {
    const onToggle = jest.fn();
    const { container } = render(
      <CardListExpandable
        title="Test Title"
        description="Test Description"
        strikethroughDescription="Strikethrough"
        caption="Test Caption"
        inverted
        type="strikethrough"
        icon={<div>Icon</div>}
        indicator={<div>Indicator</div>}
        defaultExpanded
        onToggle={onToggle}
        className="custom-class"
      >
        <div>Children Content</div>
      </CardListExpandable>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Strikethrough')).toBeInTheDocument();
    expect(screen.getByText('Test Caption')).toBeInTheDocument();
    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByText('Indicator')).toBeInTheDocument();
    expect(screen.getByText('Children Content')).toBeInTheDocument();
    expect(
      container.querySelector('.ods-card-list-expandable.custom-class')
    ).toBeInTheDocument();
    expect(
      container.querySelector('.ods-card-list-expandable--expanded')
    ).toBeInTheDocument();
  });

  test('does not render children when there are none', () => {
    const { container } = render(
      <CardListExpandable title="Test Title" defaultExpanded />
    );

    expect(
      container.querySelector('.ods-card-list-expandable__content')
    ).not.toBeInTheDocument();
  });

  test('applies expanded class when expanded', () => {
    const { container } = render(
      <CardListExpandable title="Test Title" defaultExpanded>
        <div>Content</div>
      </CardListExpandable>
    );

    expect(
      container.querySelector('.ods-card-list-expandable--expanded')
    ).toBeInTheDocument();
  });
});

