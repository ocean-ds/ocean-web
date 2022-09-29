import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import ptBr from 'date-fns/locale/pt-BR';

import DatePicker from '../DatePicker';

import { format } from 'date-fns';

import { enUS } from 'date-fns/locale';

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
  const onSelectMock = jest.fn();

  render(
    <DatePicker
      labels={{ from: 'first-label', to: 'second-label' }}
      values={{ from: '10/08/2022', to: '11/08/2022' }}
      onSelect={onSelectMock}
    />
  );

  fireEvent.click(screen.getByTestId('datepicker-input-1'));

  expect(screen.getByTestId('datepicker-calendar')).toBeInTheDocument();
});

test('renders element with initial props', () => {
  const onSelectMock = jest.fn();

  render(
    <DatePicker
      labels={{ from: 'first-label', to: 'second-label' }}
      values={{ from: '10/08/2022', to: '11/08/2022' }}
      onSelect={onSelectMock}
      editable
      error
      helperText="error here!"
    />
  );

  expect(screen.getByText('first-label')).toBeInTheDocument();
  expect(screen.getByText('second-label')).toBeInTheDocument();
  expect(screen.getAllByText('error here!')).toHaveLength(2);
});

test('renders element with calendar open and select dates values', async () => {
  const onSelectMock = jest.fn();

  render(
    <DatePicker
      labels={{ from: 'first-label', to: 'second-label' }}
      values={{ from: '', to: '' }}
      onSelect={onSelectMock}
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
  const onSelectMock = jest.fn();

  render(
    <DatePicker
      labels={{ from: 'first-label', to: 'second-label' }}
      values={{ from: '', to: '' }}
      onSelect={onSelectMock}
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

test('renders element with calendar open and select dates values with input', async () => {
  const onSelectMock = jest.fn();

  render(
    <DatePicker
      labels={{ from: 'first-label', to: 'second-label' }}
      values={{ from: '', to: '' }}
      onSelect={onSelectMock}
      editable
    />
  );

  const input1 = screen.getByTestId('datepicker-input-1');
  const input2 = screen.getByTestId('datepicker-input-2');

  fireEvent.click(input1);

  expect(screen.getByTestId('datepicker-calendar')).toBeInTheDocument();

  fireEvent.change(input1, { target: { value: '10/08/2022' } });
  fireEvent.change(input2, { target: { value: '11/08/2022' } });

  expect(input1).toHaveAttribute('value');
  expect(input2).toHaveAttribute('value');
});

test('renders element with calendar open and english locale', async () => {
  const onSelectMock = jest.fn();

  render(
    <DatePicker
      labels={{ from: 'first-label', to: 'second-label' }}
      values={{ from: '', to: '' }}
      onSelect={onSelectMock}
      editable
      locale={enUS}
    />
  );

  const input1 = screen.getByTestId('datepicker-input-1');

  fireEvent.click(input1);

  expect(screen.getByTestId('datepicker-calendar')).toBeInTheDocument();

  expect(screen.getByText('Su')).toBeInTheDocument();

  expect(screen.getByText('10')).toBeInTheDocument();

  expect(screen.getAllByPlaceholderText('mm/dd/yyyy')).toHaveLength(2);
});

test('renders element with calendar open and today date', async () => {
  const onSelectMock = jest.fn();

  render(
    <DatePicker
      labels={{ from: 'first-label', to: 'second-label' }}
      values={{ from: '10/09/2022', to: '' }}
      onSelect={onSelectMock}
      startsToday
      editable
    />
  );

  const input1 = screen.getByTestId('datepicker-input-1');

  fireEvent.click(input1);

  expect(screen.getByTestId('datepicker-calendar')).toBeInTheDocument();

  const today = new Date().getDate();

  const yesterday = new Date().getDate() - 1;

  const fromDay = screen.getByText(today);
  const beforeDay = screen.getByText(yesterday);

  expect(fromDay).toBeInTheDocument();

  expect(beforeDay.parentElement).toHaveClass('ods-datepicker__disabled');
});

test('renders previous and next calendar button', () => {
  const onSelectMock = jest.fn();

  render(
    <DatePicker
      labels={{ from: 'first-label', to: 'second-label' }}
      values={{ from: '10/09/2022', to: '' }}
      onSelect={onSelectMock}
      startsToday
      editable
    />
  );

  const input1 = screen.getByTestId('datepicker-input-1');

  fireEvent.click(input1);

  expect(screen.getByTestId('datepicker-calendar')).toBeInTheDocument();

  const oldMonth = screen.getByTestId('calendar-caption-month');
  const prevButton = screen.getByTestId('calendar-left-arrow');
  const nextButton = screen.getByTestId('calendar-right-arrow');

  expect(oldMonth).toBeInTheDocument();
  expect(prevButton).toBeInTheDocument();
  expect(nextButton).toBeInTheDocument();

  fireEvent.click(nextButton);

  const newMonth = screen.getByTestId('calendar-caption-month');

  const t1 = oldMonth.textContent;
  const t2 = newMonth.textContent;

  fireEvent.click(prevButton);

  expect(t1).toBe(t2);
});

test('renders correct date with correct mask value', async () => {
  const onSelectMock = jest.fn();

  render(
    <DatePicker
      labels={{ from: 'first-label', to: 'second-label' }}
      values={{ from: '10/08', to: '' }}
      onSelect={onSelectMock}
      editable
    />
  );

  const input1 = screen.getByTestId('datepicker-input-1');

  fireEvent.click(input1);

  expect(screen.getByTestId('datepicker-calendar')).toBeInTheDocument();

  fireEvent.change(input1, { target: { value: '10' } });

  expect(onSelectMock).toBeCalledWith({
    from: '10',
    to: '',
  });

  fireEvent.change(input1, { target: { value: '1008' } });

  expect(onSelectMock).toBeCalledWith({
    from: '10/08',
    to: '',
  });

  fireEvent.change(input1, { target: { value: '10082' } });

  expect(onSelectMock).toBeCalledWith({
    from: '10/08/2',
    to: '',
  });
});

test('onSelect call with correct values', async () => {
  const onSelectMock = jest.fn();

  render(
    <DatePicker
      labels={{ from: 'first-label', to: 'second-label' }}
      values={{ from: '', to: '' }}
      onSelect={onSelectMock}
      editable
    />
  );

  const input1 = screen.getByTestId('datepicker-input-1');

  fireEvent.click(input1);

  expect(screen.getByTestId('datepicker-calendar')).toBeInTheDocument();

  const today = new Date().getDate();

  const fromDay = screen.getByText(today);

  expect(fromDay).toBeInTheDocument();

  fireEvent.click(fromDay);

  expect(onSelectMock).toBeCalledWith({
    from: `${format(new Date(), ptBr?.formatLong?.date({ width: 'short' }))}`,
    to: '',
  });
});

test('onSelect call with to date less than from date', async () => {
  const onSelectMock = jest.fn();

  render(
    <DatePicker
      labels={{ from: 'first-label', to: 'second-label' }}
      values={{
        from: `${format(
          new Date(),
          ptBr?.formatLong?.date({ width: 'short' })
        )}`,
        to: '',
      }}
      onSelect={onSelectMock}
      editable
    />
  );

  const input1 = screen.getByTestId('datepicker-input-1');

  fireEvent.click(input1);

  expect(screen.getByTestId('datepicker-calendar')).toBeInTheDocument();

  const yesterday = new Date().getDate() - 1;

  const toDay = screen.getByText(yesterday);

  expect(toDay).toBeInTheDocument();

  fireEvent.click(toDay);

  expect(onSelectMock).toBeCalledWith({
    from: `${format(
      new Date().setDate(new Date().getDate() - 1),
      ptBr?.formatLong?.date({ width: 'short' })
    )}`,
    to: '',
  });
});
