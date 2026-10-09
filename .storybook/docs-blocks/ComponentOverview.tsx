import React, { ReactElement, useEffect } from 'react';
import { Story, Unstyled } from '@storybook/blocks';
import Link from '../../packages/ocean-react/src/Link';
import Tag from '../../packages/ocean-react/src/Tag';
import Typography from '../../packages/ocean-react/src/Typography';
import { DocTable, OnThisPage, Section, Subsection, TocItem } from './blocks';
import {
  Callout,
  Example,
  PlatformSnippets,
  PlatformTabs,
  Rules,
  TokensFile,
  TokensTable,
} from './doc-parts';
import { ApiArgType, ApiTable } from './api-table';
import { LocaleFiles, Md, Translate, useTranslate } from './i18n';
import { listCode } from './jsx';
import {
  SECTION_REQUEST_KEY,
  TAB_REQUEST_KEY,
  request,
  takeRequest,
} from './navigation';
import common from './locales/common.en.json';
import commonPt from './locales/common.pt.json';

/*
 * Overview page of a component (Carbon-style): one page, fixed order, a titled section per
 * topic and "On this page" on the right. Every page of the family uses this renderer with
 * its own config and locale files.
 */

export type ExampleSpec = {
  rows: ReactElement[];
  /** Shown on its own, without the List container (blocks). */
  plain?: boolean;
  /** Snippet; generated from `rows` when omitted. */
  code?: string;
  /** Locale key of a caption shown below the example. */
  caption?: string;
};

export type ComponentDocConfig = {
  /** Locale and tokens id, e.g. `transaction-list-action`. */
  id: string;
  title: string;
  kind: 'item' | 'block';
  /** Folder of the source code in the repository. */
  source: string;
  locale: LocaleFiles;
  /** Import line shown above the Overview snippet. */
  imports: string;
  primary: ExampleSpec;
  /** One section per story, in the sidebar order. */
  sections: { key: string; example?: ExampleSpec }[];
  /** Items: Density · Icon color · Loading and disabled · Divider. */
  rowOptions?: Partial<
    Record<'density' | 'iconColor' | 'states' | 'divider', ExampleSpec>
  >;
  /** Blocks: one section per prop. */
  options?: { key: string; example?: ExampleSpec }[];
  platforms: PlatformSnippets | 'table';
  /** Primary story: the Component API example and its controls. */
  story: unknown;
  argTypes: Record<string, ApiArgType>;
  tokens: TokensFile;
};

const COMMON: LocaleFiles = { en: common, pt: commonPt };
const REPO = 'https://github.com/ocean-ds/ocean-web/tree/master/';
export const GROUP_OVERVIEW =
  'components-lists-transaction-list-overview--docs';

const openGroup = (tab: string) => () => request(TAB_REQUEST_KEY, tab);

const Snippet = ({
  spec,
  t,
  imports,
}: {
  spec: ExampleSpec;
  t: Translate;
  imports?: string;
}) => {
  const code = spec.code ?? listCode(spec.rows);
  return (
    <Example
      t={t}
      plain={spec.plain}
      caption={spec.caption ? t(spec.caption) : undefined}
      code={imports ? `${imports}\n\n${code}` : code}
    >
      {spec.rows}
    </Example>
  );
};

const ROW_OPTIONS = ['density', 'iconColor', 'states', 'divider'] as const;

