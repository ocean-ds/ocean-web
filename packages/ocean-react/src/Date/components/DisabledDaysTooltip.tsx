import React from 'react';
import { TooltipPosition } from '../hooks/useDisabledDaysTooltip';

export type DisabledDaysTooltipProps = {
  /** Mensagem a ser exibida no tooltip */
  message: string;
  /** Controla a visibilidade do tooltip */
  show: boolean;
  /** Posição do tooltip (top e arrowLeft em pixels relativos ao container) */
  position: TooltipPosition;
  /** Test ID para testes */
  testId?: string;
};

const DisabledDaysTooltip: React.FC<DisabledDaysTooltipProps> = ({
  message,
  show,
  position,
  testId = 'datepicker-disabled-tooltip',
}) => {
  if (!show || !position) return null;

  return (
    <div
      className="ods-date__disabled-tooltip"
      role="tooltip"
      data-testid={testId}
      style={{ top: `${position.top}px` }}
    >
      {message}
      <div
        className="ods-date__disabled-tooltip__arrow"
        style={{ left: `${position.arrowLeft}px` }}
      />
    </div>
  );
};

export default DisabledDaysTooltip;
