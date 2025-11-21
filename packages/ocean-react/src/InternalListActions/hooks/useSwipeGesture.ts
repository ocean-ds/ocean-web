import { useEffect, useRef } from 'react';
import { SWIPE_THRESHOLD, VERTICAL_TOLERANCE } from '../constants';

const useSwipeGesture = (
  triggerRef: React.RefObject<HTMLButtonElement>,
  isSwipeMode: boolean,
  isOpen: boolean,
  onSwipeLeft: () => void
): void => {
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  useEffect(() => {
    if (!isSwipeMode || !triggerRef.current) {
      return undefined;
    }

    const trigger = triggerRef.current;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartX.current || !touchStartY.current) return;

      const touchEndX = e.touches[0].clientX;
      const touchEndY = e.touches[0].clientY;

      const deltaX = touchStartX.current - touchEndX;
      const deltaY = Math.abs(touchStartY.current - touchEndY);

      // Swipe left (drag from right to left) with minimal vertical movement
      const swipeToLeftGesture =
        deltaX > SWIPE_THRESHOLD && deltaY < VERTICAL_TOLERANCE && !isOpen;

      if (swipeToLeftGesture) {
        // Dispatch a synthetic mousedown event to trigger click outside handlers on other menus
        const mouseDownEvent = new MouseEvent('mousedown', {
          bubbles: true,
          cancelable: true,
          view: globalThis as unknown as Window,
          clientX: touchEndX,
          clientY: touchEndY,
        });
        document.dispatchEvent(mouseDownEvent);

        onSwipeLeft();
        handleTouchEnd();
      }
    };

    const handleTouchEnd = () => {
      touchStartX.current = 0;
      touchStartY.current = 0;
    };

    trigger.addEventListener('touchstart', handleTouchStart);
    trigger.addEventListener('touchmove', handleTouchMove);
    trigger.addEventListener('touchend', handleTouchEnd);

    return () => {
      trigger.removeEventListener('touchstart', handleTouchStart);
      trigger.removeEventListener('touchmove', handleTouchMove);
      trigger.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isSwipeMode, isOpen, triggerRef, onSwipeLeft]);
};

export default useSwipeGesture;
