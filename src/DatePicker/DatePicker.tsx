import React from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';

import Input from '../Input';

const DatePicker: React.FC<ReactDatePickerProps> = (props) => (
  <ReactDatePicker customInput={<Input type="text" />} {...props} />
);

export default DatePicker;
