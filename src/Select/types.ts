export type RawValueType = string | number;

export type OptionType = {
  value: RawValueType;
  label: string;
  className?: string;
  id?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
};
