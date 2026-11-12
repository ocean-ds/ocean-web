import './release-notes.scss';
import React, { useEffect, useMemo, useState } from 'react';
import { Unstyled } from '@storybook/blocks';
import Alert from '../../../packages/ocean-react/src/Alert';
import Button from '../../../packages/ocean-react/src/Button';
import Link from '../../../packages/ocean-react/src/Link';
import Tab from '../../../packages/ocean-react/src/Tab';
import Tag from '../../../packages/ocean-react/src/Tag';
import Typography from '../../../packages/ocean-react/src/Typography';
import { OnThisPage, slug } from '../blocks';
import { Callout } from '../doc-parts';
import { LocaleFiles, Md, Translate, useTranslate } from '../i18n';
import en from '../locales/release-notes.en.json';
import pt from '../locales/release-notes.pt.json';

/*
 * "Release note & changelog": the GitHub Releases of the Ocean repositories, one tab per
 * platform. The data is a static file that `scripts/fetch-release-notes.js` writes on every
 * Storybook build and that the hourly workflow refreshes on the published site. The page
 * never calls GitHub.
 */

const locale: LocaleFiles = {
  en: en as LocaleFiles['en'],
  pt: pt as LocaleFiles['pt'],
};

/** Served from `.storybook/assets`, next to `iframe.html`. */
const DATA_URL = 'release-notes/release-notes.json';
const PAGE_SIZE = 20;

const PLATFORMS = ['web', 'tokens', 'icons', 'ios', 'android'] as const;
type Platform = typeof PLATFORMS[number];

const GROUPS = ['added', 'fixed', 'removed', 'other'] as const;
type Group = typeof GROUPS[number];

const GROUP_TAG: Record<
  Group,
  'positive' | 'warning' | 'negative' | 'neutral'
> = {
  added: 'positive',
  fixed: 'warning',
  removed: 'negative',
  other: 'neutral',
};

type Change = { text: string; scope?: string; pr?: number; url?: string };
type Release = {
  version: string;
  date: string;
  url: string;
  groups: Record<Group, Change[]>;
};
type RepoNotes = {
  repo: string;
  url: string;
  status: 'ok' | 'error';
  releases: Release[];
};
type ReleaseNotes = {
  generatedAt: string;
  complete: boolean;
  repos: Partial<Record<Platform, RepoNotes>>;
};

type LoadState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; data: ReleaseNotes };

const useReleaseNotes = (): LoadState => {
  const [state, setState] = useState<LoadState>({ status: 'loading' });
  useEffect(() => {
    let active = true;
    fetch(DATA_URL, { cache: 'no-cache' })
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status));
        return response.json() as Promise<ReleaseNotes>;
      })
      .then((data) => {
        if (!active) return;
        setState(
          data && data.repos ? { status: 'ready', data } : { status: 'error' }
        );
      })
      .catch(() => active && setState({ status: 'error' }));
    return () => {
      active = false;
    };
  }, []);
  return state;
};

const formatDate = (iso: string, t: Translate, withTime = false): string =>
  new Date(iso).toLocaleString(t.locale === 'pt' ? 'pt-BR' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {}),
  });

const versionId = (platform: Platform, version: string) =>
  `${platform}-${slug(version)}`;

const ChangeItem = ({
  change,
  release,
  t,
}: {
  change: Change;
  release: Release;
  t: Translate;
}) => (
  <li className="odoc-release__change">
    {change.scope && <code>{change.scope}</code>}
    <span>{change.text}</span>
    <Link
      href={change.url ?? release.url}
      target="_blank"
      rel="noreferrer"
      className="odoc-release__pr"
    >
      {change.pr ? `#${change.pr}` : t('viewVersion')}
    </Link>
  </li>
);

const ReleaseEntry = ({
  platform,
  release,
  t,
}: {
  platform: Platform;
  release: Release;
  t: Translate;
}) => (
  <section
    className="odoc-release"
    id={versionId(platform, release.version)}
    aria-labelledby={`${versionId(platform, release.version)}-title`}
  >
    <header className="odoc-release__header">
      <Typography
        variant="heading3"
        id={`${versionId(platform, release.version)}-title`}
        className="odoc-release__version"
      >
        {release.version}
      </Typography>
      <Typography variant="caption" className="odoc-release__date">
        <time dateTime={release.date}>{formatDate(release.date, t)}</time>
      </Typography>
      <Link
        href={release.url}
        target="_blank"
        rel="noreferrer"
        icon="externalLink"
        variant="neutral"
        size="tiny"
        className="odoc-release__github"
      >
        {t('viewOnGitHub')}
      </Link>
    </header>
    {GROUPS.filter((group) => release.groups[group]?.length).map((group) => (
      <div key={group} className="odoc-release__group">
        <Tag type={GROUP_TAG[group]} size="small" setIconOff>
          {t(`groups.${group}`)}
        </Tag>
        <ul className="odoc-release__changes">
          {release.groups[group].map((change, index) => (
            <ChangeItem
              // eslint-disable-next-line react/no-array-index-key
              key={`${change.url ?? ''}-${index}`}
              change={change}
              release={release}
              t={t}
            />
          ))}
        </ul>
      </div>
    ))}
  </section>
);

