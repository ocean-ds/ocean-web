import React, { useCallback } from 'react';
import classNames from 'classnames';

import { PlusOutline, MinusSm } from '@useblu/ocean-icons-react';

import IconButton from '../IconButton';

import useInputFilled from '../_util/useInputFilled';
import FormControl, { FormControlProps } from '../FormControl';

export type StepperProps = {
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
} & Omit<FormControlProps, 'children'> &
  React.ComponentPropsWithoutRef<'input'>;

const Stepper = React.forwardRef<HTMLInputElement, StepperProps>(
  function Stepper(
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
      min = 0,
      max,
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

    const deduceFromAmount = () => {
      if (disabled) return;

      setAmout((a: number) => {
        if (a > min) return a - 1;

        return a;
      });
    };

    const addToAmount = () => {
      if (disabled) return;

      if (!max) return;

      setAmout((a: number) => {
        if (a < max) return a + 1;

        return a;
      });
    };

    const handleListboxKeyDown = useCallback((event: React.KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          deduceFromAmount();
          break;
        case 'ArrowUp':
          event.preventDefault();
          addToAmount();
          break;
        default:
          return;
      }
    }, []);

    return (
      <FormControl
        label={label}
        htmlFor={id}
        helperText={helperText}
        error={error}
        disabled={disabled}
      >
        <div
          className={classNames(
            'ods-input',
            'ods-input--amount',
            filled && 'ods-input--filled',
            disabled && 'ods-input--disabled',
            error && 'ods-input--error',
            className
          )}
        >
          <div className="ods-input--amount__stepper-controls ods-input--amount__stepper-controls_minus">
            <IconButton
              size="sm"
              disabled={amount <= min || disabled}
              onClick={deduceFromAmount}
            >
              <MinusSm size={24} />
            </IconButton>
          </div>

          <input
            ref={ref}
            type="stepper"
            id={id}
            disabled={disabled}
            onKeyDown={handleListboxKeyDown}
            onChange={(e) => {
              handleChange(e);

              if (!e.target) return;

              const inputedValue = parseFloat(e.target.value);

              if (max && inputedValue > max) return;

              if (inputedValue > min) setAmout(inputedValue);
            }}
            defaultValue={defaultValue}
            value={amount}
            {...rest}
          />
          {
            <div className="ods-input--amount__stepper-controls ods-input--amount__stepper-controls_plus">
              <IconButton
                size="sm"
                disabled={disabled || !max || amount >= max}
                onClick={addToAmount}
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
