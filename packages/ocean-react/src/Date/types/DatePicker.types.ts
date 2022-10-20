import { DatePickerProps } from './DateRange.types';

export type DatePickerSingleProps = {
  label: string | undefined;
  value: string | undefined;
  onSelect: (date: string) => void;
} & Omit<DatePickerProps, 'labels' | 'values' | 'onSelect'>;
