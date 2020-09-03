import React from 'react';
import { RawValueType } from './types';

export type SelectedType = {
  id: string;
  label: string;
  value: RawValueType;
};

type ContextProps = {
  listboxId: string;
  selected?: SelectedType;
  onSelect: (option: SelectedType) => void;
};

export default React.createContext<Partial<ContextProps>>({});
