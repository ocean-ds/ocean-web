import React, { useRef } from 'react';

interface DragHandleProps {
  onClose: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const SWIPE_THRESHOLD = 50;
const VERTICAL_TOLERANCE = 30;

const DragHandle: React.FC<DragHandleProps> = ({ onClose, onKeyDown }) => {
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX.current || !touchStartY.current) return;

    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;

    const deltaX = touchEndX - touchStartX.current;
    const deltaY = Math.abs(touchStartY.current - touchEndY);

    // Swipe right (drag from left to right) to close
    if (deltaX > SWIPE_THRESHOLD && deltaY < VERTICAL_TOLERANCE) {
      onClose();
      touchStartX.current = 0;
      touchStartY.current = 0;
    }
  };

  const handleTouchEnd = () => {
    touchStartX.current = 0;
    touchStartY.current = 0;
  };

  return (
    <li className="ods-internal-list-actions__drag-handle">
      <button
        type="button"
        className="ods-internal-list-actions__drag-handle-button"
        onClick={onClose}
        onKeyDown={onKeyDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
      </button>
    </li>
  );
};

export default DragHandle;
