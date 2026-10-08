import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import TransactionListAction from '../TransactionListAction';

const tagElement = (): HTMLElement =>
  document.querySelector('.ods-tag') as HTMLElement;

describe('TransactionListAction', () => {
  test('renders the chevron and calls onClick once per click', () => {
    const onClick = jest.fn();
    render(
      <TransactionListAction
        title="Title"
        description="Description"
        amount="R$ 0,00"
        icon={<svg data-testid="icon" />}
        onClick={onClick}
      />
    );

    expect(
      document.querySelector('.ods-transaction-list__chevron')
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('transaction-list-divider')).toBeInTheDocument();
  });

  test('disabled does not call onClick and uses the inactive type', () => {
    const onClick = jest.fn();
    render(
      <TransactionListAction
        title="Title"
        description="Description"
        amount="R$ 0,00"
        amountTag={{ label: 'Label' }}
        onClick={onClick}
        disabled
      />
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByTestId('transaction-list-action')).toHaveClass(
      'ods-transaction-list--disabled'
    );
    expect(tagElement()).toHaveClass('ods-tag--neutral');
    expect(
      document.querySelector('.ods-amount-details--inactive')
    ).toBeInTheDocument();
  });

  test('loading shows the skeleton, no chevron and is not clickable', () => {
    const onClick = jest.fn();
    render(
      <TransactionListAction
        title="Title"
        amount="R$ 0,00"
        onClick={onClick}
        loading
        showDivider={false}
      />
    );

    expect(screen.getByTestId('transaction-list-skeleton')).toBeInTheDocument();
    expect(
      document.querySelector('.ods-transaction-list__chevron')
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
    expect(
      screen.queryByTestId('transaction-list-divider')
    ).not.toBeInTheDocument();
  });

  test('loading with icon shows the icon placeholder', () => {
    render(
      <TransactionListAction
        title="Title"
        amount="R$ 0,00"
        icon={<svg />}
        loading
      />
    );

    expect(
      document.querySelector('.ods-transaction-list__icon .ods-skeleton-bar')
    ).toBeInTheDocument();
  });

  test('forwards ref and rest props to the button and className to the root', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <TransactionListAction
        ref={ref}
        title="Title"
        amount="R$ 0,00"
        className="custom"
        aria-label="Abrir detalhe"
        contentSize="sm"
        amountSize="sm"
      />
    );

    expect(ref.current).toBe(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Abrir detalhe'
    );
    expect(screen.getByTestId('transaction-list-action')).toHaveClass('custom');
  });

  describe('menu and swipe (Figma Type=Menu | Swipe)', () => {
    const actions = [
      { label: 'Editar', onClick: jest.fn() },
      { label: 'Excluir', onClick: jest.fn(), variant: 'negative' as const },
    ];

    test('menu renders the trigger instead of the chevron and opens the menu', () => {
      const onClick = jest.fn();
      render(
        <TransactionListAction
          title="Title"
          amount="R$ 0,00"
          actionType="menu"
          menuActions={actions}
          menuPosition="bottom-left"
          onClick={onClick}
        />
      );

      expect(screen.getByTestId('transaction-list-action')).toHaveClass(
        'ods-transaction-list--menu'
      );
      expect(
        document.querySelector('.ods-transaction-list__chevron')
      ).not.toBeInTheDocument();

      fireEvent.click(screen.getByLabelText('Abrir menu de ações'));
      expect(screen.getByText('Editar')).toBeInTheDocument();
      expect(onClick).not.toHaveBeenCalled();

      fireEvent.click(screen.getByText('Excluir'));
      expect(actions[1].onClick).toHaveBeenCalledTimes(1);
    });

    test('menu without actions still renders the trigger', () => {
      render(
        <TransactionListAction
          title="Title"
          amount="R$ 0,00"
          actionType="menu"
        />
      );

      expect(screen.getByLabelText('Abrir menu de ações')).toBeInTheDocument();
    });

    test('menu disabled disables the trigger', () => {
      render(
        <TransactionListAction
          title="Title"
          amount="R$ 0,00"
          actionType="menu"
          menuActions={actions}
          disabled
        />
      );

      expect(screen.getByLabelText('Abrir menu de ações')).toBeDisabled();
    });

    test('menu and swipe loading hide the actions', () => {
      render(
        <TransactionListAction
          title="Title"
          amount="R$ 0,00"
          actionType="swipe"
          menuActions={actions}
          loading
        />
      );

      expect(
        screen.queryByLabelText('Abrir menu de ações')
      ).not.toBeInTheDocument();
      expect(
        screen.getByTestId('transaction-list-skeleton')
      ).toBeInTheDocument();
    });

    test('swipe opens sideways, translating the main by the menu width, and closes', async () => {
      const offsetWidth = jest
        .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
        .mockReturnValue(120);

      render(
        <TransactionListAction
          title="Title"
          amount="R$ 0,00"
          actionType="swipe"
          menuActions={actions}
        />
      );

      const root = screen.getByTestId('transaction-list-action');
      expect(root).toHaveClass('ods-transaction-list--swipe');

      fireEvent.click(screen.getByLabelText('Abrir menu de ações'));

      await waitFor(() =>
        expect(root).toHaveClass('ods-transaction-list--swipe-open')
      );
      await waitFor(() =>
        expect(screen.getByRole('button', { name: /Title/ })).toHaveStyle(
          'transform: translateX(-120px)'
        )
      );

      fireEvent.click(screen.getByLabelText('Fechar menu'));
      await waitFor(() =>
        expect(root).not.toHaveClass('ods-transaction-list--swipe-open')
      );

      offsetWidth.mockRestore();
    });

    test('swipe without measured width does not translate', async () => {
      render(
        <TransactionListAction
          title="Title"
          amount="R$ 0,00"
          actionType="swipe"
          menuActions={actions}
        />
      );

      fireEvent.click(screen.getByLabelText('Abrir menu de ações'));

      const root = screen.getByTestId('transaction-list-action');
      await waitFor(() =>
        expect(root).toHaveClass('ods-transaction-list--swipe-open')
      );
      expect(screen.getByRole('button', { name: /Title/ })).not.toHaveAttribute(
        'style'
      );
    });
  });

  test('loading button has an accessible name; loaded button uses its content', () => {
    const { rerender } = render(
      <TransactionListAction title="Title" amount="R$ 0,00" loading />
    );

    expect(screen.getByRole('button', { name: 'Carregando' })).toBeDisabled();

    rerender(<TransactionListAction title="Title" amount="R$ 0,00" />);

    expect(screen.getByRole('button', { name: /Title/ })).toBeEnabled();
  });
});
