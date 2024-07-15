import { FormControlProps } from '../FormControl';

export type RawValueType = string | number;

type OptionType = {
  value: RawValueType;
  label: string;
  disabled?: boolean;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
};

export type SelectProps = {
  /**
   * The id of the select element.
   */
  id?: string;
  /**
   * Placeholder of select.
   */
  placeholder?: string;
  /**
   * Array of options that populate the select menu.
   */
  options: OptionType[];
  /**
   * Current selected option. Use when the component is controlled.
   */
  value?: RawValueType;
  /**
   * The default selected option. Use when the component is not controlled.
   */
  defaultValue?: RawValueType;
  /**
   * Name of the HTML Input (optional - without this, no input will be rendered)
   */
  name?: string;
  /**
   * The aria-label of the select element.
   */
  ariaLabel?: string;
  /**
   * Callback function fired when an option is selected.
   */
  onChange?: (newValue: OptionType) => void;
  /**
   * The additional class to select.
   */
  className?: string;
  [propName: string]: unknown;
} & Omit<FormControlProps, 'children' | 'htmlFor'>;

export type OptionProps = {
  id: string;
  index: number;
} & OptionType;
