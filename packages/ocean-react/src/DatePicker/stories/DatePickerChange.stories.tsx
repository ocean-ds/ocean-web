import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DatePicker, { DatePickerFields } from '../DatePicker';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
} as unknown as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = () => {
  const [dates, setDates] = React.useState<DatePickerFields>({
    from: '',
    to: '',
  });

  const handleDates = (dates: DatePickerFields) =>
    setDates({ from: dates.from, to: dates.to });

  return (
    <DatePicker
      values={dates}
      onSelect={(dates: DatePickerFields) => handleDates(dates)}
      editable={false}
    />
  );
};

export const DatePickerStory = Template.bind({});
// DatePickerStory.args = {
//   labels: { from: 'Start date', to: 'End date' },
//   values: { from: '', to: '' },
//   disabled: false,
//   editable: false,
// };

// DatePickerStory.argTypes = {
//   labels: {
//     name: 'labels',
//     // type: { name: 'text', required: false },
//     defaultValue: { from: 'Start date', to: 'End date' },
//     description: 'Dates from/to',
//     control: { type: 'object' },
//   },
//   values: {
//     name: 'values',
//     // type: { name: 'other', required: true },
//     description: 'Values of from/to fields',
//     control: { type: 'object' },
//   },
//   onSelect: {
//     control: 'func',
//   },
//   disabled: {
//     description: 'turn on component disabled',
//     control: 'boolean',
//   },
//   editable: {
//     control: 'boolean',
//   },
// };
