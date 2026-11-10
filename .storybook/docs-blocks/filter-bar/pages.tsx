import React from 'react';
import type { ComponentDocConfig } from '../ComponentOverview';
import type { LocaleFiles } from '../i18n';
import type { TokensFile } from '../doc-parts';
import * as Stories from '../../../packages/ocean-react/src/FilterBar/stories/FilterBar.stories';
import tokens from '../../assets/tokens/filter-bar.json';
import en from '../locales/filter-bar.en.json';
import pt from '../locales/filter-bar.pt.json';
import { filterBarArgTypes } from './argTypes';
import {
  FEW_FILTERS,
  LONG_FILTERS,
  LONG_SCOPE_OPTIONS,
  MANY_FILTERS,
  SCOPE_OPTIONS,
  ALL_FILTERS,
  filterBarCode,
} from './fixtures';
import { ControlledFilterBar } from './story-helpers';
import type { ControlledFilterBarProps } from './story-helpers';

const locale: LocaleFiles = {
  en: en as LocaleFiles['en'],
  pt: pt as LocaleFiles['pt'],
};

const IMPORTS =
  "import { useState } from 'react';\nimport { FilterBar } from '@useblu/ocean-react';";

const noop = () => undefined;

const example = (
  key: string,
  filters: ControlledFilterBarProps['filters'],
  {
    allFilters = false,
    segmented,
    width = 'wide',
  }: {
    allFilters?: boolean;
    segmented?: typeof SCOPE_OPTIONS;
    width?: ControlledFilterBarProps['width'];
  } = {}
) => (
  <ControlledFilterBar
    key={key}
    aria-label="Filters"
    width={width}
    filters={filters}
    allFilters={allFilters ? { ...ALL_FILTERS, onClick: noop } : undefined}
    segmentedControl={
      segmented && {
        'aria-label': 'Scope',
        options: segmented,
        selectedIndex: 0,
        onChange: noop,
      }
    }
  />
);

export const defaultExample = example('default', FEW_FILTERS);
export const fullExample = example('full', FEW_FILTERS, {
  allFilters: true,
  segmented: SCOPE_OPTIONS,
});

const spec = (
  rows: React.ReactElement[],
  code: string
): ComponentDocConfig['primary'] => ({
  unframed: true,
  canvasClass: 'odoc-canvas--white',
  rows,
  code,
});

export const filterBarDoc: ComponentDocConfig = {
  id: 'filter-bar',
  title: 'Filter Bar',
  codeName: 'FilterBar',
  kind: 'component',
  status: 'stable',
  source: 'packages/ocean-react/src/FilterBar/',
  groupOverview: 'components-filter-bar--overview',
  locale,
  imports: IMPORTS,
  primary: spec(
    [fullExample],
    filterBarCode(FEW_FILTERS, { allFilters: true, segmented: SCOPE_OPTIONS })
  ),
  sections: [
    {
      key: 'default',
      example: spec([defaultExample], filterBarCode(FEW_FILTERS)),
    },
    {
      key: 'allFilters',
      example: spec(
        [example('all-filters', FEW_FILTERS, { allFilters: true })],
        filterBarCode(FEW_FILTERS, { allFilters: true })
      ),
    },
    {
      key: 'segmentedControl',
      example: spec(
        [example('segmented', FEW_FILTERS, { segmented: SCOPE_OPTIONS })],
        filterBarCode(FEW_FILTERS, { segmented: SCOPE_OPTIONS })
      ),
    },
    {
      key: 'allFiltersAndSegmentedControl',
      example: spec(
        [fullExample],
        filterBarCode(FEW_FILTERS, {
          allFilters: true,
          segmented: SCOPE_OPTIONS,
        })
      ),
    },
  ],
  optionsTitle: 'sections.options',
  optionsLocalePrefix: 'options',
  options: {
    overflow: spec(
      [
        example('overflow', MANY_FILTERS, {
          allFilters: true,
          segmented: SCOPE_OPTIONS,
          width: 'narrow',
        }),
      ],
      filterBarCode(MANY_FILTERS, {
        allFilters: true,
        segmented: SCOPE_OPTIONS,
      })
    ),
    longText: spec(
      [
        example('long', LONG_FILTERS, {
          allFilters: true,
          segmented: LONG_SCOPE_OPTIONS,
        }),
      ],
      filterBarCode(LONG_FILTERS, {
        allFilters: true,
        segmented: LONG_SCOPE_OPTIONS,
      })
    ),
  },
  platforms: 'table',
  story: Stories.Default,
  argTypes: filterBarArgTypes,
  tokens: tokens as TokensFile,
};
