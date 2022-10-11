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
    updateCache && setDatePickerCache(updateData);
  };

  const handleDayClick = (day: Date): void => {
    if (!(startsToday && handleValidateStartsToday(startsToday, day))) {
      const formattedDay = DateFns.format(day, localeDateFormat);

      updateState(formattedDay, true);
      closeCalendarDelay();
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

    updateState(dataFormatted, true);

    if (dataFormatted.length === localeDateFormat.length) {
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
    day_selected: 'ods-datepicker__selected-single',
    day_disabled: 'ods-datepicker__disabled',
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
