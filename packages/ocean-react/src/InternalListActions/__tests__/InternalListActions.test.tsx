import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import InternalListActions from '../InternalListActions';
import type { ActionItem } from '../InternalListActions';

const mockActions: ActionItem[] = [
  {
    label: 'Edit',
    onClick: jest.fn(),
  },
  {
    label: 'Delete',
    onClick: jest.fn(),
  },
];

describe('InternalListActions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window.innerWidth for mobile detection
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  describe('Rendering', () => {
    test('renders the trigger button', () => {
      render(<InternalListActions actions={mockActions} />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      expect(trigger).toBeInTheDocument();
    });

    test('does not render menu initially', () => {
      render(<InternalListActions actions={mockActions} />);
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    test('renders menu when trigger is clicked', () => {
      render(<InternalListActions actions={mockActions} />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      fireEvent.click(trigger);
      
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    test('renders all action items', () => {
      render(<InternalListActions actions={mockActions} />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      fireEvent.click(trigger);
      
      expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: 'Delete' })).toBeInTheDocument();
    });

    test('renders action items with icons', () => {
      const actionsWithIcons: ActionItem[] = [
        {
          label: 'Edit',
          onClick: jest.fn(),
          icon: <span data-testid="edit-icon">Icon</span>,
        },
      ];

      render(<InternalListActions actions={actionsWithIcons} />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      fireEvent.click(trigger);
      
      expect(screen.getByTestId('edit-icon')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    test('applies disabled state to trigger button', () => {
      render(<InternalListActions actions={mockActions} disabled />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      expect(trigger).toBeDisabled();
    });

    test('does not open menu when trigger is disabled', () => {
      render(<InternalListActions actions={mockActions} disabled />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      fireEvent.click(trigger);
      
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    test('applies active class to trigger when menu is open', () => {
      render(<InternalListActions actions={mockActions} />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      fireEvent.click(trigger);
      
      expect(trigger).toHaveClass('ods-internal-list-actions__trigger--active');
    });

    test('disables specific action items', () => {
      const actionsWithDisabled: ActionItem[] = [
        {
          label: 'Edit',
          onClick: jest.fn(),
        },
        {
          label: 'Delete',
          onClick: jest.fn(),
          disabled: true,
        },
      ];

      render(<InternalListActions actions={actionsWithDisabled} />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      fireEvent.click(trigger);
      
      const deleteButton = screen.getByRole('menuitem', { name: 'Delete' });
      expect(deleteButton).toBeDisabled();
      expect(deleteButton).toHaveClass('ods-internal-list-actions__menu-item--disabled');
    });
  });

  describe('Interactions', () => {
    test('calls action onClick when clicked', () => {
      const onClickMock = jest.fn();
      const actions: ActionItem[] = [
        {
          label: 'Edit',
          onClick: onClickMock,
        },
      ];

      render(<InternalListActions actions={actions} />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      fireEvent.click(trigger);
      
      const editButton = screen.getByRole('menuitem', { name: 'Edit' });
      fireEvent.click(editButton);
      
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    test('does not call action onClick when action is disabled', () => {
      const onClickMock = jest.fn();
      const actions: ActionItem[] = [
        {
          label: 'Edit',
          onClick: onClickMock,
          disabled: true,
        },
      ];

      render(<InternalListActions actions={actions} />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      fireEvent.click(trigger);
      
      const editButton = screen.getByRole('menuitem', { name: 'Edit' });
      fireEvent.click(editButton);
      
      expect(onClickMock).not.toHaveBeenCalled();
    });

    test('closes menu after action is clicked', async () => {
      const onClickMock = jest.fn();
      const actions: ActionItem[] = [
        {
          label: 'Edit',
          onClick: onClickMock,
        },
      ];

      render(<InternalListActions actions={actions} />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      fireEvent.click(trigger);
      
      const editButton = screen.getByRole('menuitem', { name: 'Edit' });
      fireEvent.click(editButton);
      
      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });
    });

    test('toggles menu open and closed', () => {
      render(<InternalListActions actions={mockActions} />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      // Open
      fireEvent.click(trigger);
      expect(screen.getByRole('menu')).toBeInTheDocument();
      
      // Close
      fireEvent.click(trigger);
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    test('closes menu when clicking outside', () => {
      render(
        <div>
          <div data-testid="outside">Outside</div>
          <InternalListActions actions={mockActions} />
        </div>
      );
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      fireEvent.click(trigger);
      expect(screen.getByRole('menu')).toBeInTheDocument();
      
      fireEvent.mouseDown(screen.getByTestId('outside'));
      
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  describe('Positions', () => {
    test('applies bottom-right position class by default', () => {
      render(<InternalListActions actions={mockActions} />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      fireEvent.click(trigger);
      
      const menu = screen.getByRole('menu');
      expect(menu).toHaveClass('ods-internal-list-actions__menu--bottom-right');
    });

    test('applies bottom-left position class', () => {
      render(<InternalListActions actions={mockActions} position="bottom-left" />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      fireEvent.click(trigger);
      
      const menu = screen.getByRole('menu');
      expect(menu).toHaveClass('ods-internal-list-actions__menu--bottom-left');
    });

    test('applies top-left position class', () => {
      render(<InternalListActions actions={mockActions} position="top-left" />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      fireEvent.click(trigger);
      
      const menu = screen.getByRole('menu');
      expect(menu).toHaveClass('ods-internal-list-actions__menu--top-left');
    });

    test('applies top-right position class', () => {
      render(<InternalListActions actions={mockActions} position="top-right" />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      fireEvent.click(trigger);
      
      const menu = screen.getByRole('menu');
      expect(menu).toHaveClass('ods-internal-list-actions__menu--top-right');
    });
  });

  describe('Variants', () => {
    test('applies positive variant class', () => {
      const actions: ActionItem[] = [
        {
          label: 'Archive',
          onClick: jest.fn(),
          variant: 'positive',
        },
      ];

      render(<InternalListActions actions={actions} />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      fireEvent.click(trigger);
      
      const archiveButton = screen.getByRole('menuitem', { name: 'Archive' });
      expect(archiveButton).toHaveClass('ods-internal-list-actions__menu-item--positive');
    });

    test('applies warning variant class', () => {
      const actions: ActionItem[] = [
        {
          label: 'Warning',
          onClick: jest.fn(),
          variant: 'warning',
        },
      ];

      render(<InternalListActions actions={actions} />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      fireEvent.click(trigger);
      
      const warningButton = screen.getByRole('menuitem', { name: 'Warning' });
      expect(warningButton).toHaveClass('ods-internal-list-actions__menu-item--warning');
    });

    test('applies negative variant class', () => {
      const actions: ActionItem[] = [
        {
          label: 'Delete',
          onClick: jest.fn(),
          variant: 'negative',
        },
      ];

      render(<InternalListActions actions={actions} />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      fireEvent.click(trigger);
      
      const deleteButton = screen.getByRole('menuitem', { name: 'Delete' });
      expect(deleteButton).toHaveClass('ods-internal-list-actions__menu-item--negative');
    });

    test('applies neutral variant class', () => {
      const actions: ActionItem[] = [
        {
          label: 'Info',
          onClick: jest.fn(),
          variant: 'neutral',
        },
      ];

      render(<InternalListActions actions={actions} />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      fireEvent.click(trigger);
      
      const infoButton = screen.getByRole('menuitem', { name: 'Info' });
      expect(infoButton).toHaveClass('ods-internal-list-actions__menu-item--neutral');
    });

    test('applies default variant class', () => {
      const actions: ActionItem[] = [
        {
          label: 'Default',
          onClick: jest.fn(),
          variant: 'default',
        },
      ];

      render(<InternalListActions actions={actions} />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      fireEvent.click(trigger);
      
      const defaultButton = screen.getByRole('menuitem', { name: 'Default' });
      expect(defaultButton).toHaveClass('ods-internal-list-actions__menu-item--default');
    });
  });

  describe('Mobile Mode', () => {
    beforeEach(() => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
    });

    test('detects mobile viewport', () => {
      render(<InternalListActions actions={mockActions} />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      // Trigger resize event
      fireEvent(window, new Event('resize'));
      fireEvent.click(trigger);
      
      // Mobile mode should show backdrop
      const backdrop = document.querySelector('.ods-internal-list-actions__backdrop');
      expect(backdrop).toBeInTheDocument();
    });

    test('disables mobile mode when withMobileMode is false', () => {
      render(<InternalListActions actions={mockActions} withMobileMode={false} />);
      
      const container = document.querySelector('.ods-internal-list-actions');
      expect(container).toHaveClass('ods-internal-list-actions--disable-mobile');
    });

    test('shows drag handle in mobile mode', () => {
      render(<InternalListActions actions={mockActions} />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      // Trigger resize event
      fireEvent(window, new Event('resize'));
      fireEvent.click(trigger);
      
      const dragHandle = screen.getByRole('button', { name: /fechar menu/i });
      expect(dragHandle).toBeInTheDocument();
    });

    test('closes menu when clicking backdrop in mobile mode', async () => {
      render(<InternalListActions actions={mockActions} />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      // Trigger resize event
      fireEvent(window, new Event('resize'));
      fireEvent.click(trigger);
      
      const backdrop = document.querySelector('.ods-internal-list-actions__backdrop');
      if (backdrop) {
        fireEvent.click(backdrop);
      }
      
      // Mobile has animation delay
      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      }, { timeout: 400 });
    });

    test('closes menu when clicking drag handle in mobile mode', async () => {
      render(<InternalListActions actions={mockActions} />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      // Trigger resize event
      fireEvent(window, new Event('resize'));
      fireEvent.click(trigger);
      
      const dragHandle = screen.getByRole('button', { name: /fechar menu/i });
      fireEvent.click(dragHandle);
      
      // Mobile has animation delay
      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      }, { timeout: 400 });
    });

    test('applies closing animation class in mobile mode', () => {
      render(<InternalListActions actions={mockActions} />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      // Trigger resize event
      fireEvent(window, new Event('resize'));
      fireEvent.click(trigger);
      
      const menu = screen.getByRole('menu');
      fireEvent.click(trigger);
      
      expect(menu).toHaveClass('ods-internal-list-actions__menu--closing');
    });
  });

  describe('Accessibility', () => {
    test('has correct ARIA attributes on trigger', () => {
      render(<InternalListActions actions={mockActions} />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      expect(trigger).toHaveAttribute('aria-label', 'Abrir menu de ações');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    test('updates aria-expanded when menu is opened', () => {
      render(<InternalListActions actions={mockActions} />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      fireEvent.click(trigger);
      
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    test('menu has correct role', () => {
      render(<InternalListActions actions={mockActions} />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      fireEvent.click(trigger);
      
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    test('action items have correct role', () => {
      render(<InternalListActions actions={mockActions} />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      fireEvent.click(trigger);
      
      const editButton = screen.getByRole('menuitem', { name: 'Edit' });
      expect(editButton).toBeInTheDocument();
    });

    test('backdrop is hidden from screen readers', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(<InternalListActions actions={mockActions} />);
      const trigger = screen.getByRole('button', { name: /abrir menu de ações/i });
      
      fireEvent(window, new Event('resize'));
      fireEvent.click(trigger);
      
      const backdrop = document.querySelector('.ods-internal-list-actions__backdrop');
      expect(backdrop).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Custom Props', () => {
    test('applies custom className', () => {
      render(<InternalListActions actions={mockActions} className="custom-class" />);
      
      const container = document.querySelector('.ods-internal-list-actions');
      expect(container).toHaveClass('custom-class');
    });

    test('forwards ref to wrapper element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<InternalListActions actions={mockActions} ref={ref} />);
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('ods-internal-list-actions');
    });

    test('passes additional props to wrapper', () => {
      render(<InternalListActions actions={mockActions} data-testid="custom-wrapper" />);
      
      expect(screen.getByTestId('custom-wrapper')).toBeInTheDocument();
    });
  });
});

