import React from 'react';
import classNames from 'classnames';

import Input from '../Input';

import useDatePicker from '../_util/useDatePicker';

import { DayPicker, CaptionProps } from 'react-day-picker';

import { CalendarOutline } from '@useblu/ocean-icons-react';

import { DatePickerProps } from './DatePicker';

import DatePickerHeader from './DatePickerHeader';

const DatePickerRange = React.forwardRef<HTMLDivElement, DatePickerProps>(
  function DatePickerRange(
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
  ) {
    const {
      input1Ref,
      input2Ref,
      showDayPicker,
      selectedDays,
      CustomStyles,
      localeOption,
      currentField,
      handleDayMouseEnter,
      handleDayClick,
      inputChange,
      createHandleToggleClick,
      disabledDays,
      formatDay,
      getInputPlaceholder,
      handleCloseByOutside,
    } = useDatePicker({ values, onSelect, startsToday, locale });

    return (
      <div>
        <div
          className="ods-datepicker-background"
          data-testid="date-picker-outside"
          onClick={handleCloseByOutside}
        />
        <div
          className={classNames('ods-datepicker', className)}
          ref={ref}
          {...rest}
        >
          <div className="ods-datepicker__form-row">
            <div
              className="ods-datepicker__form-controls"
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
                placeholder={getInputPlaceholder()}
                adornment={<CalendarOutline size={20} stroke="#B6B9CC" />}
                autoComplete="off"
                readOnly={!editable}
                disabled={disabled}
                error={!disabled && error}
                pattern="[0-9]*"
                inputMode="numeric"
                helperText={
                  (!disabled && !showDayPicker && error && helperText) ||
                  undefined
                }
                maxLength={10}
              />
            </div>

            <div
              className="ods-datepicker__form-controls"
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
                placeholder={getInputPlaceholder()}
                adornment={<CalendarOutline size={20} stroke="#B6B9CC" />}
                autoComplete="off"
                readOnly={!editable}
                disabled={disabled}
                error={!disabled && error}
                pattern="[0-9]*"
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
                  components={{
                    Caption: ({ displayMonth }: CaptionProps) =>
                      DatePickerHeader({ displayMonth, locale: localeOption }),
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

export default DatePickerRange;
