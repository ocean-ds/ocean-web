import * as DateFns from 'date-fns';

import { ClassNames, DateFormatter, Matcher } from 'react-day-picker';
import { DatePickerProps } from './DateRange.types';
import {
  DisabledDaysMessageProp,
  TooltipPosition,
} from '../hooks/useDisabledDaysTooltip';

export type DatePickerSingleProps = {
  label: string | undefined;
  value: string | undefined;
  onSelect: (date: string) => void;
  disabledDays?: Matcher | Matcher[];
  /**
   * Mensagem exibida em tooltip ao tentar selecionar um dia bloqueado.
   * Pode ser uma string fixa ou uma lista de mensagens por data.
   */
  disabledDaysMessage?: DisabledDaysMessageProp;
  inline?: boolean;
} & Omit<DatePickerProps, 'labels' | 'values' | 'onSelect'>;

export type IDatePickerProps = Pick<
  DatePickerSingleProps,
  | 'value'
  | 'onSelect'
  | 'startsToday'
  | 'locale'
  | 'disabledDays'
  | 'disabledDaysMessage'
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
  inputChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
  createHandleToggleClick: (fieldId: string) => void;
  formatDay: DateFormatter;
  handleCloseByOutside: () => void;
  currentMonthToDisplay: Date | undefined;
  showDisabledTooltip: boolean;
  tooltipMessage: string;
  tooltipPosition: TooltipPosition;
  handleCalendarClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleDayClickWithModifiers: (
    day: Date,
    modifiers: import('react-day-picker').ActiveModifiers
  ) => void;
};
