import React, { ReactNode } from 'react';
import classNames from 'classnames';
import ContentList, {
  ContentListProps,
} from '../_shared/components/ContentList';
import SkeletonBar from '../_shared/components/SkeletonBar';

export type CardListReadOnlyProps = {
  /**
   * The title of the card list read only.
   */
  title: string;
  /**
   * The description or secondary text of the card.
   */
  description?: string;
  /**
   * Description with strikethrough text.
   */
  strikethroughDescription?: string;
  /**
   * Caption or tertiary text of the card.
   */
  caption?: string;
  /**
   * Icon displayed at the beginning of the card.
   */
  icon?: ReactNode;
  /**
   * Indicator/badge displayed at the end of the card.
   */
  indicator?: ReactNode;
  /**
   * The style type of the card content.
   * @default 'default'
   */
  type?: ContentListProps['type'];
  /**
   * Inverts the position of title and description.
   * @default false
   */
  inverted?: boolean;
  /**
   * If true, the card will be visually disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If true, shows a loading state with skeleton.
   * @default false
   */
  loading?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

const CardListReadOnly = React.forwardRef<
  HTMLDivElement,
  CardListReadOnlyProps
>(
  (
    {
      title,
      description,
      strikethroughDescription,
      caption,
      icon,
      indicator,
      type = 'default',
      inverted = false,
      disabled = false,
      loading = false,
      className,
      ...rest
    },
    ref
  ) => {
    if (loading) {
      return (
        <div
          ref={ref}
          data-testid='card-list-readonly'
          className={classNames(
            'ods-card-list-readonly',
            'ods-card-list-readonly--loading',
            className
          )}
          {...rest}
        >
          <div className='ods-card-list-readonly__skeleton'>
            <SkeletonBar width='100%' height='24px' />
            <SkeletonBar width='80%' height='20px' />
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        data-testid='card-list-readonly'
        className={classNames('ods-card-list-readonly', className, {
          'ods-card-list-readonly--disabled': disabled,
        })}
        {...rest}
      >
        {icon && <div className={classNames('ods-card-list-readonly__icon', {
          'ods-card-list-readonly__icon--inactive': type === 'inactive',
        })}>{icon}</div>}
        <ContentList
          title={title}
          description={description}
          strikethroughDescription={strikethroughDescription}
          caption={caption}
          inverted={inverted}
          type={type}
        />
        {indicator && (
          <div className='ods-card-list-readonly__trailing'>
            <div className='ods-card-list-readonly__indicator'>{indicator}</div>
          </div>
        )}
      </div>
    );
  }
);

CardListReadOnly.displayName = 'CardListReadOnly';

export default CardListReadOnly;

