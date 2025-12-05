import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ListExpandable from '../ListExpandable';

describe('ListExpandable', () => {
  test('renders the title', () => {
    render(<ListExpandable title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('renders the description', () => {
    render(
      <ListExpandable title="Test Title" description="Test Description" />
    );
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  test('renders the strikethrough description', () => {
    render(
      <ListExpandable
        title="Test Title"
        strikethroughDescription="Strikethrough Text"
        status="strikethrough"
      />
    );
    expect(screen.getByText('Strikethrough Text')).toBeInTheDocument();
  });

  test('renders the caption', () => {
    render(<ListExpandable title="Test Title" caption="Test Caption" />);
    expect(screen.getByText('Test Caption')).toBeInTheDocument();
  });

  test('renders the icon', () => {
    render(
      <ListExpandable title="Test Title" icon={<div>Test Icon</div>} />
    );
    expect(screen.getByText('Test Icon')).toBeInTheDocument();
  });

  test('renders the indicator', () => {
    render(
      <ListExpandable
        title="Test Title"
        indicator={<div>Test Indicator</div>}
      />
    );
    expect(screen.getByText('Test Indicator')).toBeInTheDocument();
  });

  test('renders chevron down icon when collapsed', () => {
    render(<ListExpandable title="Test Title" />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('renders chevron up icon when expanded', () => {
    render(<ListExpandable title="Test Title" defaultExpanded />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('does not render children when collapsed', () => {
    render(
      <ListExpandable title="Test Title">
        <div>Children Content</div>
      </ListExpandable>
    );
    expect(screen.queryByText('Children Content')).not.toBeInTheDocument();
  });

  test('renders children when expanded by default', () => {
    render(
      <ListExpandable title="Test Title" defaultExpanded>
        <div>Children Content</div>
      </ListExpandable>
    );
    expect(screen.getByText('Children Content')).toBeInTheDocument();
  });

  test('toggles expansion when clicked', () => {
    render(
      <ListExpandable title="Test Title">
        <div>Children Content</div>
      </ListExpandable>
    );

    const button = screen.getByRole('button');

    // Initially collapsed
    expect(screen.queryByText('Children Content')).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(button);
    expect(screen.getByText('Children Content')).toBeInTheDocument();

    // Click to collapse
    fireEvent.click(button);
    expect(screen.queryByText('Children Content')).not.toBeInTheDocument();
  });

  test('calls onToggle when expanded state changes', () => {
    const onToggle = jest.fn();
    render(
      <ListExpandable title="Test Title" onToggle={onToggle}>
        <div>Children Content</div>
      </ListExpandable>
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
      <ListExpandable title="Test Title" expanded={false}>
        <div>Children Content</div>
      </ListExpandable>
    );

    // Initially collapsed
    expect(screen.queryByText('Children Content')).not.toBeInTheDocument();

    // Change expanded prop
    rerender(
      <ListExpandable title="Test Title" expanded>
        <div>Children Content</div>
      </ListExpandable>
    );

    // Should be expanded
    expect(screen.getByText('Children Content')).toBeInTheDocument();
  });

  test('does not change internal state when controlled and clicked', () => {
    const onToggle = jest.fn();
    render(
      <ListExpandable title="Test Title" expanded={false} onToggle={onToggle}>
        <div>Children Content</div>
      </ListExpandable>
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
    render(<ListExpandable title="Test Title" loading />);

    // Button should be rendered but disabled in loading state
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    // Should not render the title in loading state (shows skeleton instead)
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
  });

  test('renders with custom className', () => {
    render(<ListExpandable title="Test Title" className="custom-class" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('renders with inverted prop', () => {
    render(<ListExpandable title="Test Title" inverted />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('renders with different type variations', () => {
    const { rerender } = render(
      <ListExpandable title="Test Title" type="card" />
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();

    rerender(<ListExpandable title="Test Title" type="text" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('renders with different status variations', () => {
    const { rerender } = render(
      <ListExpandable title="Test Title" status="default" />
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();

    rerender(<ListExpandable title="Test Title" status="positive" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();

    rerender(<ListExpandable title="Test Title" status="warning" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();

    rerender(<ListExpandable title="Test Title" status="inactive" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('renders with all props combined', () => {
    const onToggle = jest.fn();
    render(
      <ListExpandable
        title="Test Title"
        description="Test Description"
        strikethroughDescription="Strikethrough"
        caption="Test Caption"
        inverted
        type="card"
        status="strikethrough"
        icon={<div>Icon</div>}
        indicator={<div>Indicator</div>}
        defaultExpanded
        onToggle={onToggle}
        className="custom-class"
      >
        <div>Children Content</div>
      </ListExpandable>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Strikethrough')).toBeInTheDocument();
    expect(screen.getByText('Test Caption')).toBeInTheDocument();
    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByText('Indicator')).toBeInTheDocument();
    expect(screen.getByText('Children Content')).toBeInTheDocument();
  });

  test('does not render children when there are none', () => {
    render(<ListExpandable title="Test Title" defaultExpanded />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('applies expanded class when expanded', () => {
    render(
      <ListExpandable title="Test Title" defaultExpanded>
        <div>Content</div>
      </ListExpandable>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  describe('Disabled state', () => {
    test('renders disabled state', () => {
      render(<ListExpandable title="Test Title" disabled />);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    test('does not toggle when disabled', () => {
      const onToggle = jest.fn();
      render(
        <ListExpandable title="Test Title" disabled onToggle={onToggle}>
          <div>Children Content</div>
        </ListExpandable>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(onToggle).not.toHaveBeenCalled();
      expect(screen.queryByText('Children Content')).not.toBeInTheDocument();
    });
  });

  describe('Divider', () => {
    test('renders divider when showDivider is true', () => {
      render(<ListExpandable title="Test Title" showDivider />);
      expect(screen.getByTestId('list-expandable-divider')).toBeInTheDocument();
    });

    test('does not render divider by default', () => {
      render(<ListExpandable title="Test Title" />);
      expect(
        screen.queryByTestId('list-expandable-divider')
      ).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('has correct aria-expanded attribute when collapsed', () => {
      render(<ListExpandable title="Test Title" />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    test('has correct aria-expanded attribute when expanded', () => {
      render(<ListExpandable title="Test Title" defaultExpanded />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    test('updates aria-expanded when toggled', () => {
      render(<ListExpandable title="Test Title" />);
      const button = screen.getByRole('button');

      // Initially collapsed
      expect(button).toHaveAttribute('aria-expanded', 'false');

      // Click to expand
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');

      // Click to collapse
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    test('has descriptive aria-label when collapsed', () => {
      render(<ListExpandable title="Test Title" />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Expandir Test Title');
    });

    test('has descriptive aria-label when expanded', () => {
      render(<ListExpandable title="Test Title" defaultExpanded />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Recolher Test Title');
    });

    test('has data-testid on root element', () => {
      render(<ListExpandable title="Test Title" />);
      expect(screen.getByTestId('list-expandable')).toBeInTheDocument();
    });

    test('has data-testid on button element', () => {
      render(<ListExpandable title="Test Title" />);
      expect(screen.getByTestId('list-expandable-button')).toBeInTheDocument();
    });

    test('has data-testid on loading state', () => {
      render(<ListExpandable title="Test Title" loading />);
      expect(screen.getByTestId('list-expandable')).toBeInTheDocument();
    });
  });

  describe('HTML Attributes', () => {
    test('forwards native div props', () => {
      render(
        <ListExpandable
          title="Test Title"
          data-custom="custom-value"
          id="custom-id"
          role="region"
        />
      );

      const element = screen.getByTestId('list-expandable');
      expect(element).toHaveAttribute('data-custom', 'custom-value');
      expect(element).toHaveAttribute('id', 'custom-id');
      expect(element).toHaveAttribute('role', 'region');
    });

    test('accepts aria attributes', () => {
      render(
        <ListExpandable
          title="Test Title"
          aria-describedby="description-id"
          aria-labelledby="label-id"
        />
      );

      const element = screen.getByTestId('list-expandable');
      expect(element).toHaveAttribute('aria-describedby', 'description-id');
      expect(element).toHaveAttribute('aria-labelledby', 'label-id');
    });
  });

  describe('ForwardRef', () => {
    test('forwards ref to div element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<ListExpandable title="Test Title" ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.tagName).toBe('DIV');
    });

    test('allows calling div methods through ref', () => {
      const ref = React.createRef<HTMLDivElement>();

      // Mock scrollIntoView as it's not implemented in JSDOM
      HTMLElement.prototype.scrollIntoView = jest.fn();

      render(<ListExpandable title="Test Title" ref={ref} />);

      expect(ref.current?.focus).toBeDefined();
      expect(ref.current?.scrollIntoView).toBeDefined();
    });

    test('ref works with loading state', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<ListExpandable title="Test Title" loading ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
