import React from 'react';
import classNames from 'classnames';

import * as DateFns from 'date-fns';

import * as Picker from 'react-day-picker';

import * as OceanIcons from '@useblu/ocean-icons-react';

import ptBr from 'date-fns/locale/pt-BR';

import Input from '../Input';

import useDatePicker from '../_util/useDatePicker';

export type DatePickerFields = {
  from: string;
  to: string;
};

export type DatePickerProps = {
  /**
   * Determines names of inputs (from/to)
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
  editable?: boolean;

  /**
   * Determines if date inputs are disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Determines error os inputs
   * @default false
   */
  error?: boolean;

  /**
   * Determines error message
   * @default null
   */
  helperText?: string;

  /**
   * Determines if date seleting starts today
   * @default false
   */
  startsSelectToday?: boolean;

  /**
   * Object locale of date-fns locale package (internationalize)
   * @default ptBr
   */
  locale?: DateFns.Locale;

  /**
   * ClassName to overwrite default style
   * @default null
   */
  className?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  function DatePicker(
    {
      labels,
      values,
      onSelect,
      editable,
      disabled,
      error,
      helperText,
      startsSelectToday,
      className,
      locale,
      ...rest
    },
    ref
  ) {
    const {
      input1Ref,
      input2Ref,
      showDayPicker,
      selectedDays,
      CustomStyles,
      handleDayMouseEnter,
      handleDayClick,
      inputChange,
      createHandleToggleClick,
      disabledDays,
      formatDay,
      formatWeekNumber,
    } = useDatePicker({ values, onSelect, startsSelectToday });

    return (
      <div
        className={classNames('ods-datepicker', className)}
        ref={ref}
        {...rest}
      >
        <div className="ods-datepicker__form-row">
          <div className="ods-datepicker__form-controls">
            {labels && labels.from && (
              <label htmlFor="start-date">{labels.from}</label>
            )}
            <Input
              ref={input1Ref}
              data-testid="datepicker-input-1"
              id="start-date"
              type="text"
              className="date-field"
              name="start-date"
              value={values.from}
              onClick={createHandleToggleClick}
              onChange={(editable && inputChange) || undefined}
              placeholder="dd/mm/aaaa"
              adornment={
                <OceanIcons.CalendarOutline size={20} stroke="#B6B9CC" />
              }
              autoComplete="off"
              readOnly={!editable}
              disabled={disabled}
              error={!disabled && error}
              helperText={(!disabled && error && helperText) || undefined}
              maxLength={10}
            />
          </div>

          <div className="ods-datepicker__form-controls">
            {labels && labels.to && (
              <label htmlFor="end-date">{labels.to}</label>
            )}
            <Input
              ref={input2Ref}
              data-testid="datepicker-input-2"
              id="end-date"
              type="text"
              className="date-field"
              name="end-date"
              value={values.to}
              onClick={createHandleToggleClick}
              onChange={(editable && inputChange) || undefined}
              placeholder="dd/mm/aaaa"
              adornment={
                <OceanIcons.CalendarOutline size={20} stroke="#B6B9CC" />
              }
              autoComplete="off"
              readOnly={!editable}
              disabled={disabled}
              error={!disabled && error}
              helperText={(!disabled && error && helperText) || undefined}
              maxLength={10}
            />
          </div>

          {!disabled && showDayPicker && (
            <div data-testid="datepicker-calendar">
              <Picker.DayPicker
                mode="range"
                locale={locale || ptBr}
                weekStartsOn={0}
                classNames={CustomStyles}
                className={className}
                onDayClick={(day: Date) => handleDayClick(day)}
                onDayMouseEnter={(day: Date) => handleDayMouseEnter(day)}
                formatters={{ formatDay, formatWeekNumber }}
                selected={selectedDays}
                disabled={disabledDays}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default DatePicker;
