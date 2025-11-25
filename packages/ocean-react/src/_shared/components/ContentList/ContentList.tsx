import React, { ReactElement } from 'react';
import classNames from 'classnames';

export type ContentListProps = {
  title: string;
  description?: string;
  strikethroughDescription?: string;
  caption?: string;
  inverted?: boolean;
  type?:
  | 'default'
  | 'inactive'
  | 'positive'
  | 'warning'
  | 'highlight'
  | 'highlight-lead'
  | 'strikethrough';
};

const ContentList = ({
  title,
  description,
  strikethroughDescription,
  caption,
  inverted = false,
  type = 'default',
}: ContentListProps): ReactElement => (
  <div className="ods-card-list-content">
    <p
      className={classNames('ods-typography', {
        'ods-typography__paragraph': !inverted,
        'ods-typography__description': inverted,
        [`ods-typography__paragraph--${type}`]:
          type && (!inverted || type === 'inactive'),
      })}
    >
      {strikethroughDescription && type === 'strikethrough' && !inverted && (
        <span className="ods-typography__paragraph--strikethrough-text">
          {strikethroughDescription}
        </span>
      )}
      {title}
    </p>
    {description && (
      <p
        className={classNames(`ods-typography`, {
          'ods-typography__description': !inverted,
          'ods-typography__paragraph': inverted,
          [`ods-typography__paragraph--${type}`]:
            type && (inverted || type === 'inactive'),
        })}
      >
        {strikethroughDescription && type === 'strikethrough' && inverted && (
          <span className="ods-typography__paragraph--strikethrough-text">
            {strikethroughDescription}
          </span>
        )}
        {description}
      </p>
    )}
    {caption && (
      <p
        className={classNames(`ods-typography ods-typography__captionbold`, {
          [`ods-typography__paragraph--${type}`]: type && type === 'inactive',
        })}
      >
        {caption}
      </p>
    )}
  </div>
);

export default ContentList;
