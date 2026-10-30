import React from 'react';
import type { ComponentDocConfig } from '../ComponentOverview';
import type { LocaleFiles } from '../i18n';
import type { TokensFile } from '../doc-parts';
import * as Stories from '../../../packages/ocean-react/src/Tab/stories/Tab.stories';
import tokens from '../../assets/tokens/tab.json';
import en from '../locales/tab.en.json';
import pt from '../locales/tab.pt.json';
import { tabArgTypes } from './argTypes';
import { BADGE_TABS, DEFAULT_TABS, SCROLL_TABS, tabCode } from './fixtures';
import { ControlledTab } from './story-helpers';

const locale: LocaleFiles = {
  en: en as LocaleFiles['en'],
  pt: pt as LocaleFiles['pt'],
};

const IMPORTS =
  "import { useState } from 'react';\nimport { Tab } from '@useblu/ocean-react';";

export const defaultExample = (
  <ControlledTab
    key="default"
    aria-label="Account"
    tabs={DEFAULT_TABS}
    selectedIndex={0}
  />
);

const badgeExample = (
  <ControlledTab
    key="badge"
    aria-label="Account"
    tabs={BADGE_TABS}
    selectedIndex={1}
  />
);

const scrollExample = (
  <ControlledTab
    key="scroll"
    aria-label="Account"
    tabs={SCROLL_TABS}
    selectedIndex={5}
    narrow
  />
);

const PANEL_CODE = `<Tab
  id="account"
  aria-label="Account"
  tabs={[
    { label: 'Summary', panelId: 'account-summary' },
    { label: 'Payments', panelId: 'account-payments' },
  ]}
  selectedIndex={selected}
  onChange={setSelected}
/>
<div
  role="tabpanel"
  id={selected === 0 ? 'account-summary' : 'account-payments'}
  aria-labelledby={\`account-tab-\${selected}\`}
>
  …
</div>`;

export const tabDoc: ComponentDocConfig = {
  id: 'tab',
  title: 'Tab',
  kind: 'component',
  status: 'stable',
  source: 'packages/ocean-react/src/Tab/',
  groupOverview: 'components-tab--overview',
  locale,
  imports: IMPORTS,
  primary: {
    unframed: true,
    canvasClass: 'odoc-canvas--white',
    rows: [defaultExample],
    code: tabCode(DEFAULT_TABS),
  },
  sections: [
    {
      key: 'default',
      example: {
        unframed: true,
        canvasClass: 'odoc-canvas--white',
        rows: [defaultExample],
        code: tabCode(DEFAULT_TABS),
      },
    },
    {
      key: 'withBadge',
      example: {
        unframed: true,
        canvasClass: 'odoc-canvas--white',
        rows: [badgeExample],
        code: tabCode(BADGE_TABS),
      },
    },
    {
      key: 'withScroll',
      example: {
        unframed: true,
        canvasClass: 'odoc-canvas--white',
        rows: [scrollExample],
        code: tabCode(SCROLL_TABS),
      },
    },
    { key: 'mobile' },
    { key: 'longLabels' },
  ],
  optionsTitle: 'sections.options',
  optionsLocalePrefix: 'options',
  options: {
    panels: {
      unframed: true,
      canvasClass: 'odoc-canvas--white',
      rows: [defaultExample],
      code: PANEL_CODE,
    },
  },
  platforms: {
    react: `import { Tab } from '@useblu/ocean-react';

const [selected, setSelected] = useState(0);

<Tab
  aria-label="Account"
  tabs={[{ label: 'Summary' }, { label: 'Payments', count: 3 }, { label: 'Receipts' }]}
  selectedIndex={selected}
  onChange={setSelected}
/>`,
    swift: `OceanSwiftUI.Tab { tab in
    tab.parameters.tabs = [
        .init(title: "Summary", view: SummaryView()),
        .init(title: "Payments", view: PaymentsView(), badgeNumber: 3),
        .init(title: "Receipts", view: ReceiptsView())
    ]
    tab.parameters.onTouch = { index in selected = index }
}`,
    compose: `var selected by remember { mutableIntStateOf(0) }

OceanTab(
    tabs = listOf(
        OceanTabItemModel(label = "Summary"),
        OceanTabItemModel(label = "Payments", counter = 3),
        OceanTabItemModel(label = "Receipts")
    ),
    selectedTabIndex = selected,
    onSelectedTab = { selected = it }
)`,
  },
  story: Stories.Default,
  argTypes: tabArgTypes,
  tokens: tokens as TokensFile,
};
