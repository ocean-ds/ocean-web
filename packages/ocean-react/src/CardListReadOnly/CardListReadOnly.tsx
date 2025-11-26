import React, { ReactElement, ReactNode } from 'react';
import classNames from 'classnames';
import ContentList, {
  ContentListProps,
} from '../_shared/components/ContentList';
import SkeletonBar from '../_shared/components/SkeletonBar';

export type CardListReadOnlyProps = {
  caption?: string;
  className?: string;
  description?: string;
  disabled?: boolean;
  icon?: ReactNode;
  indicator?: ReactNode;
  inverted?: boolean;
  loading?: boolean;
  strikethroughDescription?: string;
  title: string;
  type?: ContentListProps['type'];
};

const CardListReadOnly = ({
  caption,
  className,
  description,
  disabled = false,
  icon,
  indicator,
  inverted = false,
  loading = false,
  strikethroughDescription,
  title,
  type = 'default',
}: CardListReadOnlyProps): ReactElement => {
  if (loading) {
    return (
      <div
        className={classNames('ods-card-list-readonly', 'ods-card-list-readonly--loading', className)}
      >
        <div className="ods-card-list-readonly__skeleton">
          <SkeletonBar width="100%" height="24px" />
          <SkeletonBar width="80%" height="20px" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={classNames('ods-card-list-readonly', className, {
        'ods-card-list-readonly--disabled': disabled,
      })}
    >
      {icon && <div className="ods-card-list-readonly__icon">{icon}</div>}
      <ContentList
        caption={caption}
        description={description}
        inverted={inverted}
        strikethroughDescription={strikethroughDescription}
        title={title}
        type={type}
      />
      {indicator && (
        <div className="ods-card-list-readonly__trailing">
          <div className="ods-card-list-readonly__indicator">{indicator}</div>
        </div>
      )}
    </div>
  );
};

export default CardListReadOnly;

