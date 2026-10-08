import React, { ReactNode } from 'react';
import { DocTable } from './DocTable';

/** Tabela fixa de linhas "tema · o que vale" (ex.: a aba Acessibilidade). */
// eslint-disable-next-line import/prefer-default-export
export const FixedRowsTable = ({
  head = ['Tema', 'O que vale'],
  rows,
}: {
  head?: [string, string];
  rows: { topic: ReactNode; content: ReactNode }[];
}): React.ReactElement => (
  <DocTable
    head={head}
    rows={rows.map((row) => [
      <strong key="t">{row.topic}</strong>,
      row.content,
    ])}
  />
);
