import React, { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { ActionItem } from '../types';
import DragHandle from './DragHandle';
import MenuItem from './MenuItem';

interface MenuListProps {
  menuRef: React.RefObject<HTMLUListElement>;
  actions: ActionItem[];
  position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  isClosing: boolean;
  isSwipeMode: boolean;
  onActionClick: (action: ActionItem) => void;
  onClose: () => void;
  onDragHandleKeyDown: (e: React.KeyboardEvent) => void;
  triggerElement?: HTMLElement | null;
}

const MenuList: React.FC<MenuListProps> = ({
  menuRef,
  actions,
  position,
  isClosing,
  isSwipeMode,
  onActionClick,
  onClose,
  onDragHandleKeyDown,
  triggerElement,
}) => {
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

  useLayoutEffect(() => {
    if (!isSwipeMode && triggerElement && menuRef.current) {
      const triggerRect = triggerElement.getBoundingClientRect();
      const menuRect = menuRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;

      // Calculate position based on the menu position prop
      if (position.includes('bottom')) {
        top = triggerRect.bottom + window.scrollY;
      } else {
        top = triggerRect.top + window.scrollY - menuRect.height;
      }

      if (position.includes('right')) {
        left = triggerRect.left + window.scrollX;
      } else {
        left = triggerRect.right + window.scrollX - menuRect.width;
      }

      setMenuStyle({
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        zIndex: 9999,
      });
    }
  }, [isSwipeMode, triggerElement, position, menuRef]);

  const handleMenuClick = (e: React.MouseEvent<HTMLUListElement>) => {
    e.stopPropagation();
  };

  const handleMenuKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    // Prevent event propagation for keyboard interactions as well
    if (e.key === 'Enter' || e.key === ' ') {
      e.stopPropagation();
    }
  };

  const menuContent = (
    <ul
      ref={menuRef}
      className={classNames(
        'ods-internal-list-actions__menu',
        `ods-internal-list-actions__menu--${position}`,
        {
          'ods-internal-list-actions__menu--closing': isClosing,
          'ods-internal-list-actions__menu--portal': !isSwipeMode,
        }
      )}
      style={isSwipeMode ? undefined : menuStyle}
      role="menu"
      aria-orientation={isSwipeMode ? "horizontal" : "vertical"}
      tabIndex={-1}
      onClick={handleMenuClick}
      onKeyDown={handleMenuKeyDown}
    >
      {isSwipeMode && (
        <DragHandle onClose={onClose} onKeyDown={onDragHandleKeyDown} />
      )}
      {actions.map((action) => (
        <MenuItem key={action.label} action={action} onClick={onActionClick} />
      ))}
    </ul>
  );

  // Use portal for dropdown menu mode to avoid overflow issues
  // Keep swipe mode inside the component for proper mobile behavior
  if (isSwipeMode || typeof document === 'undefined') {
    return menuContent;
  }

  return createPortal(menuContent, document.body);
};

export default MenuList;
