import React, { useEffect, useState } from 'react';
import { DocTable, Section, Subsection } from '../blocks';
import { GroupOverviewFrame } from '../GroupOverviewFrame';
import { LocaleFiles, Md, Translate, useTranslate } from '../i18n';
import { TAB_REQUEST_KEY, takeRequest } from '../navigation';
import common from '../locales/common.en.json';
import commonPt from '../locales/common.pt.json';
import en from '../locales/transaction-group.en.json';
import pt from '../locales/transaction-group.pt.json';

type TabId = 'guidelines' | 'specs' | 'accessibility';

const TOC: Record<TabId, { id: string; labelKey: string }[]> = {
  guidelines: [
    { id: 'when-to-use', labelKey: 'guidelines.whenToUse.title' },
    { id: 'anatomy', labelKey: 'guidelines.anatomy.title' },
    { id: 'content', labelKey: 'guidelines.content.title' },
    { id: 'behavior', labelKey: 'guidelines.behavior.title' },
  ],
  specs: [
    { id: 'tokens', labelKey: 'specs.tokens.title' },
    { id: 'typography', labelKey: 'specs.typography.title' },
    { id: 'spacing', labelKey: 'specs.spacing.title' },
    { id: 'structure', labelKey: 'specs.structure.title' },
  ],
  accessibility: [
    {
      id: 'accessibility-requirements',
      labelKey: 'accessibility.requirements.title',
    },
  ],
};

const LOCALES: LocaleFiles[] = [
  { en: common, pt: commonPt },
  { en, pt } as unknown as LocaleFiles,
];

const DocsTable = ({
  t,
  path,
  rows,
}: {
  t: Translate;
  path: string;
  rows: string[][];
}): React.ReactElement => (
  <DocTable columns={t.list(`${path}.columns`)} rows={rows} />
);

const Guidelines = ({ t }: { t: Translate }): React.ReactElement => (
  <>
    <Section id="when-to-use" title={t('guidelines.whenToUse.title')}>
      <ul>
        {t.list('guidelines.whenToUse.items').map((item) => (
          <li key={item}>
            <Md text={item} />
          </li>
        ))}
      </ul>
    </Section>
    <Section id="anatomy" title={t('guidelines.anatomy.title')}>
      <p>
        <Md text={t('guidelines.anatomy.text')} />
      </p>
    </Section>
    <Section id="content" title={t('guidelines.content.title')}>
      <ul>
        {t.list('guidelines.content.items').map((item) => (
          <li key={item}>
            <Md text={item} />
          </li>
        ))}
      </ul>
    </Section>
    <Section id="behavior" title={t('guidelines.behavior.title')}>
      <ul>
        {t.list('guidelines.behavior.items').map((item) => (
          <li key={item}>
            <Md text={item} />
          </li>
        ))}
      </ul>
    </Section>
  </>
);

const Specs = ({ t }: { t: Translate }): React.ReactElement => (
  <>
    <Section id="tokens" title={t('specs.tokens.title')}>
      <p>
        <Md text={t('specs.tokens.text')} />
      </p>
      <DocsTable
        t={t}
        path="specs.tokens.table"
        rows={t.list('specs.tokens.rows').map((row) => row.split('|'))}
      />
    </Section>
    <Section id="typography" title={t('specs.typography.title')}>
      <p>
        <Md text={t('specs.typography.text')} />
      </p>
    </Section>
    <Section id="spacing" title={t('specs.spacing.title')}>
      <p>
        <Md text={t('specs.spacing.text')} />
      </p>
    </Section>
    <Section id="structure" title={t('specs.structure.title')}>
      <Subsection id="footer-structure" title={t('specs.structure.footer')}>
        <p>
          <Md text={t('specs.structure.footerText')} />
        </p>
      </Subsection>
      <Subsection id="summary-structure" title={t('specs.structure.summary')}>
        <p>
          <Md text={t('specs.structure.summaryText')} />
        </p>
      </Subsection>
    </Section>
  </>
);

const Accessibility = ({ t }: { t: Translate }): React.ReactElement => (
  <Section
    id="accessibility-requirements"
    title={t('accessibility.requirements.title')}
  >
    <ul>
      {t.list('accessibility.requirements.items').map((item) => (
        <li key={item}>
          <Md text={item} />
        </li>
      ))}
    </ul>
  </Section>
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
        lastUpdated: '2026-10-13',
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
