import * as DateFns from 'date-fns';

import { ClassNames, DateFormatter, Matcher } from 'react-day-picker';
import { DatePickerProps } from './DateRange.types';

export type DatePickerSingleProps = {
  label: string | undefined;
  value: string | undefined;
  onSelect: (date: string) => void;
  disabledDays?: Matcher | Matcher[];
  inline?: boolean;
} & Omit<DatePickerProps, 'labels' | 'values' | 'onSelect'>;

export type IDatePickerProps = Pick<
  DatePickerSingleProps,
  'value' | 'onSelect' | 'startsToday' | 'locale' | 'disabledDays'
>;

export type IDatePickerReturn = {
  input1Ref: React.Ref<HTMLInputElement>;
  input2Ref: React.Ref<HTMLInputElement>;
  showDayPicker: boolean;
  selectedDay: Date;
  CustomStyles: (inline: boolean) => ClassNames;
  localeOption: DateFns.Locale;
  currentField: string;
  inputPlaceholder: string;
  handleDayClick: (day: Date) => void;
  inputChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
  createHandleToggleClick: (fieldId: string) => void;
  formatDay: DateFormatter;
  handleCloseByOutside: () => void;
  currentMonthToDisplay: Date | undefined;
};
