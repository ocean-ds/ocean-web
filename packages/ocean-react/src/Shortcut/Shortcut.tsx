import React from 'react';
import classNames from 'classnames';

type ShortcutSize = 'tiny' | 'small' | 'medium' | 'large';

export interface ShortcutProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  size?: ShortcutSize;
  blocked?: boolean;
}

const Shortcut = ({
  icon,
  label,
  description,
  size = 'medium',
  blocked = false,
}: ShortcutProps): React.ReactElement => (
  <div
    className={classNames(
      'ods-shortcut',
      `ods-shortcut--${size}`,
      blocked && 'ods-shortcut--blocked'
    )}
  >
    <div className="ods-shortcut__icon">{icon}</div>
    <div className="ods-shortcut__content">
      <h5
        className={classNames(
          'ods-shortcut__content__label',
          'ods-typography',
          'ods-typography__heading5'
        )}
      >
        {label}
      </h5>
      {description && (
        <span
          className={classNames(
            'ods-shortcut__content__description',
            'ods-typography',
            'ods-typography__description'
          )}
        >
          {description}
        </span>
      )}
    </div>
  </div>
);

export default Shortcut;
