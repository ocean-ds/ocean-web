import React from 'react';
import classNames from 'classnames';

import { DayPicker, CaptionProps } from 'react-day-picker';
import { CalendarOutline } from '@useblu/ocean-icons-react';
import Input from '../Input';

import useDateRange from './hooks/useDateRange';

import { DatePickerProps } from './types/DateRange.types';

import DatePickerHeader from './DateHeader';

const DatePickerRange = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      labels,
      values,
      onSelect,
      editable,
      disabled,
      error,
      helperText,
      startsToday,
      className,
      locale,
      ...rest
    },
    ref
  ) => {
    const {
      input1Ref,
      input2Ref,
      showDayPicker,
      selectedDays,
      CustomStyles,
      localeOption,
      currentField,
      inputPlaceholder,
      handleDayMouseEnter,
      handleDayClick,
      handleDisplayMonth,
      inputChange,
      createHandleToggleClick,
      disabledDays,
      formatDay,
      handleCloseByOutside,
      currentMonthToDisplay,
    } = useDateRange({ values, onSelect, startsToday, locale });

    return (
      <div>
        {showDayPicker && (
          <div
            className="ods-date-background"
            data-testid="date-picker-outside"
            onClick={handleCloseByOutside}
          />
        )}
        <div className={classNames('ods-date', className)} ref={ref} {...rest}>
          <div className="ods-date__form-row">
            <div
              className="ods-date__form-controls"
              data-testid="date-picker-first-field-wrapper"
              onClick={() => createHandleToggleClick('start-date')}
            >
              {labels && labels.from && (
                <label htmlFor="start-date">{labels.from}</label>
              )}
              <Input
                ref={input1Ref}
                data-testid="datepicker-input-1"
                id="start-date"
                type="text"
                className={classNames({
                  'date-field-focussed': currentField === 'start-date',
                })}
                name="start-date"
                value={values.from}
                onChange={(editable && inputChange) || undefined}
                placeholder={inputPlaceholder}
                adornment={<CalendarOutline size={20} stroke="#B6B9CC" />}
                autoComplete="off"
                readOnly={!editable}
                disabled={disabled}
                error={!disabled && error}
                inputMode="numeric"
                helperText={
                  (!disabled && !showDayPicker && error && helperText) ||
                  undefined
                }
                maxLength={10}
              />
            </div>

            <div
              className="ods-date__form-controls"
              data-testid="date-picker-second-field-wrapper"
              onClick={() => createHandleToggleClick('end-date')}
            >
              {labels && labels.to && (
                <label htmlFor="end-date">{labels.to}</label>
              )}
              <Input
                ref={input2Ref}
                data-testid="datepicker-input-2"
                id="end-date"
                type="text"
                className={classNames({
                  'date-field-focussed': currentField === 'end-date',
                })}
                name="end-date"
                value={values.to}
                onChange={(editable && inputChange) || undefined}
                placeholder={inputPlaceholder}
                adornment={<CalendarOutline size={20} stroke="#B6B9CC" />}
                autoComplete="off"
                readOnly={!editable}
                disabled={disabled}
                error={!disabled && error}
                inputMode="numeric"
                helperText={
                  (!disabled && !showDayPicker && error && helperText) ||
                  undefined
                }
                maxLength={10}
              />
            </div>

            {!disabled && showDayPicker && (
              <div data-testid="datepicker-calendar">
                <DayPicker
                  mode="range"
                  locale={localeOption}
                  weekStartsOn={0}
                  classNames={CustomStyles}
                  className={className}
                  onDayClick={(day: Date) => handleDayClick(day)}
                  onDayMouseEnter={(day: Date) => handleDayMouseEnter(day)}
                  formatters={{ formatDay }}
                  selected={selectedDays}
                  disabled={disabledDays}
                  defaultMonth={currentMonthToDisplay}
                  components={{
                    Caption: ({ displayMonth }: CaptionProps) => (
                      <DatePickerHeader
                        locale={localeOption}
                        displayMonth={handleDisplayMonth(displayMonth)}
                      />
                    ),
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

DatePickerRange.displayName = 'DatePickerRange';

export default DatePickerRange;
