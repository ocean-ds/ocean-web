import React from 'react';
import classNames from 'classnames';

import { ChevronLeft, ChevronRight } from '@useblu/ocean-icons-react';

export type NavBarProps = {
  onPreviousClick: () => void;
  onNextClick: () => void;
  className: string;
};

const NavBar = React.forwardRef<HTMLDivElement, NavBarProps>(function Navbar({
  onPreviousClick,
  onNextClick,
  className,
}: NavBarProps) {
  return (
    <div className={className}>
      <button
        type="button"
        className={classNames(
          'ods-datepicker-navbuttons',
          'ods-datepicker-navButtonPrev'
        )}
        onClick={() => onPreviousClick()}
      >
        <ChevronLeft width={18} height={18} />
      </button>
      <button
        type="button"
        className={classNames(
          'ods-datepicker-navbuttons',
          'ods-datepicker-navButtonNext'
        )}
        onClick={() => onNextClick()}
      >
        <ChevronRight width={18} height={18} />
      </button>
    </div>
  );
});

export default NavBar;
