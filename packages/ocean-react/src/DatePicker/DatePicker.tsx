import React from 'react';
import classNames from 'classnames';

import DayPicker, { ClassNames } from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
// import { ptBR } from 'date-fns/locale';

import { CalendarOutline } from '@useblu/ocean-icons-react';

import NavBar from './NavBar';

import * as DateFns from 'date-fns';

import Input from '../Input';

type DatePickerFields = {
  from: string;
  to: string;
};

export type DatePickerProps = {
  /**
   * Determines values of inputs (from/to)
   */
  labels?: DatePickerFields;

  /**
   * Determines values of inputs (from/to)
   * @requires
   */
  values: DatePickerFields;

  /**
   * Determines the function to change fields (from/to)
   * @requires
   */
  onSelect: (dates: DatePickerFields) => void;

  /**
   * Determines if date inputs are editable
   * @default false
   */
  editable: boolean;

  /**
   * Determines if date inputs are editable
   * @default false
   */
  disabled?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

const DEFAULT_FORMAT = 'dd/MM/yyyy';

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  function DatePicker(
    { labels, values, onSelect, editable, disabled, className, ...rest },
    ref
  ) {
    const input1Ref = React.useRef<HTMLInputElement>(null);
    const input2Ref = React.useRef<HTMLInputElement>(null);

    const [showDayPicker, setShowDayPicker] = React.useState(false);
    const [isSelectingLastDay, setIsSelectingLastDay] = React.useState(false);

    const fromDate = new Date(values.from);
    const toDate = new Date(values.to);

    React.useEffect(() => {
      if (values.from === '') setIsSelectingLastDay(false);
    }, [values.from]);

    const handleDayMouseEnter = (day: Date) => {
      const formattedDay = DateFns.format(day, DEFAULT_FORMAT);

      if (!isSelectingLastDay || (values.from && day < fromDate)) return;

      onSelect({ from: values.from, to: formattedDay });
    };
    const handleDayClick = (day: Date) => {
      const formattedDay = DateFns.format(day, DEFAULT_FORMAT);

      if (isSelectingLastDay) {
        if (day < fromDate) {
          onSelect({ from: formattedDay, to: '' });
        } else {
          setIsSelectingLastDay(false);
          setShowDayPicker(false);
          onSelect({ from: values.from, to: formattedDay });
        }
      } else {
        setIsSelectingLastDay(true);
        onSelect({ from: formattedDay, to: '' });
      }
    };

    const createHandleToggleClick = () => {
      setShowDayPicker(true);

      if (values.from.length < DEFAULT_FORMAT.length) {
        input1Ref?.current?.focus();
      } else if (
        values.from.length === DEFAULT_FORMAT.length &&
        values.to.length === DEFAULT_FORMAT.length
      ) {
        input1Ref?.current?.focus();
      } else {
        setIsSelectingLastDay(true);
        input2Ref?.current?.focus();
      }
    };

    const disabledDays = (day: Date) => {
      return isSelectingLastDay && day < fromDate;
    };

    const inputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const dataFormatted = target.value; // Add input mask

      if (target.id === 'start-date') {
        setIsSelectingLastDay(false);
        onSelect({ from: dataFormatted, to: '' });

        if (dataFormatted.length === DEFAULT_FORMAT.length) {
          setIsSelectingLastDay(true);
          input2Ref?.current?.focus();
        }
      } else {
        setIsSelectingLastDay(true);
        onSelect({ from: values.from, to: dataFormatted });

        if (dataFormatted.length === DEFAULT_FORMAT.length) {
          setTimeout(() => setShowDayPicker(false), 500);
        }
      }
    };

    const CustomStyles: ClassNames = {
      container: 'ods-datepicker-container',
      wrapper: 'ods-datepicker-wrapper',
      interactionDisabled: 'ods-datepicker-interactionDisabled',
      navBar: 'ods-datepicker-navbar',
      navButtonPrev: 'ods-datepicker-navButtonPrev',
      navButtonNext: 'ods-datepicker-navButtonNext',
      navButtonInteractionDisabled: '',

      months: 'ods-datepicker-mouths',
      month: '',
      caption: 'ods-datepicker-caption',
      weekdays: 'ods-datepicker-weekdays',
      weekdaysRow: 'ods-datepicker-weekdaysRow',
      weekday: 'ods-datepicker-weekday',
      weekNumber: '',
      body: 'ods-datepicker-body',
      week: 'ods-datepicker-week',
      day: 'ods-datepicker-day',
      footer: '',
      todayButton: '',

      today: 'ods-datepicker-today',
      selected: 'ods-datepicker-selected',
      disabled: 'ods-datepicker-disabled',
      outside: '',
    };

    return (
      <div
        className={classNames('ods-datepicker', className)}
        ref={ref}
        {...rest}
      >
        <div className="ods-datepicker__form-row">
          <div className="ods-datepicker__form-controls">
            <label htmlFor="start-date">{labels?.from}</label>
            <Input
              ref={input1Ref}
              id="start-date"
              type="text"
              className="date-field"
              name="start-date"
              value={values.from}
              onClick={createHandleToggleClick}
              onChange={(editable && inputChange) || undefined}
              placeholder="dd/mm/aaaa"
              adornment={<CalendarOutline size={20} stroke="#B6B9CC" />}
              autoComplete="off"
              readOnly={!editable}
              disabled={disabled}
            />
          </div>

          <div className="ods-datepicker__form-controls">
            <label htmlFor="end-date">{labels?.to}</label>
            <Input
              ref={input2Ref}
              id="end-date"
              type="text"
              className="date-field"
              name="end-date"
              value={values.to}
              onClick={createHandleToggleClick}
              onChange={(editable && inputChange) || undefined}
              placeholder="dd/mm/aaaa"
              adornment={<CalendarOutline size={20} stroke="#B6B9CC" />}
              autoComplete="off"
              readOnly={!editable}
              disabled={disabled}
            />
          </div>

          {!disabled && showDayPicker && (
            <DayPicker
              numberOfMonths={1}
              enableOutsideDaysClick
              classNames={CustomStyles}
              locale="pt-BR"
              localeUtils={MomentLocaleUtils}
              selectedDays={(day) =>
                DayPicker.DateUtils.isDayInRange(day, {
                  from: fromDate,
                  to: toDate,
                })
              }
              navbarElement={(props) => <NavBar {...props} />}
              onDayClick={(day) => handleDayClick(day)}
              disabledDays={(day) => disabledDays(day)}
              onDayMouseEnter={(day) => handleDayMouseEnter(day)}
              modifiers={{
                from: (day) => DayPicker.DateUtils.isSameDay(day, fromDate),
                to: (day) => DayPicker.DateUtils.isSameDay(day, toDate),
              }}
            />
          )}
        </div>
      </div>
    );
  }
);

export default DatePicker;
