import React from 'react';
import * as Storybook from '@storybook/react';
import DatePicker from '../DatePicker';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
} as unknown as Storybook.ComponentMeta<typeof DatePicker>;

interface IDatesProps {
  from: string;
  to: string;
}

const Template: Storybook.ComponentStory<typeof DatePicker> = () => {
  const [dates, setDates] = React.useState<IDatesProps>({ from: '', to: '' });

  const handleDates = (dates: IDatesProps) =>
    setDates({ from: dates.from, to: dates.to });

  return (
    <DatePicker
      values={dates}
      onSelect={(dates: IDatesProps) => handleDates(dates)}
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
