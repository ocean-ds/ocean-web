import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CreditCardOutline } from '@useblu/ocean-icons-react';
import List from '../../List';
import ListReadOnly from '../../ListReadOnly';
import ListAction from '../../ListAction';
import ListSettings from '../../ListSettings';
import ListExpandable from '../../ListExpandable';
import Tag from '../../Tag';
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

export const ListWithBorderInsideDrawer: Story = {
  name: 'List with border inside drawer',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => (
    <Drawer
      open
      title="Listas na drawer"
      onDrawerClose={() => undefined}
      overlayClose={() => undefined}
    >
      <List data-testid="bordered-list">
        <ListReadOnly
          type="text"
          title="Recebível"
          icon={<CreditCardOutline />}
          indicator={<Tag type="neutral">Pago</Tag>}
          showDivider
          data-testid="bordered-readonly"
        />
        <ListAction
          type="text"
          title="Ver recebível"
          icon={<CreditCardOutline />}
          indicator={<Tag type="neutral">Novo</Tag>}
          actionType="chevron"
          data-testid="bordered-action"
        />
        <ListSettings
          type="text"
          title="Notificações"
          actionType="button"
          buttonLabel="Alterar"
          data-testid="bordered-settings"
        />
        <ListAction
          type="text"
          title="Carregando"
          loading
          data-testid="bordered-loading"
        />
      </List>
      <ListExpandable title="Parcelas do crédito" defaultExpanded>
        <ListReadOnly
          type="text"
          title="Parcela 1"
          icon={<CreditCardOutline />}
          indicator={<Tag type="neutral">Paga</Tag>}
          showDivider
          data-testid="expanded-readonly"
        />
        <ListAction
          type="text"
          title="Parcela 2"
          icon={<CreditCardOutline />}
          indicator={<Tag type="neutral">Aberta</Tag>}
          actionType="chevron"
          data-testid="expanded-action"
        />
      </ListExpandable>
      <ListReadOnly
        type="text"
        title="Lista sem borda"
        indicator={<Tag type="neutral">Livre</Tag>}
        showDivider
        data-testid="loose-readonly"
      />
      <ListExpandable type="text" title="Grupo sem borda" defaultExpanded>
        <ListReadOnly
          type="text"
          title="Parcela sem borda"
          indicator={<Tag type="neutral">Livre</Tag>}
          data-testid="borderless-expanded-readonly"
        />
      </ListExpandable>
      <ListReadOnly
        type="card"
        title="Item do tipo card"
        indicator={<Tag type="neutral">Card</Tag>}
        data-testid="card-readonly"
      />
    </Drawer>
  ),
};
