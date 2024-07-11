import React from 'react';
import {
  render,
  fireEvent,
  screen,
  cleanup,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SelectAutocomplete from '../SelectAutocomplete';
import { SelectProps } from '../types';

interface IOptionProps {
  value: string;
  label: string;
}

jest.useFakeTimers('modern');
window.HTMLElement.prototype.scrollIntoView = jest.fn();

const options: IOptionProps[] = [
  { value: 'visa', label: 'Visa' },
  { value: 'mastercard', label: 'Mastercard' },
  { value: 'american-express', label: 'American Express' },
  { value: 'elo', label: 'Elo' },
  { value: 'hipercard', label: 'Hipercard' },
  { value: 'discover-network', label: 'Discover Network' },
  { value: 'diners-club', label: 'Diners Club' },
  { value: 'other', label: 'Other' },
];

const setup = (props?: Partial<SelectProps>) => {
  const onChangeFn = jest.fn();
  const utils = render(
    <div>
      <SelectAutocomplete
        id="sel-2"
        name="sel-2"
        options={options}
        {...props}
        onChange={onChangeFn}
      />
      <button type="button">Another interactive element</button>
    </div>
  );
  const input = screen.getByTestId(
    'select-autocomplete-test'
  ) as HTMLInputElement;

  return {
    ...utils,
    input,
    onChangeFn,
  };
};

afterEach(cleanup);

test('should render the SelectAutocomplete component', () => {
  const { container } = setup({
    label: 'Custom label',
    id: 'my-select',
    placeholder: 'Select some option',
    className: 'custom-class',
  });

  expect(container).toMatchInlineSnapshot(`
    <div>
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
                      aria-labelledby="label--my-select"
                      data-testid="select-autocomplete-test"
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
                          d="M19 9l-7 7-7-7"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <input
                name="sel-2"
                type="hidden"
                value=""
              />
            </div>
          </div>
        </div>
        <button
          type="button"
        >
          Another interactive element
        </button>
      </div>
    </div>
  `);
});

test('renders correctly with required props', () => {
  setup();
  expect(screen.getByTestId('select-autocomplete-test')).toBeInTheDocument();
});

test('opens dropdown on click', () => {
  const { input } = setup();
  fireEvent.click(input);
  expect(screen.getByRole('listbox')).toBeInTheDocument();
});

test('selects an option on click', () => {
  const { input } = setup();
  fireEvent.click(input);
  const option = screen.getByText('Hipercard');
  fireEvent.click(option);
  expect(input.value).toBe('Hipercard');
});

test('applies ARIA attributes correctly', () => {
  const { input } = setup({ label: 'Test Label' });
  const label = screen.getByText('Test Label');
  expect(input).toHaveAttribute('aria-labelledby', label.id);
});

test('displays helper text and error message', () => {
  setup({ helperText: 'Error message' });
  expect(screen.getByText('Error message')).toBeInTheDocument();
});

test('should open the dropdown when input is clicked', async () => {
  const { input } = setup();
  fireEvent.click(input);

  await waitFor(() => {
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });
});

test('should filter options based on user input', async () => {
  const { input } = setup();
  fireEvent.click(input);
  fireEvent.change(input, { target: { value: 'visa' } });

  expect(screen.getByText('Visa')).toBeInTheDocument();
  expect(screen.queryByText('Mastercard')).not.toBeInTheDocument();
});

test('should select option with keyboard navigation', async () => {
  const { input, onChangeFn } = setup();
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
  const { input, onChangeFn } = setup();
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
  const { input } = setup();
  fireEvent.click(input);
  fireEvent.blur(input);

  await waitFor(() => {
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});

test('should type "American Express" into the input', () => {
  const { input } = setup();
  fireEvent.click(input);
  fireEvent.change(input, { target: { value: 'American Express' } });

  expect(input).toHaveValue('American Express');
});

test('should render "Nenhuma opção encontrada." if no reults found', () => {
  const { input } = setup();
  fireEvent.click(input);
  fireEvent.change(input, { target: { value: 'Non-existent option' } });

  expect(screen.getByText('Nenhuma opção encontrada.')).toBeInTheDocument();
});
