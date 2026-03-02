import React from 'react';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import ptBr from 'date-fns/locale/pt-BR';

import { format } from 'date-fns';
import DatePicker from '../DatePicker';

const TODAY = 16;

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
  const disabledDaysMessage = 'Este dia está bloqueado';

  render(
    <DatePicker
      label="Your label"
      value=""
      onSelect={onSelectMock}
      disabledDays={[{ before: new Date() }]}
      disabledDaysMessage={disabledDaysMessage}
    />
  );

  const input = screen.getByTestId('datepicker-input-1');
  fireEvent.click(input);

  expect(screen.getByTestId('datepicker-calendar')).toBeInTheDocument();

  // Find disabled days in the calendar
  const calendar = screen.getByTestId('datepicker-calendar');
  const disabledDays = calendar.querySelectorAll('.ods-date__disabled');

  // Should have at least one disabled day
  expect(disabledDays.length).toBeGreaterThan(0);

  // Get the first disabled day - it should be clickable directly
  const firstDisabledDay = disabledDays[0];
  expect(firstDisabledDay).not.toBeNull();

  // Click on disabled day (the element itself or its button child)
  const clickableElement =
    (firstDisabledDay as HTMLElement).querySelector('button') ||
    (firstDisabledDay as HTMLElement);
  fireEvent.click(clickableElement);

  // Tooltip should appear
  await waitFor(
    () => {
      const tooltip = screen.getByTestId('datepicker-disabled-tooltip');
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent(disabledDaysMessage);
    },
    { timeout: 3000 }
  );

  // onSelect should not be called for disabled days
  expect(onSelectMock).not.toHaveBeenCalled();
});

test('tooltip disappears after 4 seconds', async () => {
  jest.useFakeTimers();
  const onSelectMock = jest.fn();
  const disabledDaysMessage = 'Este dia está bloqueado';

  render(
    <DatePicker
      label="Your label"
      value=""
      onSelect={onSelectMock}
      disabledDays={[{ before: new Date() }]}
      disabledDaysMessage={disabledDaysMessage}
    />
  );

  const input = screen.getByTestId('datepicker-input-1');
  fireEvent.click(input);

  const calendar = screen.getByTestId('datepicker-calendar');
  const disabledDays = calendar.querySelectorAll('.ods-date__disabled');

  expect(disabledDays.length).toBeGreaterThan(0);

  const firstDisabledDay = disabledDays[0];
  expect(firstDisabledDay).not.toBeNull();

  const clickableElement =
    (firstDisabledDay as HTMLElement).querySelector('button') ||
    (firstDisabledDay as HTMLElement);
  fireEvent.click(clickableElement);

  // Tooltip should appear
  await waitFor(
    () => {
      expect(
        screen.getByTestId('datepicker-disabled-tooltip')
      ).toBeInTheDocument();
    },
    { timeout: 3000 }
  );

  // Fast-forward 4 seconds
  jest.advanceTimersByTime(4000);

  await waitFor(() => {
    expect(
      screen.queryByTestId('datepicker-disabled-tooltip')
    ).not.toBeInTheDocument();
  });

  jest.useRealTimers();
});

test('tooltip does not appear when clicking on enabled day', async () => {
  const onSelectMock = jest.fn();
  const disabledDaysMessage = 'Este dia está bloqueado';

  render(
    <DatePicker
      label="Your label"
      value=""
      onSelect={onSelectMock}
      disabledDays={[{ before: new Date() }]}
      disabledDaysMessage={disabledDaysMessage}
    />
  );

  const input = screen.getByTestId('datepicker-input-1');
  fireEvent.click(input);

  // Click on enabled day (today or tomorrow)
  const today = screen.getByText(TODAY);
  fireEvent.click(today);

  // Tooltip should not appear
  expect(
    screen.queryByTestId('datepicker-disabled-tooltip')
  ).not.toBeInTheDocument();

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
      disabledDays={[{ before: new Date() }]}
    />
  );

  const input = screen.getByTestId('datepicker-input-1');
  fireEvent.click(input);

  const calendar = screen.getByTestId('datepicker-calendar');
  const disabledDays = calendar.querySelectorAll('.ods-date__disabled');

  expect(disabledDays.length).toBeGreaterThan(0);

  const firstDisabledDay = disabledDays[0];
  expect(firstDisabledDay).not.toBeNull();

  const clickableElement =
    (firstDisabledDay as HTMLElement).querySelector('button') ||
    (firstDisabledDay as HTMLElement);
  fireEvent.click(clickableElement);

  // Tooltip should not appear
  expect(
    screen.queryByTestId('datepicker-disabled-tooltip')
  ).not.toBeInTheDocument();
});
