import { useState, useCallback } from 'react';

interface IChipReturn {
  openDropdown: boolean;
  handleOpenDropdown: () => void;
  handleCloseDropdown: () => void;
}

export default function useChip(): IChipReturn {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  const handleOpenDropdown = useCallback(() => setOpenDropdown(true), []);

  const handleCloseDropdown = useCallback(() => setOpenDropdown(false), []);

  return {
    openDropdown,
    handleOpenDropdown,
    handleCloseDropdown,
  };
}
