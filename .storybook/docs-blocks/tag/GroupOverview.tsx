import React, { useEffect, useState } from 'react';
import Tag from '../../../packages/ocean-react/src/Tag';
import {
  Anatomy,
  c,
  DocTable,
  DoDont,
  Section,
  Stage,
  Subsection,
  Swatch,
} from '../blocks';
import { GroupOverviewFrame } from '../GroupOverviewFrame';
import { LocaleFiles, Md, Translate, useTranslate } from '../i18n';
import tagTokens from '../../assets/tokens/tag.json';
import {
  SECTION_REQUEST_KEY,
  TAB_REQUEST_KEY,
  request,
  takeRequest,
} from '../navigation';
import common from '../locales/common.en.json';
import commonPt from '../locales/common.pt.json';
import en from '../locales/tag-group.en.json';
import pt from '../locales/tag-group.pt.json';
import { tagSurfaceClassName } from './story-helpers';

const COMPONENT_OVERVIEW = 'components-data-display-tag-tag--overview';
const LOCALES: LocaleFiles[] = [
  { en: common, pt: commonPt },
  { en, pt } as unknown as LocaleFiles,
];

const DocsLink = ({
  id,
  section,
  children,
}: {
  id: string;
  section?: string;
  children: React.ReactNode;
}): React.ReactElement => (
  <a
    href={`./?path=/docs/${id}`}
    target="_top"
    onClick={() => section && request(SECTION_REQUEST_KEY, section)}
  >
    {children}
  </a>
);

const TOC = {
  guidelines: [
    { id: 'overview', labelKey: 'guidelines.overview.title' },
    { id: 'formatting', labelKey: 'guidelines.formatting.title' },
    { id: 'content', labelKey: 'guidelines.content.title' },
    { id: 'behaviors', labelKey: 'guidelines.behaviors.title' },
    { id: 'related', labelKey: 'guidelines.related.title' },
    { id: 'feedback', labelKey: 'guidelines.feedback.title' },
  ],
  specs: [
    { id: 'color', labelKey: 'specs.color.title' },
    { id: 'typography', labelKey: 'specs.typography.title' },
    { id: 'structure', labelKey: 'specs.structure.title' },
    { id: 'size', labelKey: 'specs.size.title' },
  ],
  accessibility: [
    { id: 'ocean-provides', labelKey: 'accessibility.oceanProvides.title' },
    { id: 'development', labelKey: 'accessibility.development.title' },
  ],
} as const;

type TabId = keyof typeof TOC;
type ColorMap = Record<string, string[]>;
const NO_TOKEN_BACKGROUND = 'no-token-background';
const NO_TOKEN_BACKGROUND_VALUE =
  tagTokens.rows.find(
    ({ property, noToken }) => property === 'background-color' && noToken
  )?.noToken ?? '';

const DEFAULT_COLORS: ColorMap = {
  default: [
    'color-interface-light-up',
    'color-interface-dark-down',
    'color-brand-primary-down',
  ],
  positive: [
    'color-status-positive-up',
    'color-status-positive-deep',
    'color-status-positive-deep',
  ],
  warning: [
    'color-status-warning-up',
    'color-status-warning-deep',
    'color-status-warning-deep',
  ],
  negative: [
    'color-status-negative-up',
    'color-status-negative-pure',
    'color-status-negative-pure',
  ],
  neutral: [
    'color-interface-light-up',
    'color-interface-dark-up',
    'color-interface-dark-up',
  ],
  'neutral-02': [
    'color-interface-light-up',
    'color-brand-primary-down',
    'color-brand-primary-down',
  ],
  'neutral-03': [
    NO_TOKEN_BACKGROUND,
    'color-complementary-pure',
    'color-complementary-pure',
  ],
  complementary: [
    NO_TOKEN_BACKGROUND,
    'color-complementary-deep',
    'color-complementary-deep',
  ],
};
const HIGHLIGHT_COLORS: ColorMap = {
  important: ['color-highlight-pure', 'color-interface-light-pure'],
  neutral: ['color-brand-primary-down', 'color-interface-light-pure'],
};
const TRANSLUCENT_COLORS: ColorMap = {
  positive: [
    'color-status-positive-down',
    'color-interface-light-pure',
    'color-status-positive-up',
  ],
  warning: [
    'color-status-warning-down',
    'color-interface-light-pure',
    'color-status-warning-up',
  ],
  negative: [
    'color-status-negative-down',
    'color-interface-light-pure',
    'color-status-negative-up',
  ],
  complementary: [
    'color-complementary-down',
    'color-interface-light-pure',
    'color-complementary-up',
  ],
  neutral: [
    'color-interface-dark-up',
    'color-interface-light-pure',
    'color-interface-light-pure',
  ],
  'neutral-02': [
    'color-brand-primary-up',
    'color-interface-dark-deep',
    'color-brand-primary-down',
  ],
};
const PROPERTIES = ['background', 'text', 'icon'] as const;

