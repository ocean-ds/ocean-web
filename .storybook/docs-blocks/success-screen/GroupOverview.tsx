import React, { ReactNode, useEffect, useState } from 'react';
import Link from '../../../packages/ocean-react/src/Link';
import { List, TransactionListItem } from '../../../packages/ocean-react/src';
import SuccessScreen from '../../../packages/ocean-react/src/SuccessScreen';
import {
  Anatomy,
  DoDont,
  DocTable,
  Section,
  Stage,
  Subsection,
  Swatch,
} from '../blocks';
import { GroupOverviewFrame } from '../GroupOverviewFrame';
import { LocaleFiles, Md, Translate, useTranslate } from '../i18n';
import {
  request,
  SECTION_REQUEST_KEY,
  takeRequest,
  TAB_REQUEST_KEY,
} from '../navigation';
import common from '../locales/common.en.json';
import commonPt from '../locales/common.pt.json';
import en from '../locales/success-screen-group.en.json';
import pt from '../locales/success-screen-group.pt.json';

const LOCALES: LocaleFiles[] = [
  { en: common, pt: commonPt },
  { en, pt } as unknown as LocaleFiles,
];
const tabs = ['guidelines', 'specs', 'accessibility'] as const;
const componentOverviewId =
  'components-feedback-success-screen-success-screen--docs';
