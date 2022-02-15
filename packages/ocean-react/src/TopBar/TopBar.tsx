import React, { ReactElement } from 'react';
import classNames from 'classnames';

interface TopBarProps {
  onRightAction?: () => void;
  onLeftAction?: () => void;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  title: string;
  description?: string;
  variants?: 'default' | 'extended';
  color?: 'off' | 'on';
  scrollBar?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({
  onLeftAction,
  onRightAction,
  leftIcon,
  rightIcon,
  title,
  description,
  variants = 'default',
  color = 'default',
  scrollBar,
}) => {
  const leftAction = onLeftAction && leftIcon && (
    <div className="ods-topbar-left">
      <span onClick={onLeftAction}>{leftIcon}</span>
    </div>
  );

  const rightAction = onRightAction && rightIcon && (
    <div className="ods-topbar-right">
      <span onClick={onRightAction}>{rightIcon}</span>
    </div>
  );

  return (
    <div
      className={classNames(
        variants === 'default' ? 'ods-topbar' : 'ods-topbar ods-topbar-extend',
        color === 'on' ? 'ods-topbar-light' : 'ods-topbar-default',
        scrollBar ? 'ods-topbar-scroll-bar' : ''
      )}
    >
      {variants === 'default' && (
        <>
          {leftAction}
          <div className="ods-topbar-title">
            {title}
            {description && <span>{description}</span>}
          </div>
          {rightAction}
        </>
      )}

      {variants === 'extended' && (
        <>
          <div className="ods-topbar-actions">
            {leftAction}
            {rightAction}
          </div>
          <div className="ods-topbar-title">
            {title}
            {description && <span>{description}</span>}
          </div>
        </>
      )}
    </div>
  );
};

export default TopBar;
