import { useEffect } from 'react';

const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  isOpen: boolean,
  onClickOutside: () => void,
  menuRef?: React.RefObject<HTMLElement>
): void => {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleClickOutside = (event: MouseEvent) => {
      const clickedOutsideElement =
        ref.current && !ref.current.contains(event.target as Node);

      const clickedOutsideMenu = !menuRef?.current?.contains(
        event.target as Node
      );

      if (clickedOutsideElement && clickedOutsideMenu) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, ref, onClickOutside, menuRef]);
};

export default useClickOutside;
