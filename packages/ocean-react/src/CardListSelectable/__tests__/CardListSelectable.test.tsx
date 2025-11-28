import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CardListSelectable from '../CardListSelectable';
import Tag from '../../Tag';
import Badge from '../../Badge';

describe('CardListSelectable', () => {
  describe('Basic Rendering', () => {
    test('renders with required props', () => {
      render(<CardListSelectable id="test" title="Test Title" />);

      expect(screen.getByTestId('card-list-selectable')).toBeInTheDocument();
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    test('renders with all text props', () => {
      render(
        <CardListSelectable
          id="test"
          title="Test Title"
          description="Test Description"
          caption="Test Caption"
        />
      );

      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
      expect(screen.getByText('Test Caption')).toBeInTheDocument();
    });

    test('renders with strikethrough description', () => {
      render(
        <CardListSelectable
          id="test"
          title="Test Title"
          description="Normal text"
          strikethroughDescription="Strikethrough text"
          type="strikethrough"
        />
      );

      expect(screen.getByText('Strikethrough text')).toBeInTheDocument();
      expect(screen.getByText('Normal text')).toBeInTheDocument();
    });

    test('renders with indicator', () => {
      render(
        <CardListSelectable
          id="test"
          title="Test Title"
          indicator={<Badge count={3} color="brand" data-testid="test-badge" />}
        />
      );

      expect(screen.getByTestId('test-badge')).toBeInTheDocument();
    });

    test('applies custom className', () => {
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
  });

  describe('Control Types', () => {
    test('renders checkbox by default', () => {
      render(<CardListSelectable id="test" title="Test Title" />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    test('renders checkbox when controlType is checkbox', () => {
      render(
        <CardListSelectable
          id="test"
          title="Test Title"
          controlType="checkbox"
        />
      );

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    test('renders radio when controlType is radio', () => {
      render(
        <CardListSelectable id="test" title="Test Title" controlType="radio" />
      );

      const radio = screen.getByRole('radio');
      expect(radio).toBeInTheDocument();
    });

    test('passes indeterminate prop to checkbox', () => {
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
  });

  describe('States', () => {
    test('renders loading state with skeleton', () => {
      render(<CardListSelectable id="test" title="Test Title" loading />);

      expect(screen.getByTestId('card-list-selectable')).toHaveClass(
        'ods-card-list-selectable--loading'
      );
    });

    test('renders disabled state', () => {
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
      expect(screen.getByTestId('card-list-selectable')).toHaveClass(
        'ods-card-list-selectable--disabled'
      );
    });

    test('renders error state', () => {
      render(<CardListSelectable id="test" title="Test Title" error />);

      expect(screen.getByTestId('card-list-selectable')).toHaveClass(
        'ods-card-list-selectable--error'
      );
    });

    test('renders checked state', () => {
      render(<CardListSelectable id="test" title="Test Title" checked />);

      expect(screen.getByTestId('card-list-selectable')).toHaveClass(
        'ods-card-list-selectable--checked'
      );
    });
  });

  describe('Types', () => {
    test.each([
      'default',
      'inactive',
      'positive',
      'warning',
      'highlight',
      'highlight-lead',
      'strikethrough',
    ] as const)('renders with type %s', (type) => {
      render(<CardListSelectable id="test" title="Test Title" type={type} />);
      expect(screen.getByTestId('card-list-selectable')).toBeInTheDocument();
    });

    test('renders inverted layout', () => {
      render(
        <CardListSelectable
          id="test"
          title="Test Title"
          description="Test Description"
          inverted
        />
      );

      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    test('calls onChange when checkbox is clicked', () => {
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
      fireEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test('calls onChange when radio is clicked', () => {
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
      fireEvent.click(radio);
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test('input is disabled when disabled prop is true', () => {
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
      expect(checkbox).toBeDisabled();
    });

    test('passes event to onChange handler', () => {
      const handleChange = jest.fn();
      render(
        <CardListSelectable
          id="test"
          title="Test Title"
          onChange={handleChange}
        />
      );

      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
      expect(handleChange.mock.calls[0][0]).toHaveProperty('target');
    });
  });

  describe('HTML Attributes', () => {
    test('forwards native input props', () => {
      render(
        <CardListSelectable
          id="test"
          title="Test Title"
          name="test-name"
          value="test-value"
          aria-label="Custom aria label"
          data-custom="custom-value"
        />
      );

      const input = screen.getByRole('checkbox');
      expect(input).toHaveAttribute('name', 'test-name');
      // For checkbox/radio inputs, we must use toHaveAttribute for value
      // eslint-disable-next-line jest-dom/prefer-to-have-value
      expect(input).toHaveAttribute('value', 'test-value');
      expect(input).toHaveAttribute('aria-label', 'Custom aria label');
      expect(input).toHaveAttribute('data-custom', 'custom-value');
    });

    test('sets correct id on input', () => {
      render(<CardListSelectable id="custom-id" title="Test Title" />);

      const input = screen.getByRole('checkbox');
      expect(input).toHaveAttribute('id', 'custom-id');
    });

    test('has correct data-testid on container', () => {
      render(<CardListSelectable id="test" title="Test Title" />);

      expect(screen.getByTestId('card-list-selectable')).toBeInTheDocument();
    });

    test('label is correctly associated with input', () => {
      render(<CardListSelectable id="test-id" title="Test Title" />);

      const label = screen.getByTestId('card-list-selectable');
      const input = screen.getByRole('checkbox');

      expect(label.tagName).toBe('LABEL');
      expect(label).toHaveAttribute('for', 'test-id');
      expect(input).toHaveAttribute('id', 'test-id');
    });
  });

  describe('ForwardRef', () => {
    test('forwards ref to input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<CardListSelectable ref={ref} id="test" title="Test Title" />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.tagName).toBe('INPUT');
    });

    test('allows calling input methods through ref', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<CardListSelectable ref={ref} id="test" title="Test Title" />);

      expect(ref.current?.focus).toBeDefined();
      expect(ref.current?.click).toBeDefined();
      expect(ref.current?.checkValidity).toBeDefined();
    });

    test('can programmatically check checkbox via ref', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<CardListSelectable ref={ref} id="test" title="Test Title" />);

      // Initially unchecked
      expect(ref.current?.checked).toBe(false);

      // Programmatically check
      if (ref.current) {
        ref.current.checked = true;
      }

      expect(ref.current?.checked).toBe(true);
    });
  });

  describe('Snapshot', () => {
    test('matches snapshot with default props', () => {
      const { container } = render(
        <CardListSelectable id="test" title="Test Title" />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot with all props', () => {
      const { container } = render(
        <CardListSelectable
          id="test"
          title="Test Title"
          description="Test Description"
          caption="Test Caption"
          indicator={<Tag type="positive">New</Tag>}
          type="highlight"
          controlType="checkbox"
          onChange={jest.fn()}
          className="test-class"
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot with radio control', () => {
      const { container } = render(
        <CardListSelectable
          id="test"
          name="radio-group"
          value="option1"
          title="Test Title"
          description="Test Description"
          controlType="radio"
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot in loading state', () => {
      const { container } = render(
        <CardListSelectable id="test" title="Test Title" loading />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot in disabled state', () => {
      const { container } = render(
        <CardListSelectable id="test" title="Test Title" disabled />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot in error state', () => {
      const { container } = render(
        <CardListSelectable id="test" title="Test Title" error />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot with inverted layout', () => {
      const { container } = render(
        <CardListSelectable
          id="test"
          title="Test Title"
          description="Test Description"
          inverted
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot with strikethrough', () => {
      const { container } = render(
        <CardListSelectable
          id="test"
          title="Test Title"
          description="Normal text"
          strikethroughDescription="Old text"
          type="strikethrough"
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
