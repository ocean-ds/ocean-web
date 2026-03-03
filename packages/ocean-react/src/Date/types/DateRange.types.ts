import React from 'react';
import * as DateFns from 'date-fns';
import { Locale } from 'date-fns';
import {
  DateRange,
  ClassNames,
  DateFormatter,
  Matcher,
} from 'react-day-picker';
import {
  DisabledDaysMessageProp,
  TooltipPosition,
} from '../hooks/useDisabledDaysTooltip';

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
   * Determines if date are disabled
   * @default undefined
   */
  disabledDays?: Matcher | Matcher[];

  /**
   * Mensagem exibida em tooltip ao tentar selecionar um dia bloqueado.
   * Pode ser uma string fixa ou uma lista de mensagens por data.
   * @default undefined
   */
  disabledDaysMessage?: DisabledDaysMessageProp;

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
  startsToday?: boolean;

  /**
   * Object locale of date-fns locale package (internationalize)
   * @default ptBr
   */
  locale?: Locale;

  /**
   * ClassName to overwrite default style
   * @default null
   */
  className?: string;
} & React.ComponentPropsWithoutRef<'div'>;

export type IDatePickerProps = Pick<
  DatePickerProps,
  'values' | 'onSelect' | 'startsToday' | 'locale' | 'disabledDaysMessage'
>;

export type IDatePickerReturn = {
  input1Ref: React.Ref<HTMLInputElement>;
  input2Ref: React.Ref<HTMLInputElement>;
  showDayPicker: boolean;
  fromDate: Date;
  toDate: Date;
  selectedDays: DateRange;
  CustomStyles: ClassNames;
  localeOption: DateFns.Locale;
  currentField: string;
  inputPlaceholder: string;
  handleDayMouseEnter: (day: Date) => void;
  handleDayClick: (day: Date) => void;
  handleDayClickWithModifiers: (
    day: Date,
    modifiers: import('react-day-picker').ActiveModifiers
  ) => void;
  showDisabledTooltip: boolean;
  tooltipMessage: string;
  tooltipPosition: TooltipPosition;
  handleCalendarClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  inputChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
  createHandleToggleClick: (fieldId: string) => void;
  formatDay: DateFormatter;
  handleCloseByOutside: () => void;
  handleDisplayMonth: (displayMonth: Date) => Date;
  currentMonthToDisplay: Date | undefined;
};
