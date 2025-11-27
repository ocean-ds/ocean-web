import React, { ReactElement, ReactNode } from 'react';
import classNames from 'classnames';
import ContentList, {
  ContentListProps,
} from '../_shared/components/ContentList';
import SkeletonBar from '../_shared/components/SkeletonBar';
import Button from '../Button';
import Switch from '../Switch';

export type CardListSettingsProps = {
  title: string;
  description?: string;
  caption?: string;
  inverted?: boolean;
  type?: ContentListProps['type'];
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  actionType?: 'button' | 'toggle';
  buttonLabel?: string;
  buttonSize?: 'sm' | 'md';
  toggleChecked?: boolean;
  onButtonClick?: () => void;
  onToggleChange?: (checked: boolean) => void;
  className?: string;
};

const CardListSettings = ({
  title,
  description,
  caption,
  inverted = false,
  type = 'default',
  disabled = false,
  loading = false,
  icon,
  actionType = 'button',
  buttonLabel = 'Label',
  buttonSize = 'sm',
  toggleChecked = false,
  onButtonClick,
  onToggleChange,
  className,
}: CardListSettingsProps): ReactElement => {
  const renderActionElement = () => {
    if (actionType === 'button') {
      return (
        <Button
          variant="primary"
          size={buttonSize}
          onClick={onButtonClick}
          disabled={disabled}
        >
          {buttonLabel}
        </Button>
      );
    }

    if (actionType === 'toggle') {
      return (
        <Switch
          checked={toggleChecked}
          disabled={disabled}
          onChange={(e) => onToggleChange?.(e.target.checked)}
        />
      );
    }

    return null;
  };

  if (loading) {
    return (
      <div
        className={classNames('ods-card-list-settings', 'ods-card-list-settings--loading', className)}
      >
        <div className="ods-card-list-settings__skeleton">
          <SkeletonBar width="100%" height="24px" />
          <SkeletonBar width="80%" height="20px" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={classNames('ods-card-list-settings', className, {
        'ods-card-list-settings--disabled': disabled,
      })}
    >
      {icon && <div className="ods-card-list-settings__icon">{icon}</div>}
      <ContentList
        title={title}
        description={description}
        caption={caption}
        inverted={inverted}
        type={type}
      />
      <div className="ods-card-list-settings__action">
        {renderActionElement()}
      </div>
    </div>
  );
};

export default CardListSettings;




