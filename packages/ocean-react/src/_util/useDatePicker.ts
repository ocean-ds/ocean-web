import React from 'react';
import * as DateFns from 'date-fns';

import * as DP from 'react-day-picker';

import * as DatePicker from '../DatePicker/DatePicker';

type IDatePickerProps = Pick<
  DatePicker.DatePickerProps,
  'values' | 'onSelect' | 'startsSelectToday'
>;

type IDatePickerReturn = {
  input1Ref: React.Ref<HTMLInputElement>;
  input2Ref: React.Ref<HTMLInputElement>;
  showDayPicker: boolean;
  fromDate: Date;
  toDate: Date;
  selectedDays: DP.DateRange;
  CustomStyles: DP.ClassNames;
  handleDayMouseEnter: (day: Date) => void;
  handleDayClick: (day: Date) => void;
  inputChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
  createHandleToggleClick: () => void;
  disabledDays: (day: Date) => boolean;
  formatDay: DP.DateFormatter;
  formatWeekNumber: DP.WeekNumberFormatter;
};

const DEFAULT_FORMAT = 'dd/MM/yyyy';
const DEFAULT_LOCATE = 'pt-BR';

export default function useDatePicker({
  values,
  onSelect,
  startsSelectToday,
}: IDatePickerProps): IDatePickerReturn {
  const input1Ref = React.useRef<HTMLInputElement>(null);
  const input2Ref = React.useRef<HTMLInputElement>(null);

  const [showDayPicker, setShowDayPicker] = React.useState(false);
  const [isSelectingLastDay, setIsSelectingLastDay] = React.useState(false);

  const fromDate = DateFns.parse(values.from, DEFAULT_FORMAT, new Date());
  const toDate = DateFns.parse(values.to, DEFAULT_FORMAT, new Date());

  React.useEffect(() => {
    if (values.from === '') setIsSelectingLastDay(false);
  }, [values.from]);

  const handleDayMouseEnter = (day: Date): void => {
    const formattedDay = DateFns.format(day, DEFAULT_FORMAT);

    if (!isSelectingLastDay || (values.from && day < fromDate)) return;

    onSelect({ from: values.from, to: formattedDay });
  };

  const handleDayClick = (day: Date): void => {
    const formattedDay = DateFns.format(day, DEFAULT_FORMAT);

    if (isSelectingLastDay) {
      if (day < fromDate) {
        onSelect({ from: formattedDay, to: '' });
      } else {
        setIsSelectingLastDay(false);
        setShowDayPicker(false);
        onSelect({ from: values.from, to: formattedDay });
      }
    } else {
      setIsSelectingLastDay(true);
      onSelect({ from: formattedDay, to: '' });
    }
  };

  const createHandleToggleClick = () => {
    setShowDayPicker(true);

    if (values.from.length < DEFAULT_FORMAT.length) {
      input1Ref?.current?.focus();
    } else if (
      values.from.length === DEFAULT_FORMAT.length &&
      values.to.length === DEFAULT_FORMAT.length
    ) {
      input1Ref?.current?.focus();
    } else {
      setIsSelectingLastDay(true);
      input2Ref?.current?.focus();
    }
  };

  const disabledDays = (day: Date): boolean => {
    const startToday = Boolean(
      startsSelectToday &&
        day < new Date(new Date().setDate(new Date().getDate() - 1))
    );

    return startToday || (isSelectingLastDay && day < fromDate);
  };

  const dateMask = (value: string) => {
    const v = value.replace(/\D/g, '').slice(0, 10);
    if (v.length >= 5) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
    } else if (v.length >= 3) {
      return `${v.slice(0, 2)}/${v.slice(2)}`;
    }
    return v;
  };

  const inputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const dataFormatted = dateMask(target.value);

    if (target.id === 'start-date') {
      setIsSelectingLastDay(false);
      onSelect({ from: dataFormatted, to: '' });

      if (dataFormatted.length === DEFAULT_FORMAT.length) {
        setIsSelectingLastDay(true);
        input2Ref?.current?.focus();
      }
    } else {
      setIsSelectingLastDay(true);
      onSelect({ from: values.from, to: dataFormatted });

      if (dataFormatted.length === DEFAULT_FORMAT.length) {
        setTimeout(() => setShowDayPicker(false), 500);
      }
    }
  };

  const CustomStyles: DP.ClassNames = {
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

  const selectedDays: DP.DateRange = {
    from: fromDate,
    to: toDate,
  };

  const formatDay: DP.DateFormatter = (day) => DateFns.format(day, 'd');

  const formatWeekNumber: DP.WeekNumberFormatter = (weekNumber) =>
    weekNumber.toLocaleString(DEFAULT_LOCATE);

  return {
    input1Ref,
    input2Ref,
    showDayPicker,
    fromDate,
    toDate,
    selectedDays,
    CustomStyles,
    handleDayMouseEnter,
    handleDayClick,
    inputChange,
    createHandleToggleClick,
    disabledDays,
    formatDay,
    formatWeekNumber,
  };
}
