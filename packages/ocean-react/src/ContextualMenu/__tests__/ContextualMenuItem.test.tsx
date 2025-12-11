import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Trash } from '@useblu/ocean-icons-react';

import ContextualMenuItem from '../ContextualMenuItem';

describe('ContextualMenuItem', () => {
  test('renders item with label', () => {
    render(
      <ContextualMenuItem
        label="Test Item"
        value="test"
        type="primary"
        onClick={jest.fn()}
      />
    );

    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  test('calls onClick when item is clicked', () => {
    const onClick = jest.fn();

    render(
      <ContextualMenuItem
        label="Test Item"
        value="test"
        type="primary"
        onClick={onClick}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('stops event propagation on click', () => {
    const onClick = jest.fn();
    const parentClick = jest.fn();

    render(
      <div onClick={parentClick}>
        <ContextualMenuItem
          label="Test Item"
          value="test"
          type="primary"
          onClick={onClick}
        />
      </div>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
    // O evento não deve propagar para o pai
    expect(parentClick).not.toHaveBeenCalled();
  });

  test('renders disabled item', () => {
    render(
      <ContextualMenuItem
        label="Disabled Item"
        value="disabled"
        type="neutral"
        onClick={jest.fn()}
        disabled
      />
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('does not call onClick when disabled', () => {
    const onClick = jest.fn();

    render(
      <ContextualMenuItem
        label="Disabled Item"
        value="disabled"
        type="neutral"
        onClick={onClick}
        disabled
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  test('renders selected item with correct class', () => {
    render(
      <ContextualMenuItem
        label="Selected Item"
        value="selected"
        type="primary"
        onClick={jest.fn()}
        selectedValue="selected"
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('ods-contextual-menu__item__button--selected');
  });

  test('does not show selected class when value does not match', () => {
    render(
      <ContextualMenuItem
        label="Not Selected"
        value="item1"
        type="primary"
        onClick={jest.fn()}
        selectedValue="item2"
      />
    );

    const button = screen.getByRole('button');
    expect(button).not.toHaveClass(
      'ods-contextual-menu__item__button--selected'
    );
  });

  test('renders blocked item with lock icon', () => {
    render(
      <ContextualMenuItem
        label="Blocked Item"
        value="blocked"
        type="primary"
        onClick={jest.fn()}
        blocked
      />
    );

    // O ícone de cadeado deve estar presente
    const lockIcon = document.querySelector('svg');
    expect(lockIcon).toBeInTheDocument();
  });

  test('applies blocked class', () => {
    render(
      <ContextualMenuItem
        label="Blocked Item"
        value="blocked"
        type="primary"
        onClick={jest.fn()}
        blocked
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('ods-contextual-menu__item__button--blocked');
  });

  test('renders item with icon', () => {
    render(
      <ContextualMenuItem
        label="Delete"
        value="delete"
        type="critical"
        onClick={jest.fn()}
        icon={<Trash data-testid="trash-icon" />}
      />
    );

    expect(screen.getByTestId('trash-icon')).toBeInTheDocument();
  });

  test('applies with-icon class when icon is present', () => {
    render(
      <ContextualMenuItem
        label="Delete"
        value="delete"
        type="critical"
        onClick={jest.fn()}
        icon={<Trash />}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('ods-contextual-menu__item__button--with-icon');
  });

  test('renders item with tag', () => {
    render(
      <ContextualMenuItem
        label="New Feature"
        value="new"
        type="primary"
        onClick={jest.fn()}
        tag={{ variant: 'highlight', type: 'important', children: 'New' }}
      />
    );

    expect(screen.getByText('New')).toBeInTheDocument();
  });

  test('renders primary type with correct class', () => {
    render(
      <ContextualMenuItem
        label="Primary"
        value="primary"
        type="primary"
        onClick={jest.fn()}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('ods-contextual-menu__item__button--primary');
  });

  test('renders neutral type with correct class', () => {
    render(
      <ContextualMenuItem
        label="Neutral"
        value="neutral"
        type="neutral"
        onClick={jest.fn()}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('ods-contextual-menu__item__button--neutral');
  });

  test('renders critical type with correct class', () => {
    render(
      <ContextualMenuItem
        label="Critical"
        value="critical"
        type="critical"
        onClick={jest.fn()}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('ods-contextual-menu__item__button--critical');
  });

  test('renders with custom id', () => {
    render(
      <ContextualMenuItem
        label="Custom ID"
        value="custom"
        type="primary"
        onClick={jest.fn()}
        id="custom-item-id"
      />
    );

    const button = document.getElementById('custom-item-id');
    expect(button).toBeInTheDocument();
  });

  test('renders icon with correct classes when disabled', () => {
    render(
      <ContextualMenuItem
        label="Disabled"
        value="disabled"
        type="primary"
        onClick={jest.fn()}
        icon={<Trash data-testid="icon-disabled" />}
        disabled
      />
    );

    const iconSpan = screen.getByTestId('icon-disabled').parentElement;
    expect(iconSpan).toHaveClass(
      'ods-contextual-menu__item__button__icon--disabled'
    );
  });

  test('renders icon with correct classes when blocked', () => {
    render(
      <ContextualMenuItem
        label="Blocked"
        value="blocked"
        type="primary"
        onClick={jest.fn()}
        icon={<Trash data-testid="icon-blocked" />}
        blocked
      />
    );

    const iconSpan = screen.getByTestId('icon-blocked').parentElement;
    expect(iconSpan).toHaveClass(
      'ods-contextual-menu__item__button__icon--blocked'
    );
  });

  test('renders with all props combined', () => {
    const onClick = jest.fn();

    render(
      <ContextualMenuItem
        label="Complex Item"
        value="complex"
        type="critical"
        onClick={onClick}
        icon={<Trash data-testid="icon" />}
        tag={{ variant: 'highlight', type: 'important', children: 'Tag' }}
        selectedValue="complex"
        id="complex-id"
      />
    );

    expect(screen.getByText('Complex Item')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Tag')).toBeInTheDocument();
    expect(document.getElementById('complex-id')).toBeInTheDocument();

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
