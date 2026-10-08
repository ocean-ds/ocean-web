import React from 'react';
import classNames from 'classnames';
import Checkbox, { CheckboxProps } from '../Checkbox/Checkbox';
import Radio, { RadioProps } from '../Radio/Radio';
import SkeletonBar from '../_shared/components/SkeletonBar';
import {
  TransactionListBaseProps,
  TransactionListContent,
  TransactionListDivider,
  TransactionListSkeleton,
} from '../_shared/components/TransactionListParts';

// No leading icon: in the Figma the control occupies the leading slot.
export type TransactionListSelectableProps = Omit<
  TransactionListBaseProps,
  'icon' | 'iconColor'
> & {
  /**
   * Typography scale of the content block, independent from `amountSize`.
   * @default 'md'
   */
  contentSize?: TransactionListBaseProps['contentSize'];
  /**
   * Size of the amount block, independent from `contentSize`.
   * @default 'md'
   */
  amountSize?: TransactionListBaseProps['amountSize'];
  /**
   * Props of the checkbox control (default control). `checked`, `indeterminate`,
   * `error` and `onChange` go here.
   */
  checkbox?: CheckboxProps;
  /**
   * Props of the radio control. When provided, a radio is rendered instead of the checkbox.
   */
  radio?: RadioProps;
  /**
   * `web`: control on the left. `app`: control on the right.
   * @default 'web'
   */
  platform?: 'web' | 'app';
  /**
   * Shows the divider below the item (inset 16, multiply).
   * @default true
   */
  showDivider?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

/**
 * Transaction row selectable by its value, with a checkbox or a radio.
 * Figma: Transaction List Selectable (Platform Web | App, Controller Checkbox | Radio).
 */
const TransactionListSelectable = React.forwardRef<
  HTMLDivElement,
  TransactionListSelectableProps
>(
  (
    {
      title,
      description,
      strikethroughDescription,
      caption,
      inverted = true,
      status = 'default',
      contentSize = 'md',
      amount,
      amountType = 'default',
      amountSize = 'md',
      strikethroughAmount,
      amountTag,
      amountIndicator,
      showAmountIndicator = true,
      additionalData,
      disabled = false,
      loading = false,
      checkbox,
      radio,
      platform = 'web',
      showDivider = true,
      className,
      ...rest
    },
    ref
  ) => {
    const controlDisabled = Boolean(
      disabled || checkbox?.disabled || radio?.disabled
    );

    const content = (
      <TransactionListContent
        title={title}
        description={description}
        strikethroughDescription={strikethroughDescription}
        caption={caption}
        inverted={inverted}
        status={status}
        contentSize={contentSize}
        amount={amount}
        amountType={amountType}
        amountSize={amountSize}
        strikethroughAmount={strikethroughAmount}
        amountTag={amountTag}
        amountIndicator={amountIndicator}
        showAmountIndicator={showAmountIndicator}
        additionalData={additionalData}
        disabled={controlDisabled}
      />
    );

    const renderControl = () =>
      radio ? (
        <Radio {...radio} disabled={controlDisabled} label={content} />
      ) : (
        <Checkbox {...checkbox} disabled={controlDisabled} label={content} />
      );

    return (
      <div
        ref={ref}
        data-testid="transaction-list-selectable"
        className={classNames(
          'ods-transaction-list',
          'ods-transaction-list--selectable',
          `ods-transaction-list--${platform}`,
          {
            'ods-transaction-list--disabled': controlDisabled,
            'ods-transaction-list--loading': loading,
          },
          className
        )}
        aria-busy={loading || undefined}
        {...rest}
      >
        {loading ? (
          <div className="ods-transaction-list__main">
            <div className="ods-transaction-list__control" aria-hidden>
              <SkeletonBar width="20px" height="20px" />
            </div>
            <TransactionListSkeleton showLeading={false} />
          </div>
        ) : (
          renderControl()
        )}
        {showDivider && <TransactionListDivider />}
      </div>
    );
  }
);

TransactionListSelectable.displayName = 'TransactionListSelectable';

export default TransactionListSelectable;