const toc: Record<typeof tabs[number], { id: string; labelKey: string }[]> = {
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

const PaymentDetails = ({
  repeatConfirmation = false,
}: {
  repeatConfirmation?: boolean;
}): React.ReactElement => (
  <List>
    <TransactionListItem>
      {repeatConfirmation
        ? 'Payment complete · Coral Distributors · R$ 6.819,33'
        : 'Payment to supplier · Coral Distributors · R$ 6.819,33'}
    </TransactionListItem>
    <TransactionListItem>
      {repeatConfirmation
        ? 'Payment complete · Ocean Card'
        : 'Payment method · Ocean Card'}
    </TransactionListItem>
  </List>
);

const AnatomyExample = (): React.ReactElement => (
  <SuccessScreen
    title="Payment complete"
    description="Your payment has been processed."
    tagLabel="Paid"
    extraInformation="Nov 12, 9:15 AM"
    secondaryAction={{ label: 'Done' }}
    primaryAction={{ label: 'View payment' }}
  >
    <PaymentDetails />
  </SuccessScreen>
);

const ExampleScreen = ({
  title = 'Payment complete',
  repeatConfirmation = false,
}: {
  title?: string;
  repeatConfirmation?: boolean;
}): React.ReactElement => (
  <SuccessScreen
    title={title}
    description="Your payment has been processed."
    tagLabel="Paid"
  >
    <PaymentDetails repeatConfirmation={repeatConfirmation} />
  </SuccessScreen>
);

export const GroupOverview = (): React.ReactElement => {
  const t = useTranslate(...LOCALES);
  const [active, setActive] = useState<typeof tabs[number]>(() => {
    const requested = takeRequest(TAB_REQUEST_KEY);
    return tabs.includes(requested as typeof tabs[number])
      ? (requested as typeof tabs[number])
      : 'guidelines';
  });
  useEffect(() => window.scrollTo?.(0, 0), []);
  const rows = (key: string) => t.list(key).map((row) => row.split('|'));
  const linkToOverview = (label: string, section?: string) => (
    <DocsLink id={componentOverviewId} section={section}>
      {label}
    </DocsLink>
  );
  const colors = t.list('colors.rows').map((row) => {
    const [element, property, token, note] = row.split('|');
    return [
      element,
      property,
      <span key={`${element}-${token}`}>
        <Swatch token={token} />
        {note && ` · ${note}`}
      </span>,
    ];
  });
  let content: React.ReactNode;
  if (active === 'guidelines') {
    const anatomyParts = [
      {
        selector: '.ods-success-screen__tag .ods-tag__icon',
        side: 'top' as const,
      },
      {
        selector: '.ods-success-screen__tag .ods-tag__content',
        side: 'top' as const,
      },
      { selector: '.ods-success-screen__title', side: 'right' as const },
      { selector: '.ods-success-screen__description', side: 'right' as const },
      { selector: '.ods-success-screen__content', side: 'left' as const },
      {
        selector: '.ods-success-screen__extra-information',
        side: 'left' as const,
      },
      { selector: '.ods-success-screen__actions', side: 'bottom' as const },
    ];
    content = (
      <>
        <Section id="overview" title={t('overview.title')}>
          <p>{t('overview.text')}</p>
          <Stage frames={[{ content: <SuccessExample /> }]} />
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
                  variant,
                  purpose,
                  linkToOverview(t('overview.overviewLink')),
                ];
              })}
            />
          </Subsection>
        </Section>
        <Section id="formatting" title={t('formatting.title')}>
          <Subsection id="anatomy" title={t('formatting.anatomy')}>
            <Anatomy
              example={<AnatomyExample />}
              parts={anatomyParts}
              canvasClass="odoc-canvas--white"
            />
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
          <Subsection id="title-examples" title={t('content.titleExamples')}>
            <DoDont
              items={[
                {
                  kind: 'do',
                  example: <ExampleScreen title="Paid" />,
                  text: <Md text={t('content.shortTitleDo')} />,
                },
                {
                  kind: 'dont',
                  example: <ExampleScreen title="Your payment is complete." />,
                  text: <Md text={t('content.shortTitleDont')} />,
                },
              ]}
            />
          </Subsection>
          <Subsection
            id="details-examples"
            title={t('content.detailsExamples')}
          >
            <DoDont
              items={[
                {
                  kind: 'do',
                  example: <ExampleScreen />,
                  text: <Md text={t('content.detailsDo')} />,
                },
                {
                  kind: 'dont',
                  example: <ExampleScreen repeatConfirmation />,
                  text: <Md text={t('content.detailsDont')} />,
                },
              ]}
            />
          </Subsection>
        </Section>
        <Section id="behaviors" title={t('behaviors.title')}>
          <p>{t('behaviors.text')}</p>
          <DocTable
            columns={t.list('behaviors.columns')}
            rows={rows('behaviors.rows')}
          />
        </Section>
        <Section id="related" title={t('related.title')}>
          <div className="odoc-related">
            {(['badge', 'chips'] as const).map((key) => (
              <div key={key} className="odoc-related__card odoc-prose">
                <h4>{t(`related.${key}.title`)}</h4>
                <p>{t(`related.${key}.text`)}</p>
                <DocsLink
                  id={
                    key === 'badge'
                      ? 'components-badge--docs'
                      : 'components-chips--docs'
                  }
                >
                  {t(`related.${key}.link`)}
                </DocsLink>
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
    content = (
      <>
        {(['colors', 'typography', 'structure', 'size'] as const).map((key) => (
          <Section key={key} id={key} title={t(`${key}.title`)}>
            <DocTable
              columns={t.list(`${key}.columns`)}
              rows={key === 'colors' ? colors : rows(`${key}.rows`)}
            />
            <p>{linkToOverview(t('tokens.link'), 'design-tokens')}</p>
          </Section>
        ))}
      </>
    );
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
        lastUpdated: '2026-10-21',
        library: 'Ocean React',
        github: 'https://github.com/ocean-ds/ocean-web',
      }}
      activeTab={active}
      tabs={[...tabs]}
      onTabChange={(tab) => setActive(tab as typeof tabs[number])}
      content={content}
      tocItems={toc[active].map(({ id, labelKey }) => ({
        id,
        label: t(labelKey),
      }))}
    />
  );
};

const SuccessExample = () => (
  <SuccessScreen
    title="Payment complete"
    description="Your payment has been processed."
    tagLabel="Paid"
    extraInformation="Nov 12, 9:15 AM"
  >
    <PaymentDetails />
  </SuccessScreen>
);

export default GroupOverview;
