import React, { ReactNode } from 'react';
import classNames from 'classnames';
import ContentList, {
  ContentListProps,
} from '../_shared/components/ContentList';
import SkeletonBar from '../_shared/components/SkeletonBar';
import Button from '../Button';
import Switch from '../Switch';

export type CardListSettingsProps = {
  /**
   * The title of the card list settings.
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
   * The style type of the card content.
   * @default 'default'
   */
  type?: ContentListProps['type'];
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
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>;

const CardListSettings = React.forwardRef<HTMLDivElement, CardListSettingsProps>(
  (
    {
      title,
      description,
      strikethroughDescription,
      caption,
      inverted = false,
      type = 'default',
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

    if (loading) {
      return (
        <div
          ref={ref}
          data-testid="card-list-settings"
          className={classNames(
            'ods-card-list-settings',
            'ods-card-list-settings--loading',
            className
          )}
          {...rest}
        >
          <div className="ods-card-list-settings__skeleton">
            <SkeletonBar width="100%" height="24px" />
            <SkeletonBar width="80%" height="20px" />
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        data-testid="card-list-settings"
        className={classNames('ods-card-list-settings', className, {
          'ods-card-list-settings--disabled': disabled,
        })}
        {...rest}
      >
        {icon && <div className="ods-card-list-settings__icon">{icon}</div>}
        <ContentList
          title={title}
          description={description}
          strikethroughDescription={strikethroughDescription}
          caption={caption}
          inverted={inverted}
          type={type}
        />
        <div className="ods-card-list-settings__action">
          {renderActionElement()}
        </div>
      </div>
    );
  }
);

CardListSettings.displayName = 'CardListSettings';

export default CardListSettings;
