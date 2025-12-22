import type { ReactNode } from 'react';
import { TagProps } from '../Tag/Tag';

export type ChipValue = {
  label: string;
  value: string;
  indicator?: ReactNode;
  disabled?: boolean;
  indeterminate?: boolean;
  tag?: TagProps;
};

export interface IUseChipReturn {
  clearOptions: () => void;
  counter: number;
  filterOptions: () => void;
  handleClickChips: () => void;
  handleContextMenuOpenChange: (open: boolean) => void;
  handleSelectOption: (label: string, value: string) => void;
  selectionIsOpen: boolean;
  selectedOptions: ChipValue[] | ChipValue;
  wrapperRef: React.RefObject<HTMLDivElement>;
}

export interface IUseChipOptions {
  defaultValue?: ChipValue;
  multiChoice?: boolean;
  onChange?: (value: ChipValue[] | ChipValue) => void;
  onClean?: () => void;
  onConfirm?: (value: ChipValue[] | ChipValue) => void;
  onClose?: () => void;
  onClick?: () => void;
  options?: ChipValue[];
  selectedValue?: ChipValue | ChipValue[];
}
