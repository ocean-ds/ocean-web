import React, { ReactNode } from 'react';
import classNames from 'classnames';
import Typography from '../Typography';
import Button from '../Button';

export type InternalContextualHeroListItemString = {
  icon?: ReactNode;
  description: string;
};

export type InternalContextualHeroAction = {
  label: string;
  onClick: () => void;
};

const isListItemString = (
  item: ReactNode | InternalContextualHeroListItemString
): item is InternalContextualHeroListItemString =>
  typeof item === 'object' && item !== null && 'description' in item;

export type InternalContextualHeroProps = {
  type?: 'default' | 'warning' | 'negative'
  title: string;
  description: string;
  image?: string | ReactNode;
  listItems: (ReactNode | InternalContextualHeroListItemString)[];
  actions?: [InternalContextualHeroAction] | [InternalContextualHeroAction, InternalContextualHeroAction];
  className?: string;
  imagePosition?: 'top' | 'bottom' | 'full';
};

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

