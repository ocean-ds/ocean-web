import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PlaceholderOutline, Trash, Pencil } from '@useblu/ocean-icons-react';
import ListAction from '../ListAction';
import Badge from '../../Badge';
import Tag from '../../Tag';
import type { ActionItem } from '../../_shared/components/InternalListActions';

describe('ListAction', () => {
  describe('Basic Rendering', () => {
    test('renders with required props', () => {
      render(<ListAction title='Test Title' />);

      expect(screen.getByTestId('card-list-action')).toBeInTheDocument();
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    test('renders with all text props', () => {
      render(
        <ListAction
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
        <ListAction
          title='Test Title'
          description='Normal text'
          strikethroughDescription='Strikethrough text'
          type='card'
          status='strikethrough'
        />
      );

      expect(screen.getByText('Strikethrough text')).toBeInTheDocument();
      expect(screen.getByText('Normal text')).toBeInTheDocument();
    });

    test('renders with icon', () => {
      render(
        <ListAction
          title='Test Title'
          icon={<PlaceholderOutline data-testid='test-icon' />}
        />
      );

      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(screen.getByTestId('card-list-action')).toBeInTheDocument();
    });

    test('renders with indicator', () => {
      render(
        <ListAction
          title='Test Title'
          indicator={<Badge count={3} color='brand' data-testid='test-badge' />}
        />
      );

      expect(screen.getByTestId('test-badge')).toBeInTheDocument();
      expect(screen.getByTestId('card-list-action')).toBeInTheDocument();
    });

    test('applies custom className', () => {
      render(
        <ListAction title='Test Title' className='custom-test-class' />
      );

      expect(screen.getByTestId('card-list-action')).toHaveClass(
        'custom-test-class'
      );
    });
  });

  describe('States', () => {
    test('renders loading state with skeleton', () => {
      render(<ListAction title='Test Title' loading />);

      expect(screen.getByTestId('card-list-action')).toHaveClass(
        'ods-card-list-action--loading'
      );
      expect(screen.getByTestId('card-list-action')).toBeInTheDocument();
    });

    test('renders disabled state', () => {
      render(<ListAction title='Test Title' disabled />);

      const button = screen.getByTestId('card-list-action');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('ods-card-list-action--disabled');
    });

    test('does not call onClick when disabled', () => {
      const handleClick = jest.fn();
      render(
        <ListAction title='Test Title' disabled onClick={handleClick} />
      );

      fireEvent.click(screen.getByTestId('card-list-action'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Types', () => {
    test.each([
      'card',
      'text',
    ] as const)('renders with type %s', (type) => {
      render(<ListAction title='Test Title' type={type} />);
      expect(screen.getByTestId('card-list-action')).toBeInTheDocument();
    });

    test('renders inverted layout', () => {
      render(
        <ListAction
          title='Test Title'
          description='Test Description'
          inverted
        />
      );

      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });
  });

  describe('Action Types', () => {
    test('renders chevron action by default', () => {
      render(<ListAction title='Test Title' />);

      expect(screen.getByTestId('card-list-action')).toBeInTheDocument();
    });

    test('renders chevron action explicitly', () => {
      render(<ListAction title='Test Title' actionType='chevron' />);

      expect(screen.getByTestId('card-list-action')).toBeInTheDocument();
    });

    test('renders menu action type', () => {
      const menuActions: ActionItem[] = [
        {
          label: 'Edit',
          onClick: jest.fn(),
          icon: <Pencil />,
          variant: 'default',
        },
        {
          label: 'Delete',
          onClick: jest.fn(),
          icon: <Trash />,
          variant: 'negative',
        },
      ];

      render(
        <ListAction
          title='Test Title'
          actionType='menu'
          menuActions={menuActions}
        />
      );

      expect(screen.getByTestId('card-list-action')).toBeInTheDocument();
    });

    test('renders swipe action type with swipe mode class', () => {
      const swipeActions: ActionItem[] = [
        {
          label: 'Edit',
          onClick: jest.fn(),
          icon: <Pencil />,
          variant: 'default',
        },
      ];

      render(
        <ListAction
          title='Test Title'
          actionType='swipe'
          menuActions={swipeActions}
        />
      );

      expect(screen.getByTestId('card-list-action')).toHaveClass(
        'ods-card-list-action--swipe-mode'
      );
    });
  });

  describe('Menu Positions', () => {
    const menuActions: ActionItem[] = [
      {
        label: 'Test Action',
        onClick: jest.fn(),
        icon: <Pencil />,
        variant: 'default',
      },
    ];

    test.each([
      'bottom-left',
      'bottom-right',
      'top-left',
      'top-right',
    ] as const)('renders with menu position %s', (position) => {
      render(
        <ListAction
          title='Test Title'
          actionType='menu'
          menuActions={menuActions}
          menuPosition={position}
        />
      );

      expect(screen.getByTestId('card-list-action')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    test('calls onClick when clicked', () => {
      const handleClick = jest.fn();
      render(<ListAction title='Test Title' onClick={handleClick} />);

      fireEvent.click(screen.getByTestId('card-list-action'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('passes event to onClick handler', () => {
      const handleClick = jest.fn();
      render(<ListAction title='Test Title' onClick={handleClick} />);

      fireEvent.click(screen.getByTestId('card-list-action'));
      expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
      expect(handleClick.mock.calls[0][0]).toHaveProperty('target');
    });

    test('does not throw error when onClick is not provided', () => {
      expect(() => {
        render(<ListAction title='Test Title' />);
        fireEvent.click(screen.getByTestId('card-list-action'));
      }).not.toThrow();
    });
  });

  describe('HTML Attributes', () => {
    test('forwards native button props', () => {
      render(
        <ListAction
          title='Test Title'
          aria-label='Custom aria label'
          id='custom-id'
          data-custom='custom-value'
        />
      );

      const button = screen.getByTestId('card-list-action');
      expect(button).toHaveAttribute('aria-label', 'Custom aria label');
      expect(button).toHaveAttribute('id', 'custom-id');
      expect(button).toHaveAttribute('data-custom', 'custom-value');
    });

    test('is a button element', () => {
      render(<ListAction title='Test Title' />);

      const element = screen.getByTestId('card-list-action');
      expect(element.tagName).toBe('BUTTON');
      expect(element).toHaveAttribute('type', 'button');
    });

    test('has correct data-testid', () => {
      render(<ListAction title='Test Title' />);

      expect(screen.getByTestId('card-list-action')).toBeInTheDocument();
    });
  });

  describe('ForwardRef', () => {
    test('forwards ref to button element', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<ListAction title='Test Title' ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.tagName).toBe('BUTTON');
    });

    test('allows calling button methods through ref', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<ListAction title='Test Title' ref={ref} />);

      expect(ref.current?.focus).toBeDefined();
      expect(ref.current?.click).toBeDefined();
    });
  });

  describe('Snapshot', () => {
    test('matches snapshot with default props', () => {
      const { container } = render(<ListAction title='Test Title' />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot with all props', () => {
      const { container } = render(
        <ListAction
          title='Test Title'
          description='Test Description'
          caption='Test Caption'
          icon={<PlaceholderOutline />}
          indicator={<Tag type='positive'>New</Tag>}
          type='card'
          status='default'
          actionType='chevron'
          onClick={jest.fn()}
          className='test-class'
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot in loading state', () => {
      const { container } = render(<ListAction title='Test Title' loading />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot in disabled state', () => {
      const { container } = render(
        <ListAction title='Test Title' disabled />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
