import React, { ReactNode } from 'react';
import Typography from '../../packages/ocean-react/src/Typography';

/** Seção com título e texto de abertura opcional. */
export const DocSection = ({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
}): React.ReactElement => (
  <section className="odoc__section">
    <Typography variant="heading4">{title}</Typography>
    {intro && <p className="odoc__lead">{intro}</p>}
    {children}
  </section>
);

/** Tabela base dos blocos (cabeçalho + linhas). */
export const DocTable = ({
  head,
  rows,
}: {
  head: ReactNode[];
  rows: ReactNode[][];
}): React.ReactElement => (
  <div className="odoc__table-wrap">
    <table className="odoc__table">
      <thead>
        <tr>
          {head.map((cell, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <th key={index}>{cell}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
