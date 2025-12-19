import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Trash } from '@useblu/ocean-icons-react';

import ContextualMenu from '../ContextualMenu';

const mockItems = [
  { type: 'primary' as const, label: 'Option 1', value: 'option1' },
  { type: 'neutral' as const, label: 'Option 2', value: 'option2' },
  { type: 'critical' as const, label: 'Delete', value: 'delete' },
];

describe('ContextualMenu', () => {
  test('renders menu when open is true', () => {
    render(
      <ContextualMenu
        items={mockItems}
        open
        onOpenChange={jest.fn()}
        data-testid="contextual-menu"
      />
    );

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  test('does not render menu when open is false', () => {
    render(
      <ContextualMenu items={mockItems} open={false} onOpenChange={jest.fn()} />
    );

    const menu = screen.getByRole('list');
    expect(menu).toHaveClass('ods-contextual-menu--before-close');
  });

  test('applies correct CSS classes when open', () => {
    render(<ContextualMenu items={mockItems} open onOpenChange={jest.fn()} />);

    const menu = screen.getByRole('list');
    expect(menu).toHaveClass('ods-contextual-menu--after-open');
  });

  test('calls onOpenChange when clicking overlay', () => {
    const onOpenChange = jest.fn();
    render(
      <ContextualMenu items={mockItems} open onOpenChange={onOpenChange} />
    );

    const overlay = screen.getByTestId('contextual-menu-overlay');
    fireEvent.click(overlay);

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  test('calls onOpenChange when clicking close button', () => {
    const onOpenChange = jest.fn();
    render(
      <ContextualMenu items={mockItems} open onOpenChange={onOpenChange} />
    );

    const closeButton = screen.getByLabelText('Fechar menu');
    fireEvent.click(closeButton);

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  test('overlay has aria-hidden attribute', () => {
    render(<ContextualMenu items={mockItems} open onOpenChange={jest.fn()} />);
    const overlay = screen.getByTestId('contextual-menu-overlay');
    expect(overlay).toHaveAttribute('aria-hidden', 'true');
  });

  test('calls onSelect and onOpenChange when clicking an item', () => {
    const onSelect = jest.fn();
    const onOpenChange = jest.fn();

    render(
      <ContextualMenu
        items={mockItems}
        open
        onOpenChange={onOpenChange}
        onSelect={onSelect}
      />
    );

    const option1 = screen.getByText('Option 1');
    fireEvent.click(option1);

    expect(onSelect).toHaveBeenCalledWith('option1');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  test('renders item with selected state', () => {
    render(
      <ContextualMenu
        items={mockItems}
        open
        onOpenChange={jest.fn()}
        selectedValue="option1"
      />
    );

    const selectedItem = screen.getByText('Option 1').closest('button');
    expect(selectedItem).toHaveClass(
      'ods-contextual-menu__item__button--primary-selected'
    );
  });

  test('renders disabled item', () => {
    const disabledItems = [
      {
        type: 'neutral' as const,
        label: 'Disabled Option',
        value: 'disabled',
        disabled: true,
      },
    ];

    render(
      <ContextualMenu items={disabledItems} open onOpenChange={jest.fn()} />
    );

    const disabledButton = screen
      .getByText('Disabled Option')
      .closest('button');
    expect(disabledButton).toBeDisabled();
  });

  test('renders blocked item', () => {
    const blockedItems = [
      {
        type: 'primary' as const,
        label: 'Blocked Option',
        value: 'blocked',
        blocked: true,
      },
    ];

    render(
      <ContextualMenu items={blockedItems} open onOpenChange={jest.fn()} />
    );

    const blockedItem = screen.getByText('Blocked Option').closest('button');
    expect(blockedItem).toHaveClass(
      'ods-contextual-menu__item__button--blocked'
    );
  });

  test('renders item with icon', () => {
    const itemsWithIcon = [
      {
        type: 'critical' as const,
        label: 'Delete',
        value: 'delete',
        icon: <Trash data-testid="trash-icon" />,
      },
    ];

    render(
      <ContextualMenu items={itemsWithIcon} open onOpenChange={jest.fn()} />
    );

    expect(screen.getByTestId('trash-icon')).toBeInTheDocument();
  });

  test('renders item with tag', () => {
    const itemsWithTag = [
      {
        type: 'primary' as const,
        label: 'New Feature',
        value: 'new',
        tag: {
          variant: 'highlight' as const,
          type: 'important' as const,
          children: 'New',
        },
      },
    ];

    render(
      <ContextualMenu items={itemsWithTag} open onOpenChange={jest.fn()} />
    );

    expect(screen.getByText('New')).toBeInTheDocument();
  });

  test('renders different item types with correct classes', () => {
    render(<ContextualMenu items={mockItems} open onOpenChange={jest.fn()} />);

    const primaryItem = screen.getByText('Option 1').closest('button');
    const neutralItem = screen.getByText('Option 2').closest('button');
    const criticalItem = screen.getByText('Delete').closest('button');

    expect(primaryItem).toHaveClass(
      'ods-contextual-menu__item__button--primary'
    );
    expect(neutralItem).toHaveClass(
      'ods-contextual-menu__item__button--neutral'
    );
    expect(criticalItem).toHaveClass(
      'ods-contextual-menu__item__button--critical'
    );
  });

  test('applies custom className', () => {
    render(
      <ContextualMenu
        items={mockItems}
        open
        onOpenChange={jest.fn()}
        className="custom-menu-class"
      />
    );

    const menu = screen.getByRole('list');
    expect(menu).toHaveClass('custom-menu-class');
  });

  test('renders all items from array', () => {
    render(<ContextualMenu items={mockItems} open onOpenChange={jest.fn()} />);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  test('does not call onSelect when item is disabled', () => {
    const onSelect = jest.fn();
    const disabledItems = [
      {
        type: 'neutral' as const,
        label: 'Disabled',
        value: 'disabled',
        disabled: true,
      },
    ];

    render(
      <ContextualMenu
        items={disabledItems}
        open
        onOpenChange={jest.fn()}
        onSelect={onSelect}
      />
    );

    const disabledButton = screen.getByText('Disabled').closest('button');
    fireEvent.click(disabledButton!);

    // O botão está disabled, então o onClick não deve ser chamado
    expect(onSelect).not.toHaveBeenCalled();
  });

  test('renders menu with custom item id', () => {
    const itemsWithId = [
      {
        type: 'primary' as const,
        label: 'Option',
        value: 'option',
        id: 'custom-id',
      },
    ];

    render(
      <ContextualMenu items={itemsWithId} open onOpenChange={jest.fn()} />
    );

    const button = document.getElementById('custom-id');
    expect(button).toBeInTheDocument();
  });

  test('renders overlay with correct classes when open', () => {
    render(<ContextualMenu items={mockItems} open onOpenChange={jest.fn()} />);

    const overlay = screen.getByTestId('contextual-menu-overlay');
    expect(overlay).toHaveClass('ods-contextual-menu__overlay--after-open');
  });

  test('renders overlay with correct classes when closed', () => {
    render(
      <ContextualMenu items={mockItems} open={false} onOpenChange={jest.fn()} />
    );

    const overlay = screen.getByTestId('contextual-menu-overlay');
    expect(overlay).toHaveClass('ods-contextual-menu__overlay--before-close');
  });
});
