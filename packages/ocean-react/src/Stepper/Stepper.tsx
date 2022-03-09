import React from 'react';
import classNames from 'classnames';

import { PlusOutline, MinusSm } from '@useblu/ocean-icons-react';

import IconButton from '../IconButton';

import useInputFilled from '../_util/useInputFilled';
import FormControl, { FormControlProps } from '../FormControl';

export type StepperProps = {
  /**
   *
   * The position of adornment
   * @default 'right'
   */
  position?: 'right' | 'left';

  /**
   *
   * The minimun value accepted
   * @default 0
   */
  min?: number;

  /**
   *
   * The maximum value accepted
   */
  max?: number;

  /**
   * Sets a custon adornment to be iside of the `input` element.
   */
  adornment?: React.ReactElement;
} & Omit<FormControlProps, 'children'> &
  React.ComponentPropsWithoutRef<'input'>;

const Stepper = React.forwardRef<HTMLInputElement, StepperProps>(
  function Stepper(
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
      adornment,
      defaultValue,
      min = 0,
      max,
      position,
      ...rest
    },
    ref
  ) {
    const { filled, handleChange } = useInputFilled({
      defaultValue,
      value,
      onChange,
    });

    const [amount, setAmout] = React.useState<number>(
      typeof value === 'number' ? value : 0
    );

    return (
      <FormControl
        label={label}
        htmlFor={id}
        helperText={helperText}
        error={error}
        blocked={blocked}
        disabled={disabled}
      >
        <div
          className={classNames(
            'ods-input',
            'ods-input--amount',
            filled && 'ods-input--filled',
            disabled && 'ods-input--disabled',
            error && 'ods-input--error',
            position === 'left' && 'ods-input--left',
            adornment && !filled ? 'ods-input--disabled--text' : '',
            className
          )}
        >
          <div className="ods-input__number-controls ods-input__number-controls_minus">
            <IconButton
              size="sm"
              disabled={amount <= min}
              onClick={() => {
                if (amount > min) setAmout((a) => a - 1);
              }}
            >
              <MinusSm size={24} />
            </IconButton>
          </div>

          <input
            ref={ref}
            type="number"
            id={id}
            disabled={disabled}
            onChange={(e) => {
              handleChange(e);
              if (e.target) setAmout(parseFloat(e.target.value));
            }}
            defaultValue={defaultValue}
            value={amount}
            {...rest}
          />
          {
            <div className="ods-input__number-controls ods-input__number-controls_plus">
              <IconButton
                size="sm"
                disabled={max ? amount >= max : false}
                onClick={() => {
                  if (max ? amount < max : true) setAmout((a) => a + 1);
                }}
              >
                <PlusOutline size={24} />
              </IconButton>
            </div>
          }
        </div>
      </FormControl>
    );
  }
);

export default Stepper;
