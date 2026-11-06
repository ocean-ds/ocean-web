import React from 'react';
import type { ComponentDocConfig } from '../ComponentOverview';
import type { LocaleFiles } from '../i18n';
import type { TokensFile } from '../doc-parts';
import * as Stories from '../../../packages/ocean-react/src/SegmentedControl/stories/SegmentedControl.stories';
import tokens from '../../assets/tokens/segmented-control.json';
import en from '../locales/segmented-control.en.json';
import pt from '../locales/segmented-control.pt.json';
import { segmentedControlArgTypes } from './argTypes';
import {
  COUNT_OPTIONS,
  DEFAULT_OPTIONS,
  ICON_OPTIONS,
  LONG_OPTIONS,
  segmentedControlCode,
} from './fixtures';
import { ControlledSegmentedControl } from './story-helpers';

const locale: LocaleFiles = {
  en: en as LocaleFiles['en'],
  pt: pt as LocaleFiles['pt'],
};

const IMPORTS =
  "import { useState } from 'react';\nimport { SegmentedControl } from '@useblu/ocean-react';";

const ICON_IMPORT =
  "import { CalendarOutline, ViewListOutline } from '@useblu/ocean-icons-react';";

const example = (
  key: string,
  options: typeof DEFAULT_OPTIONS,
  selectedIndex: 0 | 1 = 0,
  narrow = false,
  extra: Partial<React.ComponentProps<typeof ControlledSegmentedControl>> = {}
) => (
  <ControlledSegmentedControl
    key={key}
    aria-label="Scope"
    options={options}
    selectedIndex={selectedIndex}
    narrow={narrow}
    {...extra}
  />
);

export const defaultExample = example('default', DEFAULT_OPTIONS);

const spec = (
  rows: React.ReactElement[],
  code: string,
  extraImport?: string
): ComponentDocConfig['primary'] => ({
  unframed: true,
  canvasClass: 'odoc-canvas--white',
  rows,
  code: extraImport ? `${extraImport}\n\n${code}` : code,
});

export const segmentedControlDoc: ComponentDocConfig = {
  id: 'segmented-control',
  title: 'Segmented Control',
  codeName: 'SegmentedControl',
  kind: 'component',
  status: 'stable',
  source: 'packages/ocean-react/src/SegmentedControl/',
  groupOverview: 'components-segmented-control--overview',
  locale,
  imports: IMPORTS,
  primary: spec([defaultExample], segmentedControlCode(DEFAULT_OPTIONS)),
  sections: [
    {
      key: 'default',
      example: spec([defaultExample], segmentedControlCode(DEFAULT_OPTIONS)),
    },
  ],
  optionsTitle: 'sections.options',
  optionsLocalePrefix: 'options',
  options: {
    withIcon: spec(
      [example('icon', ICON_OPTIONS)],
      segmentedControlCode(ICON_OPTIONS, 'View'),
      ICON_IMPORT
    ),
    withCount: spec(
      [example('count', COUNT_OPTIONS, 1)],
      segmentedControlCode(COUNT_OPTIONS)
    ),
    longLabels: spec(
      [example('long', LONG_OPTIONS, 0, true)],
      segmentedControlCode(LONG_OPTIONS)
    ),
    whiteBackground: spec(
      [
        example('white', COUNT_OPTIONS, 0, false, {
          background: 'white',
          surface: true,
        }),
      ],
      segmentedControlCode(COUNT_OPTIONS, 'Scope', ['background="white"'])
    ),
    disabled: spec(
      [
        example('disabled', COUNT_OPTIONS, 0, false, { disabled: true }),
        example('disabled-second', COUNT_OPTIONS, 1, false, {
          disabled: true,
        }),
      ],
      segmentedControlCode(COUNT_OPTIONS, 'Scope', ['disabled'])
    ),
  },
  platforms: {
    react: `import { SegmentedControl } from '@useblu/ocean-react';

const [selected, setSelected] = useState<0 | 1>(0);

<SegmentedControl
  aria-label="Scope"
  options={[{ label: 'Store' }, { label: 'Network', count: 3 }]}
  selectedIndex={selected}
  onChange={setSelected}
/>`,
    swift: `OceanSwiftUI.SegmentedControl { control in
    control.parameters.options = [
        .init(title: "Store"),
        .init(title: "Network", badgeNumber: 3)
    ]
    control.parameters.selectedIndex = selected
    control.parameters.onTouch = { index in selected = index }
}`,
    compose: `var selected by remember { mutableIntStateOf(0) }

OceanSegmentedControl(
    options = listOf(
        OceanSegmentedControlOption(label = "Store"),
        OceanSegmentedControlOption(label = "Network", counter = 3)
    ),
    selectedIndex = selected,
    onSelectedOption = { selected = it }
)`,
  },
  story: Stories.Default,
  argTypes: segmentedControlArgTypes,
  tokens: tokens as TokensFile,
};
