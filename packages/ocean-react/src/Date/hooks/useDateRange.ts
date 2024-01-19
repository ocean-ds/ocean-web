import React from 'react';
import * as DateFns from 'date-fns';

import ptBr from 'date-fns/locale/pt-BR';

import { DateRange, ClassNames, DateFormatter } from 'react-day-picker';
import { DatePickerProps, DatePickerFields } from '../types/DateRange.types';

import {
  handleValidateStartsToday,
  dateMask,
  formatDay,
  getInputPlaceholder,
} from '../utils/dateUtils';

type IDatePickerProps = Pick<
  DatePickerProps,
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
  currentField: string;
  inputPlaceholder: string;
  handleDayMouseEnter: (day: Date) => void;
  handleDayClick: (day: Date) => void;
  inputChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
  createHandleToggleClick: (fieldId: string) => void;
  disabledDays: (day: Date) => boolean;
  formatDay: DateFormatter;
  handleCloseByOutside: () => void;
  handleDisplayMonth: (displayMonth: Date) => Date;
  currentMonthToDisplay: Date | undefined;
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
  const [currentField, setCurrentField] = React.useState<string>('');
  const [currentMonthToDisplay, setCurrentMonthToDisplay] =
    React.useState<Date>();
  const [datePickerCache, setDatePickerCache] =
    React.useState<DatePickerFields>({ from: '', to: '' });
  const [firstInputClicked, setFirstInputClicked] =
    React.useState<boolean>(false);

  const fromDate = DateFns.parse(values.from, localeDateFormat, new Date());
  const toDate = DateFns.parse(values.to, localeDateFormat, new Date());

  React.useEffect(() => {
    if (values.from === '') setCurrentField('');
  }, [values.from]);

  const updateState = (updateData: DatePickerFields, updateCache?: boolean) => {
    onSelect(updateData);
    return updateCache && setDatePickerCache(updateData);
  };

  const handleDayMouseEnter = (day: Date): void => {
    const formattedDay = DateFns.format(day, localeDateFormat);

    if (currentField === 'end-date' && !(values.from && day < fromDate)) {
      setCurrentField('end-date');
      updateState({ from: values.from, to: formattedDay });
    }
  };

  const handleDayClick = (day: Date): void => {
    if (!(startsToday && handleValidateStartsToday(startsToday, day))) {
      const formattedDay = DateFns.format(day, localeDateFormat);

      if (currentField === 'start-date') {
        updateCurrentMonth(formattedDay);
        if (day > toDate) {
          updateState({ from: formattedDay, to: '' }, true);
        } else {
          updateState({ from: formattedDay, to: values.to });
          setDatePickerCache({ from: formattedDay, to: values.to });
        }
        setCurrentField('end-date');
      }

      if (currentField === 'end-date') {
        if (day < fromDate) {
          updateState({ from: formattedDay, to: '' }, true);
        } else {
          updateState({ from: values.from, to: formattedDay }, true);
          setShowDayPicker(false);
          setCurrentField('');
        }
      }
    }
  };

  const updateCurrentMonth = (date: string) => {
    const parsedDate = DateFns.parse(date, 'dd/MM/yyyy', new Date());

    setCurrentMonthToDisplay(parsedDate);
  };

  const isValidDate = (date: Date | undefined): boolean =>
    date instanceof Date && !Number.isNaN(date.getTime());

  const handleDisplayMonth = (displayMonth: Date) => {
    const selectedDate = firstInputClicked
      ? selectedDays.from
      : selectedDays.to;
    const monthToShowOnHeader = isValidDate(selectedDate)
      ? selectedDate
      : undefined;

    return monthToShowOnHeader || displayMonth;
  };

  const createHandleToggleClick = (fieldId: string) => {
    const isValidStartDate =
      fieldId === 'start-date' && isValidDate(selectedDays.from);
    const isValidEndDate =
      fieldId === 'end-date' && isValidDate(selectedDays.to);

    if (isValidStartDate) {
      updateCurrentMonth(values.from);
      setFirstInputClicked(true);
    }

    if (isValidEndDate) {
      updateCurrentMonth(values.to);
      setFirstInputClicked(false);
    }

    setShowDayPicker(!showDayPicker);
    setCurrentField(fieldId);
  };

  const disabledDays = (day: Date): boolean => {
    const startToday = handleValidateStartsToday(startsToday, day);

    return startToday || (currentField === 'end-date' && day < fromDate);
  };

  const closeCalendarDelay = () => {
    setTimeout(() => setShowDayPicker(false), 500);
  };

  const inputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const dataFormatted = dateMask(target.value);

    if (target.id === 'start-date') {
      setCurrentField('start-date');
      updateState({ from: dataFormatted, to: '' }, true);

      if (dataFormatted.length === localeDateFormat.length) {
        setCurrentField('end-date');
        if (input2Ref && input2Ref.current) input2Ref.current.focus();
      }
    } else {
      setCurrentField('end-date');
      updateState({ from: values.from, to: dataFormatted }, true);

      if (dataFormatted.length === localeDateFormat.length) {
        setCurrentField('');
        closeCalendarDelay();
      }
    }
  };

  const handleCloseByOutside = () => {
    if (showDayPicker) {
      setShowDayPicker(false);
      setCurrentField('');

      if (datePickerCache.from !== '' && datePickerCache.to !== '')
        updateState(datePickerCache);
    }
  };

  const CustomStyles: ClassNames = {
    root: `ods-date__calendar ${
      currentField === 'start-date'
        ? 'ods-date_calendar_m1'
        : 'ods-date_calendar_m2'
    }`,
    caption: 'ods-date__caption',
    nav_button: 'ods-date__navButtons',
    nav_button_previous: 'ods-date__navButtonPrev',
    nav_button_next: 'ods-date__navButtonNext',
    nav_icon: 'ods-date__navIcon',
    table: 'ods-date__table',
    head: 'ods-date__head',
    head_row: 'ods-date__headRow',
    tbody: 'ods-date__body',
    row: 'ods-date__row',
    cell: 'ods-date__cell',
    day: 'ods-date__day',
    day_today: 'ods-date__today',
    day_selected: 'ods-date__selected',
    day_disabled: 'ods-date__disabled',
    day_range_start: 'ods-date__selectedStart',
    day_range_end: 'ods-date__selectedEnd',
    day_range_middle: 'ods-date__selectedMiddle',
  };

  const selectedDays: DateRange = {
    from: fromDate,
    to: toDate,
  };

  const inputPlaceholder = getInputPlaceholder(localeOption);

  return {
    input1Ref,
    input2Ref,
    showDayPicker,
    fromDate,
    toDate,
    selectedDays,
    CustomStyles,
    localeOption,
    currentField,
    inputPlaceholder,
    handleDayMouseEnter,
    handleDayClick,
    inputChange,
    createHandleToggleClick,
    disabledDays,
    formatDay,
    handleCloseByOutside,
    handleDisplayMonth,
    currentMonthToDisplay,
  };
}
