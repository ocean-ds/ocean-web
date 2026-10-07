import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TransactionListSelectable from '../TransactionListSelectable';

describe('TransactionListSelectable', () => {
  test('renders a checkbox by default (web) and toggles it', () => {
    const onChange = jest.fn();
    render(
      <TransactionListSelectable
        title="Title"
        description="Description"
        amount="R$ 0,00"
        checkbox={{ onChange }}
      />
    );

    const root = screen.getByTestId('transaction-list-selectable');
    expect(root).toHaveClass(
      'ods-transaction-list--selectable',
      'ods-transaction-list--web'
    );
    fireEvent.click(screen.getByText('Description'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('checkbox')).toBeEnabled();
    expect(screen.getByTestId('transaction-list-divider')).toBeInTheDocument();
  });

  test('renders without control props as an uncontrolled checkbox', () => {
    render(<TransactionListSelectable title="Title" amount="R$ 0,00" />);

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('renders a radio on the app platform', () => {
    render(
      <TransactionListSelectable
        title="Title"
        amount="R$ 0,00"
        platform="app"
        radio={{ name: 'group', value: 'a' }}
      />
    );

    expect(screen.getByRole('radio')).toBeInTheDocument();
    expect(screen.getByTestId('transaction-list-selectable')).toHaveClass(
      'ods-transaction-list--app'
    );
  });

  test('disabled disables the control and uses the inactive type', () => {
    render(
      <TransactionListSelectable
        title="Title"
        description="Description"
        amount="R$ 0,00"
        amountTag={{ label: 'Label' }}
        disabled
      />
    );

    expect(screen.getByRole('checkbox')).toBeDisabled();
    expect(screen.getByTestId('transaction-list-selectable')).toHaveClass(
      'ods-transaction-list--disabled'
    );
    expect(screen.getByRole('Tag')).toHaveClass('ods-tag--neutral');
    expect(
      document.querySelector('.ods-amount-details--inactive')
    ).toBeInTheDocument();
  });

  test.each([
    [
      'checkbox',
      { checkbox: { disabled: true, checked: true, readOnly: true } },
    ],
    ['radio', { radio: { disabled: true, checked: true, readOnly: true } }],
  ])('disabled %s control also disables the item', (role, controlProps) => {
    render(
      <TransactionListSelectable
        title="Title"
        amount="R$ 0,00"
        {...controlProps}
      />
    );

    expect(screen.getByRole(role)).toBeDisabled();
    expect(screen.getByTestId('transaction-list-selectable')).toHaveClass(
      'ods-transaction-list--disabled'
    );
  });

  test('loading shows the control and content skeletons', () => {
    render(
      <TransactionListSelectable
        title="Title"
        amount="R$ 0,00"
        loading
        showDivider={false}
        className="custom"
      />
    );

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
    expect(
      document.querySelector('.ods-transaction-list__control .ods-skeleton-bar')
    ).toBeInTheDocument();
    expect(screen.getByTestId('transaction-list-skeleton')).toBeInTheDocument();
    expect(
      screen.queryByTestId('transaction-list-divider')
    ).not.toBeInTheDocument();
    expect(screen.getByTestId('transaction-list-selectable')).toHaveClass(
      'custom'
    );
  });

  test('forwards ref to the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<TransactionListSelectable ref={ref} title="T" amount="R$ 0,00" />);

    expect(ref.current).toBe(screen.getByTestId('transaction-list-selectable'));
  });

  describe.each([
    ['checkbox', 'web'],
    ['checkbox', 'app'],
    ['radio', 'web'],
    ['radio', 'app'],
  ] as const)('Figma states — %s / %s', (controller, platform) => {
    const renderState = (
      controlProps: Record<string, unknown>,
      extra: Record<string, unknown> = {}
    ) =>
      render(
        <TransactionListSelectable
          title="Title"
          amount="R$ 0,00"
          platform={platform}
          {...{ [controller]: { readOnly: true, ...controlProps } }}
          {...extra}
        />
      );

    test('Default: unchecked and enabled', () => {
      renderState({});

      expect(screen.getByRole(controller)).not.toBeChecked();
      expect(screen.getByRole(controller)).toBeEnabled();
      expect(screen.getByTestId('transaction-list-selectable')).toHaveClass(
        `ods-transaction-list--${platform}`
      );
    });

    test('Hover: simulated hover class reaches the root', () => {
      renderState({}, { className: 'ods-transaction-list--show-hover' });

      expect(screen.getByTestId('transaction-list-selectable')).toHaveClass(
        'ods-transaction-list--show-hover'
      );
    });

    test('Selected: checked', () => {
      renderState({ checked: true });

      expect(screen.getByRole(controller)).toBeChecked();
    });

    test('Disabled: disabled and inactive', () => {
      renderState({}, { disabled: true });

      expect(screen.getByRole(controller)).toBeDisabled();
      expect(screen.getByRole(controller)).not.toBeChecked();
      expect(
        document.querySelector('.ods-amount-details--inactive')
      ).toBeInTheDocument();
    });

    test('Disabled Selected: disabled and checked', () => {
      renderState({ checked: true }, { disabled: true });

      expect(screen.getByRole(controller)).toBeDisabled();
      expect(screen.getByRole(controller)).toBeChecked();
    });

    test('Error: control in error state', () => {
      renderState({ error: true });

      expect(
        document.querySelector(`.ods-${controller}__checkmark--error`)
      ).toBeInTheDocument();
    });

    test('Loading: skeleton, no control', () => {
      renderState({}, { loading: true });

      expect(screen.queryByRole(controller)).not.toBeInTheDocument();
      expect(
        screen.getByTestId('transaction-list-skeleton')
      ).toBeInTheDocument();
    });
  });

  test.each(['web', 'app'] as const)(
    'Indeterminate (checkbox only) on %s',
    (platform) => {
      render(
        <TransactionListSelectable
          title="Title"
          amount="R$ 0,00"
          platform={platform}
          checkbox={{ indeterminate: true, readOnly: true }}
        />
      );

      expect(screen.getByRole('checkbox')).toHaveAttribute(
        'data-indeterminate',
        'true'
      );
      expect(
        document.querySelector('.ods-checkbox__checkmark--indeterminate')
      ).toBeInTheDocument();
    }
  );
});
