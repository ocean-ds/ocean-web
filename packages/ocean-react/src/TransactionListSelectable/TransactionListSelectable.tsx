import React from 'react';
import classNames from 'classnames';
import Checkbox, { CheckboxProps } from '../Checkbox/Checkbox';
import Radio, { RadioProps } from '../Radio/Radio';
import SkeletonBar from '../_shared/components/SkeletonBar';
import {
  TransactionListBaseProps,
  TransactionListContent,
  splitContentProps,
  TransactionListDivider,
  TransactionListSkeleton,
} from '../_shared/components/TransactionListParts';

// No leading icon: the control occupies the leading slot.
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
 * The control sits on the left (`web`) or on the right (`app`).
 */
const TransactionListSelectable = React.forwardRef<
  HTMLDivElement,
  TransactionListSelectableProps
>(
  (
    {
      contentSize = 'md',
      amountSize = 'md',
      disabled = false,
      loading = false,
      density = 'default',
      checkbox,
      radio,
      platform = 'web',
      showDivider = true,
      className,
      ...props
    },
    ref
  ) => {
    const [contentProps, rest] = splitContentProps(props);
    const controlDisabled = Boolean(
      disabled || checkbox?.disabled || radio?.disabled
    );

    const row = (
      <TransactionListContent
        {...contentProps}
        contentSize={contentSize}
        amountSize={amountSize}
        disabled={controlDisabled}
      />
    );

    const renderControl = () =>
      radio ? (
        <Radio {...radio} disabled={controlDisabled} label={row} />
      ) : (
        <Checkbox {...checkbox} disabled={controlDisabled} label={row} />
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
            'ods-transaction-list--compact': density === 'compact',
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
