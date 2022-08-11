import React from 'react';
import * as DateFns from 'date-fns';

import {
  ClassNames,
  DateRange,
  DateFormatter,
  WeekNumberFormatter,
} from 'react-day-picker';

import { DatePickerProps } from '../DatePicker/DatePicker';

type IDatePickerProps = Pick<DatePickerProps, 'values' | 'onSelect'>;

type IDatePickerReturn = {
  input1Ref: React.Ref<HTMLInputElement>;
  input2Ref: React.Ref<HTMLInputElement>;
  showDayPicker: boolean;
  fromDate: Date;
  toDate: Date;
  selectedDays: DateRange;
  CustomStyles: ClassNames;
  handleDayMouseEnter: (day: Date) => void;
  handleDayClick: (day: Date) => void;
  inputChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
  createHandleToggleClick: () => void;
  disabledDays: (day: Date) => boolean;
  formatDay: DateFormatter;
  formatWeekNumber: WeekNumberFormatter;
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

  const fromDate = new Date(values.from);
  const toDate = new Date(values.to);

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

  const inputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const dataFormatted = target.value; // Add input mask

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

  const CustomStyles: ClassNames = {
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

  const selectedDays: DateRange = {
    from: new Date(2022, 7, 10),
    to: new Date(2022, 7, 22),
    // from: fromDate,
    // to: toDate,
  };

  const formatDay: DateFormatter = (day) => DateFns.format(day, 'd');

  const formatWeekNumber: WeekNumberFormatter = (weekNumber) =>
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
