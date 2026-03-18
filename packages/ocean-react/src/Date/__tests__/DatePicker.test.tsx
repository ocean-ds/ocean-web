import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import ptBr from 'date-fns/locale/pt-BR';

import { format } from 'date-fns';
import DatePicker from '../DatePicker';
import {
  openCalendar,
  clickDisabledDay,
  expectTooltipToAppear,
  expectTooltipNotToAppear,
  expectTooltipNotToAppearAsync,
  commonDisabledDaysProps,
  makeDisabledDaysListProps,
  LIST_DISABLED_MESSAGE,
} from '../utils/testHelpers';

const TODAY = new Date().getDate();

const TODAY_DATE = format(
  new Date().setDate(TODAY),
  ptBr?.formatLong?.date({ width: 'short' })
);

test('renders element properly', () => {
  const { container } = render(
    <DatePicker
      label="Your label"
      value="10/08/2022"
      onSelect={() => jest.fn()}
      className="class-test"
    />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div>
      <div
        class="ods-date class-test"
      >
        <div
          class="ods-date__form-row-datepicker"
        >
          <div
            class="ods-date__form-controls"
            data-testid="date-picker-first-field-wrapper"
          >
            <label
              for="start-date"
            >
              Your label
            </label>
            <div
              class="ods-form-control__root"
            >
              <div
                class="ods-form-control__element"
              >
                <div
                  class="ods-input ods-input--disabled--text"
                >
                  <input
                    autocomplete="off"
                    data-testid="datepicker-input-1"
                    id="start-date"
                    inputmode="numeric"
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"
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

test('renders element with calendar open', () => {
  const onSelectMock = jest.fn();

  render(
    <DatePicker
      label="Your label"
      value="10/08/2022"
      onSelect={onSelectMock}
      className="class-test"
    />
  );

  fireEvent.click(screen.getByTestId('datepicker-input-1'));

  expect(screen.getByTestId('datepicker-calendar')).toBeInTheDocument();
});

test('renders element with initial props', () => {
  const onSelectMock = jest.fn();

  render(
    <DatePicker
      label="Your label"
      value="10/08/2022"
      onSelect={onSelectMock}
      className="class-test"
      editable
      error
      helperText="error here!"
    />
  );

  expect(screen.getByText('Your label')).toBeInTheDocument();
  expect(screen.getByText('error here!')).toBeInTheDocument();
});

test('renders element with calendar open and click a day', async () => {
  const onSelectMock = jest.fn();

  render(
    <DatePicker
      label="Your label"
      value=""
      onSelect={onSelectMock}
      className="class-test"
    />
  );

  const input = screen.getByTestId('datepicker-input-1');

  fireEvent.click(input);

  expect(screen.getByTestId('datepicker-calendar')).toBeInTheDocument();

  const day = screen.getByText(TODAY);

  expect(day).toBeInTheDocument();

  fireEvent.click(day);

  expect(onSelectMock).toBeCalledWith(`${TODAY_DATE}`);
});

test('renders element with calendar open and select dates values with input', async () => {
  const onSelectMock = jest.fn();

  render(
    <DatePicker label="Your label" value="" onSelect={onSelectMock} editable />
  );

  const input = screen.getByTestId('datepicker-input-1');

  fireEvent.click(input);

  expect(screen.getByTestId('datepicker-calendar')).toBeInTheDocument();

  fireEvent.change(input, { target: { value: '10/08/2022' } });

  expect(onSelectMock).toBeCalledWith('10/08/2022');
});

test('close calendar when click outside', async () => {
  const onSelectMock = jest.fn();

  render(
    <DatePicker
      label="Your label"
      value="10/09/2022"
      onSelect={onSelectMock}
      editable
      startsToday
    />
  );

  const input = screen.getByTestId('datepicker-input-1');

  fireEvent.click(input);

  const calendar = screen.getByTestId('datepicker-calendar');

  expect(calendar).toBeInTheDocument();

  const outside = screen.getByTestId('date-picker-outside');

  fireEvent.click(outside);

  setTimeout(() => {
    expect(calendar).not.toBeInTheDocument();
  }, 1000);
});

test('close calendar when click outside and save cache', async () => {
  const onSelectMock = jest.fn();

  render(<DatePicker label="Your label" value="" onSelect={onSelectMock} />);

  const input = screen.getByTestId('datepicker-input-1');

  fireEvent.click(input);

  const calendar = screen.getByTestId('datepicker-calendar');

  expect(calendar).toBeInTheDocument();

  const day = screen.getByText(TODAY);

  expect(day).toBeInTheDocument();

  fireEvent.click(day);

  expect(onSelectMock).toBeCalledWith(`${TODAY_DATE}`);

  fireEvent.click(input);

  const outside = screen.getByTestId('date-picker-outside');

  fireEvent.click(outside);

  expect(onSelectMock).toBeCalledWith(`${TODAY_DATE}`);
});

test('shows tooltip when clicking on disabled day with disabledDaysMessage', async () => {
  const onSelectMock = jest.fn();

  render(
    <DatePicker
      label="Your label"
      value=""
      onSelect={onSelectMock}
      {...commonDisabledDaysProps}
    />
  );

  openCalendar();
  clickDisabledDay();

  await expectTooltipToAppear(commonDisabledDaysProps.disabledDaysMessage);

  // onSelect should not be called for disabled days
  expect(onSelectMock).not.toHaveBeenCalled();
});

test('tooltip disappears after 5 seconds', async () => {
  jest.useFakeTimers();
  const onSelectMock = jest.fn();

  render(
    <DatePicker
      label="Your label"
      value=""
      onSelect={onSelectMock}
      {...commonDisabledDaysProps}
    />
  );

  openCalendar();
  clickDisabledDay();

  // Tooltip should appear
  await expectTooltipToAppear(commonDisabledDaysProps.disabledDaysMessage);

  // Fast-forward 5 seconds
  jest.advanceTimersByTime(5000);

  // Tooltip should disappear after timeout
  await expectTooltipNotToAppearAsync();
  expect(
    screen.queryByTestId('datepicker-disabled-tooltip')
  ).not.toBeInTheDocument();

  jest.useRealTimers();
});

test('tooltip does not appear when clicking on enabled day', async () => {
  const onSelectMock = jest.fn();

  render(
    <DatePicker
      label="Your label"
      value=""
      onSelect={onSelectMock}
      {...commonDisabledDaysProps}
    />
  );

  openCalendar();

  // Click on enabled day (today or tomorrow)
  const today = screen.getByText(TODAY);
  fireEvent.click(today);

  expectTooltipNotToAppear();

  // onSelect should be called for enabled days
  expect(onSelectMock).toHaveBeenCalled();
});

test('tooltip does not appear when disabledDaysMessage is not provided', async () => {
  const onSelectMock = jest.fn();

  render(
    <DatePicker
      label="Your label"
      value=""
      onSelect={onSelectMock}
      disabledDays={commonDisabledDaysProps.disabledDays}
    />
  );

  openCalendar();
  clickDisabledDay();

  expectTooltipNotToAppear();
  expect(
    screen.queryByTestId('datepicker-disabled-tooltip')
  ).not.toBeInTheDocument();
});

test('shows specific message for matching date in disabledDaysMessage array', async () => {
  const onSelectMock = jest.fn();
  const listProps = makeDisabledDaysListProps();

  render(
    <DatePicker
      label="Your label"
      value=""
      onSelect={onSelectMock}
      {...listProps}
    />
  );

  openCalendar();
  clickDisabledDay();

  await expectTooltipToAppear(LIST_DISABLED_MESSAGE);
  expect(onSelectMock).not.toHaveBeenCalled();
});

test('tooltip does not appear when clicked date has no entry in disabledDaysMessage array', async () => {
  const onSelectMock = jest.fn();

  // Array com data que não corresponde ao primeiro dia desabilitado clicado
  const nextMonthDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    1
  );

  render(
    <DatePicker
      label="Your label"
      value=""
      onSelect={onSelectMock}
      disabledDays={commonDisabledDaysProps.disabledDays}
      disabledDaysMessage={[
        { date: nextMonthDate, message: 'Esta mensagem não deve aparecer' },
      ]}
    />
  );

  openCalendar();
  clickDisabledDay();

  expectTooltipNotToAppear();
  expect(
    screen.queryByTestId('datepicker-disabled-tooltip')
  ).not.toBeInTheDocument();
});
