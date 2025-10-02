import React, { forwardRef } from 'react';
import classNames from 'classnames';
import Header from './Header';
import ActionButton from './ActionButton';

export interface ICardGroupProps {
  title?: string;
  subtitle?: string;
  variant?: 'minimal' | 'header';
  count?: number;
  actionLabel?: string;
  actionCount: number;
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
        <Header title={title} subtitle={subtitle} count={count} />
      )}

      {children && variant !== 'header' && (
        <>
          {(title || subtitle) && <hr className="ods-divider" />}
          <div>{children}</div>
        </>
      )}

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
