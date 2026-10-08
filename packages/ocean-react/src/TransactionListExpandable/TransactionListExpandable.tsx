import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { ChevronDown, ChevronUp } from '@useblu/ocean-icons-react';
import ContentList, {
  ContentListProps,
  ContentListSize,
} from '../_shared/components/ContentList';
import AmountDetails, {
  AmountDetailsProps,
  AmountDetailsSize,
  AmountDetailsTag,
} from '../_shared/components/AmountDetails';
import SkeletonBar from '../_shared/components/SkeletonBar';
import type {
  TransactionListDensity,
  TransactionListIconColor,
} from '../_shared/components/TransactionListParts';

export type TransactionListExpandableProps = {
  /**
   * The title of the transaction (primary text, description style when inverted).
   */
  title: string;
  /**
   * The description or secondary text of the transaction.
   */
  description?: string;
  /**
   * Original text shown struck-through before the emphasized text when
   * `status="strikethrough"`.
   */
  strikethroughDescription?: string;
  /**
   * Caption or tertiary text.
   */
  caption?: string;
  /**
   * Amount to display on the right (e.g. "R$ 0,00").
   */
  amount: string;
  /**
   * Amount visual type (default, positive, negative, strikethrough, strikethrough-neutral).
   */
  amountType?: AmountDetailsProps['type'];
  /**
   * Original amount rendered struck-through before `amount`
   * (amount types `strikethrough` and `strikethrough-neutral`).
   */
  strikethroughAmount?: string;
  /**
   * Typography scale of the content block (Transaction List family). When omitted, the
   * current rendering is kept.
   */
  contentSize?: ContentListSize;
  /**
   * Size of the amount block (Transaction List family): `md` value 16 / tag Medium,
   * `sm` value 14 / tag Small. When omitted, the current rendering is kept.
   */
  amountSize?: AmountDetailsSize;
  /**
   * Tag shown below the amount, sized from `amountSize` (Medium when `amountSize` is
   * omitted). Takes precedence over `amountIndicator`.
   */
  amountTag?: AmountDetailsTag;
  /**
   * Indicator/tag shown next to the amount (e.g. Tag with status).
   */
  amountIndicator?: ReactNode;
  /**
   * Whether to show the amount indicator.
   * @default true
   */
  showAmountIndicator?: boolean;
  /**
   * Additional data below the amount (caption). Shown only when this string is provided.
   */
  additionalData?: string;
  /**
   * Inverts the position of title and description in ContentList.
   * @default true
   */
  inverted?: boolean;
  /**
   * The style type (card or text).
   * @default 'card'
   */
  type?: 'card' | 'text';
  /**
   * Status type of the content list.
   * @default 'default'
   */
  status?: ContentListProps['type'];
  /**
   * If true, shows a loading state with skeleton.
   * @default false
   */
  loading?: boolean;
  /**
   * Icon displayed at the beginning of the row. With `iconColor` it takes that color
   * (pass it without its own color).
   */
  icon?: ReactNode;
  /**
   * Color of the leading icon (Transaction List family): `default` Interface/Dark/Up,
   * `on-color` Interface/Dark/Down (colored backgrounds), `highlight` Brand/Primary/Down.
   * `disabled` always forces Interface/Light/Deep. When omitted, the current rendering is kept.
   */
  iconColor?: TransactionListIconColor;
  /**
   * Vertical density of the row (Transaction List family): \`compact\` sets top and bottom
   * padding to 8 (the skeleton follows). Children set their own \`density\`.
   * @default 'default'
   */
  density?: TransactionListDensity;
  /**
   * Whether the content is expanded.
   * @default false
   */
  expanded?: boolean;
  /**
   * Callback when the expanded state changes.
   */
  onToggle?: (expanded: boolean) => void;
  /**
   * Content to display when expanded — the child rows
   * (`TransactionListChildAction` / `TransactionListChildReadOnly`).
   */
  children?: ReactNode;
  /**
   * Supporting text shown below the expanded children.
   */
  supportingText?: ReactNode;
  /**
   * If true, the row is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If true, shows a divider below the item (below the expanded content when open).
   * @default false
   */
  showDivider?: boolean;
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>;

const TransactionListExpandable = React.forwardRef<
  HTMLDivElement,
  TransactionListExpandableProps
>(
  (
    {
      title,
      description,
      strikethroughDescription,
      caption,
      amount,
      amountType = 'default',
      strikethroughAmount,
      contentSize,
      amountSize,
      amountTag,
      amountIndicator,
      showAmountIndicator = true,
      additionalData,
      inverted = true,
      type = 'card',
      status = 'default',
      loading = false,
      icon,
      iconColor,
      density = 'default',
      expanded = false,
      onToggle,
      children,
      supportingText,
      className,
      disabled = false,
      showDivider = false,
      ...rest
    },
    ref
  ) => {
    const handleToggle = () => {
      onToggle?.(!expanded);
    };

    const renderLoadingContent = () => (
      <>
        <div className="ods-list-expandable__icon" aria-hidden>
          <SkeletonBar width="24px" height="24px" />
        </div>
        <div className="ods-list-expandable__skeleton ods-list-expandable__transaction-content">
          <div className="ods-list-expandable__skeleton-list">
            <SkeletonBar width="33%" height="16px" />
            <SkeletonBar width="100%" height="16px" />
          </div>
          <div className="ods-list-expandable__skeleton-amount">
            <SkeletonBar width="100%" height="16px" />
            <SkeletonBar width="100%" height="16px" />
          </div>
        </div>
      </>
    );

    const renderContent = () => (
      <>
        {icon && (
          <div
            className={classNames('ods-list-expandable__icon', {
              'ods-list-expandable__icon--inactive': status === 'inactive',
              [`ods-list-expandable__icon--${
                disabled ? 'disabled' : iconColor
              }`]: iconColor,
            })}
          >
            {icon}
          </div>
        )}
        <div className="ods-list-expandable__transaction-content">
          <ContentList
            title={title}
            description={description}
            strikethroughDescription={strikethroughDescription}
            caption={caption}
            inverted={inverted}
            type={status}
            size={contentSize}
          />
          <AmountDetails
            amount={amount}
            type={amountType}
            size={amountSize}
            strikethroughAmount={strikethroughAmount}
            tag={amountTag}
            indicator={amountIndicator}
            indicatorSize={amountSize ? undefined : 'medium'}
            showIndicator={showAmountIndicator}
            additionalData={additionalData}
            showAdditionalData={Boolean(additionalData)}
          />
        </div>
        <div className="ods-list-expandable__trailing">
          <div className="ods-list-expandable__action">
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </>
    );

    const containerClassName = classNames(
      'ods-list-expandable',
      'ods-list-expandable--transaction',
      className,
      {
        'ods-list-expandable--expanded': expanded,
        'ods-list-expandable--disabled': disabled,
        'ods-list-expandable--loading': loading,
        'ods-list-expandable--compact': density === 'compact',
        [`ods-list-expandable--${type}`]: type,
      }
    );

    return (
      <div
        ref={ref}
        data-testid="transaction-list-expandable"
        className={containerClassName}
        {...rest}
      >
        <button
          type="button"
          className="ods-list-expandable__main"
          onClick={loading ? undefined : handleToggle}
          disabled={disabled || loading}
          aria-expanded={expanded}
          aria-label={`${expanded ? 'Recolher' : 'Expandir'} ${title}`}
          data-testid="transaction-list-expandable-button"
        >
          {loading ? renderLoadingContent() : renderContent()}
        </button>
        {showDivider && !expanded && (
          <div
            className="ods-list-expandable__divider"
            data-testid="transaction-list-expandable-divider"
          />
        )}
        {expanded && !loading && (children || supportingText) && (
          <>
            {children && (
              <div className="ods-list-expandable__content ods-list-expandable__content--transaction">
                {children}
              </div>
            )}
            {supportingText && (
              <div
                className="ods-list-expandable__footer"
                data-testid="transaction-list-expandable-supporting-text"
              >
                {supportingText}
              </div>
            )}
            {showDivider && (
              <div
                className="ods-list-expandable__divider"
                data-testid="transaction-list-expandable-divider"
              />
            )}
          </>
        )}
      </div>
    );
  }
);

TransactionListExpandable.displayName = 'TransactionListExpandable';

export default TransactionListExpandable;
