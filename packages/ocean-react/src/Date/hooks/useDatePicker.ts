import React from 'react';
import * as DateFns from 'date-fns';

import ptBr from 'date-fns/locale/pt-BR';

import { ClassNames, DateFormatter } from 'react-day-picker';

import { DatePickerSingleProps } from '../types/DatePicker.types';

import {
  handleValidateStartsToday,
  dateMask,
  formatDay,
  getInputPlaceholder,
} from '../utils/dateUtils';

type IDatePickerProps = Pick<
  DatePickerSingleProps,
  'value' | 'onSelect' | 'startsToday' | 'locale'
>;

type IDatePickerReturn = {
  input1Ref: React.Ref<HTMLInputElement>;
  input2Ref: React.Ref<HTMLInputElement>;
  showDayPicker: boolean;
  selectedDay: Date;
  CustomStyles: ClassNames;
  localeOption: DateFns.Locale;
  currentField: string;
  inputPlaceholder: string;
  handleDayClick: (day: Date) => void;
  inputChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
  createHandleToggleClick: (fieldId: string) => void;
  disabledDays: (day: Date) => boolean;
  formatDay: DateFormatter;
  handleCloseByOutside: () => void;
};

export default function useDatePickerSingle({
  value,
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
  const [datePickerCache, setDatePickerCache] = React.useState<string>('');

  const fromDate = DateFns.parse(value || '', localeDateFormat, new Date());

  React.useEffect(() => {
    if (value === '') setCurrentField('');
  }, [value]);

  const updateState = (updateData: string, updateCache?: boolean) => {
    onSelect(updateData);
    return updateCache && setDatePickerCache(updateData);
  };

  const handleDayClick = (day: Date): void => {
    if (!(startsToday && handleValidateStartsToday(startsToday, day))) {
      const formattedDay = DateFns.format(day, localeDateFormat);

      updateState(formattedDay, true);
      setCurrentField('');
      setShowDayPicker(false);
    }
  };

  const createHandleToggleClick = (fieldId: string) => {
    setShowDayPicker(!showDayPicker);
    setCurrentField(fieldId);
  };

  const disabledDays = (day: Date): boolean => {
    const startToday = handleValidateStartsToday(startsToday, day);

    return startToday;
  };

  const closeCalendarDelay = () => {
    setTimeout(() => setShowDayPicker(false), 500);
  };

  const inputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const dataFormatted = dateMask(target.value);

    updateState(dataFormatted, true);

    if (dataFormatted.length === localeDateFormat.length) {
      setCurrentField('');
      closeCalendarDelay();
    }
  };

  const handleCloseByOutside = () => {
    if (showDayPicker) {
      setShowDayPicker(false);
      setCurrentField('');

      if (datePickerCache) updateState(datePickerCache);
    }
  };

  const CustomStyles: ClassNames = {
    root: 'ods-date__calendar ods-date_calendar_m1',
    caption: 'ods-date__caption',
    nav_button: 'ods-date__navButtons',
    nav_button_previous: 'ods-date__navButtonPrev-datepicker',
    nav_button_next: 'ods-date__navButtonNext-datepicker',
    nav_icon: 'ods-date__navIcon',
    table: 'ods-date__table',
    head: 'ods-date__head',
    head_row: 'ods-date__headRow',
    tbody: 'ods-date__body',
    row: 'ods-date__row',
    cell: 'ods-date__cell',
    day: 'ods-date__day',
    day_today: 'ods-date__today',
    day_selected: 'ods-date__selected-datepicker',
    day_disabled: 'ods-date__disabled',
  };

  const selectedDay: Date = fromDate;

  const inputPlaceholder = getInputPlaceholder(localeOption);

  return {
    input1Ref,
    input2Ref,
    showDayPicker,
    selectedDay,
    CustomStyles,
    localeOption,
    currentField,
    inputPlaceholder,
    handleDayClick,
    inputChange,
    createHandleToggleClick,
    disabledDays,
    formatDay,
    handleCloseByOutside,
  };
}
