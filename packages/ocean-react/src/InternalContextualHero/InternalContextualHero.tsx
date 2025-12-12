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
  title: string;
  description: string;
  image?: string | ReactNode;
  listItems: (ReactNode | InternalContextualHeroListItemString)[];
  actions?: [InternalContextualHeroAction] | [InternalContextualHeroAction, InternalContextualHeroAction];
  className?: string;
};

const InternalContextualHero = React.forwardRef<HTMLDivElement, InternalContextualHeroProps>(
  ({ title, description, image, listItems, actions, className }, ref) => {
    const renderImage = () => {
      if (typeof image === 'string') {
        return <img src={image} alt={title} />;
      }
      return image;
    };

    return (
      <div
        data-testid="internal-contextual-hero"
        className={classNames('ods-internal-contextual-hero', className)}
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
                <Button variant='primary' size='sm' onClick={actions[0].onClick}>
                  {actions[0].label}
                </Button>
                {actions[1] && (
                  <Button variant='tertiary' size='sm' onClick={actions[1].onClick}>
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
                  {item.icon && <div>{item.icon}</div>}
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

