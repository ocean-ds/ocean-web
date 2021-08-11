import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';

import FormControl, { FormControlProps } from '../FormControl';

export type TextAreaProps = Omit<FormControlProps, 'children'> &
  React.ComponentPropsWithoutRef<'textarea'>;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      className,
      label,
      helperText,
      blocked,
      error,
      id,
      disabled,
      onChange,
      value,
      defaultValue,
      ...rest
    },
    ref
  ) {
    const [filled, setFilled] = useState(Boolean(value || defaultValue));

    const handleChange = useCallback(
      (event) => {
        if (onChange) return onChange(event);

        // uncontrolled version
        setFilled(Boolean(event.target.value));
      },
      [onChange]
    );

    useEffect(() => {
      setFilled(Boolean(value));
    }, [value]);

    useEffect(() => {
      setFilled(Boolean(defaultValue));
    }, [defaultValue]);

    return (
      <FormControl
        label={label}
        htmlFor={id}
        helperText={helperText}
        error={error}
        blocked={blocked}
        disabled={disabled}
      >
        <textarea
          ref={ref}
          id={id}
          className={classNames(
            'ods-textarea',
            filled && 'ods-textarea--filled',
            error && 'ods-textarea--error',
            className
          )}
          disabled={disabled}
          onChange={handleChange}
          defaultValue={defaultValue}
          value={value}
          {...rest}
        />
      </FormControl>
    );
  }
);

export default TextArea;
