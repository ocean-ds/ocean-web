import React from 'react';
import StackedDrawers from '../../../packages/ocean-react/src/Drawer/examples/StackedDrawers';
import SimpleDrawer from '../../../packages/ocean-react/src/Drawer/examples/SimpleDrawer';
import {
  SAMPLE_TITLE,
  SampleActions,
  SampleContent,
} from '../../../packages/ocean-react/src/Drawer/examples/DrawerSample';
import type { ComponentDocConfig } from '../ComponentOverview';
import type { LocaleFiles } from '../i18n';
import type { TokensFile } from '../doc-parts';
import * as Stories from '../../../packages/ocean-react/src/Drawer/stories/Drawer.stories';
import tokens from '../../assets/tokens/drawer.json';
import en from '../locales/drawer.en.json';
import pt from '../locales/drawer.pt.json';
import { drawerArgTypes } from './argTypes';
import { DrawerFrame } from './DrawerFrame';

const locale: LocaleFiles = {
  en: en as LocaleFiles['en'],
  pt: pt as LocaleFiles['pt'],
};

const ACTIONS_CODE = `actions={
    <>
      <Button variant="secondary">Label</Button>
      <Button>Label</Button>
    </>
  }`;

const DEFAULT_CODE = `<Drawer
  open={open}
  title="Drawer title"
  onDrawerClose={close}
  overlayClose={close}
  ${ACTIONS_CODE}
>
  <Typography variant="paragraph">Lorem ipsum dolor sit amet…</Typography>
</Drawer>`;

const STACK_CODE = `const { open, drawerProps } = useDrawerStack();

<Button onClick={() => open('first')}>Open drawer</Button>
<Drawer title="Drawer title" {...drawerProps('first')}>
  <ListAction title="Second drawer" actionType="chevron" onClick={() => open('second')} />
</Drawer>
<Drawer title="Drawer title" {...drawerProps('second')}>
  <ListAction title="Third drawer" actionType="chevron" onClick={() => open('third')} />
</Drawer>
<Drawer title="Drawer title" {...drawerProps('third')}>…</Drawer>`;

export const defaultExample = (
  <DrawerFrame key="default">
    <SimpleDrawer defaultOpen title={SAMPLE_TITLE} actions={<SampleActions />}>
      <SampleContent />
    </SimpleDrawer>
  </DrawerFrame>
);

export const stackedExample = (
  <DrawerFrame key="stacked">
    <StackedDrawers initial={['first', 'second']} />
  </DrawerFrame>
);

export const drawerDoc: ComponentDocConfig = {
  id: 'drawer',
  title: 'Drawer',
  kind: 'component',
  status: 'stable',
  source: 'packages/ocean-react/src/Drawer/',
  groupOverview: 'components-overlays-drawer--overview',
  locale,
  imports: "import { Drawer, useDrawerStack } from '@useblu/ocean-react';",
  primary: { unframed: true, rows: [stackedExample], code: STACK_CODE },
  sections: [
    {
      key: 'default',
      example: { unframed: true, rows: [defaultExample], code: DEFAULT_CODE },
    },
    {
      key: 'stacked',
      example: { unframed: true, rows: [stackedExample], code: STACK_CODE },
    },
  ],
  platforms: 'react-only',
  reactSnippet: `import { Drawer, useDrawerStack } from '@useblu/ocean-react';\n\n${STACK_CODE}`,
  story: Stories.Default,
  argTypes: drawerArgTypes,
  tokens: tokens as TokensFile,
};
