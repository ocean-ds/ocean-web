import React from 'react';
import classNames from 'classnames';

import useInputFilled from '../_util/useInputFilled';
import FormControl, { FormControlProps } from '../FormControl';

export type TextAreaProps = Omit<FormControlProps, 'children'> &
  React.ComponentPropsWithoutRef<'textarea'>;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      label,
      tooltipMessage,
      placeholder,
      helperText,
      error,
      id,
      disabled,
      onChange,
      value,
      defaultValue,
      rows = 4,
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
      <FormControl
        label={label}
        tooltipMessage={tooltipMessage}
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
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          rows={rows}
          {...rest}
        />
      </FormControl>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
