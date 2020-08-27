import React from 'react';
import ReactSelect, { OptionTypeBase, Props } from 'react-select';

import FormControl, { FormControlProps } from '../FormControl/FormControl';

type SelectProps = {
  /**
   * Placeholder text for the select value
   * @default 'Selecione uma opção'
   */
  placeholder?: React.ReactNode;
} & Omit<FormControlProps, 'children'> &
  Props<OptionTypeBase>;

const Select: React.FC<SelectProps> = ({
  placeholder = 'Selecione uma opção',
  label,
  id,
  helperText,
  error,
  blocked,
  ...rest
}) => (
  <FormControl
    label={label}
    htmlFor={id}
    helperText={helperText}
    error={error}
    blocked={blocked}
  >
    <ReactSelect
      classNamePrefix="ods-select"
      placeholder={placeholder}
      isSearchable={false}
      inputId={id}
      {...rest}
    />
  </FormControl>
);

export default Select;
