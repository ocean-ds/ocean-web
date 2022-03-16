import React, { useState } from 'react';
import classNames from 'classnames';

import FormControl, { FormControlProps } from '../FormControl';
import IconButton from '../IconButton';
import { Search as Searchicon, X } from '@useblu/ocean-icons-react';

export type SearchInputProps = Omit<FormControlProps, 'children'> &
  React.ComponentPropsWithoutRef<'input'>;

const Search = React.forwardRef<HTMLInputElement, SearchInputProps>(
  function Input(
    { className, id, disabled, value, defaultValue, onChange, ...rest },
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
            onChange={(e) => {
              setInputValue(e.target.value);
              if (onChange) onChange(e);
            }}
            value={inputValue}
            {...rest}
          />

          {inputValue && (
            <IconButton
              data-testid="close"
              onClick={() => {
                setInputValue('');
                const e = {
                  target: { value: '' },
                };

                if (onChange)
                  onChange(e as React.ChangeEvent<HTMLInputElement>);
              }}
              className="ods-search__clean"
              size="sm"
            >
              <X />
            </IconButton>
          )}
        </div>
      </FormControl>
    );
  }
);

export default Search;
