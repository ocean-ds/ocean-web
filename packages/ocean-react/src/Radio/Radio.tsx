import React from 'react';
import classNames from 'classnames';

export type RadioProps = {
  /**
   * The label content.
   */
  label?: React.ReactNode;
  error?: boolean;
  errorMessage?: string;
} & React.ComponentPropsWithoutRef<'input'>;

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, id, error, errorMessage, ...rest }, ref) => (
    <div className="ods-radio__root-container">
      <label className="ods-radio__root" htmlFor={id}>
        <input
          ref={ref}
          id={id}
          className={classNames('ods-radio', className)}
          {...rest}
          type="radio"
        />
        <span
          className={classNames('ods-radio__checkmark', {
            'ods-radio__checkmark--error': error,
          })}
        />
        {label && (
          <span className="ods-typography ods-typography__description ods-radio__label">
            {label}
          </span>
        )}
      </label>
      {error && errorMessage && (
        <span className="ods-radio__error-message">
          {errorMessage}
        </span>
      )}
    </div>
  )
);

Radio.displayName = 'Radio';

export default Radio;
