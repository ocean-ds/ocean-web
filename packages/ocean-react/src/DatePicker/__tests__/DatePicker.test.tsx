import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import DatePicker from '../DatePicker';

test('renders element properly', () => {
  const { container } = render(
    <DatePicker
      labels={{ from: 'first-label', to: 'second-label' }}
      values={{ from: '10/08/2022', to: '11/08/2022' }}
      onSelect={() => jest.fn()}
      className="class-test"
    />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="ods-datepicker class-test"
    >
      <div
        class="ods-datepicker__form-row"
      >
        <div
          class="ods-datepicker__form-controls"
        >
          <label
            for="start-date"
          >
            first-label
          </label>
          <div
            class="ods-form-control__root"
          >
            <div
              class="ods-form-control__element"
            >
              <div
                class="ods-input ods-input--disabled--text date-field"
              >
                <input
                  autocomplete="off"
                  data-testid="datepicker-input-1"
                  id="start-date"
                  maxlength="10"
                  name="start-date"
                  placeholder="dd/mm/aaaa"
                  readonly=""
                  type="text"
                  value="10/08/2022"
                />
                <div
                  class="ods-input__adornment ods-input__adornment--placeholder"
                >
                  <svg
                    fill="none"
                    height="20"
                    stroke="#B6B9CC"
                    viewBox="0 0 24 24"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
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
        <div
          class="ods-datepicker__form-controls"
        >
          <label
            for="end-date"
          >
            second-label
          </label>
          <div
            class="ods-form-control__root"
          >
            <div
              class="ods-form-control__element"
            >
              <div
                class="ods-input ods-input--disabled--text date-field"
              >
                <input
                  autocomplete="off"
                  data-testid="datepicker-input-2"
                  id="end-date"
                  maxlength="10"
                  name="end-date"
                  placeholder="dd/mm/aaaa"
                  readonly=""
                  type="text"
                  value="11/08/2022"
                />
                <div
                  class="ods-input__adornment ods-input__adornment--placeholder"
                >
                  <svg
                    fill="none"
                    height="20"
                    stroke="#B6B9CC"
                    viewBox="0 0 24 24"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
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
  `);
});

test('renders element with calendar open', () => {
  render(
    <DatePicker
      labels={{ from: 'first-label', to: 'second-label' }}
      values={{ from: '10/08/2022', to: '11/08/2022' }}
      onSelect={() => jest.fn()}
    />
  );

  fireEvent.click(screen.getByTestId('datepicker-input-1'));

  expect(screen.getByTestId('datepicker-calendar')).toBeInTheDocument();
});

jest.useFakeTimers();

test('renders element with calendar open and select dates values', async () => {
  render(
    <DatePicker
      labels={{ from: 'first-label', to: 'second-label' }}
      values={{ from: '', to: '' }}
      onSelect={() => null}
    />
  );

  fireEvent.click(screen.getByTestId('datepicker-input-1'));

  const datePicker = screen.getByTestId('datepicker-calendar');

  expect(datePicker).toBeInTheDocument();

  expect(screen.getByText('1')).toBeInTheDocument();

  expect(screen.getByText('2')).toBeInTheDocument();

  const firstDay = screen.getByText('1');
  const secondDay = screen.getByText('2');

  expect(firstDay).toBeInTheDocument();

  expect(secondDay).toBeInTheDocument();

  fireEvent.click(firstDay);
  fireEvent.click(secondDay);

  setTimeout(() => {
    expect(datePicker).not.toBeInTheDocument();
  }, 1000);
});

test('renders element with calendar open and select dates values with hover', async () => {
  render(
    <DatePicker
      labels={{ from: 'first-label', to: 'second-label' }}
      values={{ from: '', to: '' }}
      onSelect={() => null}
    />
  );

  fireEvent.click(screen.getByTestId('datepicker-input-1'));

  const datePicker = screen.getByTestId('datepicker-calendar');

  expect(datePicker).toBeInTheDocument();

  expect(screen.getByText('1')).toBeInTheDocument();

  expect(screen.getByText('2')).toBeInTheDocument();

  const firstDay = screen.getByText('1');
  const secondDay = screen.getByText('2');

  expect(firstDay).toBeInTheDocument();

  expect(secondDay).toBeInTheDocument();

  fireEvent.click(firstDay);
  fireEvent.mouseEnter(secondDay);

  setTimeout(() => {
    expect(datePicker).not.toBeInTheDocument();
  }, 1000);
});
