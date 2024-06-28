import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { SelectProps } from '../types';
import SelectAutocomplete from '../SelectAutocomplete';

jest.useFakeTimers('modern');
window.HTMLElement.prototype.scrollIntoView = jest.fn();

const setup = (props?: Partial<SelectProps>) => {
  const onChangeFn = jest.fn();

  return {
    ...render(
      <div>
        <SelectAutocomplete
          id="sel-2"
          name="sel-2"
          data-testid="select-autocomplete-test"
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

test('should render the SelectAutocomplete component', () => {
  const { container } = render(
    <SelectAutocomplete
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

  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="ods-form-control__root"
      >
        <div
          class="ods-form-control__header"
        >
          <div
            class="ods-form-control__label"
          >
            <span
              class="ods-form-label"
              id="label--my-select"
            >
              Custom label
            </span>
          </div>
        </div>
        <div
          class="ods-form-control__element"
        >
          <div
            class="ods-select-autocomplete__root"
          >
            <div
              class="ods-form-control__root"
            >
              <div
                class="ods-form-control__element"
              >
                <div
                  class="ods-input ods-input--disabled--text ods-select-autocomplete__arrow ods-select-autocomplete__arrow--down"
                >
                  <input
                    aria-haspopup="listbox"
                    aria-labelledby="label--my-select my-select"
                    id="my-select"
                    placeholder="Select some option"
                    type="text"
                    value=""
                  />
                  <div
                    class="ods-input__adornment ods-input__adornment--placeholder"
                  >
                    <svg
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m19 9-7 7-7-7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
});

test('should open the dropdown when input is clicked', async () => {
  setup();
  const input = screen.getByTestId('select-autocomplete-test');

  fireEvent.click(input);

  await waitFor(() => {
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });
});

test('should filter options based on user input', async () => {
  setup();
  const input = screen.getByTestId('select-autocomplete-test');

  fireEvent.click(input);
  fireEvent.change(input, { target: { value: 'visa' } });

  expect(screen.getByText('Visa')).toBeInTheDocument();
  expect(screen.queryByText('Mastercard')).not.toBeInTheDocument();
});

test('should select option with keyboard navigation', async () => {
  const { onChangeFn } = setup();
  const input = screen.getByTestId('select-autocomplete-test');

  fireEvent.click(input);
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  fireEvent.keyDown(input, { key: 'Enter' });

  await waitFor(() => {
    expect(onChangeFn).toHaveBeenCalledTimes(2);
    expect(onChangeFn).toHaveBeenCalledWith({
      value: 'mastercard',
      label: 'Mastercard',
      index: 1,
      id: 'option-mastercard--listbox--sel-2',
    });
  });
});

test('should select option when clicking with the mouse', async () => {
  const { onChangeFn } = setup();
  const input = screen.getByTestId('select-autocomplete-test');

  fireEvent.click(input);
  fireEvent.click(screen.getByText('Mastercard'));

  await waitFor(() => {
    expect(onChangeFn).toHaveBeenCalledTimes(1);
    expect(onChangeFn).toHaveBeenCalledWith({
      value: 'mastercard',
      label: 'Mastercard',
      index: 1,
      id: 'option-mastercard--listbox--sel-2',
    });
  });
});

test('should close the dropdown when input loses focus', async () => {
  setup();
  const input = screen.getByTestId('select-autocomplete-test');

  fireEvent.click(input);
  fireEvent.blur(input);

  await waitFor(() => {
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});

test('should type "American Express" into the input', () => {
  setup();
  const input = screen.getByTestId('select-autocomplete-test');

  fireEvent.click(input);
  fireEvent.change(input, { target: { value: 'American Express' } });

  expect(input).toHaveValue('American Express');
});
