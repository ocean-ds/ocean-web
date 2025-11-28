import React, { ReactNode } from 'react';
import classNames from 'classnames';
import Checkbox from '../Checkbox';
import Radio from '../Radio';
import ContentList from '../_shared/components/ContentList';
import SkeletonBar from '../_shared/components/SkeletonBar';

export type CardListSelectableProps = {
  /**
   * Title of the card.
   */
  title: string;
  /**
   * Description or secondary text of the card.
   */
  description?: string;
  /**
   * Caption or tertiary text of the card.
   */
  caption?: string;
  /**
   * Type of selection control (checkbox or radio).
   */
  controlType?: 'checkbox' | 'radio';
  /**
   * Indicator/badge displayed next to the content.
   */
  indicator?: ReactNode;
  /**
   * Whether the card is disabled.
   */
  disabled?: boolean;
  /**
   * Whether the card is in loading state with skeleton.
   */
  loading?: boolean;
  /**
   * Whether the card has an error state.
   */
  error?: boolean;
  /**
   * Class name for the card container.
   */
  className?: string;
  /**
   * Whether the checkbox is in indeterminate state (only for checkbox).
   */
  indeterminate?: boolean;
} & Omit<
  React.ComponentPropsWithoutRef<'input'>,
  'type' | 'title' | 'className'
>;

const CardListSelectable = React.forwardRef<
  HTMLInputElement,
  CardListSelectableProps
>(
  (
    {
      title,
      description,
      caption,
      controlType = 'checkbox',
      indicator,
      disabled = false,
      loading = false,
      error = false,
      className,
      indeterminate = false,
      checked,
      onChange,
      name,
      value,
      id,
      ...rest
    },
    ref
  ): JSX.Element =>
    loading ? (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label
        className={classNames(
          'ods-card-list-selectable',
          'ods-card-list-selectable--loading',
          className
        )}
        data-testid="card-list-selectable"
        aria-hidden="true"
      >
        <div className="ods-card-list-selectable__skeleton">
          <SkeletonBar width="100%" height="24px" />
          <SkeletonBar width="80%" height="20px" />
        </div>
      </label>
    ) : (
      <label
        htmlFor={id}
        className={classNames('ods-card-list-selectable', className, {
          'ods-card-list-selectable--disabled': disabled,
          'ods-card-list-selectable--error': error,
          'ods-card-list-selectable--checked': checked,
        })}
        data-testid="card-list-selectable"
      >
        <div className="ods-card-list-selectable__control">
          {controlType === 'radio' ? (
            <Radio
              ref={ref}
              id={id}
              name={name}
              value={value}
              checked={checked}
              onChange={onChange}
              disabled={disabled}
              error={error}
              {...rest}
            />
          ) : (
            <Checkbox
              ref={ref}
              id={id}
              name={name}
              value={value}
              checked={checked}
              onChange={onChange}
              disabled={disabled}
              indeterminate={indeterminate}
              error={error}
              {...rest}
            />
          )}
        </div>
        <div className="ods-card-list-selectable__content">
          <ContentList
            title={title}
            description={description}
            caption={caption}
            type={disabled ? 'inactive' : 'default'}
          />
          {indicator && (
            <div className="ods-card-list-selectable__indicator">
              {indicator}
            </div>
          )}
        </div>
      </label>
    )
);

CardListSelectable.displayName = 'CardListSelectable';

export default CardListSelectable;

