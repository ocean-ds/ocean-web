import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PlaceholderOutline, Trash, Pencil } from '@useblu/ocean-icons-react';
import CardListAction from '../CardListAction';
import Badge from '../../Badge';
import Tag from '../../Tag';
import type { ActionItem } from '../../InternalListActions';

describe('CardListAction', () => {
  describe('Basic Rendering', () => {
    it('renders with required props', () => {
      render(<CardListAction title='Test Title' />);

      expect(screen.getByTestId('card-list-action')).toBeInTheDocument();
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders with all text props', () => {
      render(
        <CardListAction
          title='Test Title'
          description='Test Description'
          caption='Test Caption'
        />
      );

      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
      expect(screen.getByText('Test Caption')).toBeInTheDocument();
    });

    it('renders with strikethrough description', () => {
      render(
        <CardListAction
          title='Test Title'
          description='Normal text'
          strikethroughDescription='Strikethrough text'
          type='strikethrough'
        />
      );

      expect(screen.getByText('Strikethrough text')).toBeInTheDocument();
      expect(screen.getByText('Normal text')).toBeInTheDocument();
    });

    it('renders with icon', () => {
      const { container } = render(
        <CardListAction
          title='Test Title'
          icon={<PlaceholderOutline data-testid='test-icon' />}
        />
      );

      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(
        container.querySelector('.ods-card-list-action__icon')
      ).toBeInTheDocument();
    });

    it('renders with indicator', () => {
      const { container } = render(
        <CardListAction
          title='Test Title'
          indicator={<Badge count={3} color='brand' data-testid='test-badge' />}
        />
      );

      expect(screen.getByTestId('test-badge')).toBeInTheDocument();
      expect(
        container.querySelector('.ods-card-list-action__indicator')
      ).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <CardListAction title='Test Title' className='custom-test-class' />
      );

      expect(screen.getByTestId('card-list-action')).toHaveClass(
        'custom-test-class'
      );
    });
  });

  describe('States', () => {
    it('renders loading state with skeleton', () => {
      const { container } = render(
        <CardListAction title='Test Title' loading />
      );

      expect(screen.getByTestId('card-list-action')).toHaveClass(
        'ods-card-list-action--loading'
      );
      expect(
        container.querySelector('.ods-card-list-action__skeleton')
      ).toBeInTheDocument();
    });

    it('renders disabled state', () => {
      render(<CardListAction title='Test Title' disabled />);

      const button = screen.getByTestId('card-list-action');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('ods-card-list-action--disabled');
    });

    it('does not call onClick when disabled', () => {
      const handleClick = jest.fn();
      render(
        <CardListAction title='Test Title' disabled onClick={handleClick} />
      );

      fireEvent.click(screen.getByTestId('card-list-action'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Types', () => {
    it.each([
      'default',
      'inactive',
      'positive',
      'warning',
      'highlight',
      'highlight-lead',
      'strikethrough',
    ] as const)('renders with type %s', (type) => {
      render(<CardListAction title='Test Title' type={type} />);
      expect(screen.getByTestId('card-list-action')).toBeInTheDocument();
    });

    it('renders inverted layout', () => {
      render(
        <CardListAction
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
    it('renders chevron action by default', () => {
      const { container } = render(<CardListAction title='Test Title' />);

      expect(
        container.querySelector('.ods-card-list-action__action')
      ).toBeInTheDocument();
    });

    it('renders chevron action explicitly', () => {
      const { container } = render(
        <CardListAction title='Test Title' actionType='chevron' />
      );

      expect(
        container.querySelector('.ods-card-list-action__action')
      ).toBeInTheDocument();
    });

    it('renders menu action type', () => {
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
        <CardListAction
          title='Test Title'
          actionType='menu'
          menuActions={menuActions}
        />
      );

      expect(screen.getByTestId('card-list-action')).toBeInTheDocument();
    });

    it('renders swipe action type with swipe mode class', () => {
      const swipeActions: ActionItem[] = [
        {
          label: 'Edit',
          onClick: jest.fn(),
          icon: <Pencil />,
          variant: 'default',
        },
      ];

      render(
        <CardListAction
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

    it.each([
      'bottom-left',
      'bottom-right',
      'top-left',
      'top-right',
    ] as const)('renders with menu position %s', (position) => {
      render(
        <CardListAction
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
    it('calls onClick when clicked', () => {
      const handleClick = jest.fn();
      render(<CardListAction title='Test Title' onClick={handleClick} />);

      fireEvent.click(screen.getByTestId('card-list-action'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('passes event to onClick handler', () => {
      const handleClick = jest.fn();
      render(<CardListAction title='Test Title' onClick={handleClick} />);

      fireEvent.click(screen.getByTestId('card-list-action'));
      expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
      expect(handleClick.mock.calls[0][0]).toHaveProperty('target');
    });

    it('does not throw error when onClick is not provided', () => {
      expect(() => {
        render(<CardListAction title='Test Title' />);
        fireEvent.click(screen.getByTestId('card-list-action'));
      }).not.toThrow();
    });
  });

  describe('HTML Attributes', () => {
    it('forwards native button props', () => {
      render(
        <CardListAction
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

    it('is a button element', () => {
      render(<CardListAction title='Test Title' />);

      const element = screen.getByTestId('card-list-action');
      expect(element.tagName).toBe('BUTTON');
      expect(element).toHaveAttribute('type', 'button');
    });

    it('has correct data-testid', () => {
      render(<CardListAction title='Test Title' />);

      expect(screen.getByTestId('card-list-action')).toBeInTheDocument();
    });
  });

  describe('ForwardRef', () => {
    it('forwards ref to button element', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<CardListAction title='Test Title' ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.tagName).toBe('BUTTON');
    });

    it('allows calling button methods through ref', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<CardListAction title='Test Title' ref={ref} />);

      expect(ref.current?.focus).toBeDefined();
      expect(ref.current?.click).toBeDefined();
    });
  });

  describe('Snapshot', () => {
    it('matches snapshot with default props', () => {
      const { container } = render(<CardListAction title='Test Title' />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot with all props', () => {
      const { container } = render(
        <CardListAction
          title='Test Title'
          description='Test Description'
          caption='Test Caption'
          icon={<PlaceholderOutline />}
          indicator={<Tag type='positive'>New</Tag>}
          type='highlight'
          actionType='chevron'
          onClick={jest.fn()}
          className='test-class'
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot in loading state', () => {
      const { container } = render(<CardListAction title='Test Title' loading />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot in disabled state', () => {
      const { container } = render(
        <CardListAction title='Test Title' disabled />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
