/* eslint-disable react/button-has-type */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Chips from '../Chips';

interface ISetup {
  handleClick?: () => void;
  handleChange?: () => void;
  handleClose?: () => void;
}

const multiChoiceSetup = ({
  handleClick,
  handleChange,
  handleClose,
}: ISetup) => {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '2' },
    { label: 'Option 4', value: '2' },
  ];
  render(
    <Chips
      label="Test Label"
      options={options}
      onClick={handleClick}
      onChange={handleChange}
      onClose={handleClose}
      filterLabel="Test Filter"
      clearLabel="Test Clear"
      multiChoice
    />
  );

  fireEvent.click(screen.getByText('Test Label'));
};

const clickInOption = async (label: string) => {
  await waitFor(() => {
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText(label));
};

describe('Chips', () => {
  test('renders the label', () => {
    render(<Chips label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  test('renders the icon', () => {
    render(
      <Chips label="Test Label" icon={<span data-testid="test-icon" />} />
    );
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  test('disables the chips', () => {
    render(<Chips label="Test Label" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('renders the options', async () => {
    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ];
    render(<Chips label="Test Label" options={options} />);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Chips label="Test Label" onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalled();
  });

  test('calls onChange with the selected value', async () => {
    const handleChange = jest.fn();
    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ];
    render(
      <Chips label="Test Label" options={options} onChange={handleChange} />
    );
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Option 1'));
    expect(handleChange).toHaveBeenCalledWith({
      label: 'Option 1',
      value: '1',
    });
  });

  test('checks open and close', () => {
    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ];
    render(<Chips label="Test Label" options={options} />);

    fireEvent.click(screen.getByText('Test Label'));

    expect(screen.getByTestId('ods-chips-option')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Test Label'));

    expect(() => screen.getByTestId('ods-chips-option')).toThrow(
      'Unable to find an element'
    );
  });

  test('checks multiChoice', async () => {
    const handleChange = jest.fn();
    multiChoiceSetup({ handleChange });

    await clickInOption('Option 1');

    expect(handleChange).toHaveBeenCalledWith([
      {
        label: 'Option 1',
        value: '1',
      },
    ]);
    expect(screen.getByRole('tag')).toHaveTextContent('1');

    await clickInOption('Option 2');

    expect(handleChange).toHaveBeenCalledWith([
      {
        label: 'Option 1',
        value: '1',
      },
      {
        label: 'Option 2',
        value: '2',
      },
    ]);
    expect(screen.getByRole('tag')).toHaveTextContent('2');

    fireEvent.click(screen.getByText('Option 2'));

    expect(handleChange).toHaveBeenCalledWith([
      {
        label: 'Option 1',
        value: '1',
      },
    ]);

    expect(screen.getByRole('tag')).toHaveTextContent('1');
  });

  test('checks clear options button', async () => {
    const handleChange = jest.fn();
    multiChoiceSetup({ handleChange });

    await clickInOption('Option 1');

    expect(handleChange).toHaveBeenCalledWith([
      {
        label: 'Option 1',
        value: '1',
      },
    ]);

    fireEvent.click(screen.getByText('Test Clear'));

    expect(handleChange).toHaveBeenCalledWith([]);

    expect(() => screen.getByTestId('ods-chips-option')).toThrow(
      'Unable to find an element'
    );
  });

  test('checks filter options button', async () => {
    const handleClose = jest.fn();
    multiChoiceSetup({ handleClose });

    await clickInOption('Option 1');

    fireEvent.click(screen.getByText('Test Filter'));

    expect(handleClose).toHaveBeenCalledTimes(1);

    expect(() => screen.getByTestId('ods-chips-option')).toThrow(
      'Unable to find an element'
    );
  });

  test('checks click outside', async () => {
    const handleClick = jest.fn();
    const handleClose = jest.fn();
    multiChoiceSetup({ handleClick, handleClose });

    expect(handleClick).toHaveBeenCalled();
    expect(screen.getByTestId('ods-chips-option')).toBeInTheDocument();

    act(() => {
      const addEvent = new Event('mousedown');
      document.dispatchEvent(addEvent);
    });

    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(() => screen.getByTestId('ods-chips-option')).toThrow(
      'Unable to find an element'
    );
  });

  test('checks initial counter', async () => {
    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ];

    render(<Chips label="Test Label" options={options} initialCounter={3} />);

    expect(screen.getByRole('tag')).toHaveTextContent('3');
  });

  test('checks selected value', async () => {
    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ];

    render(
      <Chips
        label="Test Label"
        options={options}
        selectedValue={{ label: 'Option 1', value: '1' }}
      />
    );

    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });
});
