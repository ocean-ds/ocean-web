import React from 'react';
import classNames from 'classnames';

import { Search as SearchIcon, X } from '@useblu/ocean-icons-react';
import FormControl, { FormControlProps } from '../FormControl';
import useInputFilled from '../_util/useInputFilled';
import IconButton from '../IconButton';

export type SearchInputProps = Omit<FormControlProps, 'children'> &
  React.ComponentPropsWithoutRef<'input'>;

const Search = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
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
  ) => {
    const { filled, handleChange } = useInputFilled({
      defaultValue,
      value,
      onChange,
    });

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
            placeholder={placeholder}
            defaultValue={defaultValue}
            value={value}
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

Search.displayName = 'Search';

export default Search;
