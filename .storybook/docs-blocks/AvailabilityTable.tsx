import React, { ReactNode } from 'react';
import Tag from '../../packages/ocean-react/src/Tag';
import { DocTable } from './DocTable';

export type Availability = {
  platform: string;
  status: 'pronto' | 'em revisão' | 'não se aplica';
  link?: { label: string; href: string };
  notes?: ReactNode;
};

const statusTag = {
  pronto: 'positive',
  'em revisão': 'warning',
  'não se aplica': 'neutral',
} as const;

/** Disponibilidade por plataforma: status, link e diferenças. */
export const AvailabilityTable = ({
  rows,
}: {
  rows: Availability[];
}): React.ReactElement => (
  <DocTable
    head={['Plataforma', 'Status', 'Onde', 'Diferenças']}
    rows={rows.map((row) => [
      <strong key="p">{row.platform}</strong>,
      <Tag key="s" type={statusTag[row.status]} size="small" setIconOff>
        {row.status}
      </Tag>,
      row.link ? (
        <a key="l" href={row.link.href} target="_blank" rel="noreferrer">
          {row.link.label}
        </a>
      ) : (
        '—'
      ),
      row.notes ?? '—',
    ])}
  />
);
