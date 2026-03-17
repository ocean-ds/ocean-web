import React, { ReactNode, useMemo } from 'react';
import classNames from 'classnames';
import ContentList, {
  ContentListProps,
} from '../_shared/components/ContentList/ContentList';
import Checkbox, { CheckboxProps } from '../Checkbox/Checkbox';
import Radio, { RadioProps } from '../Radio/Radio';
import SkeletonBar from '../_shared/components/SkeletonBar';
import ListReadOnly from '../ListReadOnly/ListReadOnly';
import ListContainer, {
  ListContainerHighlight,
} from '../_shared/components/ListContainer';

interface ListSelectableProps {
  /** Required main title displayed on the list item. */
  title: string;
  /** Optional secondary text rendered below the title. */
  description?: string;
  /** Optional caption shown in a smaller, auxiliary style. */
  caption?: string;
  /** Optional strikethrough text shown when `status="strikethrough"` */
  strikethroughDescription?: string;
  /** Swap the order of title/description to emphasize the description. */
  inverted?: boolean;
  /** Show a loading skeleton instead of the content. */
  loading?: boolean;
  /** Disable interaction and apply the inactive visual state. */
  disabled?: boolean;
  /** Props forwarded to the inner Checkbox component. */
  checkbox?: CheckboxProps;
  /** Props forwarded to the inner Radio component. */
  radio?: RadioProps;
  /** Additional classes applied to the root . */
  className?: string;
  /** Controls whether the horizontal divider is rendered. */
  showDivider?: boolean;
  /** Optional visual indicator element (Badge, Tag, etc.). */
  indicator?: ReactNode;
  /** Visual state applied to the text content (`default`, `warning`, etc.). */
  status?: ContentListProps['type'];
  /** Layout style of the wrapper: `text` keeps inline divider, `card` shows borders. */
  type?: 'card' | 'text';
  /** Platform context used to adjust spacing (web or app). */
  platform?: 'web' | 'app';
  /** If the selectable is disabled, the input will be hidden. */
  isSelectableDisabled?: string;
  /** Renders a highlighted caption area at the bottom of the container. */
  highlight?: ListContainerHighlight;
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
      isSelectableDisabled,
      highlight,
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
    const isInputDisabled = useMemo(
      () => radio?.disabled || checkbox?.disabled || disabled,
      [radio?.disabled, checkbox?.disabled, disabled]
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

    if (isSelectableDisabled) {
      return (
        <ListReadOnly
          title={title}
          description={description}
          status={status}
          type={type}
          inverted={inverted}
          disabled={disabled}
          loading={loading}
          className={className}
          showDivider={showDivider}
          indicator={indicator}
          caption={caption}
          strikethroughDescription={strikethroughDescription}
          highlight={highlight}
          {...rest}
          ref={ref}
        />
      );
    }

    return (
      <ListContainer
        type={type}
        showDivider={showDivider}
        hasError={hasError}
        highlight={highlight}
      >
        <div
          className={classNames('ods-list-selectable', className, {
            'ods-list-selectable--disabled': isInputDisabled,
            [`ods-list-selectable--${platform}`]: platform,
          })}
          ref={ref}
          {...rest}
        >
          {checkbox && <Checkbox {...checkbox} label={internalList} />}
          {radio && <Radio {...radio} label={internalList} />}
        </div>
      </ListContainer>
    );
  }
);

ListSelectable.displayName = 'ListSelectable';
export default ListSelectable;
