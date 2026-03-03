import React from 'react';

export type DisabledDaysTooltipProps = {
  /** Mensagem a ser exibida no tooltip */
  message: string;
  /** Controla a visibilidade do tooltip */
  show: boolean;
  /** Test ID para testes */
  testId?: string;
};

/**
 * Componente reutilizável para exibir tooltip de dias bloqueados no calendário
 */
const DisabledDaysTooltip: React.FC<DisabledDaysTooltipProps> = ({
  message,
  show,
  testId = 'datepicker-disabled-tooltip',
}) => {
  if (!show) return null;

  return (
    <div
      className="ods-date__disabled-tooltip"
      role="tooltip"
      data-testid={testId}
    >
      {message}
    </div>
  );
};

export default DisabledDaysTooltip;