/** Mobile versions are the tokens version plus a build number. */
const MOBILE: Platform[] = ['ios', 'android'];

const Warning = ({ text }: { text: string }) => (
  <Alert type="warning" className="odoc-release__alert">
    <Md text={text} />
  </Alert>
);

const PlatformPanel = ({
  platform,
  notes,
  t,
}: {
  platform: Platform;
  notes?: RepoNotes;
  t: Translate;
}) => {
  const [shown, setShown] = useState(PAGE_SIZE);
  if (!notes || notes.status === 'error') {
    const url =
      notes?.url ?? `https://github.com/ocean-ds/ocean-${platform}/releases`;
    return (
      <Warning
        text={t('errorRepo')
          .replace('{repo}', notes?.repo ?? t(`tabs.${platform}`))
          .replace('{url}', url)}
      />
    );
  }
  if (notes.releases.length === 0) {
    return <Typography variant="description">{t('empty')}</Typography>;
  }
  return (
    <>
      {MOBILE.includes(platform) && <Callout text={t('mobileVersionNote')} />}
      {notes.releases.slice(0, shown).map((release) => (
        <ReleaseEntry
          key={release.version}
          platform={platform}
          release={release}
          t={t}
        />
      ))}
      {shown < notes.releases.length && (
        <div className="odoc-release__more">
          <Button
            variant="secondary"
            size="md"
            onClick={() => setShown(shown + PAGE_SIZE)}
          >
            {t('showMore')}
          </Button>
        </div>
      )}
    </>
  );
};

export const ReleaseNotesPage = (): React.ReactElement => {
  const t = useTranslate(locale);
  const state = useReleaseNotes();
  const [selected, setSelected] = useState(0);
  const platform = PLATFORMS[selected];
  const notes =
    state.status === 'ready' ? state.data.repos[platform] : undefined;

  const toc = useMemo(
    () =>
      notes?.status === 'ok'
        ? notes.releases.slice(0, PAGE_SIZE).map((release) => ({
            id: versionId(platform, release.version),
            label: release.version,
          }))
        : [],
    [notes, platform]
  );

  return (
    <Unstyled>
      <div className="odoc odoc--release-notes">
        <div className="odoc-band">
          <div className="odoc-band__inner">
            <header className="odoc-header odoc-header--single">
              <div>
                <Typography variant="heading1" className="odoc-header__title">
                  {t('title')}
                </Typography>
                {state.status === 'ready' && (
                  <div className="odoc-header__meta">
                    <span>
                      {t('updated').replace(
                        '{date}',
                        formatDate(state.data.generatedAt, t, true)
                      )}
                    </span>
                  </div>
                )}
                <Typography variant="lead" className="odoc-header__description">
                  {t('description')}
                </Typography>
              </div>
            </header>
          </div>
        </div>
        <div className="odoc-tabbar">
          <div className="odoc-band__inner">
            <Tab
              id="release-notes"
              aria-label={t('platforms')}
              tabs={PLATFORMS.map((id) => ({
                label: t(`tabs.${id}`),
                panelId: `release-notes-panel-${id}`,
              }))}
              selectedIndex={selected}
              onChange={setSelected}
            />
          </div>
        </div>
        <div className="odoc-body">
          <div
            role="tabpanel"
            id={`release-notes-panel-${platform}`}
            aria-labelledby={`release-notes-tab-${selected}`}
          >
            {state.status === 'loading' && (
              <Typography variant="description">{t('loading')}</Typography>
            )}
            {state.status === 'error' && <Warning text={t('errorAll')} />}
            {state.status === 'ready' && (
              <PlatformPanel
                key={platform}
                platform={platform}
                notes={notes}
                t={t}
              />
            )}
          </div>
          {toc.length > 0 && (
            <OnThisPage
              key={`${platform}-${t.locale}-${toc.length}`}
              title={t('toc')}
              items={toc}
            />
          )}
        </div>
      </div>
    </Unstyled>
  );
};

export default ReleaseNotesPage;
