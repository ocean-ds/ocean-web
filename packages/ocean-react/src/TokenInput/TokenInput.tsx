import React, { memo, useState, useCallback } from 'react';
import classNames from 'classnames';
import DigitInput from './DigitInput';
import FormControl from '../FormControl';

export interface TokenInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  autoFocus?: boolean;
  digitsQuantity: number;
  onChangeToken(value: string): void;
  className?: string;
  disabled?: boolean;
  label?: string;
  tooltipMessage?: string;
  htmlFor?: string;
}

const TokenInput: React.FC<TokenInputProps> = memo(
  ({
    onChangeToken,
    errorMessage,
    className,
    disabled,
    label,
    tooltipMessage,
    htmlFor,
    autoFocus = true,
    error = false,
    digitsQuantity = 4,
    ...rest
  }) => {
    const [activeInput, setActiveInput] = useState<number>(0);
    const [tokenValues, setTokenValues] = useState<string[]>(
      Array(digitsQuantity).fill('')
    );

    const generateRandomKey = () => {
      const array = new Uint8Array(16);
      window.crypto.getRandomValues(array);
      return Array.from(array, (byte) =>
        byte.toString(16).padStart(2, '0')
      ).join('');
    };

    const handleTokenChange = useCallback(
      (code: string[]) => {
        const tokenValue = code.join('');
        onChangeToken(tokenValue);
      },
      [onChangeToken]
    );

    const changeCodeAtFocus = useCallback(
      (code: string) => {
        const updatedTokenValues = [...tokenValues];
        updatedTokenValues[activeInput] = code[0] || '';
        setTokenValues(updatedTokenValues);
        handleTokenChange(updatedTokenValues);
      },
      [activeInput, handleTokenChange, tokenValues]
    );

    const focusInput = useCallback(
      (inputIndex: number) => {
        const selectedIndex = Math.max(
          Math.min(digitsQuantity - 1, inputIndex),
          0
        );
        setActiveInput(selectedIndex);
      },
      [digitsQuantity]
    );

    const focusPrevInput = useCallback(() => {
      focusInput(activeInput - 1);
    }, [activeInput, focusInput]);

    const focusNextInput = useCallback(() => {
      focusInput(activeInput + 1);
    }, [activeInput, focusInput]);

    const handleOnFocus = useCallback(
      (index: number) => () => {
        focusInput(index);
      },
      [focusInput]
    );

    const handleOnChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentValue = event.currentTarget.value;
        if (!currentValue) {
          event.preventDefault();
          return;
        }
        changeCodeAtFocus(currentValue);
        focusNextInput();
      },
      [changeCodeAtFocus, focusNextInput]
    );

    const handleOnPaste = useCallback(
      (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        const pastedText = event.clipboardData
          .getData('text/plain')
          .trim()
          .slice(0, digitsQuantity - activeInput)
          .split('');
        if (pastedText) {
          let nextFocusIndex = 0;
          const updatedTokenValues = [...tokenValues];
          updatedTokenValues.forEach((values, index) => {
            if (index >= activeInput) {
              const changedValue = pastedText.shift() || values;
              if (changedValue) {
                updatedTokenValues[index] = changedValue;
                nextFocusIndex = index;
              }
            }
          });
          setTokenValues(updatedTokenValues);
          setActiveInput(Math.min(nextFocusIndex + 1, digitsQuantity - 1));
          onChangeToken(updatedTokenValues.join(''));
        }
      },
      [activeInput, digitsQuantity, tokenValues, onChangeToken]
    );

    const handleOnKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        const pressedKey = event.key;
        if (pressedKey === 'Backspace') {
          event.preventDefault();
          if (tokenValues[activeInput]) {
            changeCodeAtFocus('');
          } else {
            focusPrevInput();
          }
        }
      },
      [activeInput, changeCodeAtFocus, focusPrevInput, tokenValues]
    );

    return (
      <FormControl
        disabled={disabled}
        error={error}
        helperText={errorMessage && error ? errorMessage : ''}
        label={label}
        tooltipMessage={tooltipMessage}
        htmlFor={htmlFor}
      >
        <div className={classNames(className, 'ods-token-input')}>
          {Array(digitsQuantity)
            .fill('')
            .map((_, index) => (
              <div
                className={classNames('ods-token-input__input', {
                  'ods-token-input--error': error,
                  'ods-token-input--disabled': disabled,
                })}
                key={generateRandomKey()}
              >
                <DigitInput
                  {...rest}
                  focus={activeInput === index}
                  value={tokenValues && tokenValues[index]}
                  autoFocus={autoFocus}
                  onFocus={handleOnFocus(index)}
                  onChange={handleOnChange}
                  onKeyDown={handleOnKeyDown}
                  onPaste={handleOnPaste}
                  disabled={disabled}
                />
              </div>
            ))}
        </div>
      </FormControl>
    );
  }
);

TokenInput.displayName = 'TokenInput';

export default TokenInput;
