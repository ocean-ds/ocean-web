import React from 'react';
import classNames from 'classnames';
import { DotsVertical } from '@useblu/ocean-icons-react';

interface TriggerButtonProps {
  triggerRef: React.RefObject<HTMLButtonElement>;
  disabled: boolean;
  isOpen: boolean;
  isMobile: boolean;
  onClick: () => void;
}

const TriggerButton: React.FC<TriggerButtonProps> = ({
  triggerRef,
  disabled,
  isOpen,
  isMobile,
  onClick,
}) => (
  <button
    ref={triggerRef}
    type="button"
    disabled={disabled}
    className={classNames('ods-internal-list-actions__trigger', {
      'ods-internal-list-actions__trigger--active': isOpen,
    })}
    onClick={onClick}
    aria-label="Abrir menu de ações"
    aria-expanded={isOpen}
  >
    {isMobile ? (
      <svg
        width="5"
        height="24"
        viewBox="0 0 5 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0.5" y1="0.5" x2="0.499999" y2="23.5" stroke="currentColor" strokeLinecap="round" />
        <line x1="4.5" y1="0.5" x2="4.5" y2="23.5" stroke="currentColor" strokeLinecap="round" />
      </svg>
    ) : (
      <DotsVertical />
    )}
  </button>
);

export default TriggerButton;
