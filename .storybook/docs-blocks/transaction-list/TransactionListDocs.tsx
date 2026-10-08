import React, { ReactNode, useState } from 'react';
import { Unstyled } from '@storybook/blocks';
import Breadcrumb from '../../../packages/ocean-react/src/Breadcrumb';
import Link from '../../../packages/ocean-react/src/Link';
import { Select } from '../../../packages/ocean-react/src/Select';
import Tag from '../../../packages/ocean-react/src/Tag';
import Typography from '../../../packages/ocean-react/src/Typography';
import { OnThisPage, Tabs, scrollToId } from '../blocks';
import { ACCESSIBILITY_SECTIONS, Accessibility } from './accessibility';
import { CODE_SECTIONS, Code } from './code';
import { GUIDELINES_SECTIONS, Guidelines } from './guidelines';
import { PLATFORMS, PlatformId, VariantId } from './platforms';
import { SPECS_SECTIONS, Specs } from './specs';

/** Page data: change here, not in the markup. */
export const PAGE = {
  breadcrumb: ['Components', 'Lists'],
  title: 'Transaction list',
  status: 'Beta',
  lastUpdated: '2026-10-08',
  description:
    'Rows that show money movements, pairing what happened with how much, with read only, action, selectable and expandable variants.',
  library: 'Ocean Core',
  github: 'https://github.com/ocean-ds',
};

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

type TabId = 'guidelines' | 'specs' | 'code' | 'accessibility';

const TABS: { id: TabId; label: string; sections: string[] }[] = [
  { id: 'guidelines', label: 'Guidelines', sections: GUIDELINES_SECTIONS },
  { id: 'specs', label: 'Specs', sections: SPECS_SECTIONS },
  { id: 'code', label: 'Code', sections: CODE_SECTIONS },
  {
    id: 'accessibility',
    label: 'Accessibility',
    sections: ACCESSIBILITY_SECTIONS,
  },
];

const tabFromUrl = (): TabId | null => {
  try {
    const tab = new URLSearchParams(window.location.search).get('tab');
    return TABS.some((item) => item.id === tab) ? (tab as TabId) : null;
  } catch {
    return null;
  }
};

const PanelRow = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <div>
    <span className="odoc-panel__label">{label}</span>
    {children}
  </div>
);

/**
 * Documentation page of the Transaction list family. Every component of the family uses it;
 * `variant` selects the component shown first in the Code tab.
 */
export const TransactionListDocs = ({
  variant: initialVariant = 'readOnly',
}: {
  variant?: VariantId;
}): React.ReactElement => {
  const [tab, setTab] = useState<TabId>(tabFromUrl() ?? 'guidelines');
  const [platform, setPlatform] = useState<PlatformId>('react');
  const [variant, setVariant] = useState<VariantId>(initialVariant);
  const current = TABS.find((item) => item.id === tab) ?? TABS[0];

  const openApi = (event: React.MouseEvent) => {
    event.preventDefault();
    setTab('code');
    requestAnimationFrame(() => scrollToId('component-api'));
  };

  return (
    <Unstyled>
      <div className="odoc">
        <header className="odoc-header">
          <div>
            <Breadcrumb items={PAGE.breadcrumb} />
            <Typography variant="heading1" className="odoc-header__title">
              {PAGE.title}
            </Typography>
            <div className="odoc-header__meta">
              <Tag type="neutral" size="medium" setIconOff>
                {PAGE.status}
              </Tag>
              <span>Last updated {formatDate(PAGE.lastUpdated)}</span>
            </div>
            <Typography variant="lead" className="odoc-header__description">
              {PAGE.description}
            </Typography>
          </div>
          <aside className="odoc-panel" aria-label="Component details">
            <PanelRow label="Library">
              <span className="odoc-panel__value">{PAGE.library}</span>
            </PanelRow>
            <PanelRow label="Platform">
              <Select
                ariaLabel="Platform"
                options={PLATFORMS.map(({ id, label }) => ({
                  value: id,
                  label,
                }))}
                value={platform}
                onChange={(option) => setPlatform(option.value as PlatformId)}
              />
            </PanelRow>
            <Link
              href={PAGE.github}
              target="_blank"
              rel="noreferrer"
              icon="externalLink"
            >
              GitHub
            </Link>
            <Link href="#component-api" onClick={openApi} icon="linkChevron">
              Component API
            </Link>
          </aside>
        </header>
        <Tabs
          label="Documentation"
          tabs={TABS}
          active={tab}
          onChange={(id) => setTab(id as TabId)}
        />
        <div className="odoc-body">
          <div role="tabpanel" aria-labelledby={`odoc-tab-${tab}`}>
            {tab === 'guidelines' && <Guidelines />}
            {tab === 'specs' && <Specs />}
            {tab === 'code' && (
              <Code
                platform={platform}
                variant={variant}
                onVariantChange={setVariant}
              />
            )}
            {tab === 'accessibility' && <Accessibility />}
          </div>
          <OnThisPage key={tab} items={current.sections} />
        </div>
      </div>
    </Unstyled>
  );
};
