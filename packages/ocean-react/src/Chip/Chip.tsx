import React from 'react';

import classNames from 'classnames';

import Button from '../Button';
import Badge from '../Badge';

import useChip from './hook/useChip';

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
  disabled?: boolean;
  onClick?: () => void;
} & React.ComponentPropsWithoutRef<'div'>;

const Chip: React.FC<IChipProps> = ({
  label = '',
  className = '',
  isActive = false,
  counter = 0,
  iconLeft = null,
  disabled = false,
  onClick = null,
}) => {
  const { openDropdown, handleOpenDropdown, handleCloseDropdown } = useChip();

  return (
    <div className={classNames('ods-chip', className)}>
      <Button
        variant="secondary"
        className={classNames('ods-chip__button', isActive && 'active')}
        size="sm"
        onClick={onClick ?? handleOpenDropdown}
        disabled={disabled}
      >
        {!!iconLeft && <span className="ods-chip__lefticon">{iconLeft}</span>}
        {label}
        {counter !== 0 && (
          <Badge
            count={counter}
            className={classNames(
              !isActive && 'ods-chip__badge',
              disabled && 'ods-chip__badge-disabled'
            )}
          />
        )}
      </Button>
      {openDropdown && (
        <div className={classNames('ods-chip__dropdown')}>any</div>
      )}
      <div
        onClick={handleCloseDropdown}
        className={classNames(
          'ods-chip__overlay',
          openDropdown && 'ods-chip__overlay-open'
        )}
      />
    </div>
  );
};

export default Chip;
