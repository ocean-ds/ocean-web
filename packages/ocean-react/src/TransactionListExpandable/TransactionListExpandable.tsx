import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { ChevronDown, ChevronUp } from '@useblu/ocean-icons-react';
import ContentList, {
  ContentListProps,
} from '../_shared/components/ContentList';
import AmountDetails, {
  AmountDetailsProps,
} from '../_shared/components/AmountDetails';
import SkeletonBar from '../_shared/components/SkeletonBar';

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
   * Caption or tertiary text.
   */
  caption?: string;
  /**
   * Amount to display on the right (e.g. "R$ 0,00").
   */
  amount: string;
  /**
   * Amount visual type (default, positive, negative).
   */
  amountType?: AmountDetailsProps['type'];
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
   * @default true (per Figma Transaction List Expandable)
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
   * Icon displayed at the beginning of the row.
   */
  icon?: ReactNode;
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
   * Content to display when expanded (e.g. ListAction as child transaction list actions).
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
   * If true, shows a divider between the main row and the expanded content.
   * @default true (per Figma)
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
      caption,
      amount,
      amountType = 'default',
      amountIndicator,
      showAmountIndicator = true,
      additionalData,
      inverted = true,
      type = 'card',
      status = 'default',
      loading = false,
      icon,
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
      <div className="ods-list-expandable__skeleton">
        <SkeletonBar width="40%" height="16px" />
        <SkeletonBar width="100%" height="16px" />
      </div>
    );

    const renderContent = () => (
      <>
        {icon && (
          <div
            className={classNames('ods-list-expandable__icon', {
              'ods-list-expandable__icon--inactive': status === 'inactive',
            })}
          >
            {icon}
          </div>
        )}
        <div className="ods-list-expandable__transaction-content">
          <ContentList
            title={title}
            description={description}
            caption={caption}
            inverted={inverted}
            type={status}
          />
          <AmountDetails
            amount={amount}
            type={amountType}
            indicator={amountIndicator}
            indicatorSize="medium"
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
              <div className="ods-list-expandable__content">{children}</div>
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
