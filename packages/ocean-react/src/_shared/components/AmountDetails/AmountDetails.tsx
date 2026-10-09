import React, { ReactElement, ReactNode } from 'react';
import classNames from 'classnames';
import Typography from '../../../Typography/Typography';
import Tag from '../../../Tag/Tag';
import { ContentListProps } from '../ContentList';

export type AmountDetailsType = 'default' | 'positive' | 'negative';

/**
 * Size of the amount block.
 *
 * - `md`: value 16 semibold, tag Medium.
 * - `sm`: value 14 semibold, tag Small.
 */
export type AmountDetailsSize = 'md' | 'sm';

export type AmountDetailsTagType =
  | 'positive'
  | 'warning'
  | 'negative'
  | 'neutral'
  | 'neutral-02'
  | 'neutral-03'
  | 'complementary'
  | 'default';

export type AmountDetailsTag = {
  /** Text of the tag shown below the amount. */
  label: ReactNode;
  /**
   * Tag type. Forced to `neutral` when the amount type is `inactive`.
   * @default 'positive'
   */
  type?: AmountDetailsTagType;
  /**
   * Hides the tag icon.
   * @default true
   */
  setIconOff?: boolean;
};

export type AmountDetailsProps = {
  amount: string;
  type?:
    | ContentListProps['type']
    | 'negative'
    | 'strikethrough'
    | 'strikethrough-neutral';
  /**
   * Size of the amount. When omitted, the block keeps its original rendering (no size
   * modifier), so existing consumers are unchanged. The Transaction List family passes `md`
   * or `sm` explicitly.
   */
  size?: AmountDetailsSize;
  /**
   * Original value rendered struck-through before `amount`, on the same line. Only used
   * with `type="strikethrough"` or `type="strikethrough-neutral"`.
   */
  strikethroughAmount?: string;
  indicator?: ReactNode;
  /**
   * Size of the indicator (e.g. Tag). Affects styling when the indicator is a Tag.
   * When omitted, it is derived from `size` (`md` → `medium`, `sm` → `small`) and falls back
   * to `small` when there is no `size`.
   * @default 'small'
   */
  indicatorSize?: 'small' | 'medium';
  /**
   * Tag rendered by the block itself, sized like the indicator (`indicatorSize`, else derived
   * from `size`) and turned `neutral` when the type is `inactive`. Takes precedence over
   * `indicator`.
   */
  tag?: AmountDetailsTag;
  showIndicator?: boolean;
  additionalData?: string;
  showAdditionalData?: boolean;
};

const AmountDetails = ({
  amount,
  type = 'default',
  size,
  strikethroughAmount,
  indicator,
  indicatorSize,
  tag,
  showIndicator = true,
  additionalData,
  showAdditionalData = true,
}: AmountDetailsProps): ReactElement => {
  const isNegative = type === 'negative';
  const isPositive = type === 'positive';
  const isStrikethrough =
    type === 'strikethrough' || type === 'strikethrough-neutral';
  const isInactive = type === 'inactive';

  const sizedIndicator = size === 'md' ? 'medium' : 'small';
  const resolvedIndicatorSize = indicatorSize ?? sizedIndicator;

  const renderAmount = () => {
    if (isNegative) {
      return (
        <div className="ods-amount-details__amount-row">
          <span
            className={classNames('ods-amount-details__amount-sign', {
              'ods-amount-details__amount-sign--sized': size,
            })}
          >
            {'- '}
          </span>
          <p
            className={classNames('ods-amount-details__amount', {
              'ods-amount-details__amount--sized': size,
            })}
          >
            {amount}
          </p>
        </div>
      );
    }

    if (isStrikethrough) {
      return (
        <div className="ods-amount-details__amount-row ods-amount-details__amount-row--strikethrough">
          {strikethroughAmount && (
            <span className="ods-amount-details__strikethrough">
              {strikethroughAmount}
            </span>
          )}
          <p
            className={classNames(
              'ods-amount-details__amount',
              `ods-amount-details__amount--${type}`,
              { 'ods-amount-details__amount--sized': size }
            )}
          >
            {amount}
          </p>
        </div>
      );
    }

    return (
      <p
        className={classNames('ods-amount-details__amount', {
          'ods-amount-details__amount--positive': isPositive,
          'ods-amount-details__amount--sized': size,
        })}
      >
        {amount}
      </p>
    );
  };

  const renderIndicator = () => {
    if (tag) {
      return (
        <Tag
          size={resolvedIndicatorSize}
          type={isInactive ? 'neutral' : tag.type ?? 'positive'}
          setIconOff={tag.setIconOff ?? true}
          // Long labels are truncated with an ellipsis: keep the full text as a tooltip.
          title={typeof tag.label === 'string' ? tag.label : undefined}
        >
          {tag.label}
        </Tag>
      );
    }

    return indicator;
  };

  const hasIndicator = Boolean(tag || indicator);

  return (
    <div
      className={classNames('ods-amount-details', {
        [`ods-amount-details--${size}`]: size,
        'ods-amount-details--inactive': size && isInactive,
      })}
    >
      <div className="ods-amount-details__main">
        {renderAmount()}
        {showIndicator && hasIndicator && (
          <div
            className={classNames('ods-amount-details__indicator', {
              'ods-amount-details__indicator--medium':
                !tag && resolvedIndicatorSize === 'medium',
            })}
          >
            {renderIndicator()}
          </div>
        )}
      </div>
      {showAdditionalData && additionalData && (
        <Typography
          variant="captionbold"
          className="ods-amount-details__caption"
        >
          {additionalData}
        </Typography>
      )}
    </div>
  );
};

export default AmountDetails;
