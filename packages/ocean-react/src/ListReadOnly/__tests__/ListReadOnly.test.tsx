import React from 'react';
import { render, screen } from '@testing-library/react';
import { PlaceholderOutline } from '@useblu/ocean-icons-react';
import ListReadOnly from '../ListReadOnly';
import Badge from '../../Badge';
import Tag from '../../Tag';

describe('CardListReadOnly', () => {
  describe('Basic Rendering', () => {
    test('renders with required props', () => {
      render(<ListReadOnly title='Test Title' />);

      expect(screen.getByTestId('card-list-readonly')).toBeInTheDocument();
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    test('renders with all text props', () => {
      render(
        <ListReadOnly
          title='Test Title'
          description='Test Description'
          caption='Test Caption'
        />
      );

      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
      expect(screen.getByText('Test Caption')).toBeInTheDocument();
    });

    test('renders with strikethrough description', () => {
      render(
        <ListReadOnly
          title='Test Title'
          description='Normal text'
          strikethroughDescription='Strikethrough text'
          type='text'
          status='strikethrough'
        />
      );

      expect(screen.getByText('Strikethrough text')).toBeInTheDocument();
      expect(screen.getByText('Normal text')).toBeInTheDocument();
    });

    test('renders with icon', () => {
      render(
        <ListReadOnly
          title='Test Title'
          icon={<PlaceholderOutline data-testid='test-icon' />}
        />
      );

      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(screen.getByTestId('card-list-readonly')).toBeInTheDocument();
    });

    test('renders with indicator', () => {
      render(
        <ListReadOnly
          title='Test Title'
          indicator={<Badge count={3} color='brand' data-testid='test-badge' />}
        />
      );

      expect(screen.getByTestId('test-badge')).toBeInTheDocument();
      expect(screen.getByTestId('card-list-readonly')).toBeInTheDocument();
    });

    test('applies custom className', () => {
      render(
        <ListReadOnly title='Test Title' className='custom-test-class' />
      );

      expect(screen.getByTestId('card-list-readonly')).toHaveClass(
        'custom-test-class'
      );
    });
  });

  describe('States', () => {
    test('renders loading state with skeleton', () => {
      render(<ListReadOnly title='Test Title' loading />);

      expect(screen.getByTestId('card-list-readonly')).toHaveClass(
        'ods-list-readonly--loading'
      );
      expect(screen.getByTestId('card-list-readonly')).toBeInTheDocument();
    });

    test('renders disabled state', () => {
      render(<ListReadOnly title='Test Title' disabled />);

      const element = screen.getByTestId('card-list-readonly');
      expect(element).toHaveClass('ods-list-readonly--disabled');
    });

    test('loading state hides content and shows skeleton', () => {
      render(
        <ListReadOnly
          title='Test Title'
          description='Test Description'
          loading
        />
      );

      const element = screen.getByTestId('card-list-readonly');
      expect(element).toHaveClass('ods-list-readonly--loading');
      expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    });
  });

  describe('Types', () => {
    test.each([
      'card',
      'text',
    ] as const)('renders with type %s', (type) => {
      render(<ListReadOnly title='Test Title' type={type} />);
      expect(screen.getByTestId('card-list-readonly')).toBeInTheDocument();
    });

    test('renders inverted layout', () => {
      render(
        <ListReadOnly
          title='Test Title'
          description='Test Description'
          inverted
        />
      );

      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });
  });

  describe('Visual Elements', () => {
    test('renders icon when provided', () => {
      render(
        <ListReadOnly
          title='Test Title'
          icon={<PlaceholderOutline data-testid='test-icon' />}
        />
      );

      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    test('renders indicator when provided', () => {
      render(
        <ListReadOnly
          title='Test Title'
          indicator={<Badge count={3} color='brand' data-testid='test-badge' />}
        />
      );

      expect(screen.getByTestId('test-badge')).toBeInTheDocument();
    });

    test('does not render icon when not provided', () => {
      render(<ListReadOnly title='Test Title' />);

      expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument();
    });

    test('does not render indicator when not provided', () => {
      render(<ListReadOnly title='Test Title' />);

      expect(screen.queryByTestId('test-badge')).not.toBeInTheDocument();
    });
  });

  describe('HTML Attributes', () => {
    test('forwards native div props', () => {
      render(
        <ListReadOnly
          title='Test Title'
          aria-label='Custom aria label'
          id='custom-id'
          data-custom='custom-value'
        />
      );

      const element = screen.getByTestId('card-list-readonly');
      expect(element).toHaveAttribute('aria-label', 'Custom aria label');
      expect(element).toHaveAttribute('id', 'custom-id');
      expect(element).toHaveAttribute('data-custom', 'custom-value');
    });

    test('is a div element', () => {
      render(<ListReadOnly title='Test Title' />);

      const element = screen.getByTestId('card-list-readonly');
      expect(element.tagName).toBe('DIV');
    });

    test('has correct data-testid', () => {
      render(<ListReadOnly title='Test Title' />);

      expect(screen.getByTestId('card-list-readonly')).toBeInTheDocument();
    });

    test('forwards role attribute', () => {
      render(<ListReadOnly title='Test Title' role='article' />);

      expect(screen.getByTestId('card-list-readonly')).toHaveAttribute(
        'role',
        'article'
      );
    });

    test('forwards style attribute', () => {
      render(
        <ListReadOnly title='Test Title' style={{ padding: '20px' }} />
      );

      expect(screen.getByTestId('card-list-readonly')).toHaveStyle({
        padding: '20px',
      });
    });
  });

  describe('ForwardRef', () => {
    test('forwards ref to div element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<ListReadOnly title='Test Title' ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.tagName).toBe('DIV');
    });

    test('allows accessing div methods through ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<ListReadOnly title='Test Title' ref={ref} />);

      expect(ref.current?.focus).toBeDefined();
      expect(typeof ref.current?.focus).toBe('function');
    });

    test('ref works in loading state', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<ListReadOnly title='Test Title' loading ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('ods-list-readonly--loading');
    });
  });

  describe('Display Name', () => {
    test('has correct displayName', () => {
      expect(ListReadOnly.displayName).toBe('ListReadOnly');
    });
  });

  describe('Complex Scenarios', () => {
    test('renders with all props combined', () => {
      render(
        <ListReadOnly
          title='Test Title'
          description='Test Description'
          caption='Test Caption'
          strikethroughDescription='Strikethrough'
          icon={<PlaceholderOutline data-testid='test-icon' />}
          indicator={<Badge count={5} color='brand' data-testid='test-badge' />}
          type='card'
          inverted
          disabled
          className='custom-class'
          aria-label='Complex card'
        />
      );

      const element = screen.getByTestId('card-list-readonly');
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass('custom-class');
      expect(element).toHaveClass('ods-list-readonly--disabled');
      expect(element).toHaveAttribute('aria-label', 'Complex card');
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(screen.getByTestId('test-badge')).toBeInTheDocument();
    });

    test('renders with different indicator types', () => {
      const { rerender } = render(
        <ListReadOnly
          title='Test Title'
          indicator={<Badge count={3} color='brand' data-testid='badge' />}
        />
      );

      expect(screen.getByTestId('badge')).toBeInTheDocument();

      rerender(
        <ListReadOnly
          title='Test Title'
          indicator={
            <Tag variant='highlight' type='important' data-testid='tag'>
              Tag
            </Tag>
          }
        />
      );

      expect(screen.getByTestId('tag')).toBeInTheDocument();
    });
  });

  describe('Snapshot', () => {
    test('matches snapshot with default props', () => {
      const { container } = render(<ListReadOnly title='Test Title' />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot with all props', () => {
      const { container } = render(
        <ListReadOnly
          title='Test Title'
          description='Test Description'
          caption='Test Caption'
          icon={<PlaceholderOutline />}
          indicator={<Tag type='positive'>New</Tag>}
          type='card'
          inverted
          className='test-class'
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot in loading state', () => {
      const { container } = render(<ListReadOnly title='Test Title' loading />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot in disabled state', () => {
      const { container } = render(
        <ListReadOnly title='Test Title' disabled />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot with icon and indicator', () => {
      const { container } = render(
        <ListReadOnly
          title='Test Title'
          icon={<PlaceholderOutline />}
          indicator={<Badge count={3} color='brand' />}
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
