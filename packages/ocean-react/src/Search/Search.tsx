import React from 'react';
import classNames from 'classnames';

import FormControl, { FormControlProps } from '../FormControl';
import useInputFilled from '../_util/useInputFilled';
import IconButton from '../IconButton';
import { Search as SearchIcon, X } from '@useblu/ocean-icons-react';

export type SearchInputProps = Omit<FormControlProps, 'children'> &
  React.ComponentPropsWithoutRef<'input'>;

const Search = React.forwardRef<HTMLInputElement, SearchInputProps>(
  function Input(
    {
      className,
      id,
      disabled,
      value,
      defaultValue,
      placeholder,
      onChange,
      ...rest
    },
    ref
  ) {
    const { inputValue, filled, handleChange } = useInputFilled({
      defaultValue,
      value,
      onChange,
    });

    console.log('defaultValue', defaultValue, filled);

    return (
      <FormControl htmlFor={id} disabled={disabled}>
        <div
          className={classNames(
            'ods-search',
            filled && 'ods-search--filled',
            disabled && 'ods-search--disabled',
            className
          )}
        >
          <div className="ods-search__adornment">
            <SearchIcon />
          </div>

          <input
            ref={ref}
            type="text"
            id={id}
            disabled={disabled}
            onChange={handleChange}
            placeholder={defaultValue ? defaultValue.toString() : placeholder}
            value={inputValue || ''}
            {...rest}
          />

          {filled && (
            <IconButton
              data-testid="close"
              onClick={() => {
                const e = {
                  target: { value: '' },
                };

                handleChange(e as React.ChangeEvent<HTMLInputElement>);
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
