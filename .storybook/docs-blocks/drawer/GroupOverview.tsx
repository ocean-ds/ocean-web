import React, { ReactNode, useEffect, useState } from 'react';
import Link from '../../../packages/ocean-react/src/Link';
import Button from '../../../packages/ocean-react/src/Button';
import List from '../../../packages/ocean-react/src/List';
import ListAction from '../../../packages/ocean-react/src/ListAction';
import { DoDont, DocTable, Section, Subsection, Swatch } from '../blocks';
import { ComponentOverview, componentToc } from '../ComponentOverview';
import { GroupOverviewFrame } from '../GroupOverviewFrame';
import { drawerDoc, stackedExample } from './pages';
import { LocaleFiles, Md, useTranslate } from '../i18n';
import {
  request,
  SECTION_REQUEST_KEY,
  takeRequest,
  TAB_REQUEST_KEY,
} from '../navigation';
import common from '../locales/common.en.json';
import commonPt from '../locales/common.pt.json';
import en from '../locales/drawer-group.en.json';
import pt from '../locales/drawer-group.pt.json';

const LOCALES: LocaleFiles[] = [
  { en: common, pt: commonPt },
  { en, pt } as unknown as LocaleFiles,
];
const tabs = ['guidelines', 'specs', 'accessibility', 'code'] as const;
const relatedComponents = [
  { key: 'modal', id: 'components-modal--docs' },
  { key: 'listAction', id: 'components-lists-list-listaction--docs' },
] as const;
const toc: Record<
  Exclude<typeof tabs[number], 'code'>,
  { id: string; labelKey: string }[]
> = {
  guidelines: [
    { id: 'overview', labelKey: 'guidelines.overview' },
    { id: 'formatting', labelKey: 'guidelines.formatting' },
    { id: 'content', labelKey: 'guidelines.content' },
    { id: 'behaviors', labelKey: 'guidelines.behaviors' },
    { id: 'related', labelKey: 'guidelines.related' },
    { id: 'feedback', labelKey: 'guidelines.feedback' },
  ],
  specs: [
    { id: 'colors', labelKey: 'specs.colors' },
    { id: 'typography', labelKey: 'specs.typography' },
    { id: 'structure', labelKey: 'specs.structure' },
    { id: 'size', labelKey: 'specs.size' },
  ],
  accessibility: [
    { id: 'keyboard', labelKey: 'accessibility.keyboard' },
    { id: 'development', labelKey: 'accessibility.development' },
  ],
};

const DocsLink = ({
  id,
  section,
  children,
}: {
  id: string;
  section?: string;
  children: ReactNode;
}): React.ReactElement => (
  <Link
    href={`./?path=/docs/${id}`}
    target="_top"
    onClick={() => section && request(SECTION_REQUEST_KEY, section)}
  >
    {children}
  </Link>
);

