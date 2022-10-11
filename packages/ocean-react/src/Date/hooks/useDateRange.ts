import React from 'react';
import * as DateFns from 'date-fns';

import { DatePickerProps, DatePickerFields } from '../types/DateRange.types';

import ptBr from 'date-fns/locale/pt-BR';

import { DateRange, ClassNames, DateFormatter } from 'react-day-picker';

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
  const [datePickerCache, setDatePickerCache] =
    React.useState<DatePickerFields>({ from: '', to: '' });

  const fromDate = DateFns.parse(values.from, localeDateFormat, new Date());
  const toDate = DateFns.parse(values.to, localeDateFormat, new Date());

  React.useEffect(() => {
    if (values.from === '') setCurrentField('');
  }, [values.from]);

  const updateState = (updateData: DatePickerFields, updateCache?: boolean) => {
    onSelect(updateData);
    updateCache && setDatePickerCache(updateData);
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

  const createHandleToggleClick = (fieldId: string) => {
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
    root: `ods-datepicker__calendar ${
      currentField === 'start-date'
        ? 'ods-datepicker_calendar_m1'
        : 'ods-datepicker_calendar_m2'
    }`,
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
  };
}
