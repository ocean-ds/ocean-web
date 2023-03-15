import React from 'react';

import classNames from 'classnames';

import { ChevronDown, ChevronUp } from '@useblu/ocean-icons-react';

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
  hideDropdownIcon?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode | JSX.Element;
} & React.ComponentPropsWithoutRef<'div'>;

const Chip: React.FC<IChipProps> = ({
  label = '',
  className = '',
  isActive = false,
  counter = 0,
  iconLeft = null,
  hideDropdownIcon = false,
  disabled = false,
  onClick = null,
  children,
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
        {!hideDropdownIcon && children && openDropdown && (
          <ChevronUp size={16} />
        )}

        {!hideDropdownIcon && children && !openDropdown && (
          <ChevronDown size={16} />
        )}
      </Button>
      {openDropdown && (
        <div className={classNames('ods-chip__dropdown')}>{children}</div>
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
