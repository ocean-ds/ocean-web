import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';

type FilledProps = {
  value?: string | number | readonly string[] | undefined;
  defaultValue?: string | number | readonly string[] | undefined;
  onChange?: ChangeEventHandler<unknown> | undefined;
};

type FilledReturn = {
  filled: boolean;
  inputValue: string | number | readonly string[] | undefined;
  handleChange: ChangeEventHandler<unknown>;
};

export default function useInputFilled({
  value,
  defaultValue,
  onChange,
}: FilledProps): FilledReturn {
  const [filled, setFilled] = useState(Boolean(value || defaultValue));
  const [inputValue, setInputValue] = useState(value || defaultValue);

  const handleChange = useCallback(
    (event) => {
      if (onChange) return onChange(event);

      // uncontrolled version
      setFilled(Boolean(event.target.value));
      setInputValue(event.target.value);

      return event;
    },
    [onChange]
  );

  useEffect(() => {
    setFilled(Boolean(value));
  }, [value]);

  useEffect(() => {
    setFilled(Boolean(defaultValue));
  }, [defaultValue]);

  return { inputValue, filled, handleChange };
}