export const DrawerOverview = (): React.ReactElement => {
  const t = useTranslate(...LOCALES);
  const tCode = useTranslate({ en: common, pt: commonPt }, drawerDoc.locale);
  const [active, setActive] = useState<typeof tabs[number]>(() => {
    const requested = takeRequest(TAB_REQUEST_KEY);
    return tabs.includes(requested as typeof tabs[number])
      ? (requested as typeof tabs[number])
      : 'guidelines';
  });
  useEffect(() => window.scrollTo?.(0, 0), []);
  const rows = (key: string) =>
    t
      .list(key)
      .map((row) =>
        row.split('|').map((cell, index) => <Md key={index} text={cell} />)
      );
  const linkToCode = (label: string, section?: string) => (
    <Link
      href={`#${section ?? 'overview'}`}
      onClick={(event) => {
        event.preventDefault();
        setActive('code');
        setTimeout(
          () =>
            document.getElementById(section ?? 'overview')?.scrollIntoView(),
          100
        );
      }}
    >
      {label}
    </Link>
  );
  let content: React.ReactNode;
  if (active === 'guidelines') {
    content = (
      <>
        <Section id="overview" title={t('overview.title')}>
          <p>{t('overview.text')}</p>
          {stackedExample}
          <div className="odoc-columns">
            {(['whenToUse', 'whenNotToUse'] as const).map((key) => (
              <div key={key} className="odoc-prose">
                <h4>{t(`overview.${key}`)}</h4>
                <ul>
                  {t.list(`overview.${key}Items`).map((item) => (
                    <li key={item}>
                      <Md text={item} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Subsection id="variants" title={t('overview.variants')}>
            <DocTable
              columns={t.list('overview.variantColumns')}
              rows={t.list('overview.variantRows').map((row) => {
                const [variant, purpose] = row.split('|');
                return [
                  <Md key="variant" text={variant} />,
                  <Md key="purpose" text={purpose} />,
                ];
              })}
            />
          </Subsection>
        </Section>
        <Section id="formatting" title={t('formatting.title')}>
          <Subsection id="anatomy" title={t('formatting.anatomy')}>
            <DocTable
              columns={t.list('anatomy.columns')}
              rows={rows('anatomy.rows')}
            />
          </Subsection>
          <Subsection id="layout" title={t('formatting.layoutTitle')}>
            <p>{t('formatting.layoutText')}</p>
            <DocTable
              columns={t.list('formatting.layoutColumns')}
              rows={rows('formatting.layoutRows')}
            />
          </Subsection>
        </Section>
        <Section id="content" title={t('content.title')}>
          <p>{t('content.text')}</p>
          <ul>
            {t.list('content.writingItems').map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Subsection id="next-examples" title={t('content.nextExamples')}>
            <DoDont
              items={[
                {
                  kind: 'do',
                  example: (
                    <List>
                      <ListAction
                        title="Second drawer"
                        description="Opens beside this one"
                        actionType="chevron"
                      />
                    </List>
                  ),
                  text: <Md text={t('content.nextDo')} />,
                },
                {
                  kind: 'dont',
                  example: (
                    <Button variant="secondary">Open second drawer</Button>
                  ),
                  text: <Md text={t('content.nextDont')} />,
                },
              ]}
            />
          </Subsection>
        </Section>
        <Section id="behaviors" title={t('behaviors.title')}>
          <p>
            <Md text={t('behaviors.text')} />
          </p>
          <DocTable
            columns={t.list('behaviors.columns')}
            rows={rows('behaviors.rows')}
          />
        </Section>
        <Section id="related" title={t('related.title')}>
          <div className="odoc-related">
            {relatedComponents.map(({ key, id }) => (
              <div key={key} className="odoc-related__card odoc-prose">
                <h4>{t(`related.${key}.title`)}</h4>
                <p>{t(`related.${key}.text`)}</p>
                <DocsLink id={id}>{t(`related.${key}.link`)}</DocsLink>
              </div>
            ))}
          </div>
        </Section>
        <Section id="feedback" title={t('feedback.title')}>
          <p>{t('feedback.text')}</p>
        </Section>
      </>
    );
  } else if (active === 'specs') {
    const colors = t.list('colors.rows').map((row) => {
      const [element, property, token] = row.split('|');
      return [
        <Md key="element" text={element} />,
        <Md key="property" text={property} />,
        <Swatch key="token" token={token} />,
      ];
    });
    content = (
      <>
        {(['colors', 'typography', 'structure', 'size'] as const).map((key) => (
          <Section key={key} id={key} title={t(`${key}.title`)}>
            <DocTable
              columns={t.list(`${key}.columns`)}
              rows={key === 'colors' ? colors : rows(`${key}.rows`)}
            />
            <p>{linkToCode(t('tokens.link'), 'design-tokens')}</p>
          </Section>
        ))}
      </>
    );
  } else if (active === 'code') {
    content = <ComponentOverview config={drawerDoc} embedded />;
  } else {
    content = (
      <>
        <Section id="keyboard" title={t('keyboard.title')}>
          <DocTable
            columns={t.list('keyboard.columns')}
            rows={rows('keyboard.rows')}
          />
        </Section>
        <Section id="development" title={t('development.title')}>
          <ul>
            {t.list('development.items').map((item) => (
              <li key={item}>
                <Md text={item} />
              </li>
            ))}
          </ul>
        </Section>
      </>
    );
  }
  return (
    <GroupOverviewFrame
      t={t}
      page={{
        title: t('page.title'),
        status: 'Stable',
        lastUpdated: '2026-10-23',
        library: 'Ocean React',
        github: 'https://github.com/ocean-ds/ocean-web',
      }}
      activeTab={active}
      tabs={[...tabs]}
      onTabChange={(tab) => setActive(tab as typeof tabs[number])}
      content={content}
      tocItems={
        active === 'code'
          ? componentToc(drawerDoc, tCode)
          : toc[active].map(({ id, labelKey }) => ({
              id,
              label: t(labelKey),
            }))
      }
    />
  );
};

export default DrawerOverview;
