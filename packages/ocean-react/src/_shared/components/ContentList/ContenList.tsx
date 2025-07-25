import React, { ReactElement } from 'react';
import classNames from 'classnames';
import SkeletonBar from '../SkeletonBar';
import Tag from '../../../Tag/Tag';

export type ContentListProps = {
  title: string;
  description?: string;
  strikethroughDescription?: string;
  caption?: string;
  errorMessage?: string;
  tagLabel?: string;
  loading?: boolean;
  disabled?: boolean;
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

const ContentList = ({
  title,
  description,
  strikethroughDescription,
  caption,
  errorMessage,
  tagLabel,
  loading,
  disabled,
  state = 'default',
  type = 'default',
}: ContentListProps): ReactElement =>
  loading ? (
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
      <p
        className={classNames('ods-typography', {
          'ods-typography__paragraph': type === 'default',
          'ods-typography__description': type === 'inverted',
          'ods-typography__tag': tagLabel,
        })}
      >
        {title}
        {tagLabel && (
          <Tag type="important" size="small" variant="highlight">
            {tagLabel}
          </Tag>
        )}
      </p>
      {description && (
        <p
          className={classNames('ods-typography', {
            'ods-typography__description': type === 'default',
            'ods-typography__paragraph': type === 'inverted',
            [`ods-typography__paragraph--${state}`]:
              state && type === 'inverted',
          })}
        >
          {strikethroughDescription &&
            state === 'strikethrough' &&
            type === 'inverted' && (
              <span className="ods-typography__paragraph--strikethrough-text">
                {strikethroughDescription}
              </span>
            )}
          {description}
        </p>
      )}
      {caption && (
        <p
          className={classNames(
            'ods-typography',
            'ods-typography__captionbold'
          )}
        >
          {caption}
        </p>
      )}
      {errorMessage && (
        <p className="ods-typography ods-typography__caption">{errorMessage}</p>
      )}
    </div>
  );

export default ContentList;
