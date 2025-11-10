import React from 'react';
import classNames from 'classnames';
import { ActionItem } from '../types';

interface MenuItemProps {
  action: ActionItem;
  onClick: (action: ActionItem) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ action, onClick }) => (
  <li role="none">
    <button
      type="button"
      className={classNames(
        'ods-internal-list-actions__menu-item',
        {
          'ods-internal-list-actions__menu-item--disabled': action.disabled,
        },
        action.variant &&
        `ods-internal-list-actions__menu-item--${action.variant}`
      )}
      onClick={() => onClick(action)}
      disabled={action.disabled}
      role="menuitem"
    >
      {action.icon && (
        <span className="ods-internal-list-actions__menu-item-icon">
          {action.icon}
        </span>
      )}
      <span className="ods-internal-list-actions__menu-item-label">
        {action.label}
      </span>
    </button>
  </li>
);

export default MenuItem;
