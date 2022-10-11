import React from 'react';

import { Locale } from 'date-fns';

export type DatePickerFields = {
  from: string;
  to: string;
};

export type DatePickerProps = {
  /**
   * Determines names of inputs (from/to)
   */
  labels?: DatePickerFields;

  /**
   * Determines values of inputs (from/to)
   * @requires
   */
  values: DatePickerFields;

  /**
   * Determines the function to change fields (from/to)
   * @requires
   */
  onSelect: (dates: DatePickerFields) => void;

  /**
   * Determines if date inputs are editable
   * @default false
   */
  editable?: boolean;

  /**
   * Determines if date inputs are disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Determines error os inputs
   * @default false
   */
  error?: boolean;

  /**
   * Determines error message
   * @default null
   */
  helperText?: string;

  /**
   * Determines if date seleting starts today
   * @default false
   */
  startsToday?: boolean;

  /**
   * Object locale of date-fns locale package (internationalize)
   * @default ptBr
   */
  locale?: Locale;

  /**
   * ClassName to overwrite default style
   * @default null
   */
  className?: string;
} & React.ComponentPropsWithoutRef<'div'>;
