import React, { useMemo } from 'react';
import classNames from 'classnames';
import InternalList from '../_shared/components/InternalList/InternalList';
import Checkbox, { CheckboxProps } from '../Checkbox/Checkbox';
import Radio, { RadioProps } from '../Radio/Radio';

interface TextListSelectableProps {
  title: string;
  description?: string;
  caption?: string;
  loading?: boolean;
  disabled?: boolean;
  tagLabel?: string;
  checkbox?: CheckboxProps;
  radio?: RadioProps;
  className?: string;
  showDivider?: boolean;
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
      loading,
      disabled,
      tagLabel,
      checkbox,
      radio,
      className,
      showDivider,
      ...rest
    },
    ref
  ) => {
    const internalList = useMemo(
      () => (
        <InternalList
          title={title}
          description={description}
          caption={caption}
          loading={loading}
          disabled={disabled}
          tagLabel={tagLabel}
        />
      ),
      [title, description, caption, loading, disabled, tagLabel]
    );

    return (
      <div>
        <div
          className={classNames('ods-text-list-selectable', className, {
            'ods-text-list-selectable--disabled': disabled,
            'ods-text-list-item--selectable': checkbox || radio,
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
