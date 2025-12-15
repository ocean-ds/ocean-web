/* eslint-disable react/button-has-type */
import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Badge from '../../Badge';
import Chips, { ChipValue } from '../Chips';

const originalMatchMedia = window.matchMedia;

const createMatchMedia = (matches: boolean) => () => ({
  matches,
  media: '',
  onchange: null,
  addListener: jest.fn(), // deprecated but still used by react-use
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

interface ISetup {
  handleClick?: () => void;
  handleChange?: () => void;
  handleClose?: () => void;
  selectedValue?: ChipValue | ChipValue[];
}

const multiChoiceSetup = ({
  handleClick,
  handleChange,
  handleClose,
  selectedValue,
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
      selectedValue={selectedValue}
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
  beforeAll(() => {
    window.matchMedia = createMatchMedia(false);
  });

  afterAll(() => {
    window.matchMedia = originalMatchMedia;
  });
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

  test('calls onConfirm when clicked', async () => {
    const handleConfirm = jest.fn();
    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ];
    render(
      <Chips
        label="Test Label"
        multiChoice
        options={options}
        onConfirm={handleConfirm}
      />
    );

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('Filtrar')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Filtrar' }));

    expect(handleConfirm).toHaveBeenCalled();
  });

  test('calls onClean when clicked', async () => {
    const handleClean = jest.fn();
    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ];
    render(
      <Chips
        label="Test Label"
        multiChoice
        options={options}
        onClean={handleClean}
      />
    );

    fireEvent.click(screen.getByRole('button'));

    fireEvent.click(screen.getByText('Option 1'));

    await waitFor(() => {
      expect(screen.getByText('Limpar')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Limpar' }));

    expect(handleClean).toHaveBeenCalled();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Chips label="Test Label" onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalled();
  });

  test('calls onClose when clicked', () => {
    const handleClose = jest.fn();
    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ];

    render(
      <Chips label="Test Label" options={options} onClose={handleClose} />
    );

    fireEvent.click(screen.getByRole('button'));

    fireEvent.click(screen.getByText('Option 1'));

    expect(handleClose).toHaveBeenCalled();
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

    expect(screen.getByRole('list')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Test Label'));

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
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

  test('renders option indicators with count', async () => {
    const options = [
      {
        label: 'Low price',
        value: '1',
        indicator: <Badge color="alert" count={10} />,
      },
      {
        label: 'Fast delivery',
        value: '2',
        indicator: <Badge color="brand" count={15} />,
      },
    ];

    render(
      <Chips
        label="Test Label"
        options={options}
        multiChoice
        clearLabel="Limpar"
        filterLabel="Filtrar"
      />
    );

    fireEvent.click(screen.getByRole('button'));

    const getIndicatorByLabel = (labelText: string) => {
      const label = screen.getByText(labelText);
      const checkboxLabel = label.closest('.ods-checkbox__label');
      const indicatorElement = checkboxLabel?.querySelector(
        '.ods-list-selectable__indicator'
      );

      if (!indicatorElement || !(indicatorElement instanceof HTMLElement)) {
        throw new Error('Indicator not found');
      }

      return within(indicatorElement).getByRole('tag');
    };

    expect(getIndicatorByLabel('Low price')).toHaveTextContent('10');
    expect(getIndicatorByLabel('Fast delivery')).toHaveTextContent('15');
  });

  test('checks clear options button', async () => {
    const handleChange = jest.fn();
    const handleClose = jest.fn();
    multiChoiceSetup({ handleChange, handleClose });

    await clickInOption('Option 1');

    expect(handleChange).toHaveBeenCalledWith([
      {
        label: 'Option 1',
        value: '1',
      },
    ]);

    fireEvent.click(screen.getByText('Test Clear'));

    expect(handleChange).toHaveBeenCalledWith([]);
    expect(handleClose).toHaveBeenCalledTimes(1);

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

  test('checks actived', async () => {
    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ];

    render(<Chips label="Test Label" options={options} actived />);

    expect(screen.getByRole('button')).toHaveClass('ods-chips__button--active');
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

  test('checks selected value on multi choice', async () => {
    multiChoiceSetup({ selectedValue: [{ label: 'Option 1', value: '1' }] });

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByRole('tag')).toHaveTextContent('1');
  });

  test('renders without selected value', () => {
    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ];

    render(<Chips label="Test Label" options={options} multiChoice />);

    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
  });

  test('checks default value from selected value', () => {
    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ];
    const selectedValue = { label: 'Option 1', value: '1' };

    render(
      <Chips
        label="Test Label"
        options={options}
        selectedValue={selectedValue}
      />
    );

    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });
});
