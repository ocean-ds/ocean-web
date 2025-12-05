import React, { ReactNode, useMemo } from 'react';
import classNames from 'classnames';
import ContentList, {
  ContentListProps,
} from '../_shared/components/ContentList/ContentList';
import Checkbox, { CheckboxProps } from '../Checkbox/Checkbox';
import Radio, { RadioProps } from '../Radio/Radio';
import SkeletonBar from '../_shared/components/SkeletonBar';

interface ListSelectableProps {
  title: string;
  description?: string;
  caption?: string;
  strikethroughDescription?: string;
  inverted?: boolean;
  loading?: boolean;
  disabled?: boolean;
  checkbox?: CheckboxProps;
  radio?: RadioProps;
  className?: string;
  showDivider?: boolean;
  indicator?: ReactNode;
  status?: ContentListProps['type'];
  type?: 'card' | 'text';
  platform?: 'web' | 'app';
}

const ListSelectable = React.forwardRef<HTMLDivElement, ListSelectableProps>(
  (
    {
      title,
      description,
      caption,
      strikethroughDescription,
      inverted,
      loading,
      disabled,
      checkbox,
      radio,
      className,
      showDivider,
      indicator,
      status = 'default',
      type = 'card',
      platform = 'web',
      ...rest
    },
    ref
  ) => {
    const hasError = useMemo(
      () => radio?.error || checkbox?.error,
      [radio?.error, checkbox?.error]
    );

    const internalList = useMemo(
      () => (
        <>
          <ContentList
            title={title}
            description={description}
            strikethroughDescription={strikethroughDescription}
            caption={caption}
            inverted={inverted}
            type={disabled ? 'inactive' : status}
          />
          {indicator && (
            <div
              className={classNames('ods-list-selectable__indicator', {
                [`ods-list-selectable__indicator--${platform}`]: platform,
              })}
            >
              {indicator}
            </div>
          )}
        </>
      ),
      [
        title,
        description,
        caption,
        strikethroughDescription,
        inverted,
        status,
        indicator,
        disabled,
        platform,
      ]
    );

    if (loading) {
      return (
        <div className="ods-list-selectable--loading">
          <SkeletonBar width="40%" height="16px" />
          <SkeletonBar width="100%" height="16px" />
        </div>
      );
    }

    return (
      <div
        className={classNames('ods-list-selectable__container', {
          [`ods-list-selectable__container--${type}`]: type,
          [`ods-list-selectable__container--${type}--error`]: hasError,
        })}
      >
        <div
          className={classNames('ods-list-selectable', className, {
            'ods-list-selectable--disabled': disabled,
            [`ods-list-selectable--${platform}`]: platform,
          })}
          ref={ref}
          {...rest}
        >
          {checkbox && <Checkbox {...checkbox} label={internalList} />}
          {radio && <Radio {...radio} label={internalList} />}
        </div>
        {showDivider && type === 'text' && (
          <div className="ods-list-selectable__container--text--divider" />
        )}
      </div>
    );
  }
);

ListSelectable.displayName = 'ListSelectable';
export default ListSelectable;
