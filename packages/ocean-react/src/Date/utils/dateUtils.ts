import { format, Locale } from 'date-fns';

import { DateFormatter } from 'react-day-picker';

export const handleValidateStartsToday = (
  startsToday: boolean | undefined,
  day: Date
): boolean =>
  Boolean(
    startsToday && day < new Date(new Date().setDate(new Date().getDate() - 1))
  );

export const dateMask = (value: string): string => {
  const v = value.replace(/\D/g, '').slice(0, 10);

  if (v.length >= 5) return `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
  if (v.length >= 3) return `${v.slice(0, 2)}/${v.slice(2)}`;

  return v;
};

export const formatDay: DateFormatter = (day) => format(day, 'd');

export const getInputPlaceholder = (localeOption: Locale): string =>
  localeOption.code === 'pt-BR' ? 'dd/mm/aaaa' : 'mm/dd/yyyy';