export const ComponentOverview = ({
  config,
}: {
  config: ComponentDocConfig;
}): React.ReactElement => {
  const t = useTranslate(COMMON, config.locale);
  const item = config.kind === 'item';
  const rowOptions = ROW_OPTIONS.filter((key) => config.rowOptions?.[key]);

  useEffect(() => {
    const section = takeRequest(SECTION_REQUEST_KEY);
    if (section)
      setTimeout(() => document.getElementById(section)?.scrollIntoView(), 300);
  }, []);

  const toc: TocItem[] = [
    { id: 'overview', label: t('sections.overview') },
    ...config.sections.map(({ key }) => ({
      id: key,
      label: t(`sections.${key}.title`),
    })),
    ...(item
      ? [
          { id: 'row-options', label: t('sections.rowOptions') },
          ...rowOptions.map((key) => ({
            id: key,
            label: t(`rowOptions.${key}.title`),
            sub: true,
          })),
          { id: 'content-and-amount', label: t('sections.contentAndAmount') },
        ]
      : (config.options ?? []).map(({ key }) => ({
          id: key,
          label: t(`options.${key}.title`),
        }))),
    { id: 'other-platforms', label: t('sections.otherPlatforms') },
    { id: 'component-api', label: t('sections.componentApi') },
    { id: 'design-tokens', label: t('sections.designTokens') },
    { id: 'implementation-rules', label: t('sections.implementationRules') },
    { id: 'feedback', label: t('sections.feedback') },
  ];

  return (
    <Unstyled>
      <div className="odoc odoc--component">
        <div className="odoc-body">
          <div>
            <header className="odoc-component-header">
              <Typography
                variant="heading1"
                className="odoc-component-header__title"
              >
                {config.title}
              </Typography>
              <div className="odoc-component-header__links">
                <Tag
                  type={item ? 'neutral-02' : 'neutral'}
                  size="medium"
                  setIconOff
                >
                  {t(item ? 'status.beta' : 'status.block')}
                </Tag>
                <Link
                  href={`${REPO}${config.source}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('links.sourceCode')}
                </Link>
                <span aria-hidden>|</span>
                <Link
                  href={`./?path=/docs/${GROUP_OVERVIEW}`}
                  target="_top"
                  onClick={openGroup('guidelines')}
                >
                  {t('links.usageGuidelines')}
                </Link>
                {item && (
                  <>
                    <span aria-hidden>|</span>
                    <Link
                      href={`./?path=/docs/${GROUP_OVERVIEW}`}
                      target="_top"
                      onClick={openGroup('accessibility')}
                    >
                      {t('links.accessibility')}
                    </Link>
                  </>
                )}
              </div>
              {!item && <Callout text={t('usedBy')} />}
            </header>

            <Section id="overview" title={t('sections.overview')}>
              <p>
                <Md text={t('overview')} />
              </p>
              <Snippet spec={config.primary} t={t} imports={config.imports} />
            </Section>

            {config.sections.map(({ key, example }) => (
              <Section key={key} id={key} title={t(`sections.${key}.title`)}>
                <p>
                  <Md text={t(`sections.${key}.text`)} />
                </p>
                {example && <Snippet spec={example} t={t} />}
              </Section>
            ))}

            {item ? (
              <>
                <Section id="row-options" title={t('sections.rowOptions')}>
                  {rowOptions.map((key) => (
                    <Subsection
                      key={key}
                      id={key}
                      title={t(`rowOptions.${key}.title`)}
                    >
                      <p>
                        <Md text={t(`rowOptions.${key}.text`)} />
                      </p>
                      <Snippet
                        spec={config.rowOptions?.[key] as ExampleSpec}
                        t={t}
                      />
                    </Subsection>
                  ))}
                </Section>
                <Section
                  id="content-and-amount"
                  title={t('sections.contentAndAmount')}
                >
                  <Callout text={t('contentAndAmount')} />
                </Section>
              </>
            ) : (
              (config.options ?? []).map(({ key, example }) => (
                <Section key={key} id={key} title={t(`options.${key}.title`)}>
                  <p>
                    <Md text={t(`options.${key}.text`)} />
                  </p>
                  {example && <Snippet spec={example} t={t} />}
                </Section>
              ))
            )}

            <Section id="other-platforms" title={t('sections.otherPlatforms')}>
              {config.platforms === 'table' ? (
                <DocTable
                  columns={[t('platforms.platform'), t('platforms.type')]}
                  rows={(['react', 'ios', 'android'] as const).map(
                    (platform) => [
                      {
                        react: 'React',
                        ios: 'iOS (SwiftUI)',
                        android: 'Android (Compose)',
                      }[platform],
                      <Md text={t(`platforms.${platform}`)} />,
                    ]
                  )}
                />
              ) : (
                <>
                  <p>
                    <Md text={t('platforms.text')} />
                  </p>
                  <PlatformTabs snippets={config.platforms} t={t} />
                </>
              )}
            </Section>

            <Section id="component-api" title={t('sections.componentApi')}>
              <p>
                <Md text={t('api.intro')} />
              </p>
              <div className="odoc-example">
                <div className="odoc-example__stage">
                  <div className="odoc-example__frame">
                    <Story of={config.story} />
                  </div>
                </div>
              </div>
              <ApiTable of={config.story} argTypes={config.argTypes} t={t} />
            </Section>

            <Section id="design-tokens" title={t('sections.designTokens')}>
              <TokensTable file={config.tokens} t={t} />
              {item && (
                <p>
                  <Md text={t('tokens.blocks')} />
                </p>
              )}
            </Section>

            <Section
              id="implementation-rules"
              title={t('sections.implementationRules')}
            >
              <Rules rules={t.list('rules')} />
            </Section>

            <Section id="feedback" title={t('sections.feedback')}>
              <p>
                <Md text={t('feedback')} />
              </p>
            </Section>
          </div>
          <OnThisPage items={toc} title={t('toc')} />
        </div>
      </div>
    </Unstyled>
  );
};
