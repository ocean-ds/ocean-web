import React from 'react';
import {
  act,
  fireEvent,
  render,
  waitFor,
  screen,
} from '@testing-library/react';

import { SelectProps } from '../types';
import Select from '../Select';
import SelectControlled from '../examples/SelectControlled';

jest.useFakeTimers('modern');
window.HTMLElement.prototype.scrollIntoView = jest.fn();

const setup = (props?: Partial<SelectProps>) => {
  const onChangeFn = jest.fn();

  return {
    ...render(
      <div>
        <Select
          id="sel-1"
          name="sel-1"
          data-testid="select-test"
          options={[
            { value: 'visa', label: 'Visa' },
            { value: 'mastercard', label: 'Mastercard' },
            { value: 'american-express', label: 'American Express' },
            { value: 'elo', label: 'Elo' },
            { value: 'hipercard', label: 'Hipercard' },
            { value: 'discover-network', label: 'Discover Network' },
            { value: 'diners-club', label: 'Diners Club' },
            { value: 'other', label: 'Other' },
          ]}
          {...props}
          onChange={onChangeFn}
        />
        <button type="button">Another interactive element</button>
      </div>
    ),
    onChangeFn,
  };
};

test('renders element properly', () => {
  const { container } = render(
    <Select
      label="Custom label"
      id="my-select"
      options={[
        { value: 'v1', label: 'Label 1' },
        { value: 'v2', label: 'Label 2' },
      ]}
      placeholder="Select some option"
      className="custom-class"
    />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="ods-form-control__root"
    >
      <span
        class="ods-form-label"
        id="label--my-select"
      >
        Custom label
      </span>
      <div
        class="ods-form-control__element"
      >
        <div
          class="ods-select__root"
        >
          <button
            aria-haspopup="listbox"
            aria-labelledby="label--my-select my-select"
            class="ods-select__control custom-class"
            id="my-select"
            type="button"
          >
            <span
              class="ods-select__value ods-select__value--empty"
            >
              Select some option
            </span>
            <i
              class="ods-select__arrow ods-select__arrow--down"
            />
          </button>
        </div>
      </div>
    </div>
  `);
});

test.each([
  [
    'selects next option when `ArrowDown` key is pressed',
    {
      key: 'ArrowDown',
      defaultValue: 'mastercard',
      selected: { label: 'American Express', value: 'american-express' },
    },
  ],
  [
    'selects previous option when `ArrowUp` key is pressed',
    {
      key: 'ArrowUp',
      defaultValue: 'hipercard',
      selected: { label: 'Elo', value: 'elo' },
    },
  ],
  [
    'selects option advancing 4 positions when `PageDown` key is pressed',
    {
      key: 'PageDown',
      defaultValue: undefined,
      selected: { label: 'Elo', value: 'elo' },
    },
  ],
  [
    'selects option kicking 4 positions when `PageDown` key is pressed',
    {
      key: 'PageUp',
      defaultValue: 'discover-network',
      selected: { label: 'Mastercard', value: 'mastercard' },
    },
  ],
  [
    'selects previous option when `ArrowUp` key is pressed',
    {
      key: 'ArrowUp',
      defaultValue: 'hipercard',
      selected: { label: 'Elo', value: 'elo' },
    },
  ],
  [
    'selects first option when `Home` key is pressed',
    {
      key: 'Home',
      defaultValue: undefined,
      selected: { label: 'Visa', value: 'visa' },
    },
  ],
  [
    'selects last option when `End` key is pressed',
    {
      key: 'End',
      defaultValue: undefined,
      selected: { label: 'Other', value: 'other' },
    },
  ],
])('%s', (_, params) => {
  const { onChangeFn } = setup({
    defaultValue: params.defaultValue,
  });

  screen.getByTestId('select-test').focus();
  fireEvent.keyDown(document.activeElement || document.body, {
    key: params.key,
  });

  expect(onChangeFn).toHaveBeenCalledTimes(1);
  expect(onChangeFn.mock.calls[0][0]).toMatchObject(params.selected);
  expect(screen.getByText(params.selected.label)).toBeInTheDocument();
});

test.each([
  ['ArrowDown', 'other', 'Other'],
  ['ArrowUp', 'visa', 'Visa'],
  ['PageDown', 'other', 'Other'],
  ['PageUp', 'visa', 'Visa'],
  ['Home', 'visa', 'Visa'],
  ['End', 'other', 'Other'],
])(
  'does not re-select option when `%s` is pressed',
  (key, defaultValue, label) => {
    const { onChangeFn } = setup({
      defaultValue,
    });

    screen.getByTestId('select-test').focus();
    fireEvent.keyDown(document.activeElement || document.body, {
      key,
    });

    expect(onChangeFn).toHaveBeenCalledTimes(0);
    expect(screen.getByText(label)).toBeInTheDocument();
  }
);

test('select next option with a name that starts with the typed character', () => {
  const { onChangeFn } = setup({
    defaultValue: 'discover-network',
  });

  screen.getByTestId('select-test').focus();
  fireEvent.keyDown(document.activeElement || document.body, {
    key: 'd',
  });
  act(() => {
    jest.runAllTimers();
  });

  expect(onChangeFn).toHaveBeenCalledTimes(1);
  expect(onChangeFn.mock.calls[0][0]).toMatchInlineSnapshot(`
    Object {
      "id": "option-diners-club--listbox--sel-1",
      "index": 6,
      "label": "Diners Club",
      "value": "diners-club",
    }
  `);
  expect(screen.getByText('Diners Club')).toBeInTheDocument();
});

test('does not select an option with a name that starts with the typed character', async () => {
  const { onChangeFn } = setup();

  screen.getByTestId('select-test').focus();
  fireEvent.keyDown(document.activeElement || document.body, {
    key: 'z',
  });
  act(() => {
    jest.runAllTimers();
  });

  expect(onChangeFn).toHaveBeenCalledTimes(0);
});

test('renders expanded listbox', () => {
  setup();

  fireEvent.click(screen.getByTestId('select-test'));

  expect(screen.getByTestId('select-test')).toHaveAttribute(
    'aria-expanded',
    'true'
  );
  expect(screen.getByRole('listbox')).not.toHaveAttribute(
    'aria-activedescendant'
  );
  expect(
    screen.queryByRole('option', { selected: true })
  ).not.toBeInTheDocument();
});

test('renders expanded listbox with the selected option focused', () => {
  setup({ defaultValue: 'other' });

  fireEvent.click(screen.getByTestId('select-test'));

  expect(screen.getByTestId('select-test')).toHaveAttribute(
    'aria-expanded',
    'true'
  );
  expect(screen.getByRole('listbox')).toHaveAttribute(
    'aria-activedescendant',
    'option-other--listbox--sel-1'
  );
  expect(screen.getByRole('option', { name: 'Other' })).toHaveAttribute(
    'aria-selected',
    'true'
  );
  expect(screen.getByTestId('select-test')).not.toHaveClass(
    'ods-select__control--filled'
  );
});

test('collapses listbox when `Esc` key is pressed', () => {
  setup();

  fireEvent.click(screen.getByTestId('select-test'));
  fireEvent.keyDown(document.activeElement || document.body, {
    key: 'Esc',
  });

  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(screen.getByTestId('select-test')).toHaveFocus();
});

test('collapses listbox when `Enter` key is pressed', () => {
  setup();

  fireEvent.click(screen.getByTestId('select-test'));
  fireEvent.keyDown(document.activeElement || document.body, {
    key: 'm',
  });
  act(() => {
    jest.runAllTimers();
  });
  fireEvent.keyDown(document.activeElement || document.body, {
    key: 'Enter',
  });

  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(screen.getByTestId('select-test')).toHaveFocus();
  expect(screen.getByText('Mastercard')).toBeInTheDocument();
});

test('collapses listbox when option is selected', () => {
  const { getByTestId, getByRole, queryByRole } = setup();

  fireEvent.click(getByTestId('select-test'));
  fireEvent.click(getByRole('option', { name: 'Discover Network' }));

  expect(queryByRole('listbox')).not.toBeInTheDocument();
  expect(screen.getByTestId('select-test')).toHaveFocus();
});

test('collapses listbox when another element is focused', async () => {
  setup({
    defaultValue: 'mastercard',
  });

  fireEvent.click(screen.getByTestId('select-test'));
  screen.getByRole('button', { name: 'Another interactive element' }).focus();
  act(() => {
    jest.runAllTimers();
  });

  await waitFor(() => {
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(screen.getByTestId('select-test')).not.toHaveFocus();
  });
});

test('renders a error state for the select', () => {
  render(
    <Select
      data-testid="select-test"
      options={[{ value: 'v1', label: 'Label 1' }]}
      error
    />
  );

  expect(screen.getByTestId('select-test')).toHaveClass(
    'ods-select__control ods-select__control--error',
    {
      exact: true,
    }
  );
});

test('renders a filled state for uncontrolled input', () => {
  render(
    <Select
      data-testid="select-test"
      defaultValue="v1"
      options={[{ value: 'v1', label: 'Label 1' }]}
    />
  );

  expect(screen.getByTestId('select-test')).toHaveClass(
    'ods-select__control--filled'
  );
});

test('renders controlled select', async () => {
  render(<SelectControlled />);

  expect(screen.getByTestId('controlled-select')).not.toHaveClass(
    'ods-select__control--filled'
  );
  expect(screen.getByTestId('selected-value')).toBeEmptyDOMElement();
  fireEvent.click(screen.getByLabelText('Pick your favorite flavor'));
  fireEvent.click(screen.getByTestId('coconut'));

  await waitFor(() =>
    expect(screen.getByTestId('selected-value')).toHaveTextContent('coconut')
  );
  expect(screen.getByTestId('controlled-select')).toHaveClass(
    'ods-select__control--filled'
  );
});
