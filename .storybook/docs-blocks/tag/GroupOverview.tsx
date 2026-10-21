import React, { useEffect, useState } from 'react';
import Tag from '../../../packages/ocean-react/src/Tag';
import {
  Anatomy,
  DocTable,
  Section,
  Stage,
  Subsection,
  Swatch,
} from '../blocks';
import { GroupOverviewFrame } from '../GroupOverviewFrame';
import { LocaleFiles, Md, Translate, useTranslate } from '../i18n';
import { TAB_REQUEST_KEY, takeRequest } from '../navigation';
import en from '../locales/tag-group.en.json';
import pt from '../locales/tag-group.pt.json';

const DocsLink = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}): React.ReactElement => (
  <a href={`./?path=/docs/${id}`} target="_top">
    {children}
  </a>
);

const LOCALES: LocaleFiles[] = [{ en, pt }];

const TOC = {
  guidelines: [
    { id: 'overview', labelKey: 'guidelines.overview.title' },
    { id: 'variants', labelKey: 'guidelines.variants.title' },
    { id: 'anatomy', labelKey: 'guidelines.anatomy.title' },
    { id: 'writing', labelKey: 'guidelines.writing.title' },
    { id: 'behavior', labelKey: 'guidelines.behavior.title' },
    { id: 'related', labelKey: 'guidelines.related.title' },
    { id: 'feedback', labelKey: 'guidelines.feedback.title' },
  ],
  specs: [
    { id: 'colors', labelKey: 'specs.colors.title' },
    { id: 'typography', labelKey: 'specs.typography.title' },
    { id: 'sizes', labelKey: 'specs.sizes.title' },
    { id: 'structure', labelKey: 'specs.structure.title' },
  ],
  accessibility: [
    { id: 'requirements', labelKey: 'accessibility.requirements.title' },
    { id: 'considerations', labelKey: 'accessibility.considerations.title' },
  ],
} as const;

