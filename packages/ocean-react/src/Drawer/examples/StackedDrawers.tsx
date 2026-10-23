import React from 'react';

import Drawer from '../Drawer';
import useDrawerStack from '../useDrawerStack';
import Button from '../../Button';
import List from '../../List';
import ListAction from '../../ListAction';
import Typography from '../../Typography';

const LEVELS = ['company', 'orders', 'order'] as const;
const TITLES = ['Coral Distributors', 'Open orders', 'Order details'];

export interface StackedDrawersProps {
  /** Drawers open on mount, from the first to the top. */
  initial?: typeof LEVELS[number][];
}

const StackedDrawers = ({
  initial,
}: StackedDrawersProps): React.ReactElement => {
  const { stack, open, drawerProps } = useDrawerStack({ initial });

  const nextItem = (level: number) => {
    const next = LEVELS[level + 1];
    const items = [
      { title: 'Orders', description: '3 open orders' },
      { title: 'Order #4521', description: 'R$ 6.819,33 · Nov 12' },
    ];
    return (
      <List>
        <ListAction
          title={items[level].title}
          description={items[level].description}
          actionType="chevron"
          chevronFlipped={stack.includes(next)}
          onClick={() => open(next)}
        />
      </List>
    );
  };

  return (
    <>
      <Button type="button" onClick={() => open(LEVELS[0])}>
        Open drawer
      </Button>
      {LEVELS.map((level, index) => (
        <Drawer key={level} title={TITLES[index]} {...drawerProps(level)}>
          {index < LEVELS.length - 1 ? (
            nextItem(index)
          ) : (
            <Typography variant="paragraph">
              Payment to supplier · Coral Distributors · R$ 6.819,33
            </Typography>
          )}
        </Drawer>
      ))}
    </>
  );
};

export default StackedDrawers;
