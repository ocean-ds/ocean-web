import React, { ReactNode } from 'react';
import { Unstyled } from '@storybook/blocks';
import Breadcrumb from '../../packages/ocean-react/src/Breadcrumb';
import Link from '../../packages/ocean-react/src/Link';
import Tag from '../../packages/ocean-react/src/Tag';
import Typography from '../../packages/ocean-react/src/Typography';
import { OnThisPage, Tabs, TocItem } from './blocks';
import { Translate } from './i18n';

export const GroupOverviewFrame = ({
  t,
  page,
  activeTab,
  tabs,
  onTabChange,
  content,
  tocItems,
}: {
  t: Translate;
  page: {
    title: string;
    status: string;
    lastUpdated: string;
    library: string;
    github: string;
  };
  activeTab: string;
  tabs: string[];
  onTabChange: (id: string) => void;
  content: ReactNode;
  tocItems: TocItem[];
}): React.ReactElement => (
  <Unstyled>
    <div className="odoc">
      <div className="odoc-band">
        <div className="odoc-band__inner">
          <header className="odoc-header">
            <div>
              <Breadcrumb items={t.list('breadcrumb')} />
              <Typography variant="heading1" className="odoc-header__title">
                {page.title}
              </Typography>
              <div className="odoc-header__meta">
                <Tag
                  variant="highlight"
                  type="neutral"
                  size="medium"
                  setIconOff
                >
                  {page.status}
                </Tag>
                <span>
                  {t('lastUpdated').replace(
                    '{date}',
                    new Date(
                      `${page.lastUpdated}T12:00:00Z`
                    ).toLocaleDateString(
                      t.locale === 'pt' ? 'pt-BR' : 'en-US',
                      {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        timeZone: 'UTC',
                      }
                    )
                  )}
                </span>
              </div>
              <Typography variant="lead" className="odoc-header__description">
                {t('description')}
              </Typography>
            </div>
            <aside className="odoc-panel" aria-label={t('componentDetails')}>
              <div>
                <span className="odoc-panel__label">{t('library')}</span>
                <span className="odoc-panel__value">{page.library}</span>
              </div>
              <Link
                href={page.github}
                target="_blank"
                rel="noreferrer"
                icon="externalLink"
              >
                GitHub
              </Link>
            </aside>
          </header>
        </div>
      </div>
      <div className="odoc-tabbar">
        <Tabs
          label={t('documentation')}
          tabs={tabs.map((id) => ({ id, label: t(`tabs.${id}`) }))}
          active={activeTab}
          onChange={onTabChange}
        />
      </div>
      <div className="odoc-body">
        <div role="tabpanel" aria-labelledby={`odoc-tab-${activeTab}`}>
          {content}
        </div>
        <OnThisPage
          key={`${activeTab}-${t.locale}`}
          title={t('toc')}
          items={tocItems}
        />
      </div>
    </div>
  </Unstyled>
);
