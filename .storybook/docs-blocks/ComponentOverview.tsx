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
  /** Render directly on the stage without a white block frame. */
  unframed?: boolean;
  /** Optional modifier class for the example stage. */
  canvasClass?: string;
  /** Snippet; generated from `rows` when omitted. */
  code?: string;
  /** Locale key of a caption shown below the example. */
  caption?: string;
};

export type ComponentDocConfig = {
  /** Locale and tokens id, e.g. `transaction-list-action`. */
  id: string;
  title: string;
  codeName?: string;
  kind: 'component' | 'block';
  /** Folder of the source code in the repository. */
  source: string;
  /** Component lifecycle status. */
  status?: 'stable' | 'beta';
  /** Group Overview story id. */
  groupOverview: string;
  locale: LocaleFiles;
  /** Import line shown above the Overview snippet. */
  imports: string;
  primary: ExampleSpec;
  /** One section per story, in the sidebar order. */
  sections: { key: string; example?: ExampleSpec }[];
  /** Visual options that are not separate stories. */
  options?: Record<string, ExampleSpec>;
  optionsTitle?: string;
  optionsLocalePrefix?: string;
  /** Show the list-only Content and amount section. */
  contentAndAmount?: boolean;
  platforms: PlatformSnippets | 'table';
  /** Primary story: the Component API example and its controls. */
  story: unknown;
  argTypes: Record<string, ApiArgType>;
  tokens: TokensFile;
};

const COMMON: LocaleFiles = { en: common, pt: commonPt };
const REPO = 'https://github.com/ocean-ds/ocean-web/tree/master/';

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
      unframed={spec.unframed}
      canvasClass={spec.canvasClass}
      caption={spec.caption ? t(spec.caption) : undefined}
      code={imports ? `${imports}\n\n${code}` : code}
    >
      {spec.rows}
    </Example>
  );
};

export const ComponentOverview = ({
  config,
}: {
  config: ComponentDocConfig;
}): React.ReactElement => {
  const t = useTranslate(COMMON, config.locale);
  const component = config.kind === 'component';
  const options = Object.entries(config.options ?? {});

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
    ...(options.length
      ? [
          {
            id: 'row-options',
            label: t(config.optionsTitle ?? 'sections.rowOptions'),
          },
          ...options.map(([key]) => ({
            id: key,
            label: t(`${config.optionsLocalePrefix ?? 'options'}.${key}.title`),
            sub: true,
          })),
        ]
      : []),
    ...(config.contentAndAmount
      ? [{ id: 'content-and-amount', label: t('sections.contentAndAmount') }]
      : []),
    { id: 'other-platforms', label: t('sections.otherPlatforms') },
    { id: 'component-api', label: t('sections.componentApi') },
    { id: 'design-tokens', label: t('sections.designTokens') },
    { id: 'implementation-rules', label: t('sections.implementationRules') },
    { id: 'feedback', label: t('sections.feedback') },
  ];

  return (
    <Unstyled>
      <div className="odoc odoc--component">
        <div className="odoc-band">
          <div className="odoc-band__inner">
            <header className="odoc-component-header">
              <Typography
                variant="heading1"
                className="odoc-component-header__title"
              >
                {config.title}
                {config.codeName && (
                  <>
                    {' · '}
                    <code>{config.codeName}</code>
                  </>
                )}
              </Typography>
              <div className="odoc-component-header__links">
                <Tag
                  variant="highlight"
                  type="neutral"
                  size="medium"
                  setIconOff
                >
                  {t(
                    component
                      ? `status.${config.status ?? 'beta'}`
                      : 'status.block'
                  )}
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
                  href={`./?path=/docs/${config.groupOverview}`}
                  target="_top"
                  onClick={openGroup('guidelines')}
                >
                  {t('links.usageGuidelines')}
                </Link>
                {component && (
                  <>
                    <span aria-hidden>|</span>
                    <Link
                      href={`./?path=/docs/${config.groupOverview}`}
                      target="_top"
                      onClick={openGroup('accessibility')}
                    >
                      {t('links.accessibility')}
                    </Link>
                  </>
                )}
              </div>
            </header>
          </div>
        </div>
        <div className="odoc-body">
          <div>
            {config.kind === 'block' && <Callout text={t('usedBy')} />}

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

            {options.length > 0 && (
              <Section
                id="row-options"
                title={t(config.optionsTitle ?? 'sections.rowOptions')}
              >
                {options.map(([key, example]) => (
                  <Subsection
                    key={key}
                    id={key}
                    title={t(
                      `${config.optionsLocalePrefix ?? 'options'}.${key}.title`
                    )}
                  >
                    <p>
                      <Md
                        text={t(
                          `${
                            config.optionsLocalePrefix ?? 'options'
                          }.${key}.text`
                        )}
                      />
                    </p>
                    {example && <Snippet spec={example} t={t} />}
                  </Subsection>
                ))}
              </Section>
            )}
            {config.contentAndAmount && (
              <Section
                id="content-and-amount"
                title={t('sections.contentAndAmount')}
              >
                <Callout text={t('contentAndAmount')} />
              </Section>
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
                      <Md key={platform} text={t(`platforms.${platform}`)} />,
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
              <div
                className={`odoc-example${
                  config.primary.canvasClass?.startsWith('odoc-canvas--footer-')
                    ? ' odoc-example--footer'
                    : ''
                }`}
              >
                <div
                  className={
                    config.primary.canvasClass
                      ? `odoc-example__stage ${config.primary.canvasClass}`
                      : 'odoc-example__stage'
                  }
                >
                  <Story of={config.story} />
                </div>
              </div>
              <ApiTable of={config.story} argTypes={config.argTypes} t={t} />
            </Section>

            <Section id="design-tokens" title={t('sections.designTokens')}>
              <TokensTable file={config.tokens} t={t} />
              {component && (
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
