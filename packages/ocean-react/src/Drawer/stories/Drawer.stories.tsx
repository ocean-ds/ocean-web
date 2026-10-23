import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Drawer from '../Drawer';
import SimpleDrawer from '../examples/SimpleDrawer';
import AttachedDrawer from '../examples/AttachedDrawer';
import StackedDrawers from '../examples/StackedDrawers';
import Typography from '../../Typography';
import Button from '../../Button';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Overlays/Drawer/Drawer',
  component: Drawer,
  argTypes: {
    children: {
      control: false,
    },
    open: {
      control: 'boolean',
    },
    onDrawerClose: {
      control: false,
    },
    overlayClose: {
      control: false,
    },
    headerIcon: {
      control: false,
    },
    align: {
      control: 'select',
      options: ['left', 'right'],
    },
    iconAlignment: {
      control: 'select',
      options: ['left', 'right'],
    },
    anchorEl: {
      control: false,
    },
    onMouseOutDrawer: {
      control: false,
    },
    size: {
      control: 'radio',
      options: ['small', 'large'],
    },
    floating: {
      control: 'boolean',
    },
    offsetX: {
      control: 'number',
    },
    depth: {
      control: 'number',
    },
    width: {
      control: 'number',
    },
    hideOverlay: {
      control: 'boolean',
    },
    onBack: {
      control: false,
    },
    dim: {
      control: 'select',
      options: [undefined, 'near', 'far'],
    },
    onDimClick: {
      control: false,
    },
    closeButton: {
      control: 'select',
      options: ['icon', 'legacy'],
    },
    title: {
      control: 'text',
    },
    actions: {
      control: false,
    },
    headerColor: {
      control: 'select',
      options: ['default', 'warning', 'negative'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Drawer>;

const DrawerContent = () => (
  <Typography variant="paragraph">
    Payment to supplier · Coral Distributors · R$ 6.819,33
  </Typography>
);

export const Default: Story = {
  args: {
    open: false,
    align: 'right',
    size: 'small',
    title: 'Coral Distributors',
    headerColor: 'default',
  },
  render: (args) => (
    <SimpleDrawer {...args}>
      <DrawerContent />
    </SimpleDrawer>
  ),
};

export const Attached: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <AttachedDrawer align="right" iconAlignment="right" size="small">
      <DrawerContent />
    </AttachedDrawer>
  ),
};

export const Stacked: Story = {
  parameters: { controls: { disable: true } },
  render: () => <StackedDrawers />,
};

export const WithActions: Story = {
  args: { open: true, title: 'Coral Distributors' },
  render: (args) => (
    <Drawer
      {...args}
      overlayClose={() => undefined}
      onDrawerClose={() => undefined}
      actions={
        <>
          <Button blocked>Pay installment</Button>
          <Button variant="secondary" blocked>
            View contract
          </Button>
        </>
      }
    >
      <DrawerContent />
    </Drawer>
  ),
};
