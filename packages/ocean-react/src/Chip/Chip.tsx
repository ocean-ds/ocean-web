import React from 'react';

import classNames from 'classnames';

import Button from '../Button';
import Badge from '../Badge';

export type IChipProps = {
  /**
   * Determines label of chip component
   * @default '''
   */
  label: string;
  className?: string;
  isActive?: boolean;
  counter?: number;
  iconLeft?: React.ForwardRefExoticComponent<
    {
      size: number | undefined;
    } & React.SVGProps<SVGSVGElement> &
      React.RefAttributes<SVGSVGElement>
  >;
  onClick?: () => void;
} & React.ComponentPropsWithoutRef<'div'>;

const Chip: React.FC<IChipProps> = ({
  label = '',
  className = '',
  isActive = false,
  counter = 0,
  iconLeft = null,
  onClick,
}) => (
  <div className={classNames('ods-chip', className)}>
    <Button
      variant="secondary"
      className={classNames('ods-chip__button', isActive ? 'active' : '')}
      size="sm"
      onClick={onClick}
    >
      {!!iconLeft && <span className="ods-chip__lefticon">{iconLeft}</span>}
      {label}
      {counter !== 0 && (
        <Badge count={counter} className={!isActive ? 'ods-chip__badge' : ''} />
      )}
    </Button>
  </div>
);

export default Chip;
