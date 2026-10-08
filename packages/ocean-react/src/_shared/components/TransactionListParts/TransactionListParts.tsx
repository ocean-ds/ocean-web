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
 * Props shared by every component of the Transaction List family
 * (Read Only, Action, Selectable and the child rows).
 */
export type TransactionListBaseProps = {
  /**
   * Primary text. With `inverted` (default) it is the small line above the description.
   */
  title: string;
  /**
   * Secondary text.
   */
  description?: string;
  /**
   * Original text shown struck-through before the emphasized text when
   * `status="strikethrough"`.
   */
  strikethroughDescription?: string;
  /**
   * Tertiary text (captionBold).
   */
  caption?: string;
  /**
   * Inverts title and description.
   * @default true
   */
  inverted?: boolean;
  /**
   * Type of the content block.
   * @default 'default'
   */
  status?: ContentListProps['type'];
  /**
   * Typography scale of the content block, independent from `amountSize`.
   */
  contentSize?: ContentListSize;
  /**
   * Amount shown on the right (e.g. "R$ 0,00").
   */
  amount: string;
  /**
   * Type of the amount: default, positive, negative, inactive, strikethrough or
   * strikethrough-neutral.
   * @default 'default'
   */
  amountType?: AmountDetailsProps['type'];
  /**
   * Size of the amount block, independent from `contentSize`. The tag size follows it
   * (`md` → Medium, `sm` → Small).
   */
  amountSize?: AmountDetailsSize;
  /**
   * Original amount rendered struck-through before `amount` (amount types `strikethrough`
   * and `strikethrough-neutral`).
   */
  strikethroughAmount?: string;
  /**
   * Tag shown below the amount. Its size follows `amountSize` and it turns neutral when the
   * item is disabled.
   */
  amountTag?: AmountDetailsTag;
  /**
   * Custom indicator shown below the amount when `amountTag` is not enough.
   */
  amountIndicator?: ReactNode;
  /**
   * Whether to show the amount tag/indicator.
   * @default true
   */
  showAmountIndicator?: boolean;
  /**
   * Additional data shown below the amount (captionBold).
   */
  additionalData?: string;
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

const CONTENT_KEYS = [
  'title',
  'description',
  'strikethroughDescription',
  'caption',
  'inverted',
  'status',
  'amount',
  'amountType',
  'strikethroughAmount',
  'amountTag',
  'amountIndicator',
  'showAmountIndicator',
  'additionalData',
] as const;

/** Props of the two blocks (content + amount) that every family member forwards as-is. */
export type TransactionListContentData = Pick<
  TransactionListBaseProps,
  typeof CONTENT_KEYS[number]
>;

/**
 * Splits the block props (forwarded to `TransactionListContent`) from the remaining props
 * (forwarded to the host element), so each family member does not repeat the list.
 */
export const splitContentProps = <T extends TransactionListContentData>(
  props: T
): [TransactionListContentData, Omit<T, keyof TransactionListContentData>] => {
  const content: Record<string, unknown> = {};
  const rest: Record<string, unknown> = {};
  Object.entries(props).forEach(([key, value]) => {
    const target = (CONTENT_KEYS as readonly string[]).includes(key)
      ? content
      : rest;
    target[key] = value;
  });
  return [
    content as TransactionListContentData,
    rest as Omit<T, keyof TransactionListContentData>,
  ];
};

type TransactionListContentProps = TransactionListContentData & {
  contentSize: ContentListSize;
  amountSize: AmountDetailsSize;
  disabled: boolean;
};

export const TransactionListContent = ({
  title,
  description,
  strikethroughDescription,
  caption,
  inverted = true,
  status = 'default',
  contentSize,
  amount,
  amountType = 'default',
  amountSize,
  strikethroughAmount,
  amountTag,
  amountIndicator,
  showAmountIndicator = true,
  additionalData,
  disabled,
}: TransactionListContentProps): ReactElement => (
  <div className="ods-transaction-list__content">
    <ContentList
      title={title}
      description={description}
      strikethroughDescription={strikethroughDescription}
      caption={caption}
      inverted={inverted}
      type={disabled ? 'inactive' : status}
      size={contentSize}
    />
    <AmountDetails
      amount={amount}
      type={disabled ? 'inactive' : amountType}
      size={amountSize}
      strikethroughAmount={strikethroughAmount}
      tag={amountTag}
      indicator={amountIndicator}
      showIndicator={showAmountIndicator}
      additionalData={additionalData}
      showAdditionalData={Boolean(additionalData)}
    />
  </div>
);

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
