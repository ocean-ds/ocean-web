import React, { ReactNode } from 'react';
import classNames from 'classnames';
import ContentList, {
  ContentListProps,
} from '../_shared/components/ContentList';
import SkeletonBar from '../_shared/components/SkeletonBar';
import Button from '../Button';
import Switch from '../Switch';

export type ListSettingsProps = {
  /**
   * The title of the list settings.
   */
  title: string;
  /**
   * The description or secondary text.
   */
  description?: string;
  /**
   * Description with strikethrough text.
   */
  strikethroughDescription?: string;
  /**
   * Caption or tertiary text.
   */
  caption?: string;
  /**
   * Inverts the position of title and description.
   * @default false
   */
  inverted?: boolean;
  /**
   * The type of the border.
   * @default 'card'
   */
  type?: 'card' | 'text';
  /**
   * The status type of the card content.
   * @default 'default'
   */
  status?: ContentListProps['type'];
  /**
   * If true, the card will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If true, shows a loading state with skeleton.
   * @default false
   */
  loading?: boolean;
  /**
   * Icon displayed at the beginning of the card.
   */
  icon?: ReactNode;
  /**
   * The type of action displayed on the card.
   * @default 'button'
   */
  actionType?: 'button' | 'toggle';
  /**
   * Label text for button action.
   * @default 'Label'
   */
  buttonLabel?: string;
  /**
   * Size of the button.
   * @default 'sm'
   */
  buttonSize?: 'sm' | 'md';
  /**
   * Variant of the button.
   * @default 'primary'
   */
  buttonVariant?: 'primary' | 'primaryCritical' | 'secondary' | 'secondaryCritical' | 'tertiary' | 'tertiaryCritical';
  /**
   * Checked state for toggle action.
   * @default false
   */
  toggleChecked?: boolean;
  /**
   * Callback when button is clicked.
   */
  onButtonClick?: () => void;
  /**
   * Callback when toggle state changes.
   */
  onToggleChange?: (checked: boolean) => void;
  /**
   * If true, shows a divider between the cards when type is 'text'.
   * @default false
   */
  showDivider?: boolean;
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>;

const ListSettings = React.forwardRef<HTMLDivElement, ListSettingsProps>(
  (
    {
      title,
      description,
      strikethroughDescription,
      caption,
      inverted = false,
      type = 'card',
      status = 'default',
      disabled = false,
      loading = false,
      icon,
      actionType = 'button',
      buttonLabel = 'Label',
      buttonSize = 'sm',
      buttonVariant = 'primary',
      toggleChecked = false,
      onButtonClick,
      onToggleChange,
      showDivider = false,
      className,
      ...rest
    },
    ref
  ) => {
    const renderActionElement = () => {
      if (actionType === 'button') {
        return (
          <Button
            variant={buttonVariant}
            size={buttonSize}
            onClick={onButtonClick}
            disabled={disabled}
          >
            {buttonLabel}
          </Button>
        );
      }

      if (actionType === 'toggle') {
        return (
          <Switch
            checked={toggleChecked}
            disabled={disabled}
            onChange={(e) => onToggleChange?.(e.target.checked)}
          />
        );
      }

      return null;
    };

    const renderLoadingContent = () => (
      <div className="ods-list-settings__skeleton">
        <SkeletonBar width="40%" height="16px" />
        <SkeletonBar width="100%" height="16px" />
      </div>
    );

    const renderContent = () => (
      <>
        {icon && (
          <div
            className={classNames('ods-list-settings__icon', {
              'ods-list-settings__icon--inactive': status === 'inactive',
            })}
          >
            {icon}
          </div>
        )}
        <ContentList
          title={title}
          description={description}
          strikethroughDescription={strikethroughDescription}
          caption={caption}
          inverted={inverted}
          type={status}
        />
        <div className="ods-list-settings__action">
          {renderActionElement()}
        </div>
      </>
    );

    const containerClassName = classNames('ods-list-settings', className, {
      'ods-list-settings--loading': loading,
      'ods-list-settings--disabled': disabled,
      [`ods-list-settings--${type}`]: type,
    });

    return (
      <div className="ods-list-settings__container">
        <div
          ref={ref}
          data-testid="list-settings"
          className={containerClassName}
          {...rest}
        >
          {loading ? renderLoadingContent() : renderContent()}
        </div>
        {showDivider && type === 'text' && (
          <div className="ods-list-settings__divider" />
        )}
      </div>
    );
  }
);

ListSettings.displayName = 'ListSettings';

export default ListSettings;
