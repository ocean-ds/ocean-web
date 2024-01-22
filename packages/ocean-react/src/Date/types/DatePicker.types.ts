import * as DateFns from 'date-fns';

import { ClassNames, DateFormatter } from 'react-day-picker';
import { DatePickerProps } from './DateRange.types';

export type DatePickerSingleProps = {
  label: string | undefined;
  value: string | undefined;
  onSelect: (date: string) => void;
} & Omit<DatePickerProps, 'labels' | 'values' | 'onSelect'>;

export type IDatePickerProps = Pick<
  DatePickerSingleProps,
  'value' | 'onSelect' | 'startsToday' | 'locale'
>;

export type IDatePickerReturn = {
  input1Ref: React.Ref<HTMLInputElement>;
  input2Ref: React.Ref<HTMLInputElement>;
  showDayPicker: boolean;
  selectedDay: Date;
  CustomStyles: ClassNames;
  localeOption: DateFns.Locale;
  currentField: string;
  inputPlaceholder: string;
  handleDayClick: (day: Date) => void;
  inputChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
  createHandleToggleClick: (fieldId: string) => void;
  disabledDays: (day: Date) => boolean;
  formatDay: DateFormatter;
  handleCloseByOutside: () => void;
  currentMonthToDisplay: Date | undefined;
};
