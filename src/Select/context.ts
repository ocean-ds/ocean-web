import React from 'react';
import { RawValueType } from './types';

export type SelectedType = {
  index: number;
  id: string;
  value: RawValueType;
  label: string;
};

type ContextProps = {
  listboxId: string;
  selected?: SelectedType;
  onSelect: (option: SelectedType) => void;
};

export default React.createContext<Partial<ContextProps>>({});
