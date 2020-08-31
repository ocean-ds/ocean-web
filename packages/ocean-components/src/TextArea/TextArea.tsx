import React from 'react';
import classNames from 'classnames';

import './styles/textarea.scss';
import FormControl, { FormControlProps } from '../FormControl/FormControl';

type TextAreaProps = Omit<FormControlProps, 'children'> &
  React.ComponentPropsWithoutRef<'textarea'>;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    { className, label, helperText, blocked, error, id, ...rest },
    ref
  ) {
    return (
      <FormControl
        label={label}
        htmlFor={id}
        helperText={helperText}
        error={error}
        blocked={blocked}
      >
        <textarea
          ref={ref}
          id={id}
          className={classNames(
            'ods-textarea',
            error && 'ods-textarea--error',
            className
          )}
          {...rest}
        />
      </FormControl>
    );
  }
);

export default TextArea;
