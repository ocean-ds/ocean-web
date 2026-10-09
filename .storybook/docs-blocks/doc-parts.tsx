import React, { ReactNode, useState } from 'react';
import { Source } from '@storybook/blocks';
import Button from '../../packages/ocean-react/src/Button';
import Link from '../../packages/ocean-react/src/Link';
import Tag from '../../packages/ocean-react/src/Tag';
import Typography from '../../packages/ocean-react/src/Typography';
import { Swatch, Tabs, c } from './blocks';
import { Md, Translate } from './i18n';

/* Blocks of the component Overview pages. Styles in docs.scss (Ocean tokens only). */

/**
 * Example surface: a plain white mobile screen (no border, radius or shadow) with space
 * below the last row, so the inset divider stays visible.
 */
export const Screen = ({
  children,
}: {
  children: ReactNode;
}): React.ReactElement => <div className="odoc-screen">{children}</div>;

const copy = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

/** Live example on the stage, with "Show code" and "Copy code". */
export const Example = ({
  children,
  code,
  t,
  language = 'tsx',
  plain = false,
  caption,
}: {
  children: ReactNode;
  code: string;
  t: Translate;
  /** Text below the stage. */
  caption?: string;
  language?: string;
  /** Without the List container (blocks shown on their own). */
  plain?: boolean;
}): React.ReactElement => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  return (
    <figure className="odoc-example">
      <div className="odoc-example__stage">
        <div className="odoc-example__frame">
          {plain ? (
            <div className="odoc-frame--block">{children}</div>
          ) : (
            <Screen>{children}</Screen>
          )}
        </div>
      </div>
      {caption && (
        <figcaption className="odoc-example__caption">
          <Md text={caption} />
        </figcaption>
      )}
      <div className="odoc-example__bar">
        <Button
          variant="tertiary"
          size="sm"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? t('example.hideCode') : t('example.showCode')}
        </Button>
        <Button
          variant="tertiary"
          size="sm"
          onClick={async () => {
            if (await copy(code)) {
              setCopied(true);
              setTimeout(() => setCopied(false), 1200);
            } else setOpen(true);
          }}
        >
          {copied ? t('example.copied') : t('example.copyCode')}
        </Button>
      </div>
      {open && (
        <div className="odoc-example__code">
          <Source code={code} language={language} dark />
        </div>
      )}
    </figure>
  );
};

/** Highlighted note with links. */
export const Callout = ({ text }: { text: string }): React.ReactElement => (
  <div className="odoc-callout" role="note">
    <Typography variant="description">
      <Md text={text} />
    </Typography>
  </div>
);

export type PlatformSnippets = {
  react: string;
  swift: string;
  compose: string;
};

const LANGUAGES = { react: 'tsx', swift: 'swift', compose: 'kotlin' };

/** React / SwiftUI / Compose tabs with the equivalent snippet. */
export const PlatformTabs = ({
  snippets,
  t,
}: {
  snippets: PlatformSnippets;
  t: Translate;
}): React.ReactElement => {
  const [active, setActive] = useState<keyof PlatformSnippets>('react');
  return (
    <div className="odoc-platforms">
      <Tabs
        label={t('sections.otherPlatforms')}
        className="odoc-subtabs"
        idPrefix="odoc-platform"
        tabs={(['react', 'swift', 'compose'] as const).map((id) => ({
          id,
          label: t(`platforms.${id}`),
        }))}
        active={active}
        onChange={(id) => setActive(id as keyof PlatformSnippets)}
      />
      <div role="tabpanel" aria-labelledby={`odoc-platform-${active}`}>
        <Source code={snippets[active]} language={LANGUAGES[active]} dark />
      </div>
    </div>
  );
};

export type TokenRow = {
  part: string;
  property: string;
  state: string;
  tokens: string[];
  value: string;
  noToken: string | null;
};

export type TokensFile = { component: string; rows: TokenRow[] };

/** "Design tokens" table generated from the component styles. */
export const TokensTable = ({
  file,
  t,
}: {
  file: TokensFile;
  t: Translate;
}): React.ReactElement => (
  <>
    <p>
      <Md text={t('tokens.intro')} />
    </p>
    <Link
      className="odoc-download"
      href={`./tokens/${file.component}.json`}
      download={`${file.component}.tokens.json`}
      icon="externalLink"
    >
      {t('tokens.download')}
    </Link>
    <div className="odoc-table-wrap">
      <table className="odoc-table odoc-tokens">
        <thead>
          <tr>
            {['part', 'property', 'state', 'token', 'value'].map((key) => (
              <th key={key} scope="col">
                {t(`tokens.${key}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {file.rows.map((row, index) => {
            const first = index === 0 || file.rows[index - 1].part !== row.part;
            return (
              <React.Fragment
                key={`${row.part}-${row.property}-${row.state}-${row.value}`}
              >
                {first && (
                  <tr className="odoc-tokens__group">
                    <th scope="rowgroup" colSpan={5}>
                      {row.part}
                    </th>
                  </tr>
                )}
                <tr>
                  <td className="odoc-tokens__part">{row.part}</td>
                  <td>{c(row.property)}</td>
                  <td>{row.state}</td>
                  <td>
                    {row.tokens.length ? (
                      <span className="odoc-token-list">
                        {row.tokens.map((token) =>
                          token.startsWith('color-') ? (
                            <Swatch key={token} token={token} />
                          ) : (
                            <React.Fragment key={token}>
                              {c(token)}
                            </React.Fragment>
                          )
                        )}
                      </span>
                    ) : (
                      '–'
                    )}
                  </td>
                  <td>
                    <span className="odoc-token-value">
                      {row.value}
                      {row.noToken && (
                        <Tag type="warning" size="small" setIconOff>
                          {`${t('tokens.noToken')}: ${row.noToken}`}
                        </Tag>
                      )}
                    </span>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  </>
);

/** Numbered list of rules. */
export const Rules = ({ rules }: { rules: string[] }): React.ReactElement => (
  <ol className="odoc-rules">
    {rules.map((rule) => (
      <li key={rule}>
        <span>
          <Md text={rule} />
        </span>
      </li>
    ))}
  </ol>
);
