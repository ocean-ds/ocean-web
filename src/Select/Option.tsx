import React from 'react';
import classNames from 'classnames';

import './styles/option.scss';

export type RawValue = string | number;

export type OptionProps = {
  value: RawValue;
  label: string;
  className?: string;
  [propName: string]: unknown;
};

const Option: React.FC<OptionProps> = React.memo(function Option({
  value,
  label,
  className,
  ...rest
}) {
  return (
    <li
      role="option"
      className={classNames('ods-select__option', className)}
      {...rest}
    >
      <span>{label}</span>
    </li>
  );
});

export default Option;
