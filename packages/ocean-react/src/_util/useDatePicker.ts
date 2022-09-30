import React from 'react';
import * as DateFns from 'date-fns';

import * as DatePicker from '../DatePicker/DatePicker';

import ptBr from 'date-fns/locale/pt-BR';

import { DateRange, ClassNames, DateFormatter } from 'react-day-picker';

type IDatePickerProps = Pick<
  DatePicker.DatePickerProps,
  'values' | 'onSelect' | 'startsToday' | 'locale'
>;

type IDatePickerReturn = {
  input1Ref: React.Ref<HTMLInputElement>;
  input2Ref: React.Ref<HTMLInputElement>;
  showDayPicker: boolean;
  fromDate: Date;
  toDate: Date;
  selectedDays: DateRange;
  CustomStyles: ClassNames;
  localeOption: DateFns.Locale;
  handleDayMouseEnter: (day: Date) => void;
  handleDayClick: (day: Date) => void;
  inputChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
  createHandleToggleClick: () => void;
  disabledDays: (day: Date) => boolean;
  formatDay: DateFormatter;
  getInputPlaceholder: () => string;
};

export default function useDatePicker({
  values,
  onSelect,
  startsToday,
  locale,
}: IDatePickerProps): IDatePickerReturn {
  const localeOption = locale || ptBr;
  const localeDateFormat =
    localeOption &&
    localeOption.formatLong &&
    localeOption.formatLong.date({ width: 'short' });

  const input1Ref = React.useRef<HTMLInputElement>(null);
  const input2Ref = React.useRef<HTMLInputElement>(null);

  const [showDayPicker, setShowDayPicker] = React.useState(false);
  const [isSelectingLastDay, setIsSelectingLastDay] = React.useState(false);

  const fromDate = DateFns.parse(values.from, localeDateFormat, new Date());
  const toDate = DateFns.parse(values.to, localeDateFormat, new Date());

  React.useEffect(() => {
    if (values.from === '') setIsSelectingLastDay(false);
  }, [values.from]);

  const updateState = (updateData: DatePicker.DatePickerFields) =>
    onSelect(updateData);

  const handleDayMouseEnter = (day: Date): void => {
    const formattedDay = DateFns.format(day, localeDateFormat);

    isSelectingLastDay &&
      !(values.from && day < fromDate) &&
      updateState({ from: values.from, to: formattedDay });
  };

  const handleDayClick = (day: Date): void => {
    const formattedDay = DateFns.format(day, localeDateFormat);

    if (isSelectingLastDay) {
      if (day < fromDate) {
        updateState({ from: formattedDay, to: '' });
      } else {
        setIsSelectingLastDay(false);
        setShowDayPicker(false);
        updateState({ from: values.from, to: formattedDay });
      }
    } else {
      setIsSelectingLastDay(true);
      updateState({ from: formattedDay, to: '' });
    }
  };

  const createHandleToggleClick = () => {
    setShowDayPicker(!showDayPicker);

    if (values.from.length < localeDateFormat.length) {
      if (input1Ref && input1Ref.current) input1Ref.current.focus();
    } else if (
      values.from.length === localeDateFormat.length &&
      values.to.length === localeDateFormat.length
    ) {
      if (input1Ref && input1Ref.current) input1Ref.current.focus();
    } else {
      setIsSelectingLastDay(true);
      if (input2Ref && input2Ref.current) input2Ref.current.focus();
    }
  };

  const disabledDays = (day: Date): boolean => {
    const startToday = Boolean(
      startsToday &&
        day < new Date(new Date().setDate(new Date().getDate() - 1))
    );

    return startToday || (isSelectingLastDay && day < fromDate);
  };

  const dateMask = (value: string) => {
    const v = value.replace(/\D/g, '').slice(0, 10);

    if (v.length >= 5) return `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
    if (v.length >= 3) return `${v.slice(0, 2)}/${v.slice(2)}`;

    return v;
  };

  const closeCalendarDelay = () => {
    setTimeout(() => setShowDayPicker(false), 500);
  };

  const inputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const dataFormatted = dateMask(target.value);

    if (target.id === 'start-date') {
      setIsSelectingLastDay(false);
      updateState({ from: dataFormatted, to: '' });

      if (dataFormatted.length === localeDateFormat.length) {
        setIsSelectingLastDay(true);
        if (input2Ref && input2Ref.current) input2Ref.current.focus();
      }
    } else {
      setIsSelectingLastDay(true);
      updateState({ from: values.from, to: dataFormatted });

      if (dataFormatted.length === localeDateFormat.length)
        closeCalendarDelay();
    }
  };

  const CustomStyles: ClassNames = {
    root: 'ods-datepicker__calendar',
    caption: 'ods-datepicker__caption',
    nav_button: 'ods-datepicker__navButtons',
    nav_button_previous: 'ods-datepicker__navButtonPrev',
    nav_button_next: 'ods-datepicker__navButtonNext',
    nav_icon: 'ods-datepicker__navIcon',
    table: 'ods-datepicker__table',
    head: 'ods-datepicker__head',
    head_row: 'ods-datepicker__headRow',
    tbody: 'ods-datepicker__body',
    row: 'ods-datepicker__row',
    cell: 'ods-datepicker__cell',
    day: 'ods-datepicker__day',
    day_today: 'ods-datepicker__today',
    day_selected: 'ods-datepicker__selected',
    day_disabled: 'ods-datepicker__disabled',
    day_range_start: 'ods-datepicker__selectedStart',
    day_range_end: 'ods-datepicker__selectedEnd',
    day_range_middle: 'ods-datepicker__selectedMiddle',
  };

  const selectedDays: DateRange = {
    from: fromDate,
    to: toDate,
  };

  const formatDay: DateFormatter = (day) => DateFns.format(day, 'd');

  const getInputPlaceholder = (): string =>
    localeOption.code === 'pt-BR' ? 'dd/mm/aaaa' : 'mm/dd/yyyy';

  return {
    input1Ref,
    input2Ref,
    showDayPicker,
    fromDate,
    toDate,
    selectedDays,
    CustomStyles,
    localeOption,
    handleDayMouseEnter,
    handleDayClick,
    inputChange,
    createHandleToggleClick,
    disabledDays,
    formatDay,
    getInputPlaceholder,
  };
}