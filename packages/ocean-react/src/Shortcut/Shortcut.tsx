import React from 'react';
import classNames from 'classnames';
import { LockClosed } from '@useblu/ocean-icons-react';
import Badge from '../Badge';

type ShortcutSize = 'tiny' | 'small' | 'medium';

export type ShortcutProps = {
  icon: React.ReactNode;
  label: string;
  description?: string;
  size?: ShortcutSize;
  blocked?: boolean;
  disabled?: boolean;
  count?: number;
  fullWidth?: boolean;
  orientation?: 'horizontal' | 'vertical';
} & React.ComponentPropsWithoutRef<'div'>;

const Shortcut = ({
  icon,
  label,
  description,
  size = 'medium',
  blocked = false,
  disabled = false,
  fullWidth = false,
  orientation = 'horizontal',
  count,
  ...rest
}: ShortcutProps): React.ReactElement => (
  <div
    className={classNames(
      'ods-shortcut',
      `ods-shortcut--${size}`,
      blocked && 'ods-shortcut--blocked',
      disabled && 'ods-shortcut--disabled',
      fullWidth && 'ods-shortcut--full-width',
      count && 'ods-shortcut--with-badge',
      `ods-shortcut--${orientation}`
    )}
    {...rest}
  >
    {blocked && (
      <div className="ods-shortcut__blocked">
        <LockClosed />
      </div>
    )}
    {count ? (
      <Badge
        className="ods-shortcut__badge"
        variation="small"
        color="alert"
        count={count}
      />
    ) : null}
    <div
      className={classNames(
        'ods-shortcut__content',
        `ods-shortcut__content--${orientation}`
      )}
    >
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
    {size === 'medium' && description && (
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
