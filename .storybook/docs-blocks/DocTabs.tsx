import React, { ReactNode, useState } from 'react';

export type DocTab = { id: string; label: string; content: ReactNode };

const tabFromUrl = (): string | null => {
  try {
    return new URLSearchParams(window.location.search).get('tab');
  } catch {
    return null;
  }
};

/**
 * Abas da página de documentação (Visão geral · Especificações · Diretrizes ·
 * Acessibilidade · Código). Só a aba ativa é montada. `?tab=<id>` no iframe abre direto
 * numa aba (link direto e captura).
 */
export const DocTabs = ({
  tabs,
  initial,
}: {
  tabs: DocTab[];
  initial?: string;
}): React.ReactElement => {
  const [active, setActive] = useState(tabFromUrl() ?? initial ?? tabs[0].id);

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    const step = event.key === 'ArrowRight' ? 1 : -1;
    const next = tabs[(index + step + tabs.length) % tabs.length];
    setActive(next.id);
    document.getElementById(`odoc-tab-${next.id}`)?.focus();
  };

  const current = tabs.find((tab) => tab.id === active) ?? tabs[0];

  return (
    <div className="odoc">
      <div className="odoc__tabs" role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            id={`odoc-tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={tab.id === current.id}
            aria-controls={`odoc-panel-${tab.id}`}
            tabIndex={tab.id === current.id ? 0 : -1}
            className={`odoc__tab${
              tab.id === current.id ? ' odoc__tab--active' : ''
            }`}
            onClick={() => setActive(tab.id)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`odoc-panel-${current.id}`}
        aria-labelledby={`odoc-tab-${current.id}`}
      >
        {current.content}
      </div>
    </div>
  );
};
