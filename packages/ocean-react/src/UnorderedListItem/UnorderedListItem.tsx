import React from 'react';
import { ChevronRight } from '@useblu/ocean-icons-react';
import classNames from 'classnames';
import Typography from '../Typography';

export type IconType = React.ForwardRefExoticComponent<
  {
    size: number | undefined;
  } & React.SVGProps<SVGSVGElement> &
    React.RefAttributes<SVGSVGElement>
>;

export type UnorderedListItemProps = {
  description: string;
  iconVariant: 'chevron' | 'outline' | 'solid';
  icon?: IconType;
  title?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const UnorderedListItem = React.forwardRef<
  HTMLDivElement,
  UnorderedListItemProps
>(
  (
    { description, icon: Icon, title, className, iconVariant, ...rest },
    ref
  ): JSX.Element => (
    <div
      ref={ref}
      className={classNames('ods-unordered-list-item', className)}
      {...rest}
    >
      {Icon && iconVariant !== 'chevron' ? (
        <Icon
          size={iconVariant === 'solid' ? 20 : 24}
          className="ods-unordered-list-item__icon"
        />
      ) : (
        <span className="ods-unordered-list-item__icon-container">
          <ChevronRight size={16} />
        </span>
      )}
      <span>
        {title && (
          <Typography
            variant="paragraph"
            className={classNames(
              'ods-unordered-list-item__title',
              iconVariant === 'solid' &&
                'ods-unordered-list-item__title--with-solid-icon'
            )}
          >
            {title}
          </Typography>
        )}
        <Typography
          variant="description"
          className={classNames(
            !title && 'ods-unordered-list-item__description'
          )}
        >
          {description}
        </Typography>
      </span>
    </div>
  )
);

UnorderedListItem.displayName = 'UnorderedListItem';

export default UnorderedListItem;
