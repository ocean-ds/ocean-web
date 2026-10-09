import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { ChevronDown, ChevronUp } from '@useblu/ocean-icons-react';
import {
  ContentListProps,
  ContentListSize,
} from '../_shared/components/ContentList';
import {
  AmountDetailsProps,
  AmountDetailsSize,
  AmountDetailsTag,
} from '../_shared/components/AmountDetails';
import SkeletonBar from '../_shared/components/SkeletonBar';
import {
  ContentListAmountProps,
  ContentListDefaultProps,
  TransactionListContent,
  TransactionListDensity,
  TransactionListIconColor,
} from '../_shared/components/TransactionListParts';

export type TransactionListExpandableProps = {
  /**
   * Content block (left): title, description, caption. Takes precedence over the flat
   * `title`, `description`, `caption`, `inverted`, `status` and `contentSize` props.
   */
  content?: ContentListDefaultProps;
  /**
   * Amount block (right) as an object: value, type, tag, info. A string keeps the flat
   * API (`amountType`, `amountTag`, `additionalData`…).
   */
  amount: ContentListAmountProps | string;
  /**
   * @deprecated Use `content.title`.
   */
  title?: string;
  /**
   * The description or secondary text of the transaction.
   * @deprecated Use `content.description`.
   */
  description?: string;
  /**
   * Original text shown struck-through before the emphasized text when
   * `status="strikethrough"`.
   * @deprecated Use `content.strikethroughDescription`.
   */
  strikethroughDescription?: string;
  /**
   * Caption or tertiary text.
   * @deprecated Use `content.caption`.
   */
  caption?: string;
  /**
   * Amount visual type (default, positive, negative, strikethrough, strikethrough-neutral).
   * @deprecated Use `amount.type`.
   */
  amountType?: AmountDetailsProps['type'];
  /**
   * Original amount rendered struck-through before `amount`
   * (amount types `strikethrough` and `strikethrough-neutral`).
   * @deprecated Use `amount.strikethroughValue`.
   */
  strikethroughAmount?: string;
  /**
   * Typography scale of the content block (Transaction List family). When omitted, the
   * current rendering is kept.
   * @deprecated Use `content.size`.
   */
  contentSize?: ContentListSize;
  /**
   * Size of the amount block (Transaction List family): `md` value 16 / tag Medium,
   * `sm` value 14 / tag Small. When omitted, the current rendering is kept.
   * @deprecated Use `amount.size`.
   */
  amountSize?: AmountDetailsSize;
  /**
   * Tag shown below the amount, sized from `amountSize` (Medium when `amountSize` is
   * omitted). Takes precedence over `amountIndicator`.
   * @deprecated Use `amount.tag`.
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
   * @deprecated Use `amount.info`.
   */
  additionalData?: string;
  /**
   * Inverts the position of title and description in ContentList.
   * @default true
   * @deprecated Use `content.inverted`.
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
   * @deprecated Use `content.status`.
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
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'children' | 'content'>;

const TransactionListExpandable = React.forwardRef<
  HTMLDivElement,
  TransactionListExpandableProps
>(
  (
    {
      content,
      title = '',
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
    const contentBlock: ContentListDefaultProps = content ?? {
      title,
      description,
      strikethroughDescription,
      caption,
      inverted,
      status,
      size: contentSize,
    };
    const amountBlock: ContentListAmountProps =
      typeof amount === 'string'
        ? {
            value: amount,
            type: amountType,
            strikethroughValue: strikethroughAmount,
            tag: showAmountIndicator ? amountTag : undefined,
            info: additionalData,
            size: amountSize,
          }
        : amount;
    const legacyIndicator =
      typeof amount === 'string' && !amountTag && showAmountIndicator
        ? amountIndicator
        : undefined;

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
              'ods-list-expandable__icon--inactive':
                contentBlock.status === 'inactive',
              [`ods-list-expandable__icon--${
                disabled ? 'disabled' : iconColor
              }`]: iconColor,
            })}
          >
            {icon}
          </div>
        )}
        <TransactionListContent
          className="ods-list-expandable__transaction-content"
          content={contentBlock}
          amount={amountBlock}
          indicator={legacyIndicator}
          disabled={false}
        />
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
          aria-label={`${expanded ? 'Recolher' : 'Expandir'} ${
            contentBlock.title
          }`}
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
