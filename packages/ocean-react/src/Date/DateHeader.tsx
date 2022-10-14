import React from 'react';
import classNames from 'classnames';

import { format, Locale } from 'date-fns';

import IconButton from '../IconButton';

import { CaptionProps, useNavigation } from 'react-day-picker';

import { ChevronLeft, ChevronRight } from '@useblu/ocean-icons-react';

type IProps = CaptionProps & { locale: Locale; mode?: 'single' | 'range' };

const DatePickerHeader: React.FC<IProps> = ({
  displayMonth,
  locale,
  mode = 'range',
}) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();

  return (
    <div className="ods-date__caption">
      <IconButton
        data-testid="calendar-left-arrow"
        size="sm"
        className={classNames('ods-date__navButtons', {
          'ods-date__navButtonPrev': mode === 'range',
          'ods-date__navButtonPrev-datepicker': mode === 'single',
        })}
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
      >
        <ChevronLeft size={20} />
      </IconButton>
      <h2 data-testid="calendar-caption-month">
        {format(displayMonth, 'MMMM yyyy', { locale })}
      </h2>
      <IconButton
        data-testid="calendar-right-arrow"
        size="sm"
        className={classNames('ods-date__navButtons', {
          'ods-date__navButtonNext': mode === 'range',
          'ods-date__navButtonNext-datepicker': mode === 'single',
        })}
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
      >
        <ChevronRight size={20} />
      </IconButton>
    </div>
  );
};

export default DatePickerHeader;
