import React, { ReactNode } from 'react';
import classNames from 'classnames';

export type ListContainerHighlight = {
  /**
   * Caption text displayed inside the highlight area.
   */
  caption: string | ReactNode;
  /**
   * Color of the caption text.
   */
  captionColor?: string;
  /**
   * Background color of the highlight area (any valid CSS color).
   */
  backgroundColor?: string;
};

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
  /**
   * Renders a highlighted caption area at the bottom of the container.
   */
  highlight?: ListContainerHighlight;
  children: ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const ListContainer = React.forwardRef<HTMLDivElement, ListContainerProps>(
  (
    {
      type = 'card',
      showDivider = false,
      hasError = false,
      highlight = {
        caption: '',
        captionColor: '#67697A',
        backgroundColor: '#F3F5FE',
      },
      children,
      className,
      ...rest
    },
    ref
  ) => (
    <div className="ods-list-container">
      <div
        ref={ref}
        className={classNames('ods-list-container__content', className, {
          'ods-list-container__content--card': type === 'card',
          'ods-list-container__content--card--error':
            type === 'card' && hasError,
          'ods-list-container__content--text': type === 'text',
        })}
        {...rest}
      >
        {children}
        {showDivider && type === 'text' && (
          <div className="ods-list-container__content__divider" />
        )}
      </div>
      {highlight.caption && (
        <div
          className="ods-list-container__highlight"
          data-testid="list-container-highlight"
          style={{ backgroundColor: highlight.backgroundColor }}
        >
          <p
            className="ods-typography ods-typography__caption"
            style={{ color: highlight.captionColor }}
          >
            {highlight.caption}
          </p>
        </div>
      )}
    </div>
  )
);

ListContainer.displayName = 'ListContainer';

export default ListContainer;
