import React from 'react';
import { ActiveModifiers } from 'react-day-picker';

interface IUseDisabledDaysTooltipReturn {
  showDisabledTooltip: boolean;
  createDayClickHandler: (
    originalHandler: (day: Date) => void
  ) => (day: Date, modifiers: ActiveModifiers) => void;
}

export function useDisabledDaysTooltip(
  disabledDaysMessage?: string
): IUseDisabledDaysTooltipReturn {
  const [showDisabledTooltip, setShowDisabledTooltip] = React.useState(false);
  const tooltipTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const handleDisabledDayClick = React.useCallback(() => {
    if (disabledDaysMessage) {
      if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
      setShowDisabledTooltip(true);
      tooltipTimerRef.current = setTimeout(
        () => setShowDisabledTooltip(false),
        4000
      );
    }
  }, [disabledDaysMessage]);

  const handleEnabledDayClick = React.useCallback(() => {
    setShowDisabledTooltip(false);
  }, []);

  const createDayClickHandler = React.useCallback(
    (originalHandler: (day: Date) => void) =>
      (day: Date, modifiers: ActiveModifiers) => {
        if (modifiers.disabled) {
          handleDisabledDayClick();
          return;
        }
        handleEnabledDayClick();
        originalHandler(day);
      },
    [handleDisabledDayClick, handleEnabledDayClick]
  );

  React.useEffect(
    () => () => {
      if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
    },
    []
  );

  return {
    showDisabledTooltip,
    createDayClickHandler,
  };
}

export default useDisabledDaysTooltip;
