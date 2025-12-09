import React, { ReactNode } from 'react';
import classNames from 'classnames';
import Typography from '../Typography';
import Button from '../Button';

export type ContextualHeroListItemString = {
  icon?: ReactNode;
  description: string;
};

export type ContextualHeroAction = {
  label: string;
  onClick: () => void;
};

const isListItemString = (
  item: ReactNode | ContextualHeroListItemString
): item is ContextualHeroListItemString =>
  typeof item === 'object' && item !== null && 'description' in item;

export type ContextualHeroProps = {
  title: string;
  description: string;
  image?: string | ReactNode;
  listItems: (ReactNode | ContextualHeroListItemString)[];
  actions?: [ContextualHeroAction] | [ContextualHeroAction, ContextualHeroAction];
  className?: string;
};

const ContextualHero = React.forwardRef<HTMLDivElement, ContextualHeroProps>(
  ({ title, description, image, listItems, actions, className }, ref) => {
    const renderImage = () => {
      if (typeof image === 'string') {
        return <img src={image} alt={title} />;
      }
      return image;
    };

    return (
      <div
        data-testid="contextual-hero"
        className={classNames('ods-contextual-hero', className)}
        ref={ref}
      >
        <div className='ods-contextual-hero__body'>
          <div className='ods-contextual-hero__content'>
            <div className='ods-contextual-hero__header'>
              <Typography variant="heading3">{title}</Typography>
              <Typography variant="description">{description}</Typography>
            </div>
            {actions && actions.length > 0 && (
              <div className='ods-contextual-hero__actions'>
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
          <div className='ods-contextual-hero__list'>
            {listItems?.map((item) =>
              isListItemString(item) ? (
                <div key={item.description} className='ods-contextual-hero__list-item'>
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
          <div className='ods-contextual-hero__image'>
            {renderImage()}
          </div>
        )}
      </div>
    );
  }
);

ContextualHero.displayName = 'ContextualHero';

export default ContextualHero;
