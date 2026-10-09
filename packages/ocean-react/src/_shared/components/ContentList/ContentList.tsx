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

/**
 * Typography scale of the content block.
 *
 * - `md` (default): the current scale — paragraph 16 / description 14.
 * - `sm`: the compact scale used by child rows (former "Child" typography) —
 *   inverted: title captionBold 12 / description 14; not inverted: title 14 / description 12.
 */
export type ContentListSize = 'md' | 'sm';

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
  /**
   * Typography scale. `md` keeps the current rendering; `sm` is the compact scale.
   * @default 'md'
   */
  size?: ContentListSize;
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
  size = 'md',
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

  const strikethroughText = strikethroughDescription &&
    type === 'strikethrough' && (
      <span className="ods-typography__paragraph--strikethrough-text">
        {strikethroughDescription}
      </span>
    );

  if (size === 'sm') {
    // The "emphasis" text carries the type color (title when not inverted, description when
    // inverted); the "support" text is the secondary line. Only this branch adds the
    // `ods-content-list__text` hooks, so the `md` DOM stays exactly as before.
    const emphasisClassName = classNames(
      'ods-typography',
      'ods-content-list__text',
      'ods-content-list__emphasis',
      type === 'highlight-lead'
        ? 'ods-typography__paragraph'
        : 'ods-typography__description',
      `ods-content-list__emphasis--${type}`
    );
    const supportClassName = classNames(
      'ods-typography',
      'ods-content-list__text',
      'ods-content-list__support',
      inverted ? 'ods-typography__captionbold' : 'ods-typography__caption',
      { 'ods-content-list__support--inactive': type === 'inactive' }
    );

    return (
      <div className="ods-content-list ods-content-list--sm">
        {indicatorPosition === 'above' && stackedIndicator}
        <p className={inverted ? supportClassName : emphasisClassName}>
          {!inverted && strikethroughText}
          {title}
        </p>
        {description && (
          <p className={inverted ? emphasisClassName : supportClassName}>
            {inverted && strikethroughText}
            {description}
          </p>
        )}
        {caption && (
          <p
            className={classNames(
              'ods-typography ods-typography__captionbold',
              { 'ods-typography__paragraph--inactive': type === 'inactive' }
            )}
          >
            {caption}
          </p>
        )}
        {indicatorPosition === 'below' && stackedIndicator}
      </div>
    );
  }

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
