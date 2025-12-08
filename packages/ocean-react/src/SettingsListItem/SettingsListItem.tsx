import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { LockClosed } from '@useblu/ocean-icons-react';
import Button, { ButtonProps } from '../Button/Button';
import Tag, { TagProps } from '../Tag/Tag';
import ContentList from '../_shared/components/ContentList/ContentList';
import SkeletonBar from '../_shared/components/SkeletonBar';

export type SettingListItemProps = {
  title: string;
  description?: string;
  strikethroughDescription?: string;
  caption?: string;
  errorMessage?: string;
  button?: ButtonProps;
  tag?: TagProps;
  showDivider?: boolean;
  blocked?: boolean;
  disabled?: boolean;
  loading?: boolean;
  state?:
    | 'default'
    | 'inactive'
    | 'positive'
    | 'warning'
    | 'highlight'
    | 'highlight-lead'
    | 'strikethrough';
  type?: 'default' | 'inverted';
};

const SettingsListItem = ({
  title,
  description,
  strikethroughDescription,
  caption,
  errorMessage,
  button,
  tag,
  disabled,
  type = 'default',
  loading = false,
  showDivider = true,
  blocked = false,
  state = 'default',
}: SettingListItemProps): ReactElement => (
  <div
    className={classNames('ods-settings-list-item', {
      'ods-settings-list-item--disabled': disabled,
      'ods-settings-list-item--divider': showDivider,
    })}
  >
    {loading ? (
      <div className="ods-content-list__skeleton">
        <SkeletonBar width="40%" height="16px" />
        <SkeletonBar width="90%" height="16px" />
        <SkeletonBar width="90%" height="16px" />
      </div>
    ) : (
      <div
        className={classNames('ods-content-list__content', {
          'ods-content-list--disabled': disabled,
        })}
      >
        <ContentList
          title={title}
          description={description}
          strikethroughDescription={strikethroughDescription}
          caption={caption}
          inverted={type === 'inverted'}
          type={state}
        />
        {errorMessage && (
          <p className="ods-typography ods-typography__caption">
            {errorMessage}
          </p>
        )}
      </div>
    )}
    <div className="ods-settings-list-item__actions">
      {blocked && <LockClosed size={20} />}
      {button && (
        <Button size="sm" disabled={disabled} loading={loading} {...button} />
      )}
      {tag && <Tag size="medium" setIconOff {...tag} />}
    </div>
  </div>
);

export default SettingsListItem;
