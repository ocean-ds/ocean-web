import React from 'react';
import classNames from 'classnames';

export type TooltipProps = {
  /** Texto do tooltip */
  text: string;
  /** Posição do tooltip */
  position?:
    | 'up'
    | 'down'
    | 'left'
    | 'right'
    | 'up-left'
    | 'up-right'
    | 'down-left'
    | 'down-right';
  /** Tamanho do tooltip */
  length?: 'small' | 'medium' | 'large' | 'xlarge' | 'fit';
  /** Quebra de linha no tooltip */
  break?: boolean;
  /** Remove animações */
  blunt?: boolean;
  /** Desabilita foco */
  noFocus?: boolean;
  /** Elemento filho que receberá o tooltip */
  children: React.ReactElement;
  /** Classes CSS adicionais */
  className?: string;
};

const Tooltip = React.forwardRef<HTMLElement, TooltipProps>(
  (
    {
      text,
      position = 'up',
      length,
      break: breakLines,
      blunt,
      noFocus,
      children,
      className,
    },
    ref
  ) => {
    const tooltipClasses = classNames('ods-tooltip', className);

    const tooltipProps = {
      'aria-label': text,
      'data-tooltip-pos': position,
      'data-tooltip-length': length,
      'data-tooltip-break': breakLines,
      'data-tooltip-blunt': blunt,
      'data-tooltip-nofocus': noFocus,
    };

    return React.cloneElement(children, {
      ref,
      className: classNames(children.props.className, tooltipClasses),
      ...tooltipProps,
    });
  }
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;
