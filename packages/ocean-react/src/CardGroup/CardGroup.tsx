import React, { forwardRef } from 'react';
import classNames from 'classnames';
import Header from './Header';
import ActionButton from './ActionButton';
import { TagProps } from '../Tag/Tag';

export interface ICardGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  variant?: 'minimal' | 'header';
  count?: number;
  tag?: TagProps;
  actionLabel?: string;
  actionCount?: number;
  actionClick?: () => void;
  children?: React.ReactNode;
}

const CardGroup = forwardRef<HTMLDivElement, ICardGroupProps>(
  (
    {
      title,
      subtitle,
      actionLabel,
      actionCount,
      actionClick,
      count,
      tag,
      children,
      variant = 'minimal',
      ...rest
    },
    ref
  ) => (
    <div
      ref={ref}
      {...rest}
      data-testid="card-group"
      className={classNames('ods-card-group', `ods-card-group--${variant}`)}
    >
      {(title || subtitle) && (
        <Header title={title} subtitle={subtitle} count={count} tag={tag} />
      )}

      {children && variant !== 'header' && <div>{children}</div>}

      {actionLabel && variant !== 'header' && (
        <ActionButton
          actionLabel={actionLabel}
          actionCount={actionCount}
          actionClick={actionClick}
        />
      )}
    </div>
  )
);

CardGroup.displayName = 'CardGroup';

export default CardGroup;
