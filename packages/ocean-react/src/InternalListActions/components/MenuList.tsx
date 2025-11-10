import React from 'react';
import classNames from 'classnames';
import { ActionItem } from '../types';
import DragHandle from './DragHandle';
import MenuItem from './MenuItem';

interface MenuListProps {
  actions: ActionItem[];
  position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  isClosing: boolean;
  isMobile: boolean;
  onActionClick: (action: ActionItem) => void;
  onClose: () => void;
  onDragHandleKeyDown: (e: React.KeyboardEvent) => void;
}

const MenuList: React.FC<MenuListProps> = ({
  actions,
  position,
  isClosing,
  isMobile,
  onActionClick,
  onClose,
  onDragHandleKeyDown,
}) => (
  <ul
    className={classNames(
      'ods-internal-list-actions__menu',
      `ods-internal-list-actions__menu--${position}`,
      {
        'ods-internal-list-actions__menu--closing': isClosing,
      }
    )}
    role="menu"
  >
    {isMobile && (
      <DragHandle onClose={onClose} onKeyDown={onDragHandleKeyDown} />
    )}
    {actions.map((action) => (
      <MenuItem key={action.label} action={action} onClick={onActionClick} />
    ))}
  </ul>
);

export default MenuList;
