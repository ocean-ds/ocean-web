import React from 'react';
import * as tokens from '@useblu/ocean-tokens/web/tokens';
import { DocTable } from './DocTable';

/** Nome do token no padrão do Figma (`Interface/Dark/Up`) → valor do pacote de tokens. */
export const tokenValue = (name: string): string | undefined => {
  const key = `color${name
    .split('/')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')}`;
  return (tokens as Record<string, unknown>)[key] as string | undefined;
};

/** Amostra de cor com o nome do token. "—" quando a parte não aparece. */
export const TokenSwatch = ({ name }: { name: string }): React.ReactElement => {
  if (name === '—') return <span>—</span>;
  const value = tokenValue(name);
  return (
    <span className="odoc__swatch">
      {value && (
        <span
          className="odoc__swatch-dot"
          style={{ backgroundColor: value }}
          aria-hidden
        />
      )}
      <code>{name}</code>
    </span>
  );
};

/** Cor por estado: uma linha por parte, uma coluna por estado, valores em tokens. */
export const TokenTable = ({
  states,
  rows,
}: {
  states: string[];
  rows: { part: string; tokens: string[] }[];
}): React.ReactElement => (
  <DocTable
    head={['Parte', ...states]}
    rows={rows.map((row) => [
      row.part,
      ...row.tokens.map((name, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <TokenSwatch key={index} name={name} />
      )),
    ])}
  />
);
