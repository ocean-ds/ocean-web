import React from 'react';
import classNames from 'classnames';

import * as Picker from 'react-day-picker';

import * as OceanIcons from '@useblu/ocean-icons-react';

import ptBr from 'date-fns/locale/pt';

import Input from '../Input';

import useDatePicker from '../_util/useDatePicker';

type DatePickerFields = {
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
      className,
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
    } = useDatePicker({ values, onSelect });

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
              adornment={
                <OceanIcons.CalendarOutline size={20} stroke="#B6B9CC" />
              }
              autoComplete="off"
              readOnly={!editable}
              disabled={disabled}
              error={!disabled && error}
              helperText={(!disabled && error && helperText) || undefined}
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
              adornment={
                <OceanIcons.CalendarOutline size={20} stroke="#B6B9CC" />
              }
              autoComplete="off"
              readOnly={!editable}
              disabled={disabled}
              error={!disabled && error}
              helperText={(!disabled && error && helperText) || undefined}
            />
          </div>

          {!disabled && showDayPicker && (
            <Picker.DayPicker
              mode="range"
              locale={ptBr}
              weekStartsOn={0}
              classNames={CustomStyles}
              className={className}
              onDayClick={(day: Date) => handleDayClick(day)}
              onDayMouseEnter={(day: Date) => handleDayMouseEnter(day)}
              formatters={{ formatDay, formatWeekNumber }}
              selected={selectedDays}
              disabled={disabledDays}
            />
          )}
        </div>
      </div>
    );
  }
);

export default DatePicker;
