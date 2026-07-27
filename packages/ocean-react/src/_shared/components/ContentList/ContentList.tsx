import React, { ReactElement, ReactNode } from 'react';
import classNames from 'classnames';

/**
 * Where the indicator is rendered relative to the text content.
 *
 * - `inline` (default): keeps each component's current position — same row as the text,
 *   at the end of the content block.
 * - `above`: stacked above the title, inside the content column.
 * - `below`: stacked below the text, inside the content column.
 */
export type IndicatorPosition = 'inline' | 'above' | 'below';

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
  /**
   * Indicator stacked inside the content column. Only set by the host component when
   * `indicatorPosition` is `above` or `below` — `inline` keeps the host's own wrapper.
   */
  indicator?: ReactNode;
  /** Stacking side of `indicator`. Ignored when `indicator` is not provided. */
  indicatorPosition?: Exclude<IndicatorPosition, 'inline'>;
};

const ContentList = ({
  title,
  description,
  strikethroughDescription,
  caption,
  inverted = false,
  type = 'default',
  indicator,
  indicatorPosition,
}: ContentListProps): ReactElement => {
  const stackedIndicator = indicator && indicatorPosition && (
    <div
      className={classNames(
        'ods-content-list__indicator',
        `ods-content-list__indicator--${indicatorPosition}`
      )}
    >
      {indicator}
    </div>
  );

  return (
    <div className="ods-content-list">
      {indicatorPosition === 'above' && stackedIndicator}
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
      {indicatorPosition === 'below' && stackedIndicator}
    </div>
  );
};

export default ContentList;
