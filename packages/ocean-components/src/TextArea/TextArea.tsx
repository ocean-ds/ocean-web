import React from 'react';
import classNames from 'classnames';

import './styles/textarea.scss';

type TextAreaProps = {
  /**
   * The label content.
   */
  label?: React.ReactNode;
  /**
   * If `true`, the label will be displayed in an error state.
   * @default false
   */
  error?: boolean;
  /**
   * The helper text content.
   */
  helperText?: React.ReactNode;
  /**
   * Spans the full width of the TextArea parent.
   * @default false
   */
  blocked?: boolean;
} & React.ComponentPropsWithoutRef<'textarea'>;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    { className, label, helperText, blocked, error, id, ...rest },
    ref
  ) {
    return (
      <div className="ods-textarea__root">
        {label && (
          <label className="ods-textarea__label" htmlFor={id}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={classNames(
            'ods-textarea',
            blocked && 'ods-textarea--blocked',
            error && 'ods-textarea--error',
            className
          )}
          {...rest}
        />
        {helperText && (
          <p
            className={classNames(
              'ods-textarea__helper-text',
              error && 'ods-textarea__helper-text--error'
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

export default TextArea;
