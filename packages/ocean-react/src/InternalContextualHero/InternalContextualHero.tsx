import React, { ReactNode } from 'react';
import classNames from 'classnames';
import Typography from '../Typography';
import Button from '../Button';

export type InternalContextualHeroListItemString = {
  /**
   * Icon element to be displayed before the description.
   */
  icon?: ReactNode;
  /**
   * Text content of the list item.
   */
  description: string;
};

export type InternalContextualHeroAction = {
  /**
   * Text displayed on the action button.
   */
  label: string;
  /**
   * Callback function triggered when the action button is clicked.
   */
  onClick: () => void;
};

export type InternalContextualHeroProps = {
  /**
   * Defines the visual style variant of the hero component.
   * @default 'default'
   */
  type?: 'default' | 'warning' | 'negative';
  /**
   * Main title text displayed in the hero header.
   */
  title: string;
  /**
   * Description text displayed below the title.
   */
  description: string;
  /**
   * Image to be displayed in the hero. Can be a URL string or a React node.
   */
  image?: string | ReactNode;
  /**
   * List of items to be displayed in the hero body.
   * Each item can be a React node or an object with icon and description.
   */
  listItems: (ReactNode | InternalContextualHeroListItemString)[];
  /**
   * Action buttons to be displayed in the hero.
   * Accepts one or two actions (primary and optional secondary).
   */
  actions?: [InternalContextualHeroAction] | [InternalContextualHeroAction, InternalContextualHeroAction];
  /**
   * Additional CSS class name to apply to the root element.
   */
  className?: string;
  /**
   * Position of the image relative to the content.
   * @default 'top'
   */
  imagePosition?: 'top' | 'bottom' | 'full';
};

const isListItemString = (
  item: ReactNode | InternalContextualHeroListItemString
): item is InternalContextualHeroListItemString =>
  typeof item === 'object' && item !== null && 'description' in item;

const primaryButtonVariants = {
  default: 'primary',
  warning: 'primaryWarning',
  negative: 'primaryCritical',
} as const;

const secondaryButtonVariants = {
  default: 'tertiary',
  warning: 'tertiaryWarning',
  negative: 'tertiaryCritical',
} as const;

const InternalContextualHero = React.forwardRef<HTMLDivElement, InternalContextualHeroProps>(
  ({ title, description, image, listItems, actions, className, imagePosition = 'top', type = 'default' }, ref) => {
    const renderImage = () => {
      if (typeof image === 'string') {
        return <img src={image} alt={title} />;
      }
      return image;
    };

    return (
      <div
        data-testid="internal-contextual-hero"
        className={classNames('ods-internal-contextual-hero', className, {
          [`ods-internal-contextual-hero--${type}`]: type,
          [`ods-internal-contextual-hero--${imagePosition}`]: imagePosition,
        })}
        ref={ref}
      >
        <div className='ods-internal-contextual-hero__body'>
          <div className='ods-internal-contextual-hero__content'>
            <div className='ods-internal-contextual-hero__header'>
              <Typography variant="heading3">{title}</Typography>
              <Typography variant="description">{description}</Typography>
            </div>
            {actions && actions.length > 0 && (
              <div className='ods-internal-contextual-hero__actions'>
                <Button variant={primaryButtonVariants[type]} size='sm' onClick={actions[0].onClick}>
                  {actions[0].label}
                </Button>
                {actions[1] && (
                  <Button variant={secondaryButtonVariants[type]} size='sm' onClick={actions[1].onClick}>
                    {actions[1].label}
                  </Button>
                )}
              </div>
            )}
          </div>
          <div className='ods-internal-contextual-hero__list'>
            {listItems?.map((item) =>
              isListItemString(item) ? (
                <div key={item.description} className='ods-internal-contextual-hero__list-item'>
                  {item.icon && <div className="ods-internal-contextual-hero__list-item-icon">{item.icon}</div>}
                  <Typography variant="description">{item.description}</Typography>
                </div>
              ) : (
                item
              )
            )}
          </div>
        </div>
        {image && (
          <div className='ods-internal-contextual-hero__image'>
            {renderImage()}
          </div>
        )}
      </div>
    );
  }
);

InternalContextualHero.displayName = 'InternalContextualHero';

export default InternalContextualHero;

