import React, { useState } from 'react';
import { Plus } from '@useblu/ocean-icons-react';
import Button from '../../Button';
import ContextualMenu from '../ContextualMenu';
import { ContextualMenuItemProps } from '../ContextualMenuItem';

export const ContextualMenuTrigger = ({
  items,
}: {
  items: Omit<ContextualMenuItemProps, 'onClick'>[];
}): React.ReactElement => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const ITEMS = items.map((item) => ({
    ...item,
  }));

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <Button
        variant="secondary"
        type="button"
        size="sm"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 4,
        }}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Plus size={16} />
        Menu
      </Button>
      <ContextualMenu
        items={ITEMS}
        open={open}
        onOpenChange={setOpen}
        onSelect={setSelectedValue}
        selectedValue={selectedValue}
      />
    </div>
  );
};
export default ContextualMenuTrigger;
