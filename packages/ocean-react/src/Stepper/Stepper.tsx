import React, { useCallback } from 'react';
import classNames from 'classnames';
import { isNaN } from 'lodash';

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

    React.useEffect(() => {
      if (typeof amount !== 'undefined' && onChange)
        onChange({
          target: {
            value: `${amount}`,
          },
          // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } as any);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [amount]);

    const deduceFromAmount = useCallback(() => {
      if (disabled) return;

      setAmout((a: number) => {
        if (a > min) return a - 1;

        return a;
      });
    }, [min, disabled]);

    const addToAmount = useCallback(() => {
      if (disabled) return;

      setAmout((a: number) => {
        if (!max) return a + 1;

        if (a < max) return a + 1;

        return a;
      });
    }, [max, disabled]);

    const handleListboxKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
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
      },
      [addToAmount, deduceFromAmount]
    );

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
          <div className="ods-input--root">
            <div className="ods-input--amount__stepper-controls ods-input--amount__stepper-controls_minus">
              <IconButton
                size="sm"
                disabled={amount <= min || disabled}
                type="button"
                onClick={deduceFromAmount}
              >
                <MinusSm size={24} />
              </IconButton>
            </div>

            <input
              ref={ref}
              type="text"
              id={id}
              disabled={disabled}
              onKeyDown={handleListboxKeyDown}
              onChange={(e) => {
                handleChange(e);

                const { target } = e;

                const inputedValue = parseFloat(target.value);

                if (!isNaN(inputedValue)) setAmout(inputedValue);
              }}
              defaultValue={defaultValue}
              value={amount}
              {...rest}
            />
            {
              <div className="ods-input--amount__stepper-controls ods-input--amount__stepper-controls_plus">
                <IconButton
                  size="sm"
                  disabled={
                    disabled || (typeof max !== 'undefined' && amount >= max)
                  }
                  type="button"
                  onClick={addToAmount}
                >
                  <PlusOutline size={24} />
                </IconButton>
              </div>
            }
          </div>
        </div>
      </FormControl>
    );
  }
);

export default Stepper;
