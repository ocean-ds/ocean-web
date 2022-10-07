import React from 'react';
import * as DateFns from 'date-fns';

import ptBr from 'date-fns/locale/pt-BR';

import { ClassNames, DateFormatter } from 'react-day-picker';

import { DatePickerSingleProps } from '../DatePicker/DatePickerSingle';

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
  handleDayClick: (day: Date) => void;
  inputChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
  createHandleToggleClick: (fieldId: string) => void;
  disabledDays: (day: Date) => boolean;
  formatDay: DateFormatter;
  getInputPlaceholder: () => string;
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

  const handleValidateStartsToday = (day: Date) =>
    Boolean(
      startsToday &&
        day < new Date(new Date().setDate(new Date().getDate() - 1))
    );

  const handleDayClick = (day: Date): void => {
    if (!(startsToday && handleValidateStartsToday(day))) {
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
    const startToday = handleValidateStartsToday(day);

    return startToday || (currentField === 'end-date' && day < fromDate);
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

  const formatDay: DateFormatter = (day) => DateFns.format(day, 'd');

  const getInputPlaceholder = (): string =>
    localeOption.code === 'pt-BR' ? 'dd/mm/aaaa' : 'mm/dd/yyyy';

  return {
    input1Ref,
    input2Ref,
    showDayPicker,
    selectedDay,
    CustomStyles,
    localeOption,
    currentField,
    handleDayClick,
    inputChange,
    createHandleToggleClick,
    disabledDays,
    formatDay,
    getInputPlaceholder,
    handleCloseByOutside,
  };
}
