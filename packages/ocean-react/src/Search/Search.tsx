import React, { useState } from 'react';
import classNames from 'classnames';

import FormControl, { FormControlProps } from '../FormControl';
import { Search as Searchicon, X } from '@useblu/ocean-icons-react';

export type InputProps = Omit<FormControlProps, 'children'> &
  React.ComponentPropsWithoutRef<'input'>;

const Search = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, id, disabled, value, defaultValue, ...rest },
  ref
) {
  const [inputValue, setInputValue] = useState(defaultValue || value);

  return (
    <FormControl htmlFor={id} disabled={disabled}>
      <div
        className={classNames(
          'ods-search',
          inputValue && 'ods-search--filled',
          disabled && 'ods-search--disabled',
          className
        )}
      >
        <div className="ods-search__adornment">
          <Searchicon />
        </div>

        <input
          ref={ref}
          type="text"
          id={id}
          disabled={disabled}
          onChange={({ target }) => setInputValue(target.value)}
          value={inputValue}
          {...rest}
        />

        <div
          data-testid="close"
          onClick={() => setInputValue('')}
          className="ods-search__clean"
        >
          {inputValue && <X />}
        </div>
      </div>
    </FormControl>
  );
});

export default Search;
