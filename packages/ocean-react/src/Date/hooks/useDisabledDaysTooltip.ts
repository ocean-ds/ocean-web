import React from 'react';
import { isSameDay } from 'date-fns';
import { ActiveModifiers } from 'react-day-picker';

/** Entrada para mensagem de tooltip por data específica */
export type DisabledDayMessageEntry = {
  /** Data do dia bloqueado */
  date: Date;
  /** Mensagem exibida no tooltip para essa data */
  message: string;
};

/**
 * Mensagem exibida ao clicar num dia bloqueado.
 * - `string`: mesma mensagem para todos os dias bloqueados.
 * - `DisabledDayMessageEntry[]`: mensagem específica por data.
 */
export type DisabledDaysMessageProp = string | DisabledDayMessageEntry[];

export type TooltipPosition = {
  /** Distância do topo do container até o visual-bottom do tooltip (com translateY(-100%)) */
  top: number;
  /** Posição horizontal do centro do dia clicado, relativo ao container */
  arrowLeft: number;
} | null;

interface IUseDisabledDaysTooltipReturn {
  showDisabledTooltip: boolean;
  tooltipMessage: string;
  tooltipPosition: TooltipPosition;
  createDayClickHandler: (
    originalHandler: (day: Date) => void
  ) => (day: Date, modifiers: ActiveModifiers) => void;
  handleCalendarClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function useDisabledDaysTooltip(
  disabledDaysMessage?: DisabledDaysMessageProp
): IUseDisabledDaysTooltipReturn {
  const [showDisabledTooltip, setShowDisabledTooltip] = React.useState(false);
  const [tooltipMessage, setTooltipMessage] = React.useState('');
  const [tooltipPosition, setTooltipPosition] =
    React.useState<TooltipPosition>(null);
  const tooltipTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  /**
   * Ref para armazenar o Date do dia desabilitado clicado.
   * É preenchido em createDayClickHandler (que dispara antes do bubble para o container).
   */
  const lastDisabledClickRef = React.useRef<Date | null>(null);

  /** Resolve a mensagem para um determinado dia, conforme o tipo de prop passada */
  const resolveMessage = React.useCallback(
    (day: Date | null): string => {
      if (!disabledDaysMessage) return '';
      if (typeof disabledDaysMessage === 'string') return disabledDaysMessage;
      if (!day) return '';
      const entry = disabledDaysMessage.find((e) => isSameDay(e.date, day));
      return entry?.message ?? '';
    },
    [disabledDaysMessage]
  );

  const handleCalendarClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!disabledDaysMessage) return;

      const target = event.target as HTMLElement;
      const disabledDay = target.closest(
        'button.ods-date__disabled'
      ) as HTMLElement | null;

      if (!disabledDay) return;

      // lastDisabledClickRef foi preenchido pelo createDayClickHandler antes deste bubble
      const message = resolveMessage(lastDisabledClickRef.current);

      // Se não há mensagem para essa data (ex: array sem entry correspondente), não exibe
      if (!message) return;

      const container = event.currentTarget;
      const containerRect = container.getBoundingClientRect();
      const dayRect = disabledDay.getBoundingClientRect();

      const arrowLeft = dayRect.left - containerRect.left + dayRect.width / 2;
      const top = dayRect.top - containerRect.top - 12;

      if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
      setTooltipMessage(message);
      setTooltipPosition({ top, arrowLeft });
      setShowDisabledTooltip(true);
      tooltipTimerRef.current = setTimeout(
        () => setShowDisabledTooltip(false),
        5000
      );
    },
    [disabledDaysMessage, resolveMessage]
  );

  const createDayClickHandler = React.useCallback(
    (originalHandler: (day: Date) => void) =>
      (day: Date, modifiers: ActiveModifiers) => {
        if (modifiers.disabled) {
          // Armazena o dia para que handleCalendarClick consiga resolver a mensagem
          lastDisabledClickRef.current = day;
          return;
        }
        lastDisabledClickRef.current = null;
        setShowDisabledTooltip(false);
        setTooltipPosition(null);
        originalHandler(day);
      },
    []
  );

  React.useEffect(
    () => () => {
      if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
    },
    []
  );

  return {
    showDisabledTooltip,
    tooltipMessage,
    tooltipPosition,
    createDayClickHandler,
    handleCalendarClick,
  };
}

export default useDisabledDaysTooltip;
