import React, { ReactNode } from 'react';
import classNames from 'classnames';

export type ListContainerProps = {
  /**
   * Visual style: 'card' adds border and border-radius, 'text' is borderless.
   * @default 'card'
   */
  type?: 'card' | 'text';
  /**
   * Shows a horizontal divider below the content. Only rendered when type="text".
   * @default false
   */
  showDivider?: boolean;
  /**
   * Applies an error border color. Only effective when type="card".
   * @default false
   */
  hasError?: boolean;
  children: ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const ListContainer = React.forwardRef<HTMLDivElement, ListContainerProps>(
  (
    {
      type = 'card',
      showDivider = false,
      hasError = false,
      children,
      className,
      ...rest
    },
    ref
  ) => (
    <div
      ref={ref}
      className={classNames('ods-list-container', className, {
        'ods-list-container--card': type === 'card',
        'ods-list-container--card--error': type === 'card' && hasError,
        'ods-list-container--text': type === 'text',
      })}
      {...rest}
    >
      {children}
      {showDivider && type === 'text' && (
        <div className="ods-list-container__divider" />
      )}
    </div>
  )
);

ListContainer.displayName = 'ListContainer';

export default ListContainer;
