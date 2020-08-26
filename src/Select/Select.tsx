import React from 'react';
import ReactSelect, { OptionTypeBase, Props } from 'react-select';

type SelectProps = {
  /**
   * Placeholder text for the select value
   * @default 'Selecione uma opção'
   */
  placeholder?: React.ReactNode;
} & Props<OptionTypeBase>;

const Select: React.FC<SelectProps> = ({
  placeholder = 'Selecione uma opção',
  ...rest
}) => (
  <ReactSelect
    classNamePrefix="ods-select"
    placeholder={placeholder}
    isSearchable={false}
    {...rest}
  />
);

export default Select;
