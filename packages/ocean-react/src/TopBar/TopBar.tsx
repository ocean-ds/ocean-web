import React, { ReactElement } from 'react';
import { SearchOutline } from '@useblu/ocean-icons-react';
import classNames from 'classnames';

interface TopBarProps {
  onSearch?: () => void;
  onBack?: () => void;
  leftIcon: ReactElement;
  title: string;
  description?: string;
  variants?: 'default' | 'extended';
  color?: 'off' | 'on';
  scrollBar?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({
  onBack,
  onSearch,
  leftIcon,
  title,
  description,
  variants = 'default',
  color = 'default',
  scrollBar,
}) => {
  return (
    <div
      className={classNames(
        variants === 'default' ? 'ods-topbar' : 'ods-topbar ods-topbar-extend',
        color === 'on' ? 'ods-topbar-light' : 'ods-topbar-default',
        scrollBar ? 'ods-topbar-scroll-bar' : ''
      )}
    >
      {onBack && leftIcon && (
        <div className="ods-topbar-prev">
          <span onClick={onBack}>{leftIcon}</span>
        </div>
      )}

      {variants === 'default' && (
        <div className="ods-topbar-title">
          {title}
          {description && <span>{description}</span>}
        </div>
      )}

      {onSearch && (
        <div className="ods-topbar-search">
          <SearchOutline onClick={onSearch} />
        </div>
      )}

      {variants === 'extended' && (
        <div className="ods-topbar-title">
          {title}
          {description && <span>{description}</span>}
        </div>
      )}
    </div>
  );
};

export default TopBar;
