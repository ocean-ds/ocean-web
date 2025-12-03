import React from 'react';
import classNames from 'classnames';

export type RadioProps = {
  /**
   * The label content.
   */
  label?: React.ReactNode;
  /**
   * If `true`, the input will be displayed in an error state.
   * @default false
   */
  error?: boolean;
} & React.ComponentPropsWithoutRef<'input'>;

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, id, error, ...rest }, ref) => (
    <label className="ods-radio__root" htmlFor={id}>
      <input
        ref={ref}
        id={id}
        className={classNames('ods-radio', className)}
        {...rest}
        type="radio"
      />
      <span
        className={classNames(
          'ods-radio__checkmark',
          error && 'ods-radio__checkmark--error'
        )}
      />
      {label && (
        <span className="ods-typography ods-typography__description ods-radio__label">
          {label}
        </span>
      )}
    </label>
  )
);

Radio.displayName = 'Radio';

export default Radio;
