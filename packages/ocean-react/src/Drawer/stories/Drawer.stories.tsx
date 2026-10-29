import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Drawer from '../Drawer';
import SimpleDrawer from '../examples/SimpleDrawer';
import StackedDrawers from '../examples/StackedDrawers';
import {
  SAMPLE_TITLE,
  SampleActions,
  SampleContent,
} from '../examples/DrawerSample';

type DrawerStoryArgs = React.ComponentProps<typeof Drawer> & {
  withActions: boolean;
};

const meta: Meta<DrawerStoryArgs> = {
  title: 'Components/Overlays/Drawer',
  component: Drawer,
  parameters: { actions: { disable: true } },
  argTypes: {
    title: { control: 'text' },
    withActions: {
      control: 'boolean',
      description: 'Shows the action bar (`actions`).',
    },
    size: { control: 'radio', options: ['small', 'large'] },
    align: { control: 'select', options: ['left', 'right'] },
    headerColor: {
      control: 'select',
      options: ['default', 'warning', 'negative'],
    },
  },
  args: { withActions: false },
};

export default meta;

type Story = StoryObj<DrawerStoryArgs>;

const ModalExample = (): React.ReactElement => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Abrir painel modal
      </button>
      <Drawer
        modal
        open={open}
        onDrawerClose={close}
        overlayClose={close}
        aria-labelledby="modal-drawer-title"
        title={<h2 id="modal-drawer-title">Escolha uma opção</h2>}
        actions={
          <button type="button" onClick={close}>
            Selecionar
          </button>
        }
      >
        <label htmlFor="modal-first-option">
          <input id="modal-first-option" type="radio" name="modal-option" />
          Primeira opção
        </label>
      </Drawer>
    </>
  );
};

export const AccessibleModal: Story = {
  render: () => <ModalExample />,
};

export const Default: Story = {
  args: {
    title: SAMPLE_TITLE,
    size: 'small',
    align: 'right',
    headerColor: 'default',
    withActions: true,
  },
  parameters: {
    controls: {
      include: ['title', 'withActions', 'size', 'align', 'headerColor'],
    },
  },
  render: ({ title, withActions, size, align, headerColor }) => (
    <SimpleDrawer
      title={title}
      size={size}
      align={align}
      headerColor={headerColor}
      actions={withActions ? <SampleActions /> : undefined}
    >
      <SampleContent />
    </SimpleDrawer>
  ),
};

export const Stacked: Story = {
  parameters: { controls: { include: ['withActions'] } },
  render: ({ withActions }) => <StackedDrawers withActions={withActions} />,
};
