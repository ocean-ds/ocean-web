import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { LockClosed } from '@useblu/ocean-icons-react';
import Button, { ButtonProps } from '../Button/Button';
import Tag, { TagProps } from '../Tag/Tag';
import ContentList, {
  ContentListProps,
} from '../_shared/components/ContentList';

export type SettingListItemProps = {
  errorMessage?: string;
  button?: ButtonProps;
  tag?: TagProps;
  showDivider?: boolean;
  blocked?: boolean;
} & Omit<ContentListProps, 'tagLabel'>;

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
    <ContentList
      type={type}
      title={title}
      description={description}
      strikethroughDescription={strikethroughDescription}
      caption={caption}
      errorMessage={errorMessage}
      disabled={disabled}
      loading={loading}
      state={state}
    />
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
