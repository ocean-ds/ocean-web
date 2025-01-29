import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { ChevronRight } from '@useblu/ocean-icons-react';
import Badge from '../Badge';

export interface ICardGroupProps {
  title?: string;
  subtitle?: string;
  variant?: 'minimal' | 'header';
  count?: number;
  actionLabel?: string;
  actionClick?: () => void;
  children?: React.ReactNode;
}

const CardGroup = forwardRef<HTMLDivElement, ICardGroupProps>(
  (
    {
      title,
      subtitle,
      actionLabel,
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
        <div className="ods-card-group__header">
          <div className="ods-card-group__header--content">
            <p className="ods-typography ods-typography__heading4">{title}</p>
            {subtitle && (
              <p className="ods-typography ods-typography__description">
                {subtitle}
              </p>
            )}
          </div>
          {count !== undefined && (
            <Badge
              variation="medium"
              color={count === 0 ? 'neutral' : 'alert'}
              count={count}
            />
          )}
        </div>
      )}

      {children && variant !== 'header' && (
        <>
          {(title || subtitle) && <hr className="ods-divider" />}
          <div>{children}</div>
        </>
      )}

      {actionLabel && variant !== 'header' && (
        <>
          <hr className="ods-divider" />
          <button
            onClick={actionClick}
            type="button"
            className="ods-card-group__action"
          >
            <span className="ods-card-group__action--label">{actionLabel}</span>
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  )
);

CardGroup.displayName = 'CardGroup';

export default CardGroup;
