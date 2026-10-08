import React, { ReactNode } from 'react';
import { DocTable } from './DocTable';

export type ConfigRow = {
  category: string;
  option: ReactNode;
  values: ReactNode;
  defaultValue: ReactNode;
};

/** Configurações: categoria · opção · valores · padrão. */
export const ConfigTable = ({
  rows,
}: {
  rows: ConfigRow[];
}): React.ReactElement => (
  <DocTable
    head={['Categoria', 'Opção', 'Valores', 'Padrão']}
    rows={rows.map((row) => [
      row.category,
      row.option,
      row.values,
      row.defaultValue,
    ])}
  />
);

/** De→para de migração (legado → novo). */
export const MigrationTable = ({
  rows,
}: {
  rows: { from: ReactNode; to: ReactNode; notes?: ReactNode }[];
}): React.ReactElement => (
  <DocTable
    head={['Antes (legado)', 'Agora', 'Observação']}
    rows={rows.map((row) => [row.from, row.to, row.notes ?? '—'])}
  />
);

/** Teclado e foco: tecla · o que acontece. */
export const KeyboardTable = ({
  rows,
}: {
  rows: { keys: ReactNode; behavior: ReactNode }[];
}): React.ReactElement => (
  <DocTable
    head={['Tecla / interação', 'O que acontece']}
    rows={rows.map((row) => [row.keys, row.behavior])}
  />
);
