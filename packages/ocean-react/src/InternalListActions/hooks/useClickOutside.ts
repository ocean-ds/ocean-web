import { useEffect } from 'react';

export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  isOpen: boolean,
  onClickOutside: () => void
): void => {
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, ref, onClickOutside]);
};
