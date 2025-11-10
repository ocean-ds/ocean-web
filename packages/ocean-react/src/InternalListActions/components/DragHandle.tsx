import React from 'react';

interface DragHandleProps {
  onClose: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const DragHandle: React.FC<DragHandleProps> = ({ onClose, onKeyDown }) => (
  <li
    className="ods-internal-list-actions__drag-handle"
    onClick={onClose}
    onKeyDown={onKeyDown}
    /* eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role */
    role="button"
    tabIndex={0}
    aria-label="Fechar menu"
  >
    <svg
      width="5"
      height="24"
      viewBox="0 0 5 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ods-internal-list-actions__drag-handle-icon"
    >
      <line x1="0.5" y1="0.5" x2="0.499999" y2="23.5" stroke="#CED1E1" strokeLinecap="round" />
      <line x1="4.5" y1="0.5" x2="4.5" y2="23.5" stroke="#CED1E1" strokeLinecap="round" />
    </svg>
  </li>
);

export default DragHandle;
