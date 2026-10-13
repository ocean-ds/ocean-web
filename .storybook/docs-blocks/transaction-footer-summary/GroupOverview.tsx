import React, { ReactNode, useEffect, useState } from 'react';
import Link from '../../../packages/ocean-react/src/Link';
import TransactionFooter from '../../../packages/ocean-react/src/TransactionFooter';
import {
  Anatomy,
  DoDont,
  DocTable,
  Section,
  Stage,
  Subsection,
} from '../blocks';
import { GroupOverviewFrame } from '../GroupOverviewFrame';
import { Screen } from '../doc-parts';
import { LocaleFiles, Md, Translate, useTranslate } from '../i18n';
import {
  SECTION_REQUEST_KEY,
  TAB_REQUEST_KEY,
  request,
  takeRequest,
} from '../navigation';
import common from '../locales/common.en.json';
import commonPt from '../locales/common.pt.json';
import en from '../locales/transaction-group.en.json';
import pt from '../locales/transaction-group.pt.json';
import {
  transactionNotice,
  transactionSummaryAction,
  transactionSummaryDetails,
  transactionSummaryMainItem,
  transactionSummaryTotal,
} from './fixtures';

type TabId = 'guidelines' | 'specs' | 'accessibility';

const TOC: Record<TabId, { id: string; labelKey: string }[]> = {
  guidelines: [
    { id: 'overview', labelKey: 'guidelines.overview.title' },
    { id: 'formatting', labelKey: 'guidelines.formatting.title' },
    { id: 'content', labelKey: 'guidelines.content.title' },
    { id: 'behaviors', labelKey: 'guidelines.behaviors.title' },
    { id: 'related', labelKey: 'guidelines.related.title' },
    { id: 'feedback', labelKey: 'guidelines.feedback.title' },
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
  rows: ReactNode[][];
}): React.ReactElement => (
  <DocTable columns={t.list(`${path}.columns`)} rows={rows} />
);

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

const footer = (props: Record<string, unknown> = {}) => (
  <TransactionFooter
    mainItem={transactionSummaryMainItem}
    details={transactionSummaryDetails}
    total={transactionSummaryTotal}
    action={transactionSummaryAction}
    {...props}
  />
);

const Guidelines = ({ t }: { t: Translate }): React.ReactElement => {
  const g = (key: string) => t(`guidelines.${key}`);
  const doDont = t.list('guidelines.content.doDontItems');

  return (
    <>
      <Section id="overview" title={g('overview.title')}>
        <p>
          <Md text={g('overview.text')} />
        </p>
        <Stage
          frames={[
            {
              label: g('overview.exampleLabel'),
              content: <Screen>{footer()}</Screen>,
            },
          ]}
        />
        <div className="odoc-columns">
          {(['whenToUse', 'whenNotToUse'] as const).map((key) => (
            <div key={key} className="odoc-prose">
              <h4>{g(`overview.${key}`)}</h4>
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
        <Subsection id="variants" title={g('overview.variants')}>
          <DocsTable
            t={t}
            path="guidelines.overview.variantTable"
            rows={[
              [
                <DocsLink
                  id="components-transaction-summary-footer--overview"
                  key="footer"
                >
                  {g('overview.footerName')}
                </DocsLink>,
                g('overview.variantRows.footer'),
              ],
              [
                <DocsLink
                  id="components-transaction-summary-aside--overview"
                  key="aside"
                >
                  {g('overview.asideName')}
                </DocsLink>,
                g('overview.variantRows.aside'),
              ],
            ]}
          />
        </Subsection>
      </Section>

      <Section id="formatting" title={g('formatting.title')}>
        <Subsection id="anatomy" title={g('formatting.anatomy')}>
          <Anatomy
            example={<Screen>{footer({ notice: transactionNotice })}</Screen>}
            parts={[
              { selector: '.ods-transaction-footer-v2__notice', side: 'left' },
              {
                selector: '.ods-transaction-footer-v2__row--default',
                side: 'top',
              },
              { selector: '.ods-transaction-footer-v2__details', side: 'left' },
              { selector: '.ods-transaction-footer-v2__total', side: 'right' },
              {
                selector: '.ods-transaction-footer-v2__action',
                side: 'bottom',
              },
            ]}
          />
          <DocsTable
            t={t}
            path="guidelines.formatting.anatomyTable"
            rows={(
              en.guidelines.formatting.anatomyTable.rows as string[][]
            ).map((row) => {
              const rowIndex = (
                en.guidelines.formatting.anatomyTable.rows as string[][]
              ).indexOf(row);
              return [
                rowIndex + 1,
                t(`guidelines.formatting.anatomyTable.rows.${rowIndex}.0`),
                t(`guidelines.formatting.anatomyTable.rows.${rowIndex}.1`),
                <Md
                  key={row[0]}
                  text={t(
                    `guidelines.formatting.anatomyTable.rows.${rowIndex}.2`
                  )}
                />,
              ];
            })}
          />
        </Subsection>
        <Subsection id="density" title={g('formatting.density.title')}>
          <p>
            <Md text={g('formatting.density.text')} />
          </p>
          <DocsTable
            t={t}
            path="guidelines.formatting.density.table"
            rows={t
              .list('guidelines.formatting.density.table.rows')
              .map((row) => row.split('|'))}
          />
        </Subsection>
      </Section>

      <Section id="content" title={g('content.title')}>
        <p>
          <Md text={g('content.text')} />
        </p>
        <ul>
          {t.list('guidelines.content.writingItems').map((item) => (
            <li key={item}>
              <Md text={item} />
            </li>
          ))}
        </ul>
        <Subsection id="do-dont" title={g('content.doDontTitle')}>
          <DoDont
            items={[
              {
                kind: 'dont',
                example: (
                  <Screen>
                    {footer({
                      details: [
                        {
                          label: 'Installments',
                          value: '5x of R$ 250,00 · No additional fees',
                        },
                      ],
                    })}
                  </Screen>
                ),
                text: <Md text={doDont[1]} />,
              },
              {
                kind: 'do',
                example: <Screen>{footer()}</Screen>,
                text: <Md text={doDont[0]} />,
              },
            ]}
          />
        </Subsection>
      </Section>

      <Section id="behaviors" title={g('behaviors.title')}>
        <p>
          <Md text={g('behaviors.text')} />
        </p>
        <DocsTable
          t={t}
          path="guidelines.behaviors.table"
          rows={t
            .list('guidelines.behaviors.table.rows')
            .map((row) => row.split('|'))}
        />
      </Section>

      <Section id="related" title={g('related.title')}>
        <div className="odoc-related">
          {(['footer', 'aside'] as const).map((key) => (
            <div key={key} className="odoc-related__card odoc-prose">
              <h4>{g(`related.${key}.title`)}</h4>
              <p>
                <Md text={g(`related.${key}.text`)} />
              </p>
              <DocsLink
                id={
                  key === 'footer'
                    ? 'components-transaction-summary-footer--overview'
                    : 'components-transaction-summary-aside--overview'
                }
              >
                {g(`related.${key}.link`)}
              </DocsLink>
            </div>
          ))}
        </div>
      </Section>

      <Section id="feedback" title={g('feedback.title')}>
        <p>
          <Md text={g('feedback.text')} />
        </p>
      </Section>
    </>
  );
};

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

export default GroupOverview;
