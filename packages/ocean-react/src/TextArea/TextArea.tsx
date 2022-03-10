import React from 'react';
import classNames from 'classnames';

import useInputFilled from '../_util/useInputFilled';
import FormControl, { FormControlProps } from '../FormControl';

export type TextAreaProps = Omit<FormControlProps, 'children'> &
  React.ComponentPropsWithoutRef<'textarea'>;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      className,
      label,
      helperText,
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
    const { filled, handleChange } = useInputFilled({
      defaultValue,
      value,
      onChange,
    });

    return (
      <FormControl
        label={label}
        htmlFor={id}
        helperText={helperText}
        error={error}
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
