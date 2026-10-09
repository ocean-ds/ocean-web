import React, { ReactElement, ReactNode } from 'react';
import classNames from 'classnames';
import { ChevronRight } from '@useblu/ocean-icons-react';
import ContentList, { ContentListProps, ContentListSize } from '../ContentList';
import AmountDetails, {
  AmountDetailsProps,
  AmountDetailsSize,
  AmountDetailsTag,
} from '../AmountDetails';
import SkeletonBar from '../SkeletonBar';

/**
 * Color of the leading icon, from a closed set:
 *
 * - `default`: Interface/Dark/Up — rows on a white background.
 * - `on-color`: Interface/Dark/Down — rows on colored backgrounds (e.g. Status/Warning/Up or
 *   Status/Negative/Up heroes).
 * - `highlight`: Brand/Primary/Down — more emphasis.
 *
 * Disabled always forces Interface/Light/Deep, whatever the choice. The icon inherits the
 * color (`currentColor`), so pass icons without their own color.
 */
export type TransactionListIconColor = 'default' | 'on-color' | 'highlight';

/**
 * Vertical density of the row: `default` keeps each component's padding;
 * `compact` sets top and bottom padding to 8 (Spacing/Xxs). Horizontal padding is unchanged.
 */
export type TransactionListDensity = 'default' | 'compact';

/**
 * Props of the content block (Content List Default): the texts on the left of the row.
 * Passed to every Transaction List item in `content`.
 */
export type ContentListDefaultProps = {
  /**
   * What happened, such as "Payment to supplier". With `inverted` (default) it is the
   * small line above the description.
   */
  title: string;
  /**
   * Who or what the transaction relates to.
   */
  description?: string;
  /**
   * Original text shown struck through before the emphasized text when
   * `status="strikethrough"`.
   */
  strikethroughDescription?: string;
  /**
   * Date, time, order number or due date.
   */
  caption?: string;
  /**
   * Emphasizes the description instead of the title.
   * @default true
   */
  inverted?: boolean;
  /**
   * Color and weight of the emphasized text. Ignored when the item is disabled.
   * @default 'default'
   */
  status?: ContentListProps['type'];
  /**
   * Type scale of the block, independent from `amount.size`.
   */
  size?: ContentListSize;
};

/**
 * Props of the amount block (Content List Amount): the value on the right of the row.
 * Passed to every Transaction List item in `amount`.
 */
export type ContentListAmountProps = {
  /**
   * Formatted value without a sign, such as "R$ 6.819,33".
   */
  value: string;
  /**
   * Adds the sign and the color. Ignored when the item is disabled.
   * @default 'default'
   */
  type?: AmountDetailsProps['type'];
  /**
   * Original value, struck through before `value` (types `strikethrough` and
   * `strikethrough-neutral`).
   */
  strikethroughValue?: string;
  /**
   * Status tag below the value. Its size follows `size`; it turns neutral when the item is
   * disabled.
   */
  tag?: AmountDetailsTag;
  /**
   * One short fact about the value, such as "Advance fee".
   */
  info?: string;
  /**
   * Type scale of the block, independent from `content.size`.
   */
  size?: AmountDetailsSize;
};

/**
 * Props shared by every component of the Transaction List family
 * (Read Only, Action, Selectable and the child rows).
 */
export type TransactionListBaseProps = {
  /**
   * Content block (left): title, description, caption.
   */
  content: ContentListDefaultProps;
  /**
   * Amount block (right): value, type, tag, info.
   */
  amount: ContentListAmountProps;
  /**
   * Leading icon. It takes the color from `iconColor` (pass it without its own color).
   */
  icon?: ReactNode;
  /**
   * Color of the leading icon. Disabled always forces Interface/Light/Deep.
   * @default 'default'
   */
  iconColor?: TransactionListIconColor;
  /**
   * Disabled state: content and amount use the inactive type and the tag turns neutral.
   * @default false
   */
  disabled?: boolean;
  /**
   * Shows the skeleton instead of the content.
   * @default false
   */
  loading?: boolean;
  /**
   * Vertical density: `compact` sets top and bottom padding to 8 (the skeleton follows).
   * @default 'default'
   */
  density?: TransactionListDensity;
};

/** DOM attributes that clash with the family props. */
export type TransactionListOmittedDomProps = 'content';

type TransactionListContentProps = {
  content: ContentListDefaultProps;
  amount: ContentListAmountProps;
  /** Size used when `content.size` / `amount.size` are not set. */
  defaultSize?: ContentListSize;
  disabled: boolean;
  /** Custom element below the value (legacy Expandable API). */
  indicator?: ReactNode;
  /** Class of the wrapper (the Expandable keeps its own). */
  className?: string;
};

