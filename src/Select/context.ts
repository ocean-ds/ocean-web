import React from 'react';
import { OptionType } from './types';

export type SelectedType = {
  index: number;
  id: string;
} & OptionType;

type ContextProps = {
  listboxId: string;
  selected?: SelectedType;
  onSelect: (newOption: SelectedType) => void;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  refSelControl: React.MutableRefObject<HTMLButtonElement | null>;
};

export default React.createContext<Partial<ContextProps>>({});
