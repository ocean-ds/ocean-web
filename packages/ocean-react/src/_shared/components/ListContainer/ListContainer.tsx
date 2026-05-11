import React, { ReactNode } from 'react';
import classNames from 'classnames';
import CornerTag, { CornerTagProps } from '../../../CornerTag/CornerTag';

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
  /**
   * Renders a Highlight Corner Tag at the top-right corner of the card.
   * Only rendered when `type='card'` (no visual container in `type='text'`).
   */
  cornerTag?: CornerTagProps;
  children: ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const ListContainer = React.forwardRef<HTMLDivElement, ListContainerProps>(
  (
    {
      type = 'card',
      showDivider = false,
      hasError = false,
      highlight,
      cornerTag,
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
        {type === 'card' && cornerTag?.label && <CornerTag {...cornerTag} />}
      </div>
      {highlight?.caption && (
        <div
          className="ods-list-container__highlight"
          data-testid="list-container-highlight"
          style={{ backgroundColor: highlight.backgroundColor ?? '#F3F5FE' }}
        >
          <p
            className="ods-typography ods-typography__caption"
            style={{ color: highlight.captionColor ?? '#67697A' }}
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
