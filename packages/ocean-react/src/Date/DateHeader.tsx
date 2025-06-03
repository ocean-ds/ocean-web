import React, { useState } from 'react';
import classNames from 'classnames';

import { format, Locale } from 'date-fns';

import { CaptionProps, useNavigation } from 'react-day-picker';

import { ChevronLeft, ChevronRight } from '@useblu/ocean-icons-react';
import IconButton from '../IconButton';

type IProps = CaptionProps & { locale: Locale; mode?: 'single' | 'range' };

const DatePickerHeader: React.FC<IProps> = ({
  displayMonth,
  locale,
  mode = 'range',
}) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();

  const [selectedMonth, setSelectedMonth] = useState<Date>(displayMonth);

  const handlePreviousMonthClick = () => {
    if (previousMonth) {
      goToMonth(previousMonth);
      setSelectedMonth(previousMonth);
    }
  };

  const handleNextMonthClick = () => {
    if (nextMonth) {
      goToMonth(nextMonth);
      setSelectedMonth(nextMonth);
    }
  };
  return (
    <div className="ods-date__caption">
      <IconButton
        type="button"
        data-testid="calendar-left-arrow"
        size="sm"
        className={classNames('ods-date__navButtons', {
          'ods-date__navButtonPrev': mode === 'range',
          'ods-date__navButtonPrev-datepicker': mode === 'single',
        })}
        disabled={!previousMonth}
        onClick={handlePreviousMonthClick}
      >
        <ChevronLeft size={20} />
      </IconButton>
      <h2 data-testid="calendar-caption-month">
        {format(selectedMonth, 'MMMM yyyy', { locale })}
      </h2>
      <IconButton
        type="button"
        data-testid="calendar-right-arrow"
        size="sm"
        className={classNames('ods-date__navButtons', {
          'ods-date__navButtonNext': mode === 'range',
          'ods-date__navButtonNext-datepicker': mode === 'single',
        })}
        disabled={!nextMonth}
        onClick={handleNextMonthClick}
      >
        <ChevronRight size={20} />
      </IconButton>
    </div>
  );
};

export default DatePickerHeader;
