import React from 'react';
import { Star } from '@useblu/ocean-icons-react';
import Tag from '../../../packages/ocean-react/src/Tag';
import type { ComponentDocConfig } from '../ComponentOverview';
import type { LocaleFiles } from '../i18n';
import type { TokensFile } from '../doc-parts';
import { tagArgTypes } from './argTypes';
import { tagPlatformSnippets } from './platform-snippets';
import {
  tagSurfaceClassName,
  tagTranslucentCanvasClassName,
} from './story-helpers';
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
  translucent = false,
  type = 'positive'
) => ({
  rows: [
    <div
      className={
        translucent ? tagSurfaceClassName(type) : 'odoc-tag-white-surface'
      }
      key={code}
    >
      {node}
    </div>,
  ],
  unframed: true,
  canvasClass: translucent
    ? tagTranslucentCanvasClassName(type)
    : 'odoc-canvas--white',
  code,
});

export const tagDoc: ComponentDocConfig = {
  id: 'tag',
  title: 'Tag',
  kind: 'component',
  status: 'stable',
  source: 'packages/ocean-react/src/Tag/',
  groupOverview: 'components-data-display-tag-overview--docs',
  locale,
  imports: "import Tag from '@useblu/ocean-react/Tag';",
  primary: example(
    <Tag type="positive">Paid</Tag>,
    '<Tag type="positive">Paid</Tag>'
  ),
  sections: [
    {
      key: 'default',
      example: example(
        <Tag type="positive">Paid</Tag>,
        '<Tag type="positive">Paid</Tag>'
      ),
    },
    {
      key: 'highlight',
      example: example(
        <Tag variant="highlight" type="important">
          Save 75%
        </Tag>,
        '<Tag variant="highlight" type="important">Save 75%</Tag>'
      ),
    },
    {
      key: 'translucent',
      example: example(
        <Tag appearance="translucent" type="positive">
          Paid
        </Tag>,
        '<Tag appearance="translucent" type="positive">Paid</Tag>',
        true,
        'positive'
      ),
    },
  ],
  optionsTitle: 'sections.options',
  optionsLocalePrefix: 'options',
  options: {
    size: {
      rows: [
        <Tag key="small" type="positive" size="small">
          Paid
        </Tag>,
        <Tag key="medium" type="positive" size="medium">
          Paid
        </Tag>,
      ],
      code: '<Tag type="positive" size="small">Paid</Tag>\n<Tag type="positive" size="medium">Paid</Tag>',
    },
    icon: {
      rows: [
        <Tag key="icon" type="positive" icon={<Star />}>
          Paid
        </Tag>,
      ],
      code: 'import { Star } from \'@useblu/ocean-icons-react\';\n\n<Tag type="positive" icon={<Star />}>Paid</Tag>',
    },
    setIconOff: {
      rows: [
        <Tag key="icon-off" type="positive" setIconOff>
          Paid
        </Tag>,
      ],
      code: '<Tag type="positive" setIconOff>Paid</Tag>',
    },
  },
  platforms: tagPlatformSnippets,
  story: Stories.Default,
  argTypes: tagArgTypes,
  tokens: tagTokens as TokensFile,
};
