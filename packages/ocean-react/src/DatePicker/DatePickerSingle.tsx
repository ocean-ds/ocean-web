import React from 'react';
import classNames from 'classnames';

import Input from '../Input';

import useDatePickerSingle from '../_util/useDatePickerSingle';

import { DayPicker, CaptionProps } from 'react-day-picker';

import { CalendarOutline } from '@useblu/ocean-icons-react';

import { DatePickerProps } from './DatePicker';

import DatePickerHeader from './DatePickerHeader';

export type DatePickerSingleProps = {
  label: string | undefined;
  value: string | undefined;
  onSelect: (date: string) => void;
} & Omit<DatePickerProps, 'labels' | 'values' | 'onSelect'>;

const DatePickerSingle = React.forwardRef<
  HTMLDivElement,
  DatePickerSingleProps
>(function DatePickerSingle(
  {
    label,
    value,
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
    showDayPicker,
    selectedDay,
    CustomStyles,
    localeOption,
    currentField,
    handleDayClick,
    inputChange,
    createHandleToggleClick,
    disabledDays,
    formatDay,
    getInputPlaceholder,
    handleCloseByOutside,
  } = useDatePickerSingle({ value, onSelect, startsToday, locale });

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
        <div className="ods-datepicker__form-row-single">
          <div
            className="ods-datepicker__form-controls"
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
                mode="single"
                locale={localeOption}
                weekStartsOn={0}
                classNames={CustomStyles}
                className={className}
                onDayClick={(day: Date) => handleDayClick(day)}
                formatters={{ formatDay }}
                selected={selectedDay}
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
});
export default DatePickerSingle;
