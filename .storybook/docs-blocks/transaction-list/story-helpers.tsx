import React from 'react';
import type { Decorator } from '@storybook/react';
import { Frame } from '../blocks';
import { ListFrame } from '../doc-parts';
import TransactionListExpandable from '../../../packages/ocean-react/src/TransactionListExpandable';
import { childRows, expandableParent } from './fixtures';

/** Stories render the rows inside the Ocean List container, at the mobile frame width. */
export const inList: Decorator = (Story) => (
  <Frame>
    <ListFrame>
      <Story />
    </ListFrame>
  </Frame>
);

/** Blocks render on their own, inside a padded card. */
export const asBlock: Decorator = (Story) => (
  <Frame className="odoc-frame--block">
    <Story />
  </Frame>
);

type ChildProps = Record<string, unknown> & {
  density?: unknown;
  iconColor?: unknown;
  loading?: boolean;
  disabled?: boolean;
};

/**
 * Child items inside an expanded Transaction List Expandable: the first and last items come
 * from the fixtures, the middle one from the args; row options apply to all three.
 */
export const timelineRender =
  <P,>(Child: React.ComponentType<P>) =>
  // eslint-disable-next-line react/display-name
  (args: P): React.ReactElement => {
    const Item = Child as unknown as React.ComponentType<ChildProps>;
    const props = args as unknown as ChildProps;
    const { density, iconColor, loading, disabled } = props;
    const shared = { density, iconColor, loading, disabled };
    return (
      <Frame>
        <ListFrame>
          <TransactionListExpandable {...expandableParent} expanded>
            <Item {...childRows[0]} {...shared} position="first" />
            <Item {...props} />
            <Item {...childRows[2]} {...shared} position="last" />
          </TransactionListExpandable>
        </ListFrame>
      </Frame>
    );
  };
