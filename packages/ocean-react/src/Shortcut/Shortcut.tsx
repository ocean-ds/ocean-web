import React from 'react';
import classNames from 'classnames';
import { LockClosed } from '@useblu/ocean-icons-react';

type ShortcutSize = 'tiny' | 'small' | 'medium' | 'large';

export interface ShortcutProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  size?: ShortcutSize;
  blocked?: boolean;
  disabled?: boolean;
}

const Shortcut = ({
  icon,
  label,
  description,
  size = 'medium',
  blocked = false,
  disabled = false,
}: ShortcutProps): React.ReactElement => (
  <div
    className={classNames(
      'ods-shortcut',
      `ods-shortcut--${size}`,
      blocked && 'ods-shortcut--blocked',
      disabled && 'ods-shortcut--disabled'
    )}
  >
    {blocked && (
      <div className="ods-shortcut__blocked">
        <LockClosed />
      </div>
    )}
    <div className="ods-shortcut__content">
      <div className="ods-shortcut__icon">{icon}</div>
      <h5
        className={classNames(
          'ods-shortcut__label',
          'ods-typography',
          'ods-typography__heading5'
        )}
      >
        {label}
      </h5>
    </div>
    {['medium', 'large'].includes(size) && description && (
      <span
        className={classNames(
          'ods-shortcut__description',
          'ods-typography',
          'ods-typography__description'
        )}
      >
        {description}
      </span>
    )}
  </div>
);

export default Shortcut;
