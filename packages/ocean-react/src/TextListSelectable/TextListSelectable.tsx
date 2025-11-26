import React, { ReactNode, useMemo } from 'react';
import classNames from 'classnames';
import ContentList, {
  ContentListProps,
} from '../_shared/components/ContentList/ContentList';
import Checkbox, { CheckboxProps } from '../Checkbox/Checkbox';
import Radio, { RadioProps } from '../Radio/Radio';
import SkeletonBar from '../_shared/components/SkeletonBar';

interface TextListSelectableProps {
  title: string;
  description?: string;
  caption?: string;
  strikethroughDescription?: string;
  inverted?: boolean;
  type?: ContentListProps['type'];
  loading?: boolean;
  disabled?: boolean;
  checkbox?: CheckboxProps;
  radio?: RadioProps;
  className?: string;
  showDivider?: boolean;
  indicator?: ReactNode;
  platform?: 'web' | 'app';
}

const TextListSelectable = React.forwardRef<
  HTMLDivElement,
  TextListSelectableProps
>(
  (
    {
      title,
      description,
      caption,
      strikethroughDescription,
      inverted,
      type,
      loading,
      disabled,
      checkbox,
      radio,
      className,
      showDivider,
      indicator,
      platform = 'web',
      ...rest
    },
    ref
  ) => {
    const internalList = useMemo(
      () => (
        <>
          <ContentList
            title={title}
            description={description}
            strikethroughDescription={strikethroughDescription}
            caption={caption}
            inverted={inverted}
            type={disabled ? 'inactive' : type}
          />
          {indicator && (
            <div
              className={classNames('ods-text-list-selectable__indicator', {
                [`ods-text-list-selectable__indicator--${platform}`]: platform,
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
        type,
        indicator,
        disabled,
        platform,
      ]
    );

    if (loading) {
      return (
        <div className="ods-text-list-selectable--loading">
          <SkeletonBar width="30%" height="16px" />
          <SkeletonBar width="100%" height="16px" />
        </div>
      );
    }

    return (
      <div>
        <div
          className={classNames('ods-text-list-selectable', className, {
            'ods-text-list-selectable--disabled': disabled,
            [`ods-text-list-selectable--${platform}`]: platform,
          })}
          ref={ref}
          {...rest}
        >
          {checkbox && (
            <Checkbox disabled={disabled} {...checkbox} label={internalList} />
          )}
          {radio && (
            <Radio disabled={disabled} {...radio} label={internalList} />
          )}
        </div>
        {showDivider && <div className="ods-text-list-selectable__divider" />}
      </div>
    );
  }
);

TextListSelectable.displayName = 'TextListSelectable';
export default TextListSelectable;
