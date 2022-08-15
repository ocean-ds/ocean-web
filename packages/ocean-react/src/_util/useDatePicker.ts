import React from 'react';
import * as DateFns from 'date-fns';

import * as DP from 'react-day-picker';

import * as DatePicker from '../DatePicker/DatePicker';

type IDatePickerProps = Pick<DatePicker.DatePickerProps, 'values' | 'onSelect'>;

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
const DEFAULT_LOCATE = 'pt-br';

export default function useDatePicker({
  values,
  onSelect,
}: IDatePickerProps): IDatePickerReturn {
  const input1Ref = React.useRef<HTMLInputElement>(null);
  const input2Ref = React.useRef<HTMLInputElement>(null);

  const [showDayPicker, setShowDayPicker] = React.useState(false);
  const [isSelectingLastDay, setIsSelectingLastDay] = React.useState(false);

  const [dayFrom, mouthFrom, yearFrom] = values.from.split('/');
  const [dayTo, mouthTo, yearTo] = values.from.split('/');

  const fromDate = new Date(
    parseInt(dayFrom),
    parseInt(mouthFrom),
    parseInt(yearFrom)
  );
  const toDate = new Date(parseInt(dayTo), parseInt(mouthTo), parseInt(yearTo));

  console.log('VALORES: ', values, fromDate, toDate);

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
    return isSelectingLastDay && day < fromDate;
  };

  const dateMask = (value: string) => {
    let inputToChange = value;

    if (inputToChange.length === 2 || inputToChange.length === 5) {
      inputToChange += '/';
    }

    return inputToChange.slice(0, 10);
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
    root: 'ods-datepicker__root',
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

  // const selectedDays: DP.DateRange = {
  //   from: fromDate,
  //   to: toDate,
  // };

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
