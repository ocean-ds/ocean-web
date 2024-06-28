import React, { memo, useLayoutEffect, useRef } from 'react';
import { usePrevious } from 'react-use';

interface DigitInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  autoFocus: boolean;
  focus?: boolean;
}
const DigitInput = memo(({ focus, autoFocus, ...rest }: DigitInputProps) => {
  const inputRef: React.RefObject<HTMLInputElement> = useRef(null);
  const prevFocus = usePrevious(!!focus);

  useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus();
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [autoFocus, focus, prevFocus]);

  return <input data-testid="token-input-test" ref={inputRef} {...rest} />;
});

DigitInput.displayName = 'DigitInput';

export default DigitInput;