type TabId = keyof typeof TOC;

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
            content: <Tag type="positive">Harbor Market</Tag>,
          },
          {
            label: t('guidelines.overview.translucentLabel'),
            content: (
              <div className="odoc-tag-surface">
                <Tag appearance="translucent" type="positive">
                  Harbor Market
                </Tag>
              </div>
            ),
          },
        ]}
      />
      <Subsection
        id="when-to-use"
        title={t('guidelines.overview.whenToUseTitle')}
      >
        <ul>
          {t.list('guidelines.overview.whenToUseItems').map((item) => (
            <li key={item}>
              <Md text={item} />
            </li>
          ))}
        </ul>
      </Subsection>
      <Subsection
        id="when-to-avoid"
        title={t('guidelines.overview.whenToAvoidTitle')}
      >
        <ul>
          {t.list('guidelines.overview.whenToAvoidItems').map((item) => (
            <li key={item}>
              <Md text={item} />
            </li>
          ))}
        </ul>
      </Subsection>
    </Section>

    <Section id="variants" title={t('guidelines.variants.title')}>
      <p>
        <Md text={t('guidelines.variants.text')} />
      </p>
      <DocTable
        columns={t.list('guidelines.variants.columns')}
        rows={t.list('guidelines.variants.rows').map((row) => row.split('|'))}
      />
      <DocsLink id="components-data-display-tag-tag--overview">
        {t('guidelines.variants.componentLink')}
      </DocsLink>
    </Section>

    <Section id="anatomy" title={t('guidelines.anatomy.title')}>
      <p>
        <Md text={t('guidelines.anatomy.text')} />
      </p>
      <Anatomy
        canvasClass="odoc-canvas--white"
        example={<Tag type="positive">Harbor Market</Tag>}
        parts={[
          { selector: '.ods-tag__icon', side: 'left' },
          { selector: '.ods-tag__content', side: 'right' },
        ]}
      />
      <DocTable
        columns={t.list('guidelines.anatomy.columns')}
        rows={t.list('guidelines.anatomy.rows').map((row) => row.split('|'))}
      />
    </Section>

    <Section id="writing" title={t('guidelines.writing.title')}>
      <p>
        <Md text={t('guidelines.writing.text')} />
      </p>
      <ul>
        {t.list('guidelines.writing.items').map((item) => (
          <li key={item}>
            <Md text={item} />
          </li>
        ))}
      </ul>
    </Section>

    <Section id="behavior" title={t('guidelines.behavior.title')}>
      <p>
        <Md text={t('guidelines.behavior.text')} />
      </p>
      <DocTable
        columns={t.list('guidelines.behavior.columns')}
        rows={t.list('guidelines.behavior.rows').map((row) => row.split('|'))}
      />
    </Section>

    <Section id="related" title={t('guidelines.related.title')}>
      <p>
        <Md text={t('guidelines.related.text')} />
      </p>
      <DocsLink id="components-data-display-tag-tag--overview">
        {t('guidelines.related.componentLink')}
      </DocsLink>
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
    <Section id="colors" title={t('specs.colors.title')}>
      <p>
        <Md text={t('specs.colors.text')} />
      </p>
      <DocTable
        columns={t.list('specs.colors.columns')}
        rows={[
          [
            t('specs.colors.positive'),
            <Swatch
              key="positive-background"
              token="color-status-positive-down"
            />,
            <Swatch key="positive-text" token="color-interface-light-pure" />,
            <Swatch key="positive-icon" token="color-status-positive-up" />,
          ],
          [
            t('specs.colors.warning'),
            <Swatch
              key="warning-background"
              token="color-status-warning-down"
            />,
            <Swatch key="warning-text" token="color-interface-light-pure" />,
            <Swatch key="warning-icon" token="color-status-warning-up" />,
          ],
          [
            t('specs.colors.negative'),
            <Swatch
              key="negative-background"
              token="color-status-negative-down"
            />,
            <Swatch key="negative-text" token="color-interface-light-pure" />,
            <Swatch key="negative-icon" token="color-status-negative-up" />,
          ],
          [
            t('specs.colors.complementary'),
            <Swatch
              key="complementary-background"
              token="color-complementary-down"
            />,
            <Swatch
              key="complementary-text"
              token="color-interface-light-pure"
            />,
            <Swatch key="complementary-icon" token="color-complementary-up" />,
          ],
          [
            t('specs.colors.neutralInterface'),
            <Swatch key="neutral-background" token="color-interface-dark-up" />,
            <Swatch key="neutral-text" token="color-interface-light-pure" />,
            <Swatch key="neutral-icon" token="color-interface-light-pure" />,
          ],
          [
            t('specs.colors.neutralBrand'),
            <Swatch
              key="neutral02-background"
              token="color-brand-primary-up"
            />,
            <Swatch key="neutral02-text" token="color-interface-dark-deep" />,
            <Swatch key="neutral02-icon" token="color-brand-primary-down" />,
          ],
        ]}
      />
      <p>
        <Md text={t('specs.colors.opacity')} />
      </p>
    </Section>
    <Section id="typography" title={t('specs.typography.title')}>
      <p>
        <Md text={t('specs.typography.text')} />
      </p>
    </Section>
    <Section id="sizes" title={t('specs.sizes.title')}>
      <p>
        <Md text={t('specs.sizes.text')} />
      </p>
      <DocTable
        columns={t.list('specs.sizes.columns')}
        rows={t.list('specs.sizes.rows').map((row) => row.split('|'))}
      />
    </Section>
    <Section id="structure" title={t('specs.structure.title')}>
      <p>
        <Md text={t('specs.structure.text')} />
      </p>
      <DocTable
        columns={t.list('specs.structure.columns')}
        rows={t.list('specs.structure.rows').map((row) => row.split('|'))}
      />
    </Section>
  </>
);

const Accessibility = ({ t }: { t: Translate }): React.ReactElement => (
  <>
    <Section id="requirements" title={t('accessibility.requirements.title')}>
      <ul>
        {t.list('accessibility.requirements.items').map((item) => (
          <li key={item}>
            <Md text={item} />
          </li>
        ))}
      </ul>
    </Section>
    <Section
      id="considerations"
      title={t('accessibility.considerations.title')}
    >
      <ul>
        {t.list('accessibility.considerations.items').map((item) => (
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