/**
 * The two blocks of a row: Content List Default on the left, Content List Amount on the
 * right.
 */
export const TransactionListContent = ({
  content: {
    title,
    description,
    strikethroughDescription,
    caption,
    inverted = true,
    status = 'default',
    size: contentSize,
  },
  amount: { value, type = 'default', strikethroughValue, tag, info, size },
  defaultSize,
  disabled,
  indicator,
  className = 'ods-transaction-list__content',
}: TransactionListContentProps): ReactElement => {
  const resolvedContentSize = contentSize ?? defaultSize;
  const amountSize = size ?? defaultSize;
  return (
    <div className={className}>
      <ContentList
        title={title}
        description={description}
        strikethroughDescription={strikethroughDescription}
        caption={caption}
        inverted={inverted}
        type={disabled ? 'inactive' : status}
        size={resolvedContentSize}
      />
      <AmountDetails
        amount={value}
        type={disabled ? 'inactive' : type}
        size={amountSize}
        strikethroughAmount={strikethroughValue}
        tag={tag}
        indicator={indicator}
        indicatorSize={amountSize ? undefined : 'medium'}
        additionalData={info}
        showAdditionalData={Boolean(info)}
      />
    </div>
  );
};

const iconColorClass = (
  block: string,
  iconColor: TransactionListIconColor | 'child',
  disabled: boolean
) =>
  disabled
    ? `ods-transaction-list__${block}--inactive`
    : `ods-transaction-list__${block}--${iconColor}`;

export const TransactionListIcon = ({
  icon,
  iconColor,
  disabled,
}: {
  icon: ReactNode;
  iconColor: TransactionListIconColor;
  disabled: boolean;
}): ReactElement => (
  <div
    className={classNames(
      'ods-transaction-list__icon',
      iconColorClass('icon', iconColor, disabled)
    )}
  >
    {icon}
  </div>
);

export const TransactionListChevron = (): ReactElement => (
  <div className="ods-transaction-list__trailing">
    <ChevronRight size={20} className="ods-transaction-list__chevron" />
  </div>
);

export const TransactionListSkeleton = ({
  showLeading,
}: {
  showLeading: boolean;
}): ReactElement => (
  <>
    {showLeading && (
      <div className="ods-transaction-list__icon" aria-hidden>
        <SkeletonBar width="24px" height="24px" />
      </div>
    )}
    <div
      className="ods-transaction-list__content ods-transaction-list__skeleton"
      data-testid="transaction-list-skeleton"
    >
      <div className="ods-transaction-list__skeleton-text">
        <SkeletonBar width="33%" height="16px" />
        <SkeletonBar width="100%" height="16px" />
      </div>
      <div className="ods-transaction-list__skeleton-amount">
        <SkeletonBar width="100%" height="16px" />
        <SkeletonBar width="100%" height="16px" />
      </div>
    </div>
  </>
);

export const TransactionListDivider = (): ReactElement => (
  <div
    className="ods-transaction-list__divider"
    data-testid="transaction-list-divider"
  />
);

/**
 * Position of a child row on the timeline that links the rows of an expanded item.
 */
export type TransactionListChildPosition =
  | 'standalone'
  | 'first'
  | 'middle'
  | 'last';

export const TransactionListTimeline = ({
  position,
  icon,
  iconColor,
  disabled,
}: {
  position: TransactionListChildPosition;
  icon?: ReactNode;
  /**
   * Explicit color; when omitted, child rows use Interface/Light/Down (decision 08/10).
   */
  iconColor?: TransactionListIconColor;
  disabled: boolean;
}): ReactElement => {
  const showLineAbove = position === 'middle' || position === 'last';
  const showLineBelow = position === 'first' || position === 'middle';

  return (
    <div
      className="ods-transaction-list__timeline"
      data-testid="transaction-list-timeline"
    >
      <span
        className={classNames('ods-transaction-list__timeline-line', {
          'ods-transaction-list__timeline-line--visible': showLineAbove,
        })}
      />
      <div
        className={classNames(
          'ods-transaction-list__timeline-icon',
          iconColorClass('timeline-icon', iconColor ?? 'child', disabled)
        )}
      >
        {icon}
      </div>
      <span
        className={classNames('ods-transaction-list__timeline-line', {
          'ods-transaction-list__timeline-line--visible': showLineBelow,
        })}
      />
    </div>
  );
};
