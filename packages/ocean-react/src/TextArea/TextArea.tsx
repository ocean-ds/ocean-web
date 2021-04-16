import React from 'react';
import classNames from 'classnames';

import FormControl, { FormControlProps } from '../FormControl';

type TextAreaProps = Omit<FormControlProps, 'children'> &
  React.ComponentPropsWithoutRef<'textarea'>;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    { className, label, helperText, blocked, error, id, disabled, ...rest },
    ref
  ) {
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
            error && 'ods-textarea--error',
            className
          )}
          disabled={disabled}
          {...rest}
        />
      </FormControl>
    );
  }
);

export default TextArea;
