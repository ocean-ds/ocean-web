import React from 'react';
import Typography from '../../../packages/ocean-react/src/Typography';
import StackedDrawers from '../../../packages/ocean-react/src/Drawer/examples/StackedDrawers';
import SimpleDrawer from '../../../packages/ocean-react/src/Drawer/examples/SimpleDrawer';
import type { ComponentDocConfig } from '../ComponentOverview';
import type { LocaleFiles } from '../i18n';
import type { TokensFile } from '../doc-parts';
import * as Stories from '../../../packages/ocean-react/src/Drawer/stories/Drawer.stories';
import tokens from '../../assets/tokens/drawer.json';
import en from '../locales/drawer.en.json';
import pt from '../locales/drawer.pt.json';
import { drawerArgTypes } from './argTypes';

const locale: LocaleFiles = {
  en: en as LocaleFiles['en'],
  pt: pt as LocaleFiles['pt'],
};

const content = (
  <Typography variant="paragraph">
    Payment to supplier · Coral Distributors · R$ 6.819,33
  </Typography>
);

const STACK_CODE = `const { open, drawerProps } = useDrawerStack();

<Button onClick={() => open('company')}>Open drawer</Button>
<Drawer title="Coral Distributors" {...drawerProps('company')}>
  <ListAction title="Orders" actionType="chevron" onClick={() => open('orders')} />
</Drawer>
<Drawer title="Open orders" {...drawerProps('orders')}>
  <ListAction title="Order #4521" actionType="chevron" onClick={() => open('order')} />
</Drawer>
<Drawer title="Order details" {...drawerProps('order')}>…</Drawer>`;

export const drawerDoc: ComponentDocConfig = {
  id: 'drawer',
  title: 'Drawer',
  kind: 'component',
  status: 'stable',
  source: 'packages/ocean-react/src/Drawer/',
  groupOverview: 'components-overlays-drawer-overview--docs',
  locale,
  imports: "import { Drawer, useDrawerStack } from '@useblu/ocean-react';",
  primary: {
    plain: true,
    rows: [<StackedDrawers key="stack" />],
    code: STACK_CODE,
  },
  sections: [
    {
      key: 'default',
      example: {
        plain: true,
        rows: [<SimpleDrawer key="simple">{content}</SimpleDrawer>],
        code: '<Drawer open={open} title="Coral Distributors" onDrawerClose={close} overlayClose={close}>…</Drawer>',
      },
    },
    { key: 'attached' },
    {
      key: 'stacked',
      example: {
        plain: true,
        rows: [<StackedDrawers key="stacked" />],
        code: STACK_CODE,
      },
    },
    { key: 'withActions' },
  ],
  platforms: 'react-only',
  reactSnippet: `import { Drawer, useDrawerStack } from '@useblu/ocean-react';\n\n${STACK_CODE}`,
  story: Stories.Default,
  argTypes: drawerArgTypes,
  tokens: tokens as TokensFile,
};
