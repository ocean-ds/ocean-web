import React from 'react';
import Tag from '../../../packages/ocean-react/src/Tag';
import type { ComponentDocConfig } from '../ComponentOverview';
import type { LocaleFiles } from '../i18n';
import type { TokensFile } from '../doc-parts';
import { tagArgTypes } from './argTypes';
import { tagPlatformSnippets } from './platform-snippets';
import tagTokens from '../../assets/tokens/tag.json';
import * as Stories from '../../../packages/ocean-react/src/Tag/stories/Tag.stories';
import tagEn from '../locales/tag.en.json';
import tagPt from '../locales/tag.pt.json';

const locale: LocaleFiles = {
  en: tagEn as LocaleFiles['en'],
  pt: tagPt as LocaleFiles['pt'],
};

const example = (
  node: React.ReactElement,
  code: string,
  translucent = false
) => ({
  rows: [
    <div
      className={translucent ? 'odoc-tag-surface' : 'odoc-tag-white-surface'}
      key={code}
    >
      {node}
    </div>,
  ],
  unframed: true,
  canvasClass: translucent
    ? 'odoc-canvas--tag-translucent'
    : 'odoc-canvas--white',
  code,
});

export const tagDoc: ComponentDocConfig = {
  id: 'tag',
  title: 'Tag',
  kind: 'component',
  source: 'packages/ocean-react/src/Tag/',
  groupOverview: 'components-data-display-tag-overview--docs',
  locale,
  imports: "import Tag from '@useblu/ocean-react/Tag';",
  primary: example(
    <Tag type="positive">Harbor Market</Tag>,
    '<Tag type="positive">Harbor Market</Tag>'
  ),
  sections: [
    {
      key: 'default',
      example: example(
        <Tag type="positive">Harbor Market</Tag>,
        '<Tag type="positive">Harbor Market</Tag>'
      ),
    },
    {
      key: 'highlight',
      example: example(
        <Tag variant="highlight" type="important">
          Harbor Market
        </Tag>,
        '<Tag variant="highlight" type="important">Harbor Market</Tag>'
      ),
    },
    {
      key: 'translucent',
      example: example(
        <Tag appearance="translucent" type="positive">
          Harbor Market
        </Tag>,
        '<Tag appearance="translucent" type="positive">Harbor Market</Tag>',
        true
      ),
    },
  ],
  platforms: tagPlatformSnippets,
  story: Stories.Default,
  argTypes: tagArgTypes,
  tokens: tagTokens as TokensFile,
};
