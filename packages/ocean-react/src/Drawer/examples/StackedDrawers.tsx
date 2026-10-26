import React from 'react';

import Drawer from '../Drawer';
import useDrawerStack from '../useDrawerStack';
import Button from '../../Button';
import List from '../../List';
import ListAction from '../../ListAction';
import { SAMPLE_TITLE, SampleActions, SampleContent } from './DrawerSample';

const LEVELS = ['first', 'second', 'third'] as const;
const NEXT = ['Second drawer', 'Third drawer'];

export interface StackedDrawersProps {
  /** Drawers open on mount, from the first to the top. */
  initial?: typeof LEVELS[number][];
  /** Hides the button that opens the first drawer (examples that start open). */
  hideTrigger?: boolean;
  /** Shows the action bar on every drawer. */
  withActions?: boolean;
}

const StackedDrawers = ({
  initial,
  withActions = false,
  hideTrigger = false,
}: StackedDrawersProps): React.ReactElement => {
  const { stack, open, drawerProps } = useDrawerStack({ initial });

  return (
    <>
      {!hideTrigger && (
        <Button type="button" onClick={() => open(LEVELS[0])}>
          Open drawer
        </Button>
      )}
      {LEVELS.map((level, index) => {
        const next = LEVELS[index + 1];
        return (
          <Drawer
            key={level}
            title={SAMPLE_TITLE}
            actions={withActions ? <SampleActions /> : undefined}
            {...drawerProps(level)}
          >
            <SampleContent />
            {next && (
              <List>
                <ListAction
                  title={NEXT[index]}
                  description="Opens beside this one"
                  actionType="chevron"
                  chevronFlipped={stack.includes(next)}
                  onClick={() => open(next)}
                />
              </List>
            )}
          </Drawer>
        );
      })}
    </>
  );
};

export default StackedDrawers;
