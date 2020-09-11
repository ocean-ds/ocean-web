import React from 'react';
import { OptionProps } from './types';

type ContextType = {
  listboxId: string;
  selected?: OptionProps;
  onSelect: (newOption: OptionProps) => void;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  refSelControl: React.MutableRefObject<HTMLButtonElement | null>;
};

export default React.createContext<Partial<ContextType>>({});