const tokenCell = (
  token: string,
  t: Translate,
  translucent = false
): React.ReactNode =>
  token === NO_TOKEN_BACKGROUND ? (
    <>
      {t('specs.color.noToken')}{' '}
      <span className="odoc-swatch">
        <span
          className="odoc-swatch__chip"
          style={{ background: NO_TOKEN_BACKGROUND_VALUE }}
          aria-hidden
        />
        {c(NO_TOKEN_BACKGROUND_VALUE)}
      </span>
    </>
  ) : (
    <>
      <Swatch token={token} />
      {translucent && ` · ${t('specs.color.opacity')}`}
    </>
  );

const colorRows = (t: Translate): React.ReactNode[][] => {
  const rows: React.ReactNode[][] = [];
  const add = (variant: string, colors: ColorMap, translucent = false) => {
    Object.entries(colors).forEach(([type, tokens]) =>
      tokens.forEach((token, index) => {
        rows.push([
          <Md
            key="element"
            text={`${t(`specs.color.variants.${variant}`)} · ${type}`}
          />,
          <Md
            key="property"
            text={t(`specs.color.properties.${PROPERTIES[index]}`)}
          />,
          tokenCell(token, t, translucent && index === 0),
        ]);
      })
    );
  };
  add('default', DEFAULT_COLORS);
  add('highlight', HIGHLIGHT_COLORS);
  add('translucent', TRANSLUCENT_COLORS, true);
  return rows;
};

const localeCells = (row: string): React.ReactNode[] =>
  row.split('|').map((cell, index) => <Md key={index} text={cell} />);

const FullTokenList = ({ t }: { t: Translate }): React.ReactElement => (
  <p>
    <DocsLink id={COMPONENT_OVERVIEW} section="design-tokens">
      {t('specs.fullTokenList')}
    </DocsLink>
  </p>
);

