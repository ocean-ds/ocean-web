import React from 'react';
import classNames from 'classnames';

import { DayPicker, CaptionProps } from 'react-day-picker';
import { CalendarOutline } from '@useblu/ocean-icons-react';
import Input from '../Input';

import useDatePicker from './hooks/useDatePicker';

import { DatePickerSingleProps } from './types/DatePicker.types';

import DateHeader from './DateHeader';
import DisabledDaysTooltip from './components/DisabledDaysTooltip';

const DatePickerSingle = React.forwardRef<
  HTMLDivElement,
  DatePickerSingleProps
>(
  (
    {
      label,
      value,
      onSelect,
      editable,
      disabled,
      inline = false,
      error,
      helperText,
      startsToday,
      disabledDays,
      disabledDaysMessage,
      className,
      locale,
      ...rest
    },
    ref
  ) => {
    const {
      input1Ref,
      showDayPicker,
      selectedDay,
      CustomStyles,
      localeOption,
      currentField,
      inputPlaceholder,
      inputChange,
      createHandleToggleClick,
      formatDay,
      handleCloseByOutside,
      currentMonthToDisplay,
      showDisabledTooltip,
      handleDayClickWithModifiers,
    } = useDatePicker({
      value,
      onSelect,
      startsToday,
      locale,
      disabledDaysMessage,
    });

    const calendarOpen = inline || showDayPicker;

    const CaptionWithTooltip = ({ displayMonth }: CaptionProps) => (
      <>
        {DateHeader({ displayMonth, locale: localeOption, mode: 'single' })}
        {disabledDaysMessage && (
          <DisabledDaysTooltip
            message={disabledDaysMessage}
            show={showDisabledTooltip}
          />
        )}
      </>
    );

    return (
      <div>
        {calendarOpen && !inline && (
          <div
            className="ods-date-background"
            data-testid="date-picker-outside"
            onClick={handleCloseByOutside}
          />
        )}
        <div className={classNames('ods-date', className)} ref={ref} {...rest}>
          <div className="ods-date__form-row-datepicker">
            {!inline && (
              <div
                className="ods-date__form-controls"
                data-testid="date-picker-first-field-wrapper"
                onClick={() => createHandleToggleClick('start-date')}
              >
                {label && <label htmlFor="start-date">{label}</label>}
                <Input
                  ref={input1Ref}
                  data-testid="datepicker-input-1"
                  id="start-date"
                  type="text"
                  className={classNames({
                    'date-field-focussed': currentField === 'start-date',
                  })}
                  name="start-date"
                  value={value}
                  onChange={(editable && inputChange) || undefined}
                  placeholder={inputPlaceholder}
                  adornment={<CalendarOutline size={20} stroke="#B6B9CC" />}
                  autoComplete="off"
                  readOnly={!editable}
                  disabled={disabled}
                  error={!disabled && error}
                  inputMode="numeric"
                  helperText={
                    (!disabled && !showDayPicker && helperText) || undefined
                  }
                  maxLength={10}
                />
              </div>
            )}
            {inline && label && (
              <div className="ods-date__inline-label">{label}</div>
            )}

            {!disabled && calendarOpen && (
              <div data-testid="datepicker-calendar">
                <DayPicker
                  mode="single"
                  locale={localeOption}
                  weekStartsOn={0}
                  classNames={CustomStyles(inline)}
                  className={className}
                  onDayClick={handleDayClickWithModifiers}
                  formatters={{ formatDay }}
                  selected={selectedDay}
                  disabled={startsToday ? { before: new Date() } : disabledDays}
                  defaultMonth={currentMonthToDisplay}
                  components={{
                    Caption: CaptionWithTooltip,
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

DatePickerSingle.displayName = 'DatePickerSingle';

export default DatePickerSingle;
