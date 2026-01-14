import React, { useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { XOutline } from '@useblu/ocean-icons-react';
import { useId } from '@reach/auto-id';

export type TooltipPosition =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'up-left'
  | 'up-right'
  | 'down-left'
  | 'down-right'
  | 'left-top'
  | 'left-bottom'
  | 'right-top'
  | 'right-bottom';

export type TooltipProps = {
  /** Texto do tooltip */
  text: string;
  /** Posição do tooltip */
  position?: TooltipPosition;
  /** Tamanho do tooltip */
  length?: 'small' | 'medium' | 'large' | 'xlarge' | 'fit';
  /** Quebra de linha no tooltip */
  break?: boolean;
  /** Remove animações */
  blunt?: boolean;
  /** Desabilita foco */
  noFocus?: boolean;
  /** Exibe botão de fechar */
  closeButton?: boolean;
  /** Callback quando o tooltip é fechado pelo botão */
  onClose?: () => void;
  /** Controla a visibilidade do tooltip externamente */
  visible?: boolean;
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
      closeButton = false,
      onClose,
      visible,
      children,
      className,
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const tooltipId = useId() || 'tooltip';

    const controlledVisible = visible !== undefined ? visible : isVisible;

    const handleClose = useCallback(() => {
      setIsVisible(false);
      onClose?.();
    }, [onClose]);

    const handleMouseEnter = useCallback(() => {
      if (visible === undefined) {
        setIsVisible(true);
      }
    }, [visible]);

    const handleMouseLeave = useCallback(() => {
      if (visible === undefined && !closeButton) {
        setIsVisible(false);
      }
    }, [visible, closeButton]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Escape' && controlledVisible) {
          handleClose();
        }
      },
      [controlledVisible, handleClose]
    );

    // Sync controlled visibility
    useEffect(() => {
      if (visible !== undefined) {
        setIsVisible(visible);
      }
    }, [visible]);

    // Close on Escape key (global listener for controlled mode)
    useEffect(() => {
      if (!closeButton || !controlledVisible) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [closeButton, controlledVisible, handleClose]);

    if (closeButton) {
      return (
        <div
          className={classNames(
            'ods-tooltip-wrapper',
            `ods-tooltip-wrapper--${position}`,
            className
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onKeyDown={handleKeyDown}
        >
          {React.cloneElement(children, {
            ref,
            'aria-describedby': controlledVisible ? tooltipId : undefined,
          })}
          <div
            id={tooltipId}
            className={classNames(
              'ods-tooltip-content',
              `ods-tooltip-content--${position}`,
              {
                'ods-tooltip-content--visible': controlledVisible,
                'ods-tooltip-content--blunt': blunt,
                [`ods-tooltip-content--${length}`]: length,
                'ods-tooltip-content--break': breakLines,
              }
            )}
            role="tooltip"
            aria-hidden={!controlledVisible}
          >
            <span className="ods-tooltip-content__text">{text}</span>
            <button
              type="button"
              className="ods-tooltip-content__close"
              onClick={handleClose}
              aria-label="Fechar tooltip"
            >
              <XOutline size={16} />
            </button>
          </div>
          <span
            className={classNames(
              'ods-tooltip-arrow',
              `ods-tooltip-arrow--${position}`,
              {
                'ods-tooltip-arrow--visible': controlledVisible,
                'ods-tooltip-arrow--blunt': blunt,
              }
            )}
            aria-hidden="true"
          />
        </div>
      );
    }

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
