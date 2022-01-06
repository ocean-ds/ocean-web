import React from 'react';
import { ArrowLeftOutline, SearchOutline } from '@useblu/ocean-icons-react';
import classNames from 'classnames';

interface TopBarProps {
  onSearch?: () => void;
  onBack?: () => void;
  title: string;
  description?: string;
  variants?: 'default' | 'extended';
  color?: 'light' | 'default';
}

const TopBar: React.FC<TopBarProps> = ({
  onBack,
  onSearch,
  title,
  description,
  variants = 'default',
  color = 'default',
}) => {
  return (
    <div
      className={classNames(
        variants === 'default' ? 'ods-topbar' : 'ods-topbar ods-topbar-extend',
        color === 'light' ? 'ods-topbar-light' : 'ods-topbar-default'
      )}
    >
      {onBack && (
        <div className="ods-topbar-prev">
          <ArrowLeftOutline onClick={onBack} />
        </div>
      )}

      {variants === 'extended' && (
        <div className="ods-topbar-title">
          {title}
          <span>{description}</span>
        </div>
      )}

      {onSearch && (
        <div className="ods-topbar-search">
          <SearchOutline onClick={onSearch} />
        </div>
      )}

      {variants === 'default' && (
        <div className="ods-topbar-title">
          {title}
          {description && <span>{description}</span>}
        </div>
      )}
    </div>
  );
};

export default TopBar;