const Guidelines = ({ t }: { t: Translate }): React.ReactElement => (
  <>
    <Section id="overview" title={t('guidelines.overview.title')}>
      <p>
        <Md text={t('guidelines.overview.text')} />
      </p>
      <Stage
        frames={[
          {
            label: t('guidelines.overview.defaultLabel'),
            content: <Tag type="positive">Paid</Tag>,
          },
          {
            label: t('guidelines.overview.translucentLabel'),
            content: (
              <div className={tagSurfaceClassName('positive')}>
                <Tag appearance="translucent" type="positive">
                  Paid
                </Tag>
              </div>
            ),
          },
        ]}
      />
      <div className="odoc-columns">
        {(['whenToUse', 'whenNotToUse'] as const).map((key) => (
          <div key={key} className="odoc-prose">
            <h4>{t(`guidelines.overview.${key}Title`)}</h4>
            <ul>
              {t.list(`guidelines.overview.${key}Items`).map((item) => (
                <li key={item}>
                  <Md text={item} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Subsection id="variants" title={t('guidelines.variants.title')}>
        <DocTable
          columns={t.list('guidelines.variants.columns')}
          rows={(['default', 'highlight', 'translucent'] as const).map(
            (key) => [
              t(`guidelines.variants.${key}`),
              t(`guidelines.variants.purposes.${key}`),
              <DocsLink key={key} id={COMPONENT_OVERVIEW} section={key}>
                {t('guidelines.variants.link')}
              </DocsLink>,
            ]
          )}
        />
      </Subsection>
    </Section>
    <Section id="formatting" title={t('guidelines.formatting.title')}>
      <Subsection id="anatomy" title={t('guidelines.formatting.anatomy.title')}>
        <p>
          <Md text={t('guidelines.formatting.anatomy.text')} />
        </p>
        <Anatomy
          canvasClass="odoc-canvas--white"
          example={<Tag type="positive">Paid</Tag>}
          parts={[
            { selector: '.ods-tag__icon', side: 'top' },
            { selector: '.ods-tag__content', side: 'bottom' },
          ]}
        />
        <DocTable
          columns={t.list('guidelines.formatting.anatomy.columns')}
          rows={t.list('guidelines.formatting.anatomy.rows').map(localeCells)}
        />
      </Subsection>
      <Subsection id="sizes" title={t('guidelines.formatting.sizes.title')}>
        <p>
          <Md text={t('guidelines.formatting.sizes.text')} />
        </p>
        <DocTable
          columns={t.list('guidelines.formatting.sizes.columns')}
          rows={t.list('guidelines.formatting.sizes.rows').map(localeCells)}
        />
      </Subsection>
    </Section>
    <Section id="content" title={t('guidelines.content.title')}>
      <p>
        <Md text={t('guidelines.content.text')} />
      </p>
      <ul>
        {t.list('guidelines.content.writingItems').map((item) => (
          <li key={item}>
            <Md text={item} />
          </li>
        ))}
      </ul>
      <Subsection id="do-dont" title={t('guidelines.content.doDontTitle')}>
        <DoDont
          verdicts={{
            do: t('guidelines.content.do'),
            dont: t('guidelines.content.dont'),
            caution: t('guidelines.content.caution'),
          }}
          items={[
            {
              kind: 'do',
              example: <Tag type="positive">Paid</Tag>,
              text: <Md text={t('guidelines.content.doDont.shortDo')} />,
            },
            {
              kind: 'dont',
              example: (
                <Tag type="positive">Payment was successfully processed</Tag>
              ),
              text: <Md text={t('guidelines.content.doDont.shortDont')} />,
            },
            {
              kind: 'do',
              example: (
                <div className={tagSurfaceClassName('positive', true)}>
                  <Tag appearance="translucent" type="positive">
                    Paid
                  </Tag>
                </div>
              ),
              text: <Md text={t('guidelines.content.doDont.surfaceDo')} />,
            },
            {
              kind: 'dont',
              example: (
                <div className="odoc-tag-white-surface odoc-tag-surface--compact">
                  <Tag appearance="translucent" type="positive">
                    Paid
                  </Tag>
                </div>
              ),
              text: <Md text={t('guidelines.content.doDont.surfaceDont')} />,
            },
            {
              kind: 'do',
              example: (
                <div className="odoc-tag-demo-row">
                  <Tag type="positive">Paid</Tag>
                  <Tag type="warning">Due soon</Tag>
                </div>
              ),
              text: <Md text={t('guidelines.content.doDont.sizesDo')} />,
            },
            {
              kind: 'dont',
              example: (
                <div className="odoc-tag-demo-row">
                  <Tag type="positive" size="small">
                    Paid
                  </Tag>
                  <Tag type="warning">Due soon</Tag>
                </div>
              ),
              text: <Md text={t('guidelines.content.doDont.sizesDont')} />,
            },
          ]}
        />
      </Subsection>
    </Section>
    <Section id="behaviors" title={t('guidelines.behaviors.title')}>
      <p>
        <Md text={t('guidelines.behaviors.text')} />
      </p>
      <DocTable
        columns={t.list('guidelines.behaviors.columns')}
        rows={t.list('guidelines.behaviors.rows').map(localeCells)}
      />
      <Subsection
        id="long-text"
        title={t('guidelines.behaviors.longTextTitle')}
      >
        <p>
          <Md text={t('guidelines.behaviors.longText')} />
        </p>
        <div className="odoc-tag-narrow">
          <Tag type="complementary">
            Payment to supplier scheduled for Nov 12
          </Tag>
        </div>
      </Subsection>
    </Section>
    <Section id="related" title={t('guidelines.related.title')}>
      <div className="odoc-related">
        {(['badge', 'chips'] as const).map((key) => (
          <div key={key} className="odoc-related__card odoc-prose">
            <h4>{t(`guidelines.related.${key}.title`)}</h4>
            <p>
              <Md text={t(`guidelines.related.${key}.text`)} />
            </p>
            <DocsLink
              id={
                key === 'badge'
                  ? 'components-badge--docs'
                  : 'components-chips--docs'
              }
            >
              {t(`guidelines.related.${key}.link`)}
            </DocsLink>
          </div>
        ))}
      </div>
    </Section>
    <Section id="feedback" title={t('guidelines.feedback.title')}>
      <p>
        <Md text={t('guidelines.feedback.text')} />
      </p>
    </Section>
  </>
);

const Specs = ({ t }: { t: Translate }): React.ReactElement => (
  <>
    <Section id="color" title={t('specs.color.title')}>
      <p>
        <Md text={t('specs.color.text')} />
      </p>
      <DocTable columns={t.list('specs.color.columns')} rows={colorRows(t)} />
      <FullTokenList t={t} />
    </Section>
    {(['typography', 'structure', 'size'] as const).map((key) => (
      <Section key={key} id={key} title={t(`specs.${key}.title`)}>
        <p>
          <Md text={t(`specs.${key}.text`)} />
        </p>
        <DocTable
          columns={t.list(`specs.${key}.columns`)}
          rows={t.list(`specs.${key}.rows`).map(localeCells)}
        />
        <FullTokenList t={t} />
      </Section>
    ))}
  </>
);

const Accessibility = ({ t }: { t: Translate }): React.ReactElement => (
  <>
    <Section id="ocean-provides" title={t('accessibility.oceanProvides.title')}>
      <p>
        <Md text={t('accessibility.oceanProvides.text')} />
      </p>
      <DocTable
        columns={t.list('accessibility.oceanProvides.keyboardColumns')}
        rows={t
          .list('accessibility.oceanProvides.keyboardRows')
          .map(localeCells)}
      />
    </Section>
    <Section id="development" title={t('accessibility.development.title')}>
      <ul>
        {t.list('accessibility.development.items').map((item) => (
          <li key={item}>
            <Md text={item} />
          </li>
        ))}
      </ul>
    </Section>
  </>
);

export const GroupOverview = (): React.ReactElement => {
  const t = useTranslate(...LOCALES);
  const [tab, setTab] = useState<TabId>(() => {
    const requested = takeRequest(TAB_REQUEST_KEY);
    return requested && requested in TOC ? (requested as TabId) : 'guidelines';
  });
  useEffect(() => window.scrollTo?.(0, 0), []);

  return (
    <GroupOverviewFrame
      t={t}
      page={{
        title: t('page.title'),
        status: t('page.status'),
        lastUpdated: '2026-10-21',
        library: 'Ocean Core',
        github: 'https://github.com/ocean-ds/ocean-web',
      }}
      activeTab={tab}
      tabs={Object.keys(TOC)}
      onTabChange={(id) => setTab(id as TabId)}
      content={
        <>
          {tab === 'guidelines' && <Guidelines t={t} />}
          {tab === 'specs' && <Specs t={t} />}
          {tab === 'accessibility' && <Accessibility t={t} />}
        </>
      }
      tocItems={TOC[tab].map(({ id, labelKey }) => ({
        id,
        label: t(labelKey),
      }))}
    />
  );
};

export default GroupOverview;
